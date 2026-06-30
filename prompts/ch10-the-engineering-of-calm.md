# Build: Ch 10 — The Engineering of Calm

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 10 — The Engineering of Calm". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/the-engineering-of-calm.mdx`, with any chapter-specific components under `src/components/chapters/the-engineering-of-calm/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- CBT (Beck): the cognitive model and cognitive distancing. ACT (Hayes): defusion, acceptance, values, self-as-context, psychological flexibility. DBT (Linehan): radical acceptance, wise mind, distress tolerance. MBSR (Kabat-Zinn): the body scan and the stress evidence.
- Frame as methods for producing calm on purpose, not as disorder treatment. Be honest that the effects are real but modest. This sets up Chapter 15.

## Build notes for this chapter
- The thought-distancing widget combines CBT distortion-spotting with ACT defusion. Build a wise-mind locator.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch10): the-engineering-of-calm`.
