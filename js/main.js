/**
 * Academic Portfolio — Harender S. Dhattarwal
 * Clean, lightweight, dependency-free vanilla JS.
 */

(function () {
  'use strict';

  // 1. Theme Management
  const themeBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('hsd_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getTheme() {
    if (storedTheme) return storedTheme;
    return prefersDark.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hsd_theme', theme);
    if (!themeBtn) return;
    const sun = themeBtn.querySelector('.icon-sun');
    const moon = themeBtn.querySelector('.icon-moon');
    if (sun && moon) {
      if (theme === 'dark') {
        sun.style.display = 'block';
        moon.style.display = 'none';
        themeBtn.setAttribute('aria-label', 'Switch to light theme');
      } else {
        sun.style.display = 'none';
        moon.style.display = 'block';
        themeBtn.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }

  applyTheme(getTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  prefersDark.addEventListener('change', function (e) {
    if (!localStorage.getItem('hsd_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. Mobile Nav Toggle
  const mobileBtn = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', function () {
      const open = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 3. Publications Search and Filtering
  const searchInput = document.getElementById('pub-search');
  const yearButtons = document.querySelectorAll('[data-year-filter]');
  const topicButtons = document.querySelectorAll('[data-topic-filter]');
  const pubEntries = document.querySelectorAll('.pub-entry[data-year]');
  const yearBlocks = document.querySelectorAll('.year-block');
  const counterEl = document.getElementById('pub-counter');

  if (pubEntries.length > 0) {
    let activeYear = 'all';
    let activeTopic = 'all';
    let currentQuery = '';

    function filterPubs() {
      let count = 0;

      pubEntries.forEach(function (entry) {
        const year = entry.getAttribute('data-year') || '';
        const topic = entry.getAttribute('data-topic') || '';
        const text = entry.textContent.toLowerCase();

        const matchYear = (activeYear === 'all' || year === activeYear);
        const matchTopic = (activeTopic === 'all' || topic.includes(activeTopic));
        const matchQuery = (!currentQuery || text.includes(currentQuery));

        if (matchYear && matchTopic && matchQuery) {
          entry.style.display = 'grid';
          count++;
        } else {
          entry.style.display = 'none';
        }
      });

      // Toggle year section headers
      yearBlocks.forEach(function (block) {
        const visibleChild = Array.from(block.querySelectorAll('.pub-entry')).some(function (el) {
          return el.style.display !== 'none';
        });
        block.style.display = visibleChild ? 'block' : 'none';
      });

      if (counterEl) {
        counterEl.textContent = count + ' of ' + pubEntries.length + ' publications';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        currentQuery = (e.target.value || '').trim().toLowerCase();
        filterPubs();
      });
    }

    yearButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        yearButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeYear = btn.getAttribute('data-year-filter') || 'all';
        filterPubs();
      });
    });

    topicButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        topicButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTopic = btn.getAttribute('data-topic-filter') || 'all';
        filterPubs();
      });
    });
  }

  // 4. BibTeX Drawer Toggle & Copy
  document.querySelectorAll('[data-bibtex-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-bibtex-toggle');
      const drawer = document.getElementById(targetId);
      if (drawer) {
        drawer.classList.toggle('open');
      }
    });
  });

  document.querySelectorAll('[data-bibtex-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-bibtex-copy');
      const drawer = document.getElementById(targetId);
      if (drawer) {
        const code = drawer.querySelector('.bibtex-code');
        if (code) {
          navigator.clipboard.writeText(code.textContent.trim()).then(function () {
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(function () { btn.textContent = original; }, 1800);
          });
        }
      }
    });
  });

})();
