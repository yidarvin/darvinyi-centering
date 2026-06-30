#!/usr/bin/env python3
"""
Generate the per-chapter prompt files and the run queue for Centering.

Each chapter prompt stays short on purpose. The depth lives in the shared
contract (docs/authoring-spec.md) and the per-chapter content spec
(docs/scope-and-outline.md). A prompt adds only the chapter-specific
research focus and build notes, plus the definition of done.

Run from anywhere:  python3 prompts/_generate.py
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# (chapter number, slug, scope heading, research bullets, build notes)
CHAPTERS = [
    (1, "what-calm-is", "What Calm Is, and Isn't",
     ["The difference between equanimity and suppression. Cite Gross's emotion-regulation work (reappraisal versus expressive suppression) and why suppression backfires.",
      "A defensible model of affect for the calm map (for example Russell's circumplex of affect: valence and arousal). Decide the two axes for the quadrant widget and label them honestly.",
      "Calm as a regulated state and a movable set point, not a fixed temperament. Brief and accurate."],
     ["The calm-quadrant widget must use a real affect frame and name its axes. Do not invent pseudo-axes.",
      "Draw the equanimity-versus-suppression line clearly here. Chapter 18 calls back to it."]),

    (2, "the-settled-body", "The Settled Body",
     ["Autonomic basics: sympathetic and parasympathetic, vagal tone, heart-rate variability. Reputable physiology sources.",
      "Slow breathing and the parasympathetic brake: resonance breathing near six breaths a minute, the effect of a longer exhale. Cite the evidence and keep it measured.",
      "Benson's relaxation response, and sleep and recovery basics."],
     ["The breathing pacer must use accurate timings for each pattern (box, 4-7-8, coherent near 5.5 a minute).",
      "Add a light safety note: do not force the breath, stop if lightheaded."]),

    (3, "the-quiet-mind", "The Quiet Mind",
     ["The default mode network and mind-wandering. Cite Killingsworth and Gilbert (a wandering mind is an unhappy mind) accurately.",
      "Hedonic adaptation and the stimulation treadmill.",
      "Flow (Csikszentmihalyi): challenge by skill. Negativity bias, briefly."],
     ["The attention rep-counter is the core trainer (focus, notice the drift, return, tally). Keep it honest and simple."]),

    (4, "tranquility-by-judgment", "Stoicism: Tranquility by Judgment",
     ["Primary sources: Epictetus (Enchiridion, Discourses), Marcus Aurelius (Meditations), Seneca (Letters, On Anger). Reputable scholarship (Pierre Hadot, modern Stoicism).",
      "The dichotomy of control and its nuance. First movements or proto-passions (Seneca, Aulus Gellius). Apatheia and euthymia. Premeditatio malorum. The view from above.",
      "Use public-domain translations or paraphrase. Do not quote modern copyrighted translations at length."],
     ["Port docs/prototypes/DichotomyOfControl.jsx into the real primitives as the chapter's widget.",
      "Build the remaining figures: event to impression to assent to reaction; circle of control, influence, concern; the view-from-above zoom.",
      "This is the reference chapter. Set the quality bar the rest will match."]),

    (5, "enough-and-no-fear", "Epicureanism: Enough, and No Fear",
     ["Epicurus (Letter to Menoeceus, Principal Doctrines, Vatican Sayings). Lucretius (On the Nature of Things) for the fear of death. The four-part cure (tetrapharmakos).",
      "The desire taxonomy (natural and necessary, natural not necessary, vain), the role of friendship, ataraxia and aponia.",
      "Public-domain sources or paraphrase."],
     ["The desires sorter must use the correct three-way taxonomy. Build the four-part cure card accurately."]),

    (6, "calm-abiding", "Buddhism: Calm Abiding",
     ["Calm-abiding (samatha) and the breath. Equanimity (upekkha). The two arrows (Sallatha Sutta). The three marks (anicca, dukkha, anatta). Lovingkindness (Karaniya Metta Sutta).",
      "Represent the tradition faithfully (primarily early or Theravada framing, note Mahayana where relevant). Reputable scholars such as Bhikkhu Bodhi and Analayo."],
     ["The two-arrows widget: resistance as a multiplier on pain, with pain held fixed. Add a metta phrase practice and a noting timer.",
      "Do not overclaim or flatten across schools."]),

    (7, "the-ordinary-mind", "Zen: The Ordinary Mind",
     ["Mushin (no-mind), shoshin (beginner's mind, Shunryu Suzuki), shikantaza (Dogen), the ordinary mind is the way. The aesthetic of ma and wabi-sabi. The koan in Rinzai."],
     ["Keep this chapter short and spare. The restraint is the design. One clean widget (single-task presence timer), the enso motif, minimal figures. Do not overbuild."]),

    (8, "the-watercourse-way", "Taoism: The Watercourse Way",
     ["Laozi (Tao Te Ching) and Zhuangzi: wu wei, ziran, the watercourse way, softness overcoming hardness, the useless tree. Cite the primary texts. Watts is a popularizer, not a source.",
      "Public-domain translations or paraphrase."],
     ["The forcing-versus-flow widget should show the cost of pushing against a situation versus moving with it. Keep the water motifs faithful to the texts."]),

    (9, "stilling-the-mind", "Yoga and the Stilling of the Mind",
     ["Patanjali's Yoga Sutras: yoga as citta vritti nirodha, and the eight limbs. Pranayama basics (cross-link Chapter 2 for the breathing science, do not duplicate). The Bhagavad Gita: karma yoga, equanimity (samatva), action without attachment to results, the witness."],
     ["Pranayama pacer (alternate-nostril walkthrough) with a safety note. An eight-limbs explorer.",
      "Build the Gita-and-Stoa parallel figure and cross-link Chapter 4 and Chapter 14. Represent the schools without conflating them."]),

    (10, "the-engineering-of-calm", "The Engineering of Calm",
     ["CBT (Beck): the cognitive model and cognitive distancing. ACT (Hayes): defusion, acceptance, values, self-as-context, psychological flexibility. DBT (Linehan): radical acceptance, wise mind, distress tolerance. MBSR (Kabat-Zinn): the body scan and the stress evidence.",
      "Frame as methods for producing calm on purpose, not as disorder treatment. Be honest that the effects are real but modest. This sets up Chapter 15."],
     ["The thought-distancing widget combines CBT distortion-spotting with ACT defusion. Build a wise-mind locator."]),

    (11, "the-calm-at-the-center", "Internal Family Systems: The Calm at the Center",
     ["Internal Family Systems (Richard Schwartz): managers, firefighters, exiles; the Self and its qualities; blending and unblending; Self-leadership; the protective intent of every part. Note that the evidence base is still emerging, honestly."],
     ["Port docs/prototypes/PartsMapper.jsx as the widget. Build the qualities-of-Self wheel. Frame the whole chapter as returning to the calm center.",
      "Keep the trauma-care boundary: exiles are approached with care, usually with a professional."]),

    (12, "stillness-and-surrender", "Stillness and Surrender: The Contemplative Religions",
     ["Christian hesychasm, the Jesus Prayer, and Centering Prayer (Thomas Keating, the Cloud of Unknowing lineage). Sufi dhikr, sakina, muraqaba. Jewish menuchat hanefesh, Shabbat rest, hitbodedut, and Mussar equanimity. Use reputable sources from each tradition's own scholarship."],
     ["This is a respectful survey, not advocacy, and must be accurate to each faith. Do not present the traditions as interchangeable or flatten doctrinal differences.",
      "The methods explorer and a secular-friendly repetition practice should let a non-believer use the structure without the metaphysics. Flag where a practice is devotional and assumes its context."]),

    (13, "nature-and-simplicity", "Nature and Simplicity: The Transcendentalists",
     ["Thoreau (Walden): deliberate living, simplicity, solitude. Emerson (Nature, Self-Reliance). The modern science of nature and calm: Attention Restoration Theory (Kaplan), Stress Reduction Theory (Ulrich), awe and the small self (Keltner, Piff), forest bathing (measured).",
      "Public-domain Thoreau and Emerson, or paraphrase."],
     ["Nature-dose and awe planner. A simplify-one-area pass. Keep the science claims measured and cited."]),

    (14, "one-calm-many-doors", "One Calm, Many Doors",
     ["Synthesize the routes across the prior chapters. Check each convergence claim. Note where traditions genuinely differ in aim or metaphysics (for example Stoic providence versus Buddhist non-self). Do not overstate equivalence."],
     ["The convergence explorer is the graph centerpiece: traditions and routes as a network in Cytoscape (reuse the litsearch graph patterns). Install cytoscape and react-cytoscapejs in this run.",
      "Build the same-move-many-names panels (the witness, the observing self, the Self, no-mind). Accuracy of the mappings is the whole point."]),

    (15, "what-actually-works", "What Actually Works",
     ["The real evidence base: meta-analyses on mindfulness and MBSR (for example Goyal et al. 2014, JAMA Internal Medicine), slow breathing and HRV biofeedback, CBT and ACT outcomes, nature exposure, lovingkindness. The predictive-processing account of calm and anxiety (Friston, and clinical applications). Be honest about modest effects, heterogeneity, small samples, and publication bias."],
     ["Build a graded evidence map, a route-to-mechanism table, and the predictive-brain loop. Grade the evidence transparently and cite real studies. This chapter must be rigorous."]),

    (16, "building-your-practice", "Building Your Practice",
     ["Habit formation: implementation intentions (Gollwitzer), habit stacking, minimum effective dose. Practice design for ordinary and hard days."],
     ["The toolkit builder lets the reader pick routes and practices and saves a daily plan and a hard-day card (useLocalStorage), with a printable view."]),

    (17, "designing-for-calm", "Designing for Calm",
     ["The attention economy and persuasive design, and notification and interruption effects. Slow living, minimalism, deliberate idleness (niksen). Environmental psychology: light, noise, clutter, biophilic design. The lifestyle vocabulary (lagom, hygge, ma) placed accurately."],
     ["Calm-environment audit (space, time, attention) with targeted subtractions. A design-one-default pass."]),

    (18, "calm-is-not-numbness", "Calm Is Not Numbness",
     ["Spiritual bypassing (John Welwood). The downsides of expressive suppression (Gross). Toxic positivity. Acceptance versus experiential avoidance. Accurate, current crisis and help resources and how to find a therapist. Resources are region-specific: verify them at build time and localize. For the US, the 988 Suicide and Crisis Lifeline."],
     ["The self-check distinguishes settling from avoiding and routes clearly to professional and crisis resources, framed plainly as not a diagnosis. This chapter carries the safety content. Measured, not alarmist. Close the loop opened in Chapter 1."]),
]

TEMPLATE = """# Build: Ch {num} — {head}

