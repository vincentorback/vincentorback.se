/* jshint browser: true, strict: false, eqeqeq: true, indent: 2, newcap: true, plusplus: true, unused: true, trailing: true, loopfunc: false, nomen: true, onevar: true, white: true, undef: true, latedef: true */
/* global requestAnimFrame */

(function () {
  'use strict';

  window.requestAnimFrame = (function () {
    return window.requestAnimFrame       ||
      window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var flakes = [],
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext("2d"),
    flakeCount = 100,
    mX = -100,
    mY = -100;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.setAttribute('id', 'canvas');
  canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 999; pointer-events: none;';

  if (!document.getElementById('canvas')) {
    document.body.appendChild(canvas);
  }

  if (window.innerWidth > 2000) {
    flakeCount = 150;
  }

  function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.5;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = (Math.random() * 0.5) + 0.3;
  }

  function snow() {
    var flake, i, x2, y2, dist, force, xcomp, ycomp, deltaV,
      x = mX,
      y = mY,
      minDist = 150;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < flakeCount; i += 1) {
      flake = flakes[i];
      minDist = 150;
      x2 = flake.x;
      y2 = flake.y;
      dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

      if (dist < minDist) {
        force = minDist / (dist * dist);
        xcomp = (x - x2) / dist;
        ycomp = (y - y2) / dist;
        deltaV = force / 2;

        flake.velX -= deltaV * xcomp;
        flake.velY -= deltaV * ycomp;

      } else {
        flake.velX *= 0.98;
        if (flake.velY <= flake.speed) {
          flake.velY = flake.speed;
        }
        flake.velX += Math.cos(flake.step += 0.05) * flake.stepSize;
      }

      ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
      flake.y += flake.velY;
      flake.x += flake.velX;

      if (flake.y >= canvas.height || flake.y <= 0) {
        reset(flake);
      }

      if (flake.x >= canvas.width || flake.x <= 0) {
        reset(flake);
      }

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimFrame(snow);
  }

  function init() {
    var i, x, y, size, speed, opacity;

    for (i = 0; i < flakeCount; i += 1) {
      x = Math.floor(Math.random() * canvas.width);
      y = Math.floor(Math.random() * canvas.height);
      size = (Math.random() * 3) + 2;
      speed = (Math.random() * 1) + 0.5;
      opacity = (Math.random() * 0.5) + 0.3;

      flakes.push({
        speed: speed,
        velY: speed,
        velX: 0,
        x: x,
        y: y,
        size: size,
        stepSize: (Math.random()) / 30,
        step: 0,
        opacity: opacity
      });
    }

    snow();
  }

  window.addEventListener("resize", function () {
    requestAnimFrame(function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  });

  init();

}());