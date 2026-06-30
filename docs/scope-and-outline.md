# Centering — Scope & Outline

*Repo: `darvinyi-centering`. Title: "Centering," with the subtitle "the philosophies and practices of calm."*

A textbook on the philosophies and methods that promote calm. The contemplative traditions at the heart, the tested clinical methods reframed as the engineering end of the same work, built with Claude Code, deployed on Vercel, in the established dark / teal / JetBrains Mono house style.

---

## 1. The shape of the book

The frame is no longer treating anxiety. It is building a calm center and learning to return to it. That is what the repo name means, taken literally.

The throughline: calm is not the absence of trouble, and it is not numbness. It is a trained, engaged relationship to experience. People keep rediscovering the same few routes to it across very different worldviews. The book walks those routes, shows where they agree, and says which ones the evidence supports.

One distinction runs the length of the book and bookends it: equanimity versus suppression. A settled nervous system is not a person who has checked out. That line separates real calm from sedation, avoidance, and toxic positivity, and it answers the obvious objection before a reader can raise it. Chapter 1 opens it. Chapter 18 closes it.

A structural device that ties Part II to Part III: the recurring routes to calm. Across the traditions the same handful of moves appear again and again, named differently each time. Letting go, presence, the body, perspective, enough, connection, meaning. Each tradition chapter tags which routes it leans on. Part III collects them.

Four parts. Ground the reader in what calm is. Walk each tradition. Show where the roads converge and what holds up. Turn it into a life.

---

## 2. Voice and style (every chapter)

This governs all prose, in the book and in the prompts.

- Plain, grounded language. Second person where it helps the reader do something.
- No em dashes. Use periods, commas, colons, and parentheses instead. Restructure rather than reach for a dash.
- Vary sentence length. Short sentences are allowed. Fragments occasionally, on purpose.
- Concrete examples over abstraction. Show the practice on a real situation, not a hypothetical one.
- Avoid the tells: no "it's not X, it's Y," no breathless lists of three, no "here's the thing," no "let's dive in," no "crucial / robust / seamless / tapestry / delve / navigate the complexities."
- Light hand on hedging and on bold. Say the thing.
- Respect the traditions. Present each on its own terms before comparing. The contemplative-religions chapter especially: survey, not advocacy, and usable by a secular reader without the metaphysics.

---

## 3. Chapter anatomy (the repeating rhythm)

Each chapter is a deep, detailed treatment, not a summary. The prompts hold Claude Code to that.

1. **Open with a scene or a question.** Concrete, human, no jargon dump.
2. **Teach the model in prose, with figures inline.** Diagrams that explain structure and mechanism, placed where the idea is introduced. Figures encode something true, never decoration.
3. **Tag the routes.** For tradition chapters, mark which of the recurring routes to calm this chapter uses, so the threads are visible before Part III names them.
4. **One signature widget.** The interactive moment where the reader feels the concept, not just reads it. One per chapter, done well.
5. **A worked example.** Walk one real situation through the chapter's method, start to finish.
6. **Exercises to try.** A short set of concrete practices at the end, tied to the chapter. Rendered as exercise cards with inputs, checkboxes, or timers where it fits. Saved locally so the reader can return to them.
7. **A reflection prompt.** The terminal-styled input, one good question.
8. **Links.** Previous and next, plus see-also cross-references to related chapters and routes.

---

## 4. Design system (locked)

- **Background** near-black `#0a0a0b`, panels `#0f1012` / `#141517`, hairline borders at low white alpha.
- **Teal `#2dd4bf` is the constant**, the through-color of the book: the calm center, the primary accent, the thing the title points at.
- **Secondary accents used semantically within chapters**, not fixed book-wide. Amber `#f0b429`, coral `#fb7185`, violet `#a78bfa`. In the IFS chapter they keep their part meanings (managers, firefighters, exiles). Elsewhere they color routes, traditions, or figure elements as each chapter needs.
- **Type.** JetBrains Mono for structure, labels, captions, and the code-comment chapter numbering (`§ 04.1`). A clean sans for body.
- **Motifs.** Code-comment section markers, the figure then widget grammar, the terminal reflection block (pathed to the project, for example `~/centering/04.1`), prev / next nav.
- **Floor.** Responsive to mobile (including stacked variants for wide figures), visible keyboard focus, reduced motion respected.

