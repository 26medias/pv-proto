/**
 Custom
 */
$(document).ready(function(){
	if($('#contact_form').length > 0)
		$('#contact_form').validate();
	
	if($('#inquireform').length > 0){
		$('#inquireform').validate({
			submitHandler: function (form) {
				$('.inquire-loader').show();
						 $.ajax({
							 type: "POST",
					url: $('#inquireform').attr('action'),
					data: $(form).serialize(),
					success: function(data){
						
						if(data)
							$('#inquireform').prepend('<div class="inquire-success">Thank you for your interest! We will get back to you soon.</div>');
						else
							$('#inquireform').prepend('<div class="inquire-failure">Sorry! Your Inquiry could not be sent. Please try again later.</div>');
							$('.inquire-loader').hide();
					}
					 // determined from click handler above
					// ajax options
				});
				return false;
			}
			
		});
	}

        _menu_check = false;
	
	var winWidth 	= $(window).width();
	if(winWidth<767)
	{
		$(".dropdown-menu").hide();	
		
		$("#menubar ul.nav li").click(function(e){
			
			if ($(this).children('div.menuAlbum').length != 0 
			&& ($(this).find('a:first').text() != 'Gallery' || $(this).find('li:first').hasClass('subpages'))){
				
				if($(this).find('li:first').hasClass('subpages')){
					var liHeight = 0;
					$(this).find('li').each(function(){
						var ddltext = $(this).find('a').text();	
						
						if($(this).hasClass('subpages')){
							if(ddltext.length>22)	
								liHeight = liHeight+55;
							else
								liHeight = liHeight+37;
						}
					});
					
					$('.menuAlbumInner',this).height(liHeight);
					//$(this).find('li').hide();
				}
				
				if($(this).attr('data-clicked')){
					return true;			
				} else {
					e.preventDefault();	
					$('.menuAlbumInner',this).css('display', 'block');
					$(this).attr('data-clicked',1);
					
				}
			}
		});
			
	}
 
    $('#hover-cap-4col .article').hover(
        function(){
            $(this).find('.hover_caption').fadeIn(400); //.fadeIn(250)
        },
        function(){
            $(this).find('.hover_caption').fadeOut(300); //.fadeOut(205)
        }
    );     
	$('.carousel').carousel({'interval': false});
	
	var $myModal = $('#myModel').modal({show: false});
	var $myCarousel = $('.carousel').carousel({'interval': false});
	
	$('.albumImage').each(function() {
		var $this = $(this);
		var index = $(this).attr('rel');
		$this.click(function() {
			var index = $(this).attr('rel');
			$myModal.modal('show');
			$myCarousel.carousel($(this).index('.albumImage'));
		});
	});
	
	$("#menubar ul.nav li").hover(function(){//alert('sdfsdf');
		if($(window).width()<768)
			return false;
		$('.menuAlbumInner',this).css('display', 'block');
		if ($('.menuAlbumInner',this).length > 0){
			//console.log($(window).width() - ($('.menuAlbumInner',this).offset().left + $('.menuAlbumInner',this).width()));			
			if(($(window).width() - ($('.menuAlbumInner',this).offset().left + $('.menuAlbumInner',this).width())) < 0 ){
				$('.menuAlbumInner',this).parent().css('right', '-45px');
				$('.menuAlbumInner',this).parent().css('left', 'auto');
			}
		}
    
    }, function(){
		if($(window).width()<768)
			return false;
        $('.menuAlbumInner',this).css('display', 'none');    
    });
	
	
	
	//if($('.dropdown-menu li').length<=30)
	var maxHeight = 160;
	var totalAlbum = 	$('.dropdown-menu li').length;
	iCount = totalAlbum/10;
	if(iCount>3)
	{
		cc = iCount-3;
		maxHeight = maxHeight+(cc*40);	
	}
	
	$(".nav > li").hover(function(){ 
		if($(window).width()<768)
			return false;
		
		$('.menuAlbum', this).each(function(){
			var actualWindowHeight = $(window).height()-62;
			var totalAlbumHeight = geTotalAlbumHeight($(this));
			
			//var totalAlbumHeight = $('.dropdown-menu li').length * 37;
			if(totalAlbumHeight>actualWindowHeight)
				$(this).find('.menuAlbumInner').css('height', 500);
			else
				$(this).find('.menuAlbumInner').css('height', totalAlbumHeight);
		});
		
		var actualWindowHeight = $(window).height()-62; 
		var totalAlbumHeight = geTotalAlbumHeight($(this).find('.menuAlbum'));
		var $container = $(this),
		$list = $container.find("ul"),
		$anchor = $container.find("a"),
		height = $list.height() * 1.1,     // make sure there is enough room at the bottom
		multiplier = height / maxHeight;
		
		// need to save height here so it can revert on mouseout
		$container.data("origHeight", $container.height());
		$list.show();
		if(totalAlbumHeight>actualWindowHeight)
		{
			if (multiplier > 1) {
				$container.mousemove(function(e) {
						var offset = $container.offset();
						if(e.pageY<maxHeight)
						{
							var relativeY = ((e.pageY - offset.top)* multiplier) - ($container.data("origHeight")* multiplier);
							if (relativeY > $container.data("origHeight")) {
								$list.css("top", -relativeY + $container.data("origHeight"));
							};
						}
					});
				}
		}
		}, function() {
				var $el = $(this);
				// put things back to normal
				$el
					.height($(this).data("origHeight"))
					.find("ul")
					.css({ top: 0 })
					.hide()
					.end()
					.find("a");
			});
	
	$(".box").each(function(){
		var boxHeight = $(this).height()-38;
		//$(this).find('.').css('top', boxHeight);
	});
});

function geTotalAlbumHeight(e)
{
	var liHeight = 0;
	e.find('.dropdown-menu li').each(function(){
		var ddltext=$(this).find('a').text();	
		if(ddltext.length>22)	
			liHeight = liHeight+55;
		else
			liHeight = liHeight+37;
	});
	return liHeight;
}

$(window).resize(function(){
	$('.menuAlbumInner').hide();
	$('.nav li').removeAttr('data-clicked');
	_menu_check = false;
	var winWidth = $(window).width();
	if(winWidth<767){
		$("#menubar ul.nav li").click(function(e){
			
			if ($(this).children('div.menuAlbum').length != 0 
			&& ($(this).find('a:first').text() != 'Gallery' || $(this).find('li:first').hasClass('subpages'))){
				
				if($(this).find('li:first').hasClass('subpages')){
					var liHeight = 0;
					$(this).find('li').each(function(){
						var ddltext = $(this).find('a').text();	
						
						if($(this).hasClass('subpages')){
							if(ddltext.length>22)	
								liHeight = liHeight+55;
							else
								liHeight = liHeight+37;
						}
					});
					
					$('.menuAlbumInner',this).height(liHeight);
					//$(this).find('li').hide();
				}
				
				if($(this).attr('data-clicked')){
					return true;			
				} else {
					e.preventDefault();	
					$('.menuAlbumInner',this).css('display', 'block');
					$(this).attr('data-clicked',1);
					
				}
			}
		});			
	}
	
	if(($('.navbar-header').width()+$('ul.navbar-right').width()) > ($('#header .container').width()-30) && $(window).width() > 768)
		$('#header').addClass('extra');
	else
		$('#header').removeClass('extra');
});
$(window).resize().load(function(){$(window).resize()});