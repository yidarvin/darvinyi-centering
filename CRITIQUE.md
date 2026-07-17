# Centering: a critique

Prepared as a planning contract. Every finding below carries a location and an
acceptance check so an implementer can execute it without re-reading the
reasoning. Scope, method, and coverage are in the Appendix.

Date: 2026-07-16. Reviewed at commit `8c83cb4` on `main`, working tree clean.

---

## TL;DR (the verdict up front)

Centering is a genuinely strong piece of work, and this critique should not be
mistaken for a rescue operation. It is an eighteen-chapter interactive textbook
about calm as trained, engaged equanimity, and across four independent
fact-checks the substance held up better than almost any comparable popular
work: **11 of 11 load-bearing evidence claims verified to the decimal against
primary sources, 14 of 14 high-risk tradition quotations verbatim-correct and
correctly attributed, four physiology chapters with zero mechanistic errors and
no reliance on contested polyvagal theory, and all seven US crisis phone numbers
correct as of today.** The code is clean (zero `any`, zero
`dangerouslySetInnerHTML`, zero stray TODOs, deliberate and commented error
handling), all five quality gates pass, and the voice discipline holds (zero
reader-facing em dashes across 83,805 words).

So the honest finding is this: **there are no Blockers.** The substance is
publish-grade. What remains are systemic gaps, most of them in the seam between
the product's safety-critical and reference-tool ambitions and its actual
enforcement, and several of them are items the team's own 2026-07-15
improvement plan flagged and then marked done without fully building. The most
important five:

1. Safety-resource freshness is unenforced and the verification date is
   duplicated in three places, so it can silently rot. The team's own plan
   called this P0.
2. "988 is confidential" is stated without the imminent-risk exception, in a
   chapter that praises another line for the opposite policy.
3. Evidence claims get letter grades but the reader cannot trace which source
   backs which claim. "Structured citations" was marked done; the structure is
   regex-inferred and there are no inline markers.
4. Five dependency vulnerabilities (1 critical, 1 high) sit unwatched because
   the `check` gate never runs `pnpm audit`.
5. One chapter ships 160 kB gzip of graph engine eagerly, and the bundle-budget
   script is a ratchet set 3% above current size, so it reads as "ok."

Fix those and this is a reference work with very little to apologize for.

---

## What genuinely works

Kept deliberately short, because the negative findings are only trustworthy if
the praise is calibrated rather than polite.

