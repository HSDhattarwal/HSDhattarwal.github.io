const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

// Exercise the same pure text matcher that the browser uses.
const context = {
  document: { getElementById: () => null, querySelectorAll: () => [], documentElement: { setAttribute() {} } },
  localStorage: { getItem: () => null, setItem() {} },
  window: { matchMedia: () => ({ matches: false, addEventListener() {} }) }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/main.js'), 'utf8'), context);

test('publication search is case-insensitive, accent-insensitive, and treats all words as required', () => {
  assert.equal(typeof context.publicationMatches, 'function');
  assert.equal(context.publicationMatches('Brønsted acidity — JACS 2025', 'JACS 2025'), true);
  assert.equal(context.publicationMatches('Dielectric saturation in water 2023', 'water 2025'), false);
  assert.equal(context.publicationMatches('Harender S. Dhattarwal', ' DHATTARWAL '), true);
  assert.equal(context.publicationMatches('Brønsted acidity', 'bronsted'), true);
  assert.equal(context.publicationMatches('Li₃N electrolyte', 'li3n'), true);
  assert.equal(context.publicationMatches('Dielectric saturation', ''), true);
  assert.equal(context.publicationMatches('Dielectric saturation', '<script>'), false);
});
