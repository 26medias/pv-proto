var _ 					= require('underscore');
var qs 					= require("querystring");
var mysql				= require('mysql');
var toolset				= require('toolset');

// Users
function api() {
	
}
api.prototype.init = function(Gamify, callback){
	var scope = this;
	
	this.Gamify = Gamify;
	
	
	
	// Return the methods
	var methods = {
		
		importPages: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				stack.add(function(p, cb) {
					scope.mongo.remove({
						collection:	'fbdata'
					}, cb);
				});
				
				scope.sql.query("select * from fbpages where published_by>0", function(err, rows, fields) {
					_.each(rows, function(row) {
						stack.add(function(p, cb) {
							// Create the object
							var page = {
								createdBy:	null,
								createdOn:	new Date(row.created_on*1000),
								id:			row.pageid.toString(),
								name:		row.name,
								tid:		row.id.toString(),
								updatedOn:	new Date(row.updated_on*1000),
								updatedLog:	[],
								admins:		[],
								pages:		[],
								object:		{},
								theme:		{
									name:		'paradigm',
									version:	'1.0.0',
									settings:	{}
								}
							};
							
							if (row.theme_name) {
								page.theme.name 	= row.theme_name;
							}
							if (row.theme_version) {
								page.theme.version 	= row.theme_version;
							}
							if (row.theme_settings) {
								page.theme.settings = JSON.parse(row.theme_settings);
								var i;
								for (i in page.theme.settings) {
									if (page.theme.settings[i] == "none") {
										page.theme.settings[i] = '';
									}
								}
							}
							
							scope.mongo.insert({
								collection:	'fbdata',
								data:		page
							}, cb);
						});
					});
					stack.process(function() {
						console.log("Import finished");
						callback({done:true,count:rows.length});
					}, false);
				});
				
			}
		},
		
		importAdmins: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				scope.sql.query("select * from fbpages_admins", function(err, rows, fields) {
					var c = 0;
					_.each(rows, function(row) {
						c++;
						stack.add(function(p, cb) {
							scope.mongo.update({
								collection:	'fbdata',
								query:	{
									id:		row.pageid.toString()
								},
								data:		{
									$push:	{
										admins:	row.uid.toString()
									}
								},
								options:	{
									upsert: false
								}
							}, cb);
						});
					});
					stack.process(function() {
						console.log("Import finished");
						callback({done:true,count:c});
					}, true);
				});
				
			}
		},
		
		importSiteSettings: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				scope.sql.query("select * from site_settings", function(err, rows, fields) {
					var c = 0;
					_.each(rows, function(row) {
						
						var pageid = row.pageid+'';
						
						delete row.pageid;
						delete row.updated_on;
						
						c++;
						stack.add(function(p, cb) {
							scope.mongo.update({
								collection:	'fbdata',
								query:	{
									id:		pageid
								},
								data:		{
									$set:	{
										settings:	row
									}
								},
								options:	{
									upsert: false
								}
							}, cb);
						});
					});
					stack.process(function() {
						console.log("Import finished");
						callback({done:true,count:c});
					}, true);
				});
				
			}
		},
		
		importMenus: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				stack.add(function(p, cb) {
					scope.mongo.remove({
						collection:	'menusv1'
					}, cb);
				});
				
				scope.sql.query("select * from site_menu", function(err, rows, fields) {
					var c = 0;
					_.each(rows, function(row) {
						
						// pageid to a string
						row.pageid = row.pageid.toString();
						
						switch (row.active*1) {
							case 1:
								row.active = true;
							break;
							case 0:
								row.active = false;
							break;
						}
						
						c++;
						stack.add(function(p, cb) {
							scope.mongo.insert({
								collection:	'menusv1',
								data:		row
							}, cb);
						});
					});
					stack.process(function() {
						console.log("Import finished");
						
						// Now we download the widgets
						scope.sql.query("select * from widgets_v2_assoc", function(err, rows, fields) {
							var widgets = _.groupBy(rows, function(row) {
								return row.page;
							});
							var w = 0;
							var substack = new Gamify.stack();
							
							var id;
							for (id in widgets) {
								widgets[id] = _.map(widgets[id], function(widget) {
									try {
										widget.settings = JSON.parse(widget.settings);
									} catch(e) {
										console.log("Failed parsing:",widget.settings);
									}
									return widget;
								});
								substack.add(function(p, cb) {
									w++;
									scope.mongo.update({
										collection:	'menusv1',
										query:	{
											wpid:	parseInt(p.id)
										},
										data:	{
											$set:	{
												widgets:	widgets[p.id]
											}
										}
									}, cb);
								},{id:id})
							}
							
							
							substack.process(function() {
								callback({
									done:		true,
									pages:		c,
									widgets:	w
								});
							});
						});
						
					}, true);
				});
				
			}
		},
		
		importWidgetList: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				scope.sql.query("select * from widgets_v2", function(err, rows, fields) {
					var c = 0;
					_.each(rows, function(row) {
						
						row.settings 	= JSON.parse(row.settings);
						row.options 	= JSON.parse(row.options);
						
						c++;
						stack.add(function(p, cb) {
							scope.mongo.insert({
								collection:	'widgets_v2',
								data:		row
							}, cb);
						});
					});
					stack.process(function() {
						console.log("Import finished");
						callback({done:true,count:c});
					}, true);
				});
				
			}
		},
		
		importWidgets: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				stack.add(function(p, cb) {
					scope.mongo.remove({
						collection:	'widgets_v2_assoc'
					}, cb);
				});
				
				scope.sql.query("select * from widgets_v2_assoc", function(err, rows, fields) {
					var c = 0;
					_.each(rows, function(row) {
						
						row.settings 	= JSON.parse(row.settings);
						row.pageid 		= row.pageid.toString();
						
						c++;
						stack.add(function(p, cb) {
							scope.mongo.insert({
								collection:	'widgets_v2_assoc',
								data:		row
							}, cb);
						});
					});
					stack.process(function() {
						console.log("Import finished");
						callback({done:true,count:c});
					}, true);
				});
				
			}
		},
		
		importThemes: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				stack.add(function(p, cb) {
					scope.mongo.remove({
						collection:	'themes'
					}, cb);
				});
				
				scope.sql.query("select * from themes where active>0", function(err, rows, fields) {
					var c = 0;
					_.each(rows, function(row) {
						
						switch (row.active*1) {
							case 1:
								row.active = true;
							break;
							case 0:
								row.active = false;
							break;
						}
						
						row.settings = {};
						
						c++;
						stack.add(function(p, cb) {
							toolset.file.toObject(p.row.path+'theme.id', function(settings) {
								p.row.settings = JSON.stringify(settings);
								
								Gamify.log("p.row",p.row);
								
								scope.mongo.insert({
									collection:	'themes',
									data:		p.row,
									options:	{
										w: 1
									}
								}, function(a, b) {
									Gamify.log("response", [a, b]);
									cb();
								});
							});
							
						}, {row:row});
					});
					stack.process(function() {
						console.log("Import finished");
						callback({done:true,count:c});
					}, false);
				});
				
			}
		},
		
		importDomains: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				stack.add(function(p, cb) {
					scope.mongo.remove({
						collection:	'domains'
					}, cb);
				});
				
				scope.sql.query("select * from domains", function(err, rows, fields) {
					_.each(rows, function(row) {
						stack.add(function(p, cb) {
							
							row.pageid 	= row.pageid.toString();
							row.uid 	= row.uid.toString();
							row.cost 	*= 1;
							row.status 	*= 1;
							row.active 	*= 1;
							
							scope.mongo.insert({
								collection:	'domains',
								data:		row
							}, cb);
						});
					});
					stack.process(function() {
						console.log("Import finished");
						callback({done:true,count:rows.length});
					}, true);
				});
				
			}
		},
		
		importUsers: {
			require:		[],
			auth:			false,
			description:	"SQL->Mongo",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				var stack = new Gamify.stack();
				
				stack.add(function(p, cb) {
					scope.mongo.remove({
						collection:	'users'
					}, cb);
				});
				
				scope.sql.query("select * from users", function(err, rows, fields) {
					_.each(rows, function(row) {
						stack.add(function(p, cb) {
							
							delete row.password;
							delete row.pic_square;
							
							row.register_date 	= new Date(row.register_date*1000);
							
							row.domain_credit 	*= 1;
							row.uid 			*= 1;
							
							switch (row.agency*1) {
								case 1:
									row.agency = true;
								break;
								case 0:
									row.agency = false;
								break;
							}
							
							scope.mongo.insert({
								collection:	'users',
								data:		row
							}, cb);
						});
					});
					stack.process(function() {
						console.log("Import finished");
						callback({done:true,count:rows.length});
					}, true);
				});
				
			}
		}
		
	};
	
	// Init a connection
	
	this.sql = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'pagevamp'
	});
	
	this.mongo	= new this.Gamify.mongo({database:Gamify.settings.db});
	this.mongo.init(function() {
		scope.sql.connect(function(err) {
			console.log("MySQL: Connected.");
			callback(methods);
		});
	});
}
exports.api = api;