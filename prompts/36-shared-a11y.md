# Phase C 36 — Shared Accessibility and Mobile Interaction Pass

Fix common interface issues across every chapter and reference page.

## Build

- Give every exercise response field a programmatic name tied to its exercise.
- Show chapter-only progress and contents controls only on actual chapter routes.
- Make compact navigation, table-of-contents controls, and touch links meet a 44px minimum target without breaking their visual hierarchy.
- Add semantic loading feedback for lazy reference pages, preserving the page landmark.

## Definition of done

- Regression tests first demonstrate the former unlabeled field and reference-page chrome defects, then pass after the fix.
- Keyboard focus remains visible and targets are usable at 390px.
- `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e` pass.
- Commit as `fix(a11y): strengthen shared navigation and inputs`.
