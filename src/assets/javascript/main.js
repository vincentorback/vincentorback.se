/* global LazyLoad, Macy */

(function (window) {
  'use strict'

  var doc = window.document
  var docEl = doc.documentElement
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function getViewportWidth () {
    return Math.max(docEl.clientWidth, window.innerWidth || 0)
  }

  var vincent = {
    init: function () {
      vincent.blob()

      vincent.grid()

      vincent.lazyImages()

      vincent.splitLetters()

      vincent.touchHover()
    },

    blob: function () {
      var blob = doc.querySelector('.js-blob')

      if (blob && !prefersReducedMotion && new URLSearchParams(window.location.search).get('animate') === 'true') {
        blob.classList.add('Blob--animate')
      }
    },

    grid: function () {
      var gridEl = doc.querySelector('.js-grid')

      if (gridEl) {
        var viewportWidth = getViewportWidth()
        var breakAt = {
          600: {
            margin: {
              x: '10vw',
              y: 55
            },
            columns: 1
          },
          900: {
            margin: {
              x: '2.5vw',
              y: viewportWidth * 0.025
            },
            columns: 2
          },
          1800: {
            margin: {
              x: '5vw',
              y: viewportWidth * 0.05
            },
            columns: 2
          }
        }

        var grid = Macy({
          container: gridEl,
          trueOrder: true,
          waitForImages: false,
          columns: 3,
          margin: {
            x: '5vw',
            y: viewportWidth * 0.05
          },
          breakAt: breakAt
        })

        window.addEventListener('resize', function () {
          viewportWidth = getViewportWidth()

          window.setTimeout(function () {
            grid.recalculate(null, true)
          }, 100)
        }, false)

        grid.on(grid.constants.EVENT_RECALCULATED, function (ctx) {
          window.setTimeout(function () {
            var yMargin = ctx.instance.options.margin.y

            Object.keys(ctx.instance.options.breakAt)
              .sort((a, b) => parseFloat(a) - parseFloat(b))
              .forEach(breakpoint => {
                if (viewportWidth > parseFloat(breakpoint)) {
                  yMargin = ctx.instance.options.breakAt[breakpoint].margin.y
                }
              })

            gridEl.style.marginBottom = `${yMargin * -1}px`
          }, 600)
        })

        grid.runOnImageLoad(function () {
          grid.recalculate(null, true)
        })
      }
    },

    lazyImages: function () {
      return new LazyLoad({
        elements_selector: 'img[loading=lazy]',
        class_loaded: 'is-loaded',
        use_native: true
      })
    },

    splitLetters: function () {
      Array.from(doc.querySelectorAll('.js-splitLetters'), function (cycleEl) {
        var letters = cycleEl.innerText.split('')
        cycleEl.innerHTML = ''
        letters.forEach(function (letter) {
          cycleEl.innerHTML += `<span>${letter}</span>`
        })
      })
    },

    touchHover: function () {
      doc.querySelectorAll('.js-touchHover').forEach(linkEl => {
        linkEl.setAttribute('onclick', '')
      })
    }
  }

  docEl.classList.remove('no-js')

  if (doc.readyState !== 'loading') {
    vincent.init()
  } else {
    doc.addEventListener('DOMContentLoaded', vincent.init, false)
  }
}(window))
