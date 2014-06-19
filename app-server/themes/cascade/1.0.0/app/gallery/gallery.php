<?php
	// This is the whole PHP code for the page!
	// We just have to call the display() function with the data we want to pass to the template in argument.
	// The framework is taking care of everything else: loading the right theme with the right version, calling the right view, passing the right data, ...
	//print_r($pageData);exit;
	
	use Mailgun\Mailgun;	
	$mgClient = new Mailgun("key-8xr1-bj8me7mb1m68tdfaf91fevk3om1");
	
	if(isset($_POST['p_inquirebtn'])) {
		
		date_default_timezone_set('America/New_York');
	
		$imgsrc     = isset($_POST['p_imgsrc']) ? mysql_real_escape_string($_POST['p_imgsrc']) : '';
		$name 		= isset($_POST['p_name']) ? mysql_real_escape_string($_POST['p_name']) : '';
		$email 		= isset($_POST['p_email']) ? mysql_real_escape_string($_POST['p_email']) : '';
		$phone 		= isset($_POST['p_phone']) ? mysql_real_escape_string($_POST['p_phone']) : '';
		$message 	= isset($_POST['p_message']) ? mysql_real_escape_string($_POST['p_message']):'';
		$spam_check = isset($_POST['p_address']) ? mysql_real_escape_string($_POST['p_address']) : '';
		
		if(!empty($imgsrc) && !empty($email) && !empty($message) && empty($spam_check)){
			
			// Admin Email
			if ($pageData["site_settings"]["contact_email"]==""){
				$admin_email = "atulyapandey@gmail.com";
			}else{
				$admin_email = $pageData["site_settings"]["contact_email"];
			}
			$msg_subject = 'Inquiry from your Pagevamp website';
			$sent_to =  $pageData["name"];
			
			//$thankyou_msg = 'Thank you for your interest! We will get back to you soon.';
			//$error_msg	  = 'Sorry! Your Inquiry could not be sent. Please try again later.';
			
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
							<td><b>Phone:</b> </td>
							<td>'.$phone.'</td>
						</tr>
						<tr>
							<td><b>Message:</b> </td>
							<td>'.$message.'</td>
						</tr>
						<tr>
							<td><b>Interested in:</b> </td>
							<td><img src="'.$imgsrc.'" style="width:300;" width="300" /></td>
						</tr>
					</table><hr>';
			try{
					$result = $mgClient->sendMessage('pagevamp.net', array('from' => $name.' <messages@pagevamp.net>',
									'h:Reply-To'=> $name .'<'. $email.'>',
									'to'      => $admin_email, 
									'subject' => $msg_subject, 
									'html'    => $msg));
				
					if($result)
						echo true;
					else 
						echo false;
						
				} catch(Exception $e) {
					$pageData['msg'] = $error_msg;
				}
			/*if(@mail($admin_email, $msg_subject, $msg, $headers)) {
				echo true;
			}
			else {
				echo false;
			}*/
			
			db_query("insert into contact_messages (pageid, date, name, email, message) values ('".db_clean($pageData["id"])."', NOW(), '".db_clean($name)."', '".db_clean($email)."', '".db_clean($message)."')");
		}
		exit;
	}
	
	share("title", "Gallery |");

	setMetas(array(
		"title" => "Gallery | ".$pageData["name"],
		"description" => ""
	));

	display($pageData);
	//debug("pageData", $pageData);
?>