var winWidth = $(window).width(), winHeight = $(window).height();

var vincent = {
	init : function() {
		if( $('#portfolio').is('main') ) {
			vincent.smoothScroll();
		}
		if( $('#contact').is('section') ) {
			vincent.inputGrow();
		}
	},
	smoothScroll : function() {
		if(winWidth > 1140){
			var scrollDistance = 235;
		}
		else {
			var scrollDistance = 30;
		}
		$(".scroll a").bind("click", function(event) {
			$("html, body").stop().animate({
				scrollTop: $($(this).attr("href")).offset().top + scrollDistance
			}, 900);
			event.preventDefault();
		});
	},
	inputGrow : function() {
		$('#contact-form, #en-contact-form').submit(function(e){
			e.preventDefault();
			var form = $(this);
			var post_url = form.attr('action');
			var post_data = form.serialize();
			var name = $('input[name=name]');
			var email = $('input[name=email]');
			var message = $('textarea[name=message]');
			$('body,html').animate({
				scrollTop: 330
			}, 300);
			if (name.val()==='') {
				return false;
			}
			if (email.val()==='') {
				return false;
			}
			if (message.val()==='') {
				return false;
			}
			$.ajax({
				type: 'POST',
				url: post_url,
				data: post_data,
				success: function(msg) {
					$(form).fadeOut(1000, function(){
						form.html(msg).fadeIn("slow");
					});
				}
			});
		});
		var required = ["name", "email", "message"];
		var name = $("#name");
		var email = $("#email");
		var message = $("#message");
		var enemptyerror = "Fill this form would you kindly?";
		var ennameerror = "What's your name?";
		var enemailerror = "Please enter a valid e-mail.";
		var enmessageerror = "What did you come here to say?";
		var emptyerror = "Fyll i det här fältet tack!";
		var nameerror = "Vad heter du?";
		var emailerror = "Fyll i en riktig e-postadress!";
		var messageerror = "Vad var det du ville säga?";
		var i = 0;
		$("#contact-form").submit(function(){
			for (i=0;i<required.length;i++) {
				var input = $('#'+required[i]);
				if ((input.attr("placeholder") === "") || (input.attr("placeholder") === emptyerror)) {
					input.addClass("needsfilled");
					input.attr("placeholder", emptyerror);
				} else {
					input.removeClass("needsfilled");
				}
			}
			if ((name.val() === "") || (name.val() === emptyerror)) {
				name.addClass("needsfilled");
				name.attr("placeholder", nameerror);
			}
			if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
				email.addClass("needsfilled");
				email.attr("placeholder", emailerror);
			}
			if ((message.val() === "") || (message.val() === emptyerror)) {
				message.addClass("needsfilled");
				message.attr("placeholder", messageerror);
			}
			if ($(":input").hasClass("needsfilled")) {
				return false;
			} else {
				return true;
			}
		});
		$("#en-contact-form").submit(function(){
			for (i=0;i<required.length;i++) {
				var input = $('#'+required[i]);
				if ((input.attr("placeholder") === "") || (input.attr("placeholder") === enemptyerror)) {
					input.addClass("needsfilled");
					input.attr("placeholder", enemptyerror);
				} else {
					input.removeClass("needsfilled");
				}
			}
			if ((name.val() === "") || (name.val() === emptyerror)) {
				name.addClass("needsfilled");
				name.attr("placeholder", ennameerror);
			}
			if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
				email.addClass("needsfilled");
				email.attr("placeholder", enemailerror);
			}
			if ((message.val() === "") || (message.val() === emptyerror)) {
				message.addClass("needsfilled");
				message.attr("placeholder", enmessageerror);
			}
			if ($(":input").hasClass("needsfilled")) {
				return false;
			} else {
				return true;
			}
		});
		$(":input").focus(function(){
			if ($(this).hasClass("needsfilled") ) {
				$(this).val("");
				$(this).removeClass("needsfilled");
			}
		});
		$('input#name').autoResize({
			minWidth: 320,
			maxWidth: 600,
			animate: false
		});
		$('input#phone').autoResize({
			minWidth: 320,
			maxWidth: 600,
			animate: false
		});
		$('input#email').autoResize({
			minWidth: 320,
			maxWidth: 600,
			animate: false
		});
		$('textarea#message').autoResize({
			minHeight: 300,
			maxHeight: 1000,
			animate: false
		});
	}
};


$(document).ready(function() {
	vincent.init();
});