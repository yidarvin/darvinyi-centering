# Phase C 39 — Reference Navigation and Reader Pathways

Make the book easier to enter, resume, and use for reference.

## Build

- Add bibliography filters for chapter, source type, author/title text, and year, with visible total and filtered counts.
- Keep the full bibliography in the no-JavaScript render.
- Add three explicit landing-page entry modes: read in order, choose a current need, and browse a route or tradition.
- Store the most recently visited chapter locally and show a modest continue-reading card on the landing page when it exists.

## Definition of done

- Unit tests prove combined bibliography filters work.
- The landing page remains readable at mobile width and has no new horizontal overflow.
- `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e` pass.
- Commit as `feat(navigation): add reader pathways and source filters`.
