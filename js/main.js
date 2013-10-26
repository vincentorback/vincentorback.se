/* jshint browser: true, strict: false, eqeqeq: true, indent: 2, newcap: true, plusplus: true, unused: true, trailing: true, loopfunc: false, nomen: true, onevar: true, white: true, undef: true, latedef: true */

var winWidth = window.innerWidth;

var vincent = {

	init : function () {
		if (document.getElementById('portfolio') !== null) {
			vincent.smoothScroll();
			vincent.lazyLoad();
		}
		if (document.getElementById('contact') !== null) {
			vincent.contactForm();
		}
	},
	smoothScroll: function () {
		var scrollDistance;
		if (winWidth > 1140) {
			scrollDistance = 235;
		}
		else {
			scrollDistance = 30;
		}
		$(".scroll a").bind("click", function (e) {
			$("html, body").stop().animate({
				scrollTop: $($(this).attr("href")).offset().top + scrollDistance
			}, 900);
			e.preventDefault();
		});
	},
	lazyLoad: function () {
		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold: 500,
			failure_limit: 10
		});
	},
	contactForm: function () {
		var form = $('#contact-form'),
			name = $('#name'),
			email = $('#email'),
			message = $('#message'),
			emptyName = "Vad heter du?",
			emptyEmail = "Fyll i en riktigt e-post!",
			emptyMessage = "Vad var det du ville säga?";
		if (form.hasClass('english')) {
			emptyName = "What's your name?";
			emptyEmail = "Please enter a valid e-mail!";
			emptyMessage = "What did you come here to say";
		}

		$('#contact-form').submit(function (e) {

			$("html, body").animate({
				scrollTop: 350
			}, 300);

			if (name.val() === "") {
				name.addClass("needsfilled");
				name.attr("placeholder", emptyName);
			}
			if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
				email.addClass("needsfilled");
				email.attr("placeholder", emptyEmail);
			}
			if (message.val() === "") {
				message.addClass("needsfilled");
				message.attr("placeholder", emptyMessage);
			}

			if ($("input, textarea").hasClass("needsfilled")) {
				$("input.needsfilled:first").focus();
				return false;
			} else {
				vincent.sendMessage();
			}

			e.preventDefault();
		});

		$(":input").focus(function () {
			if ($(this).hasClass("needsfilled")) {
				$(this).val("");
				$(this).removeClass("needsfilled");
			}
		});

		$("#name, #email").autoResize({
			minWidth: 320,
			maxWidth: 600,
			animate: false
		});
		$('#message').autoResize({
			minHeight: 300,
			maxHeight: 1000,
			animate: false
		});
	},

	sendMessage: function () {
		var form = $('#contact-form'),
			post_url = form.attr('action'),
			post_data = form.serialize();

		$.ajax({
			type: 'POST',
			url: post_url,
			data: post_data,
			success: function (msg) {
				form.fadeOut(300, function () {
					form.html(msg).fadeIn("slow");
				});
			}
		});
	}
};

$(document).ready(function () {
	vincent.init();
});