# Phase C 35 — Real Prerendering and Crawl Verification

Ship static HTML for every public chapter and reference route.

## Build

- Add a Vite SSR build entry and a static generation pass that writes each known route to `dist/<route>/index.html`.
- Render chapter MDX during the server pass without moving chapter code into the initial client bundle.
- Emit distinct title, description, canonical, and Open Graph tags in every generated document.
- Keep client-side head management for navigation after load.

## Definition of done

- A build produces non-empty HTML for the landing page, a representative chapter, and a reference route.
- The chapter document contains its own title, description, canonical, and chapter body before JavaScript executes.
- `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e` pass.
- Commit as `feat(seo): add static prerendering for public routes`.
