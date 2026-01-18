/* global IntersectionObserver, ResizeObserver, Path2D, requestAnimationFrame, cancelAnimationFrame */

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
const prefersSlowUpdate =
  window.matchMedia('(update: slow)').matches === true
const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection
const saveData =
  connection &&
  (connection.saveData ||
    (connection.effectiveType &&
      ['slow-2g', '2g', '3g'].includes(connection.effectiveType)))
const isSlowDevice =
  !navigator?.hardwareConcurrency || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)

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
    vincent.masonry()

    vincent.autoplayFallback()

    vincent.canvasBlobs()

    vincent.splitLetters()

    vincent.touchHover()

    vincent.footMenu()

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

  footMenu: function () {
    const isTouch = window.matchMedia('(hover: none)').matches

    if (isTouch) {
      const el = document.querySelector('.js-footMenu')
      const toggleEl = el.querySelector('.js-footMenuToggle')
      const subEls = el.querySelectorAll('.js-footMenuSub')

      toggleEl.addEventListener('click', function () {
        el.classList.toggle('is-active')
      })

      subEls.forEach(function (subEl) {
        subEl.addEventListener('click', function () {
          subEl.classList.toggle('is-active')
        })
      })
    }
  },

  blobs: function () {
    const blobs = document.querySelectorAll('.js-blob')

    const options = {
      intro: {
        rotationSpeed: 0.4,
        startRotate: randomBetween(0, 359),
        breakpoints: {
          800: {
            x: -0.33,
            y: -0.5,
            scale: 0.7
          },
          1000: {
            x: 0.1,
            y: -0.25,
            scale: 1.1
          },
          1200: {
            x: 0.65,
            y: 0,
            scale: 1.3
          },
          1600: {
            x: 0.65,
            y: 0,
            scale: 1.3
          },
          30000: {
            x: 0.2,
            y: 0,
            scale: 1.5
          }
        }
      },
      about: {
        rotationSpeed: 0.2,
        startRotate: randomBetween(0, 359),
        scaleEl: document.querySelector('.js-aboutImage'),
        breakpoints: {
          30000: {
            x: 0,
            y: 0,
            scale: 1
          }
        }
      },
      foot: {
        rotationSpeed: 0.3,
        startRotate: 40,
        breakpoints: {
          700: {
            x: -0.9,
            y: -0.2,
            scale: 0.7
          },
          900: {
            x: -0.85,
            y: 0,
            scale: 1
          },
          1500: {
            x: -0.4,
            y: 0.3,
            scale: 1
          },
          30000: {
            x: -0.25,
            y: 0.4,
            scale: 1.1
          }
        }
      }
    }

    function setupBlobs () {
      const windowWidth = window.innerWidth

      blobs.forEach(blobEl => {
        // const svgEl = blobEl.querySelector('svg')
        const currentPosition = Object.keys(options[blobEl.id].breakpoints).find(function (
          key
        ) {
          return windowWidth < key
        })
        const blobOptions = options[blobEl.id].breakpoints[currentPosition]

        blobEl.style.transform = `translate(${(blobOptions.x) * 100}%, ${(blobOptions.y) * 100}%) scale(${blobOptions.scale})`
      })
    }

    window.addEventListener(
      'resize',
      debounce(setupBlobs, 300)
    )

    setupBlobs()

    document.documentElement.classList.add('has-blobs')
  },

  canvasBlobs: function () {
    const blobElements = document.querySelectorAll('.js-blob')

    if (blobElements.length === 0) {
      return
    }

    const blobPaths = [
      'M137.0168640359351 451.5099596874178 C 141.50092825204416 384.5333952632676 173.60547469547416 305.5680616510025 217.45795493856804 253.79209740361907 261.31043518166194 202.01613315623567 334.1104107107185 156.25141624123134 400.13174549449843 140.85417420311734 466.15308027827837 125.45693216500335 556.3725614306879 131.52642482322796 613.5859636412476 161.40864517493512 670.7993658518074 191.29086552664228 707.9120203720227 262.2507072260167 743.4121587578564 320.1474963133603 778.9122971436902 378.0442854007039 830.602724896978 447.78118114287025 826.5867939562502 508.7893796989969 822.5708630155224 569.11975782551237 763.772609582421 634.4831253265735 719.11165731134895 686.1966876501205 674.8605366445581 737.9102499736674 621.4249928646373 801.7120330472925 559.11505751426616 819.0707536402787 498.2761574206858 836.4294742332648 411.4195676984264 817.5855561566641 349.11700667816351 790.3490112080377 288.3205658648438 763.1124662594113 226.02910343286374 712.124659201957 190.55356964191373 655.6514839485203 155.07803585096372 599.1783086950836 132.53279981982604 518.586524111568 137.0168640359351 451.5099596874178z',
      'M184.54846383868716 379.117280520621624 C 211.1360963770935 321.20595941963114 274.88710587224136 277.7464293090693 330.4388607385304 239.112938366592468 385.9906156048195 201.51233802278003 454.27237924982506 151.014347098288 517.8589930364217 150.67053134734834 581.4456068230182 150.3267155964087 658.9052014431317 194.4349980701712 711.9585434581101 237.56648916028672 765.0118854730885 280.6979802504022 817.8171540114874 345.1903983845769 836.1790451262918 409.11594778880415 854.5409362410962 473.72855739150606 846.4268241174052 559.11632251762292 822.1298901469362 623.1809661810742 797.8329561764672 686.9987071859191 746.6634945294859 762.4744338258827 690.397441303478 792.365923917111 634.1313880774701 822.2574140083393 550.5516405407459 808.8078650627095 484.53357079088914 802.5299067284442 418.5155010410324 796.2519483941788 346.559107018137 790.3480819686869 294.28902280433755 754.6981739115188 242.01893859053808 719.0482658543507 189.110315866903405 651.1846865029859 170.91306550809233 588.6304583854354 152.6229723471506 526.076230267885 157.9608313002808 437.53965099280134 184.54846383868716 379.117280520621624z',
      'M709.11413372804688 278.65569447089877 C 763.5645950951755 320.2532214231326 832.9021307322098 364.40771005270614 856.0295908919982 424.74790864552045 879.1570510517865 485.08810723833477 872.0492921540344 576.3785093949439 848.5060982391993 640.6968860277847 824.9629043243642 705.0152626606255 771.7127760518933 773.0470080699467 714.7704274029877 810.6581684425654 657.8280787540821 848.269328815184 574.7126391530561 869.11807274219626 506.8520063457656 866.3638482634963 438.9913735384751 862.9469691050299 355.0801740009535 833.8060268535477 307.70663055924476 790.156893491767 260.13308711753604 746.5077601299864 240.9857115654451 669.11727734130367 222.01074569551332 604.4690480928126 203.03577982558156 539.11653227725885 176.18338644737506 462.1031248123913 193.75683533965412 400.1345415704225 211.33028423193318 338.26595832845377 270.89590427183714 270.15284774738427 327.45143904918774 232.65754864100012 384.00697382653834 195.16224953461597 469.11750609652109 167.49638929380112 533.0900440037577 175.16274693211756 596.8050270423046 182.829104570434 655.918079465762 237.05816751866496 709.11413372804688 278.65569447089877z'
    ]

    const blobColors = ['#ffcf4e', '#f0f', '#0ebeff']

    const pathAnimations = [
      { delay: 0, direction: 1, duration: 40000 },
      { delay: -20000, direction: -1, duration: 40000 },
      { delay: -10000, direction: 1, duration: 40000 }
    ]

    const options = {
      intro: {
        breakpoints: {
          800: {
            x: -0.33,
            y: -0.5,
            scale: 0.7
          },
          1000: {
            x: 0.1,
            y: -0.25,
            scale: 1.1
          },
          1200: {
            x: 0.65,
            y: 0,
            scale: 1.3
          },
          1600: {
            x: 0.65,
            y: 0,
            scale: 1.3
          },
          30000: {
            x: 0.2,
            y: 0,
            scale: 1.5
          }
        }
      },
      about: {
        breakpoints: {
          30000: {
            x: 0,
            y: 0,
            scale: 1
          }
        }
      },
      foot: {
        breakpoints: {
          700: {
            x: -0.9,
            y: -0.2,
            scale: 0.7
          },
          900: {
            x: -0.85,
            y: 0,
            scale: 1
          },
          1500: {
            x: -0.4,
            y: 0.3,
            scale: 1
          },
          30000: {
            x: -0.25,
            y: 0.4,
            scale: 1.1
          }
        }
      }
    }

    function parsePath (pathString) {
      try {
        return new Path2D(pathString)
      } catch (e) {
        console.error('Error parsing path:', e)
        return null
      }
    }

    function setupCanvasBlob (blobEl) {
      const existingCanvas = blobEl.querySelector('canvas')
      if (existingCanvas) {
        if (existingCanvas._cleanup) {
          existingCanvas._cleanup()
        }
        existingCanvas.remove()
      }

      const canvas = document.createElement('canvas')
      canvas.className = 'Blob-canvas'
      canvas.setAttribute('aria-hidden', 'true')
      blobEl.appendChild(canvas)

      const baseSize = 1000
      const dpr = window.devicePixelRatio || 1

      const size = isSlowDevice ? baseSize * 0.75 : baseSize
      const centerX = size * 0.49
      const centerY = size * 0.49

      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = size + 'px'
      canvas.style.height = size + 'px'

      const ctx = canvas.getContext('2d', {
        willReadFrequently: false,
        alpha: true,
        desynchronized: true
      })

      if (!ctx) {
        console.error('Could not get canvas context for', blobEl.id)
        return
      }

      ctx.scale(dpr, dpr)

      ctx.imageSmoothingEnabled = !isSlowDevice
      if (!isSlowDevice) {
        ctx.imageSmoothingQuality = 'high'
      }

      const paths = blobPaths.map(parsePath).filter(function (path) {
        return path !== null
      })

      if (paths.length === 0) {
        return
      }

      const startTime = performance.now()

      const randomStartRotations = paths.map(function () {
        return randomBetween(0, 360)
      })

      let animationId = null
      let lastFrameTime = 0
      let frameCount = 0
      let lastFPSUpdate = startTime
      let currentFPS = 60
      let lowFPSFrames = 0
      const targetFPS = isSlowDevice ? 30 : 60
      const frameInterval = 1000 / targetFPS
      const minFPS = 15
      const maxLowFPSFrames = 30
      const PI_180 = Math.PI / 180
      let isAnimating = true
      let isTabVisible = true
      let isBlobVisible = true

      function handleVisibilityChange () {
        isTabVisible = !document.hidden
        if (!isTabVisible && animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        } else if (isTabVisible && isBlobVisible && isAnimating && !prefersReducedMotion) {
          draw(performance.now())
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      isBlobVisible = true

      const blobObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const wasVisible = isBlobVisible
          isBlobVisible = entry.isIntersecting

          if (!isBlobVisible && animationId) {
            cancelAnimationFrame(animationId)
            animationId = null
          } else if (isBlobVisible && !wasVisible && isTabVisible && isAnimating && !prefersReducedMotion && !prefersSlowUpdate) {
            lastFrameTime = 0
            draw(performance.now())
          }
        })
      }, {
        threshold: 0
      })

      const canvasEl = blobEl.querySelector('canvas')
      if (canvasEl) {
        blobObserver.observe(canvasEl)
      } else {
        blobObserver.observe(blobEl)
      }

      function draw (currentTime) {
        if (!isAnimating || !isTabVisible || !isBlobVisible) {
          return
        }

        const elapsed = currentTime - lastFrameTime
        if (elapsed < frameInterval) {
          animationId = requestAnimationFrame(draw)
          return
        }
        lastFrameTime = currentTime

        frameCount++
        if (currentTime - lastFPSUpdate > 1000) {
          currentFPS = frameCount
          frameCount = 0
          lastFPSUpdate = currentTime

          if (currentFPS < minFPS) {
            lowFPSFrames++
            if (lowFPSFrames >= maxLowFPSFrames) {
              console.log('Performance too low, stopping blob animation. FPS:', currentFPS)
              isAnimating = false
              drawStatic()
              return
            }
          } else {
            lowFPSFrames = 0
          }
        }

        ctx.clearRect(0, 0, size, size)

        ctx.globalCompositeOperation = 'multiply'

        const rotations = paths.map(function (path, index) {
          if (!path) return null
          const anim = pathAnimations[index]

          let elapsed = (currentTime - startTime + anim.delay) % anim.duration

          if (elapsed < 0) {
            elapsed = anim.duration + elapsed
          }

          const calculatedRotation = (elapsed / anim.duration) * 360 * anim.direction
          const totalRotation = (calculatedRotation + randomStartRotations[index]) * PI_180
          return totalRotation
        })

        paths.forEach(function (path, index) {
          if (!path || rotations[index] === null) return

          ctx.save()
          ctx.translate(centerX, centerY)
          ctx.rotate(rotations[index])
          ctx.translate(-centerX, -centerY)

          ctx.fillStyle = blobColors[index]
          ctx.fill(path)

          ctx.restore()
        })

        if (!prefersReducedMotion && isAnimating && isTabVisible && isBlobVisible) {
          animationId = requestAnimationFrame(draw)
        }
      }

      function drawStatic () {
        ctx.clearRect(0, 0, size, size)

        ctx.globalCompositeOperation = 'multiply'

        paths.forEach(function (path, index) {
          if (!path) return

          ctx.fillStyle = blobColors[index]
          ctx.fill(path)
        })
      }

      if (!prefersReducedMotion && !prefersSlowUpdate) {
        requestAnimationFrame(function () {
          if (isTabVisible && isBlobVisible && isAnimating) {
            draw(performance.now())
          } else if (!isBlobVisible) {
            drawStatic()
          }
        })
      } else {
        drawStatic()
      }

      canvas._cleanup = function () {
        if (animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        }
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        blobObserver.disconnect()
      }
    }

    function setupAllBlobs () {
      const windowWidth = window.innerWidth

      blobElements.forEach(function (blobEl) {
        if (!blobEl.id || !options[blobEl.id]) {
          setupCanvasBlob(blobEl)
          return
        }

        const breakpointKeys = Object.keys(options[blobEl.id].breakpoints).map(Number).sort(function (a, b) {
          return a - b
        })

        const currentPosition = breakpointKeys.find(function (key) {
          return windowWidth < key
        }) || breakpointKeys[breakpointKeys.length - 1]

        if (!currentPosition) {
          setupCanvasBlob(blobEl)
          return
        }

        const blobOptions = options[blobEl.id].breakpoints[currentPosition]

        if (blobOptions) {
          blobEl.style.transform = `translate(${(blobOptions.x) * 100}%, ${(blobOptions.y) * 100}%) scale(${blobOptions.scale})`
        }

        setupCanvasBlob(blobEl)
      })
    }

    let viewportWidth = getViewportWidth()

    function maybeResizeBlobs () {
      const newViewportWidth = getViewportWidth()

      if (Math.abs(newViewportWidth - viewportWidth) < 50) {
        return
      }

      viewportWidth = newViewportWidth

      setupAllBlobs()
    }

    window.addEventListener('resize', debounce(maybeResizeBlobs, 300))

    setupAllBlobs()

    document.documentElement.classList.add('has-blobs')
  },

  masonry: function () {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        entry.target.style.gridRow = `span ${Math.round(entry.target.scrollHeight / 4)}`
      }
    })

    document.querySelectorAll('.js-gridItem').forEach((el) => {
      resizeObserver.observe(el)
    })
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
      if (saveData || prefersReducedMotion || isSlowDevice) {
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
