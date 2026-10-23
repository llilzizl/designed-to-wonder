/* ==========================================================
   Designed to Wonder: The Shapers page
   ----------------------------------------------------------
   1. Flip cards built from data.js. The front shows who they
      are, the back shows their timeline and a lesson.
   2. Filter by type of shaper.

   Accessibility: the hidden side of each card is made "inert",
   so keyboard and screen reader users only meet the side that
   is showing. Focus moves to the button on the new side.
   ========================================================== */
(function () {
  'use strict';

  var utils = window.DTW.utils;
  var data = window.DTW.data;

  var grid = document.getElementById('shaper-grid');
  var filters = document.getElementById('shaper-filters');
  var count = document.getElementById('shaper-count');
  var currentCategory = 'all';

  function categoryLabel(id) {
    var match = data.shaperCategories.filter(function (category) {
      return category.id === id;
    })[0];
    return match ? match.label : '';
  }

  function cardHTML(shaper) {
    var name = utils.escapeHTML(shaper.name);
    var timeline = shaper.timeline.map(function (item) {
      return '<li><strong>' + utils.escapeHTML(item.year) + '</strong><span>' + utils.escapeHTML(item.text) + '</span></li>';
    }).join('');

    return '<article class="flip-card" aria-label="' + name + '">' +
      '<div class="flip-inner">' +
        '<div class="glass flip-face flip-front">' +
          '<div class="monogram" aria-hidden="true">' + utils.escapeHTML(shaper.initials) + '</div>' +
          '<span class="badge">' + utils.escapeHTML(categoryLabel(shaper.category)) + '</span>' +
          '<h3>' + name + '</h3>' +
          '<p class="shaper-role">' + utils.escapeHTML(shaper.role) + ' &middot; ' + utils.escapeHTML(shaper.years) + '</p>' +
          '<p>' + utils.escapeHTML(shaper.oneLiner) + '</p>' +
          (shaper.quote ? '<blockquote class="shaper-quote">&ldquo;' + utils.escapeHTML(shaper.quote) + '&rdquo;</blockquote>' : '') +
          '<button class="btn btn-primary btn-small flip-button" type="button" data-flip>See the timeline<span class="visually-hidden"> for ' + name + '</span></button>' +
        '</div>' +
        '<div class="glass flip-face flip-back" inert>' +
          '<h3>' + name + '</h3>' +
          '<ol class="timeline">' + timeline + '</ol>' +
          '<p class="lesson"><strong>Lesson for builders:</strong> ' + utils.escapeHTML(shaper.lesson) + '</p>' +
          '<button class="btn btn-ghost btn-small flip-button" type="button" data-flip>Flip back<span class="visually-hidden"> to ' + name + '</span></button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function render() {
    var list = utils.filterByCategory(data.shapers, currentCategory);
    grid.innerHTML = list.map(cardHTML).join('');
    count.textContent = 'Showing ' + list.length + ' of ' + data.shapers.length + ' shapers';
  }

  // Flip a card and move focus to the button on the side now showing
  grid.addEventListener('click', function (event) {
    var button = event.target.closest('[data-flip]');
    if (!button) {
      return;
    }
    var card = button.closest('.flip-card');
    var flipped = card.classList.toggle('is-flipped');
    var front = card.querySelector('.flip-front');
    var back = card.querySelector('.flip-back');

    var showing = flipped ? back : front;
    front.inert = flipped;
    back.inert = !flipped;

    // Move focus without scrolling, then start the new side at the top
    showing.querySelector('[data-flip]').focus({ preventScroll: true });
    showing.scrollTop = 0;
  });

  filters.innerHTML = data.shaperCategories.map(function (category) {
    return '<button class="chip" type="button" data-category="' + category.id + '" aria-pressed="' +
      (category.id === currentCategory) + '">' + category.label + '</button>';
  }).join('');

  filters.addEventListener('click', function (event) {
    var button = event.target.closest('[data-category]');
    if (!button) {
      return;
    }
    currentCategory = button.getAttribute('data-category');
    filters.querySelectorAll('[data-category]').forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip === button));
    });
    render();
  });

  render();
}());
