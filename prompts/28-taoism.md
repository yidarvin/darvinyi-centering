# Polish 28 — Taoism (the-watercourse-way) critique-fix

Queue item (Phase B). Operate per `CLAUDE.md`. This chapter was re-audited separately (grade: **strong** — wu wei correctly rendered as non-coercion not passivity; "watercourse way" already correctly credited to Alan Watts; every verbatim Legge quotation verified accurate; ziran handled well). Apply the fixes below.

## Fixes
- **[MED]** `the-watercourse-way/ForceOrFlow.tsx`: the teaching payload is not announced to screen readers — the verdict head/body (~L358–377) and strain/effort bars change as the slider moves, but none is in a live region and the range input has no `aria-valuetext`, so a blind user hears "70, 69, 68…" and never gets "you are the dam." Wrap the verdict container in `aria-live="polite"` and add `aria-valuetext` summarizing stance + strain. (Same pattern as item 21.)
- **[MED]** `the-watercourse-way.mdx:43`: add one boundary sentence distinguishing *philosophical* Daoism (the two classical texts, this chapter's remit) from *religious* Daoism (Daojiao: temples, ritual, inner alchemy), so readers don't take "Taoism" as fully covered.
- **[LOW]** `the-watercourse-way.mdx:43`: "the oldest copy we have" overstates the Guodian find (a partial ~one-third witness) → "the oldest surviving fragments." `the-watercourse-way.mdx:79` swimmer passage: "an old man" → "a man in the water" (Zhuangzi has 丈夫, an adult man; optionally name Confucius as the mistaken watcher).
- **[LOW]** De-templatize the "Watch …" imperative at `the-watercourse-way.mdx:51/91/132` (vary ≥2; coordinate with item 24). `the-watercourse-way/SoftOvercomesHardFigure.tsx`: move `<defs>` above first use (tidiness); check 7.5–10px label legibility at 360px (coordinate with item 22). Consider decoupling the effort vs strain bars in `ForceOrFlow` (they're near-collinear, under-dramatizing the chapter's central "effort stays, strain goes" claim).

## Definition of done
- Widget lesson announced to screen readers; philosophical/religious boundary stated; textual corrections made; labels legible on a phone.
- Voice rules hold. Typecheck, lint, build pass. Verify the widget by keyboard + screen reader. Commit as `fix(ch08): taoism widget a11y and textual precision`.
