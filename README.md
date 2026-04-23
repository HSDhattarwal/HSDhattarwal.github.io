# Harender S. Dhattarwal — Academic Portfolio

Personal academic website for **Harender S. Dhattarwal**, Postdoctoral Research Associate at Rutgers University. Built as a pure static site (HTML + CSS + vanilla JS) — no build step, no framework, deploys directly to GitHub Pages.

🌐 **Live site:** [HSDhattarwal.github.io](https://HSDhattarwal.github.io)

---

## File Structure

```
.
├── index.html          → Home page
├── research.html       → Research themes (3 SVG diagrams)
├── publications.html   → Full filterable publication list
├── about.html          → Bio, CV, TCCB schedule, contact
├── group.html          → Future group / prospective members
├── 404.html            → Custom error page
├── css/
│   ├── style.css       → Global design system + all page styles
│   └── research.css    → Research page theme layout
├── js/
│   └── main.js         → Nav, scroll animations, filter logic
└── assets/
    ├── favicon.svg     → Browser tab icon
    ├── og-image.png    → Social sharing preview (create: 1200×630px)
    └── CV_Dhattarwal.pdf → Linked from About page
```

---

## How to Edit Common Content

### Add a Publication

Open `publications.html` and find the year group you want (they're labeled with `data-year-group="2025"` etc.). Inside it, copy an existing `<div class="pub-item">` block and paste a new one:

```html
<div class="pub-item reveal" data-year="2026" data-topic="ml-potentials">
  <div class="pub-num">22</div>
  <div class="pub-inner">
    <div class="pub-title">Your Paper Title Here</div>
    <div class="pub-authors"><strong>H. S. Dhattarwal</strong> and Co-Author Name</div>
    <div class="pub-meta-row">
      <span class="pub-journal-cite"><em>Journal Name</em> 2026</span>
      <a href="https://doi.org/10.XXXX/XXXXXX" class="pub-doi-link" title="Open DOI">
        10.XXXX/XXXXXX
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
      <span class="tag tag--gray" style="font-size:10px;padding:2px 7px;">ML Potentials</span>
    </div>
  </div>
  <div class="pub-badge-col">
    <span class="jbadge jbadge-acs">JACS</span>
  </div>
</div>
```

**Topic tags** (for the topic filter): `ml-potentials` | `solid-state` | `wise` | `ionic-liquids` | `des`

**Journal badge classes**: `jbadge-nature` | `jbadge-acs` | `jbadge-rsc` | `jbadge-wiley` | `jbadge-aip`

Also update the stats strip near the top of the page from `21` to your new total.

---

### Update the TCCB Schedule

Open `about.html` and find the `<table class="schedule-table">` inside the `id="tccb"` section. Add a new `<tr>` row:

```html
<tr>
  <td class="td-date">Oct 9, 2026</td>
  <td class="td-speaker">Prof. Firstname Lastname</td>
  <td class="td-affil">University Name</td>
  <td class="td-title">"Talk Title in Quotes"</td>
</tr>
```

Your own talk row is highlighted automatically by JavaScript — any row whose speaker cell contains "Harender Dhattarwal" gets the green left border. No extra attribute needed.

Also update the "Next Seminar" card on `index.html` — find the `tccb-next-card` div and edit the date, speaker, affiliation, topic, and chip details.

---

### Add Your Photo

1. Save your photo as `assets/photo.jpg` (recommended: square crop, minimum 400×400px).
2. Open `about.html` and find this block:

```html
<div class="bio-photo" aria-label="Profile photo placeholder">
  <svg ...>...</svg>
  <span class="bio-photo-label">Photo</span>
</div>
```

Replace the entire `<div class="bio-photo">` block with:

```html
<img src="assets/photo.jpg" alt="Harender S. Dhattarwal"
  style="width:240px;height:240px;border-radius:50%;object-fit:cover;
         border:2px solid var(--border);flex-shrink:0;">
```

---

### Update Your CV

Drop your PDF at `assets/CV_Dhattarwal.pdf`. The Download CV button in `about.html` already points there — no code change needed.

---

### Update the Google Scholar Link

Search the site for `?user=XXXX` and replace with your actual Scholar user ID (found in your Scholar profile URL):

```bash
grep -r "user=XXXX" . --include="*.html"
# Then edit each file, replacing XXXX with your Scholar ID
```

---

### Change the Next Seminar on the Home Page

In `index.html`, find the `tccb-next-card` section and edit:
- `tccb-next-date` → new date string
- `tccb-next-speaker` → speaker name
- `tccb-next-affil` → affiliation
- `tccb-next-topic` → talk description
- The `.tccb-chip` spans → time / room / virtual info

---

## Deploying to GitHub Pages

This site is already configured for GitHub Pages. After any edits:

```bash
git add .
git commit -m "Update: <brief description of what changed>"
git push
```

GitHub automatically rebuilds and serves the site within ~30 seconds. No build step, no CI, no configuration needed.

---

## Custom Domain (Optional)

To use a custom domain like `harenderdhattarwal.com`:

1. Purchase the domain from any registrar (Namecheap, Google Domains, etc.)
2. In your registrar's DNS settings, add these records:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  HSDhattarwal.github.io.
   ```
3. Edit the `CNAME` file in this repo — remove the comment lines and write just your domain:
   ```
   harenderdhattarwal.com
   ```
4. In your GitHub repository Settings → Pages → Custom domain, enter your domain.
5. Check "Enforce HTTPS" once DNS propagates (~24 hours).

---

## Design System Quick Reference

The site uses CSS custom properties for consistent theming. To change the accent color (currently green), edit one line in `css/style.css`:

```css
:root {
  --accent: #27AE60;        /* ← change this */
  --accent-dark: #1E8449;   /* ← and this */
  --accent-light: #D5F5E3;  /* ← and this */
}
```

---

## Local Preview

No build step needed — just open any HTML file in a browser, or serve locally with Python:

```bash
python3 -m http.server 8000
# Then open http://localhost:8000
```

---

*Site built with HTML, CSS, and vanilla JavaScript. No frameworks, no dependencies, no build tools.*
