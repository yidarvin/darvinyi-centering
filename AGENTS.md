# AGENTS.md — Centering

Project memory for Codex. Read this fully before doing anything.

## What this is
"Centering" is a textbook website on the philosophies and practices of calm: Stoicism, Buddhism, Taoism, Zen, Epicureanism, Yoga, the modern clinical methods, Internal Family Systems, the contemplative religions, and the Transcendentalists. It is an interactive, figure-rich, widget-rich site, not a wall of text.

- Stack: Vite, React, TypeScript. MDX for chapter prose. React Router with readable slugs. Deployed on Vercel.
- Repo: `darvinyi-centering`.

## Where things live
- `docs/scope-and-outline.md` — the full outline. Each chapter's thesis, routes, figures, widget, and exercises. This is the content contract for what a chapter contains.
- `docs/authoring-spec.md` — the build contract. Voice, chapter anatomy, design system, figure and widget and exercise standards, research protocol, and the definition of done. Read this before building any chapter.
- `docs/prototypes/` — two reference implementations (`DichotomyOfControl.jsx`, `PartsMapper.jsx`). The gold standard for the figure-then-widget pattern and the house style. Match this quality.
- `prompts/` — the work queue. `queue.md` is the ordered run list. Each `00-scaffold.md` and `chNN-*.md` is one unit of work.
- `src/` — the site.

## Golden rules
1. Read `docs/authoring-spec.md` and the relevant chapter entry in `docs/scope-and-outline.md` before building.
2. Voice: no em dashes, ever. None of the banned tells listed in the spec. Write like a person. This applies to all reader-facing prose.
3. Reuse the shared primitives. Do not invent new patterns without a reason.
4. Quality over speed. This is a product, not a draft.
5. Never mark a queue item done if typecheck, lint, or build fails.
6. Commit at the end of every run.

## Commands
- Install: `pnpm install` (fallback `npm install`)
- Dev: `pnpm dev`
- Typecheck: `pnpm typecheck` (`tsc --noEmit`)
- Lint: `pnpm lint`
- Build: `pnpm build`

Run typecheck, lint, and build before finishing any run.

## The queue workflow

The queue is `prompts/queue.md`. It lists units of work in run order, each with a status: PENDING, DONE, or SKIPPED. "Next" is the first item that is still PENDING.

### Phrases
- "run the next one" / "run next" — run the next PENDING item, then stop.
- "run the next N" (for example "run the next 3") — run that many PENDING items in order, committing after each, then stop.
- "run the queue" / "keep going" — run all remaining PENDING items in order. Pause and ask if anything is ambiguous or risky.
- "queue status" / "what's next" — print the list with statuses and name the next item. Do not build.
- "rerun <id>" — redo a specific item (for example "rerun ch06"), even if DONE.
- "skip <id>" — mark an item SKIPPED and move on.
- "stop" — halt after the current step.

### Per-run procedure (follow every step)
1. Identify the next PENDING item in `prompts/queue.md`. State which item you are running and what it will produce.
2. Load context: read the item's prompt file, its chapter entry in `docs/scope-and-outline.md`, and `docs/authoring-spec.md`. If the chapter has a prototype, read it from `docs/prototypes/`.
3. Research, when the prompt calls for it. Use web search and fetch. Prefer primary sources and reputable scholarship. Represent every tradition faithfully and on its own terms. Be honest about evidence. Use public-domain translations or your own paraphrase, never long copyrighted passages. Keep notes and a per-chapter Sources list.
4. Plan. Outline the files, components, figures, and widget before writing code. For a chapter, draft the prose structure and the worked example first.
5. Build. Implement to the spec and the design tokens. Reuse primitives. Put chapter prose in `src/content/chapters/<slug>.mdx` and chapter-specific components in `src/components/chapters/<slug>/`.
6. Self-review against the definition of done in `docs/authoring-spec.md`. Re-read the prose for em dashes and AI tells. Check every figure for accuracy and labels. Exercise the widget at mobile width, with the keyboard, and with reduced motion.
7. Verify. Run typecheck, lint, and build. Fix everything. Do not proceed on a broken build.
8. Commit. A conventional message, for example `feat(ch04): stoicism, tranquility by judgment`.
9. Update `prompts/queue.md`: set the item to DONE.
10. Report a short summary: what you built, the sources you used, any follow-ups. Then stop, unless you were told to run several.

### Guardrails
- One item per run unless asked for more. Never auto-advance past your instruction.
- Keep each run scoped to its item. If you notice unrelated problems, write them down, do not fix them mid-run.
- If a step is blocked, or a decision is genuinely ambiguous, stop and ask rather than guess.
- The first item (00 scaffold) must be complete and green before any chapter runs.

## A note on the subject
This is education, not therapy or diagnosis. Keep the equanimity-is-not-numbness honesty throughout. The final chapter carries the when-to-get-help material and must route to accurate, current crisis resources, framed clearly as not a diagnosis. Verify those resources at build time.
