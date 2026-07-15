# Phase C 37 — Saved-Work Notebook

Make the reader's existing local work visible, portable, and manageable without introducing accounts or a backend.

## Build

- Add a `/notebook` page that lists local Centering reflections, exercise responses, and practice state by chapter.
- Provide an export control that downloads a versioned JSON archive and an import control that validates only `centering:` keys before restoring them.
- Add a clear-all action with a confirmation step. It must leave unrelated local storage untouched.
- Explain on the page that the work stays in the reader's browser unless they export it.

## Definition of done

- Unit tests prove that exports omit unrelated storage, imports reject malformed archives, and clear affects only Centering keys.
- The notebook is reachable from global navigation and is prerendered as a privacy-safe empty state.
- `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e` pass.
- Commit as `feat(notebook): add saved work export and import`.
