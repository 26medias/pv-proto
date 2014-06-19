var fixed_menu = true;
window.jQuery = window.$ = jQuery;
/*All JS Plugins and Scripts*/

/* *** jquery.easing.1.3.js *** */
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
 
 
/* *** jquery.carousel.min *** */
/* jQuery Carousel 0.9.8
Copyright 2010 Thomas Lanciaux and Pierre Bertet.
This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
;(function($){$.fn.carousel=function(params){var params=$.extend({direction:"horizontal",loop:false,dispItems:1,pagination:false,paginationPosition:"inside",nextBtn:'<input type="button" value="" />',prevBtn:'<input type="button" value="" />',btnsPosition:"inside",nextBtnInsert:"insertAfter",prevBtnInsert:"insertBefore",nextBtnInsertFn:false,prevBtnInsertFn:false,autoSlide:false,autoSlideInterval:3000,delayAutoSlide:false,combinedClasses:false,effect:"slide",slideEasing:"swing",animSpeed:300,equalWidths:"true",verticalMargin:0,callback:function(){},useAddress:false,adressIdentifier:"carousel",tabLabel:function(tabNum){return tabNum;},showEmptyItems:true,ajaxMode:false,ajaxUrl:"",stopSlideBtn:false,stopSlideTextPause:"Pause",stopSlideTextPlay:"Play"},params);if(params.btnsPosition=="outside"){params.prevBtnInsert="insertBefore";params.nextBtnInsert="insertAfter";}params.delayAutoSlide=0+params.delayAutoSlide;return this.each(function(){var env={$elts:{},params:params,launchOnLoad:[]};env.$elts.carousel=$(this).addClass("js");env.$elts.content=$(this).children().css({position:"static","top":0});env.$elts.wrap=env.$elts.content.wrap('<div class="carousel-wrap"></div>').parent().css({overflow:"hidden",position:"relative"});env.$elts.content.wrap('<div class="margin-fixer"></div>');env.steps={first:0,count:env.$elts.content.children().length};env.$elts.loader=$('<div class="loader"></div>').css({'position':'absolute'});env.steps.last=env.steps.count-1;if(env.params.pagination){initPagination(env);}if($.isFunction(env.params.prevBtnInsertFn)){env.$elts.prevBtn=env.params.prevBtnInsertFn(env.$elts);}else{if(params.btnsPosition=="outside"){env.$elts.prevBtn=$(params.prevBtn)[params.prevBtnInsert](env.$elts.carousel);}else{env.$elts.prevBtn=$(params.prevBtn)[params.prevBtnInsert](env.$elts.wrap);}}if($.isFunction(env.params.nextBtnInsertFn)){env.$elts.nextBtn=env.params.nextBtnInsertFn(env.$elts);}else{if(params.btnsPosition=="outside"){env.$elts.nextBtn=$(params.nextBtn)[params.nextBtnInsert](env.$elts.carousel);}else{env.$elts.nextBtn=$(params.nextBtn)[params.nextBtnInsert](env.$elts.wrap);}}env.$elts.nextBtn.addClass("carousel-control next carousel-next");env.$elts.prevBtn.addClass("carousel-control previous carousel-previous");env.lastItemsToLoad;initButtonsEvents(env);env.$elts.carousel.attr('tabindex',0).add(env.$elts.carousel.children()).bind({focus:function(e){$(document).bind('keypress',function(e){switch(e.keyCode){case 39:env.$elts.nextBtn.click();break;case 37:env.$elts.prevBtn.click();break;}switch(e.charCode){case 110:env.$elts.nextBtn.click();break;case 112:env.$elts.prevBtn.click();break;}});},blur:function(){$(document).unbind('keypress');}});initAddress(env);$(function(){initCarousel(env);$.each(env.launchOnLoad,function(i,fn){fn();});if(env.params.autoSlide){initAutoSlide(env);}if(params.stopSlideBtn==true){env.$elts.stopSlideBtn=$('<button type="button" class="slide-control play">'+params.stopSlideTextPause+'</button>');createBtnStopAutoslide(env);}});});};function initCarousel(env){var $items=env.$elts.content.children();var $maxHeight=0;$items.each(function(){$item=$(this);$itemHeight=$item.outerHeight();if($itemHeight>$maxHeight){$maxHeight=$itemHeight;}});if(env.params.verticalMargin>0){$maxHeight=$maxHeight+env.params.verticalMargin;}$items.height($maxHeight);var $firstItem=env.$elts.content.children(":first");env.itemWidth=$firstItem.outerWidth();if(env.params.direction=="vertical"){env.contentWidth=env.itemWidth;}else{if(env.params.equalWidths){env.contentWidth=env.itemWidth*env.steps.count;}else{env.contentWidth=(function(){var totalWidth=0;env.$elts.content.children().each(function(){totalWidth+=$(this).outerWidth();});return totalWidth;})();}}env.$elts.content.width(env.contentWidth);env.itemHeight=$maxHeight;if(env.params.direction=="vertical"){env.$elts.content.css({height:env.itemHeight*env.steps.count+"px"});env.$elts.content.parent().css({height:env.itemHeight*env.params.dispItems+"px"});}else{env.$elts.content.parent().css({height:env.itemHeight+"px"});}updateButtonsState(env);}function initButtonsEvents(env){env.$elts.nextBtn.add(env.$elts.prevBtn).bind("enable",function(){var $this=$(this).unbind("click").bind("click",function(){if(env.params.ajaxMode&&$this.is('.next')&&getActivePageIndex(env)==(getPageTotal(env)-1)&&!env.lastItemsToLoad){ajaxLoad(env);env.$elts.content.ajaxSuccess(function(){});}else{goToStep(env,getRelativeStep(env,($this.is(".next")?"next":"prev")));if(env.params.stopSlideBtn==true){env.$elts.stopSlideBtn.trigger('pause');}else{stopAutoSlide(env);}}}).removeClass("disabled").removeAttr('disabled');if(env.params.combinedClasses){$this.removeClass("next-disabled previous-disabled").removeAttr("disabled");}}).bind("disable",function(){var $this=$(this).unbind("click").addClass("disabled").attr("disabled","disabled");if(env.params.combinedClasses){if($this.is(".next")){$this.addClass("next-disabled");}else if($this.is(".previous")){$this.addClass("previous-disabled");}}}).hover(function(){$(this).toggleClass("hover");});};function initPagination(env){env.$elts.pagination=$('<div class="center-wrap"><div class="carousel-pagination"><p></p></div></div>')[((env.params.paginationPosition=="outside")?"insertAfter":"appendTo")](env.$elts.carousel).find("p");env.$elts.paginationBtns=$([]);env.$elts.content.find("li").each(function(i){if(i%env.params.dispItems==0){addPage(env,i);}});};function addPage(env,firststep){if(env.params.pagination){env.$elts.paginationBtns=env.$elts.paginationBtns.add($('<a role="button"><span>'+env.params.tabLabel(env.$elts.paginationBtns.length+1)+'</span></a>').data("firstStep",firststep)).appendTo(env.$elts.pagination);env.$elts.paginationBtns.slice(0,1).addClass("active");env.$elts.paginationBtns.click(function(e){goToStep(env,$(this).data("firstStep"));if(env.params.stopSlideBtn==true){env.$elts.stopSlideBtn.trigger('pause');}else{stopAutoSlide(env);}});}}function initAddress(env){if(env.params.useAddress&&$.isFunction($.fn.address)){$.address.init(function(e){var pathNames=$.address.pathNames();if(pathNames[0]===env.params.adressIdentifier&&!!pathNames[1]){goToStep(env,pathNames[1]-1);}else{$.address.value('/'+env.params.adressIdentifier+'/1');}}).change(function(e){var pathNames=$.address.pathNames();if(pathNames[0]===env.params.adressIdentifier&&!!pathNames[1]){goToStep(env,pathNames[1]-1);}});}else{env.params.useAddress=false;}};function goToStep(env,step){env.params.callback(step);transition(env,step);env.steps.first=step;updateButtonsState(env);if(env.params.useAddress){$.address.value('/'+env.params.adressIdentifier+'/'+(step+1));}};function getRelativeStep(env,position){if(position=="prev"){if(!env.params.showEmptyItems){if(env.steps.first==0){return((env.params.loop)?(env.steps.count-env.params.dispItems):false);}else{return Math.max(0,env.steps.first-env.params.dispItems);}}else{if((env.steps.first-env.params.dispItems)>=0){return env.steps.first-env.params.dispItems;}else{return((env.params.loop)?(env.steps.count-env.params.dispItems):false);}}}else if(position=="next"){if((env.steps.first+env.params.dispItems)<env.steps.count){if(!env.params.showEmptyItems){return Math.min(env.steps.first+env.params.dispItems,env.steps.count-env.params.dispItems);}else{return env.steps.first+env.params.dispItems;}}else{return((env.params.loop)?0:false);}}};function transition(env,step){switch(env.params.effect){case"no":if(env.params.direction=="vertical"){env.$elts.content.css("top",-(env.itemHeight*step)+"px");}else{env.$elts.content.css("left",-(env.itemWidth*step)+"px");}break;case"fade":if(env.params.direction=="vertical"){env.$elts.content.hide().css("top",-(env.itemHeight*step)+"px").fadeIn(env.params.animSpeed);}else{env.$elts.content.hide().css("margin-left",-(env.itemWidth*step)+"px").fadeIn(env.params.animSpeed);}break;default:if(env.params.direction=="vertical"){env.$elts.content.stop().animate({top:-(env.itemHeight*step)+"px"},env.params.animSpeed,env.params.slideEasing);}else{env.$elts.content.stop().animate({'margin-left':-(env.itemWidth*step)+"px"},env.params.animSpeed,env.params.slideEasing);}break;}};function updateButtonsState(env){if(getRelativeStep(env,"prev")!==false){env.$elts.prevBtn.trigger("enable");}else{env.$elts.prevBtn.trigger("disable");}if(getRelativeStep(env,"next")!==false){env.$elts.nextBtn.trigger("enable");}else{env.$elts.nextBtn.trigger("disable");}if(env.params.pagination){env.$elts.paginationBtns.removeClass("active").filter(function(){return($(this).data("firstStep")==env.steps.first)}).addClass("active");}};function initAutoSlide(env){env.delayAutoSlide=window.setTimeout(function(){env.autoSlideInterval=window.setInterval(function(){goToStep(env,getRelativeStep(env,"next"));},env.params.autoSlideInterval);},env.params.delayAutoSlide);};function stopAutoSlide(env){window.clearTimeout(env.delayAutoSlide);window.clearInterval(env.autoSlideInterval);env.params.delayAutoSlide=0;};function createBtnStopAutoslide(env){var jButton=env.$elts.stopSlideBtn;jButton.bind({'play':function(){initAutoSlide(env);jButton.removeClass('pause').addClass('play').html(env.params.stopSlideTextPause);},'pause':function(){stopAutoSlide(env);jButton.removeClass('play').addClass('pause').html(env.params.stopSlideTextPlay);}});jButton.click(function(e){if(jButton.is('.play')){jButton.trigger('pause');}else if(jButton.is('.pause')){jButton.trigger('play');}});jButton.prependTo(env.$elts.wrap);};function getPageTotal(env){return env.$elts.pagination.children().length;};function getActivePageIndex(env){return env.steps.first/env.params.dispItems;}function ajaxLoad(env){env.$elts.carousel.prepend(env.$elts.loader);$.ajax({url:env.params.ajaxUrl,dataType:'json',success:function(data){env.lastItemsToLoad=data.bLastItemsToLoad;$(env.$elts.content).append(data.shtml);env.steps={first:env.steps.first+env.params.dispItems,count:env.$elts.content.children().length};env.steps.last=env.steps.count-1;initCarousel(env);addPage(env,env.steps.first);goToStep(env,env.steps.first);if(env.params.stopSlideBtn==true){env.$elts.stopSlideBtn.trigger('pause');}else{stopAutoSlide(env);}env.$elts.loader.remove();}});}})(jQuery);

/* *** jquery.prettyPhoto.js *** */
/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.5
------------------------------------------------------------------------- */
(function(e){function t(){var e=location.href;hashtag=e.indexOf("#prettyPhoto")!==-1?decodeURI(e.substring(e.indexOf("#prettyPhoto")+1,e.length)):false;return hashtag}function n(){if(typeof theRel=="undefined")return;location.hash=theRel+"/"+rel_index+"/"}function r(){if(location.href.indexOf("#prettyPhoto")!==-1)location.hash="prettyPhoto"}function i(e,t){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n="[\\?&]"+e+"=([^&#]*)";var r=new RegExp(n);var i=r.exec(t);return i==null?"":i[1]}e.prettyPhoto={version:"3.1.5"};e.fn.prettyPhoto=function(s){function g(){e(".pp_loaderIcon").hide();projectedTop=scroll_pos["scrollTop"]+(d/2-a["containerHeight"]/2);if(projectedTop<0)projectedTop=0;$ppt.fadeTo(settings.animation_speed,1);$pp_pic_holder.find(".pp_content").animate({height:a["contentHeight"],width:a["contentWidth"]},settings.animation_speed);$pp_pic_holder.animate({top:projectedTop,left:v/2-a["containerWidth"]/2<0?0:v/2-a["containerWidth"]/2,width:a["containerWidth"]},settings.animation_speed,function(){$pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(a["height"]).width(a["width"]);$pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);if(isSet&&S(pp_images[set_position])=="image"){$pp_pic_holder.find(".pp_hoverContainer").show()}else{$pp_pic_holder.find(".pp_hoverContainer").hide()}if(settings.allow_expand){if(a["resized"]){e("a.pp_expand,a.pp_contract").show()}else{e("a.pp_expand").hide()}}if(settings.autoplay_slideshow&&!m&&!f)e.prettyPhoto.startSlideshow();settings.changepicturecallback();f=true});C();s.ajaxcallback()}function y(t){$pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility","hidden");$pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed,function(){e(".pp_loaderIcon").show();t()})}function b(t){t>1?e(".pp_nav").show():e(".pp_nav").hide()}function w(e,t){resized=false;E(e,t);imageWidth=e,imageHeight=t;if((p>v||h>d)&&doresize&&settings.allow_resize&&!u){resized=true,fitting=false;while(!fitting){if(p>v){imageWidth=v-200;imageHeight=t/e*imageWidth}else if(h>d){imageHeight=d-200;imageWidth=e/t*imageHeight}else{fitting=true}h=imageHeight,p=imageWidth}if(p>v||h>d){w(p,h)}E(imageWidth,imageHeight)}return{width:Math.floor(imageWidth),height:Math.floor(imageHeight),containerHeight:Math.floor(h),containerWidth:Math.floor(p)+settings.horizontal_padding*2,contentHeight:Math.floor(l),contentWidth:Math.floor(c),resized:resized}}function E(t,n){t=parseFloat(t);n=parseFloat(n);$pp_details=$pp_pic_holder.find(".pp_details");$pp_details.width(t);detailsHeight=parseFloat($pp_details.css("marginTop"))+parseFloat($pp_details.css("marginBottom"));$pp_details=$pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({position:"absolute",top:-1e4});detailsHeight+=$pp_details.height();detailsHeight=detailsHeight<=34?36:detailsHeight;$pp_details.remove();$pp_title=$pp_pic_holder.find(".ppt");$pp_title.width(t);titleHeight=parseFloat($pp_title.css("marginTop"))+parseFloat($pp_title.css("marginBottom"));$pp_title=$pp_title.clone().appendTo(e("body")).css({position:"absolute",top:-1e4});titleHeight+=$pp_title.height();$pp_title.remove();l=n+detailsHeight;c=t;h=l+titleHeight+$pp_pic_holder.find(".pp_top").height()+$pp_pic_holder.find(".pp_bottom").height();p=t}function S(e){if(e.match(/youtube\.com\/watch/i)||e.match(/youtu\.be/i)){return"youtube"}else if(e.match(/vimeo\.com/i)){return"vimeo"}else if(e.match(/\b.mov\b/i)){return"quicktime"}else if(e.match(/\b.swf\b/i)){return"flash"}else if(e.match(/\biframe=true\b/i)){return"iframe"}else if(e.match(/\bajax=true\b/i)){return"ajax"}else if(e.match(/\bcustom=true\b/i)){return"custom"}else if(e.substr(0,1)=="#"){return"inline"}else{return"image"}}function x(){if(doresize&&typeof $pp_pic_holder!="undefined"){scroll_pos=T();contentHeight=$pp_pic_holder.height(),contentwidth=$pp_pic_holder.width();projectedTop=d/2+scroll_pos["scrollTop"]-contentHeight/2;if(projectedTop<0)projectedTop=0;if(contentHeight>d)return;$pp_pic_holder.css({top:projectedTop,left:v/2+scroll_pos["scrollLeft"]-contentwidth/2})}}function T(){if(self.pageYOffset){return{scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset}}else if(document.documentElement&&document.documentElement.scrollTop){return{scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft}}else if(document.body){return{scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft}}}function N(){d=e(window).height(),v=e(window).width();if(typeof $pp_overlay!="undefined")$pp_overlay.height(e(document).height()).width(v)}function C(){if(isSet&&settings.overlay_gallery&&S(pp_images[set_position])=="image"){itemWidth=52+5;navWidth=settings.theme=="facebook"||settings.theme=="pp_default"?50:30;itemsPerPage=Math.floor((a["containerWidth"]-100-navWidth)/itemWidth);itemsPerPage=itemsPerPage<pp_images.length?itemsPerPage:pp_images.length;totalPage=Math.ceil(pp_images.length/itemsPerPage)-1;if(totalPage==0){navWidth=0;$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()}else{$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()}galleryWidth=itemsPerPage*itemWidth;fullGalleryWidth=pp_images.length*itemWidth;$pp_gallery.css("margin-left",-(galleryWidth/2+navWidth/2)).find("div:first").width(galleryWidth+5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");goToPage=Math.floor(set_position/itemsPerPage)<totalPage?Math.floor(set_position/itemsPerPage):totalPage;e.prettyPhoto.changeGalleryPage(goToPage);$pp_gallery_li.filter(":eq("+set_position+")").addClass("selected")}else{$pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")}}function k(t){if(settings.social_tools)facebook_like_link=settings.social_tools.replace("{location_href}",encodeURIComponent(location.href));settings.markup=settings.markup.replace("{pp_social}","");e("body").append(settings.markup);$pp_pic_holder=e(".pp_pic_holder"),$ppt=e(".ppt"),$pp_overlay=e("div.pp_overlay");if(isSet&&settings.overlay_gallery){currentGalleryPage=0;toInject="";for(var n=0;n<pp_images.length;n++){if(!pp_images[n].match(/\b(jpg|jpeg|png|gif)\b/gi)){classname="default";img_src=""}else{classname="";img_src=pp_images[n]}toInject+="<li class='"+classname+"'><a href='#'><img src='"+img_src+"' width='50' alt='' /></a></li>"}toInject=settings.gallery_markup.replace(/{gallery}/g,toInject);$pp_pic_holder.find("#pp_full_res").after(toInject);$pp_gallery=e(".pp_pic_holder .pp_gallery"),$pp_gallery_li=$pp_gallery.find("li");$pp_gallery.find(".pp_arrow_next").click(function(){e.prettyPhoto.changeGalleryPage("next");e.prettyPhoto.stopSlideshow();return false});$pp_gallery.find(".pp_arrow_previous").click(function(){e.prettyPhoto.changeGalleryPage("previous");e.prettyPhoto.stopSlideshow();return false});$pp_pic_holder.find(".pp_content").hover(function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()},function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()});itemWidth=52+5;$pp_gallery_li.each(function(t){e(this).find("a").click(function(){e.prettyPhoto.changePage(t);e.prettyPhoto.stopSlideshow();return false})})}if(settings.slideshow){$pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');$pp_pic_holder.find(".pp_nav .pp_play").click(function(){e.prettyPhoto.startSlideshow();return false})}$pp_pic_holder.attr("class","pp_pic_holder "+settings.theme);$pp_overlay.css({opacity:0,height:e(document).height(),width:e(window).width()}).bind("click",function(){if(!settings.modal)e.prettyPhoto.close()});e("a.pp_close").bind("click",function(){e.prettyPhoto.close();return false});if(settings.allow_expand){e("a.pp_expand").bind("click",function(t){if(e(this).hasClass("pp_expand")){e(this).removeClass("pp_expand").addClass("pp_contract");doresize=false}else{e(this).removeClass("pp_contract").addClass("pp_expand");doresize=true}y(function(){e.prettyPhoto.open()});return false})}$pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click",function(){e.prettyPhoto.changePage("previous");e.prettyPhoto.stopSlideshow();return false});$pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click",function(){e.prettyPhoto.changePage("next");e.prettyPhoto.stopSlideshow();return false});x()}s=jQuery.extend({hook:"rel",animation_speed:"fast",ajaxcallback:function(){},slideshow:5e3,autoplay_slideshow:false,opacity:.8,show_title:true,allow_resize:true,allow_expand:true,default_width:500,default_height:344,counter_separator_label:"/",theme:"pp_default",horizontal_padding:20,hideflash:false,wmode:"opaque",autoplay:true,modal:false,deeplinking:true,overlay_gallery:true,overlay_gallery_max:30,keyboard_shortcuts:true,changepicturecallback:function(){},callback:function(){},ie6_fallback:true,markup:'<div class="pp_pic_holder"> 						<div class="ppt"> </div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',gallery_markup:'<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',image_markup:'<img id="fullResImage" src="{path}" />',flash_markup:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',quicktime_markup:'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',iframe_markup:'<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',inline_markup:'<div class="pp_inline">{content}</div>',custom_markup:"",social_tools:'<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'},s);var o=this,u=false,a,f,l,c,h,p,d=e(window).height(),v=e(window).width(),m;doresize=true,scroll_pos=T();e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto",function(){x();N()});if(s.keyboard_shortcuts){e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto",function(t){if(typeof $pp_pic_holder!="undefined"){if($pp_pic_holder.is(":visible")){switch(t.keyCode){case 37:e.prettyPhoto.changePage("previous");t.preventDefault();break;case 39:e.prettyPhoto.changePage("next");t.preventDefault();break;case 27:if(!settings.modal)e.prettyPhoto.close();t.preventDefault();break}}}})}e.prettyPhoto.initialize=function(){settings=s;if(settings.theme=="pp_default")settings.horizontal_padding=16;theRel=e(this).attr(settings.hook);galleryRegExp=/\[(?:.*)\]/;isSet=galleryRegExp.exec(theRel)?true:false;pp_images=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).attr("href")}):e.makeArray(e(this).attr("href"));pp_titles=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).find("img").attr("alt")?e(t).find("img").attr("alt"):""}):e.makeArray(e(this).find("img").attr("alt"));pp_descriptions=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).attr("title")?e(t).attr("title"):""}):e.makeArray(e(this).attr("title"));if(pp_images.length>settings.overlay_gallery_max)settings.overlay_gallery=false;set_position=jQuery.inArray(e(this).attr("href"),pp_images);rel_index=isSet?set_position:e("a["+settings.hook+"^='"+theRel+"']").index(e(this));k(this);if(settings.allow_resize)e(window).bind("scroll.prettyphoto",function(){x()});e.prettyPhoto.open();return false};e.prettyPhoto.open=function(t){if(typeof settings=="undefined"){settings=s;pp_images=e.makeArray(arguments[0]);pp_titles=arguments[1]?e.makeArray(arguments[1]):e.makeArray("");pp_descriptions=arguments[2]?e.makeArray(arguments[2]):e.makeArray("");isSet=pp_images.length>1?true:false;set_position=arguments[3]?arguments[3]:0;k(t.target)}if(settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","hidden");b(e(pp_images).size());e(".pp_loaderIcon").show();if(settings.deeplinking)n();if(settings.social_tools){facebook_like_link=settings.social_tools.replace("{location_href}",encodeURIComponent(location.href));$pp_pic_holder.find(".pp_social").html(facebook_like_link)}if($ppt.is(":hidden"))$ppt.css("opacity",0).show();$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);$pp_pic_holder.find(".currentTextHolder").text(set_position+1+settings.counter_separator_label+e(pp_images).size());if(typeof pp_descriptions[set_position]!="undefined"&&pp_descriptions[set_position]!=""){$pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))}else{$pp_pic_holder.find(".pp_description").hide()}movie_width=parseFloat(i("width",pp_images[set_position]))?i("width",pp_images[set_position]):settings.default_width.toString();movie_height=parseFloat(i("height",pp_images[set_position]))?i("height",pp_images[set_position]):settings.default_height.toString();u=false;if(movie_height.indexOf("%")!=-1){movie_height=parseFloat(e(window).height()*parseFloat(movie_height)/100-150);u=true}if(movie_width.indexOf("%")!=-1){movie_width=parseFloat(e(window).width()*parseFloat(movie_width)/100-150);u=true}$pp_pic_holder.fadeIn(function(){settings.show_title&&pp_titles[set_position]!=""&&typeof pp_titles[set_position]!="undefined"?$ppt.html(unescape(pp_titles[set_position])):$ppt.html(" ");imgPreloader="";skipInjection=false;switch(S(pp_images[set_position])){case"image":imgPreloader=new Image;nextImage=new Image;if(isSet&&set_position<e(pp_images).size()-1)nextImage.src=pp_images[set_position+1];prevImage=new Image;if(isSet&&pp_images[set_position-1])prevImage.src=pp_images[set_position-1];$pp_pic_holder.find("#pp_full_res")[0].innerHTML=settings.image_markup.replace(/{path}/g,pp_images[set_position]);imgPreloader.onload=function(){a=w(imgPreloader.width,imgPreloader.height);g()};imgPreloader.onerror=function(){alert("Image cannot be loaded. Make sure the path is correct and image exist.");e.prettyPhoto.close()};imgPreloader.src=pp_images[set_position];break;case"youtube":a=w(movie_width,movie_height);movie_id=i("v",pp_images[set_position]);if(movie_id==""){movie_id=pp_images[set_position].split("youtu.be/");movie_id=movie_id[1];if(movie_id.indexOf("?")>0)movie_id=movie_id.substr(0,movie_id.indexOf("?"));if(movie_id.indexOf("&")>0)movie_id=movie_id.substr(0,movie_id.indexOf("&"))}movie="http://www.youtube.com/embed/"+movie_id;i("rel",pp_images[set_position])?movie+="?rel="+i("rel",pp_images[set_position]):movie+="?rel=1";if(settings.autoplay)movie+="&autoplay=1";toInject=settings.iframe_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);break;case"vimeo":a=w(movie_width,movie_height);movie_id=pp_images[set_position];var t=/http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;var n=movie_id.match(t);movie="http://player.vimeo.com/video/"+n[3]+"?title=0&byline=0&portrait=0";if(settings.autoplay)movie+="&autoplay=1;";vimeo_width=a["width"]+"/embed/?moog_width="+a["width"];toInject=settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,a["height"]).replace(/{path}/g,movie);break;case"quicktime":a=w(movie_width,movie_height);a["height"]+=15;a["contentHeight"]+=15;a["containerHeight"]+=15;toInject=settings.quicktime_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);break;case"flash":a=w(movie_width,movie_height);flash_vars=pp_images[set_position];flash_vars=flash_vars.substring(pp_images[set_position].indexOf("flashvars")+10,pp_images[set_position].length);filename=pp_images[set_position];filename=filename.substring(0,filename.indexOf("?"));toInject=settings.flash_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+"?"+flash_vars);break;case"iframe":a=w(movie_width,movie_height);frame_url=pp_images[set_position];frame_url=frame_url.substr(0,frame_url.indexOf("iframe")-1);toInject=settings.iframe_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{path}/g,frame_url);break;case"ajax":doresize=false;a=w(movie_width,movie_height);doresize=true;skipInjection=true;e.get(pp_images[set_position],function(e){toInject=settings.inline_markup.replace(/{content}/g,e);$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;g()});break;case"custom":a=w(movie_width,movie_height);toInject=settings.custom_markup;break;case"inline":myClone=e(pp_images[set_position]).clone().append('<br clear="all" />').css({width:settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show();doresize=false;a=w(e(myClone).width(),e(myClone).height());doresize=true;e(myClone).remove();toInject=settings.inline_markup.replace(/{content}/g,e(pp_images[set_position]).html());break}if(!imgPreloader&&!skipInjection){$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;g()}});return false};e.prettyPhoto.changePage=function(t){currentGalleryPage=0;if(t=="previous"){set_position--;if(set_position<0)set_position=e(pp_images).size()-1}else if(t=="next"){set_position++;if(set_position>e(pp_images).size()-1)set_position=0}else{set_position=t}rel_index=set_position;if(!doresize)doresize=true;if(settings.allow_expand){e(".pp_contract").removeClass("pp_contract").addClass("pp_expand")}y(function(){e.prettyPhoto.open()})};e.prettyPhoto.changeGalleryPage=function(e){if(e=="next"){currentGalleryPage++;if(currentGalleryPage>totalPage)currentGalleryPage=0}else if(e=="previous"){currentGalleryPage--;if(currentGalleryPage<0)currentGalleryPage=totalPage}else{currentGalleryPage=e}slide_speed=e=="next"||e=="previous"?settings.animation_speed:0;slide_to=currentGalleryPage*itemsPerPage*itemWidth;$pp_gallery.find("ul").animate({left:-slide_to},slide_speed)};e.prettyPhoto.startSlideshow=function(){if(typeof m=="undefined"){$pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function(){e.prettyPhoto.stopSlideshow();return false});m=setInterval(e.prettyPhoto.startSlideshow,settings.slideshow)}else{e.prettyPhoto.changePage("next")}};e.prettyPhoto.stopSlideshow=function(){$pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function(){e.prettyPhoto.startSlideshow();return false});clearInterval(m);m=undefined};e.prettyPhoto.close=function(){if($pp_overlay.is(":animated"))return;e.prettyPhoto.stopSlideshow();$pp_pic_holder.stop().find("object,embed").css("visibility","hidden");e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed,function(){e(this).remove()});$pp_overlay.fadeOut(settings.animation_speed,function(){if(settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","visible");e(this).remove();e(window).unbind("scroll.prettyphoto");r();settings.callback();doresize=true;f=false;delete settings})};if(!pp_alreadyInitialized&&t()){pp_alreadyInitialized=true;hashIndex=t();hashRel=hashIndex;hashIndex=hashIndex.substring(hashIndex.indexOf("/")+1,hashIndex.length-1);hashRel=hashRel.substring(0,hashRel.indexOf("/"));setTimeout(function(){e("a["+s.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger("click")},50)}return this.unbind("click.prettyphoto").bind("click.prettyphoto",e.prettyPhoto.initialize)};})(jQuery);var pp_alreadyInitialized=false;

	

/* *** featured_slider.js *** */
$(document).ready(function(){
	featured_slider_step = 0;
	$('.featured_next').click(function(){
		current_left = parseInt($('.featured_slider_wrapper ul').css('left'));
		if ($(window).width() > 760) {
			if ($('.fullscreen_content_wrapper').hasClass('full_show')) {
				max_left = -1*($('.featured_slider_wrapper ul').width()-$(window).width());
			} else {
				max_left = -1*($('.featured_slider_wrapper ul').width()-$(window).width()+420);
			}
			move_step = move_step = $('li.item'+featured_slider_step).width()+10;
		}
		else {
			max_left = -1*($('.featured_slider_wrapper ul').width()-$(window).width());
			move_step = move_step = $('li.item'+featured_slider_step).width()+10;
		}
		
		if (current_left > max_left) {
			if (current_left-move_step > max_left) {
				$('.featured_slider_wrapper ul').css('left', current_left-move_step+'px');
				featured_slider_step++;
				if (featured_slider_step > ($('.featured_slider_wrapper li').size()-1)) {
					featured_slider_step = ($('.featured_slider_wrapper li').size()-1);
				}
			} else {
				$('.featured_slider_wrapper ul').css('left', max_left+'px');
				featured_slider_step = ($('.featured_slider_wrapper li').size()-1);
			}
		}
	});
	$('.featured_prev').click(function(){
		current_left = parseInt($('.featured_slider_wrapper ul').css('left'));

		if ($(window).width() > 760) {
			if ($('.fullscreen_content_wrapper').hasClass('full_show')) {
				max_left = -1*($('.featured_slider_wrapper ul').width()-$(window).width());
			} else {
				max_left = -1*($('.featured_slider_wrapper ul').width()-$(window).width()+420);
			}
			move_step = move_step = $('li.item'+featured_slider_step).width()+10;
		} else {
			max_left = -1*($('.featured_slider_wrapper ul').width()-$(window).width());
			move_step = move_step = $('li.item'+featured_slider_step).width()+10;
		}

		if (current_left < 0) {
			if (current_left+move_step < 0) {
				$('.featured_slider_wrapper ul').css('left', current_left+move_step+'px');
				featured_slider_step--;
				if (featured_slider_step < 0) {
					featured_slider_step = 0;
				}				
			} else {
				$('.featured_slider_wrapper ul').css('left', '0px');
				featured_slider_step = 0;
			}
		}
	});
	if ($(window).width() < 760) {
		$('.featured_slider_wrapper').parents('.fullscreen_content_wrapper').addClass('fsw_iphone');
	}
});
$(window).load(function(){
	featured_slider_setup();
	$('.featured_slider_wrapper').addClass('loaded');
});
$(window).resize(function(){
	featured_slider_step = 0;
	featured_slider_setup();
	$('.featured_slider_wrapper ul').css('left', '0px');
});

function featured_slider_setup() {
	if ($(window).width() > 760) {
		$('.featured_slider_wrapper').height($(window).height()-$('header').height()-$('.fullscreen_title').height());
		setHeight = $(window).height()-$('header').height()-$('.fullscreen_title').height()-20;
		setWidth = Math.ceil((($(window).height()-$('header').height()-$('.fullscreen_title').height()-20)/9)*11);
		
		$('.featured_slider_wrapper iframe').height(setHeight).width(setWidth);
		$('.featured_slider_wrapper img').height(setHeight);
		$('.featured_slider_wrapper ul').width(10);
		$('.featured_slider_wrapper li').each(function(linum){
			$(this).height(setHeight).addClass('item'+linum);
			if ($(this).find('img').size() > 0) {
				$(this).width($(this).find('img').width());
			} else {
				$(this).width($(this).find('iframe').width());
			}
			if (linum == ($('.featured_slider_wrapper li').size()-1)) {
				for (var i = 0; i < $('.featured_slider_wrapper li').size(); i++) {
					$('.featured_slider_wrapper ul').width($('.featured_slider_wrapper ul').width()+$('li.item'+i).width()+10);
				}
			}
		});						
	} else {
		$('.featured_slider_wrapper').height($(window).height()-$('header').height()-$('.fullscreen_title').height());
		setHeight = $(window).height()-$('header').height()-$('.fullscreen_title').height()-20;
		setWidth = Math.ceil((($(window).height()-$('header').height()-$('.fullscreen_title').height()-20)/9)*11);
		
		$('.featured_slider_wrapper iframe').height(setHeight).width(setWidth);
		$('.featured_slider_wrapper img').height(setHeight);
		$('.featured_slider_wrapper ul').width(10);
		$('.featured_slider_wrapper li').each(function(linum){
			$(this).height(setHeight).addClass('item'+linum);
			if ($(this).find('img').size() > 0) {
				$(this).width($(this).find('img').width());
			} else {
				$(this).width($(this).find('iframe').width());
			}
			if (linum == ($('.featured_slider_wrapper li').size()-1)) {
				for (var i = 0; i < $('.featured_slider_wrapper li').size(); i++) {
					$('.featured_slider_wrapper ul').width($('.featured_slider_wrapper ul').width()+$('li.item'+i).width()+10);
				}
			}
		});
	}
	if ($('.featured_slider_wrapper ul').width() < $(window).width()) {
		$('.featured_prev').hide();
		$('.featured_next').hide();
	} else {
		$('.featured_prev').show();
		$('.featured_next').show();		
	}
	if ($('.featured_slider_wrapper li').size() == 1) {
		$('.featured_slider_wrapper ul').addClass('alone_item');
	}
}


/* *** script.js *** */
var demo = true;

jQuery(document).ready(function() {

	if (fixed_menu) {
		jQuery('html').addClass('fixed_menu');
		jQuery('.main_wrapper').css('margin-top', jQuery('header').height());
	}
	
	jQuery('header').find('.sub-menu').find('a').each(function() {
		if (jQuery(this).height() < 30) {
			jQuery(this).css({'padding-top' : '16px', 'padding-bottom' : '17px'});
		}
	});
	

	/*shortcode_messagebox close*/
	jQuery('.shortcode_messagebox').find('.box_close').click(function(){
		jQuery(this).parents('.module_messageboxes').fadeOut(400);
	});
	
	if(jQuery(window).width() > 760) {
		jQuery('.shortcode_tabs').each(function(){
			if(jQuery(this).hasClass('type2')) {
				jQuery(this).find('.all_body_cont').width(jQuery(this).width()-jQuery(this).find('.all_heads_cont').width()-32);
				jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height())+25+'px');
				jQuery(this).append('<div class="clear"/>');
			}
			if(jQuery(this).hasClass('type3')) {
				jQuery(this).find('.all_body_cont').width(jQuery(this).width()-jQuery(this).find('.all_heads_cont').width()-132);
				jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height())+'px');
				jQuery(this).append('<div class="clear"/>');
			}
		});
	}
	
	jQuery('.gallery_item').each(function(){
		jQuery(this).find('.gallery_descr').css('bottom' , -1*(jQuery(this).height()+60)+'px');
		place_icon = (jQuery(this).height()-jQuery(this).find('.gallery_descr').height()-43-jQuery(this).find('.ico_gallery').height())/2;
		jQuery(this).find('.ico_gallery').css('top', place_icon+'px');
	});

	jQuery('.sidepanel').find('.field_search').each(function(){
		jQuery(this).width(jQuery(this).parent('.search_form').width()-32);
	});	
	
	jQuery('.nivoSlider').each(function(){
		jQuery(this).nivoSlider({
			directionNavHide:false,
			effect:'fade',
			pauseTime:4000,
			slices: 1
		});
	});	

	if (jQuery('.content_block').hasClass('no-sidebar')) {
		if (jQuery('html').hasClass('user_bg_layout')) {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
				jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+' '+jQuery(this).attr('data-top-padding')+' '+jQuery(this).attr('data-bottom-padding')+'" style="background:'+jQuery(this).attr('data-background')+'"><div class="module_line_wrapper container"></div></div>');
			});
			jQuery('.module_gallery_wall').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
			});			
		} else {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
				jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+' '+jQuery(this).attr('data-top-padding')+' '+jQuery(this).attr('data-bottom-padding')+'" style="background:'+jQuery(this).attr('data-background')+'"><div class="module_line_wrapper container"></div></div>');
			});
			jQuery('.module_gallery_wall').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
			});			
		}
	}
	
	if ($('.header2top').size() > 0) {
		if ($(window).width() > 760) {
			$('.fullscreen_block').css({'padding-top' : $('header').height()+$('.fullscreen_title').height()+'px', 'min-height' : ($(window).height() - $('header').height()- $('.fullscreen_title').height())+'px'});
			$('.fullscreen_title').css('top',$('header').height()+'px');
		}
		$('html').addClass('header2top');
		$('body').removeClass('fullscreen_layout');
	}

	jQuery('.video_frame').each(function(){
		jQuery(this).height((jQuery(this).width()/16)*9);
	});	
	
	if (jQuery(window).width() > 760) {
		jQuery('.fullscreen_content_wrapper').height(jQuery(window).height()-jQuery('.fullscreen_title').height()).css('top', jQuery('.fullscreen_title').height()+'px');
		if ($('.header2top').size() > 0) {
			jQuery('.fullscreen_content_wrapper').height(jQuery(window).height()-jQuery('.fullscreen_title').height()).css('top', jQuery('.fullscreen_title').height()+$('header').height()+'px');
			jQuery('.fullscreen_content').css('min-height' , (jQuery(window).height()-jQuery('header').height() - jQuery('.fullscreen_title').height()-91)+'px');
			jQuery('body').append('<style id="jQueryStyle">.fullscreen_content:after { height:' + (jQuery('header').height()+jQuery('.fullscreen_title').height()+15) + 'px!important;}</style>');
			jQuery('.fullscreen_block').css({'padding-top' : $('header').height()+$('.fullscreen_title').height()+'px', 'min-height' : ($(window).height() - $('header').height()- $('.fullscreen_title').height())+'px'});
		} else {
			jQuery('.fullscreen_block').css({'padding-bottom' : ($('header').height() + $('.fs_blog_pager').height() + $('.filter_navigation').height())+'px', 'min-height' : ($(window).height() - $('header').height() - $('.fullscreen_title').height() - $('.fs_blog_pager').height() - $('.filter_navigation').height())+'px'});
			jQuery('.fullscreen_content').css({'min-height' : (jQuery(window).height()-jQuery('header').height() - jQuery('.fullscreen_title').height()-100)+'px', 'padding-top' : jQuery('.fullscreen_title').height()+25+'px'});
		}
	} else {
		jQuery('.fs_map').parent('.fullscreen_content_wrapper').addClass('iphone_map');
		if (jQuery('.fullscreen_title').size() > 0 ){ 
			jQuery('.fullscreen_content').attr('style', 'padding-bottom:' + (jQuery('.fullscreen_title').height()+10) + 'px!important;');
		} else {
			jQuery('.fullscreen_block').attr('style', 'padding-bottom:' + (jQuery('.fs_blog_pager').height()+jQuery('.filter_block').height()-jQuery('.load_more_cont').height()) + 'px!important');
		}
	}
	
	jQuery('.content_toggle').click(function(){
		jQuery('.fullscreen_content_wrapper').toggleClass('full_show');
		jQuery('.fullscreen_content').toggleClass('slided');
		if ($('.fullscreen_content_wrapper').size()) {
			$('.featured_slider_wrapper ul').css('left', '0px');
			featured_slider_step = 0;
		}
	});

	jQuery('.fs_grid_module').css('min-height', ($(window).height() - $('header').height()- $('.fullscreen_title').height()-$('.fs_blog_pager').height()-$('.filter_navigation').height()-$('.load_more_cont').height())+'px');

	jQuery('.fs_grid_module .grid_gallery-item').each(function(){
		$(this).attr('data-top', -1*($(this).find('.item_hover-body').height()/2)+'px');
		$(this).find('.item_hover-body').slideUp(1)
		$(this).css('opacity', 1);
	});
	
	jQuery('.grid_gallery-item:not(.no_title_no_caption)').hover(function(){
		$(this).find('.item_hover').stop().animate({'margin-top': $(this).attr('data-top')},400);
		$(this).find('.item_hover-body').stop().slideDown(400);
	},function(){
		$(this).find('.item_hover').stop().animate({'margin-top': '0px'},400);
		$(this).find('.item_hover-body').stop().slideUp(400);
	});
	
	if(jQuery('.video_background').size() > 0 ) {
		jQuery('.video_background').height(jQuery(window).height()-jQuery('header').height());
	}
	
});	

