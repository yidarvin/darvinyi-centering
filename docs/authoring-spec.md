# Authoring Spec — Centering

The build contract for every chapter. Read this with `docs/scope-and-outline.md` (the per-chapter content) and `CLAUDE.md` (how to operate the queue).

## The book in one paragraph
Calm is not the absence of trouble and not numbness. It is a trained, engaged relationship to experience, and people keep rediscovering the same few routes to it across very different worldviews. The book walks those routes, shows where they converge, and says which ones the evidence supports. The spine, drawn on the first page and the last: equanimity versus suppression. Real calm is engaged, not checked out.

## Voice
- Plain, grounded, direct. Second person where it helps the reader do something.
- No em dashes. None. Use periods, commas, colons, or parentheses. Restructure the sentence instead.
- Vary sentence length. Short sentences and the occasional deliberate fragment are good.
- Concrete over abstract. Show each idea on a real situation, not a hypothetical "one."
- Banned tells: "it's not X, it's Y," reflexive lists of three, "here's the thing," "let's dive in," "in today's fast-paced world," "crucial," "robust," "seamless," "tapestry," "delve," "navigate the complexities," "unlock," "elevate," "game-changer."
- Light hand on hedging and on bold. Say the thing.
- Present each tradition on its own terms before any comparison. Steelman it. The contemplative-religions chapter is a respectful survey, not advocacy, and stays usable by a secular reader without the metaphysics.

## Chapter anatomy (the repeating rhythm)
1. Open with a scene or a question. Concrete, human.
2. Teach the model in prose, with figures inline where the idea is introduced.
3. Route tags near the top (tradition chapters): which of the seven routes this chapter uses.
4. One signature widget: the interactive moment where the reader feels the idea, not just reads it.
5. A worked example: one real situation taken through the method, start to finish.
6. Exercises to try: a short set at the end, as ExerciseCards, saved locally.
7. A reflection prompt: the terminal-styled input, one good question.
8. Links: prev, next, and see-also to related chapters and routes.
9. Sources: a short, honest list of what you drew on.

## The seven routes
letting go, presence, the body, perspective, enough, connection, meaning. Tag each tradition chapter with the routes it leans on, using the `RouteTags` component and the shared definition in `src/content/routes.ts`. Part III (One Calm, Many Doors) collects them, so the tags must be consistent across chapters.

## Design system
- Dark base `#0a0a0b`, panels `#0f1012` and `#141517`, hairline borders at low white alpha.
- Teal `#2dd4bf` is the constant accent: the calm center. Secondary accents (amber `#f0b429`, coral `#fb7185`, violet `#a78bfa`) are used semantically within a chapter. In Ch 11 they keep their IFS part meanings (managers, firefighters, exiles).
- JetBrains Mono for structure, labels, captions, and the code-comment chapter numbering (`§ 04.1`). Inter for body.
- Motifs: code-comment section markers, figure then widget, the terminal reflection block (pathed to the project, for example `~/centering/04.1`), prev and next nav.
- Use the shared primitives: `ChapterHeader`, `SectionMarker`, `Figure`, `WidgetShell`, `ExerciseCard`, `Reflection`, `ChapterNav`, `RouteTags`, and the `useLocalStorage` hook. Match `docs/prototypes/` for look and feel.

## Figures
- SVG, hand-built, on palette. Each figure encodes something true. No decoration.
- Accurate first. A diagram that misrepresents the idea is worse than no diagram.
- Labeled with a mono caption (`fig_NN.x — name`) and a short sub-line where it helps.
- Responsive: legible on a phone. Provide a stacked variant for wide figures.

## Widgets
- One signature widget per chapter. The felt moment, not a toy.
- Built with the primitives and React state. Persist with `useLocalStorage` where the reader produces something worth keeping.
- Accessible: keyboard operable, visible focus, `prefers-reduced-motion` respected. Works at mobile width.
- The interaction should teach the concept by doing, the way the dichotomy sorter and the parts-mapper do.

## Exercises
- Concrete, doable, tied to the chapter. Real practices, not prompts to "reflect deeply."
- Rendered as ExerciseCards with the right input (text, checkbox, or a simple timer) and saved locally.
- Safe. Note light contraindications where relevant, for example: do not force the breath, stop breathwork if lightheaded.

## Research protocol
- Research before building any chapter whose prompt calls for it.
- Primary sources first (the actual texts), then reputable scholarship. Cite them in the Sources list.
- Represent each tradition faithfully and on its own terms. Do not flatten real differences between traditions, especially in the comparative and contemplative-religions chapters.
- Evidence chapters (What Actually Works, and any empirical claim anywhere) must cite real studies and be honest about modest effects, heterogeneity, and weak spots. Grade the evidence, do not oversell it.
- Copyright: use public-domain translations or your own paraphrase. Keep any quotation short. Never reproduce long copyrighted passages.

## Definition of done (every chapter)
- Matches its content spec in `docs/scope-and-outline.md`: every listed figure built and accurate, the signature widget built and working, the exercises present.
- Voice clean: no em dashes, none of the banned tells, reads like a person.
- Figures accurate, labeled, responsive.
- Widget: signature interaction works, keyboard operable, mobile, reduced motion.
- Exercises persist via `useLocalStorage`.
- Route tags correct and consistent with Part III.
- A Sources list with real references.
- Cross-links (prev, next, see-also) correct.
- Typecheck, lint, and build pass.
- Committed.

## Depth bar
These are full chapters, not summaries. Aim for thorough teaching prose (roughly 2500 to 4500 words for a standard chapter), several accurate figures, one strong widget, a worked example, and three to four exercises. Zen is the deliberate exception: keep it short and spare, the restraint is the design. Do not pad. Every paragraph earns its place.
