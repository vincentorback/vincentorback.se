(function (window) {
  'use strict';

  var SQRT_3 = Math.pow(3, 0.5),
    triangle,
    D,
    mousePos,
    position,
    winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    isTouch = Modernizr.touch,
    supportOrientation = isTouch && window.DeviceOrientationEvent,
    starCount = isTouch ? 20 : 100,
    rocketSpeed = 6,
    canvas = document.getElementById('canvas');

  if (!supportOrientation && winWidth > 600) {
    rocketSpeed = 10;
  }

  paper.install(window);

  window.onload = function () {
    paper.setup('canvas');

    D = Math.max(paper.view.getSize().width, paper.view.getSize().height);

    mousePos = paper.view.center.add([view.bounds.width / 3, 100]);
    position = paper.view.center;

    // Draw the BG
    var background = new Path.Rectangle(view.bounds);

    background.fillColor = '#3B3251';
    buildStars();
    triangle = new Triangle(50);

    paper.view.draw();

    paper.view.onFrame = function () {
      position = position.add((mousePos.subtract(position).divide(10)));
      var vector = (view.center.subtract(position)).divide(10);

      moveStars(vector.multiply(8));
      triangle.update();
    };

    var gamma,
      beta;

    if (supportOrientation) {
      window.addEventListener('deviceorientation', function (event) {
        beta = event.beta;
        gamma = event.gamma;

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (beta >  90) {
          beta = 90;
        }

        if (beta < -90) {
          beta = -90;
        }

        // To make computation easier we shift the range of 
        // beta and gamma to [0,180]
        beta += 90;
        gamma += 90;

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        mousePos.y = (winWidth * beta / 180);
        mousePos.x = (winHeight * gamma / 180);

        triangle.rotate();

      }, false);

      if (isTouch) {
        canvas.addEventListener('touchmove', function (event) {
          event.preventDefault(); // Disable scroll
        }, false);
      }
    } else if (isTouch) {
      canvas.addEventListener('touchmove', function (event) {
        mousePos.x = event.touches[0].clientX;
        mousePos.y = event.touches[0].clientY;

        triangle.rotate();

        event.preventDefault(); // Disable scroll
      }, false);
    }

  };

  // ---------------------------------------------------
  //  Helpers
  // ---------------------------------------------------
  window.onresize = function () {
    project.clear();

    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    D = Math.max(paper.view.getSize().width, paper.view.getSize().height);
    // Draw the BG
    var background = new Path.Rectangle(view.bounds);

    background.fillColor = '#3B3251';
    buildStars();
    triangle.build(50);
  };

  var random = function (minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
  };

  var map = function (n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  };


  // ---------------------------------------------------
  //  Triangle
  // ---------------------------------------------------
  var Triangle = function (a) {
    this.build(a);
  };

  Triangle.prototype.build = function (a) {
    // The points of the triangle
    var segments = [new paper.Point(0, -a / SQRT_3), new paper.Point(-a / 2, a * 0.5 / SQRT_3), new paper.Point(a / 2, a * 0.5 / SQRT_3)];

    this.flameSize = a / SQRT_3;
    var flameSegments = [new paper.Point(0, this.flameSize), new paper.Point(-a / 3, a * 0.4 / SQRT_3), new paper.Point(a / 3, a * 0.4 / SQRT_3)];

    this.flame = new Path({
      segments: flameSegments,
      closed: true,
      fillColor: '#FCE589'
    });

    this.ship = new Path({
      segments: segments,
      closed: true,
      fillColor: '#FF7885'
    });
    this.group = new Group({
      children: [this.flame, this.ship],
      position: view.center
    });
  };

  Triangle.prototype.update = function () {
    this.flame.segments[0].point.x = random(this.flame.segments[1].point.x, this.flame.segments[2].point.x);

    var dist = mousePos.subtract(paper.view.center).length;
    var angle = mousePos.subtract(paper.view.center).angle;
    var spread = map(dist, 0, D / 2, 10, 30);

    this.flame.segments[0].point = paper.view.center.subtract(new Point({
      length: map(dist, 0, D / 2, 2 * this.flameSize / 3, this.flameSize),
      angle: random(angle - spread, angle + spread)
    }));
  };

  Triangle.prototype.rotate = function () {
    var angle = paper.view.center.subtract(mousePos).angle - paper.view.center.subtract(this.ship.segments[0].point).angle;

    this.group.rotate(angle, paper.view.center);
  };



  // ---------------------------------------------------
  //  Stars (from paperjs.org examples section)
  // ---------------------------------------------------
  if (!isTouch && !supportOrientation) {
    window.onmousemove = function (event) {
      mousePos.x = event.x;
      mousePos.y = event.y;

      triangle.rotate();
    };
  }



  var buildStars = function () {
    // Create a symbol, which we will use to place instances of later:
    var path = new Path.Circle({
      center: [0, 0],
      radius: 5,
      fillColor: 'white',
      strokeColor: 'white'
    });

    var symbol = new Symbol(path),
      i = 0,
      center,
      placed;

    // Place the instances of the symbol:
    for (i; i < starCount; i += 1) {
      // The center position is a random point in the view:
      center = Point.random().multiply(paper.view.size);
      placed = symbol.place(center);
      placed.scale(i / starCount + 0.01);
      placed.data = {
        vector: new Point({
          angle: Math.random() * 360,
          length : (i / starCount) * Math.random() / 5
        })
      };
    }

    var vector = new Point({
      angle: 45,
      length: 0
    });

  };

  var keepInView = function (item) {
    var viewBounds = paper.view.bounds;
    var position = item.position;

    if (position.isInside(viewBounds)) {
      return;
    }

    var itemBounds = item.bounds;

    if (position.x > viewBounds.width + 5) {
      position.x = -item.bounds.width;
    }

    if (position.x < -itemBounds.width - 5) {
      position.x = viewBounds.width;
    }

    if (position.y > viewBounds.height + 5) {
      position.y = -itemBounds.height;
    }

    if (position.y < -itemBounds.height - 5) {
      position.y = viewBounds.height;
    }
  };

  var moveStars = function (vector) {
    // Run through the active layer's children list and change
    // the position of the placed symbols:
    var layer = project.activeLayer,
      i = 1,
      item,
      size,
      length;

    for (i; i < starCount + 1; i += 1) {
      item = layer.children[i];
      size = item.bounds.size;
      length = vector.length / rocketSpeed * size.width / rocketSpeed;
      item.position = item.position.add(vector.normalize(length).add(item.data.vector));
      keepInView(item);
    }
  };

}(this));