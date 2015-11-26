/* jslint browser: true, indent: 2 */
/* global SVG */

(function (window) {
  'use strict';

  SVG.easing = {
    elastic: function(pos) {
      if (pos == !!pos) {
        return pos;
      }
      return Math.pow(2, -10 * pos) * Math.sin((pos - 0.075) * (2 * Math.PI) / 0.3) + 1;
    }
  };

  if (window.innerWidth > 800) {
    var winwidth = window.innerWidth,
      winheight = window.innerHeight - 100,
      draw = SVG('canvas'),
      rect = draw.rect(60,60).move((winwidth / 2) - 30, winheight / 2 + 60).fill('#fff');

    rect.mouseover(function() {
      this.animate(1000, SVG.easing.elastic)
        .move(winwidth * Math.random(), winheight * Math.random())
        .rotate(-45 + 90 * Math.random());
    });

    rect.click(function() {
      window.alert('Great job! Now get back to work!');
    });
  }

  window.addEventListener('resize', function () {
    location.reload();
  }, false);

}(this));
