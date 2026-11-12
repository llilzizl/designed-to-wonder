/* ==========================================================
   Designed to Wonder: home page
   ----------------------------------------------------------
   1. Typewriter tagline under the logo
   2. Twinkling pixel 2 beside "Tech is changing everything"
   3. Live feed: next launch countdown, latest question and
      a featured shaper that changes every day
   ========================================================== */
(function () {
  'use strict';

  var utils = window.DTW.utils;
  var data = window.DTW.data;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Typewriter ---------- */
  var PHRASES = [
    'Built for the curious',
    'For those that are designed to wonder',
    'Exploring the tech that shapes tomorrow'
  ];

  function startTypewriter() {
    var element = document.getElementById('typewriter');
    if (!element) {
      return;
    }

    // With reduced motion, just show the first phrase
    if (reduceMotion) {
      element.textContent = PHRASES[0];
      return;
    }

    var phraseIndex = 0;
    var letterIndex = 0;
    var deleting = false;

    function tick() {
      var phrase = PHRASES[phraseIndex];
      letterIndex += deleting ? -1 : 1;
      element.textContent = phrase.slice(0, letterIndex);

      var delay = deleting ? 30 : 60;

      if (!deleting && letterIndex === phrase.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && letterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        delay = 400;
      }
      window.setTimeout(tick, delay);
    }
    tick();
  }

  /* ---------- 2. Twinkling pixel 2 ----------
     The pixels of the 2 / question mark drop in from the top,
     row by row, then twinkle. Every few seconds they rain down
     again. Drawn on a transparent canvas over the page background. */
  // [column, row, kind]: kind 0 = gradient, 1 = soft blue, 2 = white
  var MARK_CELLS = [
    [1, 0, 0], [2, 0, 0], [3, 0, 0],
    [0, 1, 0], [4, 1, 0],
    [4, 2, 0],
    [3, 3, 0],
    [2, 4, 0],
    [1, 5, 1],
    [0, 6, 1], [1, 6, 1], [2, 6, 2], [3, 6, 1], [4, 6, 1]
  ];
  var MARK_ROW_COLOURS = ['#E07BFF', '#C77BFF', '#A35CFF', '#7B2FFF', '#5A55FF', '#3D7BFF', '#3D7BFF'];

  function startPixelMark() {
    var canvas = document.getElementById('pixel-mark');
    if (!canvas || !canvas.getContext) {
      return;
    }
    var context = canvas.getContext('2d');
    var size = 0;
    var unit = 0;
    var CYCLE = 9000; // ms for one drop + twinkle loop

    // Each cell gets its own twinkle speed and timing
    var cells = MARK_CELLS.map(function (cell) {
      return {
        col: cell[0],
        row: cell[1],
        kind: cell[2],
        phase: Math.random() * Math.PI * 2,
        speed: 1.5 + Math.random() * 2.5
      };
    });

    function resize() {
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      var rect = canvas.getBoundingClientRect();
      size = rect.width;
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      // 5 columns by 7 rows, with room above for the drop
      unit = Math.min(rect.width / 9, rect.height / 11);
    }

    function draw(time) {
      var t = time % CYCLE;
      var seconds = time / 1000;
      var height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);
      var offsetX = (size - unit * 5) / 2;
      var offsetY = (height - unit * 7) / 2;
      var square = unit * 0.82;

      context.clearRect(0, 0, size, height);

      cells.forEach(function (cell) {
        // Rows drop in one after another from top to bottom
        var start = cell.row * 180 + cell.col * 40;
        var drop = Math.min(1, Math.max(0, (t - start) / 600));
        var eased = 1 - Math.pow(1 - drop, 3);
        // Near the end of the loop the pixels fall away downwards
        var leave = Math.min(1, Math.max(0, (t - (CYCLE - 1200 + cell.row * 80)) / 600));

        var x = offsetX + cell.col * unit + (unit - square) / 2;
        var y = offsetY + cell.row * unit + (unit - square) / 2 -
          (1 - eased) * unit * 4 + leave * leave * unit * 3;

        var twinkle = 0.6 + 0.4 * Math.sin(seconds * cell.speed + cell.phase);
        var alpha = eased * (1 - leave) * twinkle;
        if (cell.kind === 1) {
          alpha *= 0.6;
        }
        if (alpha <= 0.01) {
          return;
        }

        var colour = cell.kind === 2 ? '#F5F4FF' : cell.kind === 1 ? '#3D7BFF' : MARK_ROW_COLOURS[cell.row];
        context.globalAlpha = alpha;
        context.shadowColor = colour;
        context.shadowBlur = unit * 0.6 * twinkle;
        context.fillStyle = colour;
        context.beginPath();
        if (context.roundRect) {
          context.roundRect(x, y, square, square, square * 0.15);
        } else {
          context.rect(x, y, square, square);
        }
        context.fill();
      });
      context.globalAlpha = 1;
      context.shadowBlur = 0;
    }

    resize();
    window.addEventListener('resize', function () {
      resize();
      if (reduceMotion) {
        draw(CYCLE / 2);
      }
    });

    // Reduced motion: a still, fully formed mark
    if (reduceMotion) {
      cells.forEach(function (cell) {
        cell.speed = 0;
        cell.phase = Math.PI / 2;
      });
      draw(CYCLE / 2);
      return;
    }

    function loop(time) {
      draw(time);
      window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
  }

  /* ---------- 3. Live feed ---------- */
  function renderLaunch(nextLaunch) {
    var box = document.getElementById('feed-launch');
    if (!box || !nextLaunch) {
      return;
    }

    box.innerHTML =
      '<p class="eyebrow">Next launch</p>' +
      '<h3>' + utils.escapeHTML(nextLaunch.name) + '</h3>' +
      '<p>' + utils.formatShortDate(nextLaunch.date) + '</p>' +
      '<div class="countdown" id="feed-countdown"></div>' +
      '<p><a href="t-minus.html">See every countdown</a></p>';

    var countdown = document.getElementById('feed-countdown');

    function update() {
      var left = utils.getTimeRemaining(nextLaunch.date);
      countdown.innerHTML = [
        [left.days, 'Days'],
        [utils.padTwo(left.hours), 'Hrs'],
        [utils.padTwo(left.minutes), 'Min'],
        [utils.padTwo(left.seconds), 'Sec']
      ].map(function (unit) {
        return '<span class="countdown-unit"><span class="countdown-value">' + unit[0] +
          '</span><span class="countdown-name">' + unit[1] + '</span></span>';
      }).join('');
    }

    update();
    window.setInterval(update, 1000);
  }

  function renderQuestion() {
    var box = document.getElementById('feed-question');
    var post = data.posts.filter(function (item) {
      return item.featured;
    })[0] || data.posts[0];

    if (!box || !post) {
      return;
    }

    box.innerHTML =
      '<p class="eyebrow">Latest question</p>' +
      '<h3>' + utils.escapeHTML(post.question) + '</h3>' +
      '<p>' + utils.escapeHTML(post.intro) + '</p>' +
      '<p><a href="wonder-why.html?post=' + encodeURIComponent(post.slug) + '">Read the answer</a></p>';
  }

  function renderShaper() {
    var box = document.getElementById('feed-shaper');
    if (!box || !data.shapers.length) {
      return;
    }

    // A different shaper each day: day number divided by the list length
    var dayNumber = Math.floor(Date.now() / 86400000);
    var shaper = data.shapers[dayNumber % data.shapers.length];

    box.innerHTML =
      '<p class="eyebrow">Shaper of the day</p>' +
      '<h3>' + utils.escapeHTML(shaper.name) + '</h3>' +
      '<p>' + utils.escapeHTML(shaper.oneLiner) + '</p>' +
      '<p><a href="the-shapers.html">Meet the Shapers</a></p>';
  }

  var nextLaunch = utils.getNextLaunch(data.launches);
  startTypewriter();
  startPixelMark();
  renderLaunch(nextLaunch);
  renderQuestion();
  renderShaper();
}());
