/**
 Custom
 */
$(document).ready(function(){
	if($('#contact_form').length > 0)
		$('#contact_form').validate();
	if($('#contact__form').length > 0)
		$('#contact__form').validate();
		
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
	
 	//alert($(window).width());
 	if($(window).width() < 1380){
		$('.fixed').css('margin', 0).css('left', 0);
	}
    $('#hover-cap-4col .article').hover(
        function(){
            $(this).find('.hover_caption').fadeIn(400); //.fadeIn(250)
        },
        function(){
            $(this).find('.hover_caption').fadeOut(300); //.fadeOut(205)
        }
    ); 
	
	$('.fixed').css('margin-top', '-' + $('.fixed').height() + 'px');
	
	$('a.more').on('click', function () {
		if( $(this).html() == 'less info' ){
			//$(this).html('more info');
			$(this).parents('.top').find('a.more').html('more info');
		}else{
			$(this).parents('.top').find('a.more').html('less info');
		}
	});
	
	if($('.caption').length > 0)   {
		var caption_height = 21;
		$('.caption').each(function(){
			//console.log($(this).height());
			if($(this).find('p').height() > caption_height){
				$('.caption').height( (($(this).find('p').height()/21) - 1) * 21 + 36);
				caption_height = $(this).find('p').height();
			}
			//console.log($(this).height());
		});
	}
	
	if(($('.navbar-header').width()+$('ul.navbar-right').width()) > 1150)
		$('.addextra').addClass('extra');
	
 
});

$(document).scroll(function (e) {
    var value = $(this).scrollTop();
	var check = 60 + $('.fixed').height();
	
    if (value > check) {
		$('.fixed').stop().animate({
			marginTop: 0
		},"100", "swing");
    } else {
       $('.fixed').stop().animate({
			marginTop: -$('.fixed').height()
		},"100", "swing");
    }
});

$(window).resize(function() {
	if($(window).width() < 1380){
		$('.fixed').css({'margin-left': 0,'margin-right':0, 'left':0});
	} else {
		$('.fixed').css('margin', '-130px 0 0 -690px').css('left', '50%');
	}
});

$(window).load(function(){
	if($('.contact .left.hidden-sm').length > 0){
		$('.contact .right.hidden-sm').find('iframe').height($('.contact').height());
	}
});