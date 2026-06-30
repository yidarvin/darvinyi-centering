# Build: Ch 15 — What Actually Works

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch 15 — What Actually Works". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/what-actually-works.mdx`, with any chapter-specific components under `src/components/chapters/what-actually-works/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
- The real evidence base: meta-analyses on mindfulness and MBSR (for example Goyal et al. 2014, JAMA Internal Medicine), slow breathing and HRV biofeedback, CBT and ACT outcomes, nature exposure, lovingkindness. The predictive-processing account of calm and anxiety (Friston, and clinical applications). Be honest about modest effects, heterogeneity, small samples, and publication bias.

## Build notes for this chapter
- Build a graded evidence map, a route-to-mechanism table, and the predictive-brain loop. Grade the evidence transparently and cite real studies. This chapter must be rigorous.

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch15): what-actually-works`.
