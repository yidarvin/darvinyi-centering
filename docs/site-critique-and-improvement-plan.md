# Centering site critique and improvement plan

Owner: Darvin. Reviewed: 2026-07-15.

This document is the handoff plan for the next improvement pass. It audits the finished site as a book, a web product, and a maintained codebase. It does not authorize a wholesale rewrite. Centering already has a strong thesis, a distinctive visual language, careful source work, and unusually good interactive teaching. The next pass should protect those strengths while fixing the gaps that appear only at book scale.

## Executive assessment

Centering is an interactive textbook about calm as a trained, engaged relationship to experience. It moves from physiology and attention, through philosophical and contemplative traditions, into clinical methods, synthesis, evidence, and practical design. Its central distinction is equanimity versus suppression. Its organizing device is seven recurring routes to calm: letting go, presence, the body, perspective, enough, connection, and meaning.

The site is already strong enough to publish as a serious reference work. Its best qualities are:

- A clear argument that survives across nineteen chapters.
- Respectful treatment of traditions without pretending their metaphysics are interchangeable.
- A consistent figure-then-widget teaching rhythm.
- Strong dark-mode typography and spacing.
- Useful figures that encode arguments rather than decorate them.
- Widgets that generally teach the chapter's claim and work at phone width.
- Honest evidence language, including effect-size caveats and limits.
- A substantial reference layer with search, glossary, routes, bibliography, index, section anchors, print styles, and per-route client metadata.
- Thoughtful safety framing in the final chapter.

The main weaknesses are systemic rather than chapter-local:

1. The repository says prerendering is done, but the production build still ships one empty SPA shell for every route. Chapter-specific social previews and no-JavaScript indexing do not work.
2. Every text exercise inherits an unlabeled `textarea` from the shared `ExerciseCard` primitive.
3. The site saves substantial personal writing in local storage but has no global notebook, export, retention explanation, or one-click data deletion.
4. The bibliography is technically complete but not usable at its current scale.
5. The book is long enough to need better return-visit and skimming support.
6. There is no automated test suite, so a bulk pass by a cheaper model has no reliable regression net.

The recommended strategy is foundation first, then chapter work. Do not start by editing prose in nineteen files.

## Audit method and evidence

The audit used the current local branch on 2026-07-15.

- Read `AGENTS.md`, `docs/authoring-spec.md`, `docs/scope-and-outline.md`, the queue, the chapter manifest, shared primitives, page components, styles, build scripts, and representative chapter/widget sources.
- Ran `pnpm typecheck`, `pnpm lint`, and `pnpm build`. All passed.
- Inspected the landing page and representative core, tradition, clinical, synthesis, evidence, practice, and safety chapters in the rendered app.
- Rendered all nineteen chapters at a 390px viewport and checked for horizontal overflow, missing page landmarks, missing titles, empty links, fields without accessible names, figure/widget counts, and sources.
- Exercised a representative keyboard-controlled widget and inspected runtime warnings.
- Checked the current crisis contacts in Chapter 18 against official sites.

Quantitative evidence:

- Nineteen MDX chapters contain 83,442 source words, including imports and source records.
- Several chapters render to roughly 15,000 to 17,000 CSS pixels at a 1280 by 720 viewport.
- All nineteen chapters rendered at 390px with no document-level horizontal overflow.
- Every chapter had one `h1`, a working `main` landmark, sources where expected, and no empty links in the automated sample.
- Text exercise fields were unlabeled in every chapter that uses them. The count ranged from two to four per page.
- The Sources page rendered to 34,116 CSS pixels and exposed 562 links.
- The production build had no errors. Its largest route chunks were Search at 409.34 kB raw, 141.29 kB gzip, and One Calm, Many Doors at 494.64 kB raw, 160.26 kB gzip.
- No test files are present.
- The convergence graph emits repeated Cytoscape warnings because the full CSS font-family stack is invalid in the graph style property.

This was a product and editorial audit, not a fresh line-by-line fact check of all 83,000 words. Earlier polish passes did substantial scholarly work, and the current prose gives real signs of it. The chapter plan below concentrates new research effort where facts are time-sensitive or evidence claims can age.

## What should not change

These are product assets, not problems:

