/* global Modernizr, History, ga */

(function (window, undefined) {
  'use strict';

  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }

  function toggleClass(el, className, state) {
    if (el.classList) {
      el.classList.toggle(className, state);
    } else {
      state = isUndefined(state) ? hasClass(el, className) : state;
      if (state) {
        addClass(el, className);
      } else {
        removeClass(el, className);
      }
    }
  }

  function isUndefined(obj) {
    return (typeof obj === 'undefined');
  }

  var supportTouch = Modernizr.touchevents,
    doc = window.document,
    vincent = {

      init: function () {

        // vincent.pageTransitions();

        if (!supportTouch) {
          vincent.slap();

          vincent.contactLink();

          vincent.trackLinks();
        }

      },

      pageTransitions: function () {
        var transitionLinks = doc.querySelectorAll('.js-pageTransition'),
          container = doc.getElementById('container'),
          aboutLink = doc.querySelector('.js-aboutLink'),
          activeClass = 'is-active',
          transitionClass = 'in-transition',
          template,
          pageTitle,
          State;

        History.Adapter.bind(window, 'statechange', function() {
          State = History.getState();
        });

        function changePage(url) {
          addClass(container, transitionClass);

          if ((url === window.location.origin) || (url === (window.location.origin + '/'))) {
            template = window.location.origin + '/partials/index';
            pageTitle = 'Vincent Orback - Web designer and developer in Stockholm';
          } else {
            template = url.replace(window.location.origin, window.location.origin + '/partials');
            pageTitle = 'About me - Vincent Orback - Web designer and developer in Stockholm';
          }

          toggleClass(aboutLink, activeClass, (url.replace(window.location.origin, '') === '/about-me'));

          template = template.replace('.html', '');

          fetch(template + '.html')
          .then(function(response) {
            return response.text();
          }).then(function(body) {
            History.pushState({path: url}, pageTitle, url.replace('.html', ''));
            window.setTimeout(function () {
              container.innerHTML = body;
              removeClass(container, transitionClass);
              vincent.contactLink();
              vincent.trackLinks();
            }, 400);
          }).catch(function(error) {

            console.log('request failed', error);
            addClass(container, transitionClass);

            History.pushState({path: url}, '404', url.replace('.html', ''));
            fetch(window.location.origin + '/partials/404.html')
            .then(function(response) {
              return response.text();
            }).then(function(body) {
              container.innerHTML = body;
              removeClass(container, transitionClass);
            }).catch(function(error) {
              console.log('request failed', error);
              container.innerHTML = 'something went wront :)';
              removeClass(container, transitionClass);
            })
          });
        }

        Array.prototype.slice.call(transitionLinks).forEach(function (linkEl) {
          linkEl.addEventListener('click', function (e) {
            if (window.location.href !== this.href) {
              changePage(this.href);
            }
            e.preventDefault();
          }, false);
        });

        window.addEventListener('popstate', function (e) {
          if (window.location.hash && window.location.hash.length > 0) {
            return;
          }

          changePage(window.location.href);
        });
      },

      contactLink: function () {
        var newClass = 'is-active',
          linkEl = doc.querySelector('.js-contactLink'),
          targetEl = doc.querySelector('.js-contact');

        if (linkEl && targetEl) {
          linkEl.addEventListener('click', function (e) {
            addClass(targetEl, newClass);
            targetEl.addEventListener('mouseover', function () {
              removeClass(targetEl, newClass);
            });
          }, false);
        }
      },

      slap: function () {
        var slapHand = doc.querySelector('.js-slap'),
          slapSound;

        if (!slapHand) {
          return;
        }

        function loadSound() {
          slapSound = new Audio('/assets/audio/slap.mp3');

          if (!slapSound.canPlayType('audio/mp3')) {
            slapSound = new Audio('/assets/audio/slap.ogg');
            if (!slapSound.canPlayType('audio/ogg')) {
              return;
            }
          }

          slapSound.volume = 0.4;
          slapSound.loop = false;

          slapSound.addEventListener('ended', function () {
            slapSound.pause();
            slapSound.currentTime = 0;
          });

          slapHand.removeEventListener('mouseover', loadSound, false);
        }

        slapHand.addEventListener('mouseover', loadSound, false);

        var altHand = slapHand.getAttribute('data-alt'),
          slapText = doc.querySelector('.js-slapText'),
          activeClass = 'is-active',
          awesomeClass = 'is-awesome';

        vincent.slaps = 0;

        slapHand.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function (e) {

          if (slapSound.currentTime !== 0) {
            slapSound.currentTime = 0;
          }

          slapSound.play();

          if (supportTouch) {
            addClass(slapHand, activeClass);
          }

          vincent.slaps += 1;

          if (vincent.slaps === 20) {
            slapSound.volume = 0.8;
            slapText.innerHTML = "You’re awesome!";
            addClass(slapHand, awesomeClass);
          }

          if (vincent.slaps === 40) {
            slapSound.volume = .5;
            slapText.innerHTML = "You’re awesome, let’s give it a rest....";
            removeClass(slapHand, 'is-5 is-10'); // TODO: Test
          }

          if (vincent.slaps === 60) {
            slapSound.volume = 1;
            slapText.innerHTML = "ARGHH! MY HAAAAND!";
          }

          if (vincent.slaps === 80) {
            slapSound.volume = 0.5;
            slapText.innerHTML = "<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer...";
          }

          if (vincent.slaps === 90) {
            slapText.innerHTML = "<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer... :'(";
          }

          if (vincent.slaps === 100) {
            slapText.innerHTML = "100 slaps! Let’s do something fun!";
            window.setTimeout(function () {
              window.location.href = 'https://unicef.se/ge-pengar';
            }, 2000);
          }

        }, false);

      },

      track: function(value, category, callback) {
        // if (typeof ga === 'undefined') {
        //   window.setTimeout(function () {
        //     vincent.track(value, category)
        //   }, 1000);
        //   return;
        // }

        console.log('track:', value, category);

        // ga('send', {
        //   'hitType': 'event',
        //   'eventCategory': category,
        //   'eventAction': supportTouch ? 'tap' : 'click',
        //   'eventValue': value
        // });

        if (callback) {
          callback();
        }
      },

      trackLinks: function () {
        // if (typeof ga === 'undefined') {
        //   window.setTimeout(function () {
        //     vincent.track(value, category)
        //   }, 1000);
        //   return;
        // }

        var outboundLinks = doc.querySelectorAll('a[href^="http"], a[href^="mailto"]');

        Array.prototype.slice.call(outboundLinks).forEach(function (link) {
          if (link.host.indexOf('vincentorback') > -1) {
            return;
          }

          link.addEventListener('click', function (e) {

            if (vincent.slaps > 0) {
              vincent.track(vincent.slaps, 'slaps');
            }

            console.log('track outbound link');

            // ga('send', 'event', 'outbound', 'click', link.href, {
            //   'transport': 'beacon'
            // });

            if (e.metaKey || e.ctrlKey) {
              return;
            }

            doc.location = e.currentTarget.href;

            e.preventDefault();
          }, false);
        });
      }
    };

  window.addEventListener('load', vincent.init, false);

}(window));
