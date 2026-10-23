/* ==========================================================
   Automated tests for assets/js/utils.js
   Run them with: npm test
   ========================================================== */
const utils = require('../assets/js/utils.js');
const data = require('../assets/js/data.js');

// A fixed "now" so the tests give the same result every day
const NOW = '2026-10-23T12:00:00Z';

describe('escapeHTML', () => {
  test('turns HTML characters into safe text', () => {
    expect(utils.escapeHTML('<script>alert("hi")</script>'))
      .toBe('&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;');
  });

  test('handles apostrophes and ampersands', () => {
    expect(utils.escapeHTML("Tom & Jerry's")).toBe('Tom &amp; Jerry&#39;s');
  });

  test('returns an empty string for null or undefined', () => {
    expect(utils.escapeHTML(null)).toBe('');
    expect(utils.escapeHTML(undefined)).toBe('');
  });
});

describe('padTwo', () => {
  test('adds a zero to single digits', () => {
    expect(utils.padTwo(7)).toBe('07');
  });

  test('leaves two digit numbers alone', () => {
    expect(utils.padTwo(42)).toBe('42');
  });
});

describe('getTimeRemaining', () => {
  test('splits the time into days, hours, minutes and seconds', () => {
    const left = utils.getTimeRemaining('2026-10-25T14:03:04Z', NOW);
    expect(left.days).toBe(2);
    expect(left.hours).toBe(2);
    expect(left.minutes).toBe(3);
    expect(left.seconds).toBe(4);
  });

  test('never goes below zero once the date has passed', () => {
    const left = utils.getTimeRemaining('2020-01-01T00:00:00Z', NOW);
    expect(left.total).toBe(0);
    expect(left.days).toBe(0);
  });

  test('returns null for a date that cannot be read', () => {
    expect(utils.getTimeRemaining('not a date', NOW)).toBeNull();
  });
});

describe('formatShortDate', () => {
  test('formats an ISO date for reading', () => {
    expect(utils.formatShortDate('2026-11-19')).toBe('19 Nov 2026');
  });

  test('works with a full date and time', () => {
    expect(utils.formatShortDate('2026-10-23T08:00:00+01:00')).toBe('23 Oct 2026');
  });

  test('returns an empty string for bad input', () => {
    expect(utils.formatShortDate('soon')).toBe('');
    expect(utils.formatShortDate('2026-13-01')).toBe('');
  });
});

describe('getLaunchStatus', () => {
  test('a future exact date is a countdown', () => {
    expect(utils.getLaunchStatus({ date: '2026-11-19T00:00:00Z', confirmed: true }, NOW)).toBe('countdown');
  });

  test('a past exact date has landed', () => {
    expect(utils.getLaunchStatus({ date: '2026-10-01T00:00:00Z', confirmed: true }, NOW)).toBe('landed');
  });

  test('no exact date means a window', () => {
    expect(utils.getLaunchStatus({ window: 'Late 2027', confirmed: true }, NOW)).toBe('window');
  });

  test('anything not confirmed is a rumour, even with a date', () => {
    expect(utils.getLaunchStatus({ date: '2027-06-01', confirmed: false }, NOW)).toBe('rumoured');
  });
});

describe('sortLaunches and getNextLaunch', () => {
  const launches = [
    { id: 'rumour', window: '2027', confirmed: false },
    { id: 'later', date: '2026-12-01T00:00:00Z', confirmed: true },
    { id: 'landed', date: '2026-10-01T00:00:00Z', confirmed: true },
    { id: 'window', window: 'Late 2026', confirmed: true },
    { id: 'soon', date: '2026-11-01T00:00:00Z', confirmed: true }
  ];

  test('puts countdowns first, soonest first, then landed, windows and rumours', () => {
    const order = utils.sortLaunches(launches, NOW).map((launch) => launch.id);
    expect(order).toEqual(['soon', 'later', 'landed', 'window', 'rumour']);
  });

  test('does not change the original list', () => {
    utils.sortLaunches(launches, NOW);
    expect(launches[0].id).toBe('rumour');
  });

  test('finds the next launch with an exact date', () => {
    expect(utils.getNextLaunch(launches, NOW).id).toBe('soon');
  });

  test('returns null when nothing has an exact future date', () => {
    expect(utils.getNextLaunch([{ window: '2027', confirmed: true }], NOW)).toBeNull();
  });
});

describe('filterByCategory', () => {
  const items = [{ category: 'robots' }, { category: 'phones' }, { category: 'robots' }];

  test('keeps only the chosen category', () => {
    expect(utils.filterByCategory(items, 'robots')).toHaveLength(2);
  });

  test('"all" keeps everything', () => {
    expect(utils.filterByCategory(items, 'all')).toHaveLength(3);
  });

  test('an unknown category gives an empty list', () => {
    expect(utils.filterByCategory(items, 'boats')).toHaveLength(0);
  });
});

