var toolset 	= require('toolset');
var prompt 		= require('prompt');
var colors 		= require('colors');
var _ 			= require('underscore');
var targz 		= require('tar.gz');
var lingo 		= require('lingo');
var path		= require('path');

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

var pagevamp = function() {
	this.file = {
		credentials:	__dirname+'/../data/storage/profile.dat'
	};
	this.scaffoldDirectory	= __dirname+'/../data/scaffolds/';
}
pagevamp.prototype.getLoginData = function(callback) {
	var scope = this;
	toolset.file.exists(this.file.credentials, function(exists) {
		if (exists === true) {
			toolset.file.toObject(scope.file.credentials, function(obj) {
				if (!obj || !obj.key || !obj.secret) {
					scope.login(callback);
				} else {
					console.log("\n\nWelcome back, "+obj.firstname+"!\n\n".info);
					callback(obj);
				}
			});
		} else {
			scope.login(callback);
		}
	});
}
pagevamp.prototype.createProject = function(type, name) {
	var scope = this;
	// get the login data
	this.getLoginData(function(loginData) {
		
		// Make sure the scaffold exists
		toolset.file.exists(scope.scaffoldDirectory+type+'.zip', function(exists) {
			if (!exists) {
				console.log("That scaffold doesn't exist. Did you type it right?".error);
				return false;
			}
			
			console.log("Creating project".data, name.info);
			var directoryName = scope.directory+'/'+lingo.camelcase(name);
			
			toolset.archive.extract(scope.scaffoldDirectory+type+'.zip', directoryName, function() {
				console.log("\n\nYour project ".info+"".error+" has been created in ".info+path.normalize(directoryName));
			});
		});
		
		
		
		/*
		var compress = new targz().extract(scope.scaffolds[type], directoryName, function(err){
			if(err) {
				console.log(err);
				return false;
			}
			console.log("\n\nYour project ".info+"".error+" has been created in ".info+path.normalize(directoryName));
		});
		*/
	});
}
pagevamp.prototype.testProject = function() {
	
}
pagevamp.prototype.publishProject = function() {
	
}
pagevamp.prototype.submitProject = function() {
	
}
pagevamp.prototype.login = function(callback, message) {
	var scope = this;
	
	prompt.start()
	prompt.message = "";
	prompt.delimiter = "";
	
	if (!message) {
		message = [
			"",
			"You are not logged in yet.".info,
			"Please enter your developer key and developer secret.",
			"You will find those keys under your account, on https://apps.pagevamp.com",
			"",
			"We will only ask you for those keys once.",
			""
		];
	}
	
	_.each(message, function(msg) {
		console.log(msg);
	});
	
	var prompts = {
		properties: {
			key: {
				pattern: /^[a-zA-Z0-9]+$/,
				message: 'Invalid format.',
				description: "DEV KEY:",
				required: true
			},
			secret: {
				pattern: /^[a-zA-Z0-9]+$/,
				message: 'Invalid format.',
				description: "DEV SECRET:",
				required: true
			}
		}
	};
	
	prompt.get(prompts, function (err, result) {
		if (result && result.key && result.secret) {
			// Try to login
			scope.verifyCredentials(result, function(response){
				if (!response) {
					// Credentials do not match :(
					/// Try to login again
					scope.login(callback, [
						'',
						'Oops!'.error,
						'The key and/or secret you entered do not match any developer account.',
						''
					]);
				} else {
					// All good!
					// Let's greet the user
					console.log("\nWelcome, "+response.firstname+"!\n".info);
					// Let's save that and keep going
					scope.writeEncrypted(response, callback);
				}
			});
		} else {
			console.log("Canceled".error);
		}
		
	});
}
pagevamp.prototype.writeEncrypted = function(data, callback) {
	toolset.file.write(this.file.credentials, JSON.stringify(data, null, 4), callback);
}
pagevamp.prototype.verifyCredentials = function(credentials, callback) {
	//@todo: When we have an app store
	callback({
		firstname:	'Julien',
		lastname:	'L',
		email:		'julien@twenty-six-medias.com',
		key:		credentials.key,
		secret:		credentials.secret
	});
}
pagevamp.prototype.logout = function(callback) {
	toolset.file.removeFile(this.file.credentials, callback);
}
pagevamp.prototype.status = function() {
	
}
pagevamp.prototype.stash = function(name) {
	toolset.archive.compressDirectory(this.directory, __dirname+'/../data/'+lingo.camelcase(name)+'.zip', function(zipfile) {
		console.log("Your working directory has been saved a a template.".data);
		console.log("To create a new project using that template, type:".data);
		console.log("\tpagevamp create ".info+lingo.camelcase(name).info);
	});
}
module.exports = new pagevamp();