# Phase C 38 — Structured Citations and Sources

Turn the existing per-chapter source exports into reusable reference data without rewriting reader-facing chapter prose.

## Build

- Add a typed bibliography model that normalizes source URLs, assigns stable anchors, carries chapter back-links, and derives useful display metadata where it is safely available.
- Generate a plain bibliography data asset during the build, before the client bundle is made.
- Change `/sources` to consume the generated asset in the browser and the server chapter registry during prerendering. It must never dynamically import every chapter UI bundle in the browser.
- Link chapter source entries to their stable bibliography anchors and add accessible new-tab cues to external source links.

## Definition of done

- A regression test proves duplicate URLs form one entry with stable source ID and all chapter back-links.
- Static `/sources` HTML contains an actual compact bibliography, not a loading placeholder.
- `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e` pass.
- Commit as `feat(sources): generate structured bibliography data`.
