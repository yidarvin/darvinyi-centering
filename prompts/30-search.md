# Polish 30 — Full-text search (OPTIONAL / reference layer)

Queue item (Phase B, Tier 7 — optional). Operate per `CLAUDE.md`. Depends on item 29 (anchors) for deep-linking into results. Largest lift in the tier.

## Build
- `scripts/build-search-index.mjs`: walk `src/content/chapters/*.mdx`, strip MDX/JSX, and emit a search index to `src/content/searchIndex.json` (per-section documents keyed to the item-29 anchors: chapter, section title, anchor, text). Wire it into the build (a prebuild step or a Vite plugin).
- `src/lib/search.ts`: a CSP-safe, inlined search over the index (MiniSearch or FlexSearch, bundled — no CDN, no external requests).
- A search box + `/` keyboard shortcut in `src/components/TopBar.tsx`, and a `/search` route (`src/pages/Search.tsx`) wired into `src/App.tsx`. Results deep-link to the section anchor.

## Definition of done
- Searching returns relevant per-section results that jump to the right anchor; `/` focuses the box; keyboard-navigable results; no external network calls (CSP-safe).
- Index regenerates on build and stays in sync. Typecheck, lint, build pass. Verify search + `/` shortcut in the preview. Commit as `feat(search): build-time full-text index and search route`.
