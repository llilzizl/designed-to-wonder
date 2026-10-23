/* ==========================================================
   Designed to Wonder: pixel equaliser band
   ----------------------------------------------------------
   Draws the glowing band of pixel squares behind each hero,
   inspired by the purple pixel equaliser reference image.

   Each column of squares rises and falls on two gentle waves,
   so the band looks like sound or data moving through it.
   The band fades out at the edges and is brightest in the middle.

   Kind to people and devices:
     - stops drawing when the band is off screen or the tab is hidden
     - draws one still frame if reduced motion is switched on
     - draws fewer, bigger squares on small screens
   ========================================================== */
(function () {
  'use strict';

  var canvas = document.querySelector('.pixel-band');
  if (!canvas || !canvas.getContext) {
    return;
  }

  var context = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Violet, orchid, pink and blue from the brand palette
  var COLOURS = ['123, 47, 255', '199, 123, 255', '224, 123, 255', '61, 123, 255'];

  var cell = 14;
  var gap = 4;
  var columns = 0;
  var rows = 0;
  var width = 0;
  var height = 0;
  var isVisible = true;
  var frameId = null;

  function resize() {
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;
    cell = width < 640 ? 12 : 14;

    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    columns = Math.ceil(width / (cell + gap));
    rows = Math.ceil(height / (cell + gap));
  }

  function roundedSquare(x, y, size, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + size, y, x + size, y + size, radius);
    context.arcTo(x + size, y + size, x, y + size, radius);
    context.arcTo(x, y + size, x, y, radius);
    context.arcTo(x, y, x + size, y, radius);
    context.closePath();
  }

  function draw(time) {
    var seconds = time / 1000;
    var middle = rows / 2;

    context.clearRect(0, 0, width, height);

    for (var col = 0; col < columns; col += 1) {
      // Fade the band out towards the left and right edges
      var fromCentre = Math.abs((col + 0.5) / columns - 0.5) * 2;
      var edgeFade = Math.max(0, 1 - Math.pow(fromCentre, 2.2));

      // Two waves mixed together give an organic, music like shape
      var wave = Math.sin(col * 0.22 + seconds * 1.4) * 0.5 +
        Math.sin(col * 0.07 - seconds * 0.8) * 0.5;
      var reach = (0.35 + 0.65 * Math.abs(wave)) * middle;
      var colour = COLOURS[col % COLOURS.length];

      for (var row = 0; row < rows; row += 1) {
        var distance = Math.abs(row + 0.5 - middle);
        if (distance > reach) {
          continue;
        }
        // Squares glow brightest in the middle of the band
        var strength = 1 - distance / (reach + 0.001);
        var alpha = (0.12 + strength * 0.75) * edgeFade;
        if (alpha < 0.02) {
          continue;
        }
        var x = col * (cell + gap);
        var y = row * (cell + gap);

        context.fillStyle = 'rgba(' + colour + ', ' + alpha.toFixed(2) + ')';
        roundedSquare(x, y, cell, 3);
        context.fill();
      }
    }
  }

  function loop(time) {
    draw(time);
    frameId = window.requestAnimationFrame(loop);
  }

  function start() {
    if (reduceMotion) {
      draw(0);
      return;
    }
    if (frameId === null && isVisible && !document.hidden) {
      frameId = window.requestAnimationFrame(loop);
    }
  }

  function stop() {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  resize();
  start();

  window.addEventListener('resize', function () {
    resize();
    if (reduceMotion) {
      draw(0);
    }
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        start();
      } else {
        stop();
      }
    }).observe(canvas);
  }
}());
