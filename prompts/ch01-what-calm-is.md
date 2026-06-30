# Build: Ch 1 — What Calm Is, and Isn't

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 1 — What Calm Is, and Isn't". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/what-calm-is.mdx`, with any chapter-specific components under `src/components/chapters/what-calm-is/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- The difference between equanimity and suppression. Cite Gross's emotion-regulation work (reappraisal versus expressive suppression) and why suppression backfires.
- A defensible model of affect for the calm map (for example Russell's circumplex of affect: valence and arousal). Decide the two axes for the quadrant widget and label them honestly.
- Calm as a regulated state and a movable set point, not a fixed temperament. Brief and accurate.

## Build notes for this chapter
- The calm-quadrant widget must use a real affect frame and name its axes. Do not invent pseudo-axes.
- Draw the equanimity-versus-suppression line clearly here. Chapter 18 calls back to it.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch01): what-calm-is`.
