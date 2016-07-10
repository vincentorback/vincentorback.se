/* global Modernizr */

(function (window) {
  'use strict';

  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  }());

  var doc = window.document;

  var vincent = {

    init: function () {
      vincent.slap();
      vincent.trackLinks();
    },

    slap: function () {
      var slapHand = doc.querySelector('.js-slap');
      var slaps = 0;

      if (!slapHand) {
        return;
      }

      var slapSound = new Audio('/assets/audio/slap.mp3');

      if (!slapSound.canPlayType('audio/mp3')) {
        return;
      }

      var altHand = slapHand.getAttribute('data-alt');
      var slapText = doc.querySelector('.js-slapText');

      slapSound.volume = 0.4;

      slapHand.addEventListener(Modernizr.touchevents ? 'touchstart' : 'mousedown', function (e) {
        slapSound.currentTime = 0;
        slapSound.play();
        vincent.track(1, 'slap');

        if (Modernizr.touchevents) {
          slapHand.classList.add('is-active');
        }

        slaps += 1;

        if (slaps === 10) {
          slapSound.volume = 0.8;
          slapText.innerHTML = "You’re awesome!";
          slapHand.classList.add('is-awesome');
        }

        if (slaps === 40) {
          slapSound.volume = .3;
          slapText.innerHTML = "You’re awesome, let’s give it a rest....";
          slapHand.classList.remove('is-5', 'is-10');
        }

        if (slaps === 50) {
          slapSound.volume = 1;
          slapText.innerHTML = "ARGHH! MY HAAAAND!";
        }

        if (slaps === 60) {
          slapSound.volume = 0.4;
          slapText.innerHTML = "<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer...";
        }

        if (slaps === 70) {
          slapText.innerHTML = "<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer... :'(";
        }

        if (slaps === 100) {
          slapText.innerHTML = "100 slaps! Keep going!";
        }

        if (slaps === 1000) {
          slapText.innerHTML = "1000 slaps! You win! Email me and I’ll send you back a funny gif or something :)";
        }
      }, false);

    },

    track: function(value, category) {
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
    },

    trackLinks: function () {
      // if (typeof ga === 'undefined') {
      //   window.setTimeout(function () {
      //     vincent.track(value, category)
      //   }, 1000);
      //   return;
      // }

      var links = doc.querySelectorAll('a');
      var linkUrl;

      Array.from(links, function (link) {
        link.addEventListener('click', function (e) {

          linkUrl = link.getAttribute('href');

          console.log(window.location.href, linkUrl);
          doc.location = linkUrl;

          // ga('send', 'event', 'outbound', 'click', linkUrl, {
          //   'transport': 'beacon',
          //   'hitCallback': function() {
          //     doc.location = linkUrl;
          //   }
          // });

          e.preventDefault();
        })
      });


    }

  };

  vincent.init();

}(this));
