# Build: Ch 14 — One Calm, Many Doors

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 14 — One Calm, Many Doors". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/one-calm-many-doors.mdx`, with any chapter-specific components under `src/components/chapters/one-calm-many-doors/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Synthesize the routes across the prior chapters. Check each convergence claim. Note where traditions genuinely differ in aim or metaphysics (for example Stoic providence versus Buddhist non-self). Do not overstate equivalence.

## Build notes for this chapter
- The convergence explorer is the graph centerpiece: traditions and routes as a network in Cytoscape (reuse the litsearch graph patterns). Install cytoscape and react-cytoscapejs in this run.
- Build the same-move-many-names panels (the witness, the observing self, the Self, no-mind). Accuracy of the mappings is the whole point.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch14): one-calm-many-doors`.
