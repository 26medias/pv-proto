var _ 					= require('underscore');
var qs 					= require("querystring");
var toolset 			= require("toolset");

// Users
function api() {
	
}
api.prototype.init = function(Gamify, callback){
	var scope = this;
	
	this.Gamify = Gamify;
	
	// Return the methods
	var methods = {
		
		/*
		"reseller_id"			=> "471196",
		"reseller_password"		=> "devtesting14",
		"customer_id"			=> "9822347",
		"reg_contact"			=> "28457200",
		"dns1"					=> "dns1.stabletransit.com",
		"dns2"					=> "dns2.stabletransit.com",
		"admin_contact"			=> "28457200",
		"tech_contact"			=> "28457200",
		"billing_contact"		=> "28457200"
		*/
		
		search: {
			require:		['query'],
			auth:			false,
			description:	"Search for domains based on a keyword",
			params:			{},
			status:			'dev',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				// Call the API
				toolset.file.toObject("http://test.httpapi.com/api/domains/suggest-names.json?auth-userid=471196&auth-password=devtesting14&keyword="+escape(params.query)+"&tlds=com&tlds=net&tlds=org&tlds=biz&no-of-results=20&hyphen-allowed=false&add-related=false", function(response) {
					var domains = [];
					var domain;
					var tld;
					for (domain in response) {
						if (domain.toLowerCase() == params.query.split(' ').join('').toLowerCase()) {
							for (tld in response[domain]) {
								if (response[domain][tld] == 'available') {
									//@todo: push as an object name/tld
									domains.push({
										name:	domain.toLowerCase()+"."+tld,
										tld:	'.'+tld
									});
								}
							}
						}
					}
					callback(domains);
				});
			}
		},
		
		check: {
			require:		['keyword'],
			auth:			false,
			description:	"Search for domains based on a keyword",
			params:			{},
			status:			'compatibility',
			version:		1.0,
			callback:		function(params, req, res, callback) {
				// Call the API
				toolset.file.toObject("http://test.httpapi.com/api/domains/suggest-names.json?auth-userid=471196&auth-password=devtesting14&keyword="+escape(params.query)+"&tlds=com&tlds=net&tlds=org&tlds=biz&no-of-results=20&hyphen-allowed=false&add-related=false", function(response) {
					var domains = [];
					var domain;
					var tld;
					var availability = {};
					for (domain in response) {
						if (domain.toLowerCase() == params.query.split(' ').join('').toLowerCase()) {
							for (tld in response[domain]) {
								availability[tld] = response[domain][tld]=='available';
								
								if (response[domain][tld] == 'available') {
									//@todo: push as an object name/tld
									domains.push({
										name:	domain.toLowerCase()+"."+tld,
										tld:	'.'+tld
									});
								}
							}
						}
					}
					callback({
						raw:				response,
						availability:		availability,
						ext_flag:			false,		// No idea what that does...
						ext_availability:	false
					});
				});
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