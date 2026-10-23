/* ==========================================================
   Designed to Wonder: home page
   ----------------------------------------------------------
   1. Typewriter tagline under the logo
   2. Stats strip (counts come from data.js)
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
    'Exploring the tech that shapes tomorrow',
    'Asking the questions nobody explains',
    'From launch pad to living room',
    'Built for the curious, of every age'
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

  /* ---------- 2. Stats ---------- */
  function fillStats(nextLaunch) {
    var launches = document.getElementById('stat-launches');
    var questions = document.getElementById('stat-questions');
    var next = document.getElementById('stat-next');

    if (launches) {
      launches.textContent = data.launches.length;
    }
    if (questions) {
      questions.textContent = data.posts.length;
    }
    if (next) {
      if (nextLaunch) {
        var days = utils.getTimeRemaining(nextLaunch.date).days;
        next.textContent = days === 1 ? '1 day' : days + ' days';
      } else {
        next.textContent = 'See T-Minus';
      }
    }
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
  fillStats(nextLaunch);
  renderLaunch(nextLaunch);
  renderQuestion();
  renderShaper();
}());
