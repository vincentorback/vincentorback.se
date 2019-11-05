/* global LazyLoad, Macy, paper */

(function (window) {
  'use strict'

  var doc = window.document
  var docEl = doc.documentElement
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var saveData = navigator.connection && navigator.connection.saveData === true

  function getViewportWidth () {
    return Math.max(docEl.clientWidth, window.innerWidth || 0)
  }

  function randomBetween (from = 0, to = 1) {
    return Math.floor(Math.random() * to) + from
  }

  function debounce (fn, wait) {
    let timeout
    return function () {
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        fn.apply(this, arguments)
      }, (wait || 1))
    }
  }

  var vincent = {
    init: function () {
      vincent.grid()

      if (saveData !== true) {
        vincent.lazyImages()
      }

      vincent.canvasBlob()

      vincent.splitLetters()

      vincent.touchHover()
    },

    canvasBlob: function () {
      var blobCanvases = doc.querySelectorAll('.js-blobCanvas')
      var blobSvg = doc.querySelector('.js-blobSvg')

      if (!blobCanvases || !blobSvg) {
        return
      }

      var options = {
        intro: {
          rotationSpeed: 0.3,
          stretchSpeed: 1,
          startRotate: randomBetween(0, 359),
          breakpoints: {
            800: {
              x: 3.6,
              y: 0.8,
              scale: 0.7
            },
            1000: {
              x: 2.3,
              y: 0.8,
              scale: 1.1
            },
            1200: {
              x: 1.8,
              y: 0.65,
              scale: 1.3
            },
            1500: {
              x: 1.6,
              y: 0.65,
              scale: 1.3
            },
            2000: {
              x: 1.4,
              y: 0.6,
              scale: 1.4
            },
            30000: {
              x: 1,
              y: 0.8,
              scale: 1.5
            }
          }
        },
        about: {
          rotationSpeed: 0.2,
          stretchSpeed: 0.3,
          startRotate: 120,
          breakpoints: {
            800: {
              x: 1,
              y: 1,
              scale: 0.6
            },
            1600: {
              x: 1,
              y: 1,
              scale: 0.6
            },
            30000: {
              x: 1,
              y: 1,
              scale: 0.8
            }
          }
        },
        foot: {
          rotationSpeed: 0.2,
          stretchSpeed: 0.1,
          startRotate: 40,
          breakpoints: {
            600: {
              x: 0.6,
              y: 2.1,
              scale: 0.7
            },
            900: {
              x: 0.55,
              y: 2,
              scale: 0.8
            },
            1100: {
              x: 0.5,
              y: 2,
              scale: 1
            },
            1600: {
              x: 0.5,
              y: 2.1,
              scale: 1.2
            },
            30000: {
              x: 0.6,
              y: 2,
              scale: 1.3
            }
          }
        }
      }

      var rootStyles = window.getComputedStyle(document.documentElement)
      var colors = [
        rootStyles.getPropertyValue('--color-yellow'),
        rootStyles.getPropertyValue('--color-pink'),
        rootStyles.getPropertyValue('--color-blue')
      ]
      var blendMode = 'multiply'
      var svgHTML = blobSvg.outerHTML
      var viewportWidth = getViewportWidth()
      var scopes = []
      var activeClass = 'is-active'

      function initializeBlob (options, canvas, scope) {
        var currentPosition = Object.keys(options.breakpoints).find(key => viewportWidth < key)
        var paths = []

        scope.setup(canvas)

        scope.project.importSVG(svgHTML, function (item) {
          item.scale(options.breakpoints[currentPosition].scale)
          item.rotate(options.startRotate)

          item.position = new paper.Point({
            x: scope.view.center.x * options.breakpoints[currentPosition].x,
            y: scope.view.center.y * options.breakpoints[currentPosition].y
          })

          item.children.forEach((path, pathIndex) => {
            if (path.closed) {
              // path.fullySelected = true
              path.blendMode = blendMode
              path.fillColor = colors[pathIndex]

              if (prefersReducedMotion === false) {
                path.rotate(30 * pathIndex)
              }

              paths.push(path)
            }
          })
        })

        if (prefersReducedMotion === false) {
          scope.view.onFrame = function (event) {
            paths.forEach(function (path, index) {
              path.rotate(index % 2 === 0
                ? options.rotationSpeed
                : options.rotationSpeed * -1)

              /*
              path.segments.forEach(function (segment, segIndex) {
                var sinus = Math.sin(event.time * 3 + segIndex) // timed number between -1 and 1

                segment.point.y = segment.point.y - (sinus * options.stretchSpeed)
                segment.point.x = segment.point.x + (sinus * options.stretchSpeed)
              })

              path.curves.forEach(function (curve, curveIndex) {
                var sinus = Math.sin(event.time * 3 + curveIndex) // timed number between -1 and 1

                curve.handle1.y = curve.handle1.y - (sinus * options.stretchSpeed)
                curve.handle2.y = curve.handle2.y - (sinus * options.stretchSpeed)
                curve.handle1.x = curve.handle1.x + (sinus * options.stretchSpeed)
                curve.handle2.x = curve.handle2.x + (sinus * options.stretchSpeed)
              })
              */
            })
          }
        }

        canvas.classList.add(activeClass)
      }

      window.addEventListener('resize', debounce(function () {
        var newViewportWidth = getViewportWidth()
        if (viewportWidth !== newViewportWidth) {
          viewportWidth = newViewportWidth
          initializeBlobs()
        }
      }, 300))

      function initializeBlobs () {
        if (scopes.length) {
          scopes.forEach(function (scope) {
            scope.remove()
            scope.clear()
            scope = null
          })
        }

        blobCanvases.forEach(function (canvas, i) {
          ['width', 'height', 'style'].forEach(function (attr) {
            canvas.removeAttribute(attr)
          })

          var paperScope = new paper.PaperScope()
          scopes.push(paperScope)

          var canvasID = canvas.getAttribute('id').replace('blob-', '')

          initializeBlob(options[canvasID], canvas, paperScope)
        })
      }

      initializeBlobs()
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

        window.addEventListener('resize', debounce(function () {
          viewportWidth = getViewportWidth()
          window.setTimeout(function () {
            grid.recalculate(null, true)
          }, 100)
        }, 300))

        grid.on(grid.constants.EVENT_RECALCULATED, debounce(function () {
          var yMargin = grid.options.margin.y

          Object.keys(grid.options.breakAt)
            .sort((a, b) => parseFloat(a) - parseFloat(b))
            .forEach(breakpoint => {
              if (viewportWidth > parseFloat(breakpoint)) {
                yMargin = grid.options.breakAt[breakpoint].margin.y
              }
            })

          gridEl.style.marginBottom = `${yMargin * -1}px`
        }, 600))

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

  if (window.location.hostname !== 'localhost' && 'serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.')
    navigator.serviceWorker.register('/assets/javascript/service-worker.js').then(function () {
      console.log('CLIENT: service worker registration complete.')
    }, function () {
      console.log('CLIENT: service worker registration failure.')
    })
  } else {
    console.log('CLIENT: service worker is not supported.')
  }
}(window))
