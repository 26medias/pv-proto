/**
 Custom
 */
 
$('.carousel').carousel()
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
	$('#contact_form').validate();if($('#inquireform').length > 0){
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