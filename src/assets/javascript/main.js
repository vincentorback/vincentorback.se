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
      }, false)
    },

    trackLinks: function () {
      var outboundLinks = doc.querySelectorAll('a[href^="http"], a[href^="mailto"]')

      Array.from(outboundLinks, function (linkEl) {
        if (linkEl.host.indexOf('vincentorback') > -1) {
          return
        }

        linkEl.addEventListener('click', function (e) {
          if (gtag) {
            gtag('event', 'click', {
              'event_category': 'outbound',
              'event_label': e.currentTarget.href,
              'transport_type': 'beacon',
              'event_callback': function () {
                doc.location = e.currentTarget.href
              }
            })

            if (e.metaKey || e.ctrlKey) {
              return
            }

            e.preventDefault()
          }
        }, false)
      })
    }
  }

  window.addEventListener('load', vincent.init, false)
}(window))
