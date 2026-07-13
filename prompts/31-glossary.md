# Polish 31 — Glossary + Term component (OPTIONAL / reference layer)

Queue item (Phase B, Tier 7 — optional). Operate per `CLAUDE.md`. Depends on item 29 (anchors) for the home-anchor of each term.

## Build
- `src/content/glossary.ts`: harvest the already-italicized first-use definitions across the book (ataraxia, apatheia, adiaphora, wu wei, ziran, samatha, metta, anatta, dukkha, dhikr, sakina, menuchat hanefesh, hishtavut, defusion, nadi shodhana, prajna, hesychasm, niksen, lagom, ma, hygge, and more) into typed entries: `{ term, aliases, oneLineDef, tradition/route, homeSlug, anchor }`.
- `src/pages/Glossary.tsx` at `/glossary`: an alphabetized, on-brand list, each term linking to its home section anchor.
- `src/components/Term.tsx`: an MDX component that replaces bare `*term*` first-use emphasis with a hoverable, deep-linkable reference to the glossary entry. Register it in the MDX components map. Keyboard-accessible tooltip.

## Definition of done
- Glossary page lists every harvested term with a correct home-anchor link; `Term` renders inline without breaking prose flow and is keyboard-operable.
- Typecheck, lint, build pass. Verify a few terms jump to the right section. Commit as `feat(glossary): terms index and inline Term references`.
