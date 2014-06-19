var _ 					= require('underscore');
var social 				= require("social-api");

exports.dataProvider = function (Gamify) {
	
	Gamify.data.facebook = new (function() {
		
		var scope 			= this;
		
		this.refreshRate	= 1000*6060*12;		// 12 hours refresh time
		
		var fb 			= new social.facebook();
		fb.appid		= Gamify.options.appid;
		fb.appsecret	= Gamify.options.appsecret;
		
		this.app_token	= false;
		
		// Refresh the app token every 12 hours
		this.refreshAppToken = function(callback) {
			fb.get_app_access_token(function(app_token) {
				scope.app_token = app_token;
				setTimeout(function() {
					scope.refresh();
				}, scope.refreshRate);
			});
		};
		
		this.vamp = function(params, callback) {
			// Connect to facebook API
			var fb 			= new social.facebook();
			fb.appid		= Gamify.options.appid;
			fb.appsecret	= Gamify.options.appsecret;
			
			var objectID 	= fb.parseInput(params.url)
			
			var date = new Date();
			
			var startTime = date.getTime();
			fb.getPageData({
				objectID:	objectID,
				app_token:	Gamify.data.facebook.app_token
			}, function(data) {
								
				// Convert the ID to an int (FB returns as a string)
				data.id = parseInt(data.id);
				
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
		}
		
		this.mongo	= new Gamify.mongo({database: Gamify.settings.db});
		this.mongo.init(function() {
			scope.refreshAppToken();
		});
		
	})();
};