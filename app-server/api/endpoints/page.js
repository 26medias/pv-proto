var _ 					= require('underscore');
var qs 					= require("querystring");
var social 				= require("social-api");
var qs					= require('querystring');

// Users
function api() {
	
}
api.prototype.init = function(Gamify, callback){
	var scope = this;
	
	this.Gamify = Gamify;
	
	// Return the methods
	var methods = {
		
		vamp: {
			require:		['url'],
			auth:			false,
			description:	"Grab a page data and import it.",
			params:			{url:"Page url, page id or anything valid."},
			status:			'stable',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				Gamify.data.pagevamp.vamp(params, callback);
				
			}
		},
		
		
		data: {
			require:		['id'],
			auth:			false,
			description:	"Return a page data",
			params:			{id:"Page ID (fbid)", edit:"Bool. Return the edit object, with the complete site settings and options. Default: false."},
			status:			'stable',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				Gamify.log("params", params);
				
				// Get the page data
				Gamify.data.pagevamp.get(params, function(response) {
					callback(response);
				});
				
			}
		},
		
		
		update: {
			require:		['data','id','type'],
			auth:			false,
			description:	"Update a page's user settings",
			params:			{id:"Page ID (fbid)", data:"data to save", type:'Data type'},
			status:			'stable',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				
				params	= Gamify.api.fixTypes(params, {
					id:		'string',
					data:	'object',
					type:	'string'
				});
				
				switch (params.type) {
					case "settings":
						
						if (!params.data || !params.data.data) {
							callback(Gamify.api.errorResponse("The submitted data is in the wrong format! (required: data.data={...})"));
							return false;
						}
						
						// Make sure it's in the right type (bool, not string)
						params.data.data = Gamify.api.fixTypes(params.data.data, {
							analytics_switch:	'bool',
							autosync_switch:	'bool',
							logo_switch:		'bool',
							socialicons_switch:	'bool',
							whitelabel_switch:	'bool'
						});
						
						// Prepare the update query
						var setData = {};
						var i;
						for (i in params.data.data) {
							setData['settings.'+i] = params.data.data[i];
						}
						
						scope.mongo.update({
							collection:		'fbdata',
							query:			{
								id:	params.id
							},
							data:	{
								$set:	setData
							}
						}, function() {
							callback({
								updated: true
							});
						});
					break;
					case "theme":
						
						var setData = {
							theme:	params.data
						};
						
						scope.mongo.update({
							collection:		'fbdata',
							query:			{
								id:	params.id
							},
							data:	{
								$set:	setData
							}
						}, function() {
							callback({
								updated: true
							});
						});
					break;
					default:
						callback(Gamify.api.errorResponse("This data type is not supported"));
					break;
				}
			}
		}
		
	};
	
	// Init a connection
	this.mongo	= new this.Gamify.mongo({database:Gamify.settings.db});
	this.mongo.init(function() {
		callback(methods);
	});
}
exports.api = api;