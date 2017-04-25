/* global Modernizr, Blazy, Audio, ga */

(function (window) {
  'use strict'

  var supportTouch = Modernizr.touchevents
  var doc = window.document

  var vincent = {
    init: function () {
      vincent.lazyImages()

      if (!supportTouch) {
        vincent.slap()
      }

      vincent.trackLinks()

      vincent.contactLink()
    },

    lazyImages: function () {
      return new Blazy({
        selector: '.js-lazy',
        offset: 200
      })
    },

    contactLink: function () {
      var linkEl = doc.querySelector('.js-contactLink')
      var targetEl = doc.querySelector('.js-contact')

      if (linkEl && targetEl) {
        linkEl.addEventListener('click', function (e) {
          window.setTimeout(function () {
            targetEl.focus()
          }, 200)
        }, false)
      }
    },

    slap: function () {
      var slapHand = doc.querySelector('.js-slap')
      var slapSound

      if (!slapHand) {
        return
      }

      function loadSound () {
        slapSound = new Audio('/assets/audio/slap.mp3')

        if (!slapSound.canPlayType('audio/mp3')) {
          slapSound = new Audio('/assets/audio/slap.ogg')
          if (!slapSound.canPlayType('audio/ogg')) {
            return
          }
        }

        slapSound.volume = 0.4
        slapSound.loop = false

        slapSound.addEventListener('ended', function () {
          slapSound.pause()
          slapSound.currentTime = 0
        })

        slapHand.removeEventListener('mouseover', loadSound, false)
      }

      slapHand.addEventListener('mouseover', loadSound, false)

      var slapText = doc.querySelector('.js-slapText')
      var activeClass = 'is-active'
      var awesomeClass = 'is-awesome'

      vincent.slaps = 0

      slapHand.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function (e) {
        if (slapSound.currentTime !== 0) {
          slapSound.currentTime = 0
        }

        slapSound.play()

        if (supportTouch) {
          slapHand.classList.add(activeClass)
        }

        vincent.slaps += 1

        if (vincent.slaps === 20) {
          slapSound.volume = 0.8
          slapText.innerHTML = 'You’re awesome!'
          slapHand.classList.add(awesomeClass)
        }

        if (vincent.slaps === 40) {
          slapSound.volume = 0.5
          slapText.innerHTML = 'You’re awesome, let’s give it a rest....'
          slapHand.classList.remove('is-5')
          slapHand.classList.remove('is-10')
        }

        if (vincent.slaps === 60) {
          slapSound.volume = 1
          slapText.innerHTML = 'ARGHH! MY HAAAAND!'
        }

        if (vincent.slaps === 80) {
          slapSound.volume = 0.5
          slapText.innerHTML = '<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer...'
        }

        if (vincent.slaps === 90) {
          slapText.innerHTML = "<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer... :'("
        }

        if (vincent.slaps === 100) {
          slapText.innerHTML = '100 slaps! Let’s do something fun!'
          window.setTimeout(function () {
            window.location.href = 'https://unicef.se/ge-pengar'
          }, 2000)
        }
      }, false)
    },

    track: function (value, category, callback) {
      if (ga && ga.loaded) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': category,
          'eventAction': supportTouch ? 'tap' : 'click',
          'eventValue': value
        })
      }

      if (callback) {
        callback()
      }
    },

    trackLinks: function () {
      if (ga && ga.loaded) {
        var outboundLinks = doc.querySelectorAll('a[href^="http"], a[href^="mailto"]')

        Array.prototype.slice.call(outboundLinks).forEach(function (linkEl) {
          if (linkEl.host.indexOf('vincentorback') > -1) {
            return
          }

          linkEl.addEventListener('click', function (e) {
            if (vincent.slaps > 0) {
              vincent.track(vincent.slaps, 'slaps')
            }

            ga('send', 'event', 'outbound', 'click', linkEl.href, {
              'transport': 'beacon'
            })

            if (e.metaKey || e.ctrlKey) {
              return
            }

            doc.location = e.currentTarget.href

            e.preventDefault()
          }, false)
        })
      }
    }
  }

  window.addEventListener('load', vincent.init, false)
}(window))
