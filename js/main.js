var winWidth = $(window).width();

var vincent = {
	
	init : function () {
		if ($('#portfolio').is('main')) {
			vincent.smoothScroll();
		}
		if ($('#contact').is('section')) {
			vincent.contactForm();
			vincent.inputGrow();
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
	contactForm: function () {
		$('#contact-form').on('submit', function (e) {
			e.preventDefault();

			var form = $(this),
				post_url = form.attr('action'),
				post_data = form.serialize(),
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

			$('body, html').animate({scrollTop: 330}, 300);

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
			if ($(":input").hasClass("needsfilled")) {
				return false;
			} else {
				return true;
			}

			$.ajax({
				type: 'POST',
				url: post_url,
				data: post_data,
				success: function (msg) {
					form.fadeOut(1000, function () {
						form.html(msg).fadeIn("slow");
					});
				}
			});

		});

		$(":input").focus(function(){
			if ($(this).hasClass("needsfilled") ) {
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


$(document).ready(function () {
	vincent.init();
});