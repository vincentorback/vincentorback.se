/* global IntersectionObserver */

import LazyLoad from 'vanilla-lazyload'
import Macy from 'macy'
import { PaperScope, Point } from 'paper'

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection
const saveData =
  connection &&
  (connection.saveData ||
    (connection.effectiveType &&
      ['slow-2g', '2g', '3g'].includes(connection.effectiveType)))

function getViewportWidth () {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
}

function randomBetween (from, to) {
  return Math.floor(Math.random() * to) + from
}

function debounce (fn, wait) {
  let timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      fn.apply(this, arguments)
    }, wait || 1)
  }
}

function getStyleProperty (property, el) {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(property)
}

const vincent = {
  init: function () {
    vincent.grid()

    vincent.lazyLoad()

    vincent.canvasBlob()

    vincent.splitLetters()

    vincent.touchHover()
  },

  canvasBlob: function () {
    const blobCanvases = document.querySelectorAll('.js-blobCanvas')
    const blobSvg = document.querySelector('.js-blobSvg')

    if (!blobCanvases || !blobSvg) {
      return
    }

    const options = {
      intro: {
        rotationSpeed: 0.4,
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
        startRotate: randomBetween(0, 359),
        scaleEl: document.querySelector('.js-aboutImage'),
        breakpoints: {
          340: {
            x: 1,
            y: 1,
            scale: 0.4
          },
          360: {
            x: 1,
            y: 1,
            scale: 0.43
          },
          380: {
            x: 1,
            y: 1,
            scale: 0.435
          },
          450: {
            x: 1,
            y: 1,
            scale: 0.5
          },
          600: {
            x: 1,
            y: 1,
            scale: 0.55
          },
          700: {
            x: 1,
            y: 1,
            scale: 0.425
          },
          800: {
            x: 1,
            y: 1,
            scale: 0.475
          },
          1000: {
            x: 1,
            y: 1,
            scale: 0.55
          },
          1100: {
            x: 1,
            y: 1,
            scale: 0.6
          },
          1200: {
            x: 1,
            y: 1,
            scale: 0.65
          },
          1300: {
            x: 1,
            y: 1,
            scale: 0.75
          },
          1400: {
            x: 1,
            y: 1,
            scale: 0.8
          },
          1600: {
            x: 1,
            y: 1,
            scale: 0.85
          },
          2000: {
            x: 1,
            y: 1,
            scale: 0.9
          },
          30000: {
            x: 1,
            y: 1,
            scale: 0.9
          }
        }
      },
      foot: {
        rotationSpeed: 0.3,
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

    const rootStyles = window.getComputedStyle(document.documentElement)
    const blendMode = 'multiply'
    const svgHTML = blobSvg.outerHTML
    let viewportWidth = getViewportWidth()
    const activeClass = 'is-active'
    const scopes = []
    const colors = [
      rootStyles.getPropertyValue('--color-yellow'),
      rootStyles.getPropertyValue('--color-pink'),
      rootStyles.getPropertyValue('--color-blue')
    ]

    function initializeBlob (options, canvas, scope) {
      const paths = []
      const currentPosition = Object.keys(options.breakpoints).find(function (
        key
      ) {
        return viewportWidth < key
      })

      scope.setup(canvas)

      scope.project.importSVG(svgHTML, function (item) {
        if (options.scaleEl) {
          canvas.style.width = `${options.scaleEl.offsetWidth * 1.25}px`
          canvas.style.height = `${options.scaleEl.offsetWidth * 1.25}px`
          canvas.style.transform = 'translate(-8%, -8%)'
        }

        item.scale(options.breakpoints[currentPosition].scale)
        item.rotate(options.startRotate)

        item.position = new Point({
          x: scope.view.center.x * options.breakpoints[currentPosition].x,
          y: scope.view.center.y * options.breakpoints[currentPosition].y
        })

        item.children.forEach(function (path, pathIndex) {
          if (path.closed) {
            path.blendMode = blendMode
            path.fillColor = colors[pathIndex - 1]
            path.rotate(30 * pathIndex)
            paths.push(path)
          }
        })
      })

      let pauseTimeout
      let pauseAnimation = false
      let pauses = 0

      if (!saveData && !prefersReducedMotion) {
        const nPaths = paths.length

        scope.view.onFrame = function (event) {
          if (pauseAnimation || pauses > 3) return

          if (event.delta > 0.03) {
            pauseAnimation = true

            if (pauseTimeout) clearTimeout(pauseTimeout)
            pauseTimeout = setTimeout(() => {
              pauses += 1
              pauseAnimation = false
            }, 200)
            return
          }

          for (let i = 0; i < nPaths; i += 1) {
            paths[i].rotate(
              i % 2 === 0
                ? options.rotationSpeed * (1 + event.delta)
                : options.rotationSpeed * (1 + event.delta) * -1
            )
          }
        }
      }

      canvas.classList.add(activeClass)
    }

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

        const paperScope = new PaperScope()
        scopes.push(paperScope)

        const canvasID = canvas.getAttribute('id').replace('blob-', '')

        initializeBlob(options[canvasID], canvas, paperScope)
      })
    }

    initializeBlobs()

    window.addEventListener(
      'resize',
      debounce(function () {
        const newViewportWidth = getViewportWidth()

        if (viewportWidth !== newViewportWidth) {
          viewportWidth = newViewportWidth
          initializeBlobs()
        }
      }, 300)
    )
  },

  grid: function () {
    const gridEl = document.querySelector('.js-grid')
    let viewportWidth = 0

    function newMacy (el) {
      let gridGutter = getStyleProperty('--spacing-sm')

      if (gridGutter.includes('vw')) {
        viewportWidth = getViewportWidth()
        gridGutter = (parseInt(gridGutter) / 100) * viewportWidth
      }

      gridGutter = parseFloat(gridGutter)

      const breakAt = {
        600: {
          margin: {
            x: 0,
            y: gridGutter
          },
          columns: 1
        },
        900: {
          margin: {
            x: gridGutter / 2,
            y: gridGutter / 2
          },
          columns: 2
        },
        1800: {
          margin: {
            x: gridGutter,
            y: gridGutter
          },
          columns: 2
        }
      }

      return new Macy({
        container: el,
        trueOrder: false,
        waitForImages: false,
        columns: 2,
        margin: {
          x: gridGutter,
          y: gridGutter
        },
        breakAt: breakAt
      })
    }

    if (gridEl) {
      let grid = newMacy(gridEl)

      window.addEventListener(
        'resize',
        debounce(function () {
          const newViewportWidth = getViewportWidth()

          if (viewportWidth !== newViewportWidth) {
            grid = newMacy(gridEl)
          }
        }, 500)
      )

      grid.on(
        grid.constants.EVENT_RECALCULATED,
        debounce(function () {
          let yMargin = grid.options.margin.y

          Object.keys(grid.options.breakAt)
            .sort(function (a, b) {
              return parseFloat(a) - parseFloat(b)
            })
            .forEach(function (breakpoint) {
              if (viewportWidth > parseFloat(breakpoint)) {
                yMargin = grid.options.breakAt[breakpoint].margin.y
              }
            })

          gridEl.style.marginBottom = `${yMargin * -1}px`
        }, 700)
      )

      grid.runOnImageLoad(function () {
        grid = newMacy(gridEl)
      })

      window.addEventListener('load', function () {
        grid = newMacy(gridEl)
      })
    }
  },

  lazyLoad: function () {
    const manuallyPausedClass = 'is-manuallyPaused'
    const loadedClass = 'is-loaded'
    const lazySelector = '[data-loading="lazy"]'

    function replaceVideoWithImage (el) {
      const image = el.querySelector('picture')

      if (image) {
        if (image.parentNode.childNodes[0]) {
          el.parentNode.appendChild(image.parentNode.childNodes[0])
          el.parentNode.removeChild(el)
        }

        if (image.parentNode) {
          LazyLoad({
            container: image.parentNode,
            elements_selector: lazySelector,
            class_loaded: loadedClass
          })
        }
      }
    }

    function togglePlay (el) {
      if (el.paused === true) {
        el.play()
      } else {
        el.pause()
      }

      el.classList.toggle(manuallyPausedClass, el.paused)
    }

    const videoObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        const shouldPlay = entry.isIntersecting && !entry.target.classList.contains(manuallyPausedClass)

        if (shouldPlay) {
          entry.target.play().then(() => entry.target.play())
        } else if (entry.isIntersecting) {
          entry.target.pause()
        }
      }
    })

    return new LazyLoad({
      elements_selector: lazySelector,
      class_loaded: loadedClass,
      callback_loaded: function (el) {
        if (!prefersReducedMotion && !saveData && el && el.play) {
          const startPlayPromise = el.play()

          if (startPlayPromise !== undefined) {
            el.addEventListener('click', function () {
              togglePlay(el)
            })

            const togglePlayButton =
              el.parentNode.querySelector('.js-togglePlay')
            if (togglePlayButton) {
              togglePlayButton.addEventListener('click', function () {
                togglePlay(el)
              })
            }

            videoObserver.observe(el)

            startPlayPromise.catch(function () {
              replaceVideoWithImage(el)
            })
          } else {
            replaceVideoWithImage(el)
          }
        }
      },
      callback_error: function (el) {
        replaceVideoWithImage(el)
      }
    })
  },

  splitLetters: function () {
    Array.from(document.querySelectorAll('.js-splitLetters')).forEach(function (
      cycleEl
    ) {
      const letters = cycleEl.innerText.split('')
      cycleEl.innerHTML = ''
      letters.forEach(function (letter) {
        cycleEl.innerHTML += `<span>${letter}</span>`
      })
    })
  },

  touchHover: function () {
    document.querySelectorAll('.js-touchHover').forEach(function (linkEl) {
      linkEl.setAttribute('onclick', '')
    })
  }
}

if (document.readyState !== 'loading') {
  vincent.init()
} else {
  document.addEventListener('DOMContentLoaded', vincent.init, false)
}
