'use strict';

// Normalisation also makes common chemistry notation searchable as plain text.
function publicationMatches(text, query) {
  const normalise = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g, 'o').replace(/Ø/g, 'O').toLowerCase();
  const haystack = normalise(text);
  return normalise(query).trim().split(/\s+/).every(word => haystack.includes(word));
}

(function () {
  const form = document.getElementById('publication-search');
  if (!form) return;
  const input = document.getElementById('pub-search');
  const counter = document.getElementById('pub-counter');
  const empty = document.getElementById('no-results');
  const entries = Array.from(document.querySelectorAll('.pub-entry'));
  const groups = Array.from(document.querySelectorAll('.year-block'));
  const jumps = Array.from(document.querySelectorAll('.year-links a'));
  const initialCount = counter.textContent;
  // Index what a reader sees, not the hidden BibTeX (whose field names would match almost every query).
  const searchable = entries.map(entry => ({
    entry,
    text: Array.from(entry.querySelectorAll('h3, .pub-authors, .pub-citation, .pub-meta')).map(node => node.textContent).join(' ')
  }));

  function filter() {
    let count = 0;
    searchable.forEach(({ entry, text }) => {
      entry.hidden = !publicationMatches(text, input.value);
      if (!entry.hidden) count++;
    });
    groups.forEach(group => {
      group.hidden = !Array.from(group.querySelectorAll('.pub-entry')).some(entry => !entry.hidden);
    });
    jumps.forEach(link => {
      link.hidden = document.querySelector(link.getAttribute('href')).hidden;
    });
    const yearNav = document.querySelector('.year-links');
    if (yearNav) yearNav.hidden = jumps.every(link => link.hidden);
    empty.hidden = count !== 0;
    counter.textContent = input.value.trim() ? `Showing ${count} of ${entries.length} publications` : initialCount;
    // Keep the query in the address so a filtered list can be shared.
    const url = new URL(window.location.href);
    if (input.value.trim()) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
  }

  form.addEventListener('submit', event => event.preventDefault());
  input.addEventListener('input', filter);
  const clear = event => {
    event.preventDefault();
    input.value = '';
    filter();
    input.focus();
  };
  form.addEventListener('reset', clear);
  document.querySelectorAll('[data-clear]').forEach(button => button.addEventListener('click', clear));
  form.hidden = false;
  const initial = new URLSearchParams(window.location.search).get('q');
  if (initial) {
    input.value = initial;
    filter();
  }
})();
