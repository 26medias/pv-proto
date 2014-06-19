<?php
	// This is the whole PHP code for the page!
	// We just have to call the display() function with the data we want to pass to the template in argument.
	// The framework is taking care of everything else: loading the right theme with the right version, calling the right view, passing the right data, ...
	
        //these strings are the difference between the image icon facebook gives us and the full image size
	setMetas(array(
        "title" => $pageData["name"],
        "description" => substr($pageData["about"], 0, 160)
    ));

    $bigLetter = "_n";
        $tinyLetter = "_s";
	
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
                $soundinfo = json_read($getsound);
                $pageData['posts']['data'][$i]['soundcloud'] = $soundinfo;
                //debug("soundinfo", $soundinfo);
                //debug("getsound", $getsound);
            }
            
            //this is the post message
            $postMessage = $pageData['posts']['data'][$i]['message'];
            
            //Find the first sentence and set it as the Post Title
            $postName = $pageData['posts']['data'][$i]['name'];
            if (empty($postName)){
                preg_match('/^.*[^\s](\.(\n\n)|\?(\n\n)|\!(\n\n)|\.\s|\?\s|\!\s|(\n\n)|\n|\s\n)/U', $postMessage, $sentence);
                $postTitle = $sentence[0];
                $pageData['posts']['data'][$i]['postTitle'] = $postTitle;
                
                //If there is no post title, set the post message as the title
                if (empty($postTitle)){
                    $pageData['posts']['data'][$i]['postTitle'] = $postMessage;
                }
                
                //Remove the first setence (post title) from the rest of the message
                $pageData['posts']['data'][$i]['message'] = str_replace($postTitle, "", $postMessage);
            }
            //Take the message and shorten it to 400 characters for the homefeed.
            //If the full message is longer than 400 characters, cotinuereading = "true"
            $newMessage = $pageData['posts']['data'][$i]['message'];
            $pageData['posts']['data'][$i]['shortmessage'] = substr($newMessage, 0, 400);
            if (strlen($newMessage) >= 400){
                $pageData['posts']['data'][$i]['continueReading'] = "true";
            }
            
            //If the post title is the same as the post message(is the case with very short titles), remove the message
            $finalTitle = $pageData['posts']['data'][$i]['postTitle'];
            $finalMessage = $pageData['posts']['data'][$i]['shortmessage'];
            if ($finalTitle == $finalMessage){
                $pageData['posts']['data'][$i]['shortmessage'] = "";
            }
            
            //If the post link is not included in the message, then display the link after the post.
            if (strpos($pageData['posts']['data'][$i]['shortmessage'], $pageData['posts']['data'][$i]['link']) == false){
                if (preg_match("/facebook.com/", $replink)) {
                }
                else{
                    $pageData['posts']['data'][$i]['shortmessage']=$pageData['posts']['data'][$i]['shortmessage']." ".$pageData['posts']['data'][$i]['link'];
                }
            }
            
            $pageData['posts']['data'][$i]['shortmessage'] = preg_replace('$(https?://[a-z0-9_./?=&#-]+)(?![^<>]*>)$i', ' <a href="$1" target="_blank">$1</a> ', $pageData['posts']['data'][$i]['shortmessage']." ");
            $pageData['posts']['data'][$i]['shortmessage'] = preg_replace('$(www\.[a-z0-9_./?=&#-]+)(?![^<>]*>)$i', '<a target="_blank" href="http://$1"  target="_blank">$1</a> ', $pageData['posts']['data'][$i]['shortmessage']." ");
            
            //Finds the amount of likes, converts it to a string, and saves at as likesCount if > 0
            $allLikes = $pageData['posts']['data'][$i]['likes']['count'];
            if ($allLikes > 0){
                $likesCount = strval($allLikes);
                $pageData['posts']['data'][$i]['likesCount'] = $likesCount;
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
            
            //If there is a soundcloud title, make that the post title.
            if ($pageData['posts']['data'][$i]['soundcloud']['title']){
                $pageData['posts']['data'][$i]['postTitle'] = $pageData['posts']['data'][$i]['soundcloud']['title'];
            }
            
            //If there is a post name, make that the post title.
            if ($pageData['posts']['data'][$i]['name'] and empty($pageData['posts']['data'][$i]['soundcloud']['title'])){
                $pageData['posts']['data'][$i]['postTitle'] = $pageData['posts']['data'][$i]['name'];
            }
            
            //set default iframeheight to 400
            $pageData['posts']['data'][$i]['iframeheight'] = 400;
            
            $postSource =  $pageData['posts']['data'][$i]['source'];
            $shortSource = substr($pageData['posts']['data'][$i]['source'], 0, strpos($pageData['posts']['data'][$i]['source'], '?'));
            $postLink = $pageData['posts']['data'][$i]['link'];
            
            //if the source is a youtube video, replace the old youtube embed source (provided by facebook) with the new mobile friendly one.
            if (preg_match('#\b(youtube.com)\b#', $postSource)){
                $youtubeSource = str_replace("http://www.youtube.com/v/", "//www.youtube.com/embed/", $shortSource);
                $pageData['posts']['data'][$i]['youtubeSource'] = $youtubeSource;
                $pageData['posts']['data'][$i]['iframeheight'] = 400;
            }
            //if the source is a vimeo video, replace the old vimeo embed source (provided by facebook) with the new mobile friendly one.
            else if (preg_match('#\b(vimeo.com)\b#', $postSource)){
                $vimeoSource = str_replace("https://vimeo.com", "//player.vimeo.com/video", $pageData['posts']['data'][$i]['link']);
                $vimeoSource = str_replace("http://vimeo.com", "//player.vimeo.com/video", $vimeoSource);
                $pageData['posts']['data'][$i]['vimeoSource'] = $vimeoSource;
                $pageData['posts']['data'][$i]['iframeheight'] = 400;
            }
            //if the souce is soundcloud, turn off autoplay and set iframe height to 100
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
            
            //get the correct url for the social sharing
            $postURLname = urlencode($pageData['posts']['data'][$i]['postTitle']);
            $pageData['posts']['data'][$i]['postURLname'] = $postURLname." (post by ".$pageData['name'].")";
            $postURLmessage = urlencode($pageData['posts']['data'][$i]['message']);
            $pageData['posts']['data'][$i]['urlmessage'] = $postURLmessage;
            
            $i++;
            
        }
        
        //debug("widgetpages", $widgets);
        display($pageData);
        
?>