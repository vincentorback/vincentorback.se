/* jshint browser: true, strict: true, eqeqeq: true, indent: 4, newcap: true, plusplus: true, unused: true, trailing: true, loopfunc: false, nomen: true, onevar: true, white: true, undef: true, latedef: true */

/* global define */

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
		var scrollDistance,
			winWidth = window.innerWidth;

		if (winWidth > 1140) {
			scrollDistance = 235;
		}
		else {
			scrollDistance = 30;
		}
		$("a.scroll").on("click", function (e) {
			$("html, body").stop().animate({
				scrollTop: $($(this).attr("href")).offset().top + scrollDistance
			}, 900);
			e.preventDefault();
		});
	},
	lazyLoad: function () {
		$("img.lazy").lazyload({
			threshold: 1000,
			failure_limit: 10
		});
	},
	contactForm: function () {
		var $form = $('#contact-form'),
			//form = document.getElementById('contact-form'),
			//post_url = form.getAttribute('action'),
			//post_data = serialize(form),
			post_url = $form.attr('action'),
			post_data = $form.serialize(),
			$inputs = $form.find('input, textarea'),
			name = $('#name'),
			email = $('#email'),
			message = $('#message'),
			nameError = "Vad heter du?",
			emailError = "Fyll i en riktigt e-post!",
			messageError = "Vad var det du ville säga?";
		if ($form.hasClass('english')) {
			nameError = "What's your name?";
			emailError = "Please enter a valid e-mail!";
			messageError = "What did you come here to say";
		}

		$form.submit(function () {
			if (name.val() === "") {
				name.addClass("needsfilled");
				name.attr("placeholder", nameError);
			}
			if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
				email.addClass("needsfilled");
				email.attr("placeholder", emailError);
			}
			if (message.val() === "") {
				message.addClass("needsfilled");
				message.attr("placeholder", messageError);
			}

			$("html, body").animate({
				scrollTop: 330
			}, 300);

			if ($inputs.hasClass("needsfilled")) {
				$('input.needsfilled:first').focus();
				return false;
			} else {
				$.ajax({
					type: 'POST',
					url: post_url,
					data: post_data,
					success: function (msg) {
						$form.fadeOut(300, function () {
							$form.html(msg).fadeIn("slow");
						});
					}
				});
			}

			return false;
		});

		$inputs.focus(function () {
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
	}
};

$(function () {
	vincent.init();
});