jQuery(window).load(function(){
	jQuery('.fs_grid_module .item_hover').each(function(){
		$(this).css('top', -1*(($(this).height()-$(this).parent('.grid_gallery-item').height())/2)+'px');
	});

	/*VideoFrames*/
	jQuery('.video_frame').each(function(){
		jQuery(this).height((jQuery(this).width()/16)*9);
	});

	jQuery('.gallery_item').each(function(){
		jQuery(this).find('.gallery_descr').css('bottom' , -1*(jQuery(this).height()+60)+'px');
		place_icon = (jQuery(this).height()-jQuery(this).find('.gallery_descr').height()-43-jQuery(this).find('.ico_gallery').height())/2;
		jQuery(this).find('.ico_gallery').css('top', place_icon+'px');
	});
	
	//Portfolio
	jQuery('.prettyPhoto').prettyPhoto();
	
	//Loaded Elements
	jQuery('.module_gallery_wall').addClass('loaded');
	setTimeout("jQuery('.fs_grid_module').addClass('loaded')",500);
	setTimeout("jQuery('.fs_blog_module').addClass('loaded')",500);	
});

jQuery(window).resize(function(){
	
	//FeedBack Form
	jQuery('.fullwidth_blog .comment-form').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-26);
	});
	
	if (jQuery(window).width() > 760) {
		jQuery('.fullscreen_content_wrapper').height(jQuery(window).height()-jQuery('.fullscreen_title').height()).css('top', jQuery('.fullscreen_title').height()+'px');
		if ($('.header2top').size() > 0) {
			jQuery('.fullscreen_content_wrapper').height(jQuery(window).height()-jQuery('.fullscreen_title').height()).css('top', jQuery('.fullscreen_title').height()+$('header').height()+'px');
		}
		jQuery('.fullscreen_content').css({'min-height' : (jQuery(window).height()-jQuery('header').height() - jQuery('.fullscreen_title').height()-100)+'px', 'padding-top' : jQuery('.fullscreen_title').height()+25+'px'});
	}
	//FeedBack Form
	jQuery('.content_block').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-30);
	});	
	jQuery('.login_form').find('.form_field').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-30);
	});	
	jQuery('.mc_input').each(function(){
		jQuery(this).width(jQuery(this).parents('.widget_mailchimpsf_widget').width()-32);
	});			
	
	/*Diagram Shortcode*/
    jQuery('.skill_div').each(function(){
        set_width = jQuery(this).attr('data-percent');
        jQuery(this).stop().animate({'width' : set_width + '%'},1000);
    });

	if(jQuery(window).width() > 760) {
		jQuery('.shortcode_tabs').each(function(){
			if(jQuery(this).hasClass('type2')) {
				jQuery(this).find('.all_body_cont').width(jQuery(this).width()-jQuery(this).find('.all_heads_cont').width()-38);
				jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height())+'px');
				jQuery(this).append('<div class="clear"/>');
			}
			if(jQuery(this).hasClass('type3')) {
				jQuery(this).find('.all_body_cont').width(jQuery(this).width()-jQuery(this).find('.all_heads_cont').width()-32);
				jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height())+'px');
				jQuery(this).append('<div class="clear"/>');
			}
		});
	}
	
	jQuery('.gallery_item').each(function(){
		jQuery(this).find('.gallery_descr').css('bottom' , -1*(jQuery(this).height()+60)+'px');
		place_icon = (jQuery(this).height()-jQuery(this).find('.gallery_descr').height()-43-jQuery(this).find('.ico_gallery').height())/2;
		jQuery(this).find('.ico_gallery').css('top', place_icon+'px');
	});

	jQuery('.sidebar').find('.field_search').each(function(){
		jQuery(this).width(jQuery(this).parent('form').width()-32);
	});	
	
	jQuery('.video_frame').each(function(){
		jQuery(this).height((jQuery(this).width()/16)*9);
	});

	if (jQuery('.content_block').hasClass('no-sidebar')) {
		if (jQuery('html').hasClass('user_bg_layout')) {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
			});
			jQuery('.module_gallery_wall').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
			});			
		} else {
			jQuery('.module_line_trigger').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
			});
			jQuery('.module_gallery_wall').each(function(){
				jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
			});			
		}
	}

	jQuery('.fs_grid_module').css('min-height', ($(window).height() - $('header').height()- $('.fullscreen_title').height()-$('.fs_blog_pager').height()-$('.filter_navigation').height()-$('.load_more_cont').height())+'px');

	if(jQuery('.video_background').size() > 0 ) {
		jQuery('.video_background').height(jQuery(window).height()-jQuery('header').height());
	
	}

	if (jQuery(window).width() > 760) {
		jQuery('.fullscreen_content_wrapper').height(jQuery(window).height()-jQuery('.fullscreen_title').height()).css('top', jQuery('.fullscreen_title').height()+'px');
		if ($('.header2top').size() > 0) {
			jQuery('.fullscreen_content_wrapper').height(jQuery(window).height()-jQuery('.fullscreen_title').height()).css('top', jQuery('.fullscreen_title').height()+$('header').height()+'px');
			jQuery('.fullscreen_content').css('min-height' , (jQuery(window).height()-jQuery('header').height() - jQuery('.fullscreen_title').height()-91)+'px');
			jQuery('body').find('#jQueryStyle').remove();
			jQuery('body').append('<style id="jQueryStyle">.fullscreen_content:after { height:' + (jQuery('header').height()+jQuery('.fullscreen_title').height()+15) + 'px!important;}</style>');
			jQuery('.fullscreen_block').css({'padding-top' : $('header').height()+$('.fullscreen_title').height()+'px', 'min-height' : ($(window).height() - $('header').height()- $('.fullscreen_title').height())+'px'});
		} else {
			jQuery('.fullscreen_block').css({'padding-bottom' : ($('header').height() + $('.fs_blog_pager').height() + $('.filter_navigation').height())+'px', 'min-height' : ($(window).height() - $('header').height() - $('.fullscreen_title').height() - $('.fs_blog_pager').height() - $('.filter_navigation').height())+'px'});
			jQuery('.fullscreen_content').css({'min-height' : (jQuery(window).height()-jQuery('header').height() - jQuery('.fullscreen_title').height()-100)+'px', 'padding-top' : jQuery('.fullscreen_title').height()+25+'px'});
		}
	} else {
		if (jQuery('.fullscreen_title').size() > 0 ){ 
			jQuery('.fullscreen_content').attr('style', 'padding-bottom:' + (jQuery('.fullscreen_title').height()+10) + 'px!important;');
		} else {
			jQuery('.fullscreen_block').attr('style', 'padding-bottom:' + (jQuery('.fs_blog_pager').height()+jQuery('.filter_block').height()-jQuery('.load_more_cont').height()) + 'px!important');
		}
	}
});