---

## 5. The outline

Format per chapter: a one-line thesis, the routes it uses (Part II), then figures, the signature widget, and exercises.

### Front matter

**Ch 0 — How to Use This Book**
How to read this, the dark interface, where to start, and the one promise: calm is trainable.
- Figures: the four-part map of the book; the prose / figure / widget / exercise rhythm.
- Widget: a "where to start" router. Pick what pulls you (a quieter mind, a settled body, a simpler life, a tradition you are drawn to) and it points to a chapter.
- Exercises: set a two-week intention; pick a starting route.

### Part I — The Nature of Calm

**Ch 1 — What Calm Is, and Isn't**
Calm is not the absence of trouble and not numbness. It is a trained, engaged relationship to experience.
- Figures: the calm map (arousal by engagement, locating equanimity against sedation, agitation, and flow); equanimity versus suppression (what each does with a feeling); calm as a movable set point, not a fixed temperament.
- Widget: the calm quadrant. Place a recent state on the arousal-by-engagement map and see the difference between settling and shutting down.
- Exercises: name three states you have called calm and sort them (settled or numb); catch one moment of engaged calm this week.

**Ch 2 — The Settled Body**
Calm is a physiological state you can enter on purpose. The body has a brake. Learn to use it.
- Figures: the two branches (sympathetic accelerator, parasympathetic brake); the breath-to-vagus link (a longer exhale pulls the brake); the relaxation-response loop; a heart-rate-variability sketch.
- Widget: a breathing pacer with selectable patterns (box, 4-7-8, coherent around 5.5 breaths a minute), showing the exhale emphasis and a simple coherence visual.
- Exercises: try three breath patterns and note which settles you fastest; one week of a fixed wind-down; a posture-and-breath check.

**Ch 3 — The Quiet Mind**
The mind resists calm by design. Understanding why is the first step to quieting it.
- Figures: the wandering-mind loop (default mode network); the stimulation treadmill (hedonic adaptation); the flow channel (challenge by skill); attention as a spotlight.
- Widget: an attention rep-counter. Focus on the breath, notice the drift, return, and tally the reps. A tiny trainer for the one move every later chapter reuses.
- Exercises: a five-minute focus-and-return sit; track your stimulation inputs for a day; notice one flow state and what produced it.

### Part II — The Traditions

**Ch 4 — Stoicism: Tranquility by Judgment**
Disturbance comes from judgments, not events. Govern the judgment and tranquility follows.
- Routes: letting go, perspective.
- Figures: the two bins (built); event to impression to assent to reaction, marking where judgment enters; circle of control, influence, and concern; the view-from-above zoom.
- Widget: the dichotomy-of-control sorter (built), plus a view-from-above zoom-out.
- Exercises: a control audit on one worry; a premeditation prompt; an evening review (what was up to me today, and did I tend it).

**Ch 5 — Epicureanism: Enough, and No Fear**
Tranquility comes from wanting less, from friendship, and from losing the fear of death.
- Routes: enough, connection, perspective.
- Figures: the desire sorter (natural and necessary, natural not necessary, vain); the four-part cure as a card; the diminishing returns of intense versus simple pleasure.
- Widget: the desires sorter built on the Epicurean categories, plus a "what do I actually need" pass.
- Exercises: sort your wants into the three bins; run one fear through the four-part cure; plan one simple pleasure and one act of friendship.

**Ch 6 — Buddhism: Calm Abiding**
The quiet mind is the most thoroughly mapped territory in human history. This is the map.
- Routes: presence, letting go, connection.
- Figures: the two arrows (pain versus the resistance we add); resistance as a multiplier on pain; calm-abiding as the mind settling in stages; impermanence as flowing water.
- Widget: the two-arrows interactive. Turn resistance up and down and watch suffering move while pain stays fixed. Plus a lovingkindness phrase practice and a noting timer.
- Exercises: a ten-minute breath-anchor sit; notice one second arrow a day; a short lovingkindness practice.

