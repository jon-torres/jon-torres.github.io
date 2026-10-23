# jon-torres.github.io redesign: "strip cloth"

Date: 2026-10-22. Status: approved up front by Jon ("total freedom"), built overnight.

## Brief

Personal site for Jonathan Torres, PhD: computational linguist and NLP engineer
(Clarice.ai, São Paulo). Must read as a linguist/NLP engineer's site, use
Pan-African colours (red, black, green, gold) and geometric textile patterns in
the spirit of the reference tile image, feel artsy rather than AI-generated, and
show off some real front-end craft (canvas/JS/CSS). Deployable on GitHub Pages.

## Concept

Kente and bògòlanfini are encoded systems: a pattern is a message. So is text to
an NLP engineer. The site treats the page as a strip cloth and treats every
token as a tile. One deterministic function maps a string to a tile (shape,
orientation, colour, inversion). That single mapping drives:

1. the hero, a full-bleed generative cloth woven from Jon's own bio sentence;
2. the markers next to every project and role (a name always weaves the same tile);
3. "The loom", an interactive section where a visitor types a sentence, sees it
   tokenized by a small rule-based subword tokenizer, and watches it become cloth.

The memorable element is the hero cloth. Everything else stays quiet.

## Tokens

Colour

- cloth black `#000000` (grout, hero, loom, type on paper)
- cotton `#EFE3C6` (reading sections)
- red `#E3262A`
- green `#11803D`
- gold `#F5A21D`
- ink on dark: `#F5EEDC`

Colour is data: gold = function words, red/green = content words, black =
punctuation (loom). In the career timeline: red = industry, green = research,
gold = teaching.

Type

- Syne (variable, 700–800) for display and headings.
- Literata (variable) for body, 17–18px, line-height 1.6, measure ≤ 62ch.
- No monospace, no all-caps eyebrows, no middle-dot meta strings, no arrows.

Layout

- Left-aligned throughout, max width 72rem, 16px gutters on phones.
- Reading sections use a 1/3 + 2/3 grid on desktop (label column, content column).
- Sections are separated by thin woven strips (a row of small tiles), the way
  kente strips are sewn edge to edge. Thick black borders instead of hairlines
  or shadows; zero border radius because the tiles have none.

Motion

- One orchestrated moment: the hero weaves in row by row on load (~1.5s).
- Everything else answers the visitor: hover re-weaves nearby tiles, click
  re-seeds the cloth, typing in the loom re-tokenizes.
- `prefers-reduced-motion`: cloth renders static, no idle re-weaving.

## Page structure

1. Header: name left, four anchors right (about, work, loom, writing).
2. Hero: canvas cloth, headline "Language, taken apart and put back together."
   plus one line of who/where. Seeded from the bio sentence.
3. About: photo masked as a tile, short first-person bio, languages spoken.
4. Work: a two-lane career timeline (SVG, data from `src/data/career.ts`),
   then roles with details, then selected projects as a list with tile markers.
5. The loom: input, token chips, woven strip, legend, honest note that the
   tokenizer is rule-based.
6. Writing: the Gragoatá paper and Medium essays (titles kept in Portuguese).
7. Contact: gold band. Email assembled client-side, LinkedIn, GitHub, Medium,
   Stack Overflow, resume.

## Architecture

- Vite + React 19 + TypeScript, no UI framework. Fonts self-hosted via
  `@fontsource-variable`.
- `src/lib/hash.ts`: FNV-1a 32-bit hash.
- `src/lib/tokenize.ts`: tokenizer (words, numbers, punctuation; suffix-based
  subword split for long words; closed-class word list for pt/en/es/fr).
- `src/lib/tiles.ts`: glyph definitions as SVG path data in a 100×100 box,
  `tileFor(token)` mapping, colour rules. Paths are drawn with `Path2D` on
  canvas and as `<path>` in SVG, so there is one source of truth.
- `src/components/Cloth.tsx`: canvas hero. Grid sized from the viewport; rAF
  loop runs only while something animates.
- `src/components/Tile.tsx`: SVG tile for markers and loom strip.
- `src/components/Loom.tsx`, `Timeline.tsx`, and section components.
- `src/data/*.ts`: content (career, projects, writing, bio).
- Tests: Vitest for hash, tokenize, tiles.
- Deploy: `.github/workflows/deploy.yml` builds and publishes `dist/` to
  GitHub Pages on push to `main`. Pages source switched to GitHub Actions.

## Out of scope

Blog, CMS, dark/light toggle (the palette is fixed by the brief), analytics.