- Keep the central claim: calm is engaged equanimity, not sedation or withdrawal.
- Keep the dark, restrained visual system and the mono/sans type split.
- Keep readable chapter slugs and the four-part structure.
- Keep figures inline and widgets focused on one felt move.
- Keep the tradition-first, comparison-later order.
- Keep local-only storage. Do not add accounts or a backend unless the product direction changes.
- Keep Zen deliberately shorter.
- Keep citations concise in the reading flow. Improve traceability without turning prose into an academic apparatus.
- Do not add more traditions simply to make the scope look exhaustive. State the selectivity of the book more clearly instead.

## Findings by priority

### P0: Build a regression net before bulk edits

There are no automated tests. Typecheck, lint, and build prove that the code compiles, not that routes render, widgets teach the right state, local data remains intact, section anchors land correctly, or safety resources are visible.

Implement:

- Vitest and React Testing Library for shared primitives and stateful utilities.
- Automated accessibility checks for representative pages and shared primitives.
- Playwright route smoke tests for all public routes at desktop and 390px.
- A no-horizontal-overflow assertion for every chapter at 390px.
- Keyboard tests for at least one slider/map widget, one timer, one sorter, the search combobox, and the self-check.
- A build-time content audit for one `h1`, section IDs, one or more teaching figures, at least one widget, actionable exercises, a reflection, and sources where required.
- Tests for local-storage key stability and clear/delete behavior.
- A source URL checker with a cache and an allowlist for paywalls, bot blocks, and archival links.
- A crisis-resource freshness test described below.

Do not let the bulk pass weaken tests to make a failing change pass.

### P0: Finish the prerender work that the queue marks done

`prompts/33-seo-print.md` requires real HTML per route. `dist/index.html` is still a single empty root with the landing-page title and description. `useDocumentHead.ts` explicitly admits that non-JavaScript unfurl bots do not receive route metadata. The queue status is therefore inaccurate.

Implement:

- Add actual SSG or prerendering for the landing page, nineteen chapters, seven route pages, glossary, sources, and index.
- Produce route-specific HTML containing the correct title, description, canonical URL, Open Graph fields, and meaningful body content.
- Keep Cytoscape client-only and lazy so prerender does not require a canvas environment.
- Make `SITE_ORIGIN` required for production builds.
- Fail a production build if the sitemap contains `REPLACE-WITH-YOUR-DOMAIN.example`.
- Add a verification script that opens built HTML files without JavaScript and checks the title, `h1`, canonical URL, and description.
- Change queue item 33 back to pending or add a corrective queue item. Do not leave the current claim of completion unqualified.

Acceptance:

- Fetching `/tranquility-by-judgment` and `/calm-is-not-numbness` from `dist` returns different HTML, titles, descriptions, and canonical tags before JavaScript runs.
- A social-card debugger receives the correct chapter metadata.
- The generated sitemap contains the intended public origin.

### P0: Fix the shared exercise-field label defect

`ExerciseCard.TextInput` renders a `textarea` with only a placeholder. Placeholders are not labels. Because this is a shared primitive, the defect appears across almost every chapter.

Implement in the primitive:

- Generate a stable field ID from chapter slug and exercise ID.
- Associate the exercise title with the field using `label`, `aria-labelledby`, or both.
- Add optional `inputLabel` only for cases where the exercise title is not a good field name.
- Add an optional clear action with confirmation for non-empty saved writing.
- Announce save state quietly, for example `saved on this device`, without an intrusive live region on every keystroke.
- Test the primitive once, then render-audit every chapter.

Also fix mobile target sizes in the top bar and chapter table of contents. At 390px, the wordmark, glossary, contents, and TOC links are visually only 15 to 18px high. Give them at least a 24px target, preferably closer to 36 to 44px where the layout permits.

### P0: Make safety-resource freshness enforceable

The Chapter 18 data was rechecked on 2026-07-15 and the main contacts still match their official sources:

