# Polish 24 — Voice de-templating sweep

Queue item (Phase B). Operate per `CLAUDE.md`; voice rules in `docs/authoring-spec.md`. Line-to-line the prose is excellent and passes every mechanical rule; the seam only shows cover-to-cover, where a few structural templates and pet phrases repeat until an attentive reader hears the machine. **Surgical rewordings, not rewrites.** Two short chapters (`the-settled-body`, `what-calm-is`) have little slack under the word floor — backfill with substance, not filler.

## Fixes
- **Cold-open template:** 14 of 17 chapters open with present-tense second-person time-stamped mundane scenes. Keep it for ~half; open the rest on a claim, a source, a historical scene, a question, or an object. Fix the two Sunday-night openers (`what-calm-is.mdx`, `the-calm-at-the-center.mdx`) and thin the "it is [late hour] and you are ruminating" cluster.
- **Near-verbatim openers:** rewrite one of the two "you are three [hours/days] ahead, rehearsing a conversation" openers (`the-ordinary-mind.mdx:29` vs `the-quiet-mind.mdx:38`); retire "rehearsing a conversation" as the default mind-wandering image after 2–3 uses.
- **"The honest [noun] is…" / "Be honest about…"** (nearly every chapter): vary it — sometimes state the limitation plainly, sometimes name the specific weakness (sample size, single site, no active control), sometimes let the number carry it.
- **"Here is the [noun]" pivots** (~12 chapters): cut most. Vary the "Take a real X and walk it through the model" worked-example frame. Vary the "Watch what X does" imperative (3× in `the-watercourse-way` alone — coordinate with item 28).
- **Pet phrases:** thin "the whole [thing/point/lever]" (~24 uses) and ~half the "this book / this whole book" self-references; spot-vary the "Same X." / "That is the X." punch fragments; separate the two adjacent "The harder you X, the Y" openers (`stilling-the-mind` / `stillness-and-surrender`).

## Target files
Primarily `the-ordinary-mind.mdx`, `the-quiet-mind.mdx`, `what-calm-is.mdx`, `the-calm-at-the-center.mdx`, `stilling-the-mind.mdx`, `stillness-and-surrender.mdx`, `nature-and-simplicity.mdx`, `the-watercourse-way.mdx`, with light touches elsewhere.

## Definition of done
- The repeated templates and pet phrases are varied without harming any individual sentence; worked examples and honest hedges preserved.
- Re-grep for em dashes (must stay 0) and the banned tells after editing. Confirm the two short chapters did not drop below the word floor.
- Typecheck, lint, build pass. Commit as `style(voice): de-template repeated openers and pet phrases across chapters`.