**Ch 7 — Zen: The Ordinary Mind** (short)
Calm is not somewhere else. It is this moment, this breath, this cup of tea, fully met.
- Routes: presence, enough.
- Figures: the ensō (the imperfect circle) as a motif; full attention on one ordinary act; beginner's mind against the expert's clutter.
- Widget: a single-task presence timer. One ordinary action, full attention, no second screen, a gentle return when the mind leaves.
- Exercises: do one daily act (tea, dishes, a walk) with complete attention; a ten-minute just-sitting; a beginner's-mind look at something familiar.
- Note: keep this one short and spare. The restraint is the point and it matches the site's aesthetic.

**Ch 8 — Taoism: The Watercourse Way**
Calm comes from non-forcing. Stop fighting the current and move with it.
- Routes: letting go, presence.
- Figures: water finding its way around rock; soft overcoming hard; forcing against the grain versus moving with it.
- Widget: a forcing-versus-flow interactive. Push against a situation or move with it and see the cost of each, plus a "where am I forcing" mapper.
- Exercises: find one place this week to stop pushing; a water contemplation; notice the difference between effort and strain in a task.

**Ch 9 — Yoga and the Stilling of the Mind**
Patanjali defines yoga as the stilling of the mind's fluctuations. That is this whole book in one line.
- Routes: the body, letting go, presence.
- Figures: the eight limbs as a staircase; the mind's fluctuations settling (ripples to still water); action without attachment to results, the Gita's equanimity set beside the Stoic dichotomy of control.
- Widget: a pranayama pacer (alternate-nostril walkthrough, extended exhale), plus an eight-limbs explorer.
- Exercises: one pranayama practice; identify the limb you neglect; a "do the action, release the result" experiment on one task.

**Ch 10 — The Engineering of Calm**
The modern traditions took the old goal and made it testable. Same destination, measured methods.
- Frame: these are not treatments for a disorder here. They are the evidence-based end of the same project, methods for producing calm on purpose.
- Covers: CBT (thoughts are not facts, cognitive distance), ACT (defusion, acceptance, values, the observing self), DBT (radical acceptance, wise mind, skills for hot moments), MBSR (secular mindfulness, the body scan).
- Routes: letting go, presence, perspective.
- Figures: the cognitive model (situation to thought to feeling); defusion as adding distance to a thought; wise mind as the overlap of emotion and reason; the MBSR practice set.
- Widget: a thought-distancing tool. Enter a thought, spot the distortion, build distance and a reframe, combining CBT restructuring with ACT defusion. Plus a wise-mind locator.
- Exercises: one thought record; one defusion move on a sticky thought; one radical-acceptance line for something unchangeable; a body scan.

**Ch 11 — Internal Family Systems: The Calm at the Center**
Under the noise of competing parts sits a calm Self. That Self is the center this whole book points to.
- Routes: letting go, connection, presence.
- Figures: the protective-system layers (built); proactive versus reactive timing (built); the qualities-of-Self wheel; the loop that keeps you off-center (built, reframed).
- Widget: the parts-mapper with the blend and unblend interaction (built), framed as returning to the calm center.
- Exercises: map three of your parts and what each protects; unblend once in real time; a short dialogue with one protector.
- Note: the cleanest bridge from the therapeutic to the contemplative. It sits as the hinge between the modern methods and the religious and nature chapters.

**Ch 12 — Stillness and Surrender: The Contemplative Religions** (survey)
The theistic traditions found calm through surrender, through remembrance, and through letting a larger thing hold you.
- Covers: Christian hesychasm and Centering Prayer (the descent into stillness, the prayer of the heart, and yes, the name); Sufi remembrance (dhikr) and tranquility (sakina); the Jewish practice of equanimity (menuchat hanefesh) and Sabbath rest. The common thread is surrender and trust.
- Routes: letting go (as surrender), meaning, presence.
- Figures: the contemplative methods side by side (what each does with attention and self); surrender as releasing the grip; repetition as an anchor.
- Widget: a contemplative-methods explorer (tap a tradition, see its core practice and what it quiets), plus a simple, secular-friendly repetition practice.
- Exercises: try a centering-prayer-style descent into stillness; a repetition practice with a word or the breath; reflect on what surrender can mean without requiring belief.
- Note: respectful and ecumenical. Survey, not advocacy. The structure is usable without the metaphysics.

