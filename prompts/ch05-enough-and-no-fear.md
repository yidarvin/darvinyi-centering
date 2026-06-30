# Build: Ch 5 — Epicureanism: Enough, and No Fear

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 5 — Epicureanism: Enough, and No Fear". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/enough-and-no-fear.mdx`, with any chapter-specific components under `src/components/chapters/enough-and-no-fear/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Epicurus (Letter to Menoeceus, Principal Doctrines, Vatican Sayings). Lucretius (On the Nature of Things) for the fear of death. The four-part cure (tetrapharmakos).
- The desire taxonomy (natural and necessary, natural not necessary, vain), the role of friendship, ataraxia and aponia.
- Public-domain sources or paraphrase.

## Build notes for this chapter
- The desires sorter must use the correct three-way taxonomy. Build the four-part cure card accurately.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch05): enough-and-no-fear`.
