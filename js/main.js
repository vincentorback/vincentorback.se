/* jslint browser: true, indent: 2 */
/* global $, Modernizr, FastClick, ga */

(function (window) {
  'use strict';

  function getViewport() {
    var win = window,
      docElem = document.documentElement;

    return {
      width: Math.max(docElem.clientWidth, win.innerWidth || 0),
      height: Math.max(docElem.clientHeight, win.innerHeight || 0)
    };
  }

  var win = window,
    doc = win.document,
    docElem = doc.documentElement,
    head = doc.head || doc.getElementsByTagName('head')[0],
    body = doc.body || doc.getElementsByTagName('body')[0],
    $body = $(body),
    winWidth = getViewport().width,
    winHeight = getViewport().height,
    vincent;

  vincent = {

    init: function () {

      //vincent.amazon = '';
      vincent.amazon = '//d3dx0f1ge67l9j.cloudfront.net';

      win.requestAnimFrame = (function () {
        return win.requestAnimationFrame  ||
          win.webkitRequestAnimationFrame ||
          win.mozRequestAnimationFrame    ||
          function (callback) {
            win.setTimeout(callback, 1000 / 60);
          };
      }());

      vincent.colors = {
        yellow: '#f1c40f',
        blue: '#1eb0e9',
        red: '#ff4e00',
        green: '#2ecc71',
        white: '#fff',
        black: '#000'
      };

      vincent.postColors = {
        'i-commit-from-my-heart': vincent.colors.yellow,
        'smooth-scrolling-with-css': vincent.colors.blue,
        'take-10-and-learn-typography': vincent.colors.red,
        'using-webp-images': vincent.colors.green
      };

      vincent.navToggle();

      if ((Modernizr.touch === false) && Modernizr.csstransforms) {
        vincent.parallaxHead();
      }

      vincent.smoothScroll();

      if (winWidth > 800 && Modernizr.csstransforms) {
        vincent.pageTransition();
        vincent.pageTransitionHalf();
        vincent.pageTransitionFull();

        if (doc.getElementById('page-front')) {
          vincent.workTransition();
        }
      }

      if (doc.getElementById('page-work') || doc.getElementById('page-about') || doc.getElementById('page-post')) {
        vincent.parallaxImages();
        //vincent.lazyLoad();
      }
/*
      if (doc.getElementById('page-work')) {
        vincent.faviconFun();
      }
*/
      if (doc.getElementById('page-contact')) {
        vincent.contactForm();
        vincent.expandable();
      }

      if (doc.getElementById('page-post')) {
        vincent.blogComments();
      }

      vincent.disableHover();

      vincent.easterEggs();

      vincent.tracking();

      //vincent.resizeAlert();

      //vincent.dateEvents();

    },

    parallaxHead: function () {
      var $header = $body.find('.Sitehead'),
        $navigation = $body.find('.Navigation'),
        scrollPos;

      function parallax() {
        if (win.scrollY < $header.height()) {
          scrollPos = Math.round(win.scrollY / 5);
          $header.css({
            transform: 'translate3d(0,' + scrollPos + 'px, 0)'
          });
        }

        if (getViewport().width > 800) {
          $navigation.css({
            transform: 'translate3d(0,' + scrollPos + 'px, 0)'
          });
        } else {
          $navigation.css({
            transform: 'translate3d(0,0,0)'
          });
        }
      }

      win.addEventListener('scroll', function () {
        win.requestAnimFrame(parallax);
      }, false);

      win.requestAnimFrame(parallax);

      parallax();
    },

    smoothScroll: function () {
      var $target,
        scrollOffset;
        //targetHeight,
        //windowHeight;

      $body.find('.js-scroll').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        $target = this.getAttribute('data-scrolltarget') ? $(this.getAttribute('data-scrolltarget')) : $(this.getAttribute('href'));

        if ($target.length === 0) {
          return;
        }

        if (this.getAttribute('data-scrolloffset')) {
          scrollOffset = parseInt(this.getAttribute('data-scrolloffset'), 10);
        } else {
          scrollOffset = 2;
        }

        $target
          .velocity('scroll', {
            offset: scrollOffset,
            duration: 1200,
            easing: 'easeInOutQuart'
          });

        win.setTimeout(function () {
          $body.removeClass('nav-isOpen');
        }, 450);

        e.preventDefault();
      });

      /*
      $body.find('.js-scrollCenter').on('click', function (e) {
        if (e.metaKey || e.ctrlKey) {
          return;
        }

        $target = $(this.getAttribute('href'));

        if ($target.length === 0) {
          return;
        }

        targetHeight = $target.height();
        windowHeight = getViewport().height;

        if (windowHeight > targetHeight) {
          scrollOffset = ((windowHeight - targetHeight) / 2) - targetHeight;
        } else {
          scrollOffset = Math.abs(targetHeight / 2) * -1;
        }

        $target.velocity('scroll', {
          duration: 1200,
          offset: Math.abs(scrollOffset) * -1,
          easing: 'easeInOutQuart'
        });

        win.setTimeout(function () {
          $body.removeClass('nav-isOpen');
        }, 450);

        e.preventDefault();
      });
      */
    },

    disableHover: function () {
      var timer;

      function disableScroll() {
        win.clearTimeout(timer);
        if (!$body.hasClass('disable-hover')) {
          $body.addClass('disable-hover');
        }
        timer = win.setTimeout(function () {
          $body.removeClass('disable-hover');
        }, 200);
      }

      win.addEventListener('scroll', function () {
        win.requestAnimFrame(disableScroll);
      }, false);
    },

    pageTransition: function () {
      var href;

      $body.find('.js-transition').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        href = this.getAttribute('href');

        $body.velocity({
          opacity: 0
        }, {
          duration: 400,
          easing: 'ease',
          complete: function () {
            win.location = href;
          }
        });

        e.preventDefault();
      });
    },

    pageTransitionHalf: function () {
      var href,
        $header = $body.find('.Sitehead'),
        $main = $body.find('.Sitemain'),
        $cover = $header.find('.Sitehead-cover'),
        $nav = $body.find('#navigation'),
        hasCover = ($cover.length > 0) || ($header.height() > winHeight),
        delay = 0,
        count = 0,
        transitionInterval,
        transDone = false,
        color = false,
        slug = false,
        bgCover,
        cover,
        page;

      $body.find('.js-transitionHalf').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        if (hasCover === true) {
          delay = 100;
        }

        href = this.getAttribute('href');
        slug = e.currentTarget.getAttribute('data-slug');

        if (slug && href.indexOf('/blog/') > -1) {
          cover = false;
          color = vincent.postColors[slug];
        } else {
          page = href.replace('/', '');
          page = page.replace('/', '');
          if (page === 'about-me') {
            page = 'about';
          }
          cover = '/images/' + page + '/header.jpg';
        }

        if (cover) {
          bgCover = doc.createElement('div');
          bgCover.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url(' + cover + '); background-repeat: no-repeat; background-position: 50% 50%; background-size: cover; opacity: 0; z-index: -1;';
        }

        $body
          .css('background', vincent.colors.white)
          .velocity('scroll', {
            duration: 700,
            easing: 'easeInOutQuart'
          });

        $main.velocity({
          opacity: 0
        }, {
          duration: 400,
          easing: 'ease'
        });



        $header
          .velocity({
            height: '65%',
            backgroundColor: color ? color : vincent.colors.black
          }, {
            duration: 400,
            easing: 'ease',
            delay: delay,
            complete: function () {
              transDone = true;
            }
          })
          .append(bgCover)
          .find('.Sitehead-inner').velocity({
            opacity: 0,
            translateY: '150%'
          }, {
            duration: 500,
            easing: 'ease',
            delay: delay
          });



        /** Change header colors */
        $header.find('a').velocity({
          color: vincent.colors.white
        }, {
          duration: 400,
          easing: 'ease'
        });
        $nav.find('a').velocity({
          color: vincent.colors.white
        }, {
          duration: 400,
          easing: 'ease'
        });



        $cover.velocity({
          opacity: 0
        }, {
          duration: 400,
          easing: 'ease',
          delay: delay
        });

        if (cover) {
          $(bgCover).velocity({
            opacity: 1
          }, {
            duration: 400,
            easing: 'ease',
            delay: delay
          });
        }

        /** Wait for transitions and prefetches to comlpete. */
        transitionInterval = win.setInterval(function () {
          if (transDone || (count === 10)) {
            win.clearInterval(transitionInterval);
            win.location = href;
          }
          count += 1;
        }, 200);

        e.preventDefault();
      });
    },

    pageTransitionFull: function () {
      var href,
        $header = $body.find('.Sitehead'),
        $main = $body.find('.Sitemain'),
        $cover = $header.find('.Sitehead-cover'),
        hasCover = ($cover.length > 0) || ($header.css('background-image') !== 'none') || ($header.height() > winHeight),
        count = 0,
        transitionInterval,
        transDone = false,
        page;

      $body.find('.js-transitionFull').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        href = this.getAttribute('href');
        page = href.replace('/', '');
        page = page.replace('/', '');

        $main.velocity({
          opacity: 0
        }, {
          duration: 400,
          easing: 'ease'
        });

        $body.find('#navigation a').velocity({
          color: vincent.colors.white
        }, {
          duration: 500,
          easing: 'ease'
        });

        $header.velocity({
          height: winHeight,
          maxHeight: '100%',
          backgroundColor: vincent.colors.red
        }, {
          duration: 500,
          easing: 'ease',
          complete: function () {
            transDone = true;
          }
        });

        $header.find('.Sitehead-inner').velocity({
          translateY: winHeight
        }, {
          duration: 400,
          easing: 'ease'
        });

        $header.find('.Sitehead-logo').velocity({
          translateY: -200
        }, {
          duration: 400,
          easing: 'ease'
        });

        if (hasCover) {
          $cover.velocity({
            opacity: 0
          }, {
            duration: 400,
            easing: 'ease'
          });
        }

        /** Wait for transitions and prefetches to comlpete. */
        transitionInterval = win.setInterval(function () {
          if (transDone || (count === 10)) {
            win.clearInterval(transitionInterval);
            win.location = href;
          }
          count += 1;
        }, 200);

        e.preventDefault();
      });
    },

    workTransition: function () {
      var target, $target, href, transitionInterval,
        $main = $body.find('.Sitemain'),
        $footer = $body.find('.Sitefooter'),
        count = 0,
        scrollSpeed = 200,
        transDone = false;

      $body.find('.js-transitionWork').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        target = this.getAttribute('data-target');
        $target = $(target);
        href = this.getAttribute('href');

        if ($target.offset().top > $(doc).scrollTop()) {
          scrollSpeed = ($target.offset().top - $(doc).scrollTop()) * 2;
        } else {
          scrollSpeed = ($(doc).scrollTop() - $target.offset().top) * 2;
        }

        // Fade out the main content
        $body.css('background', vincent.colors.white);
        $main.css('background', vincent.colors.white);

        $target.velocity('scroll', {
          duration: scrollSpeed,
          easing: 'easeInOutQuart',
          offset: 2
        });

        $target.next('.WorkItem').velocity({
          opacity: 0
        }, {
          duration: 500,
          easing: 'ease'
        });

        $target.velocity({
          height: (getViewport().height * 0.65) + 'px'
        }, {
          duration: 500,
          easing: 'ease',
          complete: function () {
            transDone = true;
          }
        });
        $target.find('.WorkItem-inner').velocity({
          top: '60%'
        }, {
          duration: 400,
          easing: 'ease'
        });
        $target.find('.WorkItem-inner p').velocity({
          opacity: 0,
          maxHeight: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0
        }, {
          duration: 1000,
          easing: 'ease'
        });
        $target.find('.WorkItem-inner a').velocity({
          opacity: 0,
          maxHeight: '53px',
          paddingTop: 0,
          paddingBottom: '2rem',
          marginBottom: '0',
          borderColorAlpha: 0
        }, {
          duration: 400,
          easing: 'ease'
        });

        $footer.velocity({
          paddingBottom: getViewport().height + 'px',
          opacity: 0
        }, {
          duration: 50,
          easing: 'ease'
        });

        /** Wait for transitions and prefetches to comlpete. */
        transitionInterval = win.setInterval(function () {
          if (transDone || (count === 10)) {
            win.clearInterval(transitionInterval);
            win.location = href;
          }
          count += 1;
        }, 200);

        e.preventDefault();
      });
    },

    navToggle: function () {
      function toggleNavigation(state) {

        if (!state) {
          state = null;
        }

        $body
          .addClass('in-transition')
          .toggleClass('nav-isOpen', null);

        win.setTimeout(function () {
          $body.removeClass('in-transition');
        }, 400);
      }

      $body.find('.js-navToggle').on('click', function (e) {
        toggleNavigation();
        e.preventDefault();
      });

      $(win).smartresize(function () {
        if ($body.hasClass('nav-isOpen')) {
          toggleNavigation();
        }
      });

      $('#content').on('click', function (e) {
        if (($body.hasClass('nav-isOpen') === true) && ($(e.target).hasClass('js-navToggle') === false)) {
          toggleNavigation();
          e.preventDefault();
        }
      });

    },

    contactForm: function () {
      var $form = $('#contact-form'),
        $name = $form.find('#name'),
        $email = $form.find('#email'),
        $message = $form.find('#message'),
        $response = $('#response'),
        response = '',
        isError = false;

      function getScroll() {

        if (win.pageYOffset) {
          return {
            top: win.pageYOffset,
            left: win.pageXOffset
          };
        }

        var scrollX,
          scrollY;

        scrollX = docElem.scrollLeft || body.odyscrollLeft || 0;
        scrollY = docElem.scrollTop || body.scrollTop || 0;
        return [scrollX, scrollY];

      }

      $form.on('submit', function () {
        isError = false;

        if ($name.val() === '') {
          $name.next().addClass('is-error');
          isError = true;
        }
        if ($email.val() === '' || !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($email.val())) {
          $email.next().addClass('is-error');
          isError = true;
        }
        if ($message.val() === '') {
          $message.next().addClass('is-error');
          isError = true;
        }



        // Shake form and scroll to the first error found.
        if (isError === true) {
          $form.addClass('has-error');

          $form.find('.is-error').first().velocity('scroll', {
            duration: 900,
            offset: -80,
            easing: 'easeInOutQuart'
          });

          win.setTimeout(function () {
            $form.removeClass('has-error');
          }, 500);
          return false;
        }



        // Scroll to top
        if (getScroll().top >= $form.offset().top) {
          $form.velocity('scroll', {
            duration: 1200,
            offset: -80,
            easing: 'easeInOutQuart'
          });
        }


        // Post with ajax and display eventual response text.
        $.ajax({
          type: 'POST',
          url: $form.attr('action'),
          data: $form.serialize(),
          success: function () {
            $form.addClass('is-sent');
            $form.find('input').attr('disabled', '');
          },
          error: function () {
            $form.addClass('has-error');
            win.setTimeout(function () {
              $form.removeClass('has-error');
            }, 500);
          },
          complete: function (data) {
            if (data.responseText) {
              response = JSON.parse(data.responseText).response;
            } else {
              response = 'Något gick fel!';
            }

            $response
              .html(response)
              .slideDown('slow');
          }
        });

        return false;

      });

      if (Modernizr.touch === false) {
        vincent.floatLabels();
      }
    },

    floatLabels: function () {
      var $form = $('#contact-form');

      $form.find('input, textarea')
        .on('focus', function () {
          $(this).next().addClass('is-active');
        })
        .on('keyup', function () {
          $(this).next().removeClass('is-error');
        })
        .on('blur', function () {
          if ($(this).val() === '' || $(this).val() === 'blank') {
            $(this).next().removeClass('is-active');
          }
        });
    },
    expandable: function () {
      var $target,
        state = true;

      $body.find('.js-expander').on('click', function (e) {

        $target = $('#' + $(this).attr('aria-controls'));
        state = $(this).attr('aria-expanded') === 'false';

        $target
          .slideToggle('slow')
          .attr('aria-hidden', !state);

        $(this).attr('aria-expanded', state);

        e.preventDefault();
        return false;
      });

    },
    /**
     * Lazy load Disqus comments
     */
    blogComments: function () {
      var disqus_shortname = 'vincentorback',
        dsq = doc.createElement('script');

      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.onerror = function () {
        doc.getElementById('disqus_thread').innerHTML = '<p class="u-textCenter"><b>Comments failed to load.</b><br>Maybe somethings up with your internet connection or I’ve f*cked up...<br>Sorry!</p>';
      };
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';

      function loadComments() {
        head.appendChild(dsq);
      }

      $(win).smartscroll(function () {
        if ($.belowthefold($('.js-comments'), {threshold: 100, container: window}) === false) {
          loadComments();
          $(win).unbind('scroll');
        }
      });

    },

    parallaxImages: function () {
      $body.find('.js-parallax').imageScroll({
        //image: null,
        //imageAttribute: (touch === true) ? 'image-mobile' : 'image',
        //container: $body,
        holderMinHeight: 300,
        //extraHeight: 0,
        //mediaWidth: 1600,
        //mediaHeight: 900,
        speed: 0.4,
        coverRatio: 0.85,
        parallax: (Modernizr.csstransforms === true),
        touch: Modernizr.touch === true
      });
    },
    /*
    lazyLoad: function () {
      $body.find('.Sitemain').find('.lazy').lazyload({
        threshold: winHeight
      });
    },
    */
    easterEggs: function () {
      var secret = [
          {
            code: [65, 80, 80, 76, 69], // apple
            magic: function () {
              var appleFont = '<link href="http://fonts.googleapis.com/css?family=Josefin+Sans:100,300" rel="stylesheet" type="text/css">';

              $.get(vincent.amazon + '/easter/apple.css', function (css) {
                $(head).append(appleFont);
                $('<style>').html(css).appendTo(head).addClass('appleStyle');
              });

              $(doc).keydown(function (e) {
                if (e.keyCode === 27) {
                  $(head).find('.appleStyle').remove();
                  $(doc).unbind('keydown', this);
                }
              });
            }
          },
          {
            code: [87, 73, 78, 68, 79, 87, 83], // windows
            magic: function () {
              $.get(vincent.amazon + '/easter/windows-min.js', function (response) {
                $('<script id="windows-script">').html(response).appendTo(head);
              });
              $.get(vincent.amazon + '/easter/windows.css', function (css) {
                $('<style id="window-styles">').html(css).appendTo(head);
              });

              $(doc).keydown(function (e) {
                if (e.keyCode === 27) {
                  $('#windows').remove();
                  $(head).find('.windowsStyle').remove();
                  $(doc).unbind('keydown', this);
                }
              });
            }
          },
          {
            code: [66, 76, 85, 82], // blur
            magic: function () {
              $body.velocity({
                filter: 'blur(2px)'
              }, {
                duration: 2000,
                easing: 'linear'
              });
            }
          },
          {
            code: [65, 83, 84, 69, 82, 79, 73, 68, 83], // asteroids
            magic: function () {
              $.get(vincent.amazon + '/easter/asteroids-min.js', function (response) {
                $('<script is="asteroids-script">').html(response).appendTo(head);
              });
            }
          },
          {
            code: [80, 82, 73, 68, 69], // pride
            magic: function () {
              $body.toggleClass('is-pride');
            }
          },
          {
            code: [80, 65, 73, 78, 84], // paint
            magic: function () {
              $.get(vincent.amazon + '/easter/paint-min.js', function (response) {
                $('<script id="paint-script">').html(response).appendTo(head);
              });
            }
          },
          {
            code: [83, 78, 79, 87], // snow
            magic: function () {
              $.get(vincent.amazon + '/js/vendor/xmas.js', function (response) {
                $('<script id="xmas-script">').html(response).appendTo(head);
              });
            }
          },
          {
            code: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], // konami code
            magic: function () {
              $.get(vincent.amazon + '/easter/codelist.html', function (response) {
                $('<article class="EasterEggs">').html(response).appendTo(body);
              });
            }
          }
        ],
        len = secret.length,
        matching = false,
        j = 0,
        i;

      $(doc).keydown(function (e) {
        // for each secret check letter
        for (i = 0; i < len; i += 1) {
          // if pressed letter is the same as current secret and current letter.
          if (e.keyCode === secret[i].code[j]) {
            j += 1; // go for next letter.
            // if the current letter streak is the same as the length of the current secrat, you win!
            if (j === secret[i].code.length) {
              // removing the current keydown event
              $(doc).unbind('keydown', this);
              // running secret function
              secret[i].magic();
            }
            matching = true;
            break;
          }
        }

        if (!matching) {
          j = 0; // reset streak
        }

        matching = false;
      });
    },

    tracking: function () {
      var href,
        value,
        location;

      $(win).on('load', function () {
        $body.find('a').on('click', function (event) {

          if (ga) {
            href = $(this).attr('href');
            value = $(this).attr('data-trackvalue') || href;
            location = doc.title.substr(0, doc.title.indexOf('|')) || 'Frontpage';

            ga('send', 'event', 'link', 'click', location + ' - ' + value, {
              'hitCallback': function () {
                if (href && (href.charAt(0) !== '#') && (href.charAt(0) !== '/')) {
                  doc.location = href;
                }
              }
            });

            if (href) {
              event.preventDefault();
            }
          }

        });
      });
    }
    /*
    dateEvents: function () {
      function checkDate(currentDate, startDate, endDate) {
        var minDate = new Date(startDate),
          maxDate = new Date(endDate);

        if (currentDate <= maxDate && currentDate >= minDate) {
          return true;
        }

        return false;
      }

      var date = new Date(),
        currentDay = date.getDate(),
        currentMonth = date.getMonth() + 1,
        currentYear = date.getFullYear(),
        nextYear = date.getFullYear() + 1,
        currentDate = new Date(currentMonth + '-' + currentDay + '-' + currentYear),
        i = 0,
        dates = [
          {
            name: 'pride',
            start: '7-28-' + currentYear,
            end: '8-2-' + currentYear
          },
          {
            name: 'christmas',
            start: '12-15-' + currentYear,
            end: '01-05-' + nextYear,
            magic: function () {
              $.get(vincent.amazon + '/js/vendor/xmas.js', function (response) {
                $('<script>').html(response).appendTo(head).attr('id', 'xmasScript');
              });
            }
          }
        ];

      for (i; i < dates.length; i += 1) {
        if (checkDate(currentDate, dates[i].start, dates[i].end) === true) {
          if (typeof dates[i].magic === 'function') {
            dates[i].magic();
          }
          $body.addClass('is-' + dates[i].name);
        }
      }

    },
    */


    /**
     * Replace favicon with page specific icons.

    faviconFun: function () {
      var work = body.className.match(/([\-\-]+[\-A-Z])\w+/g)[0].replace('--', '');

      $(win).load(function () {
        $(head).find('#favicon').remove();
        $(head).append('<link href="/images/' + work + '/favicon.png" rel="shortcut icon">');
      });
    }
    */

  };

  vincent.init();

  FastClick.attach(body);

}(this));