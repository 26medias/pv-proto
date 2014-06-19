/* doLinks script */ 
function linkify(inputText, options) 
{		
	this.options = $.extend(this.options, options);	  
	inputText = inputText.replace(/\u200B/g, "");
	
	var replacePattern1 = /(src="|href="|">|\s>)?(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;ï]*[-A-Z0-9+&@#\/%=~_|ï]/gim;
	var replacedText = inputText.replace(replacePattern1, function($0,$1){ return $1?$0:'<a class="url link" href="' + $0 + '"' + 'target="_blank"' + '>'+ $0+ '</a>';});
	
	var replacePattern2 = /(src="|href="|">|\s>|https?:\/\/|ftp:\/\/)?www\.[-A-Z0-9+&@#\/%?=~_|!:,.;ï]*[-A-Z0-9+&@#\/%=~_|ï]/gim;
	var replacedText = replacedText.replace(replacePattern2, function($0,$1){ return $1?$0:'<a class="url link" href="http://' + $0 + '"' + 'target="_blank"' + '>'+ $0+ '</a>';});
	
	var replacePattern3 = /([\.\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
	var replacedText = replacedText.replace(replacePattern3, '<a class="url" href="mailto:$1">$1</a>');
	
	return replacedText;
}

$(function()
{
	var w = $(window).width();
	
	if(w >= 700)
	{
		var len = $(".logo").text().length;
		if(len>50)
		{
			var len = 150;			
			$("body > div.header").css('height','auto');
			$("body > div.header .menu li").css('line-height','32px');
			$("body > div.header .logo").css({
				"width":"100%",
				"text-align":"center"});
			
			$("body > div.header .holder").css({
				"text-align": "center", 
				"width": "100%", 
				"padding-bottom": "10px"});

			$("body > div.header .menu.right ").css({
				"float": "none",
				"display": "inline-block", 
				"margin-left": "-30px"});	
		}			
	}
	
	$li_size = $(".menu li").size()
	
	if($li_size > 5){
	$("body > div.header").css('height','auto');
	$("body > div.header .logo").css({
		"width":"100%",
		"text-align":"center"
	});
	
	$("body > div.header .holder").css( {
		"text-align": "center", 
		"width": "100%", 
		"padding-bottom": "10px"
	});
	
	$("body > div.header .menu.right ").css({
		"float": "none",
		"display": "inline-block", 
		"margin-left": "-30px"});
	}
		
	$(".shift").each(function(){
		$('ul.thumb').append($(this).html());
		$(this).remove();
	});
		
	$( ".more" ).each(function () 
	{	
		var $placeholder = $(this).find('a');		
		var urlpath = $placeholder.attr('href');
		
		if(typeof $.url(urlpath).param('fbid')!== 'undefined')
			$placeholder.find("span").text("See picture") + $placeholder.attr('target','_blank');
			
		if(typeof $.url(urlpath).param('v')!== 'undefined')
			$placeholder.find("span").text("See video") + $placeholder.attr('target','_blank');		
	});
	
	$(".full_post").each(function(i)
	{
		var text = $(this).html();
		var my = linkify(text);
		
		$('.link').each(function(){
			var myText = $(this).text();
			arr = myText.split('/');
			if( typeof arr[1] === 'undefined' )
				domain = arr[0];
			else
				domain = arr[0]+'/'+arr[1]+'/'+arr[2];
			$(this).text(domain);
		});
		
		$(this).html(linkify(text));
		
	});
	
	$( ".full_post" ).each( function (i) {
		var firsturl = $(this).find('.url').attr('href');
		if(typeof firsturl !== 'undefined'){
			firsturl.trim();
			
			if( firsturl.substring((firsturl.length - 1),(firsturl.length)) == '/' ){
				firsturl = firsturl.substring(0, firsturl.length - 1);
			}
			
			var secondurl = $(this).find('.fbcaption').find('a').attr('href');			
			if(typeof secondurl !== 'undefined') {
				secondurl.trim();
				if( secondurl.substring((secondurl.length - 1),(secondurl.length)) == '/' ){
					secondurl = secondurl.substring(0, secondurl.length - 1);
				}
					
			}
			
			if(firsturl == secondurl){
				$('.fbcaption').hide();
			}
			
		}
	});
	
	$('.label').text(function(i, text) {
		var t = $.trim(text);
		if (t.length > 25) {
			return $.trim(t).substring(0, 25) + "...";
		}
		return t;
	});
	
	$('ul.menu li').click(function(){
		if($(window).width() < 400){
			$('.menu.right').slideUp('slow');
		}
	});
			/*	
	$('html,body').plusAnchor({
		easing: 'easeInOutExpo',
		offsetTop: -length,
		speed: 1000,
		onInit: function( base ) {
		
			if ( base.initHash != '' && $(base.initHash).length > 0 ) {
		
				window.location.hash = 'hash_' + base.initHash.substring(1);
		
				window.scrollTo(0, 0);
		
				$(window).load( function() {
					
					timer = setTimeout(function() {
		
						$(base.scrollEl).animate({
							scrollTop: $($(this).attr("href")).offset().top + "px"
		
						}, base.options.speed, base.options.easing);
					}, 2000); // setTimeout
		
				}); // window.load
			}; // if window.location.hash
		
		} // onInit
	});*/

	$('.navlink').click(function() {
			$('html, body').animate({ scrollTop: $($(this).children("a").attr("data-href")).offset().top}, 2000, 'easeInOutExpo');
			
	});

	
	$('.header h2').text(function(i, text) {
    var t = $.trim(text);
    if (t.length > 20) {
        return $.trim(t).substring(0, 20) + "...";
    }
    return t;
	});
	
	
	var pull	= $('#pull');
	menu		= $('.holder ul ');
	menuHeight	= menu.height();
	$(pull).on('click', function(e) {
				e.preventDefault();
	menu.slideToggle(300,function(){
		if(pull.text()=='Hide Navigation')
			pull.text('Navigation');
		else
			pull.text('Hide Navigation');
		});
	});
	$(window).resize(function(){
		var w = $(window).width();
		if(w > 320 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
	
		$(document).ready( function() {
		$("embed").attr("wmode", "opaque");
		// IE requires more work
   
		var embedTag;
		$("embed").each(function(i) {
			embedTag = $(this).attr("outerHTML");
			if((embedTag != null) && (embedTag.length > 0)) {
				embedTag = embedTag.replace(/embed /gi, "embed wmode=\"opaque\" ");
				$(this).attr("outerHTML", embedTag);
			}
		});
  
			if ($(window).innerWidth()<=767)
			
			{
				$('object').attr('width', '300px');
				$('embed').attr('width', '300px');
				
					}
					
				
						else
						{
													
						$('object').attr('width', '356px');
						$('embed').attr('width', '356px');
						}
		});
		

	var w = $(window).width();
	if(w < 768)
		$('.thumb .nailthumb-container').nailthumb({width:200,height:198});	
	else if ( w > 768 && w < 1024) 
		$('.thumb .nailthumb-container').nailthumb({width:240,height:220});					
	else {
		$('.thumb .nailthumb-container').nailthumb({width:340,height:260});
		$('.events .event-holder').nailthumb({width:200,height:150});}

	$(".fancybox").fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers     : {
			title: {
				type: 'inside'
			}
		}
	});
	
	$(".tab_content").hide();
	$(".tab_content:first").show(); 

	$("ul.tab-title li a").click(function() {
		$("ul.tab-title li a").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn(); 
	});
	

	});		
			
//Orientation change event 
$(window).bind('orientationchange', function(event) {
	
	var w = $(window).width();
	if(w < 769){
		$('.nailthumb-container').nailthumb({width:200,height:220});
		$('.nailthumb-container.event-holder').nailthumb({width:200,height:150});}	
	else if ( w > 768 && w < 1024) {
		$('.nailthumb-container').nailthumb({width:240,height:220});
		$('.nailthumb-container.event-holder').nailthumb({width:200,height:150});}					
	else {
		$('.nailthumb-container').nailthumb({width:340,height:260});	
		$('.nailthumb-container.event-holder').nailthumb({width:200,height:150});}
	});

$(window).resize(function(){
	
	var w = $(window).width();
	if(w < 768){
		$('.thumb .nailthumb-container').nailthumb({width:200,height:220});	
		$('.events .event-holder').nailthumb({width:200,height:150});}
	else if ( w > 768 && w < 1024) {
		$('.thumb .nailthumb-container').nailthumb({width:240,height:220});	
		$('.events .event-holder').nailthumb({width:200,height:150});}				
	else {
		$('.thumb .nailthumb-container').nailthumb({width:340,height:260});
		$('.events .event-holder').nailthumb({width:200,height:150});}

});