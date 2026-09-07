/**
 * Academic Portfolio JavaScript
 * Harender S. Dhattarwal
 * Fast, pure vanilla JS with zero external dependencies
 */

(function () {
  'use strict';

  // ── 1. Theme Management (Light / Dark) ───────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('hsd_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getActiveTheme() {
    if (storedTheme) return storedTheme;
    return prefersDark.matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hsd_theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const sunIcon = themeToggle.querySelector('.icon-sun');
    const moonIcon = themeToggle.querySelector('.icon-moon');
    if (!sunIcon || !moonIcon) return;

    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Initialize theme
  setTheme(getActiveTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  prefersDark.addEventListener('change', function (e) {
    if (!localStorage.getItem('hsd_theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ── 2. Mobile Navigation Drawer ──────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navOverlay = document.getElementById('nav-overlay');

  if (navToggle && navOverlay) {
    navToggle.addEventListener('click', function () {
      const isOpen = navOverlay.classList.contains('open');
      if (isOpen) {
        navOverlay.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navOverlay.classList.add('open');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking an overlay link
    navOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navOverlay.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navOverlay.classList.contains('open')) {
        navOverlay.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── 3. Nav Scroll Shadow ─────────────────────────────────
  const mainNav = document.getElementById('main-nav');
  if (mainNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 15) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ── 4. Active Nav Highlighting ───────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__links a, .nav__overlay-links a');
  navLinks.forEach(function (link) {
    const href = (link.getAttribute('href') || '').split('#')[0];
    const linkPath = href.split('/').pop() || 'index.html';
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── 5. Publications Filter & Search ──────────────────────
  const searchInput = document.getElementById('pub-search');
  const yearFilterBtns = document.querySelectorAll('#year-filters .filter-btn');
  const topicFilterBtns = document.querySelectorAll('#topic-filters .filter-btn');
  const pubItems = document.querySelectorAll('.pub-item[data-pub-item]');
  const pubCountBadge = document.getElementById('pub-count');
  const yearGroups = document.querySelectorAll('.year-group');

  if (pubItems.length > 0) {
    let selectedYear = 'all';
    let selectedTopic = 'all';
    let searchQuery = '';

    function applyPubFilters() {
      let visibleCount = 0;

      pubItems.forEach(function (item) {
        const itemYear = item.getAttribute('data-year') || '';
        const itemTopic = item.getAttribute('data-topic') || '';
        const textContent = (item.textContent || '').toLowerCase();

        const matchYear = (selectedYear === 'all' || itemYear === selectedYear);
        const matchTopic = (selectedTopic === 'all' || itemTopic.includes(selectedTopic));
        const matchSearch = (!searchQuery || textContent.includes(searchQuery));

        if (matchYear && matchTopic && matchSearch) {
          item.style.display = 'grid';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      // Show/hide year group containers based on visible children
      yearGroups.forEach(function (group) {
        const hasVisible = Array.from(group.querySelectorAll('.pub-item')).some(function (item) {
          return item.style.display !== 'none';
        });
        group.style.display = hasVisible ? 'block' : 'none';
      });

      if (pubCountBadge) {
        pubCountBadge.textContent = visibleCount + ' of ' + pubItems.length + ' publications';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = (e.target.value || '').trim().toLowerCase();
        applyPubFilters();
      });
    }

    yearFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        yearFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedYear = btn.getAttribute('data-year') || 'all';
        applyPubFilters();
      });
    });

    topicFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        topicFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTopic = btn.getAttribute('data-topic') || 'all';
        applyPubFilters();
      });
    });
  }

  // ── 6. Copy BibTeX Utility ───────────────────────────────
  document.querySelectorAll('[data-copy-bibtex]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const bibtex = btn.getAttribute('data-copy-bibtex');
      if (!bibtex) return;
      navigator.clipboard.writeText(bibtex).then(function () {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        prompt('Copy BibTeX citation:', bibtex);
      });
    });
  });

})();
