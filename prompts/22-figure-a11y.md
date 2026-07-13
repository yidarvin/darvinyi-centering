# Polish 22 — Figure accessibility & legibility

Queue item (Phase B). Operate per `CLAUDE.md`. ~70 SVG figures live under `src/components/chapters/*/`. Treat this as a system pass. Verify at desktop and 360px width.

## Fixes
- **Phone legibility:** bump sub-legibility label text above ~10px effective. Known offenders: `stilling-the-mind/EightLimbsStaircaseFigure.tsx` (8.5px), `designing-for-calm/CalmChecklistFigure.tsx`, `nature-and-simplicity/AweSmallSelfFigure.tsx`, `calm-abiding/TwoArrowsFigure.tsx` (8.5px), `calm-abiding/SettlingStagesFigure.tsx` (9.5px), `calm-abiding/FlowingWaterFigure.tsx` (long single-line Sanskrit caption ~L87–88 — split it), `the-watercourse-way/*` (7.5–10px, label-dense). Audit all figures for text under 10px in user units and check the effective size at 360px.
- **Text alternatives:** verify every SVG figure carries `role="img"` + a descriptive `aria-label` (or `<title>`/`<desc>`). ~76/88 component files already reference an a11y attribute; close the gap and standardize the convention in `src/components/Figure.tsx` if helpful.
- **Contrast:** caption/label text uses `c.faint` (`#5f666d`) on the near-black background (~3.2:1), below WCAG AA for small text. In `src/styles/tokens.ts` / `src/styles/global.css`, raise the caption color (or `c.faint`) to clear 4.5:1, OR reserve `c.faint` for large/non-essential text only. Verify the change against the whole palette so nothing else regresses.
- **Overflow:** re-check wide figures for horizontal overflow at 360px; confirm stacked variants exist where the spec requires them.

## Target files
`src/styles/tokens.ts`, `src/styles/global.css`, `src/components/Figure.tsx`, and the named figure components (plus any others found under the 10px floor).

## Definition of done
- No figure text below the phone floor; every figure has a text alternative; caption contrast meets AA; no horizontal overflow at 360px.
- Typecheck, lint, build pass. Verify at desktop and 360px in the preview. Commit as `a11y(figures): legibility, text alternatives, caption contrast`.
