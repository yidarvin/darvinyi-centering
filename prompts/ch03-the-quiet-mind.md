# Build: Ch 3 — The Quiet Mind

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 3 — The Quiet Mind". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/the-quiet-mind.mdx`, with any chapter-specific components under `src/components/chapters/the-quiet-mind/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- The default mode network and mind-wandering. Cite Killingsworth and Gilbert (a wandering mind is an unhappy mind) accurately.
- Hedonic adaptation and the stimulation treadmill.
- Flow (Csikszentmihalyi): challenge by skill. Negativity bias, briefly.

## Build notes for this chapter
- The attention rep-counter is the core trainer (focus, notice the drift, return, tally). Keep it honest and simple.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch03): the-quiet-mind`.
