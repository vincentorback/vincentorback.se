/* jshint browser: true, strict: true, eqeqeq: true, indent: 2, newcap: true, plusplus: true, unused: true, trailing: true, loopfunc: false, nomen: true, onevar: true, white: true, undef: true, latedef: true */
/* global ActiveXObject, Modernizr, Konami */

(function () {
  'use strict';

  var vincent = {

    init: function () {

      if (document.getElementById('portfolio') !== null) {
        if (Modernizr.csstransforms3d) {
          vincent.cssScroll2();
        } else {
          vincent.cssScroll();
        }
      }
      if (document.getElementById('contact-form') !== null) {
        vincent.contactForm();
      }
      if (document.getElementById('blog') !== null) {
        vincent.blogComments();
      }

      vincent.smoothScroll();

      vincent.easter();

      //vincent.dateEvents();

    },
    cssScroll2: function () {
      var targetOffset, extra, currentPosition,
        body = document.body,
        button = document.getElementById('scrollButton'),
        animateTime = 1200;

      function getPageScroll() {
        var yScroll;

        if (window.pageYOffset) {
          yScroll = window.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {
          yScroll = document.documentElement.scrollTop;
        } else if (document.body) {
          yScroll = document.body.scrollTop;
        }
        return yScroll;
      }

      button.addEventListener('click', function (event) {

        if (window.innerWidth > 1140) {
          extra = 235;
        } else {
          extra = 30;
        }

        targetOffset = document.getElementById(event.target.hash.substr(1)).offsetTop + extra;
        currentPosition = getPageScroll();

        body.classList.add('in-transition');
        body.style.WebkitTransform = 'translate(0, -' + (targetOffset - currentPosition) + 'px)';
        body.style.MozTransform = 'translate(0, -' + (targetOffset - currentPosition) + 'px)';
        body.style.msTransform = 'translate(0, -' + (targetOffset - currentPosition) + 'px)';
        body.style.OTransform = 'translate(0, -' + (targetOffset - currentPosition) + 'px)';
        body.style.transform = 'translate(0, -' + (targetOffset - currentPosition) + 'px)';

        window.setTimeout(function () {
          body.classList.remove('in-transition');
          body.style.cssText = '';
          window.scrollTo(0, targetOffset);
        }, animateTime);

        event.preventDefault();

      }, false);
    },
    cssScroll: function () {
      var targetOffset, extra,
        body = document.body,
        button = document.getElementById('scrollButton'),
        animateTime = 1200;

      button.addEventListener('click', function (event) {

        if (window.innerWidth > 1140) {
          extra = 235;
        } else {
          extra = 30;
        }

        targetOffset = document.getElementById(event.target.hash.substr(1)).offsetTop + extra;

        body.style.transition = 'margin-top ' + animateTime + 'ms ease-in-out';

        body.style.marginTop = '-' + targetOffset + 'px';

        window.setTimeout(function () {
          body.style.cssText = '';
          window.scrollTo(0, targetOffset);
        }, animateTime);

        event.preventDefault();

      }, false);
    },
    smoothScroll: function () {
      var timer,
        body = document.body;

      window.addEventListener('scroll', function () {
        clearTimeout(timer);
        if (!body.classList.contains('disable-hover')) {
          body.classList.add('disable-hover');
        }
        timer = setTimeout(function () {
          body.classList.remove('disable-hover');
        }, 100);
      }, false);
    },
    contactForm: function () {
      var firstError,
        form = document.getElementById('contact-form'),
        submitButton = document.getElementById('submit'),
        name = document.getElementById('name'),
        email = document.getElementById('email'),
        message = document.getElementById('message'),
        nameError = 'Vad heter du?',
        emailEmpty = 'Vad har du för e-post?',
        emailError = 'Fyll i en riktigt e-post!',
        messageError = 'Vad var det du ville säga?';

      if (form.className === 'english') {
        nameError = 'What’s your name?';
        emailEmpty = 'What’s your email?';
        emailError = 'Please enter a valid e-mail!';
        messageError = 'What did you come here to say?';
      }

      function hasClass(el, cn) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
      }

      function clearField(field) {
        if (hasClass(field, 'needsfilled')) {
          field.value = '';
          field.className = '';
        }
      }

      function trim(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
      }

      function removeClass(el, cn) {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
      }

      function sendXMLDoc(form) {
        var nameVal = form.name.value,
          emailVal = form.email.value,
          messageVal = form.message.value,
          data = 'name=' + nameVal + '&email=' + emailVal + '&message=' + messageVal,
          post_url = form.getAttribute('action'),
          responseCanvas = document.getElementById('response'),
          xmlhttp;

        try {
          // Opera 8.0+, Firefox, Safari
          xmlhttp = new XMLHttpRequest();
        } catch (event) {
          try {
            // Internet Explorer
            xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
          } catch (event) {
            try {
              xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (event) {
              responseCanvas.innerHTML = 'Something went wrong. Try sending and email to <a href="mailto:vorback@gmail.com&subject=Message from vincentorback.se&body=' + message + '">vorback@gmail.com</a> instead.\n\n\n<p>Luckily i managed to save your message here: \n\n ' + message;
              return false;
            }
          }
        }

        function display_data() {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              responseCanvas.innerHTML = xmlhttp.response;
              form.outerHTML = '';
            } else {
              responseCanvas.innerHTML = xmlhttp.response;
            }
            window.scrollTo(0, 0);
          }
        }

        xmlhttp.open('POST', post_url, true);
        xmlhttp.onreadystatechange = display_data;
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(data);
      }


      function postForm(event) {
        if (name.value.length === 0) {
          name.className = 'needsfilled';
          if (Modernizr.placeholder) {
            name.placeholder = nameError;
          } else {
            name.value = nameError;
          }
          name.setAttribute('aria-invalid', 'true');
        } else {
          removeClass(name, 'needsfilled');
          name.setAttribute('aria-invalid', 'false');
        }
        if (email.value.length === 0 || !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.value)) {
          email.className = 'needsfilled';
          if (email.value.length === 0) {
            if (Modernizr.placeholder) {
              email.placeholder = emailEmpty;
            } else {
              email.value = emailEmpty;
            }
          } else {
            if (Modernizr.placeholder) {
              email.placeholder = emailError;
            } else {
              email.value = emailError;
            }
          }
          email.setAttribute('aria-invalid', 'true');
        } else {
          removeClass(email, 'needsfilled');
          email.placeholder = '';
          email.setAttribute('aria-invalid', 'false');
        }
        if (message.value.length === 0) {
          message.className = 'needsfilled';
          if (Modernizr.placeholder) {
            message.placeholder = messageError;
          } else {
            message.value = messageError;
          }
          message.setAttribute('aria-invalid', 'true');
        } else {
          removeClass(message, 'needsfilled');
          message.setAttribute('aria-invalid', 'false');
        }

        // If any input needs filled, focus and stop posting.
        firstError = document.getElementsByClassName('needsfilled');
        if (firstError.length > 0) {
          firstError[0].focus();

          event.preventDefault();
          return false;
        }

        // Submit with AJAX
        sendXMLDoc(form);

        event.preventDefault();
        return false;
      }

      submitButton.addEventListener('click', postForm, false);

      name.addEventListener('focus', function () {
        clearField(this);
      }, false);
      email.addEventListener('focus', function () {
        clearField(this);
      }, false);
      message.addEventListener('focus', function () {
        clearField(this);
      }, false);

    },
    blogComments: function () {
      var dsq = document.createElement('script');

      dsq.async = true;
      dsq.src = '//vincentorback.disqus.com/embed.js';

      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    },
    easter: function () {
      function loadScript(url) {
        var script = document.createElement('script');

        if (script.readyState) {  //IE
          script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
            }
          };
        }

        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
      function loadStyle(url) {
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = url;
        document.getElementsByTagName('head')[0].appendChild(style);
      }

      // Windows
      document.addEventListener('keyup', Konami.sequence(87, 73, 78, 68, 79, 87, 83, function () {
        loadScript('/easter/windows.js');
        loadStyle('/easter/windows.css');
      }), false);

      // Apple
      document.addEventListener('keyup', Konami.sequence(65, 80, 80, 76, 69, function () {
        loadStyle('http://fonts.googleapis.com/css?family=Josefin+Sans:100,300');
        loadStyle('/easter/apple.css');
        loadScript('/easter/apple.js');
      }), false);

    },

    dateEvents: function () {

      function checkDate(startDate, endDate) {
        var currentDate = new Date(),
          minDate = new Date(startDate),
          maxDate = new Date(endDate);

        if (currentDate <= maxDate && currentDate >= minDate) {
          return true;
        }

        return false;
      }

      var header = document.getElementById('top'),
        pride = checkDate('7-28-2014', '8-2-2014');

      if (pride === true) {
        header.style.cssText = 'background: -webkit-gradient(linear, left center, right center, from(red), color-stop(14%, orange), color-stop(28%, yellow), color-stop(42%, green), color-stop(56%, blue), color-stop(70%, indigo), to(violet));';
      }

    }
  };

  vincent.init();

}());