**Ch 13 — Nature and Simplicity: The Transcendentalists**
Calm through solitude, simplicity, and time in the natural world. The Western, secular route, outdoors.
- Covers: Thoreau (deliberate living, simplicity, solitude at Walden), Emerson (self-reliance, nature as restoration), and the modern science of nature and calm (attention restoration, awe, time outdoors). Solitude as distinct from loneliness.
- Routes: enough, perspective, presence, the body.
- Figures: attention restoration (depleted versus restored by nature); simplicity as freedom (fewer wants, more room); awe and the small-self effect.
- Widget: a nature-dose and awe planner, plus a "simplify one area" pass on what to subtract.
- Exercises: a phone-free walk with full attention; subtract one thing from one area this week; a short solitude practice.

### Part III — The Common Routes

**Ch 14 — One Calm, Many Doors**
Strip away the worldviews and the same handful of routes to calm appear again and again. Here they are, each shown across several traditions at once.
- The recurring routes (the book's backbone): letting go, presence, the body, perspective, enough, connection, meaning.
- Figures: the routes-to-calm map (each route with the traditions that use it); a convergence graph (traditions and routes as a network, the graph-viz payoff, Cytoscape); a few same-move-many-names panels (for example the witness, the observing self, the Self, and no-mind).
- Widget: the convergence explorer. Pick a route and every tradition that uses it lights up with its version, or pick a tradition and see its routes. The heavier graph widget, in your wheelhouse.
- Exercises: identify the two routes that come most naturally to you; find the same route in two traditions you would never have paired.

**Ch 15 — What Actually Works**
Not all of this is equally supported. Here is what the evidence says reliably produces calm, and where it is thin.
- Covers: each route mapped to a mechanism (the body to vagal tone, presence to attention regulation, letting go to a brain that over-predicts threat less, and so on); strength of evidence by practice; the predictive-brain frame as the quiet unifier; expectancy, dose, and honest limits.
- Figures: an evidence map (practices by strength of support); a route-to-mechanism table; the predictive-brain loop (predict, compare, update) as the unifier.
- Widget: a mechanism explorer. Pick a practice and see the route it uses, the mechanism, and the evidence grade.
- Exercises: pick one well-supported practice to commit to; identify the mechanism your favorite practice works through.

### Part IV — A Life of Calm

**Ch 16 — Building Your Practice**
You do not need all of it. You need a few routes that fit you, practiced regularly.
- Figures: a route-and-situation matrix; a daily and weekly template; the minimum effective dose.
- Widget: the toolkit builder. Pick your routes and practices, get a tailored daily plan and a hard-day card you can save and reuse.
- Exercises: write your one-page practice; commit to a two-week trial; schedule the review.

**Ch 17 — Designing for Calm**
Calm is not only built inside you. It is built around you, in your time, your space, and your attention.
- Covers: environment (light, sound, clutter, nature indoors); time (margin against overscheduling, slow living, the culture of urgency); attention and digital life (notifications, the attention economy, deliberate idleness). The lifestyle calm vocabulary folds in here (minimalism, lagom, hygge, ma, niksen). Design your defaults so calm is the path of least resistance.
- Routes: enough, the body, presence.
- Figures: the calm environment checklist (space, time, attention); what is engineered to disturb you against deliberate defaults; margin versus overload.
- Widget: a calm-environment audit. Rate your space, time, and digital defaults and get targeted subtractions, plus a "design one default" pass.
- Exercises: change one environmental default; add margin to one part of the week; a one-day attention diet.

**Ch 18 — Calm Is Not Numbness**
The book's spine, stated plainly at the end. Real calm is engaged. Beware its counterfeits, and know when distress needs more than a practice.
- Covers: equanimity versus suppression revisited; spiritual bypassing; avoidance and flatness as false calm; toxic positivity; calm as a base for action rather than an exit from it; when persistent distress means it is time for professional help, and how to find it.
- Figures: real calm against its counterfeits (engaged equanimity, bypassing, avoidance, sedation); green, yellow, and red flags for seeking help; calm as a foundation for engagement, not withdrawal.
- Widget: a gentle self-check that distinguishes settling from avoiding and routes clearly to professional and crisis resources when appropriate, framed as not a diagnosis.
- Exercises: check your own practice for bypassing (am I settling or avoiding); note your yellow and red flags in advance; locate two resources before you need them.
- Note: closes the loop opened in Chapter 1. Carries the responsible "this is not therapy, here is when to get help" content. Sober and plain, no alarm.

---

## 6. Build scope (repo and sequencing)

- **Repo.** `darvinyi-centering`, a standalone project beside `darvinyi-litsearch`. Its own git repo and Vercel deploy, with no connection to the Obsidian vault.
- **Stack.** Vite plus React, static, deployed on Vercel. Matches the existing setup.
- **Content model.** MDX per chapter. Prose stays in clean Markdown, and every figure and widget is a typed TSX component imported into the page (Vite plus an MDX plugin, with a shared prose typography layer). Runtime is identical to plain TSX, so the reader cannot tell the difference at load. The win is across eighteen prose-heavy chapters: the writing stays easy to read and keep good in source, while the widgets lose none of their interactivity because they are still full React components.
- **Routing.** A chapters index plus one route per chapter, with readable slugs (`/tranquility-by-judgment`, `/the-watercourse-way`). Chapter numbers show in the interface (the index, the `§` numbering, prev and next nav), not in the URL, so the order stays clear while the public links read and share well. Chapter source files can keep a numeric prefix for ordering in the repo, mapped to the readable route.
- **Shared primitives, built once.** `Figure`, the widget shell, `ExerciseCard`, the reflection block, `ChapterNav`, the route tags, and the theme tokens. Every chapter imports these so the look and behavior stay consistent.
- **Graph widgets.** Cytoscape.js for the convergence explorer, the parts-mapper, and any other graph work. Lighter widgets stay in plain React and SVG.
- **State.** localStorage for exercise inputs, the toolkit builder output, and any tracker, so the reader's work persists between visits.

**Recommended build order.** Do not start at Chapter 1. Build the foundation first.
1. Scaffold the repo, theme tokens, and the shared primitives.
2. Build one reference chapter end to end (Stoicism, since the prototype is closest to done) to lock the patterns.
3. Then the remaining chapters, one prompt each, reusing the primitives.

This is why the first Claude Code prompt is a scaffold prompt, not a chapter.

---

## 7. Decisions

All settled.

1. **Content model: MDX.** Prose in Markdown, widgets and figures as typed TSX components imported in. Identical at runtime, cleaner across eighteen chapters.
2. **Slugs: readable.** `/tranquility-by-judgment` rather than `/04-stoicism`, since this is a public site meant to share, with the chapter number carried in the interface instead.
3. **Title: "Centering,"** subtitle "the philosophies and practices of calm." Aligns repo, title, and domain, works as a one-word mark on the dark hero, and states the book's thesis.
4. **Length: the full set is the default.** Eighteen chapters plus front matter. A lean first release (Parts I and II plus the toolkit chapter, the rest added later) is still on the table if you want to ship sooner. Say the word.

Everything else is locked too: the calm frame, the equanimity-versus-suppression spine, the recurring-routes device, the chapter list above, the dark teal house style, the voice rules, the chapter rhythm, the repo name, and the scaffold-first build order.

---

## 8. Next step

The prompts. Starting with the scaffold prompt (repo, tokens, shared primitives, the route-tag system, one reference chapter), then one prompt per chapter. Every chapter prompt will carry the design system, the voice spec (no em dashes, no AI tells), the chapter anatomy, the route tags, the concept list, the exact figures to build and what each must show, the widget spec, the exercises, and a depth bar so the chapters come out detailed rather than thin.