- **Factual accuracy is the standout, and it is rare in this genre.** Four
  parallel verification passes against primary sources found essentially nothing
  to correct. The evidence chapter (`what-actually-works.mdx`) attaches the
  comparison condition to every effect size, uses D-grades to mean
  "unrandomizable, not small," and is repeatedly *more* honest than the papers
  it cites (it downgrades Killingsworth and Gilbert's own causal claim to a
  temporal pattern, `the-quiet-mind.mdx:51`; it reports the Bratman rumination
  result as the non-significant trend it was, p=0.07, not the paper's headline).
  The tradition chapters proactively disown quotes that popular books repeat
  wrongly (the mis-provenanced "chop wood, carry water," the Heraclitus river
  line, "pain is inevitable, suffering is optional" correctly traced to
  Murakami not the Pali canon).
- **The code is disciplined.** No `any` in the app, no `dangerouslySetInnerHTML`,
  no swallowed errors (the three `.catch` blocks are deliberate and commented,
  e.g. `ChapterPage.tsx:45`, `ChapterPage.tsx:73`). SSR plus per-route prerender
  produces distinct titles, descriptions, and canonicals for all 31 routes.
- **It delivers on "figure-rich, widget-rich."** 88 chapter components, 63
  containing hand-built inline SVG. Each chapter imports three to eight of them.
  This is not a wall of text with a token diagram.
- **The interactive accessibility work is real,** not a checkbox. The exercise
  text inputs now carry proper visually-hidden labels (`ExerciseCard.tsx:72`),
  the timer announces completion without per-second chatter
  (`ExerciseCard.tsx:250`), and the convergence graph exposes a described
  `role="img"` plus live-region status readouts (`ConvergenceExplorer.tsx:357`).
- **The central thesis survives eighteen chapters.** Equanimity versus
  suppression, seven routes across ten traditions, tradition-first then
  convergence. `what-calm-is.mdx` even flags its own engagement axis as "a
  deliberate adaptation, not Russell's model" (`:57`), which is the kind of
  intellectual honesty the rest of the book earns.

---

## Findings

Severity ladder: **Blocker** = ships broken, wrong, or harmful. **Major** =
materially degrades the product for its stated reader. **Minor** = worth fixing,
not urgent. **Nit** = rolled up, not itemized.

### Blockers

None. This is a real finding, not an omission. The substance is sound and the
build is green.

### Major

#### MAJ-1 · Safety-resource freshness is unenforced and the date is triplicated
The Chapter 18 crisis resources are the most safety-critical content in the
book, and their "verified" guarantee rests entirely on a manually-updated
string that lives in three unlinked places: a JSDoc comment
(`src/components/chapters/calm-is-not-numbness/resources.ts:2`), reader-facing
rendered text (`SelfCheck.tsx:246`, "verified 2026-07-15"), and the chapter
sources note (`calm-is-not-numbness.mdx:34`). There is no exported `verifiedAt`
constant and no build gate: `grep` across `scripts/` finds no freshness check,
and the build's `audit-static-site.mjs` only validates internal anchors. The
2026-07-15 improvement plan specified this as P0 ("export one `verifiedAt`
date... build warning after 30 days, hard failure after 90 days"). It was not
built, yet the queue marks the umbrella item done. Today the date is one day
old, so nothing is wrong *now*; the defect is that nothing stops it from aging
past 90 days on a future deploy while still telling readers it was verified.
Evidence: subagent confirmed no enforcement exists anywhere in the repo.

#### MAJ-2 · "988 is confidential" omits the imminent-risk exception
The crisis group is glossed "free, confidential, 24/7"
(`resources.ts:53`) and the prose repeats "It is free, confidential, and
staffed around the clock" (`calm-is-not-numbness.mdx:109`). But 988's own
confidentiality policy (988lifeline.org/confidentiality) states it will contact
emergency services *without consent* in cases of imminent risk to life. The
same caveat applies to The Trevor Project and Crisis Text Line. This is not a
wrong number, so it is not a Blocker, but it is a precision failure in safety
content, and it is made worse by contrast: the very same chapter praises Trans
Lifeline because "it will not call emergency services on you without consent"
(`resources.ts:112`). A reader comparing the two entries could reasonably infer
988 offers the same guarantee. It does not.

#### MAJ-3 · Graded evidence with no claim-level source traceability
The book assigns letter grades and precise effect sizes, then ends each chapter
with 15 to 22 sources as a flat `{ text, url }` list (210 such objects across
the chapters; every one is free text, no structured fields). There are zero
inline citation markers in the prose (grep for `<Cite`/`<Ref`/`<sup` returns
nothing). So when `what-actually-works.mdx` says anxiety effects are "about 0.38
at eight weeks... fading to about 0.22," the reader cannot tell which of the
chapter's sources that came from without guessing. Queue item 38, "Structured
citations and sources," is marked DONE, but what shipped is build-time
bibliography *generation* (`build-bibliography.mjs`), not the plan's actual ask:
a structured per-source model and inline markers deep-linked to claims. The
"structure" that does exist is regex-inferred at build time and lossy (see
MIN-3). For a work whose differentiator is honest evidence, untraceable
evidence undercuts the core value.

#### MAJ-4 · Five dependency vulnerabilities, unwatched by the gate
`pnpm audit` reports 5 vulnerabilities: 1 critical (vitest `<3.2.6`, arbitrary
file read when the UI server is listening), 1 high (vite `<=6.4.2`
`server.fs.deny` bypass), and 3 moderate (vite path traversal, esbuild dev-server
request forgery, launch-editor NTLM disclosure). All are dev-tooling and none
ship in the production bundle, so real-world exposure is low. But the `check`
script (`package.json:21`) runs typecheck, lint, build, test, and e2e and never
runs `pnpm audit`, so these will accumulate invisibly. The repo is also on vite
5 while the advisories reference the 6.x line, which is worth a deliberate
upgrade decision rather than drift.

#### MAJ-5 · One chapter eagerly ships a half-megabyte graph engine; budgets are a ratchet
`ConvergenceExplorer.tsx:3` imports cytoscape statically (`import cytoscape from
'cytoscape'`), so the `one-calm-many-doors` route chunk is 494 kB raw / 160 kB
gzip and every reader who opens that chapter downloads the entire graph engine
whether or not they ever touch the graph. The 2026-07-15 plan's item 54
specified "lazy-load Cytoscape when the explorer nears the viewport or the reader
activates it"; that was not done. Separately, the Search chunk is 411 kB / 141 kB
gzip. The budget guard (`check-bundle-budgets.mjs`) sets its ceilings 3% above
current size (graph 494.78 vs 510 limit, search 411 vs 425, shared 222.99 vs
230), so it prevents regressions but blesses the current heaviness and prints
"ok" for all of it. That is a legitimate ratchet, but it should not be mistaken
for the bundles being small.

### Minor

- **MIN-1 · 19 identical build warnings every build.** Each production build
  prints the same "dynamically imported by `loadChapter.ts` but also statically
  imported by `serverChapterModules.ts`" warning once per chapter (19 total).
  The client still splits per-chapter correctly, so this is benign, but chronic
  warning noise trains maintainers to ignore the console, which is where the one
  warning that matters will eventually appear.
- **MIN-2 · One shared OG image for every route.** `useDocumentHead.ts:46`
  points every page's `og:image` at a single `/og-image.png`. Titles and
  descriptions are correctly per-route; the social-preview image is generic.
  Acceptable, but a per-part or per-chapter card would match the polish
  elsewhere.
- **MIN-3 · Bibliography facets are regex-guessed and will misparse.**
  `bibliography.ts` derives author, year, and type from the free-text string:
  `authorFor` (`:71`) takes everything before the first `.`, `:`, `(`, or `[`;
  `yearFor` (`:76`) grabs the *first* four-digit year, so the IFS source that
  cites 2013, 2018, 2022, and 2025 is filed under 2013; `sourceType` (`:63`) is
  a keyword regex. The filter UI built on these will have a real error rate.
- **MIN-4 · Version still `0.1.0`.** `package.json:4` says 0.1.0 for a book the
  README calls complete and shipped. Cut a real version.
- **MIN-5 · Queue status overstates delivery.** `prompts/queue.md` marks every
  item DONE, including item 38 (partially delivered, see MAJ-3) and the safety
  freshness work folded into it (not built, see MAJ-1). Items 40 through 58 are
  collapsed into a single rolled-up "DONE" row pointing at the plan doc, with no
  individual prompt files, so which chapter passes actually ran is not
  auditable. A golden rule of this repo is that the queue tells the truth; right
  now it flatters.
- **MIN-6 · Two small evidence-chapter incompleteness notes.** In
  `what-actually-works.mdx:171`, "indistinguishable from zero against an active
  control" is true for Galante 2021's anxiety and distress outcomes but silently
  omits that the same meta-analysis found a significant depression benefit vs
  active control. And the forest-bathing publication-bias claim (`:113`) is
  stated without naming the meta-analysis it draws on.
- **MIN-7 · "actually" and "just" overused.** Across 83,805 words, "actually"
  appears 151 times and "just" 99 times (roughly 1.8 and 1.2 per thousand). Both
  are within tolerance for a book this size, but "actually" is the notable
  offender and a light de-hedging sweep would tighten the prose. (The banned
  tells proper are clean: zero "delve," "crucial," "robust," "seamless,"
  "tapestry," and no "it's not X, it's Y" construction survives a tight grep.)

### Nits (rolled up, do not itemize in tracking)

Intrinsic sinoatrial rate "around a hundred" is age-dependent
(`the-settled-body.mdx:49`); the negativity-bias "before any deliberate
reaction" phrasing leans harder on the ERP evidence than it strictly supports
(`the-quiet-mind.mdx:81`); the SSR `entry-server.js` is 1.36 MB but is never
shipped to the browser, so it is fine.

---

## Comparative analysis

The originality question: why does this exist when the shelf is full of calm
content? The honest answer, after scanning the field, is that the combination is
genuinely uncrowded.

- **Meditation-science books (Goleman and Davidson, *Altered Traits*; Judson
  Brewer, *The Craving Mind*).** These match Centering's evidence honesty, and
  *Altered Traits* is the closest peer on "review the literature soberly." But
  they are single-modality (meditation neuroscience), book-form, static, and not
  cross-tradition. Reviewers have also faulted *Altered Traits* for residual
  partiality toward the authors' own lab. Centering covers ten traditions plus
  the clinical methods and stays skeptical across all of them.
- **Apps (Waking Up, Headspace, Calm, Insight Timer).** These win on guided
  audio, habit loops, and production budget. They lose badly on scholarship and
  on honesty about weak evidence; none grades its own effect sizes or represents
  traditions on their own terms. Centering is a textbook, not a practice app,
  and does not try to compete on daily-streak engagement.
- **Primary and reference sources (SuttaCentral, the Stanford Encyclopedia of
  Philosophy, Daily Stoic).** Deeper and more authoritative within their lane,
  but siloed by tradition and non-interactive. Centering's value is precisely
  the cross-tradition synthesis (the seven routes) that a single-tradition
  source will never attempt.

**The differentiated 20%:** faithful multi-tradition scholarship, honest graded
evidence, and interactive teaching widgets, in one free web textbook, unified by
a single defensible thesis (engaged equanimity, not suppression). No competitor
combines all three. The one place a competitor clearly wins, and worth stealing,
is claim-level sourcing: serious reference works let you click a claim and land
on its support. Centering's MAJ-3 gap is exactly this, and closing it would put
the book ahead of the science books on traceability, not just tied.

---

## Remediation plan

Ordered for top-to-bottom execution by an implementer opening the repo cold.
Each card is self-contained. Run `pnpm check` after any code task; it must stay
green. Do not weaken a test or a budget to make a change pass.

Sizes: S = under an hour, M = a few hours, L = a day or more.

---

**TASK 1 · Centralize crisis data and enforce freshness (MAJ-1)** · size M · no deps

- Files: `src/components/chapters/calm-is-not-numbness/resources.ts`,
  `src/components/chapters/calm-is-not-numbness/SelfCheck.tsx`,
  `src/content/chapters/calm-is-not-numbness.mdx`, new
  `scripts/check-resource-freshness.mjs`, `package.json`.
- Current behavior: the verification date is a hardcoded string in three places
  (`resources.ts:2` comment, `SelfCheck.tsx:246` rendered text,
  `calm-is-not-numbness.mdx:34` sources note). No build gate.
- Desired behavior: one exported constant, e.g.
  `export const RESOURCES_VERIFIED_AT = '2026-07-15'` in `resources.ts`. Render
  it in `SelfCheck.tsx` and reference it from the MDX note instead of a literal.
  Add `scripts/check-resource-freshness.mjs` that parses the constant and, using
  a build timestamp, prints a warning at 30+ days and exits non-zero at 90+ days
  during production builds.
- Change sketch: export the constant; replace the two other literals with
  imports/reads of it; add the script to the `build` chain in `package.json:9`
  after `audit-static-site.mjs`.
- Acceptance check: set the constant to a date 100 days in the past, run
  `pnpm build`, and confirm it fails with a freshness error; set it to today and
  confirm the build passes. `grep -rn "2026-07-15" src` returns at most the one
  constant definition.

**TASK 2 · Qualify the confidentiality claim on 988, Trevor, and Crisis Text Line (MAJ-2)** · size S · no deps

- Files: `src/components/chapters/calm-is-not-numbness/resources.ts`,
  `src/content/chapters/calm-is-not-numbness.mdx:109`.
- Current behavior: crisis group glossed "free, confidential, 24/7"
  (`resources.ts:53`); 988 note is "24/7, free, confidential. In a
  life-threatening emergency, call 911." (`:61`).
- Desired behavior: add a one-line qualifier to the 988, Trevor, and Crisis Text
  Line entries noting that these lines may contact emergency services if there
  is imminent danger to life. Keep Trans Lifeline's contrasting policy as-is.
  Adjust the prose sentence at `mdx:109` to match. No em dashes.
- Acceptance check: the rendered Chapter 18 resource list shows the imminent-risk
  qualifier on 988; the Trans Lifeline entry still states its no-nonconsensual-
  rescue policy; `pnpm test:e2e` still passes.

**TASK 3 · Add `pnpm audit` to the gate and decide the vite/vitest bump (MAJ-4)** · size M · no deps

- Files: `package.json`, `pnpm-lock.yaml`.
- Current behavior: `check` (`package.json:21`) never audits; `pnpm audit`
  reports 1 critical, 1 high, 3 moderate, all dev-tooling.
- Desired behavior: either (a) bump vitest to `>=3.2.6` and vite to `>=6.4.3`
  (verify the app still builds and tests pass under vite 6, which is a real major
  bump), or (b) if the vite 6 migration is out of scope now, add
  `pnpm audit --audit-level high` as a non-blocking reported step and record the
  accepted dev-only risk in a comment. Prefer (a).
- Acceptance check: `pnpm audit` reports 0 high or critical, or the `check`
  script surfaces the audit result and a comment documents the deferral. `pnpm
  check` still green.

**TASK 4 · Lazy-load cytoscape so non-graph readers do not download it (MAJ-5)** · size M · no deps

- Files: `src/components/chapters/one-calm-many-doors/ConvergenceExplorer.tsx`,
  `scripts/check-bundle-budgets.mjs`.
- Current behavior: `ConvergenceExplorer.tsx:3` statically imports cytoscape;
  the chapter chunk is 160 kB gzip.
- Desired behavior: dynamic-`import('cytoscape')` inside an effect that runs when
  the explorer mounts or scrolls into view, with the existing `role="img"`
  description and button/live-region fallback remaining fully functional before
  the engine loads. Confirm prerender still works without a canvas (the graph
  must stay client-only). After the split, lower the `one-calm-many-doors`
  budget in `check-bundle-budgets.mjs` to the new true size and add a header
  comment stating these limits are regression ratchets, not size goals.
- Acceptance check: `pnpm build` shows the `one-calm-many-doors` chunk materially
  smaller (cytoscape in its own lazily-loaded chunk); the chapter still renders
  and the graph still works in `pnpm dev`; `pnpm test:e2e` passes;
  `node scripts/prerender.mjs` still succeeds.

**TASK 5 · Add inline, claim-level source markers to the evidence-bearing chapters (MAJ-3)** · size L · depends on nothing, but do TASK 6 first if done together

- Files: a new lightweight `<Cite>` component under `src/components/`; the
  chapter MDX for `what-actually-works.mdx`, `the-engineering-of-calm.mdx`,
  `the-settled-body.mdx`, `the-quiet-mind.mdx`; `src/components/Sources.tsx` for
  anchor targets.
- Current behavior: 210 free-text `{ text, url }` sources, no inline markers;
  readers cannot map a graded claim to its source.
- Desired behavior: give each source in a chapter a stable id (reuse
  `sourceIdFor` from `bibliography.ts:59`), render each Sources entry with that
  id as an anchor, and add a small superscript `<Cite sourceId=...>` marker after
  the specific numeric/graded claims that deep-links to the entry. Start with the
  evidence chapter's effect sizes and grades; do not footnote every interpretive
  sentence. Keep the marker keyboard-focusable and screen-reader-labeled.
- Acceptance check: on `/what-actually-works`, clicking the marker after an
  effect-size claim scrolls to and highlights the matching source entry; the
  marker is reachable by keyboard; `pnpm check` green.

**TASK 6 · Make bibliography metadata authored, not regex-guessed (MIN-3, supports MAJ-3)** · size L · pairs with TASK 5

- Files: `src/components/Sources.tsx` (the `Source` type),
  `src/lib/bibliography.ts`, and every chapter's `sources` array.
- Current behavior: `bibliography.ts:63-79` infers author/year/type from prose;
  `yearFor` picks the first year in the string (misfiles multi-year citations).
- Desired behavior: extend `Source` with optional explicit `author`, `year`, and
  `sourceType` fields; prefer them in `buildBibliography` and fall back to the
  current heuristics only when absent. Backfill the explicit fields for the
  sources most likely to be misparsed (multi-year strings, quote-led strings).
- Acceptance check: `pnpm build` regenerates `public/bibliography.json`; the IFS
  rheumatology source is filed under 2013 by explicit field, and no entry shows
  "Unattributed" where an author is actually present; the Sources filter by year
  returns correct results for a spot-check of five multi-year sources.

**TASK 7 · Silence the 19 chapter import-conflict build warnings (MIN-1)** · size S · no deps

- Files: `vite.config.ts`, and the `serverChapterModules.ts` /
  `loadChapter.ts` pair.
- Current behavior: every build prints 19 identical static-vs-dynamic import
  warnings (see `build.log`).
- Desired behavior: keep the current client per-chapter splitting (do not
  regress it), and remove the warning, either by consolidating the two glob
  sources behind a single import path used in both SSR and client, or by scoping
  the eager glob so vite does not see the conflict. Verify the client build still
  emits one chunk per chapter afterward.
- Acceptance check: `pnpm build 2>&1 | grep -c "dynamically imported"` returns 0;
  the build log still lists one `*-<hash>.js` chunk per chapter.

**TASK 8 · Truthful queue and version (MIN-4, MIN-5)** · size S · do after TASK 1 and TASK 5

- Files: `prompts/queue.md`, `package.json:4`, `README.md`.
- Current behavior: every queue item marked DONE though item 38 was partially
  delivered and the freshness P0 was not built; version is `0.1.0`.
- Desired behavior: reflect the real state. After TASK 1 and TASK 5 land, item 38
  and the freshness work can honestly read DONE; until then, mark them PENDING or
  add corrective rows. Expand the collapsed 40-58 row into an accurate record of
  what ran, or note plainly that those passes are not individually tracked. Bump
  the version to a real release number.
- Acceptance check: no queue row claims done for work this critique showed
  undelivered; `package.json` version is not `0.1.0`.

**TASK 9 · Two small evidence-chapter completeness fixes and a light "actually" sweep (MIN-6, MIN-7)** · size S · no deps

- Files: `src/content/chapters/what-actually-works.mdx` (lines 113, 171), plus a
  scan across `src/content/chapters/*.mdx`.
- Current behavior: `:171` omits Galante's significant depression-vs-active
  result; `:113` cites no specific forest-bathing meta-analysis; "actually"
  appears 151 times book-wide.
- Desired behavior: at `:171`, narrow the "indistinguishable from zero" claim to
  anxiety and distress, or add the depression exception. At `:113`, name the
  meta-analysis the publication-bias claim rests on. Do a light read-through
  removing filler "actually"/"just" where they carry no weight. No em dashes, no
  banned tells introduced.
- Acceptance check: the two evidence lines are accurate against their sources;
  `grep -c "actually" src/content/chapters/*.mdx` is meaningfully lower book-wide;
  `node scripts/audit-static-site.mjs` still reports no em dashes; `pnpm check`
  green.

---

## Appendix: scope, method, and coverage

**What was run** (exact commands, all from a clean tree at `8c83cb4`):

- `pnpm run build` -> exit 0. Emits 19 static/dynamic import warnings; all
  budgets pass; static audit passes (31 pages, links/anchors/metadata valid, no
  em dashes).
- `pnpm run typecheck` (part of build, `tsc --noEmit`) -> pass.
- `pnpm run lint` -> exit 0.
- `pnpm run test` -> 20 passed (16 files).
- `pnpm run test:e2e` -> 5 passed (Playwright, Chromium).
- `pnpm audit` -> 5 vulnerabilities (1 critical, 1 high, 3 moderate), all
  dev-tooling.

**What was read in full:** README, CLAUDE.md, `docs/authoring-spec.md`, both
prior audit docs, `package.json`, all build scripts of interest
(`check-bundle-budgets.mjs`, `build-bibliography.mjs`), the core architecture
(`ChapterPage.tsx`, `loadChapter.ts`, `serverChapterModules.ts`,
`useDocumentHead.ts`, `bibliography.ts`, `ExerciseCard.tsx`), the crisis resource
module, and the spine chapter `what-calm-is.mdx`.

**What was fact-checked against primary sources** (four independent verification
passes, ~35 web lookups total):

- Evidence chapter `what-actually-works.mdx`: 12 load-bearing quantitative
  claims. Result: 11 verified to the decimal, 2 minor incompleteness notes (MIN-6).
- Physiology and clinical claims across `the-settled-body`, `the-quiet-mind`,
  `what-calm-is`, `the-engineering-of-calm`: ~22 mechanism claims. Result: zero
  wrong, no polyvagal reliance, exemplary hedging.
- Tradition quotations and translations across the seven tradition and
  contemplative chapters: 14 highest-risk items. Result: 14 of 14 verbatim and
  correctly attributed; no copyright reproduction of modern translations.
- Chapter 18 crisis resources: all 7 US services verified against official sites
  on 2026-07-16. Result: all numbers correct; findings are process (freshness)
  and precision (confidentiality), not wrong data.

**What was measured, not judged:** prose tic counts (grep across 83,805 chapter
words), bundle sizes (build output), source-object shapes (210 `{ text }`
objects), figure richness (63 SVG components), `any`/`console`/`catch`/em-dash
counts.

**What was NOT done, and where confidence is therefore lower:**

- No line-by-line read of all 83,805 words. Prose quality is judged from the
  spine chapter read in full plus targeted sampling; the accuracy verdict rests
  on the stratified fact-check above, not on reading every sentence.
- No deployed-site measurement: no real Core Web Vitals, analytics, or Search
  Console data. Performance findings are from local build output, not field
  data.
- No manual screen-reader or full keyboard pass on every widget; widget
  accessibility is assessed from source plus the one keyboard e2e test that
  exists.
- The remaining tradition chapters not named above (`nature-and-simplicity`,
  `designing-for-calm`, `building-your-practice`, `one-calm-many-doors`) were
  read structurally, not fact-checked claim by claim.

No secrets were found in the repo or its config. The working tree was clean and
nothing was modified in the course of this review.
