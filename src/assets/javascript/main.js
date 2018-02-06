/* global Blazy, Audio, gtag */

(function (window) {
  'use strict'

  var doc = window.document

  var vincent = {
    init: function () {
      doc.documentElement.classList.remove('no-js')
      doc.documentElement.classList.add('js')

      vincent.lazyImages()

      vincent.slap()

      vincent.trackLinks()

      vincent.contactLink()
    },

    lazyImages: function () {
      return new Blazy({
        offset: Math.max(doc.documentElement.clientHeight, window.innerHeight || 0),
        selector: '.js-lazy',
        successClass: 'is-loaded',
        loadInvisible: true
      })
    },

    contactLink: function () {
      var linkEl = doc.querySelector('.js-contactLink')
      var targetEl = doc.querySelector('.js-contact')

      if (linkEl && targetEl) {
        linkEl.addEventListener('click', function () {
          window.setTimeout(function () {
            targetEl.focus()
          }, 200)
        }, false)
      }
    },

    slap: function () {
      var slapHand = doc.querySelector('.js-slap')

      if (!slapHand) {
        return
      }

      var slapSound
      var slapText = doc.querySelector('.js-slapText')
      var activeClass = 'is-active'
      var awesomeClass = 'is-awesome'
      vincent.slaps = 0

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

      slapHand.addEventListener('mousedown', function (e) {
        if (slapSound.currentTime !== 0) {
          slapSound.currentTime = 0
        }

        slapSound.play()

        if (Modernizr.touchevents) {
          slapHand.classList.add(activeClass)
        }

        vincent.slaps += 1

        if (vincent.slaps === 20) {
          slapSound.volume = 0.8
          slapText.innerHTML = 'You’re awesome!'
          slapHand.classList.add(awesomeClass)
        }

        if (vincent.slaps === 40) {
          slapSound.volume = 1
          slapText.innerHTML = 'ARGHH! MY HAAAAND!'
        }

        if (vincent.slaps === 60) {
          slapSound.volume = 0.5
          slapText.innerHTML = '<s>ARGHH! MY HAAAAND!</s> Just kidding, I’m just a computer...'
        }

        if (vincent.slaps === 80) {
          slapText.innerHTML += " :'("
        }

        if (vincent.slaps === 100) {
          slapText.innerHTML = '100 slaps! Let’s do something fun!'
          window.setTimeout(function () {
            window.location.href = 'https://unicef.se/ge-pengar'
          }, 1000)
        }
      }, false)
    },

    track: function (value, category, callback) {
      if (ga && ga.loaded) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': category,
          'eventAction': Modernizr.touchevents ? 'tap' : 'click',
          'eventValue': value
        })
      }

      if (callback) {
        callback()
      }
    },

    trackLinks: function () {
      var outboundLinks = doc.querySelectorAll('a[href^="http"], a[href^="mailto"]')

      Array.from(outboundLinks, function (linkEl) {
        if (linkEl.host.indexOf('vincentorback') > -1) {
          return
        }

        linkEl.addEventListener('click', function (e) {
          if (ga && ga.loaded) {
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
          }
        }, false)
      })
    }
  }

  window.addEventListener('load', vincent.init, false)
}(window))
