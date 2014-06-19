/**
 Custom
 */
 
$('.carousel').carousel()

$('.navbar-collapse ul li').click(function(){
	$(this).parent().find('li.active').removeClass('active');
	$(this).addClass('active');
});

$(document).ready(function(){
	var social_height = $('.social').height() + 35; // 57 plus 20px for spacing
	var footer_height = $('.bottom').height() + 32 ;
	var logo_height = $('.navbar-header').height()+ 105;
	
	var navbar_height = $(window).innerHeight() - social_height - footer_height -logo_height;
	
	$('.navbar-collapse').css('max-height', navbar_height);
	/*$('a.more').on('click', function () {
		if( $(this).hasClass('collapsed') !== true ){
			$(this).html('more info')
		}else{
			$(this).html('less info')
		}
	});*/
	
	$('a.more').on('click', function () {
		if( $(this).html() == 'less info' ){
			//$(this).html('more info');
			$(this).parents('.event_section').find('a.more').html('more info');
		}else{
			$(this).parents('.event_section').find('a.more').html('less info');
		}
	});
	
	if($('#contact_form').length > 0)
		$('#contact_form').validate();
	if($('#contact_form1').length > 0)
		$('#contact_form1').validate();
		
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
 
    $('#hover-cap-4col .img_holder').hover(
        function(){
            $(this).find('.hover_caption').fadeIn(400); //.fadeIn(250)
        },
        function(){
            $(this).find('.hover_caption').fadeOut(300); //.fadeOut(205)
        }
    );  
	$(".fancybox").fancybox({
	  prevEffect : 'none',
	  nextEffect : 'none',
	  helpers     : {
	   title: {
		type: 'inside'
	   }
	  }
	});  
 
});
$(window).resize(function(){
	var social_height = $('.social').height() + 35; // 57 plus 20px for spacing
	var footer_height = $('.bottom').height() + 32 ;
	var logo_height = $('.navbar-header').height()+ 105;	
	var navbar_height = $(window).innerHeight() - social_height - footer_height -logo_height;
	
	$('.navbar-collapse').css('max-height', navbar_height);
});