- [988 Lifeline](https://988lifeline.org/): call or text 988, free and confidential, 24/7.
- [Crisis Text Line](https://www.crisistextline.org/): text HOME or HOLA to 741741 in the United States, 24/7.
- [The Trevor Project](https://www.thetrevorproject.org/get-help/): call 1-866-488-7386 or text START to 678678, 24/7.
- [Veterans Crisis Line](https://www.veteranscrisisline.net/): call 988 then press 1 or text 838255, 24/7.
- [Trans Lifeline](https://translifeline.org/hotline/): the US and Canada numbers are current, with weekday staffed hours rather than 24/7 coverage.
- [Find A Helpline](https://findahelpline.com/): remains the international directory.

The current manual date comment is not enough for a long-lived site.

Implement:

- Export one `verifiedAt` date from the resource module and render it wherever freshness is claimed.
- Add a build warning after 30 days and a hard failure after 90 days for production builds.
- Add a focused verification checklist to the prompt for every release.
- Keep phone numbers in one module only. Prose and widget displays should read from the same data where practical.
- Link directly to official contact pages.
- Qualify `confidential` where an official service states narrow imminent-safety or child-welfare exceptions.
- Keep red-flag state session-only. Audit every other saved field in Chapters 10, 11, 16, and 18 for sensitivity.

### P1: Give returning readers a home for their work

The book asks readers to write in dozens of exercises and nineteen reflections. That work is fragmented across local-storage keys with no global view. A returning reader sees no `continue reading` prompt and cannot export or delete their saved material in one place.

Build a local-only `Practice` or `Notebook` page:

- Show the last visited chapter and a continue link.
- List reflections and exercise responses by chapter.
- Show completed checkbox exercises and timer counts.
- Let the reader export all data as Markdown or JSON.
- Let the reader delete one response, one chapter's data, or all saved data.
- Explain plainly that data stays in this browser, can be lost when site data is cleared, and is not synced.
- Never send the data over the network.
- Do not display sensitive answers in a global preview by default. Collapse them behind an explicit reveal.
- Add the page to the top-level navigation without crowding the mobile bar.

Chapter 0 should explain this behavior accurately. Chapter 16 should link to the notebook as the place where the reader's practice comes together. Chapter 18 should repeat the privacy note beside sensitive saved writing.

### P1: Add two-speed reading without flattening the chapters

The depth is a strength, but several chapters are long enough to make the site feel like a manuscript placed on the web. The problem is not simply word count. It is the lack of a fast return path for a reader who remembers the chapter but needs the model or practice again.

Add shared chapter metadata:

- A one-sentence thesis.
- Three concise takeaways.
- Estimated reading time and practice time.
- The signature practice/widget name.
- `Last reviewed` for evidence-sensitive chapters.

Render a compact, collapsible `chapter_at_a_glance` block after the opening scene. Keep it closed by default if it disrupts the essay rhythm. Use the same metadata to improve search results, route pages, and the landing page.

Do not force every chapter to have the same number of takeaways if the material does not support it. Zen can remain sparse.

Editorial priorities:

- Chapter 17 is the longest source file at 6,744 words. Move the lifestyle-vocabulary catalog into the glossary or a compact reference panel and keep the chapter centered on defaults, space, time, and attention.
- Chapters 12, 13, and 10 are also long. Tighten repeated scene-setting and evidence caveats where the same point is already shown by a figure or widget.
- Keep Chapter 0 short.
- Preserve full worked examples, but vary their form. Many headings still use `one X, all the way through`, which becomes audible across the book.

### P1: Make citations traceable, not merely abundant

Most chapters end with ten to twenty-two sources, which is excellent. The reader often cannot tell which source supports a particular empirical claim. The unified bibliography also deduplicates on exact URL or exact text, so minor formatting differences create separate entries.

Implement a structured source model:

- Stable source ID.
- Author or organization.
- Title.
- Year.
- URL and optional DOI.
- Source type such as primary text, translation, review, meta-analysis, trial, or commentary.
- Optional note about the claim it supports.
- Verification date for time-sensitive resources.

Then:

- Add unobtrusive inline source markers for specific numerical, historical, clinical, and contested claims.
- Deep-link the marker to the chapter's source entry.
- Backlink from the source entry to the relevant section, not only the chapter root.
- Prefer primary text markers in tradition chapters and study/review markers in evidence chapters.
- Do not footnote every interpretive sentence.

Priority chapters for inline traceability are 1, 2, 3, 10, 13, 15, 17, and 18.

### P1: Rebuild the bibliography as a reference tool

The current Sources page is 34,116px long and exposes 562 links. It also imports every chapter module at runtime to assemble the bibliography, which can pull the heaviest chapter chunks into a page that should be mostly data.

Implement:

- Generate a bibliography data file at build time.
- Do not import all chapter components on `/sources`.
- Add search and filters for chapter, tradition, source type, author, and year.
- Group duplicate editions and translations intentionally rather than by exact string matching.
- Add stable anchors for each source.
- Show source count and filtered count.
- Keep a compact no-JavaScript rendered list for SSG and accessibility.

### P1: Improve navigation for entry, return, and reference use

The landing page is elegant, but it mainly supports a first-time linear reader. The Chapter 0 router is useful but hidden one click below the hero.

Implement:

- Add three explicit entry modes near the hero: read in order, choose a current need, or browse a tradition/route.
- Surface a `continue` card only when local reading history exists.
- Keep the seven routes visible, but add one sentence that the book claims shared methods, not shared metaphysics, linked to Chapter 14.
- Improve route pages from card lists into compact explanatory reference pages using chapter-at-a-glance metadata.
- On mobile, replace the crowded top-bar links with one compact navigation control or a responsive second row.
- Keep search directly reachable and preserve the `/` shortcut.
- Add visible new-tab cues for external source links and a screen-reader suffix such as `opens in a new tab`.

### P2: Fix smaller correctness and maintainability issues

- The Chapter 12 manifest blurb says `Four contemplative religious paths, Christian, Sufi, Jewish`, which names three traditions. Say `three traditions and four practices`, or name the four practices.
- The top bar treats every non-home page as a chapter. Reading progress and `contents` appear on search, glossary, sources, index, route pages, and not-found pages. Derive chapter status from the manifest instead of `pathname !== '/'`.
- Lazy reference routes use `fallback={null}`. Provide a small accessible loading state to avoid blank content during chunk fetch.
- Fix the Cytoscape font warning by passing a graph-compatible font family value rather than the full quoted CSS stack.
- The local build writes a placeholder public origin into `dist/sitemap.xml`. Make the failure mode loud.
- `README.md` still describes the project as early and the site as not yet built. Update it after implementation.
- Several components contain one-off hard-coded colors despite the token contract. Promote recurring slate and graph colors into semantic tokens.
- Consider moving repeated inline style objects into shared classes or primitives only where it reduces real duplication. Do not launch a broad styling refactor during content edits.

## Chapter-by-chapter pass

Each chapter task should start from the current artifact. Keep its thesis, figures, widget, worked example, exercises, reflection, links, and sources unless a finding below calls for a change.

### Chapter 0: How to Use This Book

- Explain local-only storage, loss on browser-data clearing, export, and delete controls.
- Explain the three entry modes.
- Link to the notebook/practice page once built.
- Keep the chapter short.

### Chapter 1: What Calm Is, and Isn't

- Preserve this as the conceptual spine.
- Add inline support for the suppression and trainable-set-point claims.
- Confirm the calm map remains keyboard-operable after shared widget work.
- Use its two-axis model in the at-a-glance summary.

### Chapter 2: The Settled Body

- Keep the breath cautions visible before interaction.
- Add traceable sources for vagal, HRV, and resonance claims.
- Keep 4-7-8 evidence qualified.
- Check timer/pacer announcements without per-second screen-reader chatter.

### Chapter 3: The Quiet Mind

- Add inline support for attention, wandering, negativity, and flow claims.
- Clarify where `default mode network` is a useful frame versus an overextended explanation.
- Preserve the focus-return widget as a reusable foundational practice.

### Chapter 4: Stoicism

- Preserve virtue as the Stoic end and tranquility as a byproduct.
- Keep the dichotomy of control precise.
- Vary the worked-example presentation if the repeated `all the way through` cadence remains.
- Deep-link primary-text citations.

### Chapter 5: Epicureanism

- Keep friendship and limits central so the chapter does not reduce Epicurus to desire sorting.
- Trace the desire taxonomy and tetrapharmakos to primary sources.
- Preserve the correction of the modern word `epicurean`.

### Chapter 6: Buddhism

- Preserve the careful distinction among pain, resistance, jhana, brahmavihara equanimity, and compassion.
- Keep trauma cautions near silent practice.
- Retest all three widgets on keyboard and reduced motion.
- Prefer SuttaCentral or other primary-source deep links for canonical claims.

### Chapter 7: Zen

- Keep it shorter than the other tradition chapters.
- Avoid adding an at-a-glance block that overwhelms its deliberate sparseness.
- Keep the timer simple and give it a clear completion/reset state.

### Chapter 8: Taoism

- Preserve `wu wei` as non-coercive effort, not passivity.
- Keep textual precision around `ziran` and water metaphors.
- Confirm the slider's `aria-valuetext`, live verdict, and effort/strain bars remain synchronized.

### Chapter 9: Yoga

- Keep Patañjali, the eight limbs, breath practice, and the Gita philosophically distinct.
- Preserve the seeded/seedless samadhi distinction.
- Keep breath holds optional and safely framed.
- Deep-link the primary translations used for quoted sutras.

### Chapter 10: The Engineering of Calm

- Make the boundaries among CBT, ACT, DBT, and MBSR easier to scan.
- Add inline sources for effect claims and named models.
- Audit saved thought records for privacy, clear actions, and export behavior.
- Do not frame educational tools as treatment.

### Chapter 11: Internal Family Systems

- Keep IFS Self clearly framed as a model, not an established metaphysical entity.
- Preserve the evidence caveat.
- Audit saved parts-map data for sensitivity and deletion.
- Keep protector language non-pathologizing.

### Chapter 12: Contemplative Religions

- Correct the three-tradition/four-practice description.
- Keep Judaism structurally distinct where Shabbat and Mussar do not fit the repeated-anchor model.
- Preserve the secular usability note without translating away the traditions' theistic claims.
- Tighten length where method descriptions repeat the same teaching payload.

### Chapter 13: Nature and Simplicity

- Separate Transcendentalist interpretation from current nature-exposure evidence.
- Add inline traceability for attention restoration, awe, and dose claims.
- Keep solitude distinct from loneliness.
- Tighten repeated limitations if the source marker can carry some of that work.

### Chapter 14: One Calm, Many Doors

- Preserve the current method-versus-metaphysics caveat. It is the main defense against flattening traditions.
- Lazy-load Cytoscape when the explorer nears the viewport or the reader activates it.
- Fix the graph font warning.
- Provide an equally useful textual relationship list for readers who cannot use the graph.

### Chapter 15: What Actually Works

- Publish the evidence-grade rubric and a `Last reviewed` date.
- Make each grade traceable to the strongest review/meta-analysis.
- Separate outcome, comparison condition, population, and confidence.
- Avoid presenting one letter grade as timeless across all populations and outcomes.
- Add a maintenance trigger for evidence review.

### Chapter 16: Building Your Practice

- Make this the bridge to the new notebook/practice page.
- Let the toolkit export, copy, print, and clear its saved plan consistently.
- Add a direct `continue this plan` entry on the landing page for returning readers.
- Keep subtraction and minimum effective dose central.

### Chapter 17: Designing for Calm

- Reduce length and move the international lifestyle-word catalog into glossary/reference content.
- Keep the actionable spine: space, time, attention, and defaults.
- Trace empirical claims about light, interruption, clutter, nature, and notification design.
- Avoid turning reasonable environmental suggestions into universal prescriptions.

### Chapter 18: Calm Is Not Numbness

- Keep the full safety material visible outside the widget.
- Centralize resource data and freshness dates.
- Qualify confidentiality where official terms require it.
- Keep red flags session-only.
- Add clear privacy controls for saved reflection/exercise answers.
- Retest the full self-check with keyboard and screen reader semantics.

## Queue-ready implementation order

Add a new Phase C to `prompts/queue.md`. Each item gets its own prompt, green gates, and commit. Do not combine the whole plan into one commit.

1. `34-regression-foundation`: add unit, accessibility, route smoke, mobile-overflow, local-storage, and content-contract tests.
2. `35-real-prerender`: implement SSG/prerender, production-origin validation, and static-head tests.
3. `36-shared-a11y-mobile`: fix exercise labels, target sizes, loading states, external-link cues, and chapter-page detection.
4. `37-saved-work-notebook`: implement continue reading, notebook, export, delete, and privacy copy.
5. `38-structured-sources`: create structured source data, inline markers, and build-time bibliography generation.
6. `39-reference-navigation`: rebuild Sources, enrich route pages, and improve landing/top-bar entry modes.
7. `40-ch00`: Chapter 0 pass.
8. `41-ch01`: Chapter 1 pass.
9. `42-ch02`: Chapter 2 pass.
10. `43-ch03`: Chapter 3 pass.
11. `44-ch04`: Chapter 4 pass.
12. `45-ch05`: Chapter 5 pass.
13. `46-ch06`: Chapter 6 pass.
14. `47-ch07`: Chapter 7 pass.
15. `48-ch08`: Chapter 8 pass.
16. `49-ch09`: Chapter 9 pass.
17. `50-ch10`: Chapter 10 pass.
18. `51-ch11`: Chapter 11 pass.
19. `52-ch12`: Chapter 12 pass.
20. `53-ch13`: Chapter 13 pass.
21. `54-ch14`: Chapter 14 pass and Cytoscape lazy loading.
22. `55-ch15`: Chapter 15 evidence rubric and review-date pass.
23. `56-ch16`: Chapter 16 notebook/toolkit integration.
24. `57-ch17`: Chapter 17 editorial and sourcing pass.
25. `58-ch18`: Chapter 18 safety, privacy, and resource-freshness pass.
26. `59-performance-reference`: bundle budgets, Sources performance, search payload, and graph loading.
27. `60-final-book-audit`: cover-to-cover voice scan, route metadata, links, print, no-JS render, keyboard, reduced motion, mobile, and current crisis-resource verification.

The chapter prompts should not repeat shared fixes already completed in items 34 to 39. Their job is editorial, scholarly, and chapter-specific integration.

## Definition of done for Phase C

- Typecheck, lint, unit tests, accessibility tests, route smoke tests, and production build pass.
- Every public route ships meaningful prerendered HTML with correct metadata.
- Every input has an accessible name.
- Every chapter renders without horizontal overflow at 390px.
- All primary widget actions work with keyboard only.
- Reduced motion removes nonessential motion without breaking state changes.
- Saved personal work can be viewed, exported, and deleted locally.
- Sensitive state is not surfaced globally without an explicit reveal.
- The bibliography is searchable/filterable and does not import chapter UI bundles.
- Evidence-sensitive chapters show a review date and traceable claim sources.
- Crisis contacts have been checked against official sources within 30 days.
- No reader-facing em dashes or banned voice tells are introduced.
- The README and queue accurately describe the finished system.

## Suggested handoff prompt for Terra

Use this prompt once the Phase C queue entries exist:

> Work in `/Users/darvin/Documents/Projects/darvinyi-centering`. Read `AGENTS.md`, `docs/authoring-spec.md`, `docs/scope-and-outline.md`, and `docs/site-critique-and-improvement-plan.md` before making changes. Run the next PENDING Phase C item only, then stop. Preserve the current thesis, visual system, figures, and widgets unless the item's prompt explicitly changes them. Do not perform broad prose rewrites. For chapter items, read the full current MDX, figure sources, widget sources, and listed sources before editing. Use primary sources for factual changes. Run every gate required by AGENTS.md plus the Phase C test suite. Do not mark the item done on a failing gate. Commit only the scoped item with a conventional message. Report what changed, what evidence you checked, and any advisory follow-up.

For the foundation tasks, give Terra exact file-level acceptance tests in each queue prompt. Cheaper models do much better when the success condition is executable rather than aesthetic.

## How the original request could be stronger

The original request was sufficient. It clearly separated planning from implementation and named the downstream model. A stronger version would remove the few remaining scope questions:

> Audit the current local `darvinyi-centering` site as a finished interactive textbook. Do not change application code. You may run the local dev server, use browser automation at desktop and 390px, browse official sources, run read-only diagnostics, and write and commit one Markdown handoff plan under `docs/`. Cover product thesis, information architecture, visual design, editorial coherence, scholarly trust, accessibility, interaction design, mobile behavior, performance, SEO, safety, and maintainability. Distinguish verified defects from preferences. Preserve the existing thesis and house style. Produce prioritized, queue-ready work units that a cheaper implementation model can execute one at a time, with acceptance criteria and a chapter-by-chapter checklist. State the limits of the audit and list any production data or permissions that would improve confidence.

Useful optional inputs:

- The production URL and intended canonical domain.
- Read-only analytics, Search Console, and Core Web Vitals data.
- The primary audience and desired reading behavior: linear textbook, reference work, practice companion, or a deliberate blend.
- A constraint on editorial change, for example `no chapter may change by more than 15 percent without approval`.
- Whether a new notebook/progress feature is in scope.
- Whether the handoff plan should be committed.

No extra permission was required for this local audit after browser access was restored. For a production-behavior audit, read-only analytics and deployment metadata would materially improve prioritization. Without them, findings about return visits, search behavior, abandonment, and real Core Web Vitals remain informed hypotheses rather than observed user behavior.
