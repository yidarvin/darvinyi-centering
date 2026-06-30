# Build: 00 — Scaffold and the site shell

The first run. Build the project skeleton, the design system, the shared primitives, the site shell, and Chapter 0 (How to Use This Book) end to end, so the chapter pipeline is proven and green. No other chapters in this run.

Read `docs/authoring-spec.md` and `docs/scope-and-outline.md` first. Match the quality of `docs/prototypes/`.

## 1. Project init
- Vite, React, TypeScript. Package manager pnpm (npm fallback).
- Dependencies: `react`, `react-dom`, `react-router-dom`; `vite`, `@vitejs/plugin-react`, `typescript`; `@mdx-js/rollup`, `@mdx-js/react`, `remark-gfm`; `@fontsource/jetbrains-mono`, `@fontsource-variable/inter`; `lucide-react`; `clsx`.
- Dev tooling: `eslint`, `prettier`, `typescript-eslint`, with sane configs. Scripts: `dev`, `build`, `preview`, `typecheck` (`tsc --noEmit`), `lint`.
- Path alias `@/` to `src/`.
- Note: `cytoscape` and `react-cytoscapejs` are needed later (Ch 14). Install them when that chapter is built, not now.

## 2. MDX
- Wire `@mdx-js/rollup` into Vite so `.mdx` files import as components.
- Provide an MDX components map (via `MDXProvider`) that renders Markdown elements in the house style: h1, h2, h3, p, blockquote and cite, ul, ol, li, strong, em, code, a, hr. This is the prose typography layer. Tune line length, leading, and spacing for long-form reading.

## 3. Theme and tokens
- `src/styles/tokens.ts` and CSS variables for the palette (see the spec), spacing, radii, and the two font stacks (JetBrains Mono, Inter). Dark base only.
- Global styles: background `#0a0a0b`, body Inter, a selection color, a `focus-visible` outline in teal, `prefers-reduced-motion` handling, and a reading-column max width near 720px.

## 4. Shared primitives (`src/components/`)
Build these as the reusable kit. Match `docs/prototypes/` for look and feel.
- `ChapterHeader`: eyebrow (part label), `§` number, title, mono subtitle.
- `SectionMarker`: the code-comment style section divider.
- `Figure`: caption (`fig_NN.x`), bordered panel, optional sub-line, responsive, children are SVG.
- `WidgetShell`: a consistent widget frame with a mono header (`widget_NN`, name), an optional legend slot, and a body. Reduced-motion aware.
- `RouteTags`: render the seven routes as small tags. The shared routes definition (id, label, color) lives in `src/content/routes.ts`.
- `ExerciseCard`: title, body, an optional input (text area, checkbox, or a simple countdown timer), and persistence via `useLocalStorage` keyed by chapter slug plus exercise id. A chapter renders a set of these.
- `Reflection`: the terminal-styled block (path like `~/centering/00.x`), a prompt line, and a saved text area (`useLocalStorage`).
- `ChapterNav`: prev and next, read from the chapters manifest, using the readable slugs.
- `useLocalStorage` hook: safe, typed, no SSR assumptions.

## 5. Content model and manifest
- `src/content/chapters.ts`: the ordered manifest of all chapters, each `{ num, part, title, slug, subtitle }`, covering Ch 0 through Ch 18 with the slugs below. This drives the index, routing, and nav.
- Chapter prose lives at `src/content/chapters/<slug>.mdx`. Chapter-specific components live at `src/components/chapters/<slug>/`.
- Slugs: `0 how-to-use-this-book`, `1 what-calm-is`, `2 the-settled-body`, `3 the-quiet-mind`, `4 tranquility-by-judgment`, `5 enough-and-no-fear`, `6 calm-abiding`, `7 the-ordinary-mind`, `8 the-watercourse-way`, `9 stilling-the-mind`, `10 the-engineering-of-calm`, `11 the-calm-at-the-center`, `12 stillness-and-surrender`, `13 nature-and-simplicity`, `14 one-calm-many-doors`, `15 what-actually-works`, `16 building-your-practice`, `17 designing-for-calm`, `18 calm-is-not-numbness`.

## 6. Routing and shell
- React Router with one route per chapter using the readable slug, generated from the manifest. Lazy-load chapter MDX. Scroll to top on navigation. A 404 route.
- Landing page (`/`): a hero with the "Centering" wordmark in JetBrains Mono, the subtitle "the philosophies and practices of calm," and the one-line thesis. Then a short overview of the seven routes. Then the chapter list grouped by Part I to IV, each chapter a card with its number and title, linking to its slug. Restrained motion, dark, on brand.
- Chapter layout: `ChapterHeader`, the MDX content in the reading column, the `Reflection`, the `ChapterNav`. Responsive, keyboard friendly.
- A minimal top bar with a home link and, optionally, a subtle reading-progress indicator.

## 7. Chapter 0 — How to Use This Book
Build this chapter fully, as the pipeline proof and as real content. Content spec: `docs/scope-and-outline.md`, the entry "Ch 0 — How to Use This Book." It uses a "where to start" router widget (pick what pulls you, route to a chapter), prose explaining the rhythm and the honest framing (education, not therapy), and two exercises (set a two-week intention, pick a starting route). Keep it warm and short.

## 8. Vercel
- `vercel.json` with an SPA rewrite so deep links to readable slugs resolve (rewrite all paths to `/index.html`). Confirm the Vite framework build works.

## Definition of done
- `pnpm dev` runs. The landing page renders. Chapter 0 renders end to end with its widget, its exercises (persisting on reload), and its reflection.
- Navigation between the manifest chapters works with readable slugs, including a hard refresh on a deep link (the Vercel rewrite).
- Reduced motion respected, focus visible, mobile clean.
- Typecheck, lint, and build pass.
- Commit as `chore(scaffold): project, design system, shell, chapter 0`.
