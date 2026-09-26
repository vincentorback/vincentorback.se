/* global IntersectionObserver, ResizeObserver, requestAnimationFrame */

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection
const saveData =
  connection &&
  (connection.saveData ||
    (connection.effectiveType &&
      ['slow-2g', '2g', '3g'].includes(connection.effectiveType)))
const isSlowDevice =
  !navigator?.hardwareConcurrency || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)

const vincent = {
  init: function () {
    vincent.masonry()

    vincent.autoplayFallback()

    vincent.splitLetters()

    vincent.footMenu()

    vincent.blobMotion()

    vincent.watchFrameRate()

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
    const el = document.querySelector('.js-footMenu')
    const toggleEl = el && el.querySelector('.js-footMenuToggle')
    const subEls = el ? el.querySelectorAll('.js-footMenuSub') : []

    if (!el || !toggleEl) {
      return
    }

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    let closeTimer

    function setSubOpen (subEl, open) {
      subEl.classList.toggle('is-active', open)

      const button = subEl.querySelector('.Foot-menuSubToggle')

      if (button) {
        button.setAttribute('aria-expanded', open ? 'true' : 'false')
      }
    }

    function setOpen (open) {
      el.classList.toggle('is-active', open)

      toggleEl.setAttribute('aria-expanded', open ? 'true' : 'false')

      if (!open) {
        subEls.forEach(function (subEl) {
          setSubOpen(subEl, false)
        })
      }
    }

    function cancelClose () {
      clearTimeout(closeTimer)
    }

    function scheduleClose () {
      cancelClose()

      closeTimer = setTimeout(function () {
        setOpen(false)
      }, 800)
    }

    toggleEl.addEventListener('click', function (event) {
      if (event.detail > 0 && el.classList.contains('is-active') && el.matches(':hover')) {
        return
      }

      cancelClose()

      setOpen(!el.classList.contains('is-active'))
    })

    subEls.forEach(function (subEl) {
      const button = subEl.querySelector('.Foot-menuSubToggle')

      if (!button) {
        return
      }

      let subTimer

      button.addEventListener('click', function () {
        const open = !subEl.classList.contains('is-active')

        subEls.forEach(function (other) {
          if (other !== subEl) {
            setSubOpen(other, false)
          }
        })

        setSubOpen(subEl, open)
      })

      if (!canHover) {
        return
      }

      subEl.addEventListener('mouseenter', function () {
        clearTimeout(subTimer)

        subEls.forEach(function (other) {
          if (other !== subEl) {
            setSubOpen(other, false)
          }
        })

        setSubOpen(subEl, true)
      })

      subEl.addEventListener('mouseleave', function () {
        clearTimeout(subTimer)

        subTimer = setTimeout(function () {
          setSubOpen(subEl, false)
        }, 800)
      })
    })

    if (canHover) {
      el.addEventListener('mouseenter', function () {
        cancelClose()
        setOpen(true)
      })

      el.addEventListener('mouseleave', scheduleClose)
    }

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !el.classList.contains('is-active')) {
        return
      }

      cancelClose()

      setOpen(false)

      toggleEl.focus()
    })

    document.addEventListener('click', function (event) {
      if (el.contains(event.target)) {
        return
      }

      cancelClose()

      setOpen(false)
    })
  },

  masonry: function () {
    const resizeObserver = new ResizeObserver(function (entries) {
      for (const entry of entries) {
        entry.target.style.gridRow = `span ${Math.round(entry.target.scrollHeight / 4)}`
      }
    })

    document.querySelectorAll('.js-gridItem').forEach(function (el) {
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
        const shouldPlay = entry.isIntersecting &&
          !entry.target.classList.contains(manuallyPausedClass) &&
          !document.documentElement.classList.contains('is-lowFps')

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

  blobMotion: function () {
    const blobs = document.querySelectorAll('.Blob')
    if (!blobs.length || prefersReducedMotion || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const playState = entry.isIntersecting && !document.documentElement.classList.contains('is-lowFps')
          ? 'running'
          : 'paused'
        entry.target.querySelectorAll('svg').forEach(function (svg) {
          svg.style.animationPlayState = playState
        })
      })
    }, { rootMargin: '200px' })

    blobs.forEach(function (blob) {
      observer.observe(blob)
    })
  },

  watchFrameRate: function () {
    if (prefersReducedMotion || saveData || isSlowDevice) return

    const limit = 50
    const sampleMs = 3000
    let frames = 0
    let start = 0
    let last = 0

    function stopMotion () {
      document.documentElement.classList.add('is-lowFps')
      document.querySelectorAll('.js-autoplay').forEach(function (video) {
        video.pause()
        video.classList.add('is-manuallyPaused')
      })
      document.querySelectorAll('.Blob svg').forEach(function (svg) {
        svg.style.animationPlayState = 'paused'
      })
    }

    function tick (now) {
      if (document.hidden) {
        start = 0
        frames = 0
        requestAnimationFrame(tick)
        return
      }

      if (!start) {
        start = now
        last = now
      }

      const gap = now - last
      last = now
      if (gap > 250) {
        start = now
        frames = 0
        requestAnimationFrame(tick)
        return
      }

      frames += 1
      if (now - start < sampleMs) {
        requestAnimationFrame(tick)
        return
      }

      const fps = (frames * 1000) / (now - start)

      if (fps < limit) stopMotion()
    }

    window.setTimeout(function () {
      requestAnimationFrame(tick)
    }, 1000)
  },

  splitLetters: function () {
    Array.from(document.querySelectorAll('.js-splitLetters')).forEach(function (
      cycleEl
    ) {
      const letters = cycleEl.textContent.split('')
      if (letters.length > 0) {
        cycleEl.innerHTML = ''
        letters.forEach(function (letter) {
          cycleEl.innerHTML += `<span>${letter}</span>`
        })
      }
    })
  }
}

if (document.readyState !== 'loading') {
  vincent.init()
} else {
  document.addEventListener('DOMContentLoaded', vincent.init, false)
}
