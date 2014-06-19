<?php
    // This is the whole PHP code for the page!
    // We just have to call the display() function with the data we want to pass to the template in argument.
    // The framework is taking care of everything else: loading the right theme with the right version, calling the right view, passing the right data, ...
    //print_r($pageData);exit;

    

    setMetas(array(
        "title" => "",
        "description" => ""
    ));
    
    $bigLetter = "_n";
        $tinyLetter = "_s";
        
        if( isset($_GET['post']))
    {
        $i = 0;
        while ($i <= 20) {
            
            if ($_GET['post'] == $pageData['posts']['data'][$i]['id']){
                if  (empty($pageData["posts"]["data"][$i]["message"])) {
                    share("title", $pageData["posts"]["data"][$i]["id"]." | Posts | ");
                }
                else {
                    share("title", substr($pageData["posts"]["data"][$i]["message"],0,10)." | Posts | ");
                }

                    $pageData['postOnly'] = $pageData['posts']['data'][$i];
            //                $pageData['postsOnly']['picture'] = str_replace($tinyLetter, $bigLetter, $pageData['postsOnly']['picture']);
            //      $pageData['ispostdac'] = 1;
            //                debug("pageData", $pageData);
                    
                    //Get the post number and save it as postNumber
                    $postNumber = $_GET['post'];
                    $pageData['postOnly']['postNumber'] = strval($postNumber);
                    
                    //if the picture url is a small picture, replace the tinyLetter with bigLetter to make it a big picture
                    $pageData['postOnly']['bigpicture'] = str_replace($tinyLetter, $bigLetter, $pageData['postOnly']['picture']);
                                    if (preg_match("/external.ak/", $pageData['postOnly']['picture'])){
                                        $pageData['postOnly']['picture'] = "";
                                        $pageData['postOnly']['bigpicture'] = "";
                                    }
                    
                    if ($pageData['postOnly']['bigpicture'] != $pageData['postOnly']['picture']) {
                    $pageData['postOnly']['pictureLink'] = "yes";
                    }
                    
                    
                    //if the message and the link are the same, remove the message and also remove the picture
                    $repmessage = $pageData['postOnly']['message'];
                    $replink = $pageData['postOnly']['link'];
                    if (strcmp ($repmessage , $replink ) == 0){
                    $pageData['postOnly']['message'] = "";
                    $pageData['postOnly']['picture'] = "";
                    }
                    
                    //if the link is a soundcloud link, get the sound cloud info from soundcloud
                    //then save it as soundcloud
                    if (preg_match("/soundcloud.com/", $replink)){
                    $getsound = "http://soundcloud.com/oembed?format=json&url=".$replink."&iframe=true";
                    $soundinfo = json_read($getsound);
                    $pageData['postOnly']['soundcloud'] = $soundinfo;
                    //debug("soundinfo", $soundinfo);
                    //debug("getsound", $getsound);
                    }
                    
                    //this is the post message
                    $postMessage = $pageData['postOnly']['message'];
                                    
                                    //If the post link is not included in the message, then display the link after the post.
                                    if (strpos($pageData['postOnly']['message'], $pageData['postOnly']['link']) == false){
                                        if (preg_match("/facebook.com/", $replink)) {
                                        }
                                        else {
                                            $pageData['postOnly']['message']=$pageData['postOnly']['message']." ".$pageData['postOnly']['link'];
                                        }
                                    }
                    
                    $pageData['postOnly']['message'] = preg_replace('$(https?://[a-z0-9_./?=&#-]+)(?![^<>]*>)$i', ' <a href="$1" target="_blank">$1</a> ', $pageData['postOnly']['message']." ");
                    $pageData['postOnly']['message'] = preg_replace('$(www\.[a-z0-9_./?=&#-]+)(?![^<>]*>)$i', '<a target="_blank" href="http://$1"  target="_blank">$1</a> ', $pageData['postOnly']['message']." ");
                    
                    
                    //Finds the amount of likes, converts it to a string, and saves at as likesCount if > 0
                    $allLikes = $pageData['postOnly']['likes']['count'];
                    if ($allLikes > 0){
                    $likesCount = strval($allLikes);
                    $pageData['postOnly']['likesCount'] = $likesCount;
                    }
                    
                    //Counts the number of comments, converts it to a string, and saves it as commentsCount if > 0
                    $allComments = $pageData['postOnly']['comments']['data'];
                    $commentsNumber = count($allComments);
                    if ($commentsNumber > 0) {
                    $commentsCount = strval($commentsNumber);
                    if ($commentsCount == 25){
                        $pageData['postOnly']['commentsCount'] = $commentsCount."+";
                    } else {
                        $pageData['postOnly']['commentsCount'] = $commentsCount;
                    }
                    }
                    
                    
                    if ($pageData['postOnly']['soundcloud']['title']){
                    $pageData['postOnly']['postTitle'] = $pageData['postOnly']['soundcloud']['title'];
                    }
                    
                    //If there is a post name, make that the post title.
                    if ($pageData['postOnly']['name'] and empty($pageData['postOnly']['soundcloud']['title'])){
                    $pageData['postOnly']['postTitle'] = $pageData['postOnly']['name'];
                    }
                    
                                    //set default iframeheight to 400
                                    $pageData['postOnly']['iframeheight'] = 400;
                                    
                    $postSource = $pageData['postOnly']['source'];
                                    $postLink = $pageData['postOnly']['link'];
                                    $shortSource = substr($pageData['postOnly']['source'], 0, strpos($pageData['postOnly']['source'], '?'));
                                    
                                    //if the source is a youtube video, replace the old youtube embed source (provided by facebook) with the new mobile friendly one.
                    if (preg_match('#\b(youtube.com)\b#', $postSource)){
                                        $youtubeSource = str_replace("http://www.youtube.com/v/", "//www.youtube.com/embed/", $shortSource);
                                        $pageData['postOnly']['youtubeSource'] = $youtubeSource;
                                        $pageData['postOnly']['iframeheight'] = 400;
                                    }
                                    //if the source is a vimeo video, replace the old vimeo embed source (provided by facebook) with the new mobile friendly one.
                                    else if (preg_match('#\b(vimeo.com)\b#', $postSource)){
                                        $vimeoSource = str_replace("https://vimeo.com", "//player.vimeo.com/video", $pageData['postOnly']['link']);
                                        $vimeoSource = str_replace("http://vimeo.com", "//player.vimeo.com/video", $vimeoSource);
                    $pageData['postOnly']['vimeoSource'] = $vimeoSource;
                    $pageData['postOnly']['iframeheight'] = 400;
                    }
                                    //if souce is soundcloud, turn off autoplay and make the iframe 100px tall.
                    else if (preg_match('#\b(soundcloud.com)\b#', $postSource)){
                    $pageData['postOnly']['source'] = str_replace('true', 'false', $postSource);
                    $pageData['postOnly']['iframeheight'] = 100;
                    }
                                    //if souce is bandcamp, make the iframe 100px tall.
                    else if (preg_match('#\b(bandcamp.com)\b#', $postSource)){
                    $pageData['postOnly']['iframeheight'] = 100;
                    }
                                    //if source is facebook video, convert it into the correct facebook video embed code using the object_id.
                    else if ((preg_match('#\b(video.ak.fbcdn)\b#', $postSource))||(preg_match('#\b(fbcdn-video)\b#', $postSource))||(preg_match('#\b(fbcdn.net/hvideo)\b#', $postSource))){
                    $pageData['postOnly']['source'] = "https://www.facebook.com/video/embed?video_id=".$pageData['posts']['data'][$i]['object_id'];
                    $pageData['postOnly']['iframeheight'] = 400;
                   }
                                   else{
                                   }
                    
                    //get the correct url for the social sharing
                    $postURLname = urlencode($pageData['postOnly']['message']);
                    $pageData['postOnly']['postURLname'] = $postURLname." (post by ".$pageData['name'].")";
                    $postURLmessage = urlencode($pageData['postOnly']['message']);
                    $pageData['postOnly']['urlmessage'] = $postURLmessage;
                    
                    
                    
                    display($pageData);
                    //debug("pageData", $pageData);
                    
            }
            $i++;
        }
    }
    else
    {
        $pageData['ispostdac'] = 0;
        display($pageData);
               //debug("pageData", $pageData);
    }
    
?>