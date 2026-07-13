# Polish 19 — Safety & self-check hardening

Queue item (Phase B — Polish & Elevation). Operate per `CLAUDE.md`. Build contract: `docs/authoring-spec.md`. This item is safety-critical: the Ch 18 self-check surfaces crisis phone numbers, and the silent-sit chapters lack the trauma cautions the breath chapters already carry.

## Fixes
- **[CRITICAL a11y]** `src/components/chapters/calm-is-not-numbness/SelfCheck.tsx` (~L180–209): the auto-surfaced `ResponsePanel` reveals crisis phone numbers when a red/yellow flag is ticked but is not in a live region. Wrap it in `role="status"` / `aria-live="polite"` (consider `aria-atomic`) so a screen-reader user who checks "thoughts of suicide or self-harm" hears that help appeared. Verify by ticking a red flag and confirming the announcement.
- **[CRITICAL privacy]** `SelfCheck.tsx` (~L34–35): the yellow/red flag checkboxes persist to `localStorage`; on a shared computer this restores another person's ticked self-harm flags. Scope `useLocalStorage` to the Part-1 reflection answers only; keep the flag-checklist state in session-only `useState`. Confirm flag state no longer survives a reload while reflection answers still do.
- Add the shared `Caution` component (`src/components/chapters/the-settled-body/Caution.tsx`) before the first sustained silent sit in `src/content/chapters/calm-abiding.mdx` (~L134–145, Exercise 01 / the noting timer) and `src/content/chapters/the-quiet-mind.mdx` (~L114–137). One honest line, matching the `MettaPractice` footer's existing style: if strong distress, panic, intrusive memories, or dissociation arise, it is fine to open the eyes and ground; a trauma history can be a sign to practice with a professional. Not alarmist.
- `src/components/chapters/calm-is-not-numbness/resources.ts`: add a build-time re-verify note for the "988 Press 3" LGBTQ+ youth route (possible relaunch by end of 2026); soften the "do not reintroduce Press 3" editorial note to "verify status at each build." Do NOT change any currently-correct number.

## Target files
`calm-is-not-numbness/SelfCheck.tsx`, `calm-is-not-numbness/resources.ts`, `content/chapters/calm-abiding.mdx`, `content/chapters/the-quiet-mind.mdx`, and the shared `the-settled-body/Caution.tsx` (reuse; do not fork).

## Definition of done
- Crisis panel announced to screen readers; flag state no longer persisted; trauma cautions present on both silent-sit chapters; resources unchanged except the re-verify note.
- Voice rules hold (no em dashes, none of the banned tells) in any new prose.
- Typecheck, lint, build pass. Verify keyboard + screen-reader announcement in the browser preview. Commit as `fix(ch18): announce crisis resources, stop persisting flag state; add silent-sit cautions`.
