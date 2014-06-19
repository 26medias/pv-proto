/**
 Custom
 */
var FvF = {
	resize:function(){			
		$("#branding #prevBtn").width(($(document).width()-880)/2);
		$("#branding #prevBtn a").width(($(document).width()-880)/2);
		$("#branding #nextBtn").width(($(document).width()-880)/2);
		$("#branding #nextBtn a").width(($(document).width()-880)/2);
		$("#branding .logo").css("left",(($(document).width()-880)/2)+10);
		$("#slider ul").css("left",($(document).width()-880)/2);			
	}	
}

$(function(){	
	// Carousel
	$('.carousel').carousel();
	
	// Call fancybox
	$(".fancybox").fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers     : {
			title: {
				type: 'inside'
			}
		}		
	});
	
	// Contact form validation
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
	
	$('a.more').on('click', function () {
		var $parent = $(this).parent().parent();
		if( $(this).html() == 'Less info' ){
			$(this).html('More info');
			$parent.find('.info').slideToggle();			
		} else {			
			if (!$parent.find('.info').hasClass('loaded')) {
				$parent.find('.info').addClass('loaded');
				$parent.find('iframe').attr('src', $('iframe').attr('data-src'));
			}
			$(this).html('Less info');
			$parent.find('.info').slideToggle();			
		}
	});
	
	resetHolder();
		
	$("#slider li").show();
	$("#prevBtn").remove();
	$("#nextBtn").remove();
	$("#slider").easySlider({
		auto: true, 
		continuous: true,
		prevId: 		'prevBtn',
		prevText: 		'Previous',
		nextId: 		'nextBtn',	
		nextText: 		'Next',
		controlsShow:		true,
		controlsBefore:	'',
		controlsAfter:		'',	
		controlsFade:		true,
		firstId: 		'firstBtn',
		firstText: 		'First',
		firstShow:		false,
		lastId: 		'lastBtn',	
		lastText: 		'Last',
		lastShow:		false,				
		vertical:		false,
		speed: 			600,
		pause:			5000,
		numeric: 		false,
		numericId: 		'controls'
	});
	
	
	$("#image-slider li").first().toggleClass('current');
	$("#items li").first().toggleClass('current');
	$("#image-slider li").first().addClass('first');
	$("#image-slider li").last().addClass('last');
		
	$('#prevBtnImage').click(function() {
		if ($("#image-slider li.current").hasClass('first')) {
			$("#image-slider li").last().fadeIn();
			$("#image-slider li").last().addClass('current');
			$("#items li").last().addClass('current');
			$("#image-slider li.current").first().fadeOut('fast');
			$("#image-slider li.current").first().removeClass('current');
			$("#items li.current").first().removeClass('current');
		} else {
			$("#image-slider li.current").prev().fadeIn();
			$("#image-slider li.current").prev().addClass('current');
			$("#items li.current").prev().addClass('current');
			$("#image-slider li.current").next().fadeOut('fast');
			$("#image-slider li.current").next().removeClass('current');
			$("#items li.current").next().removeClass('current');
		}
	});
	
	$('#nextBtnImage').click(function() {
		if ($("#image-slider li.current").hasClass('last')) {
			$("#image-slider li").first().fadeIn();
			$("#image-slider li").first().addClass('current');
			$("#items li").first().addClass('current');
			$("#image-slider li.current").last().fadeOut('fast');
			$("#image-slider li.current").last().removeClass('current');
			$("#items li.current").last().removeClass('current');
		} else {
			$("#image-slider li.current").next().fadeIn();
			$("#image-slider li.current").next().addClass('current');
			$("#items li.current").next().addClass('current');
			$("#image-slider li.current").prev().fadeOut('fast');
			$("#image-slider li.current").prev().removeClass('current');
			$("#items li.current").prev().removeClass('current');
		}
	});
	
	$('#items a').click(function() {
		var item = '#full-'+$(this).parent().attr("id");
		$("#image-slider li.current").fadeOut('fast');
		$("#image-slider li.current").removeClass('current');
		$("#items li.current").removeClass('current');
		$(item).fadeIn();
		$(this).parent().addClass('current');
		$(item).addClass('current');
	});
	
	/* Book - Andruck Slider */
	
	$("#image-slider2 li").first().toggleClass('current');
	$("#items2 li").first().toggleClass('current');
	$("#image-slider2 li").first().addClass('first');
	$("#image-slider2 li").last().addClass('last');
		
	$('#prevBtnImage2').click(function() {
		if ($("#image-slider2 li.current").hasClass('first')) {
			$("#image-slider2 li").last().fadeIn();
			$("#image-slider2 li").last().addClass('current');
			$("#items2 li").last().addClass('current');
			$("#image-slider2 li.current").first().fadeOut('fast');
			$("#image-slider2 li.current").first().removeClass('current');
			$("#items2 li.current").first().removeClass('current');
		} else {
			$("#image-slider2 li.current").prev().fadeIn();
			$("#image-slider2 li.current").prev().addClass('current');
			$("#items2 li.current").prev().addClass('current');
			$("#image-slider2 li.current").next().fadeOut('fast');
			$("#image-slider2 li.current").next().removeClass('current');
			$("#items2 li.current").next().removeClass('current');
		}
	});
	
	$('#nextBtnImage2').click(function() {
		if ($("#image-slider2 li.current").hasClass('last')) {
			$("#image-slider2 li").first().fadeIn();
			$("#image-slider2 li").first().addClass('current');
			$("#items2 li").first().addClass('current');
			$("#image-slider2 li.current").last().fadeOut('fast');
			$("#image-slider2 li.current").last().removeClass('current');
			$("#items2 li.current").last().removeClass('current');
		} else {
			$("#image-slider2 li.current").next().fadeIn();
			$("#image-slider2 li.current").next().addClass('current');
			$("#items2 li.current").next().addClass('current');
			$("#image-slider2 li.current").prev().fadeOut('fast');
			$("#image-slider2 li.current").prev().removeClass('current');
			$("#items2 li.current").prev().removeClass('current');
		}
	});
	
	$('#items2 a').click(function() {
		var item2 = '#image-slider2 #full-'+$(this).parent().attr("id");
		$("#image-slider2 li.current").fadeOut('fast');
		$("#image-slider2 li.current").removeClass('current');
		$("#items2 li.current").removeClass('current');
		$(item2).fadeIn();
		$(this).parent().addClass('current');
		$(item2).addClass('current');
	});
	
	/* Book - Sneak Peek Slider */
	
	$("#image-slider3 li").first().toggleClass('current');
	$("#items3 li").first().toggleClass('current');
	$("#image-slider3 li").first().addClass('first');
	$("#image-slider3 li").last().addClass('last');
		
	$('#prevBtnImage3').click(function() {
		if ($("#image-slider3 li.current").hasClass('first')) {
			$("#image-slider3 li").last().fadeIn();
			$("#image-slider3 li").last().addClass('current');
			$("#items3 li").last().addClass('current');
			$("#image-slider3 li.current").first().fadeOut('fast');
			$("#image-slider3 li.current").first().removeClass('current');
			$("#items3 li.current").first().removeClass('current');
		} else {
			$("#image-slider3 li.current").prev().fadeIn();
			$("#image-slider3 li.current").prev().addClass('current');
			$("#items3 li.current").prev().addClass('current');
			$("#image-slider3 li.current").next().fadeOut('fast');
			$("#image-slider3 li.current").next().removeClass('current');
			$("#items3 li.current").next().removeClass('current');
		}
	});
	
	$('#nextBtnImage3').click(function() {
		if ($("#image-slider3 li.current").hasClass('last')) {
			$("#image-slider3 li").first().fadeIn();
			$("#image-slider3 li").first().addClass('current');
			$("#items3 li").first().addClass('current');
			$("#image-slider3 li.current").last().fadeOut('fast');
			$("#image-slider3 li.current").last().removeClass('current');
			$("#items3 li.current").last().removeClass('current');
		} else {
			$("#image-slider3 li.current").next().fadeIn();
			$("#image-slider3 li.current").next().addClass('current');
			$("#items3 li.current").next().addClass('current');
			$("#image-slider3 li.current").prev().fadeOut('fast');
			$("#image-slider3 li.current").prev().removeClass('current');
			$("#items3 li.current").prev().removeClass('current');
		}
	});
	
	$('#items3 a').click(function() {
		var item3 = '#image-slider3 #full-'+$(this).parent().attr("id");
		$("#image-slider3 li.current").fadeOut('fast');
		$("#image-slider3 li.current").removeClass('current');
		$("#items3 li.current").removeClass('current');
		$(item3).fadeIn();
		$(this).parent().addClass('current');
		$(item3).addClass('current');
	});
	
});

