# Run Queue — Centering

Run order, top to bottom. Status is PENDING, DONE, or SKIPPED. "Next" is the first PENDING item. Update the status cell after each run. See `CLAUDE.md` for the workflow and the trigger phrases.

| # | item | file | status |
|----|------|------|--------|
| 00 | scaffold and site shell | `prompts/00-scaffold.md` | DONE |
| 01 | Ch 1 — What Calm Is, and Isn't | `prompts/ch01-what-calm-is.md` | DONE |
| 02 | Ch 2 — The Settled Body | `prompts/ch02-the-settled-body.md` | DONE |
| 03 | Ch 3 — The Quiet Mind | `prompts/ch03-the-quiet-mind.md` | DONE |
| 04 | Ch 4 — Stoicism: Tranquility by Judgment | `prompts/ch04-tranquility-by-judgment.md` | DONE |
| 05 | Ch 5 — Epicureanism: Enough, and No Fear | `prompts/ch05-enough-and-no-fear.md` | DONE |
| 06 | Ch 6 — Buddhism: Calm Abiding | `prompts/ch06-calm-abiding.md` | DONE |
| 07 | Ch 7 — Zen: The Ordinary Mind | `prompts/ch07-the-ordinary-mind.md` | DONE |
| 08 | Ch 8 — Taoism: The Watercourse Way | `prompts/ch08-the-watercourse-way.md` | DONE |
| 09 | Ch 9 — Yoga and the Stilling of the Mind | `prompts/ch09-stilling-the-mind.md` | DONE |
| 10 | Ch 10 — The Engineering of Calm | `prompts/ch10-the-engineering-of-calm.md` | DONE |
| 11 | Ch 11 — Internal Family Systems: The Calm at the Center | `prompts/ch11-the-calm-at-the-center.md` | DONE |
| 12 | Ch 12 — Stillness and Surrender: The Contemplative Religions | `prompts/ch12-stillness-and-surrender.md` | DONE |
| 13 | Ch 13 — Nature and Simplicity: The Transcendentalists | `prompts/ch13-nature-and-simplicity.md` | DONE |
| 14 | Ch 14 — One Calm, Many Doors | `prompts/ch14-one-calm-many-doors.md` | DONE |
| 15 | Ch 15 — What Actually Works | `prompts/ch15-what-actually-works.md` | DONE |
| 16 | Ch 16 — Building Your Practice | `prompts/ch16-building-your-practice.md` | DONE |
| 17 | Ch 17 — Designing for Calm | `prompts/ch17-designing-for-calm.md` | DONE |
| 18 | Ch 18 — Calm Is Not Numbness | `prompts/ch18-calm-is-not-numbness.md` | DONE |

## Phase B — Polish & Elevation

A critique-driven pass that lifts the finished book to reference-guide quality. Run 19–28 in order first (Tiers 1–6). Items 29–33 are the optional reference-layer; if taken, do 29 first. Plan and rationale: `/Users/darvin/.claude/plans/this-is-an-calmness-starry-kay.md`. One item per run; leave `typecheck`/`lint`/`build` green and commit at the end of each.

| # | item | file | tier | status |
|----|------|------|------|--------|
| 19 | Safety & self-check hardening | `prompts/19-safety-a11y.md` | 1 · critical | DONE |
| 20 | Overstated-claim corrections | `prompts/20-claim-corrections.md` | 1 · critical | DONE |
| 21 | Widget accessibility hardening | `prompts/21-widget-a11y.md` | 2 · focus | DONE |
| 22 | Figure accessibility & legibility | `prompts/22-figure-a11y.md` | 2 · focus | DONE |
| 23 | Figure-vs-prose consistency | `prompts/23-figure-prose.md` | 3 · focus | DONE |
| 24 | Voice de-templating sweep | `prompts/24-voice.md` | 4 · focus | DONE |
| 25 | Faithfulness & scholarly precision | `prompts/25-faithfulness.md` | 5 | DONE |
| 26 | Sourcing hygiene & quick wins | `prompts/26-sourcing.md` | 5 | DONE |
| 27 | Buddhism (calm-abiding) critique-fix | `prompts/27-buddhism.md` | 6 | DONE |
| 28 | Taoism (watercourse-way) critique-fix | `prompts/28-taoism.md` | 6 | DONE |
| 29 | Section anchors + per-chapter TOC | `prompts/29-anchors-toc.md` | 7 · optional | DONE |
| 30 | Full-text search | `prompts/30-search.md` | 7 · optional | DONE |
| 31 | Glossary + Term component | `prompts/31-glossary.md` | 7 · optional | DONE |
| 32 | Route-browse + bibliography + index | `prompts/32-route-bib-index.md` | 7 · optional | DONE |
| 33 | SEO/prerender + print stylesheet | `prompts/33-seo-print.md` | 7 · optional | PENDING |
