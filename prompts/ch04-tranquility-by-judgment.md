# Build: Ch 4 — Stoicism: Tranquility by Judgment

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 4 — Stoicism: Tranquility by Judgment". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/tranquility-by-judgment.mdx`, with any chapter-specific components under `src/components/chapters/tranquility-by-judgment/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- Primary sources: Epictetus (Enchiridion, Discourses), Marcus Aurelius (Meditations), Seneca (Letters, On Anger). Reputable scholarship (Pierre Hadot, modern Stoicism).
- The dichotomy of control and its nuance. First movements or proto-passions (Seneca, Aulus Gellius). Apatheia and euthymia. Premeditatio malorum. The view from above.
- Use public-domain translations or paraphrase. Do not quote modern copyrighted translations at length.

## Build notes for this chapter
- Port docs/prototypes/DichotomyOfControl.jsx into the real primitives as the chapter's widget.
- Build the remaining figures: event to impression to assent to reaction; circle of control, influence, concern; the view-from-above zoom.
- This is the reference chapter. Set the quality bar the rest will match.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch04): tranquility-by-judgment`.
