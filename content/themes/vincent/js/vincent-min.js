$(function(){$(".menu a").bind("click",function(t){var e=$(this);$("html, body").stop().animate({scrollTop:$(e.attr("href")).offset().top},1600,"easeInOutExpo"),t.preventDefault()})});