function resetHolder(){
	try {
		var timer;
		clearTimeout(timer);
		timer = setTimeout(function() {
			$('.item-image').each(function(){
				$(this).width($(this).find('img').width());
				var $portfolioItem = jQuery('.img-holder');
				$portfolioItem.find('.item-image').css('background-color','#000000');
			}); }, 600);			
	} catch (err) {
		console.log(err);
	}	
}

FvF.resize();

// Window Resize Event
$(window).resize(function(){
	resetHolder();
	FvF.resize();
});

// On page load
window.onload = function(){
	$('#slider li').each(function(){
		var height = '';
		height = ($(this).find('img').height()/2) - (315/2);
		$(this).find('img').css('top','-'+height+'px');
	});
	FvF.resize();
	//$('#events ul li .info').slideUp();
};

function last_msg_funtion(){	   
	var totnum_li=$('#news > .row').length;
	
	$('#loader').css('display','inline-block');
	var ID=$(".content_box:last").attr("id");
	var st = parseInt(ID)+1;
	for(a=st;a<(st+5);a++) {
		$('#'+a).attr("class","content_box");
		$('#'+a).delay(2000).fadeIn('slow');
	}			
	$('#loader').delay(2000).fadeOut();
	
	newst = st+5;
	
	if(totnum_li<newst)
		$('.moreview').delay(2000).fadeOut();
}