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
	$album = isset($_GET['album'])?$_GET['album']:1;
	if($album)
	{
		$i = 0;
		while ($i <= 25) {
			if (($_GET['album']) == $pageData['albums']['data'][$i]['id']){
				$pageData['albumsOnly'] = $pageData['albums']['data'][$i];
				$pageData['isalbumdac'] = 1;
				$pageData['albumName'] =  $pageData['albums']['data'][$i]['name'];
			}
			$i++;
		}
		$j = 0;

		foreach($pageData['albumsOnly']['photos']['data'] as $data) {

          $pageData['albumsOnly']['photos']['data'][$j]['name'] = preg_replace( "/\r|\n/", " ", $data['name']);  
          $j++;
        }

		display($pageData);
		//debug("pageData", $pageData);
	}
	else
	{
		$pageData['isalbumdac'] = 0;
		display($pageData);
	}
	
?>