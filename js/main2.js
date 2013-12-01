/* jshint browser: true, strict: true, eqeqeq: true, indent: 2, newcap: true, plusplus: true, unused: true, trailing: true, loopfunc: false, nomen: true, onevar: true, white: true, undef: true, latedef: true */

(function () {
	'use strict';

	var vincent = {

		init : function () {
			if (document.getElementById('portfolio') !== null) {
				vincent.smoothScroll();
			}
			if (document.getElementById('contact') !== null) {
				vincent.contactForm();
			}
		},
		smoothScroll: function () {
			var extra,
				winWidth = window.innerWidth,
				link = document.getElementsByClassName('scroll')[0],
				workOffset = document.getElementById('portfolio').offsetTop;

			if (winWidth > 1140) {
				extra = 235;
			}
			else {
				extra = 30;
			}

			link.addEventListener('click', function (event) {
				animate(document.body, 'scrollTop', '', 0, workOffset + extra, 600, true);
				event.preventDefault();
			}, false);

		},
		contactForm: function () {
			var i, j,
				form = document.getElementById('contact-form'),
				submitButton = document.getElementById('submit'),
				inputs = document.getElementsByTagName('input'),
				name = document.getElementById('name'),
				email = document.getElementById('email'),
				message = document.getElementById('message'),
				nameError = 'Vad heter du?',
				emailError = 'Fyll i en riktigt e-post!',
				messageError = 'Vad var det du ville säga?';
			if (form.className === 'english') {
				nameError = "What's your name?";
				emailError = "Please enter a valid e-mail!";
				messageError = "What did you come here to say";
			}

			submitButton.addEventListener("click", function (event) {

				if (name.value === "") {
					name.className += " needsfilled";
					name.placeholder = nameError;
					name.value = nameError;
				}
				if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.value)) {
					email.className += ' needsfilled';
					email.placeholder = emailError;
					email.value = emailError;
				}
				if (message.value === "") {
					message.className += " needsfilled";
					message.placeholder = messageError;
					message.value = messageError;
				}

				// If any input needs filled, focus and stop posting.
				for (i = 0; i < inputs.length; i += 1) {
					if (hasClass(inputs[i], 'needsfilled')) {
						inputs[0].focus();
						event.preventDefault();
						return false;
					}
				}

				// Submit with AJAX
				sendXMLDoc(form);

				event.preventDefault();

			}, false);

			for (j = 0; j < inputs.length; j += 1) {
				inputs[j].addEventListener('focus', function () {
					clearField(this);
				}, false);
			}
			message.addEventListener('focus', function () {
				clearField(this);
			}, false);

		}
	};

	// Bring me back some jQuery plz!
	function hasClass(elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}

	function clearField(field) {
		if (hasClass(field, 'needsfilled')) {
			field.value = '';
			field.className = '';
		}
	}

	// And some animations!
	function animate(elem, style, unit, from, to, time, prop) {
		var start = new Date().getTime(),
			timer = setInterval(function () {
				var step = Math.min(1, (new Date().getTime() - start) / time);

				if (prop) {
					elem[style] = (from + step * (to - from)) + unit;
				} else {
					elem.style[style] = (from + step * (to - from)) + unit;
				}

				if (step === 1) {
					clearInterval(timer);
				}

			}, 8);
		elem.style[style] = from + unit;
	}

	function sendXMLDoc(form) {

    var name = form.name.value,
			email = form.email.value,
			message = form.message.value,
			data = "name=" + name + "&email=" + email + "&message=" + message,
			post_url = form.getAttribute('action'),
			responseCanvas = document.getElementById('response'),
			xmlhttp;

    try {
			// Opera 8.0+, Firefox, Safari
			xmlhttp = new XMLHttpRequest();
		} catch (event) {
			// Internet Explorer Browsers
			try {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (event) {
				try {
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (event) {
					responseCanvas.innerHTML = 'Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body=' + message + '">vorback@gmail.com</a> instead.';
					return false;
				}
			}
		}

		function display_data() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
					responseCanvas.innerHTML = xmlhttp.response;
					form.outerHTML = "";
        } else {
					responseCanvas.innerHTML = xmlhttp.response;
        }
        animate(document.body, 'scrollTop', '', 0, 0, 0, true);
      }
    }

		xmlhttp.open("POST", post_url, true);
		xmlhttp.onreadystatechange = display_data;
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.send(data);
	}

	vincent.init();

})();