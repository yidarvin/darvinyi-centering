# Build: Ch 2 — The Settled Body

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 2 — The Settled Body". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/the-settled-body.mdx`, with any chapter-specific components under `src/components/chapters/the-settled-body/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Autonomic basics: sympathetic and parasympathetic, vagal tone, heart-rate variability. Reputable physiology sources.
- Slow breathing and the parasympathetic brake: resonance breathing near six breaths a minute, the effect of a longer exhale. Cite the evidence and keep it measured.
- Benson's relaxation response, and sleep and recovery basics.

## Build notes for this chapter
- The breathing pacer must use accurate timings for each pattern (box, 4-7-8, coherent near 5.5 a minute).
- Add a light safety note: do not force the breath, stop if lightheaded.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch02): the-settled-body`.
