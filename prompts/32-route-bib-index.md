# Polish 32 — Route-browse + unified bibliography + A–Z index (OPTIONAL / reference layer)

Queue item (Phase B, Tier 7 — optional). Operate per `CLAUDE.md`. Best after items 29 and 31.

## Build
- **Route-browse:** lift each chapter's routes out of MDX into `src/content/chapters.ts` (add `routes: RouteId[]` to the manifest, source of truth). Make the landing chips (`src/pages/Landing.tsx:95–121`) and `src/components/RouteTags.tsx` clickable to `/routes/:id`. Add `src/pages/RouteIndex.tsx`: a filter view showing every chapter that leans on the selected route, with its version of the move. Keep `RouteTags` rendering consistent with the manifest.
- **Unified bibliography:** `src/pages/Bibliography.tsx` at `/sources`, aggregating every chapter module's `sources` via the existing `import.meta.glob` in `src/content/loadChapter.ts`. Dedupe by url/text, group by chapter/tradition, backlink each to its chapter.
- **A–Z index:** `src/pages/Index.tsx` at `/index`, generated from the glossary (item 31) plus a curated list of tagged proper names and concepts (Marcus Aurelius, vagus nerve, RAIN, default mode network, …), each linking to a section anchor.
- Add these routes to `src/App.tsx` and surface them from the landing page / TopBar.

## Definition of done
- Clicking a route lists exactly the chapters tagged with it; `/sources` shows a deduped, backlinked bibliography; `/index` resolves names to anchors. Route tags stay consistent with Part III.
- Typecheck, lint, build pass. Verify each new page by keyboard at desktop and 360px. Commit as `feat(reference): route-browse, unified bibliography, and A–Z index`.
