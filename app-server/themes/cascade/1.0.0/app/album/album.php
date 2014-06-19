<?php
	// This is the whole PHP code for the page!
	// We just have to call the display() function with the data we want to pass to the template in argument.
	// The framework is taking care of everything else: loading the right theme with the right version, calling the right view, passing the right data, ...
	//print_r($pageData);exit;
	share("title", $pageData["albums"]["data"][$_GET["album"]]["name"]." | Albums | ");

	setMetas(array(
		"title" => "Albums | ".$pageData["albums"]["data"][$_GET["album"]]["name"],
		"description" => ""
	));

	if( isset($_GET['album']))
	{
		//$albumsOnly = $pageData['albums']['data'][$_GET['album']];
		$pageData['albumsOnly'] = $pageData['albums']['data'][$_GET['album']];
		$pageData['isalbumdac'] = 1;
		display($pageData);
		//debug("pageData", $pageData);
	}
	else
	{
		$pageData['isalbumdac'] = 0;
		display($pageData);
	}
	
?>