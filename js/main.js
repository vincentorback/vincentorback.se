/* jslint browser: true, indent: 2 */
/* global $, jQuery, Modernizr, ga */

(function (window) {
  'use strict';

  var doc = window.document,
    docElem = doc.documentElement,
    isSmoothScrollSupported = docElem.style.hasOwnProperty('scrollBehavior');

  function getViewport() {
    return {
      width: Math.max(docElem.clientWidth, window.innerWidth || 0),
      height: Math.max(docElem.clientHeight, window.innerHeight || 0)
    };
  }

  function isElementInViewport($el) {
    var rect = $el[0].getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewport.height &&
      rect.right <= viewport.width
    );
  }

  var head = doc.head || doc.getElementsByTagName('head')[0],
    body = doc.body || doc.getElementsByTagName('body')[0],
    $body = $(body),
    $siteHead = $body.find('.Sitehead'),
    viewport = getViewport(),
    winWidth = viewport.width,
    winHeight = viewport.height,
    vincent;

  window.onpageshow = function(event) {
    if (event.persisted) {
      window.location.reload();
    }
  };

  vincent = {

    init: function () {

      vincent.amazon = '//d3dx0f1ge67l9j.cloudfront.net';
      vincent.colors = {
        purple: '#9b59b6',
        pink: '#ff7fa5',
        yellow: '#f1c40f',
        blue: '#1eb0e9',
        red: '#ff4136',
        green: '#2ecc71',
        white: '#fff',
        black: '#000',
        orange: '#f39c12',
        coop: '#14ab30'
      };
      vincent.postColors = {
        'clean-wordpress-admin': vincent.colors.purple,
        'loop-scroll': vincent.colors.blue,
        'favorite-talks': vincent.colors.orange,
        'honor-dnt': vincent.colors.pink,
        'smooth-scrolling-with-css': vincent.colors.blue,
        'take-10-and-learn-typography': vincent.colors.red,
        'using-webp-images': vincent.colors.green
      };
      vincent.scrollEasing = 'easeInOutQuart';

      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame  ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      }());

      vincent.navToggle();

      vincent.smoothScroll();

      if (winWidth > 800 && Modernizr.csstransforms) {
        vincent.pageTransition();
        vincent.pageTransitionHalf();
        //vincent.pageTransitionFull();

        if (doc.getElementById('page-front')) {
          vincent.workTransition();
        }
      }

      if (Modernizr.csstransforms && (['page-work', 'page-about'].indexOf($body.attr('id')) > -1)) {
        vincent.parallaxImages();
      }

      if (doc.getElementById('page-contact')) {
        vincent.contactForm();
      }

      if (doc.getElementById('page-post')) {
        vincent.blogComments();
      }

      vincent.disableHover();

      vincent.easterEggs();

      vincent.tracking();

      if (Modernizr.svg) {
        vincent.svgRefresh();
      }

      if (!Modernizr.csstransforms || !Modernizr.svg) {
        $body.append('<div class="Alert" role="alert"><p class="Alert-text">You are using an <strong>outdated</strong> browser! Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p></div>');
      }

      vincent.lazyLoad();

    },

    lazyLoad: function () {
      var targets = doc.querySelectorAll('.js-lazy'),
        i = 0;

      for (i; i < targets.length; i += 1) {
        targets[i].setAttribute('src', targets[i].getAttribute('data-lazy'));
      }
    },

    smoothScroll: function () {
      var $target,
        scrollOffset;

      $body.find('.js-scroll').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        $target = e.currentTarget.getAttribute('data-scrolltarget') ? $(e.currentTarget.getAttribute('data-scrolltarget')) : $(e.currentTarget.getAttribute('href'));

        if ($target.length === 0) {
          return;
        }

        if (e.currentTarget.getAttribute('data-scrolloffset')) {
          scrollOffset = parseInt(e.currentTarget.getAttribute('data-scrolloffset'), 10);
        } else {
          scrollOffset = 2;
        }

        if (isSmoothScrollSupported) {
          window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': $target.offset().top + scrollOffset
          });
        } else {
          $target
            .velocity('scroll', {
              offset: scrollOffset,
              duration: 800,
              easing: vincent.scrollEasing
            });
        }

        window.setTimeout(function () {
          $body.removeClass('nav-isOpen');
        }, 450);

        e.preventDefault();
      });
    },

    disableHover: function () {
      var timer;

      function disableScroll() {
        window.clearTimeout(timer);
        if (!$body.hasClass('disable-hover')) {
          $body.addClass('disable-hover');
        }
        timer = window.setTimeout(function () {
          $body.removeClass('disable-hover');
        }, 200);
      }

      window.addEventListener('scroll', function () {
        window.requestAnimFrame(disableScroll);
      }, false);
    },

    pageTransition: function () {
      var href;

      $body.find('.js-transition').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        href = e.currentTarget.getAttribute('href');

        $body.addClass('disable-hover');

        if (isSmoothScrollSupported) {
          $body
            .velocity({
              opacity: [0, 1]
            }, {
              duration: 500,
              easing: 'ease',
              queue: false,
              complete: function () {
                window.location = href;
              }
            });

          window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': 0
          });

        } else {
          $body
            .velocity({
              opacity: [0, 1]
            }, {
              duration: 400,
              easing: 'ease',
              queue: false
            })
            .velocity('scroll', {
              duration: 700,
              easing: vincent.scrollEasing,
              complete: function () {
                window.location = href;
              }
            });
        }

        e.preventDefault();
      });
    },

    pageTransitionHalf: function () {
      var href,
        $main = $body.find('.Site-main'),
        $cover = $siteHead.find('.Sitehead-cover'),
        $nav = $body.find('#navigation'),
        $logo = $siteHead.find('.Sitehead-logo'),
        delay = 0,
        count = 0,
        transitionInterval,
        hasCover = false,
        transDone = false,
        color = false,
        slug = false,
        bgCover,
        cover,
        page,
        coverSize,
        currentIsHalf = ['page-front', 'page-about', 'page-blog', 'page-post', 'page-contact'].indexOf($body.attr('id')) > -1;

      $body.find('.js-transitionHalf').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        viewport = getViewport();
        hasCover = ($cover.length > 0) || ($siteHead.height() > viewport.height);

        if (hasCover === true) {
          delay = 100;
        }

        href = e.currentTarget.getAttribute('href');
        slug = e.currentTarget.getAttribute('data-slug');

        if (href === '/') {
          page = 'front';
          cover = false;
          color = vincent.colors.red;
        } else if (slug && href.indexOf('/blog/') > -1) {
          cover = false;
          color = vincent.postColors[slug];
        } else {
          page = href.replace('/', '');
          page = page.replace('/', '');

          if (page === 'about-me') {
            page = 'about';
          }

          coverSize = viewport.width > 1200 ? 'large' : 'medium';
          cover = vincent.amazon + '/images/' + page + '/header-' + coverSize + '.jpg';
        }

        if (cover && (page !== 'front')) {
          bgCover = doc.createElement('div');
          bgCover.style.cssText = 'transform: translateZ(0); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url(' + cover + '); background-repeat: no-repeat; background-position: 50% 50%; background-size: cover; opacity: 0; z-index: -1;';
          if (page === 'contact') {
            bgCover.style.backgroundPosition = '50% 0';
          } else if (page === 'blog') {
            bgCover.style.backgroundPosition = '75% 50%';
          }
        }

        $body.addClass('disable-hover');

        if (isSmoothScrollSupported) {
          window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': 0
          });
        } else {
          $body.velocity('scroll', {
            duration: 700,
            easing: vincent.scrollEasing
          });
        }

        $main.velocity({
          opacity: [0, 1]
        }, {
          duration: 400,
          easing: 'ease'
        });

        if (page !== 'front') {
          $siteHead.append(bgCover);
        }

        $siteHead
          .find('.Sitehead-inner').velocity({
            opacity: [0, 1],
            translateY: '150%'
          }, {
            duration: 400,
            easing: 'ease',
            delay: delay,
            complete: function () {
              transDone = true;
            }
          });

        if (!currentIsHalf) {
          $body.css('background', vincent.colors.white);

          $siteHead.velocity({
            height: '70%',
            backgroundColor: color || vincent.colors.black
          }, {
            duration: 400,
            easing: 'ease',
            delay: delay
          });

          $siteHead.find('a').velocity({
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
        } else {
          $siteHead.velocity({
            backgroundColor: color || vincent.colors.black
          }, {
            duration: 400,
            easing: 'ease'
          });
        }

        if (hasCover) {
          $cover.velocity({
            opacity: [0, 1]
          }, {
            duration: 400,
            easing: 'ease',
            delay: delay
          });
        }

        if (cover) {
          $(bgCover).velocity({
            opacity: [1, 0]
          }, {
            duration: 400,
            easing: 'ease',
            delay: delay
          });
        }

        if (page === 'front') {
          $body.css('background', vincent.colors.coop);

          $logo.velocity({
            translateY: '-300%'
          }, {
            duration: 500,
            easing: 'ease'
          });
        }

        // Wait for transitions and prefetches to comlpete.
        transitionInterval = window.setInterval(function () {
          if (transDone || (count === 10)) {
            window.clearInterval(transitionInterval);
            window.location = href;
          }
          count += 1;
        }, 500);

        e.preventDefault();
      });
    },

    /*
    pageTransitionFull: function () {
      var href,
        $main = $body.find('.Site-main'),
        $cover = $siteHead.find('.Sitehead-cover'),
        hasCover = ($cover.length > 0) || ($siteHead.css('background-image') !== 'none') || ($siteHead.height() > winHeight),
        count = 0,
        transitionInterval,
        transDone = false,
        page;

      $body.find('.js-transitionFull').on('click', function (e) {

        if (e.metaKey || e.ctrlKey) {
          return;
        }

        winHeight = getViewport().height;

        href = e.currentTarget.getAttribute('href');
        page = href.replace('/', '');
        page = page.replace('/', '');

        $body.addClass('disable-hover');

        $main.velocity({
          opacity: [0, 1]
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

        $siteHead.velocity({
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

        $siteHead.find('.Sitehead-inner').velocity({
          translateY: winHeight
        }, {
          duration: 400,
          easing: 'ease'
        });

        $siteHead.find('.Sitehead-logo').velocity({
          translateY: -200
        }, {
          duration: 400,
          easing: 'ease'
        });

        if (hasCover) {
          $cover.velocity({
            opacity: [0, 1]
          }, {
            duration: 400,
            easing: 'ease'
          });
        }

        // Wait for transitions and prefetches to comlpete.
        transitionInterval = window.setInterval(function () {
          if (transDone || (count === 10)) {
            window.clearInterval(transitionInterval);
            window.location = href;
          }
          count += 1;
        }, 500);

        e.preventDefault();
      });
    },
    */

    workTransition: function () {
      var target, $target, href, transitionInterval,
        $docEl = $('body, html'),
        $main = $body.find('.Site-main'),
        $footer = $body.find('.Sitefooter'),
        count = 0,
        transDone = false,
        workTitles = $body.find('.WorkItem-title'),
        i = 0;

      for (i; i < workTitles.length; i += 1) {
        workTitles[i].setAttribute('data-height', workTitles[i].offsetHeight);
      }

      $body.find('.js-transitionWork').on('click', function (e) {
        if (e.metaKey || e.ctrlKey) {
          return;
        }

        winHeight = getViewport().height;

        target = e.currentTarget.getAttribute('data-target');
        $target = $(target);
        href = e.currentTarget.getAttribute('href');

        // Fade out the main content
        $body
          .addClass('disable-hover')
          .css('background', vincent.colors.white);

        $main.css('background', vincent.colors.white);

        if (isSmoothScrollSupported) {
          window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': $target.offset().top
          });
        } else {
          $docEl.stop().animate({
            scrollTop: $target.offset().top
          }, 400);
        }

        $target.next('.WorkItem').velocity({
          opacity: [0, 1]
        }, {
          duration: 300,
          easing: 'ease'
        });

        $target.velocity({
          height: (winHeight * 0.7) + 'px'
        }, {
          duration: 450,
          easing: 'ease',
          complete: function () {
            transDone = true;
          }
        });

        $target.find('.WorkItem-inner').velocity({
          top: ['60%', '50%'],
          height: parseInt($target.find('.WorkItem-title').attr('data-height')) + 45
        }, {
          duration: 400,
          easing: 'ease'
        });

        $target.find('.WorkItem-text, .WorkItem-link').velocity({
          opacity: [0, 1]
        }, {
          duration: 300,
          easing: 'ease'
        });

        if (window.scrollY + (winHeight * 2) > body.scrollHeight) {
          $footer.velocity({
            paddingBottom: winHeight + 'px',
            opacity: [0, 1]
          }, {
            duration: 50,
            easing: 'ease'
          });
        }

        // Wait for transitions and prefetches to comlpete.
        transitionInterval = window.setInterval(function () {
          if (transDone || (count === 10)) {
            window.clearInterval(transitionInterval);
            window.location = href;
          }
          count += 1;
        }, 500);

        e.preventDefault();
      });
    },

    navToggle: function () {
      var $navButton = $siteHead.find('.js-navToggle'),
        $navMenu = $body.find('#navigation'),
        $navLinks = $navMenu.find('a'),
        ACTIVE_CLASS = 'nav-isOpen';

      function enableNavLinks () {
        $navButton.attr('aria-label', 'Menu expanded');
        $navMenu.removeAttr('aria-hidden', '');
        $navLinks.removeAttr('tabIndex');
      }

      function disableNavLinks () {
        $navButton.attr('aria-label', 'Menu collapsed');
        $navMenu.attr('aria-hidden', 'true');
        $navLinks.attr('tabIndex', '-1');
      }

      // true = open
      function toggleNav(newState) {
        newState = newState || ($body.hasClass(ACTIVE_CLASS) === false);

        if (newState === true) {
          enableNavLinks();
        } else {
          disableNavLinks();
        }

        $body.toggleClass(ACTIVE_CLASS, newState);
      }

      function handleKeydown (event) {
        if (event.keyCode === 27) { // Esc
          toggleNav(false);
          $navButton.focus();
        }
      }

      function handleClick () {
        toggleNav();

        if ($body.hasClass(ACTIVE_CLASS)) {
          $navLinks.eq(0).focus();
        }
      }

      $navMenu.on('keydown', handleKeydown);
      $navButton.on('click', handleClick);
      $navLinks.on('click', toggleNav);

      if (800 > winWidth) {
        disableNavLinks();
      }
    },

    contactForm: function () {
      var $form = $('#contact-form'),
        $name = $form.find('#name'),
        $email = $form.find('#email'),
        $message = $form.find('#message'),
        $response = $('#response'),
        response = '',
        isError = false,
        $firstError,
        errorMessage = 'Something went wrong... Try sending and email to <a href="mailto:vincentorback@gmail.com&subject=Message from vincentorback.se&body=' + $message.val() + '">vincentorback@gmail.com</a> instead.';

      $form.on('submit', function () {
        isError = false;

        if ($name.val() === '') {
          $name.next().addClass('is-error');
          isError = true;
        }
        if ($email.val() === '' || (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($email.val()))) {
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

          $firstError = $form.find('.is-error').first();

          if (isElementInViewport($firstError)) {
            $firstError.prev('input, textarea').focus();
          } else {
            $firstError.velocity('scroll', {
              duration: 900,
              offset: -60,
              easing: vincent.scrollEasing,
              complete: function () {
                $firstError.prev('input, textarea').focus();
              }
            });
          }

          window.setTimeout(function () {
            $form.removeClass('has-error');
          }, 500);
          return false;
        }

        // Scroll to top of form
        if (!isElementInViewport($form)) {
          if (isSmoothScrollSupported) {
            window.scrollTo({
              'behavior': 'smooth',
              'left': 0,
              'top': $form.offset().top - 80
            });
          } else {
            $form.velocity('scroll', {
              duration: 1200,
              offset: -80,
              easing: vincent.scrollEasing
            });
          }
        }

        // Post with ajax and display eventual response text.
        $.ajax({
          type: 'POST',
          url: $form.attr('action'),
          data: $form.serialize(),
          success: function () {
            $form.addClass('is-sent');
            $form.find('input, textarea').prop('disabled', true);
          },
          error: function () {
            $form.addClass('has-error');
            window.setTimeout(function () {
              $form.removeClass('has-error');

              $response[0].innerHtml = errorMessage;
              $response.slideDown();

            }, 500);
          },
          complete: function (data) {
            if (data.responseText) {
              response = JSON.parse(data.responseText);
            } else {
              response = errorMessage;
            }

            $response.html(response);
            $response.slideDown('slow');
          }
        });

        return false;

      });

      if (Modernizr.touchevents === false) {
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
        })
        // Submit form on cmd + enter
        .on('keydown', function (event) {
          if (!(event.keyCode === 13 && event.metaKey)) {
            return;
          }
          $form.submit();
        });
    },

    blogComments: function () {
      var disqus_shortname = 'vincentorback',
        $comments = $body.find('.js-comments');

      if ($comments.length === 0) {
        return;
      }

      var dsq = doc.createElement('script');

      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.onerror = function () {
        doc.getElementById('disqus_thread').innerHTML = '<p class="u-textCenter"><b>Comments failed to load.</b><br>Maybe somethings up with your internet connection or maybe it’s my fault ...<br>Sorry!</p>';
      };
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';

      var loadComments = function() {
        head.appendChild(dsq);
      };

      $(window).smartscroll(function () {
        if (isElementInViewport($comments)) {
          window.requestAnimFrame(loadComments);
          $(window).unbind('scroll');
        }
      });
    },

    parallaxImages: function () {
      $body.find('.js-parallax').imageScroll({
        imageAttribute: (winWidth < 800) ? 'mobile' : 'image',
        holderMinHeight: 300,
        speed: 0.4,
        coverRatio: 0.85,
        parallax: Modernizr.csstransforms,
        touch: Modernizr.touchevents
      });
    },

    easterEggs: function () {
      var easterUrl = vincent.amazon + '/easter',
        easterEggs = [
          {
            code: [65, 80, 80, 76, 69], // apple
            magic: function () {
              var appleFont = '<link href="http://fonts.googleapis.com/css?family=Josefin+Sans:100,300" rel="stylesheet">';

              $.get(easterUrl + '/apple.css', function (css) {
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
              $.get(easterUrl + '/windows-min.js', function (response) {
                $('<script id="windows-script">').html(response).appendTo(head);
              });
              $.get(easterUrl + '/windows.css', function (css) {
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
                filter: ['blur(2px)', 'blur(0)']
              }, {
                duration: 2000,
                easing: 'linear'
              });
            }
          },
          {
            code: [65, 83, 84, 69, 82, 79, 73, 68, 83], // asteroids
            magic: function () {
              $.get(easterUrl + '/asteroids-min.js', function (response) {
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
              $.get(easterUrl + '/paint-min.js', function (response) {
                $('<script id="paint-script">').html(response).appendTo(head);
              });
            }
          },
          {
            code: [83, 78, 79, 87], // snow
            magic: function () {
              $.get(easterUrl + '/xmas-min.js', function (response) {
                $('<script id="xmas-script">').html(response).appendTo(head);
              });
            }
          },
          {
            code: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], // konami code
            magic: function () {
              $.get(easterUrl + '/codelist.html', function (response) {
                $('<article class="EasterEggs">').html(response).appendTo(body);
              });
            }
          }
        ],
        len = easterEggs.length,
        matching = false,
        j = 0,
        i;

      $(doc).keydown(function (e) {
        // for each easter egg check letter
        for (i = 0; i < len; i += 1) {
          // if pressed letter is the same as current easter egg and current letter.
          if (e.keyCode === easterEggs[i].code[j]) {
            j += 1; // go for next letter.
            // if the current letter streak is the same as the length of the current secrat, you win!
            if (j === easterEggs[i].code.length) {
              // removing the current keydown event
              $(doc).unbind('keydown', this);
              // running easter egg function function
              easterEggs[i].magic();
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
        location,
        DoNotTrack = window.doNotTrack === '1' || window.doNotTrack === 'yes' || window.navigator.doNotTrack === 'yes' || window.navigator.doNotTrack === '1' || window.navigator.msDoNotTrack === '1';

      if (DoNotTrack) {
        return;
      }

      $(window).on('load', function () {
        $body.find('a').on('click', function (e) {
          if (window.ga) {
            href = $(e.currentTarget).attr('href');
            value = $(e.currentTarget).attr('data-trackvalue') || href;
            location = doc.title.substr(0, doc.title.indexOf('|')) || 'Frontpage';

            ga('send', 'event', 'link', 'click', location + ' - ' + value, {
              'hitCallback': function () {
                if (href && (href.charAt(0) !== '#') && (href.charAt(0) !== '/')) {
                  if (e.metaKey || e.ctrlKey) {
                    return;
                  }
                  doc.location = href;
                }
              }
            });
          } else {
            throw new Error('ga is not defined...');
          }
        });
      });
    },

    svgRefresh: function () {
      var svgElements = $body.find('use'),
        i = 0,
        href;

      for (i; svgElements.length > i; i += 1) {
        href = svgElements[i].getAttribute('xlink:href');
        svgElements[i].setAttribute('xlink:href', href);
      }
    }
  };

  vincent.init();

}(this));
