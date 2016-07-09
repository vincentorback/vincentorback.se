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

      if (!slapHand) {
        return;
      }

      var slapSound = new Audio('/assets/audio/slap.mp3');

      if (!slapSound.canPlayType('audio/mp3')) {
        return;
      }

      var altHand = slapHand.getAttribute('data-alt');

      slapSound.volume = 0.4;

      slapHand.addEventListener(Modernizr.touchevents ? 'touchstart' : 'mousedown', function (e) {
        slapSound.currentTime = 0;
        slapSound.play();
        vincent.track(1, 'slap');
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
