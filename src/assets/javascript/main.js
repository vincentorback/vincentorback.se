/* global IntersectionObserver */

import Colcade from 'colcade'
// import { PaperScope, Point } from 'paper'

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection
const saveData =
  connection &&
  (connection.saveData ||
    (connection.effectiveType &&
      ['slow-2g', '2g', '3g'].includes(connection.effectiveType)))

// const isIOS = /iPad|iPhone|iPod/.test(navigator?.platform) || (navigator?.platform === 'MacIntel' && navigator?.maxTouchPoints > 1)

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

const vincent = {
  init: function () {
    vincent.grid()

    vincent.autoplayFallback()

    vincent.blobs()

    vincent.splitLetters()

    vincent.touchHover()

    const baseStyles = [
      'font-family: papyrus',
      'font-size: clamp(1rem, 2vw, 2rem)',
      'color: #111'
    ].join(';')

    console.info(
      '%chttps://github.com/vincentorback/vincentorback.se',
      baseStyles
    )
  },

  blobs: function () {
    const blobs = document.querySelectorAll('.js-blob')

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
            scale: 1.3
          },
          30000: {
            x: 1.4,
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

    const windowWidth = window.innerWidth

    // console.log({ blobs, options, currentPosition })

    blobs.forEach(blobEl => {
      // const svgEl = blobEl.querySelector('svg')
      const currentPosition = Object.keys(options[blobEl.id].breakpoints).find(function (
        key
      ) {
        return windowWidth < key
      })
      const blobOptions = options[blobEl.id].breakpoints[currentPosition]

      blobEl.style.transform = `translate(${(blobOptions.x - 1) * 100}%, ${(blobOptions.y - 1) * 100}%) scale(${blobOptions.scale})`
    })
  },

  // canvasBlob: function () {
  //   const blobCanvases = document.querySelectorAll('.js-blobCanvas')
  //   const blobSvg = document.querySelector('.js-blobSvg')

  //   if (!blobCanvases || !blobSvg) {
  //     return
  //   }

  //   const options = {
  //     intro: {
  //       rotationSpeed: 0.4,
  //       startRotate: randomBetween(0, 359),
  //       breakpoints: {
  //         800: {
  //           x: 3.6,
  //           y: 0.8,
  //           scale: 0.7
  //         },
  //         1000: {
  //           x: 2.3,
  //           y: 0.8,
  //           scale: 1.1
  //         },
  //         1200: {
  //           x: 1.8,
  //           y: 0.65,
  //           scale: 1.3
  //         },
  //         1500: {
  //           x: 1.6,
  //           y: 0.65,
  //           scale: 1.3
  //         },
  //         2000: {
  //           x: 1.4,
  //           y: 0.6,
  //           scale: 1.3
  //         },
  //         30000: {
  //           x: 1.4,
  //           y: 0.8,
  //           scale: 1.5
  //         }
  //       }
  //     },
  //     about: {
  //       rotationSpeed: 0.2,
  //       startRotate: randomBetween(0, 359),
  //       scaleEl: document.querySelector('.js-aboutImage'),
  //       breakpoints: {
  //         340: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.4
  //         },
  //         360: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.43
  //         },
  //         380: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.435
  //         },
  //         450: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.5
  //         },
  //         600: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.55
  //         },
  //         700: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.425
  //         },
  //         800: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.475
  //         },
  //         1000: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.55
  //         },
  //         1100: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.6
  //         },
  //         1200: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.65
  //         },
  //         1300: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.75
  //         },
  //         1400: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.8
  //         },
  //         1600: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.85
  //         },
  //         2000: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.9
  //         },
  //         30000: {
  //           x: 1,
  //           y: 1,
  //           scale: 0.9
  //         }
  //       }
  //     },
  //     foot: {
  //       rotationSpeed: 0.3,
  //       startRotate: 40,
  //       breakpoints: {
  //         600: {
  //           x: 0.6,
  //           y: 2.1,
  //           scale: 0.7
  //         },
  //         900: {
  //           x: 0.55,
  //           y: 2,
  //           scale: 0.8
  //         },
  //         1100: {
  //           x: 0.5,
  //           y: 2,
  //           scale: 1
  //         },
  //         1600: {
  //           x: 0.5,
  //           y: 2.1,
  //           scale: 1.2
  //         },
  //         30000: {
  //           x: 0.6,
  //           y: 2,
  //           scale: 1.3
  //         }
  //       }
  //     }
  //   }

  //   const rootStyles = window.getComputedStyle(document.documentElement)
  //   const blendMode = 'multiply'
  //   const svgHTML = blobSvg.outerHTML
  //   let viewportWidth = getViewportWidth()
  //   const scopes = []
  //   const colors = [
  //     rootStyles.getPropertyValue('--color-yellow'),
  //     rootStyles.getPropertyValue('--color-pink'),
  //     rootStyles.getPropertyValue('--color-blue')
  //   ]

  //   function initializeBlob (options, canvas, scope) {
  //     const paths = []

  //     const currentPosition = Object.keys(options.breakpoints).find(function (
  //       key
  //     ) {
  //       return viewportWidth < key
  //     })

  //     scope.setup(canvas)

  //     scope.project.importSVG(svgHTML, function (item) {
  //       if (options.scaleEl) {
  //         canvas.style.width = `${options.scaleEl.offsetWidth * 1.25}px`
  //         canvas.style.height = `${options.scaleEl.offsetWidth * 1.25}px`
  //         canvas.style.transform = 'translate(-8%, -8%)'
  //       }

  //       item.scale(options.breakpoints[currentPosition].scale)
  //       item.rotate(options.startRotate)

  //       item.position = new Point({
  //         x: scope.view.center.x * options.breakpoints[currentPosition].x,
  //         y: scope.view.center.y * options.breakpoints[currentPosition].y
  //       })

  //       item.children.forEach(function (path, pathIndex) {
  //         if (path.closed) {
  //           path.fillColor = colors[pathIndex - 1]
  //           path.blendMode = blendMode
  //           path.rotate(30 * pathIndex)
  //           paths.push(path)
  //         }
  //       })
  //     })

  //     let pauseTimeout
  //     let pauseAnimation = false
  //     let pauses = 0

  //     if (!saveData && !prefersReducedMotion && isIOS) {
  //       scope.view.onFrame = function (event) {
  //         if (pauseAnimation || pauses > 10) return

  //         if (event.delta > 0.03) {
  //           pauseAnimation = true

  //           if (pauseTimeout) clearTimeout(pauseTimeout)
  //           pauseTimeout = setTimeout(function () {
  //             pauses += 1
  //             pauseAnimation = false
  //           }, 200)
  //           return
  //         }

  //         for (let i = 0; i < paths.length; i += 1) {
  //           paths[i].rotate(
  //             i % 2 === 0
  //               ? options.rotationSpeed * (1 + event.delta)
  //               : options.rotationSpeed * (1 + event.delta) * -1
  //           )
  //         }
  //       }
  //     }
  //   }

  //   function initializeBlobs () {
  //     if (scopes.length) {
  //       scopes.forEach(function (scope) {
  //         scope.remove()
  //         scope.clear()
  //         scope = null
  //       })
  //     }

  //     blobCanvases.forEach(function (canvas, i) {
  //       ['width', 'height', 'style'].forEach(function (attr) {
  //         canvas.removeAttribute(attr)
  //       })

  //       const paperScope = new PaperScope()
  //       scopes.push(paperScope)

  //       const canvasID = canvas.getAttribute('id').replace('blob-', '')

  //       initializeBlob(options[canvasID], canvas, paperScope)
  //     })

  //     document.documentElement.classList.add('has-blobs')
  //   }

  //   initializeBlobs()

  //   window.addEventListener(
  //     'resize',
  //     debounce(function () {
  //       const newViewportWidth = getViewportWidth()

  //       if (viewportWidth !== newViewportWidth) {
  //         viewportWidth = newViewportWidth
  //         initializeBlobs()
  //       }
  //     }, 300)
  //   )
  // },

  grid: function () {
    let colcade

    function setupGrid () {
      const viewportWidth = getViewportWidth()

      if (viewportWidth < 600) {
        if (colcade?.destroy) {
          colcade.destroy()
        }
      } else {
        colcade = new Colcade('.js-grid', {
          columns: '.js-gridColumn',
          items: '.js-gridItem'
        })
      }
    }

    window.addEventListener('resize', debounce(setupGrid, 500))

    setupGrid()
  },

  autoplayFallback: function () {
    const videos = Array.from(document.querySelectorAll('.js-autoplay'))
    const manuallyPausedClass = 'is-manuallyPaused'

    function replaceVideoWithImage (el) {
      const image = el.querySelector('picture') ?? el.querySelector('img')

      if (image) {
        if (image.parentNode.childNodes[0]) {
          el.parentNode.appendChild(image.parentNode.childNodes[0])
          el.parentNode.removeChild(el)
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

    const videoObserver = new IntersectionObserver(function (entries) {
      for (const entry of entries) {
        const shouldPlay = entry.isIntersecting && !entry.target.classList.contains(manuallyPausedClass)

        if (shouldPlay) {
          entry.target.play()
            .then(function () {
              if (entry.isIntersecting && (!entry.target.classList.contains(manuallyPausedClass) && entry.target.paused)) {
                const startPlayPromise = entry.target.play()

                if (startPlayPromise === undefined) {
                  videoObserver.unobserve(entry.target)
                  replaceVideoWithImage(entry.target)
                } else {
                  startPlayPromise.catch(function () {
                    videoObserver.unobserve(entry.target)
                    replaceVideoWithImage(entry.target)
                  })
                }
              }
            })
            .catch(function (err) {
              replaceVideoWithImage(entry.target)
              console.log(err)
            })
        } else {
          entry.target.pause()
        }
      }
    })

    videos.forEach(function (videoEl) {
      if (saveData || prefersReducedMotion) {
        replaceVideoWithImage(videoEl)

        return
      }

      videoEl.addEventListener('click', function () {
        togglePlay(videoEl)
      })

      const togglePlayButton =
          videoEl.parentNode.querySelector('.js-togglePlay')
      if (togglePlayButton) {
        togglePlayButton.addEventListener('click', function () {
          togglePlay(videoEl)
        })
      }

      videoObserver.observe(videoEl)

      videoEl.classList.add('is-active')
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
