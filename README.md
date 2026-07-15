# Centering

*The philosophies and practices of calm.*

An interactive textbook website on the traditions and methods that build a calm center: Stoicism, Epicureanism, Buddhism, Zen, Taoism, Yoga, the modern clinical methods, Internal Family Systems, the contemplative religions, and the Transcendentalists. Figure-rich and widget-rich, not a wall of text.

The throughline: calm is not the absence of trouble, and it is not numbness. It is a trained, engaged relationship to experience. People keep rediscovering the same few routes to it across very different worldviews. The book walks those routes, shows where they agree, and says which ones the evidence supports.

## The shape of the book

Four parts, eighteen chapters.

1. **Ground** — what calm is and isn't, the settled body, the quiet mind.
2. **The traditions** — each contemplative tradition on its own terms: Stoicism, Epicureanism, Buddhism, Zen, Taoism, Yoga, the engineering of calm (the clinical methods), Internal Family Systems, the contemplative religions, the Transcendentalists.
3. **Convergence** — where the roads meet (the seven recurring routes to calm) and what the evidence actually supports.
4. **Practice** — building your own practice, designing for calm, and the closing chapter: calm is not numbness.

The seven recurring routes, tagged across the tradition chapters and collected in Part III: *letting go, presence, the body, perspective, enough, connection, meaning.*

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [MDX](https://mdxjs.com/) for chapter prose
- [React Router](https://reactrouter.com/) with readable slugs
- Hand-built SVG figures and React widgets, no chart library
- Deployed on [Vercel](https://vercel.com/)

House style: dark base (`#0a0a0b`), teal (`#2dd4bf`) as the constant accent, JetBrains Mono for structure and Inter for body. The repeating chapter rhythm is *figure then widget*: a diagram that teaches the structure, then an interactive moment where the reader feels the idea.

## Project layout

```
docs/
  scope-and-outline.md     # the content contract: every chapter's thesis, figures, widget, exercises
  authoring-spec.md        # the build contract: voice, design system, figure/widget/exercise standards
  prototypes/              # reference implementations (the gold standard for look and feel)
prompts/
  queue.md                 # the ordered run list, one unit of work per chapter
  00-scaffold.md           # site shell
  chNN-*.md                # one prompt per chapter
src/                        # the site (created by the scaffold step)
  content/chapters/        # chapter prose as MDX
  components/chapters/      # chapter-specific components
CLAUDE.md                   # project memory and the build workflow
```

## Status

The complete eighteen-chapter book, reference pages, saved-work notebook, searchable bibliography, and static prerendering are implemented. `prompts/queue.md` records the completed quality passes.

Production builds generate a sitemap, bibliography data, and prerendered HTML for every public route. They also enforce bundle budgets and audit generated metadata, local links, section anchors, and reader-facing em dashes.

## Commands

```bash
pnpm install      # install dependencies (fallback: npm install)
pnpm dev          # local dev server
pnpm typecheck    # tsc --noEmit
pnpm lint         # lint
pnpm build        # production build
pnpm test         # unit and component tests
pnpm test:e2e     # Chromium checks, including all public routes at phone width
```

Run tests, typecheck, lint, build, and browser checks before finishing a substantial change.

## Building the book

Work is organized as a queue of self-contained prompts in `prompts/queue.md`, run in order. Each item produces one scaffold or one full chapter, built to the standards in `docs/authoring-spec.md` and the per-chapter spec in `docs/scope-and-outline.md`. See `CLAUDE.md` for the full workflow.

## A note on the subject

This is education, not therapy or diagnosis. The book keeps the equanimity-is-not-numbness honesty throughout. The final chapter carries the when-to-get-help material and routes to current crisis resources, framed clearly as not a diagnosis.
