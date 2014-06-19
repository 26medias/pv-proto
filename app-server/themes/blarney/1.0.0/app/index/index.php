<?php
	// This is the whole PHP code for the page!
	// We just have to call the display() function with the data we want to pass to the template in argument.
	// The framework is taking care of everything else: loading the right theme with the right version, calling the right view, passing the right data, ...
	
	setMetas(array(
		"title" => $pageData["name"],
		"description" => substr($pageData["about"], 0, 160)
	));

	display($pageData);
?>