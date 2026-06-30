# Build: Ch 11 — Internal Family Systems: The Calm at the Center

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 11 — Internal Family Systems: The Calm at the Center". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/the-calm-at-the-center.mdx`, with any chapter-specific components under `src/components/chapters/the-calm-at-the-center/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Internal Family Systems (Richard Schwartz): managers, firefighters, exiles; the Self and its qualities; blending and unblending; Self-leadership; the protective intent of every part. Note that the evidence base is still emerging, honestly.

## Build notes for this chapter
- Port docs/prototypes/PartsMapper.jsx as the widget. Build the qualities-of-Self wheel. Frame the whole chapter as returning to the calm center.
- Keep the trauma-care boundary: exiles are approached with care, usually with a professional.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch11): the-calm-at-the-center`.
