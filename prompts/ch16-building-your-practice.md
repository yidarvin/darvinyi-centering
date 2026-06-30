# Build: Ch 16 — Building Your Practice

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 16 — Building Your Practice". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/building-your-practice.mdx`, with any chapter-specific components under `src/components/chapters/building-your-practice/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Habit formation: implementation intentions (Gollwitzer), habit stacking, minimum effective dose. Practice design for ordinary and hard days.

## Build notes for this chapter
- The toolkit builder lets the reader pick routes and practices and saves a daily plan and a hard-day card (useLocalStorage), with a printable view.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch16): building-your-practice`.
