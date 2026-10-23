/* ==========================================================
   Designed to Wonder: Built by Lilian page
   ----------------------------------------------------------
   1. Project showcases built from data.js, each with
      Overview, Features and Tech tabs
   2. Contact form with validation. When the message is valid,
      the visitor's own email app opens with it ready to send,
      so no server or third party service is needed.
   ========================================================== */
(function () {
  'use strict';

  var utils = window.DTW.utils;
  var data = window.DTW.data;

  var NEW_TAB = '<span class="visually-hidden"> (opens in a new tab)</span>';

  /* ---------- 1. Projects ---------- */
  var list = document.getElementById('project-list');

  function projectHTML(project, index) {
    var id = utils.escapeHTML(project.id);
    var name = utils.escapeHTML(project.name);

    var features = project.features.map(function (feature) {
      return '<li>' + utils.escapeHTML(feature) + '</li>';
    }).join('');

    var tech = project.tech.map(function (item) {
      return '<li><span class="badge">' + utils.escapeHTML(item) + '</span></li>';
    }).join('');

    function tab(key, label, selected) {
      return '<button class="chip" type="button" role="tab" id="' + id + '-tab-' + key + '" aria-controls="' + id + '-panel-' + key +
        '" aria-selected="' + selected + '" tabindex="' + (selected ? '0' : '-1') + '">' + label + '</button>';
    }

    function panel(key, content, selected) {
      return '<div class="tab-panel" role="tabpanel" id="' + id + '-panel-' + key + '" aria-labelledby="' + id + '-tab-' + key + '"' +
        (selected ? '' : ' hidden') + '>' + content + '</div>';
    }

    return '<article class="glass project" aria-labelledby="' + id + '-title">' +
        '<div class="project-media">' +
          '<div class="browser-bar" aria-hidden="true"><span></span><span></span><span></span></div>' +
          '<img src="' + utils.escapeHTML(project.image) + '" alt="' + utils.escapeHTML(project.imageAlt) +
            '" width="1200" height="750" loading="' + (index === 0 ? 'eager' : 'lazy') + '">' +
        '</div>' +
        '<div>' +
          '<p class="eyebrow">' + utils.padTwo(index + 1) + ' // ' + utils.escapeHTML(project.type) + '</p>' +
          '<span class="badge badge-landed">' + utils.escapeHTML(project.status) + '</span>' +
          '<h3 id="' + id + '-title" class="project-title">' + name + '</h3>' +
          '<div class="tabs" role="tablist" aria-label="' + name + ' details">' +
            tab('overview', 'Overview', true) + tab('features', 'Features', false) + tab('tech', 'Tech', false) +
          '</div>' +
          panel('overview', '<p>' + utils.escapeHTML(project.summary) + '</p>', true) +
          panel('features', '<ul class="feature-list">' + features + '</ul>', false) +
          panel('tech', '<ul class="tech-list">' + tech + '</ul>', false) +
          '<div class="project-links">' +
            '<a class="btn btn-primary btn-small" href="' + utils.escapeHTML(project.liveUrl) + '" target="_blank" rel="noopener noreferrer">View live site<span class="visually-hidden">: ' + name + '</span>' + NEW_TAB + '</a>' +
            '<a class="btn btn-ghost btn-small" href="' + utils.escapeHTML(project.repoUrl) + '" target="_blank" rel="noopener noreferrer">See the code<span class="visually-hidden">: ' + name + '</span>' + NEW_TAB + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function selectTab(tablist, tab, moveFocus) {
    tablist.querySelectorAll('[role="tab"]').forEach(function (item) {
      var isActive = item === tab;
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !isActive;
    });
    if (moveFocus) {
      tab.focus();
    }
  }

  list.innerHTML = data.projects.map(projectHTML).join('');

  list.addEventListener('click', function (event) {
    var tab = event.target.closest('[role="tab"]');
    if (tab) {
      selectTab(tab.parentElement, tab, false);
    }
  });

  // Left and right arrow keys move between tabs
  list.addEventListener('keydown', function (event) {
    var tab = event.target.closest('[role="tab"]');
    if (!tab || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) {
      return;
    }
    var tabs = Array.prototype.slice.call(tab.parentElement.querySelectorAll('[role="tab"]'));
    var step = event.key === 'ArrowRight' ? 1 : -1;
    var next = tabs[(tabs.indexOf(tab) + step + tabs.length) % tabs.length];
    event.preventDefault();
    selectTab(tab.parentElement, next, true);
  });

  /* ---------- 2. Contact form ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  var FIELDS = ['name', 'email', 'message'];

  function showErrors(errors) {
    FIELDS.forEach(function (field) {
      var input = document.getElementById('contact-' + field);
      var message = document.getElementById('contact-' + field + '-error');
      if (errors[field]) {
        input.setAttribute('aria-invalid', 'true');
        message.textContent = errors[field];
      } else {
        input.removeAttribute('aria-invalid');
        message.textContent = '';
      }
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var values = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      message: form.elements.message.value
    };
    var errors = utils.validateContactForm(values);
    showErrors(errors);

    var firstProblem = FIELDS.filter(function (field) {
      return errors[field];
    })[0];

    if (firstProblem) {
      status.className = 'form-status is-error';
      status.textContent = 'Please check the highlighted fields.';
      document.getElementById('contact-' + firstProblem).focus();
      return;
    }

    var subject = 'Website enquiry from ' + values.name.trim();
    var bodyText = values.message.trim() + '\n\nFrom: ' + values.name.trim() + ' (' + values.email.trim() + ')';

    status.className = 'form-status is-success';
    status.textContent = 'Thank you, ' + values.name.trim() + '! Your email app is opening with your message ready to send.';

    window.location.href = 'mailto:' + form.getAttribute('data-email') +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(bodyText);
    form.reset();
  });
}());
