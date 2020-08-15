/* global IntersectionObserver, LazyLoad, Macy, paper */

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
      vincent.video()

      vincent.grid()

      if (saveData !== true) {
        vincent.lazyLoad()
      }

      vincent.canvasBlob()

      vincent.splitLetters()

      vincent.touchHover()
    },

    video: function () {
      var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio !== 1 && !entry.target.paused) {
            entry.target.pause()
          } else if (entry.target.paused) {
            entry.target.play()
          }
        })
      }, {
        threshold: 1
      })

      Array.from(document.querySelector('video'), function (el) {
        observer.observe(el)
      })
    },

    canvasBlob: function () {
      var blobCanvases = doc.querySelectorAll('.js-blobCanvas')
      var blobSvg = doc.querySelector('.js-blobSvg')

      if (!blobCanvases || !blobSvg) {
        return
      }

      var options = {
        intro: {
          rotationSpeed: 0.4,
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
          rotationSpeed: 0.3,
          stretchSpeed: 0.1,
          startRotate: 120,
          scaleEl: document.querySelector('.js-aboutImage'),
          breakpoints: {
            500: {
              x: 1,
              y: 1,
              scale: 0.35
            },
            700: {
              x: 1,
              y: 1,
              scale: 0.5
            },
            1000: {
              x: 1,
              y: 1,
              scale: 0.35
            },
            1300: {
              x: 1,
              y: 1,
              scale: 0.5
            },
            1400: {
              x: 1,
              y: 1,
              scale: 0.65
            },
            1600: {
              x: 1,
              y: 1,
              scale: 0.75
            },
            2000: {
              x: 1,
              y: 1,
              scale: 0.9
            },
            30000: {
              x: 1,
              y: 1,
              scale: 1.2
            }
          }
        },
        foot: {
          rotationSpeed: 0.3,
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
      var blendMode = 'multiply'
      var svgHTML = blobSvg.outerHTML
      var viewportWidth = getViewportWidth()
      var activeClass = 'is-active'
      var scopes = []
      var colors = [
        rootStyles.getPropertyValue('--color-yellow'),
        rootStyles.getPropertyValue('--color-pink'),
        rootStyles.getPropertyValue('--color-blue')
      ]

      function initializeBlob (options, canvas, scope) {
        var currentPosition = Object.keys(options.breakpoints).find(key => viewportWidth < key)
        var paths = []

        scope.setup(canvas)

        scope.project.importSVG(svgHTML, function (item) {
          if (options.scaleEl) {
            canvas.style.width = `${options.scaleEl.offsetWidth * 1.5}px`
            canvas.style.height = `${options.scaleEl.offsetWidth * 1.5}px`
          }

          item.scale(options.breakpoints[currentPosition].scale)
          item.rotate(options.startRotate)

          item.position = new paper.Point({
            x: scope.view.center.x * options.breakpoints[currentPosition].x,
            y: scope.view.center.y * options.breakpoints[currentPosition].y
          })

          item.children.forEach(function (path, pathIndex) {
            if (path.closed) {
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
          var nPaths = paths.length
          scope.view.onFrame = function (event) {
            if (event.delta > 0.03) return

            for (var i = 0; i < nPaths; i += 1) {
              paths[i].rotate(i % 2 === 0
                ? ((options.rotationSpeed) * (1 + event.delta))
                : ((options.rotationSpeed) * (1 + event.delta)) * -1)
            }
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
          trueOrder: false,
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
            .forEach(function (breakpoint) {
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

    lazyLoad: function () {
      function replaceVideoWithImage (el) {
        var image = el.querySelector('img')

        el.parentNode.appendChild(image)
        el.parentNode.removeChild(el)
      }

      return new LazyLoad({
        elements_selector: '[data-loading=lazy]',
        class_loaded: 'is-loaded',
        use_native: false,
        callback_loaded: function (el, lazy) {
          if (el.play) {
            var startPlayPromise = el.play()

            if (startPlayPromise !== undefined) {
              startPlayPromise
                .catch(function (error) {
                  replaceVideoWithImage(el)

                  if (error.name === 'NotAllowedError') {
                    console.log('autoplay not allowed')
                  } else {
                    console.log('load/playback error')
                  }
                })
            } else {
              replaceVideoWithImage(el)
            }
          }
        },
        callback_error: function (el) {
          console.log('callback_error')
          replaceVideoWithImage(el)
        },
        callback_finish: function () {
          console.log('callback_finish')
        }
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
      doc.querySelectorAll('.js-touchHover').forEach(function (linkEl) {
        linkEl.setAttribute('onclick', '')
      })
    }
  }

  if (doc.readyState !== 'loading') {
    vincent.init()
  } else {
    doc.addEventListener('DOMContentLoaded', vincent.init, false)
  }
}(window))
