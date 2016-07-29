$(function() {
	$('.menu a').bind('click', function (event) {
		var target = $($(this).attr('href')).offset().top;
		$('html, body').stop().animate({
			scrollTop: target
		}, 1600);
		event.preventDefault();
	});
});