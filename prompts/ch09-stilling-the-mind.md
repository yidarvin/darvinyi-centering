# Build: Ch 9 — Yoga and the Stilling of the Mind

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 9 — Yoga and the Stilling of the Mind". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/stilling-the-mind.mdx`, with any chapter-specific components under `src/components/chapters/stilling-the-mind/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Patanjali's Yoga Sutras: yoga as citta vritti nirodha, and the eight limbs. Pranayama basics (cross-link Chapter 2 for the breathing science, do not duplicate). The Bhagavad Gita: karma yoga, equanimity (samatva), action without attachment to results, the witness.

## Build notes for this chapter
- Pranayama pacer (alternate-nostril walkthrough) with a safety note. An eight-limbs explorer.
- Build the Gita-and-Stoa parallel figure and cross-link Chapter 4 and Chapter 14. Represent the schools without conflating them.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch09): stilling-the-mind`.
