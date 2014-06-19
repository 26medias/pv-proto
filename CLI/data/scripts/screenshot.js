var page 	= require('webpage').create();
var args 	= require('system').args;

console.log("");
var i;
for (i=0;i<args.length;i++) {
	console.log("Arg ["+i+"] -> ", args[i]);
}

var filename = args[2]+'/'+args[3]+'.png';

console.log("Saving screenshot as ",filename);

try {
	page.open(args[1], function() {
		page.render(filename);
		phantom.exit();
	});
} catch(e) {
	console.error("Error!",e);
	phantom.exit();
}
