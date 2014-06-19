<?php

    use Mailgun\Mailgun;

    if(isset($_POST['p_send'])) {
        
    
        $mgClient = new Mailgun("key-8xr1-bj8me7mb1m68tdfaf91fevk3om1");
        
        date_default_timezone_set('America/New_York');
        $name       = isset($_POST['p_name']) ? mysql_real_escape_string($_POST['p_name']) : '';
        $email      = isset($_POST['p_email']) ? mysql_real_escape_string($_POST['p_email']) : '';
        $message    = isset($_POST['p_message']) ? mysql_real_escape_string($_POST['p_message']):'';
        
        if(!empty($email) && !empty($message)){
            
            // Admin Email
            if ($p["siteInfo"]["contact_email"]==""){
                $admin_email = "atulyapandey@gmail.com";
            }else{
                $admin_email = $pageInfo["siteInfo"]["contact_email"];
            }
            $msg_subject = 'Message from your Pagevamp website';
            $sent_to =  $pageInfo["name"];
            
            $thankyou_msg = 'Thank you for your interest! We will get back to you soon.';
            $error_msg    = 'Sorry! Your message could not be sent. Please try again later.';
            
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


            //If not published but has subscription, send message anyway
            if($pageInfo["has_premium"]){
                try{
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
                    </table><hr>
                    Your Pagevamp website seems to be unpublished. Don\'t forget to publish it for the world to see!';
                    // debug("sending to premium account");
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

            //If not published, no account, notify messages in inbox, upgrade to see
            }elseif ($p["published_by"]==0){
                // try{
                //  $msg = $msg = '<hr>
                //      <table style="font:12px arial,sans-serif;">
                //          <tr>
                //              <td><b>Sent to:</b> </td>
                //              <td>'.$sent_to.'</td>
                //          </tr>
                //          <tr>
                //              <td><b>From:</b> </td>
                //              <td>'.$name.'</td>
                //          </tr>
                //          <tr>
                //              <td><b>Message:</b> </td>
                //              <td>You\'ve received a message from a visitor on your Pagevamp site. To see messages, please publish your site!</td>
                //          </tr>
                //      </table><hr>';

                //  $result = $mgClient->sendMessage('pagevamp.net', array('from' => $name.' <messages@pagevamp.net>',
                //                  'h:Reply-To'=> $name .'<'. $email.'>',
                //                  'to'      => $admin_email, 
                //                  'subject' => $msg_subject, 
                //                  'html'    => $msg));
                
                //  if($result)
                //      $pageData['msg'] = $thankyou_msg;
                //  else 
                //      $pageData['msg'] = $error_msg;
                        
                // } catch(Exception $e) {
                //      $pageData['msg'] = $error_msg;
                // }
            }

            
            db_query("insert into contact_messages (pageid, date, name, email, message) values ('".db_clean($pageInfo["pageid"])."', NOW(), '".db_clean($name)."', '".db_clean($email)."', '".db_clean($message)."')");
            
            $pageData["message"]  = "Thank you for contacting ".$pageInfo["name"]."! Your message has been sent. ";
                            

        }else{
            $pageData["error"] = true;
            
        }
    }else{
        
    }
       
    display($pageData);
	//debug("pageData", $pageData);
?>
