<?php
	// This is the whole PHP code for the page!
	// We just have to call the display() function with the data we want to pass to the template in argument.
	// The framework is taking care of everything else: loading the right theme with the right version, calling the right view, passing the right data, ...
	share("title", "Events | ");

	setMetas(array(
		"title" => "Events | ".$pageData["name"],
		"description" => ""
	));	
	if( isset($_GET['event']))
	{
		$pageData['isEvent'] = 1;
		$pageData['eventOnly'] = $pageData['events']['data'][$_GET['event']];
		$pageData['isalbumdac'] = 1;
		display($pageData);
		//echo "<pre>";print_r($pageData['eventOnly']);echo "</pre>";
	}
	else
	{
		$pageData['isEvent'] = 0;
		krsort($pageData[events][data]);
		display($pageData);
	}
	
?>