# Polish 25 — Cross-tradition faithfulness & scholarly precision

Queue item (Phase B). Operate per `CLAUDE.md`. The book is faithful on the whole; a handful of framings would draw a scholar's objection (modern self-help readings imposed on traditions that resist them, terms/lineages assigned to the wrong literature). Low cost, high scholar-trust. Confirm each change against a primary source or reputable scholarship before committing.

## Fixes
- **Ch4 Stoicism** `tranquility-by-judgment.mdx`: state that the telos is virtue and tranquility is a byproduct, not the aim (~`:40`) — the single highest scholar-trust change. Name the doctrine of indifferents (adiaphora) to ground the reserve clause and the eupatheiai (~`:86–88`).
- **Ch9 Yoga** `stilling-the-mind.mdx` (+ `stilling-the-mind/limbs.ts`): distinguish seeded (samprajnata) 8th-limb samadhi from final seedless kaivalya/nirodha (~`:81`). Fix "Krishna in disguise" (~`:105` — in the Gita he is Arjuna's openly-divine charioteer). Reconcile "almost two thousand years ago" (~`:35`) with the chapter's ~400 CE commitment (~`:57`), attributing 400 CE to Maas 2006.
- **Ch12 Contemplative Religions** `stillness-and-surrender.mdx`: stop stretching the "one repeated anchor + return" skeleton onto Judaism (Shabbat is temporal cessation; Mussar is trait-training) — either frame Judaism as a different structure or narrow the "one move" claim to the three practices that share it. Fix hishtavut framed as "the highest form" of menuchat hanefesh (different literatures). Add the sakina/Shekhinah loanword hypothesis (~`:86`).
- **Ch7 Zen** `the-ordinary-mind.mdx`: add one clause acknowledging the Soto/Rinzai polemic (Dogen vs koan-chasing; Hakuin vs "dead sitting"). Signal that student- and master-Zhaozhou are one person across a long life.
- **Ch14** `one-calm-many-doors.mdx`: acknowledge Buddhism is internally plural on the no-self question (the chapter itself cites Dzogchen rigpa). **Ch11** `the-calm-at-the-center.mdx:78`: carve IFS out of "a self that was there before this life and will outlast it" — the IFS Self is a clinical construct, not a doctrine of a pre-existent/post-mortem soul.
- **Ch5** `enough-and-no-fear.mdx`: cite the tripartite desire taxonomy to Principal Doctrines XXIX + its scholion (Diog. Laert. X.149), not only Menoeceus 127–8. **Ch10** `the-engineering-of-calm.mdx`: soften "reasonable mind argues it away" to "attends only to facts and logic, as if the feeling were not there."

## Definition of done
- Each change confirmed against a source and reflected in prose (and figure/data where relevant, e.g. `limbs.ts`).
- Voice rules hold. Typecheck, lint, build pass. Commit as `fix(content): scholarly-precision and faithfulness corrections across traditions`.
