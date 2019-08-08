/* global LazyLoad, localStorage, Macy */

(function (window) {
  'use strict'

  var doc = window.document
  var docEl = doc.documentElement
  // var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function getViewportWidth () {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  }

  /*
  function getViewportHeight () {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  }
  */

  function randomBetween (from, to, floor = true) {
    var randomNumber = floor
      ? Math.floor(Math.random() * (to - from + 1) + from)
      : Math.random() * (to - from + 1) + from

    return randomNumber
  }

  function stringToElements (string) {
    const div = document.createElement('div')
    div.innerHTML = string

    if (div.childNodes.length > 1) {
      return div.childNodes
    }

    return div.firstChild
  }

  var vincent = {
    init: function () {
      vincent.blob()

      // vincent.foot()

      vincent.grid()

      vincent.lazyImages()

      vincent.splitLetters()

      vincent.tooltip()

      vincent.touchHover()
    },

    blob: function () {
      var blob = doc.querySelector('.js-blob')

      if (blob && new URLSearchParams(window.location.search).get('animate') === 'true') {
        blob.classList.add('Blob--animate')
      }
      /*
      var introBlob = doc.querySelector('.js-introBlob')
      var inview = true
      var offset, height

      else if (!prefersReducedMotion) {
        blob.classList.add('Blob--scroll')

        function onScroll () {
          window.requestAnimationFrame(function () {
            var scrollY = window.pageYOffset

            console.log(inview, offset, height, scrollY)

            if (scrollY > offset + height) {
              if (inview) blob.style.setProperty('--Blob-scroll', 1)
              return
            }
            if (scrollY + getViewportHeight() < offset) {
              if (inview) blob.style.setProperty('--Blob-scroll', 0)
              return
            }
            var ratio = 1 - ((offset + height - scrollY) / (getViewportHeight() + height))
            blob.style.setProperty('--Blob-scroll', ratio.toFixed(3))
          })
        }

        function onResize () {
          var blobBox = introBlob.getBBox()
          height = blobBox.height
          offset = blobBox.y
          var parent = introBlob
          while ((parent = parent.offsetParent)) offset += (parent.offsetTop || parent.getBBox().y)
        }

        onResize()
        onScroll()

        window.addEventListener('scroll', onScroll, false)
        window.addEventListener('resize', onResize, false)
      }
      */

      /*
      var blobs = [
        {
          element: doc.querySelector('.js-blob1'),
          numPoints: 10,
          color: '#ffcf4e',
          centerX: 480,
          centerY: 480,
          minRadius: 300,
          maxRadius: 350,
          minDuration: 2.5,
          maxDuration: 3.3
        },
        {
          element: doc.querySelector('.js-blob2'),
          numPoints: 10,
          color: '#FF00FF',
          centerX: 500,
          centerY: 500,
          minRadius: 280,
          maxRadius: 350,
          minDuration: 3.5,
          maxDuration: 4.5
        },
        {
          element: doc.querySelector('.js-blob3'),
          numPoints: 10,
          color: '#0ebeff',
          centerX: 520,
          centerY: 520,
          minRadius: 300,
          maxRadius: 350,
          minDuration: 4.5,
          maxDuration: 5
        }
      ]

      blobs.forEach(createBlob)

      function createBlob (options) {
        var points = []
        var path = options.element
        var slice = (Math.PI * 2) / options.numPoints
        var startAngle = randomBetween(0, Math.PI * 2, false)

        path.setAttribute('fill', options.color)

        for (var i = 0; i < options.numPoints; i++) {
          var angle = startAngle + i * slice
          var point = {
            x: options.centerX + Math.cos(angle) * options.minRadius,
            y: options.centerY + Math.sin(angle) * options.minRadius
          }

          points.push(point)
        }

        options.points = points

        function update () {
          path.setAttribute('d', cardinal(points, true, 1))
        }

        update()

        blob.appendChild(path)
      }

      function cardinal (data, closed, tension) {
        if (data.length < 1) return 'M0 0'
        if (tension == null) tension = 1

        var size = data.length - (closed ? 0 : 1)
        var path = 'M' + data[0].x + ' ' + data[0].y + ' C'

        for (var i = 0; i < size; i += 1) {
          var p0, p1, p2, p3

          if (closed) {
            p0 = data[(i - 1 + size) % size]
            p1 = data[i]
            p2 = data[(i + 1) % size]
            p3 = data[(i + 2) % size]
          } else {
            p0 = i === 0 ? data[0] : data[i - 1]
            p1 = data[i]
            p2 = data[i + 1]
            p3 = i === size - 1 ? p2 : data[i + 2]
          }

          var x1 = p1.x + (p2.x - p0.x) / 6 * tension
          var y1 = p1.y + (p2.y - p0.y) / 6 * tension

          var x2 = p2.x - (p3.x - p1.x) / 6 * tension
          var y2 = p2.y - (p3.y - p1.y) / 6 * tension

          path += ' ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + p2.x + ' ' + p2.y
        }

        return closed ? path + 'z' : path
      }
      */
    },

    foot: function () {
      var greetingContainer = document.querySelector('.js-greeting')

      if (greetingContainer) {
        /*
        var things = {
          agency: {
            title: 'a digital agency',
            items: [
              'https://www.codeandconspire.com/',
              'https://earthpeople.se/'
            ]
          },
          designer: {
            title: 'a designer',
            items: [
              'https://linaforsgren.com/',
              'http://www.linneacarlson.se/'
            ]
          },
          developer: {
            title: 'some other developer',
            items: [
              'https://william-andersson.se/'
            ]
          },
          music: {
            title: 'a good song',
            items: []
          },
          video: {
            title: 'a music video',
            items: [
              'https://youtu.be/YxVZbMgA3p0',
              'https://youtu.be/gB98kRDUTM4',
              'https://youtu.be/UCwD5f1APTY'
            ]
          },
          film: {
            title: 'a movie suggestion',
            items: [
              'https://www.imdb.com/user/ur25104614/ratings?sort=your_rating'
            ]
          },
          faith: {
            title: 'faith in humanity',
            items: []
          }
        }
        */

        var now = new Date()
        var nowHour = now.getHours()
        var greeting = {}

        if (((nowHour > 18) || (nowHour < 6))) {
          var greetings = [
            {
              url: 'https://youtu.be/Avek46dJWpU'
            }, {
              url: 'https://youtu.be/G5OV1JPqlNQ'
            }, {
              url: 'https://youtu.be/W2PRAjimRWM'
            }, {
              url: 'https://youtu.be/UCwD5f1APTY'
            }, {
              url: 'https://youtu.be/YxVZbMgA3p0'
            }, {
              url: 'https://youtu.be/gB98kRDUTM4'
            }, {
              url: 'https://vimeo.com/286740784'
            }, {
              url: 'https://vimeo.com/174957219'
            }, {
              url: 'https://vimeo.com/265361498'
            }, {
              url: 'https://youtu.be/ORHB9c8e7ok'
            }, {
              url: 'https://youtu.be/xw0sQUdYAns'
            }
          ]

          var viewedItems = localStorage.getItem('greeting') || []
          if (viewedItems && viewedItems.length) {
            viewedItems = JSON.parse(viewedItems)
            greetings = greetings.filter((greeting, index) => {
              return viewedItems.some(item => item === index) === false
            })
          }

          var greetingID = randomBetween(0, greetings.length - 1)
          greeting = greetings[greetingID]

          if (viewedItems) {
            viewedItems.push(greetingID)
          } else {
            viewedItems = [greetingID]
          }

          localStorage.setItem('greeting', JSON.stringify(viewedItems))
        } else {
          greeting.text = `Have a nice ${[
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Weekend',
            'Weekend'
          ][now.getDay()]}!`
        }

        greetingContainer.innerHTML = `<p>
          ${greeting.url
    ? `<a class="ColorLink js-splitLetters" href="${greeting.url}" target="_blank">${greeting.text || 'random thing I like'}</a><svg width="8px" height="7px"><use xlink:href="#up-arrow"></use></svg>`
    : greeting.text
  }
        </p>`

        // TODO: LocalStore generated to give new thing each time?
      }
    },

    grid: function () {
      var gridEl = doc.querySelector('.js-grid')
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
        waitForImages: true,
        columns: 3,
        margin: {
          x: '5vw',
          y: viewportWidth * 0.05
        },
        breakAt: breakAt
      })

      grid.runOnImageLoad(function () {
        grid.recalculate(true, true)
      }, true)

      window.addEventListener('resize', function () {
        viewportWidth = getViewportWidth()

        window.setTimeout(function () {
          grid.recalculate(true)
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
    },

    lazyImages: function () {
      return new LazyLoad({
        elements_selector: 'img[loading=lazy]',
        class_loaded: 'is-loaded',
        use_native: true
      })
    },

    splitLetters: function () {
      Array.from(document.querySelectorAll('.js-splitLetters'), function (cycleEl) {
        var letters = cycleEl.innerText.split('')
        cycleEl.innerHTML = ''
        letters.forEach(function (letter) {
          cycleEl.innerHTML += `<span>${letter}</span>`
        })
      })
    },

    tooltip: function () {
      var tooltips = doc.querySelectorAll('.js-tooltip')

      function isOutOfViewport (elem) {
        var bounding = elem.getBoundingClientRect()
        var out = {}

        out.left = bounding.left < 0
        out.right = bounding.right > getViewportWidth()

        return out
      }

      function setTooltipPosition (tooltipContent) {
        tooltipContent.classList.remove(rightClass, breakClass)

        var isOut = isOutOfViewport(tooltipContent)

        if (isOut.right) {
          tooltipContent.classList.add(rightClass)
        }

        isOut = isOutOfViewport(tooltipContent)

        if (isOut.left) {
          tooltipContent.classList.remove(rightClass)
          tooltipContent.classList.add(breakClass)
        }

        isOut = isOutOfViewport(tooltipContent)

        if (isOut.left || isOut.right) {
          // TODO: Disable tooltip
        }
      }

      if (tooltips) {
        var activeClass = 'is-active'
        var rightClass = 'Tooltip-content--right'
        var breakClass = 'Tooltip-content--break'

        Array.from(tooltips, function (tooltip, index) {
          var tooltipContent = stringToElements(`<span class="Tooltip-content" id="tooltip-${index}" role="tooltip">${tooltip.getAttribute('data-title')}</span>`)

          tooltip.appendChild(tooltipContent)

          tooltip.setAttribute('aria-describedby', `tooltip-${index}`)
          tooltip.setAttribute('tabindex', '0')
          tooltip.setAttribute('role', 'tooltip')
          tooltip.removeAttribute('data-title')

          function showTooltip () {
            tooltipContent.classList.add(activeClass)

            setTooltipPosition(tooltipContent)
          }

          function hideTooltip () {
            tooltipContent.classList.remove(activeClass)
          }

          tooltip.addEventListener('mouseover', showTooltip)
          tooltip.addEventListener('mouseout', hideTooltip)
          tooltip.addEventListener('focus', showTooltip)
          tooltip.addEventListener('blur', hideTooltip)
        })
      }
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
