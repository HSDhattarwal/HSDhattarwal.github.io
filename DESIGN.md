---
name: Harender S. Dhattarwal
description: A worked sheet from a green engineering computation pad, used as an academic research site.
colors:
  pad: "#e4ecd8"
  grid-minor: "rgb(88 128 72 / .07)"
  grid-major: "rgb(88 128 72 / .12)"
  graphite: "#20261f"
  graphite-2: "#3d4a3a"
  graphite-3: "#4f5f4b"
  pencil: "#b3261e"
  plate: "#0b0d0b"
typography:
  display:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3rem, 7vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.9rem, 3.1vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
  title:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.1
  reference:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1.3
  lead:
    fontFamily: "'Barlow', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.9vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "'Barlow', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "lnum"
  small:
    fontFamily: "'Barlow', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  measure:
    fontFamily: "'B612 Mono', ui-monospace, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  none: "0px"
spacing:
  cell: "20px"
  cell-mobile: "16px"
  sheet-gutter: "24px"
  sheet-gutter-mobile: "16px"
  column-gap: "60px"
  section: "60px"
  section-lg: "80px"
components:
  title-block:
    backgroundColor: "{colors.pad}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    height: "120px"
  nav-link:
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    height: "44px"
  plate:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.none}"
    width: "100%"
  plate-toggle:
    backgroundColor: "rgb(11 13 11 / .72)"
    textColor: "{colors.pad}"
    padding: "0 14px"
    height: "44px"
  plate-toggle-hover:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.pad}"
  section-title:
    textColor: "{colors.graphite}"
    typography: "{typography.title}"
    padding: "0 0 10px"
  reference-row:
    textColor: "{colors.graphite}"
    typography: "{typography.reference}"
    padding: "12px 0 14px"
  continue-bar:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.pad}"
    rounded: "{rounded.none}"
    padding: "22px 26px"
  continue-bar-hover:
    backgroundColor: "#0f130f"
    textColor: "{colors.pad}"
  skip-link:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.pad}"
    padding: "10px 16px"
---

# Design System: Harender S. Dhattarwal

## Overview

**Creative North Star: "The Engineering Computation Pad"**

Every page is a sheet torn from a green engineering computation pad. The ground is pale pad-green with a faint quad grid, the ink is graphite, and structure is drawn with single 1px rules the way an engineer boxes a title block and rules off each step of the working. Nothing floats on cards; content is written onto the sheet and separated by rules and generous vertical spacing.

The density is calm and legible, not packed like a spreadsheet: one 1200px sheet, a ruled title block at the top, a full-width black plate for the one moving figure, then headed sections worked down the page, ending in a single graphite bar that turns to the next sheet. Warmth comes from exactly one hand mark per page, a red pencil ring drawn free-hand around the thing that matters most. Barlow Condensed gives the headings the upright, drafted voice of engineering lettering; Barlow carries the prose; B612 Mono appears only where a measurement would be written.

The world explicitly rejects the cream editorial academic page (portrait, bio, news list). The home page has no portrait, no figure caption, no sheet numbering and no boxed result: the author removed all four.

