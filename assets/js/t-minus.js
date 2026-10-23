/* ==========================================================
   Designed to Wonder: T-Minus page
   ----------------------------------------------------------
   1. "Next up" panel with a big live countdown
   2. Launch cards built from data.js
   3. Category filter, live search and a personal watchlist
   4. One timer that updates every countdown each second
   ========================================================== */
(function () {
  'use strict';

  var utils = window.DTW.utils;
  var data = window.DTW.data;
  var storage = window.DTW.storage;

  var grid = document.getElementById('launch-grid');
  var count = document.getElementById('launch-count');
  var filters = document.getElementById('launch-filters');
  var search = document.getElementById('launch-search');
  var watchToggle = document.getElementById('watchlist-toggle');
  var nextPanel = document.getElementById('next-launch');

  var state = {
    category: 'all',
    query: '',
    watchOnly: false,
    watchlist: storage.get('watchlist', [])
  };

  var STATUS_TEXT = {
    countdown: 'Countdown',
    landed: 'Landed',
    window: 'Window',
    rumoured: 'Rumoured'
  };

  var NEW_TAB = '<span class="visually-hidden"> (opens in a new tab)</span>';

  /* ---------- Countdown markup ---------- */
  function countdownHTML(date) {
    return '<div class="countdown" data-countdown="' + utils.escapeHTML(date) + '" role="timer" aria-label="Time until launch">' +
      unit('Days') + unit('Hrs') + unit('Min') + unit('Sec') +
      '</div>';
  }

  function unit(name) {
    return '<span class="countdown-unit"><span class="countdown-value">--</span>' +
      '<span class="countdown-name">' + name + '</span></span>';
  }

  // Updates every countdown on the page at once
  function tickCountdowns() {
    document.querySelectorAll('[data-countdown]').forEach(function (element) {
      var left = utils.getTimeRemaining(element.getAttribute('data-countdown'));
      var values = element.querySelectorAll('.countdown-value');
      if (!left || values.length !== 4) {
        return;
      }
      values[0].textContent = left.days;
      values[1].textContent = utils.padTwo(left.hours);
      values[2].textContent = utils.padTwo(left.minutes);
      values[3].textContent = utils.padTwo(left.seconds);

      // When a countdown reaches zero, redraw so the card says "Landed"
      if (left.total === 0 && !element.hasAttribute('data-finished')) {
        element.setAttribute('data-finished', 'true');
        render();
        renderNext();
      }
    });
  }

  /* ---------- 1. Next up panel ---------- */
  function renderNext() {
    var next = utils.getNextLaunch(data.launches);

    if (!next) {
      nextPanel.innerHTML = '<div><p class="eyebrow">Next up</p><h2>No exact dates right now</h2>' +
        '<p>Check the launch windows below.</p></div>';
      return;
    }

    nextPanel.innerHTML =
      '<div>' +
        '<p class="eyebrow">Next up</p>' +
        '<h2>' + utils.escapeHTML(next.name) + '</h2>' +
        '<p class="launch-when">' + utils.formatShortDate(next.date) + ' &middot; ' + utils.escapeHTML(next.maker) + '</p>' +
        '<p>' + utils.escapeHTML(next.summary) + '</p>' +
      '</div>' +
      countdownHTML(next.date);
  }

  /* ---------- 2. Launch cards ---------- */
  function whenText(launch, status) {
    if (status === 'landed') {
      return 'Landed on ' + utils.formatShortDate(launch.date);
    }
    if (status === 'countdown') {
      return 'Launches ' + utils.formatShortDate(launch.date);
    }
    return launch.window || 'Date to be confirmed';
  }

  function cardHTML(launch) {
    var status = utils.getLaunchStatus(launch);
    var saved = state.watchlist.indexOf(launch.id) !== -1;

    return '<article class="glass holo-edge card launch-card">' +
        '<div class="launch-top">' +
          '<span class="launch-maker">' + utils.escapeHTML(launch.maker) + '</span>' +
          '<span class="badge badge-' + status + '">' + STATUS_TEXT[status] + '</span>' +
        '</div>' +
        '<h3>' + utils.escapeHTML(launch.name) + '</h3>' +
        '<p class="launch-when">' + utils.escapeHTML(whenText(launch, status)) + '</p>' +
        (status === 'countdown' ? countdownHTML(launch.date) : '') +
        '<p>' + utils.escapeHTML(launch.summary) + '</p>' +
        '<p class="launch-detail">' + utils.escapeHTML(launch.detail) + '</p>' +
        '<div class="launch-actions">' +
          '<button class="btn btn-ghost btn-small" type="button" data-watch="' + launch.id + '" aria-pressed="' + saved + '">' +
            (saved ? 'On my watchlist' : 'Add to watchlist') +
            '<span class="visually-hidden">: ' + utils.escapeHTML(launch.name) + '</span>' +
          '</button>' +
          '<a class="source-link" href="' + utils.escapeHTML(launch.source.url) + '" target="_blank" rel="noopener noreferrer">Source: ' +
            utils.escapeHTML(launch.source.label) + NEW_TAB + '</a>' +
        '</div>' +
      '</article>';
  }

  /* ---------- 3. Filtering ---------- */
  function visibleLaunches() {
    var list = utils.sortLaunches(data.launches);
    list = utils.filterByCategory(list, state.category);
    list = utils.searchItems(list, state.query, ['name', 'maker', 'summary', 'tags']);

    if (state.watchOnly) {
      list = list.filter(function (launch) {
        return state.watchlist.indexOf(launch.id) !== -1;
      });
    }
    return list;
  }

  function render() {
    var list = visibleLaunches();

    if (!list.length) {
      grid.innerHTML = '<p class="glass empty-state">' +
        (state.watchOnly && !state.watchlist.length ?
          'Your watchlist is empty. Add a launch to keep track of it here.' :
          'No launches match that search. Try another word or choose All.') +
        '</p>';
    } else {
      grid.innerHTML = list.map(cardHTML).join('');
    }

    count.textContent = 'Showing ' + list.length + ' of ' + data.launches.length + ' launches';
    tickCountdowns();
  }

  function buildFilters() {
    filters.innerHTML = data.launchCategories.map(function (category) {
      return '<button class="chip" type="button" data-category="' + category.id + '" aria-pressed="' +
        (category.id === state.category) + '">' + category.label + '</button>';
    }).join('');

    filters.addEventListener('click', function (event) {
      var button = event.target.closest('[data-category]');
      if (!button) {
        return;
      }
      state.category = button.getAttribute('data-category');
      filters.querySelectorAll('[data-category]').forEach(function (chip) {
        chip.setAttribute('aria-pressed', String(chip === button));
      });
      render();
    });
  }

  search.addEventListener('input', function () {
    state.query = search.value;
    render();
  });

  watchToggle.addEventListener('click', function () {
    state.watchOnly = !state.watchOnly;
    watchToggle.setAttribute('aria-pressed', String(state.watchOnly));
    render();
  });

  // Add or remove a launch from the watchlist
  grid.addEventListener('click', function (event) {
    var button = event.target.closest('[data-watch]');
    if (!button) {
      return;
    }
    var id = button.getAttribute('data-watch');
    var position = state.watchlist.indexOf(id);

    if (position === -1) {
      state.watchlist.push(id);
    } else {
      state.watchlist.splice(position, 1);
    }
    storage.set('watchlist', state.watchlist);
    render();

    // Keep keyboard focus on the same button after the redraw
    var same = grid.querySelector('[data-watch="' + id + '"]');
    if (same) {
      same.focus();
    } else {
      watchToggle.focus();
    }
  });

  buildFilters();
  renderNext();
  render();
  window.setInterval(tickCountdowns, 1000);
}());
