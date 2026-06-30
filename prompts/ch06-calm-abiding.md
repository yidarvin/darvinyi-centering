# Build: Ch 6 — Buddhism: Calm Abiding

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 6 — Buddhism: Calm Abiding". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/calm-abiding.mdx`, with any chapter-specific components under `src/components/chapters/calm-abiding/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Calm-abiding (samatha) and the breath. Equanimity (upekkha). The two arrows (Sallatha Sutta). The three marks (anicca, dukkha, anatta). Lovingkindness (Karaniya Metta Sutta).
- Represent the tradition faithfully (primarily early or Theravada framing, note Mahayana where relevant). Reputable scholars such as Bhikkhu Bodhi and Analayo.

## Build notes for this chapter
- The two-arrows widget: resistance as a multiplier on pain, with pain held fixed. Add a metta phrase practice and a noting timer.
- Do not overclaim or flatten across schools.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch06): calm-abiding`.
