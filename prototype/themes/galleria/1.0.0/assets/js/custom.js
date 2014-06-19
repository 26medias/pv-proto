/**
 Custom
 */
$(document).ready(function(){
 
    $("[rel='tooltip']").tooltip();    
 
    $('#hover-cap-4col .img_holder').hover(
        function(){
            $(this).find('.hover_caption').fadeIn(400); //.fadeIn(250)
        },
        function(){
            $(this).find('.hover_caption').fadeOut(300); //.fadeOut(205)
        }
    );    

    $('#hover-cap-5col .img_holder').hover(
        function(){
            $(this).find('.hover_caption').slideDown(300); //.fadeIn(250)
        },
        function(){
            $(this).find('.hover_caption').slideUp(300); //.fadeOut(205)
        }
    );   

    $('#hover-cap-6col .article').hover(
        function(){
            $(this).find('.hover_caption').fadeIn(400); //.fadeIn(250)
        },
        function(){
            $(this).find('.hover_caption').fadeOut(300); //.fadeOut(205)
        }
    );    

	if($('#contact_form').length > 0)
		$('#contact_form').validate();
	if($('.event').length > 0)   {
		$('body').css('background','#4f4d57');
	}
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
 	
});

function handleInquiry(){
	var element = $('.inquire-holder');
	$('label.error').hide();
	$('div.inquire-success').remove();
	$('div.inquire-failure').remove();

	if(element.hasClass('hidee')){
		$('.inquire').fadeOut();
		$(".inquire-img").attr("src",$('li.activeslide img').attr('src'));
		$("input[name=p_imgsrc]").val($('li.activeslide img').attr('src'));		

		element.animate({
			left: '0px'
		},1000).removeClass('hidee').addClass('show');
	} else {
		$('.inquire').fadeIn();
		element.animate({
			left: '-320px'
		},2000).removeClass('show').addClass('hidee');
	}
}