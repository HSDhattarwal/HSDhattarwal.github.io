# Harender S. Dhattarwal — Academic Portfolio

Personal academic website for **Dr. Harender S. Dhattarwal**, Postdoctoral Research Associate at Cornell University (Department of Chemical and Biomolecular Engineering).

🌐 **Live site:** [hsdhattarwal.github.io](https://hsdhattarwal.github.io/)

---

## Maintaining the site

Static HTML and CSS with self-hosted fonts; no framework, CDN or runtime build step. Design rules are in `DESIGN.md`.

- **Preview:** `python3 -m http.server 8841 --bind 127.0.0.1`, then open `http://127.0.0.1:8841/`.
- **Publications:** edit `publications_data.json`, then run `python3 _scripts/build_publications.py` to rebuild `publications.html` and `assets/publications.bib`.
- **Tests:** `python3 -m unittest discover -s _tests -v` and `node --test _tests/search.test.cjs`.
- **Home movie:** the web versions live in `assets/media/`. The source render `assets/AgI-movie.gif` is too large for GitHub and is gitignored.

## License

Content © 2026 Harender S. Dhattarwal. Code available under the MIT License.
