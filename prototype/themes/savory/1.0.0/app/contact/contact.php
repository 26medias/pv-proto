<?php
	// This is the whole PHP code for the page!
	// We just have to call the display() function with the data we want to pass to the template in argument.
	// The framework is taking care of everything else: loading the right theme with the right version, calling the right view, passing the right data, ...
	use Mailgun\Mailgun;	
	$mgClient = new Mailgun("key-8xr1-bj8me7mb1m68tdfaf91fevk3om1");
	
	date_default_timezone_set('America/New_York');

	if(isset($_POST['p_send'])) {
		$name 		= isset($_POST['p_name']) ? mysql_real_escape_string($_POST['p_name']) : '';
		$email 		= isset($_POST['p_email']) ? mysql_real_escape_string($_POST['p_email']) : '';
		$message 	= isset($_POST['p_message']) ? mysql_real_escape_string($_POST['p_message']):'';
		
		if(!empty($email) && !empty($message)){
			
			// Admin Email
			if ($pageData["site_settings"]["contact_email"]==""){
				$admin_email = "atulyapandey@gmail.com";
			}else{
				$admin_email = $pageData["site_settings"]["contact_email"];
			}
			$msg_subject = 'Message from your Pagevamp website';
			$sent_to =  $pageData["name"];
			
			$thankyou_msg = 'Thank you for your interest! We will get back to you soon.';
			$error_msg	  = 'Sorry! Your message could not be sent. Please try again later.';
			
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		
			$headers .= 'From: '.$name.' <'.$email.'>' . "\r\n";
			$headers .= 'Reply-To: '.$name.' <'.$email.'>' . "\r\n";
			
			$msg = '<hr>
					<table style="font:12px arial,sans-serif;">
						<tr>
							<td><b>Sent to:</b> </td>
							<td>'.$sent_to.'</td>
						</tr>
						<tr>
							<td><b>From:</b> </td>
							<td>'.$name.'</td>
						</tr>
						<tr>
							<td><b>Email:</b> </td>
							<td>'.$email.'</td>
						</tr>
						<tr>
							<td><b>Message:</b> </td>
							<td>'.$message.'</td>
						</tr>
					</table><hr>';
			
			try{
				$result = $mgClient->sendMessage('pagevamp.net', array('from' => $name.' <messages@pagevamp.net>',
								'h:Reply-To'=> $name .'<'. $email.'>',
								'to'      => $admin_email, 
								'subject' => $msg_subject, 
								'html'    => $msg));
			
				if($result)
					$pageData['msg'] = $thankyou_msg;
				else 
					$pageData['msg'] = $error_msg;
					
			} catch(Exception $e) {
				$pageData['msg'] = $error_msg;
			}
			
			db_query("insert into contact_messages (pageid, date, name, email, message) values ('".db_clean($pageData["id"])."', NOW(), '".db_clean($name)."', '".db_clean($email)."', '".db_clean($message)."')");
		}
	}
	
	share("title", "Contact | ");

	setMetas(array(
		"title" => "Contact | ".$pageData["name"],
		"description" => ""
	));

	$locationcommas = array("street","city","state","country");
	$locationfiltered = array();
	foreach($locationcommas as $key=>$value){
		if (array_key_exists($value, $pageData['location'])){
			if($pageData["location"][$value]!=""){
				array_push($locationfiltered,$pageData["location"][$value] );
			}
		}	
	}
	$pageData['locationcommas']= implode(', ', $locationfiltered)." ".$pageData["location"]["zip"];
	//debug("pagedata",$pageData["id"]);
	display($pageData);
?>