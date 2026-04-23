/* ============================================================
   main.js — All enhancements
   1. Mobile overlay nav
   2. Nav scroll shadow
   3. Active nav link detection
   4. Scroll reveal (fade-up via IntersectionObserver)
   5. Hero network canvas
   6. Publications filter
   7. Smooth anchor scroll with nav offset
   8. External link safety
   ============================================================ */
"use strict";

/* ── 1. Mobile Nav Overlay ───────────────────────────────── */
(function () {
  const toggle  = document.querySelector('.nav__toggle');
  const overlay = document.querySelector('.nav__overlay');
  const close   = document.querySelector('.nav__overlay-close');
  if (!toggle || !overlay) return;

  function openNav() {
    overlay.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    overlay.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () =>
    overlay.classList.contains('open') ? closeNav() : openNav()
  );
  if (close) close.addEventListener('click', closeNav);
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeNav();
  });
})();

/* ── 2. Nav Scroll Shadow ────────────────────────────────── */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── 3. Active Nav Link ──────────────────────────────────── */
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__overlay-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop().split('#')[0];
    const match = href === page || (page === '' && href === 'index.html');
    a.classList.toggle('active', match);
  });
})();

/* ── 4. Scroll Reveal (fade-up) ──────────────────────────── */
(function () {
  const els = document.querySelectorAll('.fade-up, .reveal');
  if (!els.length) return;

  // Assign stagger delays to sibling groups
  document.querySelectorAll(
    '.snap-grid, .pub-row-list, .collab-grid, .skills-groups, .filter-btns, .bio-social-links'
  ).forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.setProperty('--delay', `${i * 90}ms`);
      child.classList.add('fade-up');
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.style.getPropertyValue('--delay') || '0ms';
      setTimeout(() => el.classList.add('visible'), parseInt(delay) || 0);
      io.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => io.observe(el));
})();

/* ── 5. Hero Network Canvas ──────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes, raf;
  const FADE = 'rgba(39,174,96,';
  const N = 55, DIST = 130, SPD = 0.28;

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  function mkNodes() {
    nodes = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPD * 2, vy: (Math.random() - 0.5) * SPD * 2,
      r: Math.random() * 2 + 1.5, p: Math.random() * Math.PI * 2,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy; n.p += 0.025;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < DIST) {
        ctx.beginPath(); ctx.strokeStyle = FADE + (1 - d / DIST) * 0.35 + ')';
        ctx.lineWidth = 0.8; ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
      }
    }
    nodes.forEach(n => {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (1 + 0.18 * Math.sin(n.p)), 0, Math.PI * 2);
      ctx.fillStyle = FADE + '0.65)'; ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }
  const ro = new ResizeObserver(() => { resize(); if (!nodes) mkNodes(); });
  ro.observe(canvas); resize(); mkNodes(); draw();
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else draw(); });
})();

/* ── 6. Publications Filter ──────────────────────────────── */
(function () {
  let activeYear = 'all', activeTopic = 'all';
  const items = document.querySelectorAll('.pub-item[data-year]');
  if (!items.length) return;
  const yearSects = document.querySelectorAll('.pub-year-section');
  const noResults = document.getElementById('pub-no-results');
  const countEl  = document.getElementById('visible-count');

  function applyFilters() {
    let visible = 0;
    items.forEach(item => {
      const show = (activeYear  === 'all' || item.dataset.year  === activeYear) &&
                   (activeTopic === 'all' || item.dataset.topic === activeTopic);
      item.classList.toggle('filtered-out', !show);
      if (show) visible++;
    });
    yearSects.forEach(sec => {
      sec.style.display = sec.querySelectorAll('.pub-item:not(.filtered-out)').length ? '' : 'none';
    });
    if (countEl) countEl.textContent = visible;
    if (noResults) noResults.classList.toggle('visible', visible === 0);
  }

  document.querySelectorAll('.filter-btn[data-year]').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-year]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); activeYear = btn.dataset.year; applyFilters();
    })
  );
  document.querySelectorAll('.filter-btn[data-topic]').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-topic]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); activeTopic = btn.dataset.topic; applyFilters();
    })
  );
})();

/* ── 7. Smooth Anchor Scroll (80px nav offset) ───────────── */
(function () {
  const NAV_OFFSET = 80;

  function scrollToAnchor(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // Handle links with #hash on same page
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const [path, hash] = href.split('#');
    if (!hash) return;
    // Same-page anchor
    const isSamePage = !path || path === window.location.pathname.split('/').pop();
    if (isSamePage) {
      e.preventDefault();
      scrollToAnchor(hash);
      // Update URL without jump
      history.pushState(null, '', `#${hash}`);
    }
  });

  // Handle page load with #hash in URL
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => setTimeout(() => scrollToAnchor(id), 80));
  }
})();

/* ── 8. Stats Bar Count-Up ───────────────────────────────── */
(function () {
  const statEls = document.querySelectorAll('[data-count]');
  if (!statEls.length) return;
  let animated = false;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateAll() {
    if (animated) return; animated = true;
    const dur = 1600;
    statEls.forEach(el => {
      const target = +el.dataset.count, start = +(el.dataset.start || 0);
      let t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        const prog = Math.min((ts - t0) / dur, 1);
        el.textContent = Math.round(start + (target - start) * easeOut(prog)).toLocaleString();
        if (prog < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(step);
    });
  }

  const io = new IntersectionObserver(
    entries => { if (entries[0].isIntersecting) { animateAll(); io.disconnect(); } },
    { threshold: 0.4 }
  );
  const bar = document.getElementById('stats-bar');
  if (bar) io.observe(bar);
})();

/* ── 9. TCCB own-talk highlight ──────────────────────────── */
document.querySelectorAll('.schedule-table tbody tr').forEach(tr => {
  if (tr.querySelector('.td-speaker')?.textContent.includes('Harender Dhattarwal'))
    tr.classList.add('own-talk');
});

/* ── 10. External links ──────────────────────────────────── */
document.querySelectorAll('a[href^="http"]').forEach(a => {
  if (!a.href.includes(window.location.hostname)) {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  }
});
