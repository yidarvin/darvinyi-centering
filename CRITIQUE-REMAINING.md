# Centering: remaining critique work

Companion to `CRITIQUE.md`. The first remediation pass (branch
`address-critique-findings`, 9 commits) closed 9 of the 12 findings. This plan
covers what is left to bring the repo to *fully addressed*. Same contract as
`CRITIQUE.md` § Remediation plan: each task is self-contained, ordered for
top-to-bottom execution, with an acceptance check. Run `pnpm check` after every
code task; it must stay green. No em dashes in any reader-facing prose.

Sizes: S = under an hour, M = a few hours, L = a day or more.

## What is already done (for context, do not redo)

MAJ-1, MAJ-2, MAJ-5, MIN-1, MIN-3, MIN-4, MIN-5, MIN-6, MIN-7 are fully closed
on `address-critique-findings`. In particular: every chapter's Sources list
already renders per-source anchors (`Sources.tsx` stamps `id={sourceIdFor(s)}`
on each `<li>`), and the `Cite` component already exists
(`src/components/Cite.tsx`). So Task A below is pure MDX authoring against
infrastructure that is already in place.

---

## TASK A · Finish claim-level citations across the remaining chapters (MAJ-3) · size L

Closes the partial state of MAJ-3. Inline `<Cite>` markers currently exist only
in the four evidence chapters (`what-actually-works`, `the-engineering-of-calm`,
`the-settled-body`, `the-quiet-mind`). Extend them to the other 15.

- **Files:** the remaining chapter MDX under `src/content/chapters/` (all except
  the four above and, at your discretion, the deliberately-sparse
  `how-to-use-this-book`); no component or infra changes needed.
- **Pattern to follow (already established):** `import { Cite } from
  '@/components/Cite'` at the top of the chapter, then place
  `<Cite url="<exact url from this chapter's sources array>" label="Author Year" />`
  immediately after a *specific* claim that a *specific* source backs. The `url`
  must byte-match one entry in that chapter's own `export const sources` array
  (the anchor is derived from it via `sourceIdFor`).
- **What to mark, per chapter:** the load-bearing, checkable claims only:
  - Tradition chapters (`tranquility-by-judgment`, `enough-and-no-fear`,
    `calm-abiding`, `the-ordinary-mind`, `the-watercourse-way`,
    `stilling-the-mind`, `stillness-and-surrender`): named quotations,
    attributions, dates, and doctrinal claims tied to a specific primary source
    or translation. Roughly 2 to 5 markers each; these chapters are interpretive,
    so do not over-mark.
  - `the-calm-at-the-center` (IFS): the empirical claims (the 2013 RCT, the
    "92% no longer met PTSD criteria" pilot, the 2025 scoping review, the NREPP
    listing). This chapter has the most numeric claims outside the evidence
    chapters. 4 to 6 markers.
  - `nature-and-simplicity`, `designing-for-calm`, `building-your-practice`:
    empirical/effect-size claims (attention restoration, awe, notification cost,
    implementation-intentions d-values, minimum-effective-dose). 3 to 6 each.
  - `what-calm-is`, `one-calm-many-doors`: the empirical framing claims
    (circumplex model, Gross suppression findings; the perennialism debate
    citations). 2 to 4 each.
  - `calm-is-not-numbness`: the spiritual-bypassing origin, the acceptance/
    avoidance findings, the NIMH/WHO signposts. 3 to 5 markers.
- **Do not** footnote interpretive sentences, scene-setting, or the reflection/
  exercise prose. A marker must point at a claim a skeptic would ask a source
  for.
- **Guard the parse:** after authoring, run the build and open
  `public/bibliography.json`. For any newly-cited source whose `author` or `year`
  is wrong (the heuristic handles APA and multi-author MLA, but primary-source
  citations like "Epictetus, Enchiridion" or unquoted book titles may misparse),
  add an explicit `author`/`year` on that source entry, exactly as was done for
  the five `the-engineering-of-calm` entries.

**Acceptance check:** every chapter that makes hard factual/empirical claims has
at least one `<Cite>`; `grep -rl "<Cite" src/content/chapters/*.mdx | wc -l`
returns 17 or more (allowing `how-to-use-this-book` and any chapter with no
checkable claims to opt out); every `<Cite url>` matches a source in its own
chapter; `node scripts/audit-static-site.mjs` passes (all in-page anchors
resolve); `pnpm check` green. Spot-check three markers in `pnpm dev`: each
deep-links to the right entry in that chapter's own Sources list.

---

## TASK B · Resolve the dependency vulnerabilities (MAJ-4) · size L · risky

