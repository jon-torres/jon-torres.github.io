# Working in this repository

Personal site of Jonathan Torres. Read `README.md` first; the design rationale
is in `docs/superpowers/specs/2026-10-22-strip-cloth-redesign-design.md`.

## Conventions

- Branch from `main`, open PRs into `main`. Never push to `main` directly.
- Copy lives only in `src/content/`. Both locales must stay in sync: the
  `Content` type in `types.ts` is the contract.
- Portuguese must read as written by a person. Run `pnpm check:pt` (local
  only) and fix real findings: announcement colons, "não apenas…
  mas também", three stacked adjectives, piles of -mente adverbs, repeated
  words. Proper-noun lists and quoted titles are expected false positives.
- English copy follows the same spirit: plain verbs, no "passionate",
  "leverage", "seamless", no all-caps labels, no middle-dot meta strings.
- One mapping from text to tile (`src/lib/tiles.ts`). Do not add a second
  glyph set or a second colour rule; extend that file and its tests.
- No UI libraries, no CSS frameworks. One stylesheet, tokens at the top.
- Motion: the hero weave-in is the single page-load animation. Everything else
  must answer a visitor's action. Respect `prefers-reduced-motion`.
- Before claiming a change works, run `pnpm test`, `pnpm lint`, `pnpm build`
  and look at it in a browser at desktop and phone widths.

## Lessons

- Syne 800 is wide. Headings in the 19rem label column must stay under about
  2.75rem or words overflow into the content column.
- Colour carries meaning, so it must agree across components. Job markers use
  the chart's lane colour via `tileFor(name, hue)`; project markers use the
  free hash of the full name, and the loom's "whole sentence" tile shows that
  same mapping so visitors can verify it.
- Jon reads the site as a reviewer with screenshots. He does not want captions
  that explain a chart ("the bars show..."), and he wants the Portuguese
  run through `pnpm check:pt` after every copy change.
- The repo is public. Never commit code, paths, repo names or rule names from
  Clarice's private codebase. `scripts/check-pt.py` stays gitignored, and PR
  descriptions should not quote its internals either.
