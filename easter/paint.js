/**
* Oil Painting
*/
(function () {
  'use strict';

  var win = window,
    doc = win.document,
    body = doc.body,
    canvas = doc.createElement('canvas'),
    startPos = {x: win.innerWidth / 2, y: win.innerHeight / 2},
    prevPos = {x: win.innerWidth / 2, y: win.innerHeight / 2},
    dist = {
      x: 0,
      y: 0
    },
    background = 'transparent',
    color = '#ffffff',
    context,
    width,
    height,

    mouseMove = function (e) {
      var distance = Math.sqrt(Math.pow(prevPos.x - startPos.x, 2) + Math.pow(prevPos.y - startPos.y, 2)),
        a = distance * 10 * (Math.pow(Math.random(), 2) - 0.5),
        r = Math.random() - 0.5,
        size = (Math.random() * 20) / distance,
        lWidth;

      dist.x = (prevPos.x - startPos.x) * Math.sin(0.5) + startPos.x;
      dist.y = (prevPos.y - startPos.y) * Math.cos(0.5) + startPos.y;

      startPos.x = prevPos.x;
      startPos.y = prevPos.y;

      prevPos.x = (e.pageX);
      prevPos.y = (e.pageY);

      // ------- Draw -------
      lWidth = (Math.random() + 20 / 10 - 0.5) * size + (1 - Math.random() + 30 / 20 - 0.5) * size;

      context.lineWidth = lWidth;
      context.strokeWidth = lWidth;

      context.lineCap = 'round';
      context.lineJoin = 'round';

      context.beginPath();
      context.moveTo(startPos.x, startPos.y);
      context.quadraticCurveTo(dist.x, dist.y, prevPos.x, prevPos.y);

      context.fillStyle = color;
      context.strokeStyle = color;

      context.moveTo(startPos.x + a, startPos.y + a);
      context.lineTo(startPos.x + r + a, startPos.y + r + a);

      context.stroke();
      context.fill();

      context.closePath();
    },

    mouseDown = function (e) {
      //color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      context.fillStyle = color;
      context.strokeStyle = color;
      e.preventDefault();
    },

    mouseDbl = function (e) {
      context.clearRect(0, 0, width, height);
      e.preventDefault();
    },

    reInitiate = function () {
      context.clearRect(0, 0, width, height);

      canvas.width = width;
      canvas.height = height;
    };


  context = canvas.getContext('2d');

  width = $(document).width();
  height = $(document).height();

  canvas.width = width;
  canvas.height = height;

  canvas.style.cssText = 'position: absolute; top: 0; left: 0; z-index: 9999; pointer-events: none; background: ' + background + ';';

  doc.body.appendChild(canvas);

  body.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('click', mouseDown, false);
  canvas.addEventListener('dblclick', mouseDbl, false);
  win.addEventListener('resize', reInitiate, false);

}());