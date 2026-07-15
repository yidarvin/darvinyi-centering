# Final audit, 2026-07-15

Owner: project maintainers.
Last reviewed: 2026-07-15

This release audit covered the completed interactive textbook, its generated public pages, and the current crisis-resource guidance.

## Results

| Check | Result |
| --- | --- |
| Unit and component tests | 20 passing |
| Typecheck and lint | Passing |
| Production build | Passing |
| Static audit | 31 prerendered pages with title, description, canonical, Open Graph URL, local links, and section anchors valid |
| Phone layout | All 31 public routes fit a 390px viewport in Chromium |
| Keyboard interaction | The Force or Flow slider reports state changes through native keyboard input and a live status region |
| JavaScript-disabled render | Chapter, landing, notebook, and sources content and metadata render from prerendered HTML |
| Reader-facing prose | No em dashes in chapter MDX |
| Bundle budgets | Shared application, search, sources, and graph-chapter chunks remain within their recorded limits |

The audit found and corrected one broken local link: the glossary entry for *shoshin* now targets the generated `beginner-s-mind` anchor in the Zen chapter.

## Safety-resource verification

The Chapter 18 resource list was checked against official pages on 2026-07-15. The verified U.S. routes are [988 Lifeline](https://988lifeline.org/), [Crisis Text Line](https://www.crisistextline.org/text-us/), [The Trevor Project](https://www.thetrevorproject.org/get-help/), [Veterans Crisis Line](https://www.veteranscrisisline.net/), [Trans Lifeline](https://translifeline.org/hotline/), and [SAMHSA National Helpline](https://www.samhsa.gov/find-help/helplines/national-helpline). [Find A Helpline](https://findahelpline.com/) remains the international starting point.

These services and their regional details can change. The chapter labels the list with its verification date and asks readers to confirm local options when they use them.

## Limits

This audit validates the local production build. It does not include deployed Core Web Vitals, analytics, or Search Console data. The canonical build origin is `https://centering.darvinyi.com`; `SITE_ORIGIN` remains available when a preview or future migration needs a different origin.