**Key Characteristics:**
- Pale pad-green ground (#e4ecd8) with a 20px/100px quad grid registered to the sheet.
- Graphite ink ramp in three steps, all tinted green; no neutral greys.
- Structure by 1px graphite rules and hairlines, square corners throughout.
- One red pencil mark per page, drawn once.
- Black plate for figures, the only lifted surface.
- Barlow Condensed display, Barlow text, B612 Mono for years only.

## Colors

A single-hue world: every ink and ground sits on the same muted green axis, broken by one red pencil and one black plate.

### Primary
- **Red Pencil** (pencil): the hand mark. Used for exactly one mark per page (the award ring on home) and for the text caret. 5.4:1 on pad, so it holds up as a line, but it never carries text or UI state.

### Neutral
- **Pad Green** (pad): the page ground, the title-block fill, and the text color on graphite and black surfaces (skip link, continue bar, plate toggle).
- **Grid Minor** (grid-minor): 20px quad lines on the ground (16px at ≤640px). Barely visible by design.
- **Grid Major** (grid-major): every fifth line (100px). Registered to the page centre so the 1200px sheet edges fall on major lines.
- **Graphite** (graphite): primary ink. Body text, headings, all 1px structural rules, link underlines, focus ring, selection fill, continue-bar fill. 12.7:1 on pad.
- **Graphite 2** (graphite-2): secondary ink. Appointment line, interest and topic secondary paragraphs, reference meta (venue), footer, background note. 7.7:1 on pad.
- **Graphite 3** (graphite-3): tertiary ink and hairlines. Author lists, the hairline above interest columns, between reference and topic rows, scrollbar thumb. 5.6:1 on pad; the lightest ink allowed for text.
- **Plate Black** (plate): the figure plate behind the simulation movie, and the plate toggle's fill.

### Named Rules
**The One Red Mark Rule.** Red pencil appears once per page, as a hand-drawn mark around the single most important credential. It is never a link color, button fill, heading color or status color. A second red mark on the same page breaks the world.

**The Green-Ink Rule.** There are no neutral greys. Every ink, rule and tint comes from the green-tinted graphite ramp. The two one-off shades in the build (continue-bar hover #0f130f, continue-bar note #c9d5bd) stay on the same hue.

## Typography

**Display Font:** Barlow Condensed 500/600 (with Arial Narrow, sans-serif)
**Body Font:** Barlow 400/400 italic/500 (with Helvetica Neue, Arial, sans-serif)
**Label/Mono Font:** B612 Mono 400 (with ui-monospace, Menlo, monospace)

All faces are self-hosted as woff2 in `assets/fonts/`; the display 600 cut is preloaded. No external font service.

**Character:** Condensed engineering lettering over a plain, open grotesque from the same family, so headings feel drafted and text feels written, with a cockpit-instrument mono reserved for measurements.

### Hierarchy
- **Display** (600, clamp(3rem, 7vw, 5.5rem), 0.95): the page title on interior pages (Research). One per page.
- **Headline** (600, clamp(1.9rem, 3.1vw, 2.6rem), 1): the name in the title block (h1 on home, wordmark link elsewhere). No wrap on desktop.
- **Title** (600, 1.75rem, 1.1): section titles sitting on a 1px rule. Related sizes in the same face: topic headings clamp(1.75rem, 3vw, 2.4rem), interest headings clamp(1.4rem, 2.2vw, 1.75rem), the award clamp(1.6rem, 2.4vw, 2.05rem), the continue label clamp(1.5rem, 3vw, 2.2rem), margin labels 1.125rem.
- **Reference** (500, 1.3rem, 1.3): linked paper titles in reference rows; 1.125rem in the research margin ledger.
- **Lead** (400, clamp(1.25rem, 1.9vw, 1.5rem), 1.4): the one statement that opens a page or section, max 46–52ch.
- **Body** (400, 1.0625rem, 1.6, lining numerals): prose, max 58–66ch.
- **Small** (400, 0.875–0.9375rem): contacts, appointment, reference meta, authors, footer.
- **Measure** (B612 Mono 400, 0.8125rem): years, and nothing else.

### Named Rules
**The Measurements-Only Mono Rule.** B612 Mono is for measurement labels (years). Never for body, headings, navigation or decorative labels.

**The Heading-Stands-Alone Rule.** Headings sit directly on their rule with nothing above them: no eyebrow, kicker or small-caps label over a heading. Venue and year appear above a paper title only as citation metadata inside a reference row.

## Layout

One centred sheet, `min(100% - 48px, 1200px)` wide (32px total gutter at ≤640px). The body carries the quad grid: 20px minor cell, 100px major (cell drops to 16px/80px at ≤640px), positioned so lines fall on the page centre and the sheet edges land on major lines. Section spacing is large and cell-derived in feel: 20px between title block and plate, 60px before Research interests, 80px before Highlights, 64–72px before the closing note and continue bar (tightened to 40–60px on mobile). Columns use a 60px gap.

- **Home:** title block, full-width plate, Research interests (lead, then two equal columns), Highlights (5fr credential beside 7fr reference ledger), Background note (5.5rem label column + text), continue bar, footer.
- **Research:** title block, page head (display title + lead on a rule), then topic rows: 4fr margin column (kind + papers ledger) beside an 8fr body capped at 66ch. A quieter final topic drops to secondary ink and smaller headings.

**Breakpoints.** At 1000px the title block stacks into rows (column rules become row rules), interest and highlight grids go single-column, and topic margin columns move below the body text (the quiet topic's margin column hides). At 640px the grid cell becomes 16px, the gutter 16px, the plate crops to 4:3, and vertical spacing tightens.

**Print.** White ground, no grid, no plate shadow, no toggle or arrow SVGs; the continue bar prints as plain graphite text; external URLs are appended after links (except in the title block); the pencil ring prints fully drawn.

## Elevation & Depth

Flat by default. Depth comes from rules and from the black plate sitting on the green ground. Exactly one surface is lifted: the figure plate, as if a print had been tipped onto the pad.

### Shadow Vocabulary
- **Tipped-in plate** (`box-shadow: 0 10px 24px -14px rgb(20 30 18 / .55)`): the figure plate only. Soft, green-black, directly below. Removed in print.

### Named Rules
**The One Lifted Plate Rule.** Only figure plates cast a shadow, and it is soft and diffuse. Title blocks, rows, bars and credentials are flat; they are drawn on the sheet, not placed on it.

## Shapes

Square corners everywhere (0px radius). Form is made by lines: 1px solid graphite for structural rules (title block border and its column dividers, section-title underline, page-head underline, plate border, continue-bar border, footer top rule), and 1px graphite-3 hairlines for secondary division (above interest columns, between reference and topic rows). The only curve in the system is the hand-drawn pencil ring; the only arrows are simple stroked SVG arrows (1.6 stroke, 24px viewbox) on onward links.

**The Ruled-Not-Boxed Rule.** Group content with a rule above or below it, not with a filled or bordered card. The title block, plate and continue bar are the only fully enclosed shapes.

## Components

### Title Block
The ruled header every sheet carries. Three cells in one 1px graphite frame on the pad fill, divided by full-height 1px column rules, min-height 120px: name (headline) with Email · Google Scholar · GitHub below; appointment (bold line in graphite, then group and school in graphite-2); navigation. At ≤1000px the cells stack as rows divided by horizontal rules.

### Navigation
- **Style:** Barlow 500, 1.0625rem, graphite, 26px gaps (20px mobile), each link at least 44px tall.
- **States:** no underline at rest; 1px underline on hover; the current page carries a 2px underline (`aria-current="page"`).

### Links
- **Default:** inherit ink, 1px graphite underline offset 0.2em.
- **Hover:** underline thickens to 2px.
- **Focus:** 2px graphite outline, 3px offset (pad-colored and inset on dark surfaces).
- **Selection:** graphite fill, pad text. **Caret:** pencil red.

### Figure Plate (signature)
A full-width black plate with a 1px graphite border and the tipped-in shadow, cropped 10:3 on desktop and 4:3 at ≤640px (video `object-fit: cover`, anchored left). Plays the author's muted, looping simulation. With JS, native controls are removed and a plate toggle appears bottom-right: translucent plate fill, pad text, 1px pad-tinted border, SVG pause/play glyph plus a text label ("Pause" / "Play simulation"), 44px tall; hover goes solid. Reduced motion or Save-Data means no autoplay; the movie pauses when less than 25% is on screen. Without JS the native controls stay. The home plate carries no caption.

### Section Title
Display 600 at 1.75rem, sitting on a 1px graphite rule with 10px beneath the text. No label above it.

### Interest Columns
Two equal columns under a lead sentence, each opened by a graphite-3 hairline: linked display heading, then a secondary-ink paragraph ≤58ch.

### Reference Row (ledger)
Year in mono graphite, then venue in italic, on one small graphite-2 line; the paper title as a display-500 link below; authors in graphite-3 small. Rows are divided by graphite-3 hairlines. The research margin ledger uses the same order at 1.125rem, with a hairline above each entry.

### Research Topic Row
A 4fr margin column (kind label in display 600 at 1.125rem, then the papers ledger) beside an 8fr body (display heading, balanced wrap; paragraphs ≤66ch, second and later in graphite-2). Rows are divided by graphite-3 hairlines. At ≤1000px the margin column follows the body.

### Page Head
Research, Publications and 404 open with the page name in display 600 at clamp(3rem, 7vw, 5.5rem) / .95, a lead paragraph (≤52ch) below, and a 1px graphite rule closing the head. No label above the h1.

### Search Field (Publications)
A display-600 label above a joined input and button: the input on a slightly lighter ground (#edf3e4) with a 1px graphite rule, square corners, 48px tall, graphite-3 placeholder, and no native clear glyph; the Clear button is a graphite block with pad text. The live counter ("23 publications: …" / "Showing n of 23 publications") and the Download BibTeX link (drawn download arrow) sit on the same row, right-aligned. The query is mirrored to `?q=`. Search reads title, authors, citation and DOI only, never the BibTeX. The empty state is a ruled box with an inline "clear the search" action, and the year index hides when every year is filtered out.

### Year Index and Year Block (Publications)
Year jump links are a `nav` between graphite-3 hairlines, with years in mono and "Book chapters" in text face; on phones they scroll horizontally on one line. Each year is a 3fr / 9fr row: the year in display 600 at clamp(2.4rem, 4.6vw, 3.6rem), sticky in the margin, beside its entries. Entries: title as a display-500 link to the DOI (with a visually hidden "publisher page" note), authors in graphite-2 with the author's name at weight 500 in graphite, the citation line, then a small meta line (DOI as plain text, "Key paper" in italic graphite-2 for the flagship papers). The BibTeX disclosure uses a drawn chevron that rotates open, and its code block sits on #edf3e4 with a graphite-3 hairline. Entries are divided by a translucent graphite-3 hairline; year blocks by a solid one. Stacks to one column at ≤1000px.

### Red Pencil Ring (signature)
A single free-hand SVG stroke (pencil red, 2.6 width, round caps) that loops around the award and overshoots past its start. It extends 18px × 10px beyond the credential box (12px × 8px mobile), stretches with the box, and ignores pointer events. Motion: path length normalised to 1, dash draw over 1.2s with `cubic-bezier(.16, 1, .3, 1)` after a 0.15s delay, triggered once by IntersectionObserver at 60% visibility. It stays fully drawn and static with reduced motion, without JS, and in print. One per page; no grain or texture.

### Continue Bar
The one onward action at the end of a sheet. Full-width graphite fill with a 1px rule border, pad text: a small note on the left ("Continue reading", in the pale green #c9d5bd), the destination in display 600 with a drawn 28px arrow on the right. Hover deepens the fill to #0f130f; focus offset is 4px.

### Footer
Small graphite-2 text on a 1px graphite top rule: copyright left, email right.

### Skip Link
Graphite block with pad text, fixed top-left, hidden above the viewport until focused.

## Do's and Don'ts

### Do:
- **Do** set every page on the pad ground with the registered quad grid and inside the 1200px sheet.
- **Do** open every page with the ruled title block and close it with the continue bar and ruled footer.
- **Do** draw structure with 1px graphite rules and graphite-3 hairlines, square corners.
- **Do** keep text ink to graphite, graphite-2 and graphite-3; graphite-3 is the lightest text allowed.
- **Do** put figures on a black plate with a 1px rule and the tipped-in shadow, with a user pause control and no autoplay under reduced motion or Save-Data.
- **Do** keep the red pencil to one hand-drawn mark per page, drawn once and fully visible without motion.
- **Do** keep touch targets at least 44px tall for nav, contacts, toggles and footer links.
- **Do** record origin in every shipped raster (embedded comment) and in this file for media.

### Don't:
- **Don't** use red pencil for text, links, buttons, states or a second mark on the same page.
- **Don't** introduce neutral greys, cream, white surfaces or any hue outside the green ink axis (print excepted).
- **Don't** place eyebrows, kickers or small labels above headings.
- **Don't** use B612 Mono for anything other than measurement labels, and don't add handwriting or script faces; the pencil is an SVG stroke, not a font.
- **Don't** add rounded corners, cards or hard offset shadows; only the plate casts a (soft) shadow.
- **Don't** label pages as numbered sheets ("Sheet n of 3"): the author removed them.
- **Don't** load fonts, scripts or media from third-party hosts.

## Media provenance

- `assets/media/agi-paddle-wheel.webm` and `.mp4`: author-supplied web transcodes of the author's own AgI paddle-wheel simulation movie (`assets/AgI-movie.gif`, 1.35 GB, gitignored and not published).
- `assets/media/agi-paddle-wheel-poster.jpg`: first frame of the same movie, scaled to 1600px with ffmpeg; origin recorded in an embedded JPEG comment. Not generated.
- `assets/harender.jpg`: author portrait, origin recorded in an embedded comment. No longer used on Home or Research.
