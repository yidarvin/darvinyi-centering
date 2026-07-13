# Polish 27 — Buddhism (calm-abiding) critique-fix

Queue item (Phase B). Operate per `CLAUDE.md`. This chapter was re-audited separately (grade: **strong** — doctrinally among the most careful popular treatments; correctly flags non-canonical sayings, renders anatta / the Vacchagotta silence faithfully). Apply the fixes below. Confirm doctrinal changes against a primary source (SuttaCentral) before committing.

## Fixes
- **[HIGH]** Add a trauma-sensitivity / adverse-effects caution to the sustained silent sits (`calm-abiding.mdx:134–147` Exercise 01, and the `NotingTimer` intro), matching the `MettaPractice` footer's existing style. (This is the Buddhism half of item 19; if item 19 already added it, verify it reads well here.)
- **[MED]** `calm-abiding/ResistanceMultiplierFigure.tsx`: the geometry contradicts the "S = pain × resistance" formula it prints — the drawn "suffering felt" line is pain × (1 + resistance), sitting at a full unit of pain at zero resistance, so it labels the *total* as "suffering" while the formula defines suffering as only the second-arrow part. Relabel: total line = "what you feel," coral floor = "pain / first arrow," amber wedge = "suffering / second arrow (= pain × resistance)." Make it match the already-correct `TwoArrowsWidget`.
- **[MED]** `calm-abiding.mdx:48` "still grieves" contradicts SN 36.6 (grief *is* the second arrow there) → "still faces loss."
- **[MED]** `calm-abiding.mdx:104`: distinguish jhānic equanimity (4th-jhāna factor) from brahmavihāra equanimity — one clause, consistent with Anālayo whom the chapter cites.
- **[MED]** Smallest figure labels risk illegibility at phone width: `TwoArrowsFigure.tsx` (8.5px), `SettlingStagesFigure.tsx` (9.5px), `FlowingWaterFigure.tsx:87–88` (long single-line Sanskrit caption at 10px — split it). Coordinate with item 22.
- **[LOW-MED]** `MettaPractice.tsx:13–23, 86–88`: re-attribute the six-step recipient order to "the modern six-step form" rather than the Visuddhimagga proper (Visuddhimagga has four categories, no benefactor/friend split).
- **[LOW]** `NotingTimer.tsx:166–204`: note buttons are dimmed + `pointerEvents:none` but not `disabled`, so keyboard users Tab onto eight inert buttons → add `disabled={phase!=='running'}` (coordinate with item 21). `SettlingStagesFigure.tsx:12` "one-pointed" is commentarial, not the sutta 4th-jhāna formula (upekkhāsatipārisuddhi). `calm-abiding.mdx:19` Sujato quote is a slight paraphrase inside quote marks — match it verbatim or drop the quotes. The "trained heart" define-by-negation cadence repeats 5× in two paragraphs (coordinate with item 24).

## Definition of done
- Figure matches the formula and the widget; doctrinal wording corrected; caution present; labels legible on a phone.
- Voice rules hold. Typecheck, lint, build pass. Verify figures at 360px. Commit as `fix(ch06): buddhism figure/doctrine/a11y corrections`.
