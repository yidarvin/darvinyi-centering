# Polish 29 — Section anchors + per-chapter TOC (OPTIONAL / reference layer)

Queue item (Phase B, Tier 7 — optional). Operate per `CLAUDE.md`. This is the foundation of the reference layer: it unblocks deep-linking from search, glossary, and cross-references. Do this before items 30–33.

## Build
- `src/components/SectionMarker.tsx` has an unused `id` prop (0 of ~170 uses pass one). Auto-derive a stable slug id from the section text (kebab-case, deduped) and render it as an anchor target on the section heading.
- `src/styles/global.css`: add `scroll-margin-top` to headings/section markers so an anchored jump clears the sticky `TopBar`.
- Build `src/components/ChapterTOC.tsx`: a per-chapter table of contents from the chapter's section markers — sticky aside on desktop, collapsible on mobile. Mount it in `src/pages/ChapterPage.tsx`. Keyboard-accessible, respects reduced motion, on brand.
- Optionally upgrade high-traffic cross-references (`/tranquility-by-judgment`, `/calm-is-not-numbness`, `/the-engineering-of-calm`) to target specific section anchors now that they exist.

## Definition of done
- Every section has a stable, deep-linkable anchor; the TOC lists them and jumps correctly (clearing the TopBar); mobile collapses cleanly.
- Typecheck, lint, build pass. Verify anchor jumps and the TOC by keyboard at desktop and 360px. Commit as `feat(nav): section anchors and per-chapter table of contents`.
