/* global Macy, LazyLoad */

(function (window) {
  'use strict'

  var doc = window.document
  var docEl = doc.documentElement
  // var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function getViewportWidth () {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  }

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
      vincent.grid()

      vincent.lazyImages()

      vincent.blob()

      vincent.foot()

      vincent.splitLetters()

      vincent.tooltip()
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
        var rightClass = 'Tooltip-content--right'
        var breakClass = 'Tooltip-content--break'

        Array.from(tooltips, function (tooltip, index) {
          var tooltipContent = stringToElements(`<span class="Tooltip-content" id="tooltip-${index}" role="tooltip" hidden>${tooltip.getAttribute('data-title')}</span>`)

          tooltip.appendChild(tooltipContent)

          tooltip.setAttribute('aria-describedby', `tooltip-${index}`)
          tooltip.setAttribute('tabindex', '0')
          tooltip.setAttribute('role', 'tooltip')
          tooltip.removeAttribute('data-title')

          function showTooltip () {
            tooltipContent.hidden = false

            setTooltipPosition(tooltipContent)
          }

          function hideTooltip () {
            tooltipContent.hidden = true
          }

          tooltip.addEventListener('mouseover', showTooltip)
          tooltip.addEventListener('mouseout', hideTooltip)
          tooltip.addEventListener('focus', showTooltip)
          tooltip.addEventListener('blur', hideTooltip)
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

    grid: function () {
      var gridEl = doc.querySelector('.js-grid')

      if (!gridEl) {
        return
      }

      var viewportWidth = getViewportWidth()
      var breakAt = {
        1800: {
          margin: {
            x: '5vw',
            y: viewportWidth * 0.05
          },
          columns: 2
        },
        900: {
          margin: {
            x: '2.5vw',
            y: viewportWidth * 0.025
          },
          columns: 2
        },
        600: {
          margin: {
            x: '10vw',
            y: 55
          },
          columns: 1
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
        grid.recalculate(true)
      }, true)

      window.addEventListener('resize', function () {
        viewportWidth = getViewportWidth()

        grid.recalculate(true)
      }, false)
    },

    foot: function () {
      var greetingContainer = document.querySelector('.js-greeting')

      if (greetingContainer) {
        /*
        var things = {
          agency: {
            title: 'a digital agency',
            items: [
              'https://www.codeandconspire.com/'
            ]
          },
          designer: {
            title: 'a designer',
            items: []
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
            items: []
          },
          faith: {
            title: 'faith in humanity',
            items: []
          }
        }
        */

        var now = new Date()
        var nowHour = now.getHours()
        var niceDayGreeting = `Have a nice ${[
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Weekend',
          'Weekend'
        ][now.getDay()]}!`

        var greetings = [
          {
            text: 'random link to thing I like &rarr;', // 'eyes like lotus leaves, no not even like',
            url: 'https://youtu.be/Avek46dJWpU'
          }, {
            text: 'random link to thing I like &rarr;', // 'monastery monochrome <br>boom balloon machine and oh',
            url: 'https://youtu.be/G5OV1JPqlNQ'
          }, {
            text: 'random link to thing I like &rarr;', // 'c’est comme si on s’aimait',
            url: 'https://youtu.be/W2PRAjimRWM'
          },
          {
            url: 'https://youtu.be/YxVZbMgA3p0'
          },
          {
            url: 'https://youtu.be/gB98kRDUTM4'
          },
          {
            url: 'https://vimeo.com/286740784'
          },
          {
            url: 'https://vimeo.com/174957219'
          },
          {
            url: 'https://vimeo.com/265361498'
          },
          {
            url: 'https://youtu.be/ORHB9c8e7ok'
          },
          {
            url: 'https://youtu.be/xw0sQUdYAns'
          }
          /*
          {
            text: 'It doesn’t matter, does it?',
            url: 'https://youtu.be/UCwD5f1APTY'
          }
          */
        ]

        var greeting = ((nowHour < 16) && (nowHour > 6)) ? {
          text: niceDayGreeting
        } : greetings[randomBetween(0, greetings.length - 1)]

        greetingContainer.innerHTML = `<p>
          ${greeting.url ? `<a class="ColorLink js-splitLetters" href="${greeting.url}" target="_blank">${greeting.text || 'random link to thing I like &rarr;'}</a>` : greeting.text}
        </p>`

        // TODO: LocalStore generated to give new thing each time?
      }
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

    blob: function () {
      var blob = doc.querySelector('.js-blob')

      if (!blob) return

      if (
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency > 8) ||
        (new URLSearchParams(window.location.search).get('animate') === 'true')
      ) {
        blob.classList.add('Blob--animate')
      }

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
    }
  }

  docEl.classList.remove('no-js')

  if (doc.readyState !== 'loading') {
    vincent.init()
  } else {
    doc.addEventListener('DOMContentLoaded', vincent.init, false)
  }
}(window))
