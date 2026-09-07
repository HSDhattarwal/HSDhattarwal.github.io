# Harender S. Dhattarwal — Academic Portfolio

Personal academic website for **Dr. Harender S. Dhattarwal**, Postdoctoral Research Associate at Rutgers University (Department of Chemistry and Chemical Biology).

🌐 **Live site:** [hsdhattarwal.github.io](https://hsdhattarwal.github.io/)

---

## Design Philosophy

This academic portfolio is designed to be **simple, fast, elegant, and scholarly**, borrowing curated design elements from:
- **[Yue Research Group (Cornell)](https://yuegroup.cbe.cornell.edu/)**: Clean top navigation, crisp research theme cards with methodology tags, interactive publication filtering, and distinct journal badges (*Nat. Commun.*, *JACS*, *ChemPhysChem*, *JCP*, *PCCP*).
- **[The Remsing Lab (Rutgers)](https://remsinglab.com/)**: Editorial academic typography, whitespace rhythm, high-visibility "News & Highlights" timeline (featuring the 2025 ACS–Wiley Computers in Chemistry Outstanding Postdoc Award), and clear bibliographic formatting with author emphasis.

### Key Technical Features
- **Zero Build Steps & Zero Bloat**: Pure semantic HTML5 + CSS3 custom properties + lightweight vanilla JavaScript (<10 KB).
- **Dark / Light Mode**: Seamless theme switching with automatic system preference detection (prefers-color-scheme) and persistence.
- **Interactive Publications**: Instant client-side search and filtering across all 21 peer-reviewed articles and 2 book chapters by year and topic.
- **One-Click BibTeX**: Instant citation copying for any publication.
- **Resilient & Accessible**: Fully functional even if JavaScript is disabled.

---

## File Structure

```
.
├── index.html            -> Homepage: Hero, News/Highlights, Research Pillars, Featured Papers
├── research.html         -> Research program deep-dive (3 core themes with SVG schematics)
├── publications.html     -> Full filterable and searchable publication archive
├── about.html            -> Academic bio, positions held, education, awards, skills, and CV
├── group.html            -> Future group vision, prospective researchers, and collaborators
├── 404.html              -> Custom not-found error page
├── css/
│   ├── style.css         -> Complete design system, theming, and responsive layout
│   └── research.css      -> Fallback alias pointing to style.css
├── js/
│   └── main.js           -> Theme toggle, mobile drawer, search/filter, and BibTeX copy
├── assets/
│   ├── favicon.svg       -> High-resolution vector favicon
│   └── CV_Dhattarwal.pdf -> Curriculum Vitae
├── publications/
│   └── index.html        -> Mirror of publications for /publications/ URL routing
└── publications_data.json -> Structured JSON catalog of all 21 articles and 2 book chapters
```

---

## Updating Publications

All 21 journal articles and 2 book chapters are structured in both `publications_data.json` and `publications.html`.

---

## License

Content © 2026 Harender S. Dhattarwal. Code available under the MIT License.
