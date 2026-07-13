# Polish 21 — Widget accessibility hardening

Queue item (Phase B). Operate per `CLAUDE.md`. The interactive widgets are the spine of the book; several announce ARIA semantics they don't implement, or strand keyboard focus. Verify each in the browser preview by keyboard only (Tab/Arrow/Enter/Esc) and with a screen reader where live regions are involved.

## Fixes
- **Real radiogroup** (roving `tabindex` + Arrow/Home/End, no click-to-deselect) OR switch to `aria-pressed` toggles, in: `how-to-use-this-book/WhereToStart.tsx` (pull chips), `designing-for-calm/CalmEnvironmentAudit.tsx` (design-one-default), `calm-is-not-numbness/SelfCheck.tsx` (settling/mixed/avoiding). Pick whichever pattern matches the actual single-vs-multi semantics; do not claim `role=radio` without the keyboard behavior.
- **`aria-live="polite"` on inspector panels** that swap content on selection: `one-calm-many-doors/ConvergenceExplorer.tsx`, `what-actually-works/MechanismExplorer.tsx`, `stillness-and-surrender/RepetitionPractice.tsx`. (Also the Taoism `ForceOrFlow.tsx` verdict — see item 28.)
- `the-calm-at-the-center/PartsMapper.tsx`: make protector/exile nodes inert (`tabIndex -1`) while blended so keyboard users are funneled to the single unblend move; add a visible `:focus-visible` outline to the SVG `g role="button"` groups.
- `the-ordinary-mind/PresenceTimer.tsx`: move focus to the new primary control after begin/end/reset so keyboard users aren't stranded on `<body>`.
- `what-calm-is/CalmQuadrant.tsx`: add keyboard select/remove of individual pins (currently pointer-only).
- `the-quiet-mind/AttentionTrainer.tsx`: add an optional gentle end-of-sit chime with a mute control, OR drop the "the timer sounds" prose promise in the chapter (pick one and keep prose and widget consistent).
- `tranquility-by-judgment/DichotomySorter.tsx` and `enough-and-no-fear/DesiresSorter.tsx`: expose per-item right/wrong to assistive tech via visually-hidden text.
- **Shared primitive** `src/components/WidgetShell.tsx`: the human title renders as a `<div>` and the `<section>` has no `aria-label`/`aria-labelledby`, so every widget is an unlabeled landmark. Give the section `aria-label={title ?? name}` (or render the title as a heading) — fixes all widgets at once. Also add `disabled` to buttons that are visually disabled but still focusable (e.g. `calm-abiding/NotingTimer.tsx` note buttons when the sit isn't running).

## Definition of done
- Every listed widget fully keyboard-operable with visible focus; live regions announce on change; no false ARIA roles.
- Reduced-motion and mobile (360px) still fine. Typecheck, lint, build pass. Verify by keyboard in the preview. Commit as `a11y(widgets): radiogroup patterns, live regions, focus management, WidgetShell labeling`.