Queue item. Content spec: `docs/scope-and-outline.md`, the entry "Ch {num} — {head}". Build contract: `docs/authoring-spec.md`. Operate per `CLAUDE.md`.

Build the chapter at `src/content/chapters/{slug}.mdx`, with any chapter-specific components under `src/components/chapters/{slug}/`. Use the shared primitives. Match `docs/prototypes/` for quality.

## Research first
{research}

## Build notes for this chapter
{notes}

## Definition of done
- Matches the content spec in the scope doc: every listed figure built and accurate, the signature widget built and working, the exercises present and persisting.
- Passes the authoring-spec definition of done, including the voice rules (no em dashes, none of the banned tells).
- A Sources list with real references. Cross-links correct. Route tags consistent.
- Typecheck, lint, and build pass. Commit as `feat(ch{numpad}): {slug}`.
"""

def bullets(items):
    return "\n".join(f"- {x}" for x in items)

def main():
    written = []
    for num, slug, head, research, notes in CHAPTERS:
        body = TEMPLATE.format(
            num=num, numpad=f"{num:02d}", slug=slug, head=head,
            research=bullets(research), notes=bullets(notes),
        )
        fname = f"ch{num:02d}-{slug}.md"
        with open(os.path.join(HERE, fname), "w") as f:
            f.write(body)
        written.append((num, slug, head, fname))

    # queue manifest: scaffold first, then chapters in book order
    rows = ["| 00 | scaffold and site shell | `prompts/00-scaffold.md` | PENDING |"]
    for num, slug, head, fname in written:
        rows.append(f"| {num:02d} | Ch {num} — {head} | `prompts/{fname}` | PENDING |")

    queue = (
        "# Run Queue — Centering\n\n"
        "Run order, top to bottom. Status is PENDING, DONE, or SKIPPED. "
        "\"Next\" is the first PENDING item. Update the status cell after each run. "
        "See `CLAUDE.md` for the workflow and the trigger phrases.\n\n"
        "| # | item | file | status |\n"
        "|----|------|------|--------|\n"
        + "\n".join(rows) + "\n"
    )
    with open(os.path.join(HERE, "queue.md"), "w") as f:
        f.write(queue)

    print(f"wrote {len(written)} chapter prompts + queue.md")

if __name__ == "__main__":
    main()