describe('searchItems', () => {
  const items = [
    { name: 'Tesla Cybercab', tags: ['robotaxi'] },
    { name: '1X NEO', tags: ['humanoid', 'home robot'] }
  ];

  test('finds matches in a text field, ignoring capitals', () => {
    expect(utils.searchItems(items, 'TESLA', ['name'])).toHaveLength(1);
  });

  test('finds matches inside a list of tags', () => {
    expect(utils.searchItems(items, 'humanoid', ['name', 'tags'])[0].name).toBe('1X NEO');
  });

  test('an empty search returns everything', () => {
    expect(utils.searchItems(items, '   ', ['name'])).toHaveLength(2);
  });

  test('no match returns an empty list', () => {
    expect(utils.searchItems(items, 'banana', ['name', 'tags'])).toHaveLength(0);
  });
});

describe('isValidEmail', () => {
  test.each(['name@example.com', 'lilian.e@uni.ac.uk', '  spaced@example.com  '])('accepts %s', (email) => {
    expect(utils.isValidEmail(email)).toBe(true);
  });

  test.each(['', 'abc@', 'abc@example', 'no at sign.com', 'two words@example.com'])('rejects "%s"', (email) => {
    expect(utils.isValidEmail(email)).toBe(false);
  });
});

describe('validateContactForm', () => {
  test('a complete form has no errors', () => {
    const errors = utils.validateContactForm({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'I would love a booking website.'
    });
    expect(errors).toEqual({});
  });

  test('an empty form has an error for every field', () => {
    const errors = utils.validateContactForm({});
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name']);
  });

  test('explains a badly typed email', () => {
    const errors = utils.validateContactForm({ name: 'Ada', email: 'ada@', message: 'Hello there, Lilian!' });
    expect(errors.email).toMatch(/valid email/);
  });

  test('a message of only spaces is not accepted', () => {
    const errors = utils.validateContactForm({ name: 'Ada', email: 'ada@example.com', message: '            ' });
    expect(errors.message).toBeDefined();
  });
});

describe('validateQuestion', () => {
  test('accepts a normal question', () => {
    expect(utils.validateQuestion('Wonder why the sky is blue?')).toBe('');
  });

  test('rejects a question that is too short', () => {
    expect(utils.validateQuestion('Why?')).toMatch(/at least 8/);
  });

  test('rejects a question that is too long', () => {
    expect(utils.validateQuestion('a'.repeat(201))).toMatch(/under 200/);
  });
});

describe('calculateJourneyScore', () => {
  test.each([
    [0, 8, 0, 'Start here'],
    [1, 8, 13, 'Room to grow'],
    [4, 8, 50, 'A few bumps'],
    [6, 8, 75, 'Smooth ride'],
    [8, 8, 100, 'Five star journey']
  ])('%i of %i ticked gives %i%% and "%s"', (checked, total, percent, label) => {
    expect(utils.calculateJourneyScore(checked, total)).toEqual({ percent, label });
  });

  test('never goes above 100% or below 0%', () => {
    expect(utils.calculateJourneyScore(12, 8).percent).toBe(100);
    expect(utils.calculateJourneyScore(-3, 8).percent).toBe(0);
  });

  test('copes with an empty checklist', () => {
    expect(utils.calculateJourneyScore(0, 0).percent).toBe(0);
  });
});

describe('estimateReadingTime', () => {
  test('rounds up to whole minutes', () => {
    expect(utils.estimateReadingTime('word '.repeat(450))).toBe(3);
  });

  test('is never less than one minute', () => {
    expect(utils.estimateReadingTime('Hi')).toBe(1);
    expect(utils.estimateReadingTime('')).toBe(1);
  });
});

describe('getScrollPercent', () => {
  test('works out how far down the page someone is', () => {
    expect(utils.getScrollPercent(500, 2000, 1000)).toBe(50);
  });

  test('a page shorter than the screen counts as fully read', () => {
    expect(utils.getScrollPercent(0, 800, 1000)).toBe(100);
  });

  test('stays between 0 and 100', () => {
    expect(utils.getScrollPercent(5000, 2000, 1000)).toBe(100);
    expect(utils.getScrollPercent(-50, 2000, 1000)).toBe(0);
  });
});

/* ---------- Checking the content itself ---------- */
describe('site content in data.js', () => {
  test('every launch has the details a card needs', () => {
    data.launches.forEach((launch) => {
      expect(launch.id).toBeTruthy();
      expect(launch.name).toBeTruthy();
      expect(launch.summary).toBeTruthy();
      expect(launch.date || launch.window).toBeTruthy();
      expect(launch.source.url).toMatch(/^https:\/\//);
    });
  });

  test('every launch belongs to a category that has a filter button', () => {
    const categories = data.launchCategories.map((category) => category.id);
    data.launches.forEach((launch) => {
      expect(categories).toContain(launch.category);
    });
  });

  test('launch ids are unique, so the watchlist cannot mix them up', () => {
    const ids = data.launches.map((launch) => launch.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every post section has a standard and a simple version', () => {
    data.posts.forEach((post) => {
      post.sections.forEach((section) => {
        expect(section.standard.length).toBeGreaterThan(0);
        expect(section.simple.length).toBeGreaterThan(0);
      });
    });
  });

  test('post slugs are unique, so every link opens the right post', () => {
    const slugs = data.posts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test('there are six journey stages, each with three points of view', () => {
    expect(data.journeyStages).toHaveLength(6);
    data.journeyStages.forEach((stage) => {
      expect(stage.apple && stage.chair && stage.tech).toBeTruthy();
    });
  });
});
