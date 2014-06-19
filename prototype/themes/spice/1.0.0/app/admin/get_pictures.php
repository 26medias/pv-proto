<?php
	/*
		This is an example of webservice.
		It makes a Facebook Graph query using facebook_graph("/path"), which complete the call using our app id and an app_token.
	*/
	$pictures = facebook_graph($_GET["aid"]."/photos?fields=created_time,picture,name,source,height,width,link&limit=100");
	echo json_encode($pictures);
	
?>