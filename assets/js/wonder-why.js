/* ==========================================================
   Designed to Wonder: Wonder Why page
   ----------------------------------------------------------
   The page has two views:
     List view     every question, with topic filter and search
     Article view  one question, opened with ?post=its-slug
   Plus:
     - "Explain it simply" switch (remembered for next time)
     - reading time and a reading progress bar
     - a vote at the end of each post (remembered per post)
     - an "ask a question" form with a saved list of questions
   ========================================================== */
(function () {
  'use strict';

  var utils = window.DTW.utils;
  var data = window.DTW.data;
  var storage = window.DTW.storage;

  var listView = document.getElementById('list-view');
  var articleView = document.getElementById('article-view');
  var params = new URLSearchParams(window.location.search);
  var slug = params.get('post');

  function categoryLabel(id) {
    var match = data.postCategories.filter(function (category) {
      return category.id === id;
    })[0];
    return match ? match.label : '';
  }

  function postText(post, simple) {
    return [post.intro].concat(post.sections.map(function (section) {
      return section.heading + ' ' + (simple ? section.simple : section.standard);
    })).join(' ');
  }

  /* ==========================================================
     List view
     ========================================================== */
  function setupList() {
    var grid = document.getElementById('post-grid');
    var count = document.getElementById('post-count');
    var filters = document.getElementById('post-filters');
    var search = document.getElementById('post-search');
    var state = { category: 'all', query: '' };

    function cardHTML(post) {
      var minutes = utils.estimateReadingTime(postText(post, false));
      return '<a class="glass holo-edge card card-link post-card' + (post.featured ? ' is-featured' : '') +
        '" href="wonder-why.html?post=' + encodeURIComponent(post.slug) + '">' +
          '<p class="post-meta"><span>Issue ' + utils.padTwo(post.issue) + '</span><span>' +
            utils.escapeHTML(categoryLabel(post.category)) + '</span><span>' + minutes + ' min read</span></p>' +
          '<h3>' + utils.escapeHTML(post.question) + '</h3>' +
          '<p>' + utils.escapeHTML(post.intro) + '</p>' +
          '<span class="card-number" aria-hidden="true">?</span>' +
        '</a>';
    }

    function render() {
      var list = utils.filterByCategory(data.posts, state.category);
      list = utils.searchItems(list, state.query, ['question', 'intro']);

      grid.innerHTML = list.length ? list.map(cardHTML).join('') :
        '<p class="glass empty-state">No questions match that search yet. Why not ask it below?</p>';
      count.textContent = 'Showing ' + list.length + ' of ' + data.posts.length + ' questions';
    }

    filters.innerHTML = data.postCategories.map(function (category) {
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

    search.addEventListener('input', function () {
      state.query = search.value;
      render();
    });

    render();
  }

  /* ==========================================================
     Article view
     ========================================================== */
  function setupArticle(post) {
    var title = document.getElementById('article-title');
    var meta = document.getElementById('article-meta');
    var body = document.getElementById('article-body');
    var simpleSwitch = document.getElementById('simple-switch');
    var pollTitle = document.getElementById('poll-title');
    var pollOptions = document.getElementById('poll-options');
    var pollStatus = document.getElementById('poll-status');
    var bar = document.getElementById('reading-progress');
    var simple = storage.get('simple-mode', false);

    listView.hidden = true;
    articleView.hidden = false;
    document.title = post.question + ' | Designed to Wonder';
    title.textContent = post.question;
    pollTitle.textContent = post.closing;

    function renderBody() {
      var minutes = utils.estimateReadingTime(postText(post, simple));

      meta.innerHTML = '<span>Issue ' + utils.padTwo(post.issue) + '</span><span>' +
        utils.formatShortDate(post.date) + '</span><span>' + minutes + ' min read</span>';

      body.innerHTML = '<p class="article-intro">' + utils.escapeHTML(post.intro) + '</p>' +
        post.sections.map(function (section) {
          return '<h2>' + utils.escapeHTML(section.heading) + '</h2>' +
            '<p>' + utils.escapeHTML(simple ? section.simple : section.standard) + '</p>';
        }).join('');

      simpleSwitch.setAttribute('aria-checked', String(simple));
      articleView.classList.toggle('is-simple', simple);
    }

    simpleSwitch.addEventListener('click', function () {
      simple = !simple;
      storage.set('simple-mode', simple);
      renderBody();
    });

    /* ----- Vote ----- */
    var VOTE_TEXT = {
      agree: 'You agreed. Thank you for reading!',
      unsure: 'You are not sure yet. That is what wondering is for.',
      disagree: 'You see it differently. Send me your view with the form below.'
    };

    function showVote(vote) {
      pollOptions.querySelectorAll('[data-vote]').forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.getAttribute('data-vote') === vote));
      });
      pollStatus.textContent = vote ? VOTE_TEXT[vote] : '';
      pollStatus.className = 'form-status' + (vote ? ' is-success' : '');
    }

    pollOptions.addEventListener('click', function (event) {
      var button = event.target.closest('[data-vote]');
      if (!button) {
        return;
      }
      var votes = storage.get('votes', {});
      votes[post.slug] = button.getAttribute('data-vote');
      storage.set('votes', votes);
      showVote(votes[post.slug]);
    });

    /* ----- Reading progress bar ----- */
    function updateBar() {
      var percent = utils.getScrollPercent(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      bar.style.width = percent + '%';
    }

    window.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar);

    renderBody();
    showVote(storage.get('votes', {})[post.slug]);
    updateBar();
    title.focus();
  }

  function showNotFound() {
    var grid = document.getElementById('post-grid');
    setupList();
    grid.insertAdjacentHTML('beforebegin',
      '<p class="form-status is-error" role="alert">Sorry, that question could not be found. Here are all the questions instead.</p>');
  }

  /* ==========================================================
     Ask a question
     ========================================================== */
  function setupAsk() {
    var form = document.getElementById('ask-form');
    var input = document.getElementById('question-input');
    var error = document.getElementById('question-error');
    var status = document.getElementById('ask-status');
    var list = document.getElementById('question-list');
    var questions = storage.get('questions', []);

    function renderQuestions() {
      list.innerHTML = questions.map(function (question, index) {
        return '<li><span>' + utils.escapeHTML(question) + '</span>' +
          '<button class="link-button" type="button" data-remove="' + index + '">Remove' +
          '<span class="visually-hidden"> question: ' + utils.escapeHTML(question) + '</span></button></li>';
      }).join('');
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var message = utils.validateQuestion(input.value);

      if (message) {
        error.textContent = message;
        input.setAttribute('aria-invalid', 'true');
        status.textContent = '';
        input.focus();
        return;
      }

      error.textContent = '';
      input.removeAttribute('aria-invalid');
      questions.unshift(input.value.trim());
      storage.set('questions', questions);
      renderQuestions();
      form.reset();
      status.className = 'form-status is-success';
      status.textContent = 'Thank you! Your question has been saved below.';
    });

    list.addEventListener('click', function (event) {
      var button = event.target.closest('[data-remove]');
      if (!button) {
        return;
      }
      questions.splice(parseInt(button.getAttribute('data-remove'), 10), 1);
      storage.set('questions', questions);
      renderQuestions();
      status.className = 'form-status';
      status.textContent = 'Question removed.';
      input.focus();
    });

    renderQuestions();
  }

  /* ---------- Start ---------- */
  if (slug) {
    var post = data.posts.filter(function (item) {
      return item.slug === slug;
    })[0];

    if (post) {
      setupArticle(post);
    } else {
      showNotFound();
    }
  } else {
    setupList();
  }
  setupAsk();
}());
