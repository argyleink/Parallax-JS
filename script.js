var slideEffect = function(){
	var linkTo = $('a', this).attr('href')
	
	$.scrollTo(linkTo, {duration:3000});
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
}

var initFunction = function(){
	$('#navigation li').click(slideEffect);
	$('#quick-links li').click(slideEffect);
	$('.parallax-layer' ).parallax();
}


$(document).ready(function () {
	initFunction();







});















