# Polish 26 — Sourcing hygiene & quick wins

Queue item (Phase B). Operate per `CLAUDE.md`. Small citation errors in a book that markets itself on real citations are disproportionately costly. Each is a targeted fix to a Sources entry, an evidence card, a code comment, or a stray line. Confirm citations before committing.

## Sourcing
- **Ch15** `what-actually-works/evidence.ts:168–173`: fix the slow-breathing source label so the g=−0.35/−0.32/−0.40 meta-analysis numbers point to **Fincham 2023, Sci Rep 13:432** (meta-analysis), not the RCT (PMC10719279). Optionally surface widget-only sources (Dittmar, Brickman, Zeng, Kirby, Boyle, McMahan, Pizzoli) in the visible list.
- **Ch16** `building-your-practice.mdx`: correct the Nevin citation to **Nevin & Grace 2000, BBS**; fix the "original statement" misdating (implementation-intentions construct is **1993**, not 1999). Keep "median 66 days" (correct — do not change to mean).
- **Ch1** `what-calm-is.mdx`: add **Gross & Levenson 1997** (Hiding feelings) for the amusement/sadness suppression asymmetry (~`:79`) — the listed 1993 study used only a disgust film.
- **Ch4** `tranquility-by-judgment.mdx`: add the reserve-clause source as **De Tranquillitate Animi 13.2** (not De Beneficiis 4.34.4); either use or drop the Discourses 3.2 three-topoi citation.
- **Ch9** `stilling-the-mind.mdx`: give the alternate-nostril meta-analysis a full citation (not a bare PMID). **Ch11** `the-calm-at-the-center.mdx`: fix the NREPP entry that attributes reporters to a Wikipedia URL. **Ch0** `how-to-use-this-book.mdx`: add one line stating the sourcing philosophy and forward-referencing Ch15 (front matter has no Sources).

## Quick wins
- `calm-is-not-numbness/FlagsFigure.tsx` code comment (L6–8) is inverted (says "read bottom to top" but renders green-top→red-bottom) — correct the comment to match the render.
- Ch0 duplicated "there is no wrong door" line (`how-to-use-this-book.mdx:47` vs `how-to-use-this-book/WhereToStart.tsx:181`) — cut one.
- Ch4 exercise 01 fabricated "ninety percent in the second column" → "most of a worry."
- `calm-is-not-numbness/SelfCheck.tsx:262` curly apostrophe (U+2019) → straight, to match reader-facing prose.
- `one-calm-many-doors.mdx:48` "thirteen answers" → "ten answers" (matches the ten-tradition count used by the widget and figures).

## Definition of done
- Citations corrected and confirmed; quick wins applied; no verified-correct claim touched.
- Typecheck, lint, build pass. Commit as `fix(sources): citation precision and quick-win corrections`.
