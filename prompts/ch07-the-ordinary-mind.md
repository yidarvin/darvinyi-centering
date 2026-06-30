# Build: Ch 7 — Zen: The Ordinary Mind

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 7 — Zen: The Ordinary Mind". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/the-ordinary-mind.mdx`, with any chapter-specific components under `src/components/chapters/the-ordinary-mind/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Mushin (no-mind), shoshin (beginner's mind, Shunryu Suzuki), shikantaza (Dogen), the ordinary mind is the way. The aesthetic of ma and wabi-sabi. The koan in Rinzai.

## Build notes for this chapter
- Keep this chapter short and spare. The restraint is the design. One clean widget (single-task presence timer), the enso motif, minimal figures. Do not overbuild.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch07): the-ordinary-mind`.
