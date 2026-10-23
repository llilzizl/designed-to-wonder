/* ==========================================================
   Designed to Wonder: Client Side page
   ----------------------------------------------------------
   1. Journey map: six stage tabs, each showing what Apple
      does, what happens in my chair and the tech that helps.
      Works with a mouse, touch and the arrow keys.
   2. Journey score: a checklist that works out a score,
      saved in the browser so it is there next visit.
   ========================================================== */
(function () {
  'use strict';

  var utils = window.DTW.utils;
  var data = window.DTW.data;
  var storage = window.DTW.storage;

  /* ---------- 1. Journey map ---------- */
  var track = document.getElementById('journey-track');
  var panel = document.getElementById('journey-panel');
  var progress = document.getElementById('journey-progress');
  var stages = data.journeyStages;
  var activeIndex = 0;

  function buildTabs() {
    stages.forEach(function (stage, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'journey-step';
      button.id = 'journey-tab-' + stage.id;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', 'journey-panel');
      button.innerHTML =
        '<span class="journey-dot" aria-hidden="true">' + utils.padTwo(index + 1) + '</span>' +
        '<span class="journey-step-label">' + utils.escapeHTML(stage.label) + '</span>';
      button.addEventListener('click', function () {
        showStage(index, false);
      });
      track.appendChild(button);
    });

    // Arrow keys move between stages, as expected for tabs
    track.addEventListener('keydown', function (event) {
      var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      var next = null;

      if (keys[event.key]) {
        next = (activeIndex + keys[event.key] + stages.length) % stages.length;
      } else if (event.key === 'Home') {
        next = 0;
      } else if (event.key === 'End') {
        next = stages.length - 1;
      }

      if (next !== null) {
        event.preventDefault();
        showStage(next, true);
      }
    });
  }

  function showStage(index, moveFocus) {
    var stage = stages[index];
    var tabs = track.querySelectorAll('.journey-step');
    activeIndex = index;

    tabs.forEach(function (tab, tabIndex) {
      var isActive = tabIndex === index;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      tab.classList.toggle('is-done', tabIndex < index);
    });

    if (moveFocus) {
      tabs[index].focus();
    }

    // Grow the glowing line up to the chosen stage
    // (measured from the centre of the first dot to the centre of this one)
    var trackLeft = track.getBoundingClientRect().left;
    var first = tabs[0].getBoundingClientRect();
    var current = tabs[index].getBoundingClientRect();
    var firstCentre = first.left + first.width / 2;
    var currentCentre = current.left + current.width / 2;
    progress.style.left = (firstCentre - trackLeft) + 'px';
    progress.style.width = (currentCentre - firstCentre) + 'px';

    panel.setAttribute('aria-labelledby', tabs[index].id);
    panel.innerHTML =
      '<p class="eyebrow">Stage ' + utils.padTwo(index + 1) + ' of ' + utils.padTwo(stages.length) + '</p>' +
      '<h3 class="chrome-text journey-stage-title">' + utils.escapeHTML(stage.label) + '</h3>' +
      '<div class="journey-columns">' +
        column('The Apple way', stage.apple) +
        column('In my chair', stage.chair) +
        column('Tech that helps', stage.tech) +
      '</div>' +
      '<div class="journey-nav">' +
        '<button class="btn btn-ghost btn-small" type="button" data-step="-1"' + (index === 0 ? ' disabled' : '') + '>Previous stage</button>' +
        '<button class="btn btn-primary btn-small" type="button" data-step="1"' + (index === stages.length - 1 ? ' disabled' : '') + '>Next stage</button>' +
      '</div>';
  }

  function column(title, text) {
    return '<div><h4 class="journey-column-title">' + title + '</h4><p>' + utils.escapeHTML(text) + '</p></div>';
  }

  // Previous and next buttons inside the panel
  panel.addEventListener('click', function (event) {
    var button = event.target.closest('[data-step]');
    if (!button) {
      return;
    }
    var next = activeIndex + parseInt(button.getAttribute('data-step'), 10);
    if (next >= 0 && next < stages.length) {
      showStage(next, false);
    }
  });

  // Keep the line lined up if the window changes size
  window.addEventListener('resize', function () {
    showStage(activeIndex, false);
  });

  buildTabs();
  showStage(0, false);

  /* ---------- 2. Journey score ---------- */
  var list = document.getElementById('checklist');
  var meter = document.getElementById('score-meter');
  var number = document.getElementById('score-number');
  var label = document.getElementById('score-label');
  var tip = document.getElementById('score-tip');
  var reset = document.getElementById('score-reset');
  var saved = storage.get('journey-checks', []);

  var TIPS = {
    'Start here': 'Pick one step to improve this week. Small changes add up.',
    'Room to grow': 'A good start. Automatic confirmations and reminders are quick wins.',
    'A few bumps': 'You are halfway there. Look at what happens after the appointment.',
    'Smooth ride': 'Clients will notice. Next, make rebooking as easy as possible.',
    'Five star journey': 'Apple would be proud. Now ask your clients what they would change.'
  };

  data.journeyChecklist.forEach(function (text, index) {
    var item = document.createElement('li');
    var id = 'journey-check-' + index;
    var isChecked = saved.indexOf(index) !== -1;
    item.innerHTML =
      '<label class="check-option" for="' + id + '">' +
        '<input type="checkbox" id="' + id + '" value="' + index + '"' + (isChecked ? ' checked' : '') + '>' +
        '<span>' + utils.escapeHTML(text) + '</span>' +
      '</label>';
    list.appendChild(item);
  });

  function updateScore() {
    var boxes = list.querySelectorAll('input[type="checkbox"]');
    var checked = [];

    boxes.forEach(function (box) {
      if (box.checked) {
        checked.push(parseInt(box.value, 10));
      }
    });

    var result = utils.calculateJourneyScore(checked.length, boxes.length);
    meter.style.setProperty('--score', result.percent);
    number.textContent = result.percent;
    label.textContent = result.label;
    tip.textContent = TIPS[result.label];
    storage.set('journey-checks', checked);
  }

  list.addEventListener('change', updateScore);

  reset.addEventListener('click', function () {
    list.querySelectorAll('input[type="checkbox"]').forEach(function (box) {
      box.checked = false;
    });
    updateScore();
  });

  updateScore();
}());
