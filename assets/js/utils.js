/* ==========================================================
   Designed to Wonder: utility functions
   ----------------------------------------------------------
   Small, pure functions used by every page script.
   "Pure" means they only work with what they are given and
   return a result, without touching the page. That makes them
   easy to test automatically with Jest (see tests/utils.test.js).

   In the browser they are available as window.DTW.utils.
   In Node (Jest) they are exported with module.exports.
   ========================================================== */
(function (root) {
  'use strict';

  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = MS_PER_SECOND * 60;
  var MS_PER_HOUR = MS_PER_MINUTE * 60;
  var MS_PER_DAY = MS_PER_HOUR * 24;

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /* ---------- Safe HTML ---------- */

  /**
   * Escape text before it is placed inside HTML, so that text typed
   * by a user (for example a question) can never run as code.
   */
  function escapeHTML(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------- Dates and countdowns ---------- */

  /** Add a leading zero to numbers below 10: 7 becomes "07". */
  function padTwo(number) {
    return number < 10 ? '0' + number : String(number);
  }

  /**
   * Work out how long is left until a date.
   * Returns whole days, hours, minutes and seconds, plus the total
   * in milliseconds. Never returns negative numbers.
   */
  function getTimeRemaining(target, now) {
    var targetTime = new Date(target).getTime();
    var nowTime = new Date(now === undefined ? Date.now() : now).getTime();

    if (isNaN(targetTime) || isNaN(nowTime)) {
      return null;
    }

    var total = Math.max(0, targetTime - nowTime);

    return {
      total: total,
      days: Math.floor(total / MS_PER_DAY),
      hours: Math.floor((total % MS_PER_DAY) / MS_PER_HOUR),
      minutes: Math.floor((total % MS_PER_HOUR) / MS_PER_MINUTE),
      seconds: Math.floor((total % MS_PER_MINUTE) / MS_PER_SECOND)
    };
  }

  /** Turn an ISO date such as "2026-11-19" into "19 Nov 2026". */
  function formatShortDate(isoDate) {
    var parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(isoDate));
    if (!parts) {
      return '';
    }
    var monthIndex = parseInt(parts[2], 10) - 1;
    if (monthIndex < 0 || monthIndex > 11) {
      return '';
    }
    return parseInt(parts[3], 10) + ' ' + MONTHS[monthIndex] + ' ' + parts[1];
  }

  /* ---------- T-Minus launches ---------- */

  /**
   * Decide which state a launch is in:
   *   "landed"    the exact date has passed
   *   "countdown" there is an exact date still to come
   *   "window"    only a confirmed time window, no exact date
   *   "rumoured"  reported by the press, not confirmed
   */
  function getLaunchStatus(launch, now) {
    if (!launch) {
      return 'rumoured';
    }
    if (launch.confirmed === false) {
      return 'rumoured';
    }
    if (launch.date) {
      var remaining = getTimeRemaining(launch.date, now);
      if (remaining === null) {
        return 'window';
      }
      return remaining.total === 0 ? 'landed' : 'countdown';
    }
    return 'window';
  }

  /**
   * Sort launches so the most useful ones come first:
   * soonest countdowns, then ones that just landed, then windows,
   * then rumours. Returns a new array and leaves the original alone.
   */
  function sortLaunches(launches, now) {
    var order = { countdown: 0, landed: 1, window: 2, rumoured: 3 };

    return launches.slice().sort(function (a, b) {
      var statusA = getLaunchStatus(a, now);
      var statusB = getLaunchStatus(b, now);

      if (statusA !== statusB) {
        return order[statusA] - order[statusB];
      }
      if (statusA === 'countdown') {
        return new Date(a.date) - new Date(b.date);
      }
      if (statusA === 'landed') {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  }

  /** Find the next launch with an exact date still to come. */
  function getNextLaunch(launches, now) {
    var upcoming = launches.filter(function (launch) {
      return getLaunchStatus(launch, now) === 'countdown';
    });
    return sortLaunches(upcoming, now)[0] || null;
  }

  /* ---------- Filtering and search ---------- */

  /** Keep only items in a category. "all" (or nothing) keeps everything. */
  function filterByCategory(items, category) {
    if (!category || category === 'all') {
      return items.slice();
    }
    return items.filter(function (item) {
      return item.category === category;
    });
  }

  /**
   * Keep items where any of the named fields contains the search text.
   * Not case sensitive. Array fields (like tags) are searched too.
   */
  function searchItems(items, query, fields) {
    var text = String(query || '').trim().toLowerCase();
    if (!text) {
      return items.slice();
    }
    return items.filter(function (item) {
      return fields.some(function (field) {
        var value = item[field];
        if (Array.isArray(value)) {
          value = value.join(' ');
        }
        return String(value || '').toLowerCase().indexOf(text) !== -1;
      });
    });
  }

  /* ---------- Forms ---------- */

  /** A simple, readable email check: something@something.something */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || '').trim());
  }

  /**
   * Check the contact form. Returns an object with one message per
   * field that has a problem. An empty object means the form is fine.
   */
  function validateContactForm(values) {
    var errors = {};
    var name = String(values.name || '').trim();
    var email = String(values.email || '').trim();
    var message = String(values.message || '').trim();

    if (name.length < 2) {
      errors.name = 'Please enter your name.';
    }
    if (!email) {
      errors.email = 'Please enter your email address.';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email, like name@example.com.';
    }
    if (message.length < 10) {
      errors.message = 'Please write a message of at least 10 characters.';
    }
    return errors;
  }

  /**
   * Check a question sent to Wonder Why.
   * Returns an error message, or an empty string when it is fine.
   */
  function validateQuestion(question) {
    var text = String(question || '').trim();
    if (text.length < 8) {
      return 'Please ask a question of at least 8 characters.';
    }
    if (text.length > 200) {
      return 'Please keep your question under 200 characters.';
    }
    return '';
  }

  /* ---------- Client Side journey check ---------- */

  /**
   * Turn the number of ticked journey steps into a score and a label.
   */
  function calculateJourneyScore(checked, total) {
    if (!total || total < 1) {
      return { percent: 0, label: 'Start here' };
    }
    var safeChecked = Math.min(Math.max(0, checked), total);
    var percent = Math.round((safeChecked / total) * 100);
    var label;

    if (percent === 100) {
      label = 'Five star journey';
    } else if (percent >= 70) {
      label = 'Smooth ride';
    } else if (percent >= 40) {
      label = 'A few bumps';
    } else if (percent > 0) {
      label = 'Room to grow';
    } else {
      label = 'Start here';
    }
    return { percent: percent, label: label };
  }

  /* ---------- Reading ---------- */

  /** Estimate minutes to read some text at 200 words a minute. */
  function estimateReadingTime(text, wordsPerMinute) {
    var speed = wordsPerMinute || 200;
    var words = String(text || '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / speed));
  }

  /** How far through the page someone has scrolled, from 0 to 100. */
  function getScrollPercent(scrollTop, scrollHeight, viewportHeight) {
    var scrollable = scrollHeight - viewportHeight;
    if (scrollable <= 0) {
      return 100;
    }
    return Math.min(100, Math.max(0, Math.round((scrollTop / scrollable) * 100)));
  }

  var utils = {
    escapeHTML: escapeHTML,
    padTwo: padTwo,
    getTimeRemaining: getTimeRemaining,
    formatShortDate: formatShortDate,
    getLaunchStatus: getLaunchStatus,
    sortLaunches: sortLaunches,
    getNextLaunch: getNextLaunch,
    filterByCategory: filterByCategory,
    searchItems: searchItems,
    isValidEmail: isValidEmail,
    validateContactForm: validateContactForm,
    validateQuestion: validateQuestion,
    calculateJourneyScore: calculateJourneyScore,
    estimateReadingTime: estimateReadingTime,
    getScrollPercent: getScrollPercent
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
  } else {
    root.DTW = root.DTW || {};
    root.DTW.utils = utils;
  }
}(this));
