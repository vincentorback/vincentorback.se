/* jslint browser: true, indent: 2 */
/* global $, jQuery, Modernizr, FastClick, ga */

(function (window) {
  'use strict';

  var doc = window.document,
    docElem = doc.documentElement;

  function getViewport() {
    return {
      width: Math.max(docElem.clientWidth, window.innerWidth || 0),
      height: Math.max(docElem.clientHeight, window.innerHeight || 0)
    };
  }

  function isElementInViewport(el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || docElem.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || docElem.clientWidth) /*or $(window).width() */
    );
  }

  var head = doc.head || doc.getElementsByTagName('head')[0],
    body = doc.body || doc.getElementsByTagName('body')[0],
    $body = $(body),
    $siteHead = $body.find('.Sitehead'),
    winWidth = getViewport().width,
    winHeight = getViewport().height,
    vincent;

  vincent = {

    init: function () {

      vincent.amazon = '//d3dx0f1ge67l9j.cloudfront.net';
      vincent.colors = {
        pink: '#ff7fa5',
        yellow: '#f1c40f',
        blue: '#1eb0e9',
        red: '#ff4e00',
        green: '#2ecc71',
        white: '#fff',
        black: '#000'
      };
      vincent.postColors = {
        'honor-dnt': vincent.colors.pink,
        'i-commit-from-my-heart': vincent.colors.yellow,
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

      /*if ((Modernizr.touch === false) && Modernizr.csstransforms) {
        vincent.parallaxHead();
      }*/

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
      }

      if (doc.getElementById('page-contact')) {
        vincent.contactForm();
        //vincent.expandable();
      }

      if (doc.getElementById('page-post')) {
        vincent.blogComments();
      }

      vincent.disableHover();

      vincent.easterEggs();

      vincent.tracking();

      vincent.svgRefresh();
    },

    /*parallaxHead: function () {
      var $navigation = $body.find('.Navigation'),
        scrollPos;

      function parallax() {
        if (window.scrollY < $siteHead.height()) {
          scrollPos = Math.round(window.scrollY / 5);
          $siteHead.css({
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

      window.addEventListener('scroll', function () {
        window.requestAnimFrame(parallax);
      }, false);

      window.requestAnimFrame(parallax);

      parallax();
    },*/

    smoothScroll: function () {
      var $target,
        scrollOffset;

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
            easing: vincent.scrollEasing
          });

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

        href = this.getAttribute('href');

        $body
          .velocity({
            opacity: 0
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

        e.preventDefault();
      });
    },

    pageTransitionHalf: function () {
      var href,
        $main = $body.find('.Sitemain'),
        $cover = $siteHead.find('.Sitehead-cover'),
        $nav = $body.find('#navigation'),
        hasCover = ($cover.length > 0) || ($siteHead.height() > winHeight),
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
          if (page === 'contact') {
            bgCover.style.backgroundPosition = '50% 0';
          } else if (page === 'blog') {
            bgCover.style.backgroundPosition = '75% 50%';
          }
        }

        $body
          .css('background', vincent.colors.white)
          .velocity('scroll', {
            duration: 700,
            easing: vincent.scrollEasing
          });

        $main.velocity({
          opacity: 0
        }, {
          duration: 400,
          easing: 'ease'
        });

        $siteHead
          .velocity({
            height: '60%',
            backgroundColor: color || vincent.colors.black
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
        transitionInterval = window.setInterval(function () {
          if (transDone || (count === 10)) {
            window.clearInterval(transitionInterval);
            window.location = href;
          }
          count += 1;
        }, 200);

        e.preventDefault();
      });
    },

    pageTransitionFull: function () {
      var href,
        $main = $body.find('.Sitemain'),
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
            opacity: 0
          }, {
            duration: 400,
            easing: 'ease'
          });
        }

        /** Wait for transitions and prefetches to comlpete. */
        transitionInterval = window.setInterval(function () {
          if (transDone || (count === 10)) {
            window.clearInterval(transitionInterval);
            window.location = href;
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

        e.preventDefault();

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
          easing: vincent.scrollEasing,
          offset: 2
        });

        $target.next('.WorkItem').velocity({
          opacity: 0
        }, {
          duration: 500,
          easing: 'ease'
        });

        $target.velocity({
          height: (getViewport().height * 0.6) + 'px'
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
        transitionInterval = window.setInterval(function () {
          if (transDone || (count === 10)) {
            window.clearInterval(transitionInterval);
            window.location = href;
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

        window.setTimeout(function () {
          $body.removeClass('in-transition');
        }, 400);
      }

      $body.find('.js-navToggle').on('click', function (e) {
        toggleNavigation();
        e.preventDefault();
      });

      $(window).smartresize(function () {
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
        isError = false,
        $firstError;

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
          $form.velocity('scroll', {
            duration: 1200,
            offset: -80,
            easing: vincent.scrollEasing
          });
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
/*
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
*/
    blogComments: function () {
      var disqus_shortname = 'vincentorback',
        dsq = doc.createElement('script');

      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.onerror = function () {
        doc.getElementById('disqus_thread').innerHTML = '<p class="u-textCenter"><b>Comments failed to load.</b><br>Maybe somethings up with your internet connection or maybe it’s my fault ...<br>Sorry!</p>';
      };
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';

      function loadComments() {
        head.appendChild(dsq);
      }

      $(window).smartscroll(function () {
        if ($.belowthefold($('.js-comments'), {threshold: 100, container: window}) === false) {
          loadComments();
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
        touch: Modernizr.touch
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
        DoNotTrack = window.navigator.doNotTrack === 'yes' || window.navigator.doNotTrack === '1' || window.navigator.msDoNotTrack === '1';

      if (DoNotTrack) {
        return;
      }

      $(window).on('load', function () {
        $body.find('a').on('click', function (e) {
          if (window.ga) {
            href = $(this).attr('href');
            value = $(this).attr('data-trackvalue') || href;
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

  FastClick.attach(body);

}(this));