Closes MAJ-4 properly (the critique's preferred option (a), which was deferred).
This is a real major-version migration, not a patch. Do it on its own, with
nothing else in the working tree.

- **Files:** `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, possibly the
  MDX/SSR wiring if a breaking change touches it.
- **Bumps:** `vite` to `>=6.4.3`, `vitest` to `>=3.2.6` (and
  `@vitejs/plugin-react`, `vitest-axe`, and any `@vitest/*` to their
  vite-6/vitest-3-compatible majors). `esbuild` moves transitively with vite.
- **Expected breakage to check, in order:**
  1. `vite build --ssr` and the client `vite build` (the two-step build in
     `package.json`): confirm both still produce the same chunk layout and the
     `onwarn` filter in `vite.config.ts` still matches (Rollup's warning object
     shape can shift across majors).
  2. The `@mdx-js/rollup` plugin ordering (`enforce: 'pre'`) under vite 6.
  3. `vitest` config: the `test` block in `vite.config.ts`, `jsdom`
     environment, `setupFiles`, and `vitest-axe` matchers under vitest 3.
  4. `check-bundle-budgets.mjs` limits: if vite 6 changes minification output,
     the budgets may need re-baselining (lower them to the new true sizes; do
     not raise a budget to force a pass).
- If the migration proves larger than one session, stop and report; do not leave
  a half-migrated tree. The visibility + deferral note from Task 3 is a valid
  resting state.

**Acceptance check:** `pnpm audit` reports 0 critical and 0 high (moderates may
remain if still unpatched upstream, but note them); `pnpm check` fully green
(typecheck, lint, build, test, e2e); the built site renders and the convergence
graph still works in `pnpm dev`. Update the README note added in Task 3 to say
the migration is done, and drop the `audit:deps || true` softener to a hard
`pnpm audit --audit-level high` in `check` if 0 high/critical is achieved.

---

## TASK C · Per-route social-preview images (MIN-2) · size M

Closes MIN-2. Every route currently sets `og:image` to a single
`/og-image.png` (`useDocumentHead.ts:46`, and the same literal in
`prerender.mjs`). Give each route a distinct card.

- **Files:** a new build script (e.g. `scripts/build-og-images.mjs`),
  `src/lib/useDocumentHead.ts`, `scripts/prerender.mjs`, `package.json` (wire the
  new script into `build` before `prerender`).
- **Pragmatic approach (no heavy headless-browser dep):** generate a branded SVG
  per route at build time from the chapter manifest (title, part, section number,
  the teal-on-near-black house palette), then rasterize to PNG. Two options for
  rasterizing without a large dependency:
  - Emit `.svg` cards and reference those directly as `og:image` (most social
    scrapers accept SVG poorly, so prefer PNG); or
  - Add a small, well-maintained SVG-to-PNG converter (e.g. `sharp` or
    `resvg-js`) as a dev dependency used only in the build script. Confirm it
    does not enter the production bundle.
  - Minimum viable version if image generation is unwanted: one card **per
    part** (four cards) keyed off the chapter's `part`, still a real improvement
    over one global image.
- Write cards to `public/og/<slug>.png` (gitignored like the other generated
  assets — check `.gitignore`); have `useDocumentHead` compute
  `${origin}/og/${slug}.png` and `prerender.mjs` write the matching absolute URL
  into each route's static HTML.
- Keep the existing `/og-image.png` as the fallback for routes without a card
  (landing, glossary, sources).

**Acceptance check:** `pnpm build` generates one card per chapter route;
fetching two different chapter HTML files from `dist/` shows different
`og:image` URLs before JavaScript runs; the static audit still passes (the new
`og:image` assets resolve); `pnpm check` green. Optionally validate one card in a
social-card debugger against the deployed preview.

---

## TASK D · The two prose nits (rolled-up nits from CRITIQUE.md) · size S

The critique rolled these up as "do not itemize," so this task is optional and
only needed if you want the critique *fully* discharged including nits. Both are
one-clause accuracy softenings, no structural change.

- **Files:** `src/content/chapters/the-settled-body.mdx` (~line 50),
  `src/content/chapters/the-quiet-mind.mdx` (~line 82).
- `the-settled-body`: "the heart settles around a hundred beats a minute" is a
  young/middle-adult figure; intrinsic rate declines with age. Add a short,
  non-disruptive caveat (e.g. "around a hundred beats a minute in a young adult,
  a little lower with age") without turning the sentence into a physiology
  lecture.
- `the-quiet-mind`: "it does so at the stage of sizing things up, before any
  deliberate reaction has formed" leans harder on the ERP evidence than it
  strictly supports. Soften to something like "early, at the stage of sizing
  things up, well before a considered reaction," which keeps the point without
  overclaiming the pre-deliberative timing.
- Cite the relevant source with a `<Cite>` marker while you are there, if Task A
  has not already covered these chapters (the-quiet-mind is an evidence chapter
  and already has markers; the-settled-body already has one).

**Acceptance check:** both sentences read naturally, no em dashes,
`node scripts/audit-static-site.mjs` reports no em dashes, `pnpm check` green.

---

## Suggested order and grouping

- **A** first (largest, pure content, low risk) — one commit, or one commit per
  few chapters if you prefer smaller diffs.
- **C** next (self-contained infra) — one commit.
- **D** folds into A or is its own tiny commit.
- **B** last and alone (risky migration) — its own commit, its own review; skip
  if the deferral is still the preferred posture.

After all four, MAJ-3, MAJ-4, and MIN-2 are fully closed and the nits are
discharged, leaving zero open items from `CRITIQUE.md`. Update
`prompts/queue.md` item 61 (or add item 62) to record the completion, matching
the truthful-queue discipline from Task 8.
