// http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function () {
  'use strict';

  var deBouncer = function ($, cf, of, interval) {
    // deBouncer by hnldesign.nl
    // based on code by Paul Irish and the original debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
      var timeout;
      return function debounced() {
        var obj = this, args = arguments;
        function delayed () {
          if (!execAsap) {
            func.apply(obj, args);
          }
          timeout = null;
        }
        if (timeout) {
          clearTimeout(timeout);
        } else if (execAsap) {
          func.apply(obj, args);
        }
        timeout = setTimeout(delayed, threshold || interval);
      };
    };

    $.fn[cf] = function (fn) {
      return fn ? this.bind(of, debounce(fn)) : this.trigger(cf);
    };
  };

  deBouncer(jQuery, 'smartresize', 'resize', 200);
  deBouncer(jQuery, 'smartscroll', 'scroll', 200);

}());