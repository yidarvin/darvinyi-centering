# Polish 33 — Per-page SEO/prerender + print (OPTIONAL / reference layer)

Queue item (Phase B, Tier 7 — optional). Operate per `CLAUDE.md`. Discovery and portability infrastructure: individual pages should be found, shared, and saved.

## Build
- **Per-route head:** add per-route title/description/canonical/OpenGraph management (a `useEffect` in `src/pages/ChapterPage.tsx`, or `react-helmet-async`) pulling from a new per-chapter blurb field on the `src/content/chapters.ts` manifest. Today `index.html` ships one static title/description for all 19 routes.
- **Prerender:** add SSG/prerender (e.g. a prerender pass over `CHAPTERS`, or `vite-plugin-ssg`) so each route ships real HTML for no-JS crawlers. Keep the `one-calm-many-doors` Cytoscape chunk lazy.
- **Crawl assets:** generate `public/sitemap.xml` + `robots.txt` from `CHAPTERS` at build; add a favicon and an og:image.
- **Print:** add an `@media print` block to `src/styles/global.css` (light-on-white, hide TopBar/progress/skip-link/controls, reveal link URLs, sensible page breaks) and a static print fallback for widgets via `src/components/WidgetShell.tsx`.

## Definition of done
- Each route unfurls with its own title/description/OG and ships real HTML; sitemap/robots present; chapters print legibly light-on-white with chrome hidden.
- Typecheck, lint, build pass. Verify a couple of routes' `<head>`, the print preview, and that the Cytoscape chunk stays route-split. Commit as `feat(seo): per-page metadata, prerender, sitemap, and print stylesheet`.
