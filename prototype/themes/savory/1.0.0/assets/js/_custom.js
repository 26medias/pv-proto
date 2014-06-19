/**
 Custom
 */
$(document).ready(function(){
	if($('#contact_form').length > 0)
		$('#contact_form').validate();
	
    $('#hover-cap-4col .article').hover(
        function(){
            $(this).find('.hover_caption').fadeIn(400); //.fadeIn(250)
        },
        function(){
            $(this).find('.hover_caption').fadeOut(300); //.fadeOut(205)
        }
    );
	//console.log($('#banner').height());
	if($('ul.topBar').height()>90)
	{
		topval = $('#banner').height()-$('#header').height()-45;
		//console.log($('#banner').height()+'---'+$('#header').height()+'---'+topval);
		$('#header').css('top', topval+'px');
	}
	/*if($('.topBar li').length>8)
	{
		$('.topBar li').css('padding-bottom', '15px');
		$('#header').css('top', '345px');	
	}*/
	
	$('.topBar li').each(function(){
		menustr = $(this).find('a').text();
		menuWidth = menustr.length*10 + 50;
		if(menuWidth>130)
		{
			$(this).css('width', menuWidth);
			//$(this).find('a').css('width', menuWidth);
		}
	}); 
	
 
});



$( window ).load(function() {
        var logowidth = ($('#logoCustom').width()/2)
        $('.customLogo').css({'margin-left': - logowidth});
    });    

function changeLongText() {
	if($(window).width() < 963 && $(window).width() > 751) {
		if($('.navbar-brand').height() > 20 && $('.navbar-brand').height() <= 40 ) {
			$('.navbar-brand').css('line-height','0.9');
			$('.navbar-brand').css('top','-70px');
		}
		else if($('.navbar-brand').height() > 40 && $('.navbar-brand').height() <= 60 ) {
			$('.navbar-brand').css('line-height','0.9');
			$('.navbar-brand').css('top','-110px');
		}
		else if($('.navbar-brand').height() > 60 && $('.navbar-brand').height() <= 80 ) {
			$('.navbar-brand').css('line-height','0.9');
			$('.navbar-brand').css('top','-65px');
			$('.navbar-brand').css('font-size','48px');
		}
		else if($('.navbar-brand').height() > 80 && $('.navbar-brand').height() <= 100 ) {
			$('.navbar-brand').css('line-height','0.9');
			$('.navbar-brand').css('top','-65px');
			$('.navbar-brand').css('font-size','48px');
		}
	}
	else {
		if($('.navbar-brand').height() > 20 && $('.navbar-brand').height() <= 40 ) {
			$('.navbar-brand').css('line-height','0.9');
			$('.navbar-brand').css('top','-115px');
		}
		else if($('.navbar-brand').height() > 40 && $('.navbar-brand').height() <= 60 ) {
			$('.navbar-brand').css('line-height','0.9');
			$('.navbar-brand').css('top','-195px');
		}
		else if($('.navbar-brand').height() > 60 && $('.navbar-brand').height() <= 80 ) {
			$('.navbar-brand').css('line-height','0.9');
			$('.navbar-brand').css('top','-65px');
			$('.navbar-brand').css('font-size','48px');
		}
		else if($('.navbar-brand').height() > 80 && $('.navbar-brand').height() <= 100 ) {
			$('.navbar-brand').css('line-height','0.9');
			$('.navbar-brand').css('top','-65px');
			$('.navbar-brand').css('font-size','48px');
		}
	}
}

$(window).load(function(){
	changeLongText();
});

$(window).resize(function(){
	changeLongText();
});
