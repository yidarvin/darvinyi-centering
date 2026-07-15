# Phase C 34 — Regression Foundation

Create a focused, maintainable test net before broad improvements land.

## Build

- Add a unit/component test runner and a browser smoke-test command.
- Cover the chapter manifest, persisted exercise input, landing-page landmark/accessibility basics, and routing of a representative chapter.
- Keep tests behavior-facing. Avoid snapshots, timing sleeps, live network requests, and tests coupled to inline implementation details.
- Record the commands in `package.json`. Make both the fast suite and browser suite runnable locally and in CI.

## Definition of done

- `pnpm test` executes real unit/component checks and an axe scan.
- `pnpm test:e2e` opens the built site, proves a chapter route renders, and verifies a narrow viewport does not horizontally overflow.
- `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass.
- Commit as `test: add regression foundation`.
