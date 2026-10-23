/* ==========================================================
   Designed to Wonder: shared behaviour for every page
   ----------------------------------------------------------
   1. Safe browser storage
   2. Light and dark theme switch
   3. Mobile navigation menu
   4. Scroll reveal animation
   5. Newsletter sign up (in the footer of every page)
   6. Footer year
   ========================================================== */
(function () {
  'use strict';

  var DTW = window.DTW = window.DTW || {};
  var utils = DTW.utils;

  // Lets the CSS know JavaScript is running (used by the reveal effect)
  document.documentElement.classList.add('js');

  /* ---------- 1. Safe browser storage ----------
     localStorage can be blocked (private windows, strict settings).
     Every read and write is wrapped so the site keeps working. */
  DTW.storage = {
    get: function (key, fallback) {
      try {
        var value = window.localStorage.getItem('dtw-' + key);
        return value === null ? fallback : JSON.parse(value);
      } catch (error) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem('dtw-' + key, JSON.stringify(value));
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  /* ---------- 2. Light and dark theme ---------- */
  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      var isLight = theme === 'light';
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }

  function setupTheme() {
    applyTheme(DTW.storage.get('theme', 'dark'));

    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        var isLight = document.documentElement.getAttribute('data-theme') === 'light';
        var next = isLight ? 'dark' : 'light';
        applyTheme(next);
        DTW.storage.set('theme', next);
      });
    });
  }

  /* ---------- 3. Mobile navigation ---------- */
  function setupNavigation() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('main-nav');
    if (!toggle || !nav) {
      return;
    }

    function setOpen(isOpen) {
      nav.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close with the Escape key and give focus back to the button
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close when a link is chosen or someone clicks outside the menu
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('click', function (event) {
      if (nav.classList.contains('is-open') && !event.target.closest('.site-header')) {
        setOpen(false);
      }
    });
  }

  /* ---------- 4. Scroll reveal ---------- */
  function setupReveal() {
    var items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  // Page scripts call this after adding new cards, so they reveal too
  DTW.refreshReveal = setupReveal;

  /* ---------- 5. Newsletter sign up ---------- */
  function setupNewsletter() {
    document.querySelectorAll('.js-newsletter').forEach(function (form) {
      var input = form.querySelector('input[type="email"]');
      var status = form.parentElement.querySelector('.form-status');
      var saved = DTW.storage.get('newsletter-email', '');

      function showStatus(message, type) {
        status.textContent = message;
        status.className = 'form-status is-' + type;
      }

      if (saved) {
        showStatus('You are on the list as ' + saved + '. Thank you for wondering with me.', 'success');
      }

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var email = input.value.trim();

        if (!utils.isValidEmail(email)) {
          input.setAttribute('aria-invalid', 'true');
          showStatus('Please enter a valid email address, like name@example.com.', 'error');
          input.focus();
          return;
        }

        input.removeAttribute('aria-invalid');
        DTW.storage.set('newsletter-email', email);
        form.reset();
        showStatus('You are on the list as ' + email + '. Thank you for wondering with me.', 'success');
      });
    });
  }

  /* ---------- 6. Footer year ---------- */
  function setupYear() {
    document.querySelectorAll('.js-year').forEach(function (element) {
      element.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupTheme();
    setupNavigation();
    setupReveal();
    setupNewsletter();
    setupYear();
  });
}());
