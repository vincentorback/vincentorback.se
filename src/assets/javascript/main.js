/* global Modernizr, jump */

(function (window) {
  'use strict';

  var doc = window.document,
  vincent = {

    init: function () {
      vincent.slap();
      vincent.contactLink();
      vincent.trackLinks();
    },

    contactLink: function () {
      var newClass = 'is-active';
      var targetEl = doc.querySelector('.js-contact');

      if (targetEl) {
        doc.querySelector('.js-contactLink').addEventListener('click', function (e) {
          targetEl.classList.add(newClass);
          targetEl.addEventListener('mouseover', function () {
            targetEl.classList.remove(newClass);
          });
        }, false);
      }
    },

    slap: function () {
      var slapHand = doc.querySelector('.js-slap');
      var slapSound;

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

        slapSound.volume = 0.5;

        slapSound.addEventListener('ended', function () {
          slapSound.currentTime = 0;
        });

        slapHand.removeEventListener('mouseover', loadSound, false);
      }

      slapHand.addEventListener('mouseover', loadSound, false);

      var altHand = slapHand.getAttribute('data-alt');
      var slapText = doc.querySelector('.js-slapText');

      vincent.slaps = 0;

      slapHand.addEventListener(Modernizr.touchevents ? 'touchstart' : 'mousedown', function (e) {

        if (slapSound.currentTime !== 0) {
          slapSound.currentTime = 0;
        }

        slapSound.play();

        if (Modernizr.touchevents) {
          slapHand.classList.add('is-active');
        }

        vincent.slaps += 1;

        if (vincent.slaps === 20) {
          slapSound.volume = 0.8;
          slapText.innerHTML = "You’re awesome!";
          slapHand.classList.add('is-awesome');
        }

        if (vincent.slaps === 40) {
          slapSound.volume = .3;
          slapText.innerHTML = "You’re awesome, let’s give it a rest....";
          slapHand.classList.remove('is-5', 'is-10');
        }

        if (vincent.slaps === 60) {
          slapSound.volume = 1;
          slapText.innerHTML = "ARGHH! MY HAAAAND!";
        }

        if (vincent.slaps === 80) {
          slapSound.volume = 0.4;
          slapText.innerHTML = "<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer...";
        }

        if (vincent.slaps === 90) {
          slapText.innerHTML = "<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer... :'(";
        }

        if (vincent.slaps === 100) {
          slapText.innerHTML = "100 slaps! Let’s do something fun!";
          window.setTimeout(function () {
            window.location.href = 'https://unicef.se/ge-pengar';
          }, 3000);
        }

        // vincent.track(1, 'slap');
      }, false);

    },

    track: function(value, category, callback) {
      // if (typeof ga === 'undefined') {
      //   window.setTimeout(function () {
      //     vincent.track(value, category)
      //   }, 1000);
      //   return;
      // }

      console.log(value, category);

      // ga('send', {
      //   'hitType': 'event',
      //   'eventCategory': category,
      //   'eventAction': Modernizr.touchevents ? 'tap' : 'click',
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

      var links = doc.querySelectorAll('a[href^="http"], a[href^="mailto"]');

      Array.from(links, function (link) {

        if (link.host.indexOf('vincentorback') > -1) {
          return;
        }

        link.addEventListener('click', function (e) {

          if (vincent.slaps > 0) {
            vincent.track(vincent.slaps, 'slaps');
          }

          ga('send', 'event', 'outbound', 'click', link.href, {
            'transport': 'beacon'
          });

          if (e.metaKey || e.ctrlKey) {
            return;
          }

          doc.location = linkUrl;

          e.preventDefault();
        }, false);
      });
    }
  };

  window.addEventListener('load', vincent.init, false);

}(this));
