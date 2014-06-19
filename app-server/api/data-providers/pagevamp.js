var _ 					= require('underscore');
var social 				= require("social-api");

// Extendd the date Object
Date.prototype.olderThan = function(t) {
	return this.getTime() < new Date().getTime()-t;
}

exports.dataProvider = function (Gamify) {
	
	Gamify.data.pagevamp = new (function() {
		
		var scope 			= this;
		
		this.vamp = function(params, callback) {
			
			// Connect to facebook API
			var fb 			= new social.facebook();
			fb.appid		= Gamify.options.appid;
			fb.appsecret	= Gamify.options.appsecret;
			
			if (params.id) {
				var objectID 	= params.id;
			} else {
				var objectID 	= fb.parseInput(params.url);
			}
			
			var date = new Date();
			
			var startTime = date.getTime();
			fb.getPageData({
				objectID:	objectID,
				app_token:	Gamify.data.facebook.app_token
			}, function(data) {
				
				if (data.error) {
					callback(Gamify.api.errorResponse(data.message));
					return false;
				}
				
				// Convert the ID to a string
				data.id = data.id.toString();
				
				// Check if there is already a page
				scope.mongo.count({
					collection:		'fbdata',
					query:			{
						id:	data.id
					}
				}, function(count) {
					if (count == 0) {
						scope.mongo.insert({
							collection:		'fbdata',
							query:			{
								id:	data.id
							},
							data:	{
								id:			data.id,	// duplicate for easy query
								object:		data,
								createdOn:	date,
								updatedOn:	date,
								createdBy:	params.__auth,	// If an authtoken was provided, __auth contains the user's UID, else it will be null
								updatelog:	[date],
								admins:		[],
								pages:		[],
								theme:		{
									name:		'paradigm',	// default
									version:	'1.0.0',
									settings:	{}
								}
							}
						}, function() {
							callback({
								imported:	true,
								new:		true,
								id:			data.id,
								time:		(new Date().getTime()-startTime)+"ms"
							});
						});
					} else {
						scope.mongo.update({
							collection:		'fbdata',
							query:			{
								id:	data.id
							},
							data:	{
								$set:	{
									object:		data,
									updatedOn:	date
								},
								$push:	{
									updatelog:	date
								}
							}
						}, function() {
							callback({
								imported:	true,
								new:		false,
								id:			data.id,
								time:		(new Date().getTime()-startTime)+"ms"
							});
						});
					}
				});
				
				
			})
		};
		
		
		// Get the data, revamp if necessary
		// Should only be an internal call
		// Doesn't include the widgets, menus, pages... Only the FB data.
		this.getData = function(params, callback) {
			
			params	= Gamify.api.fixTypes(params, {
				id:		'string'
			});
			
			Gamify.log("getData()", params);
			
			scope.mongo.find({
				collection:		'fbdata',
				query:			{
					id:		params.id
				}
			}, function(response) {
				
				if (response.length == 0) {
					// Page is not vamped
					// Get the data
					Gamify.data.pagevamp.vamp(params, function(response) {
						if (response.error) {
							callback(response);
							return false;
						}
						scope.mongo.find({
							collection:		'fbdata',
							query:			{
								id:		params.id
							}
						}, function(response) {
							callback(response[0]);
						});
					});
				} else {
					// Do we have an object?
					var pagedata = response[0];
					if (!pagedata.object.id || new Date(pagedata.updatedOn).olderThan(Gamify.options.pageTTL)) {
						// Revamp
						
						Gamify.data.pagevamp.vamp(params, function(response) {
							if (response.error) {
								callback(response);
								return false;
							}
							scope.mongo.find({
								collection:		'fbdata',
								query:			{
									id:		params.id
								}
							}, function(response) {
								callback(response[0]);
							});
						});
					} else {
						callback(pagedata);
					}
				}
			});
		}
		
		
		// Get the data, with edit data optionnal
		this.get = function(params, callback) {
			
			params	= Gamify.api.fixTypes(params, {
				id:		'string',
				edit:	'bool'
			});
			
			Gamify.data.pagevamp.getData(params, function(data) {
				if (data.error) {
					callback(data.error);
					return false;
				}
				
				if (data.error) {
					callback(data);
					return false;
				}
				
				// Get the page data (widgets, menus...)
				var dataStack 	= new Gamify.stack();
				
				// Get the menus (incl the widgets)
				dataStack.add(function(p, cb) {
					scope.mongo.find({
						collection:	"menusv1",
						query:	{
							pageid:		params.id,
							parent:		0
						},
						sort:	{
							o:	1
						}
					}, function(response) {
						
						// Now get the subpages
						scope.mongo.find({
							collection:	"menusv1",
							query:	{
								pageid:		params.id,
								parent:		{
									$gt:	0
								}
							},
							sort:	{
								o:	1
							}
						}, function(subresponse) {
							response = _.map(response, function(page){
								_.each(subresponse, function(subpage) {
									if (subpage.parent == page.id) {
										page.children = subpage;
									}
								});
								return page;
							});
							data.menus = response;
							cb();
						});
					});
				});
				
				
				if (params.edit) {
					dataStack.add(function(p, mcb) {	// mcb = main callback
						// Get the edit data
						var editStack 	= new Gamify.stack();
						
						// Will be extended with widget and theme lists
						data.list	= {};
						
						// Get the list of themes
						editStack.add(function(p, cb) {
							scope.mongo.find({
								collection:	"themes"
							}, function(response) {
								data.list.themes = response;
								data.list.themes = _.map(data.list.themes, function(theme) {
									theme.settings = JSON.parse(theme.settings);
									return theme;
								});
								cb();
							});
						});
						
						// Get the list of widgets V2
						editStack.add(function(p, cb) {
							scope.mongo.find({
								collection:	"widgets_v2"
							}, function(response) {
								data.list.widgets = response;
								cb();
							});
						});
						
						editStack.process(function(){
							mcb();
						}, true);
					});
				}
				
				
				dataStack.process(function(){
					callback(data);
				}, true);
			});
			
		}
		
		this.mongo	= new Gamify.mongo({database: Gamify.settings.db});
		this.mongo.init(function() {
			Gamify.log('Connected to ', Gamify.settings);
		});
		
	})();
};