# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **faculty search committees** evaluating Harender S. Dhattarwal as a candidate for an independent academic position. They arrive from an application packet, a Google Scholar link, or a name search, and usually give the site a short visit before or while reading the application. Their job is to judge three things quickly: whether there is a distinctive research program, whether the track record supports it, and whether the candidate fits their department (chemistry, chemical engineering, or materials).

Secondary audiences, such as peers, collaborators, and people looking up a paper, are served by the same pages. They are not the design target.

## Product Purpose

A personal academic website that presents one researcher's scientific identity and record. Success: after a short visit, a committee member can say in one sentence what this person works on and why it is distinctive, has seen the peer recognition and flagship papers, and can find any publication and its citation.

## Positioning

**Method plus mechanism.** Physically faithful, long-range machine-learning interatomic potentials are the tool. The electronic origins of ion transport are the payoff: electronic paddle-wheels, where iodide lone-pair rotation is coupled to collective Ag⁺ diffusion in AgI, and polarisation-driven screening and clustering in molten AgI. The scope extends to heterogeneous interfaces relevant to catalysis and battery materials.

The paddle-wheel discovery (Nature Communications, 2024) is the claim no neighbouring researcher can truthfully copy.

## Operating Context

- Hosted on GitHub Pages at https://hsdhattarwal.github.io/ as a user site with root-relative 404 links.
- Static HTML and CSS. JavaScript is progressive enhancement only: the publication search (`js/main.js`) and the home-page movie controls and pencil-ring draw (`js/home.js`). There is no framework, CDN, analytics, external fonts, or runtime build step.
- The bibliography is generated from `publications_data.json` by `_scripts/build_publications.py`, using `_templates/publications.html`, and writes `publications.html` and `assets/publications.bib`.
- Regression tests: `_tests/test_site.py` and `_tests/search.test.cjs`. Folders prefixed with `_` are not published.
- Committee members often print the page or save it as a PDF. The print stylesheet is a real requirement.

## Capabilities and Constraints

- Public pages:
  - Home (`index.html`)
  - Research (`research.html`)
  - Publications (`publications.html`)
  - 404 page
  - redirect stub at `publications/index.html`
- The navigation shows Home, Research and Publications only.
- **No CV on the site.** The CV page and PDFs were removed deliberately and must stay off. Do not add a CV link or a "CV available on request" line.
- The group page was also removed deliberately.
- **Future directions: undecided.** The placeholder in `research.html` stays an HTML comment until the author approves the text. Never infer plans from published work or from the group's aims.
- The publication search must keep working without JavaScript: all records, year links and BibTeX disclosures stay usable, and search controls appear only after enhancement succeeds.
- Home and Research carry a small, hand-picked selection of papers. The full list comes only from the JSON source.
- Editor metadata for book chapters has not been invented and must not be.

## Brand Commitments

- Name as written: **Harender S. Dhattarwal**.
- Current appointment: Postdoctoral Associate, Cornell University, in Prof. Shuwen Yue's group, Robert F. Smith School of Chemical and Biomolecular Engineering.
- Voice: first person, measured, precise scientific prose. Spelling on the site is currently British (behaviour, centres, polarisation).

## Evidence on Hand

- 2025 Wiley Computers in Chemistry Outstanding Postdoc Award, from the ACS Division of Computers in Chemistry (COMP).
- 21 research articles and 2 book chapters, 2019–2025 (`publications_data.json`, `assets/publications.bib`).
- Flagship papers:
  - Electronic paddle-wheels, *Nature Communications* 2024
  - Dielectric saturation in water, *J. Phys. Chem. B* 2023
  - Superionic AgI, *ChemPhysChem* 2025
  - Molten AgI, *J. Chem. Phys.* 2025
- Background: postdoc with Richard C. Remsing at Rutgers; PhD in Chemistry at IIT Delhi (2022), advised by Hemant K. Kashyap.
- Portrait: `assets/harender.jpg` (480×518); removed from the home page at the author's request.
- AgI simulation movie (author's own render): web versions in `assets/media/`; the 1.35 GB source `assets/AgI-movie.gif` is gitignored.
- Contact and profiles:
  - email: hd436@cornell.edu
  - Google Scholar
  - GitHub: HSDhattarwal
- **Absent:** apart from the AgI movie, there are no research figures in the repository. Further visuals must come from the author. Do not fabricate scientific imagery that implies specific results.

## Product Principles

1. **Lead with the science a committee would remember.** The paddle-wheel mechanism and its method are the identity. Credentials support it; they are not the headline.
2. **Credibility signals must be seen.** Peer recognition and flagship venues belong in the first scan, not in marginal metadata.
3. **Nothing unapproved is claimed.** Future plans, CV details and editorial metadata appear only once the author supplies them.
4. **Durable and portable.** Static, fast, printable, no third-party runtime. The site must survive years of low-maintenance hosting.
5. **Every paper is findable and citable.** The bibliography's completeness and BibTeX accuracy are non-negotiable.

## Accessibility & Inclusion

Keep the current baseline as the floor:
- WCAG AA contrast
- a skip link
- visible focus rings
- 44px touch targets
- a labelled search with an announced result count
- behaviour that works without JavaScript
- a print stylesheet
