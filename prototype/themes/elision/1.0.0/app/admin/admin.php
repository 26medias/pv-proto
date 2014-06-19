<?php

	// We restrict the access to this page only to the owner of the page
	restricted();
	
	// init the data management class
	$data = new DataManager();
	
	
	// If the form was sent...
	if (isset($_POST["theme_setting_form"])) {
		
		// save the list
		$response 	= $data->save("settings", array(
			"company_name"	=> $_POST["company_name"],
			"logo_url"		=> $_POST["logo_url"]
		));
	}
	
	
	// Get the member list
	$settings = $data->read("settings", array(
		"company_name"	=> "Random name",
		"logo_url"		=> ""
	));
	
	
	display(array(
		"theme_settings"	=> $settings,
		"response"			=> $response	// response contains the response from CouchDB, including the revision number of the data.
	));
?>