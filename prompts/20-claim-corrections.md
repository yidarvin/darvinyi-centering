# Polish 20 — Overstated-claim corrections (web-verified)

Queue item (Phase B). Operate per `CLAUDE.md`. For a book whose brand is evidence honesty, claims the primary literature contradicts are the most damaging defect. Each fix below was confirmed by an adversarial web fact-check. Re-confirm any changed claim against its cited source before committing.

## ⚠️ Verified-correct — do NOT "fix" these
Zen Suzuki epigraph (already correct; do not add "mind"); Ch16 Lally "median 66 days" (median is correct); Ch2 Laborde exhale-ratio claim (supported); Ch3 Killingsworth & Gilbert and Brickman 1978 (accurate).

## Fixes
- **Ch10 [CRITICAL]** `src/components/chapters/the-engineering-of-calm/ThoughtDistancer.tsx:28`: the ten cognitive distortions are NOT Burns's canonical ten (it splits mind-reading/fortune-telling and omits "disqualifying the positive"). Restore Burns's actual ten OR reword to "a widely used list descended from Burns" and delete "canonical." Fix `lower()` (~L55–59): it lowercases only the first char, rendering "I always…" as "i always…"; preserve standalone `I`/`I'm`. Reframe the wise-mind slider so it is not the numeric midpoint of a 1-D emotion↔reason axis (that teaches the reasoned-average misreading the prose rejects): make it a distinct third state or add an in-widget note that wise mind is emergent, not a 50/50 blend.
- **Ch2** `src/content/chapters/the-settled-body.mdx:88`: attribute the ~15% (actually ~16–17%) oxygen-consumption drop to Wallace/Benson's small early-1970s work and hedge the "distinct restorative state" claim. Fix "vagus … mostly to the heart" to "the brake to the heart (among other organs)"; note RSA is multifactorial (baroreflex + lung-stretch afferents), not solely central vagal gating. Keep the Laborde exhale-ratio claim; optionally note it is a modest acute effect.
- **Ch3** `src/content/chapters/the-quiet-mind.mdx`: reframe flow "expensive in attention and fuel" as a contested open question (cite Alameda/Sanabria/Ciria 2022; it contradicts Dietrich's transient-hypofrontality account). Credit the both-high challenge/skill refinement to Massimini & Carli 1988, not Csikszentmihalyi's original map.
- **Ch0** `src/content/chapters/how-to-use-this-book.mdx:15`: reframe "not a temperament you were born with or without" as both-and (heritable baseline ~40–50% AND trainable), matching the Ch1 set-point framing. `src/components/chapters/how-to-use-this-book/WhereToStart.tsx:21`: scope "the one move every later chapter reuses" to the meditation chapters — a recurring *gesture*, not a shared mechanism (Stoic appraisal, Epicurean desire-sorting, IFS parts-work do not use it).
- **Ch13** `src/components/chapters/nature-and-simplicity/AttentionRestorationFigure.tsx:34`: caption "hard fascination demands top-down control" is an ART category error (hard fascination is involuntary bottom-up capture) and contradicts the chapter's prose. Reword to "effortful focus and constant interruption spend directed attention." Add one line in `nature-and-simplicity.mdx` that ART's directed-attention-depletion *mechanism* is a resource-depletion model of the same family as ego depletion (which failed replication), so the walk's benefit is better supported than its muscle-fatigue explanation.
- **Ch5** `src/content/chapters/enough-and-no-fear.mdx:101`: change "Philodemus boiled the whole therapy down to four lines" to "preserved/recorded by Philodemus" (authorship overstated).
- **Ch17** `src/content/chapters/designing-for-calm.mdx`: remove "so they checked more" from the Fitz 2019 notifications claim (the off group unlocked ~20% LESS). Keep the FoMO→anxiety mechanism.

## Definition of done
- Every changed claim re-confirmed against its source; no verified-correct claim touched.
- Figures still match their paired prose after edits (esp. Ch10 wise-mind, Ch13 ART).
- Voice rules hold. Typecheck, lint, build pass. Commit as `fix(content): correct overstated claims caught by verification (ch0,2,3,5,10,13,17)`.
