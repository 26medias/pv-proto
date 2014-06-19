<?php
	// This is the whole PHP code for the page!
	// We just have to call the display() function with the data we want to pass to the template in argument.
	// The framework is taking care of everything else: loading the right theme with the right version, calling the right view, passing the right data, ...
	share("title", "Blogs | ");

	setMetas(array(
		"title" => "Blogs | ".$pageData["name"],
		"description" => ""
	));
	$pageData["logoTitle"]="Blog";
	
	
        //variable that will refer to the post in question
        $i = 0;
	
        //loop to make sure that functions are applied to all posts
        while ($i <= 20) {
            
            //Checks to see if the post is a post by the page and not another user. Also make sure there is at least a message, picture, or source.
            if (($pageData['posts']['data'][$i]['story'] == "" && ($pageData['posts']['data'][$i]['picture'] != "" or $pageData['posts']['data'][$i]['source'] != "" or (isset($pageData['posts']['data'][$i]['message'])))) or ($pageData['posts']['data'][$i]['story'] != "" && (isset($pageData['posts']['data'][$i]['message']))) ) {
                $pageData['posts']['data'][$i]['show'] = "true";
            }
            
            //if the picture url is a small picture, replace the _s with _n to pull the larger version of the image
            $pageData['posts']['data'][$i]['picture'] = str_replace("_s", "_n", $pageData['posts']['data'][$i]['picture']);
            if (preg_match("/external.ak/", $pageData['posts']['data'][$i]['picture'])){
                $pageData['posts']['data'][$i]['picture'] = "";
            }
            
            //if the message and the link are the same, remove the message and also remove the picture
            $repmessage = $pageData['posts']['data'][$i]['message'];
            $replink = $pageData['posts']['data'][$i]['link'];
            if (strcmp ($repmessage , $replink ) == 0){
                $pageData['posts']['data'][$i]['message'] = "";
                $pageData['posts']['data'][$i]['picture'] = "";
            }
            
            //if the link is a soundcloud link, get the sound cloud info from soundcloud
            //then save it as soundcloud
            if (preg_match("/soundcloud.com/", $replink)){
                $getsound = "http://soundcloud.com/oembed?format=json&url=".$replink."&iframe=true";
                $pageData['posts']['data'][$i]['soundcloud'] = json_read($getsound);
                //debug("soundinfo", $soundinfo);
                //debug("getsound", $getsound);
            }
            
            //this is the post message
            $postMessage = $pageData['posts']['data'][$i]['message'];
            
            
            //If the post link is not included in the message, then display the link after the post.
            if (strpos($pageData['posts']['data'][$i]['message'], $pageData['posts']['data'][$i]['link']) == false){
                //if the link is to a facebook post, then no need to display this link
                if (preg_match("/facebook.com/", $replink)) {
                }
                else{
                    $pageData['posts']['data'][$i]['message']=$pageData['posts']['data'][$i]['message']." ".$pageData['posts']['data'][$i]['link'];
                }
            }
            
            //convert links within a post message into actual links
            $pageData['posts']['data'][$i]['message'] = preg_replace('$(https?://[a-z0-9_./?=&#-]+)(?![^<>]*>)$i', ' <a href="$1" target="_blank">$1</a> ', $pageData['posts']['data'][$i]['message']." ");
            $pageData['posts']['data'][$i]['message'] = preg_replace('$(www\.[a-z0-9_./?=&#-]+)(?![^<>]*>)$i', '<a target="_blank" href="http://$1"  target="_blank">$1</a> ', $pageData['posts']['data'][$i]['message']." ");
            
            //Finds the amount of likes, converts it to a string, and saves at as likesCount if > 0
            $allLikes = $pageData['posts']['data'][$i]['likes']['count'];
            if ($allLikes > 0){
                $pageData['posts']['data'][$i]['likesCount'] = strval($allLikes);
            }
            
            //Counts the number of comments, converts it to a string, and saves it as commentsCount if > 0
            $allComments = $pageData['posts']['data'][$i]['comments']['data'];
            $commentsNumber = count($allComments);
            if ($commentsNumber > 0) {
                $commentsCount = strval($commentsNumber);
		if ($commentsCount == 25){
		    $pageData['posts']['data'][$i]['commentsCount'] = $commentsCount."+";
		}else {
		    $pageData['posts']['data'][$i]['commentsCount'] = $commentsCount;
		}
            }
            
            //set default iframeheight to 400
            $pageData['posts']['data'][$i]['iframeheight'] = 400;
            
            $postSource =  $pageData['posts']['data'][$i]['source'];
            $shortSource = substr($pageData['posts']['data'][$i]['source'], 0, strpos($pageData['posts']['data'][$i]['source'], '?'));
            $postLink = $pageData['posts']['data'][$i]['link'];
            
            //if the source is a youtube video, replace the old youtube embed source (provided by facebook) with the new mobile friendly one.
            if (preg_match('#\b(youtube.com)\b#', $postSource)){
                $pageData['posts']['data'][$i]['source'] = str_replace("http://www.youtube.com/v/", "//www.youtube.com/embed/", $shortSource);
                $pageData['posts']['data'][$i]['iframeheight'] = 400;
            }
            //if the source is a vimeo video, replace the old vimeo embed source (provided by facebook) with the new mobile friendly one.
            else if (preg_match('#\b(vimeo.com)\b#', $postSource)){
                $pageData['posts']['data'][$i]['source'] = str_replace("https://vimeo.com", "//player.vimeo.com/video", $pageData['posts']['data'][$i]['link']);
                $pageData['posts']['data'][$i]['source'] = str_replace("http://vimeo.com", "//player.vimeo.com/video", $pageData['posts']['data'][$i]['source']);
                $pageData['posts']['data'][$i]['iframeheight'] = 400;
            }
            //if the source is soundcloud, turn off autoplay and set iframe height to 100
            else if (preg_match('#\b(soundcloud.com)\b#', $postSource)){
                $pageData['posts']['data'][$i]['source'] = str_replace('true', 'false', $postSource);
                $pageData['posts']['data'][$i]['iframeheight'] = 100;
            }
            //if the source is bandcamp, set the iframe height to 100
	    else if (preg_match('#\b(bandcamp.com)\b#', $postSource)){
                $pageData['posts']['data'][$i]['iframeheight'] = 100;
            }
            //if the source is a Facebook video, create the correct facebook embed url using the object_id
	    else if ((preg_match('#\b(video.ak.fbcdn)\b#', $postSource))||(preg_match('#\b(fbcdn-video)\b#', $postSource))||(preg_match('#\b(fbcdn.net/hvideo)\b#', $postSource))){
		 $pageData['posts']['data'][$i]['source'] = "https://www.facebook.com/video/embed?video_id=".$pageData['posts']['data'][$i]['object_id'];
		 $pageData['posts']['data'][$i]['iframeheight'] = 400;
            }
            else{
            }
            
            //get the correct url and title for social sharing
            $postURLname = substr($pageData['posts']['data'][$i]['message'], 0, 100);
            $pageData['posts']['data'][$i]['postURLname'] = $postURLname." (post by ".$pageData['name'].")";
            $pageData['posts']['data'][$i]['urlmessage'] = urlencode($pageData['posts']['data'][$i]['message']);
            
            $i++;
            
        }
		
		if( isset($_GET['blog']))
		{
			
		}
		
		
        display($pageData);
		//echo '<pre>';print_r($pageData['posts']);echo '</pre>';
	//debug("pageData", $pageData);
?>
