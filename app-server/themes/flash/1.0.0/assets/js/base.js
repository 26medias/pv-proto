/**
 * Base js functions
 */

$(document).ready(function(){
	var gutter 	= 10;
    var min_width = 210;
	var gutterCount = 4;
	var showCol = 5;
    var $container 		= $('.maso_container');
	var $firstBlock 	= $('.first');
	var $secondBlock 	= $('.second');
	var $thirdBlock 	= $('.third');
	var $fourthBlock 	= $('.fourth');
	var $fifthBlock 	= $('.fifth');
    
	if($('.noShow').text()=="0")
		var albumCount = ($('.maso_container .box').length);
	else
		var albumCount = ($('.maso_container .box').length)-4;
			
	var winWidth=$(window).width();
	
	if(winWidth < 767)
		$('#grid_gallery .maso_container .box.col2').width(240);
	else
		$('#grid_gallery .maso_container .box.col2').width(490);
	
		
	if(albumCount<5){
		if(winWidth > 767)
			$("#grid_gallery").css({'width': '25%', 'margin-left':'25%'});
		gutterCount = 1;
		showCol = 1;
	} else if(albumCount<10){
		
		if(winWidth > 767)
			$("#grid_gallery").css({'width': '60%', 'margin':'0 auto'});
		if(winWidth<=767) {
			gutterCount = 1;
			showCol = 1;
		} else {
			gutterCount = 2;
			showCol = 2;
		}
	}
	
	$container.imagesLoaded( function(){
		$("#loader").hide();
		$("#grid_gallery").show();
		$('.box').each(function(){
			var $width 	= $(this).find('img').width();
			var $height = $(this).find('img').height();
			//console.log($width/$height);
			if ($width/$height >= 3)
				$(this).addClass('col2');
			else
				$(this).addClass('col1');
		});
		
        $container.masonry({
            itemSelector : '.box',
            gutterWidth: 10,
			isFitWidth: true,
            isAnimated: true,
              columnWidth: function( containerWidth ) {
				var box_width = (((containerWidth - gutterCount*gutter)/showCol) | 0) ;
				if (box_width < min_width) {
                    box_width = (((containerWidth - 2*gutter)/3) | 0);
                }

                if (box_width < min_width) {
                    box_width = containerWidth;
                }
				
				if(box_width <= 240)
					charLen = 23;
				else if(box_width <= 300)
					charLen = 40; 
				else if(box_width > 300)
					charLen = 45;
				if(showCol<5){
					if(showCol==1) {
						$firstBlock.show();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.remove();
						$firstBlock.find('.title').css('width', 240);
						var textLen = $.trim($firstBlock.find('.title').text());
						if(textLen.length < charLen)
							$firstBlock.css('height', 40);
						else
							$firstBlock.css('height', 54);
						
					} else if(showCol==2){
						$firstBlock.remove();
						$secondBlock.show();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.remove();
						$secondBlock.find('.title').css('width', 240);
						var textLen = $.trim($secondBlock.find('.title').text());
						if(textLen.length < charLen)
							$secondBlock.css('height', 40);
						else
							$secondBlock.css('height', 54);
					}
				} else {
					if (containerWidth <= 500) {
						$firstBlock.show();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.remove();	
						$firstBlock.find('.title').css('width', 240);
						var textLen = $.trim($firstBlock.find('.title').text());
						if(textLen.length < charLen)
							$firstBlock.css('height', 40);
						else
							$firstBlock.css('height', 54);
					} else if(containerWidth > 500 && containerWidth < 989) {
						$firstBlock.remove();
						$secondBlock.show();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.remove();	
						$secondBlock.find('.title').css('width', 240);
						var textLen = $.trim($secondBlock.find('.title').text());
						if(textLen.length < charLen)
							$secondBlock.css('height', 40);
						else
							$secondBlock.css('height', 54);
					} else if (containerWidth <= 1239 && containerWidth > 1000) {
						$firstBlock.remove();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fourthBlock.show();
						$fifthBlock.remove();	
						$fourthBlock.find('.title').css('width', 240);
						var textLen = $.trim($fourthBlock.find('.title').text());
						if(textLen.length < charLen)
							$fourthBlock.css('height', 40);
						else
							$fourthBlock.css('height', 54);
					} else if (containerWidth>1239) {					
						$firstBlock.remove();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.show();
						$fifthBlock.find('.title').css('width', 240);
						var textLen = $.trim($fifthBlock.find('.title').text());
						if(textLen.length < charLen)
							$fifthBlock.css('height', 40);
						else
							$fifthBlock.css('height', 54);
					} 					
					
				}
				///--------------------------

                //$('.box').width(box_width);
                return 240;
              }
        });
    });
	
	$(".fancybox")
    .attr('rel', 'gallery')
    .fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		closeBtn : false,
        beforeShow: function () {
				lnk = $(this.element).data('url');
				ttl = this.title;
				hrf = this.href;
				this.title = '<div class="modal-footer">' +
					'<ul class="social">' +
						'<li><a href="http://www.facebook.com/sharer.php?s=100&p[title]='+ttl+'&p[url]='+lnk+'&p[images[0]='+hrf+'" class="facebook" target="_blank">facebook</a></li>' +
						'<li><a href="http://twitter.com/share?url='+lnk+'&amp;text='+ttl+'&amp;via=pagevamp" class="twitter" target="_blank">twiiter</a></li>' +
						'<li><a href="https://www.addthis.com/tellfriend.php?v=300&winname=addthis&pub=no-pub-ad&source=men-300&lng=en&s=email&url='+lnk+'&title='+ttl+'&ate=AT-no-pub-ad/-/-/51fa7fd9137aae60/4/50348d2c87400843&uid=50348d2c87400843&ufbl=1&uud=1&ct=1&ui_email_to=&ui_email_from=&ui_email_note=&pre=http%3A%2F%2Fwww.addthis.com%2F&tt=0&captcha_provider=nucaptcha&at3frame=true" class="mail" target="_blank">mail</a></li>' +
						'<div data-cp-url="'+hrf+'" class="buynow_button">Buy</div>'+
					'</ul><!-- /.social -->' +
					'<div class="close_icon"><a href="#!" onclick="$.fancybox.close();">Close</a></div><!-- /.close_icon -->' +
				 '</div>';
        },
        helpers : {
            title : {
                type: 'inside'
            }
        }  
    });
	
	
	$(window).on('resize', function(){
		$.fancybox.update();
		
		var winWidth=$(window).width();
		var winWidth=$(window).width();
		
		if(winWidth < 767)
			$('#grid_gallery .maso_container .box.col2').width(240);
		else
			$('#grid_gallery .maso_container .box.col2').width(490);
		
       $container.masonry({
            itemSelector : '.box',
            gutterWidth: 10,
			isFitWidth: true,
            isAnimated: true,
              columnWidth: function( containerWidth ) {
				var box_width = (((containerWidth - gutterCount*gutter)/showCol) | 0) ;
				if (box_width < min_width) {
                    box_width = (((containerWidth - 2*gutter)/3) | 0);
                }

                if (box_width < min_width) {
                    box_width = containerWidth;
                }
				if(box_width <= 240)
					charLen = 23;
				else if(box_width <= 300)
					charLen = 40; 
				else if(box_width > 300)
					charLen = 45;
				if(showCol<5)
				{
					if(showCol==1)
					{
						$firstBlock.show();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.remove();
						$firstBlock.find('.title').css('width', 240);
						var textLen = $.trim($firstBlock.find('.title').text());
						if(textLen.length < charLen)
							$firstBlock.css('height', 40);
						else
							$firstBlock.css('height', 54);
						
					}
					else if(showCol==2)
					{
						$firstBlock.remove();
						$secondBlock.show();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.remove();
						$secondBlock.find('.title').css('width', 240);
						var textLen = $.trim($secondBlock.find('.title').text());
						if(textLen.length < charLen)
							$secondBlock.css('height', 40);
						else
							$secondBlock.css('height', 54);
					}
				}
				else
				{
					if (containerWidth <= 500) {
						$firstBlock.show();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.remove();	
						$firstBlock.find('.title').css('width', 240);
						var textLen = $.trim($firstBlock.find('.title').text());
						if(textLen.length < charLen)
							$firstBlock.css('height', 40);
						else
							$firstBlock.css('height', 54);
					} else if(containerWidth > 500 && containerWidth < 989) {
						$firstBlock.remove();
						$secondBlock.show();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.remove();	
						$secondBlock.find('.title').css('width', 240);
						var textLen = $.trim($secondBlock.find('.title').text());
						if(textLen.length < charLen)
							$secondBlock.css('height', 40);
						else
							$secondBlock.css('height', 54);
					} else if (containerWidth <= 1239 && containerWidth > 1000) {
						$firstBlock.remove();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fourthBlock.show();
						$fifthBlock.remove();	
						$fourthBlock.find('.title').css('width', 240);
						var textLen = $.trim($fourthBlock.find('.title').text());
						if(textLen.length < charLen)
							$fourthBlock.css('height', 40);
						else
							$fourthBlock.css('height', 54);
					} else if (containerWidth>1239) {					
						$firstBlock.remove();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fourthBlock.remove();
						$fifthBlock.show();
						$fifthBlock.find('.title').css('width', 240);
						var textLen = $.trim($fifthBlock.find('.title').text());
						if(textLen.length < charLen)
							$fifthBlock.css('height', 40);
						else
							$fifthBlock.css('height', 54);
					} 					
					
				}
				///--------------------------

                //$('.box').width(box_width);
                return 240;
              }
        });
	});
	
	
});