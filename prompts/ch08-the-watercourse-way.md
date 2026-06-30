# Build: Ch 8 — Taoism: The Watercourse Way

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 8 — Taoism: The Watercourse Way". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/the-watercourse-way.mdx`, with any chapter-specific components under `src/components/chapters/the-watercourse-way/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Laozi (Tao Te Ching) and Zhuangzi: wu wei, ziran, the watercourse way, softness overcoming hardness, the useless tree. Cite the primary texts. Watts is a popularizer, not a source.
- Public-domain translations or paraphrase.

## Build notes for this chapter
- The forcing-versus-flow widget should show the cost of pushing against a situation versus moving with it. Keep the water motifs faithful to the texts.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch08): the-watercourse-way`.
