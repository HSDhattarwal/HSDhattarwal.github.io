# Harender S. Dhattarwal — personal academic website

Static HTML, CSS, and a small progressively enhanced publication search. No JavaScript framework, CDN, analytics, or build step is needed to view the site.

## Public pages

- `index.html` — current Cornell affiliation, research introduction, award, selected papers, and brief background.
- `research.html` — concise research overview. The future-directions placeholder is an HTML comment, not rendered content.
- `publications.html` — full bibliography, generated from `publications_data.json`.
- `publications/index.html` — compatibility redirect for the previous `/publications/` address.
- `404.html` — not-found page; root-relative links also work for nested missing addresses on the GitHub user site.

Only Home, Research, and Publications appear in the navigation. The group page and CV page/PDFs were removed from the publishable directory. Their original copies are preserved in a sibling backup directory, outside this repository. Removing deployed files does not erase prior Git history or third-party caches.

## Local preview

From the repository:

```sh
python3 -m http.server 8841 --bind 127.0.0.1
```

Open `http://127.0.0.1:8841/`. The site also works when opening `index.html` directly. All typography uses deliberate local font stacks; no external font request is required.

## Updating publications

Edit `publications_data.json` and run:

```sh
python3 _scripts/build_publications.py
```

This rebuilds `publications.html` and `assets/publications.bib`. The template lives at `_templates/publications.html`. The JSON is the single source for the complete bibliography. Home and Research contain an intentionally small, editorial selection of paper links and should be reviewed separately when priorities change.

Title text is HTML-escaped when rendered; source markup is never executed. DOI and publication IDs are checked for invalid or duplicate values. BibTeX exports use UTF-8 and preserve title capitalisation (use a Unicode-capable bibliography toolchain). Chapter DOIs, publishers, publication years, and page ranges are backed by publisher-deposited metadata; editor information has not been invented.

Search matches all typed words, ignoring case and common diacritics. All records, year links, and native BibTeX disclosures remain usable without JavaScript. Search controls only appear after enhancement succeeds.

## Regression checks

```sh
python3 -m unittest discover -s _tests -v
node --test _tests/search.test.cjs
```

Python and Node are maintenance/test tools only, not runtime dependencies. `_scripts`, `_templates`, and `_tests` use underscore prefixes so GitHub Pages' default Jekyll build does not publish them.

## Publishing

The local revision is not automatically deployed. Review locally before committing and pushing to the GitHub Pages repository. A live-site check after deployment is needed to confirm the group and CV URLs return 404. Do not place backups under the repository root.

Content © 2026 Harender S. Dhattarwal.
