/**
 Custom
 */
 
$('.carousel').carousel();
$(".fancybox").fancybox({
  prevEffect : 'none',
  nextEffect : 'none',
  helpers     : {
   title: {
	type: 'inside'
   }
  }
});
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

$(function(){	
	resetHolder();
	var $portfolioItem = jQuery('.img-holder');
	//$portfolioItem.find('.item-image').css('background-color','#000000');
	jQuery('.zoom-icon, .more-icon').css('opacity','0');
	
	$portfolioItem.hover(function(){
		 jQuery(this).find('.item-image').find('img.portfolio').stop(true, true).animate({opacity: 0.7},500);
		 jQuery(this).find('.zoom-icon').stop(true, true).animate({opacity: 1, left: '49%'},400);
		 jQuery(this).find('.more-icon').stop(true, true).animate({opacity: 1, right: '49%'},400);
		}, function(){
		 jQuery(this).find('.zoom-icon').stop(true, true).animate({opacity: 0, left: '45%'},400);
		 jQuery(this).find('.more-icon').stop(true, true).animate({opacity: 0, right: '45%'},400);
		 jQuery(this).find('.item-image').find('img.portfolio').stop(true, true).animate({opacity: 1},500);
	});
	
});

function resetHolder(){
	try {
		$('.item-image').css('width', 'auto');
		var timer;
		clearTimeout(timer);
		timer = setTimeout(function() {
			$('.item-image').each(function(){
				$(this).width($(this).find('img').width());
				var $portfolioItem = jQuery('.img-holder');
				$portfolioItem.find('.item-image').css('background-color','#000000');
			}); }, 500);			
	} catch (err) {
		console.log(err);
	}	
}

$(window).resize(function(){
	resetHolder();
	console.log($(window).width());
	if(($('.navbar-header').width()+$('ul.navbar-right').width()) > 1120 && $(window).width() > 768)
		$('#header').addClass('extra');
	else
		$('#header').removeClass('extra');
});