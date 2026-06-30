# Build: Ch 18 — Calm Is Not Numbness

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 18 — Calm Is Not Numbness". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/calm-is-not-numbness.mdx`, with any chapter-specific components under `src/components/chapters/calm-is-not-numbness/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Spiritual bypassing (John Welwood). The downsides of expressive suppression (Gross). Toxic positivity. Acceptance versus experiential avoidance. Accurate, current crisis and help resources and how to find a therapist. Resources are region-specific: verify them at build time and localize. For the US, the 988 Suicide and Crisis Lifeline.

## Build notes for this chapter
- The self-check distinguishes settling from avoiding and routes clearly to professional and crisis resources, framed plainly as not a diagnosis. This chapter carries the safety content. Measured, not alarmist. Close the loop opened in Chapter 1.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch18): calm-is-not-numbness`.
