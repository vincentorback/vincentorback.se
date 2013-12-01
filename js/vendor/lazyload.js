/*!
 * Lazy Load Images without jQuery
 * http://ezyz.github.com/Lazy-Load-Images-without-jQuery/
 *
 * Original by Mike Pulaski - http://www.mikepulaski.com
 * Modified by Kai Zau - http://kaizau.com
 */

(function() {
  var addEventListener =  window.addEventListener || function(n,f) { window.attachEvent('on'+n, f); },
      removeEventListener = window.removeEventListener || function(n,f) { window.detachEvent('on'+n, f); },

  lazyLoader = {
    cache: [],
    mobileScreenSize: 500,

    addObservers: function() {
      addEventListener('scroll', lazyLoader.throttledLoad);
      addEventListener('resize', lazyLoader.throttledLoad);
    },

    removeObservers: function() {
      removeEventListener('scroll', lazyLoader.throttledLoad, false);
      removeEventListener('resize', lazyLoader.throttledLoad, false);
    },

    throttleTimer: new Date().getTime(),

    throttledLoad: function() {
      var now = new Date().getTime();

      if ((now - lazyLoader.throttleTimer) >= 200) {
        lazyLoader.throttleTimer = now;
        lazyLoader.loadVisibleImages();
      }
    },

    loadVisibleImages: function() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop,
        pageHeight = window.innerHeight || document.documentElement.clientHeight,
        range = {
          min: scrollY - 1000,
          max: scrollY + pageHeight + 1000
        },
        i = 0;

      function onLoads(obj) {
        //obj.className = this.className.replace(new RegExp('(^|\s+)lazy-load(\s+|$)'), '$1lazy-loaded$2');
        obj.className = obj.className.replace('lazy-load', 'lazy-loaded');
      }

      while (i < lazyLoader.cache.length) {
        var image = lazyLoader.cache[i],
          imagePosition = getOffsetTop(image),
          imageHeight = image.height || 0,
          mobileSrc;

        if ((imagePosition >= range.min - imageHeight) && (imagePosition <= range.max)) {
          mobileSrc = image.getAttribute('data-src-mobile');
          
          onLoads(image);

          if (mobileSrc && screen.width <= lazyLoader.mobileScreenSize) {
            image.src = mobileSrc;
          }
          else {
            image.src = image.getAttribute('data-src');
          }

          image.removeAttribute('data-src');
          image.removeAttribute('data-src-mobile');

          lazyLoader.cache.splice(i, 1);
          continue;
        }

        i++;
      }

      if (lazyLoader.cache.length === 0) {
        lazyLoader.removeObservers();
      }
    },

    init: function() {

      // Patch IE7- (querySelectorAll)
      if (!document.querySelectorAll) {
        document.querySelectorAll = function(selector) {
          var doc = document,
            head = doc.documentElement.firstChild,
            styleTag = doc.createElement('STYLE');

          head.appendChild(styleTag);
          doc.__qsaels = [];
          styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
          window.scrollBy(0, 0);
          return doc.__qsaels;
        };
      }

      addEventListener('load', function _lazyLoaderInit() {
        var imageNodes = document.querySelectorAll('img[data-src]');

        for (var i = 0; i < imageNodes.length; i++) {
          var imageNode = imageNodes[i];

          lazyLoader.cache.push(imageNode);
        }

        lazyLoader.addObservers();
        lazyLoader.loadVisibleImages();

        removeEventListener('load', _lazyLoaderInit, false);
      });
    }
  };

  // For IE7 compatibility
  // Adapted from http://www.quirksmode.org/js/findpos.html
  function getOffsetTop(el) {
    var val = 0;
    if (el.offsetParent) {
      do {
        val += el.offsetTop;
      } while ((el = el.offsetParent) !== null);

      return val;
    }
  }

  lazyLoader.init();

})();