/**
 * Base js functions
 */

$(document).ready(function(){
    var $container = $('.maso_container');
	var $firstBlock = $('.first');
	var $secondBlock = $('.second');
	var $thirdBlock = $('.third');
	var $fifthBlock = $('.fifth');
    var gutter = 10;
    var min_width = 210;
	var gutterCount = 4;
	var showCol = 5;
	
	
	$container.imagesLoaded( function(){
		$("#loader").hide();
		$("#grid_gallery").show();
        $container.masonry({
			columnWidth: 242,
            itemSelector : '.box',
            gutterWidth: gutter,
			isFitWidth: true,
            isAnimated: true
        });
    });
	
	/*$(window).on('resize', function(){
		
		var winWidth=$(window).width();
		if(winWidth < 480) {
			$("#grid_gallery").css({'width': '75%', 'margin':'0 auto'});
			gutterCount = 1;
			showCol = 1;
		} else if(winWidth >= 480 && winWidth <= 767){
			$("#grid_gallery").css({'width': '100%', 'margin':'0 auto'});
			gutterCount = 2;
			showCol = 2;
		} else if(winWidth > 767){ 
			$("#grid_gallery").css({'width': '80%', 'margin':'0 auto'});
			if(albumCount<3) {
				$("#grid_gallery").css({'width': '60%', 'margin':'0 auto'});
				gutterCount = 5;
				showCol = 5;
			} else if (albumCount >3 && albumCount < 5){
				$("#grid_gallery").css({'width': '60%', 'margin':'0 auto'});
				gutterCount = 3;
				showCol = 5;
			} else {
				$("#grid_gallery").css({'width': '90%', 'margin':'0 auto'});
				gutterCount = 5;
				showCol = 5;	
			}
		}
		
        $container.masonry({
            itemSelector : '.box',
            gutterWidth: gutter,
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
						$fifthBlock.remove();
						$firstBlock.find('.title').css('width', box_width);
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
						$fifthBlock.remove();
						$secondBlock.find('.title').css('width', box_width);
						var textLen = $.trim($secondBlock.find('.title').text());
						if(textLen.length < charLen)
							$secondBlock.css('height', 40);
						else
							$secondBlock.css('height', 54);
					}
				}
				else
				{
					if(containerWidth>990)
					{					
						$firstBlock.remove();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fifthBlock.show();
						$fifthBlock.find('.title').css('width', box_width);
						var textLen = $.trim($fifthBlock.find('.title').text());
						if(textLen.length < charLen)
							$fifthBlock.css('height', 40);
						else
							$fifthBlock.css('height', 54);
					}
					
					if(containerWidth <= 990 && containerWidth != box_width)
					{
						
						$firstBlock.remove();
						$secondBlock.remove();
						$thirdBlock.show();
						$fifthBlock.remove();	
						$thirdBlock.find('.title').css('width', box_width);
						var textLen = $.trim($thirdBlock.find('.title').text());
						if(textLen.length < charLen)
							$thirdBlock.css('height', 40);
						else
							$thirdBlock.css('height', 54);
					}
					
					if(containerWidth <= 990 && containerWidth == box_width)
					{
						$firstBlock.show();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fifthBlock.remove();	
						$firstBlock.find('.title').css('width', box_width);
						var textLen = $.trim($firstBlock.find('.title').text());
						if(textLen.length < charLen)
							$firstBlock.css('height', 40);
						else
							$firstBlock.css('height', 54);
					}
					
					if(containerWidth <= 320 )
					{
						$firstBlock.show();
						$secondBlock.remove();
						$thirdBlock.remove();
						$fifthBlock.remove();	
						$firstBlock.find('.title').css('width', box_width);
						var textLen = $.trim($firstBlock.find('.title').text());
						if(textLen.length < charLen)
							$firstBlock.css('height', 40);
						else
							$firstBlock.css('height', 54);
					}
				}
				///--------------------------

                $('.box').width(box_width);

                return box_width;
              }
        });
	});*/
	
	
});


