import type { RouteId } from '@/content/routes';

/**
 * The ordered manifest of every chapter, Ch 0 through Ch 18. This single source
 * drives the landing index, the router, the chapter header, and prev/next nav.
 *
 * Chapter numbers show in the interface (the index, the § numbering, the nav),
 * never in the URL: routes use the readable slug, so links read and share well.
 */

export const PART = {
  start: 'Start Here',
  one: 'Part I · The Nature of Calm',
  two: 'Part II · The Traditions',
  three: 'Part III · The Common Routes',
  four: 'Part IV · A Life of Calm',
} as const;

export type PartLabel = (typeof PART)[keyof typeof PART];

export interface ChapterAtAGlanceData {
  thesis: string;
  takeaways: string[];
  readingMinutes: number;
  practiceMinutes: number;
  signaturePractice: string;
  /** ISO date for chapters whose claims need an explicit evidence review. */
  lastReviewed?: string;
}

export interface Chapter {
  num: number;
  part: PartLabel;
  title: string;
  slug: string;
  /** the mono subtitle shown under the chapter title */
  subtitle: string;
  /** a one-sentence description for the per-route <meta name="description"> and Open Graph tags */
  blurb: string;
  /**
   * The routes to calm this chapter leans on, the source of truth for
   * RouteTags (which reads this by default) and the /routes/:id browse page.
   * Left undefined for chapters whose RouteTags call is a bespoke display
   * (e.g. showing all seven with its own label) rather than a plain tagging.
   */
  routes?: RouteId[];
  /** Compact reference metadata, added chapter by chapter during the quality pass. */
  atAGlance?: ChapterAtAGlanceData;
}

export const CHAPTERS: Chapter[] = [
  { num: 0, part: PART.start, title: 'How to Use This Book', slug: 'how-to-use-this-book', subtitle: 'how to read this · calm is trainable', blurb: 'How this book works, and why calm is trainable rather than fixed.' },

  {
    num: 1,
    part: PART.one,
    title: "What Calm Is, and Isn't",
    slug: 'what-calm-is',
    subtitle: 'equanimity, not numbness',
    blurb: 'What calm actually is: equanimity, not numbness, engaged rather than checked out.',
    atAGlance: {
      thesis: 'Calm is a settled body with continued contact with your life. Numbness can look quiet while losing that contact.',
      takeaways: [
        'Arousal tells you how activated the body is. Engagement tells you whether you are still in contact with the moment.',
        'Equanimity and sedation share a quiet body. Engagement separates them.',
        'Suppressing expression can make a feeling less visible while adding strain. A calmer response lets the feeling move without leaving the moment.',
      ],
      readingMinutes: 12,
      practiceMinutes: 5,
      signaturePractice: 'calm quadrant',
      lastReviewed: '2026-07-15',
    },
  },
  {
    num: 2,
    part: PART.one,
    title: 'The Settled Body',
    slug: 'the-settled-body',
    subtitle: 'the body has a brake',
    blurb: "How the body's own brake, the vagus nerve and the long exhale, lowers arousal on command.",
    atAGlance: {
      thesis: 'Slow, easy breathing can shift arousal because respiration and heart rhythm are linked. The longer exhale is a usable, gentle lever.',
      takeaways: [
        'The parasympathetic system acts as a fast brake on the heart, and respiration changes how that brake is expressed.',
        'Heart-rate variability is a changing signal, not a grade for your nervous system.',
        'Coherent breathing is the gentlest starting pattern. Stop any breathing practice that makes you dizzy, tingly, or more anxious.',
      ],
      readingMinutes: 13,
      practiceMinutes: 3,
      signaturePractice: 'breathing pacer',
      lastReviewed: '2026-07-15',
    },
  },
  {
    num: 3, part: PART.one, title: 'The Quiet Mind', slug: 'the-quiet-mind', subtitle: 'why the mind resists, and how to train it', blurb: 'Why attention wanders by default, and the one move that trains it back.',
    atAGlance: {
      thesis: 'A wandering mind is ordinary. The trainable move is noticing the drift and returning attention without turning the drift into a verdict.',
      takeaways: ['Mind-wandering includes useful planning and memory, but unrecognized drift can pull attention away for long stretches.', 'The default mode network is a useful frame for self-referential thought, not a diagnosis or an enemy network.', 'Flow is engaged absorption, not relaxation. A clear goal, feedback, and a well-matched challenge make it more likely.'],
      readingMinutes: 14, practiceMinutes: 3, signaturePractice: 'attention trainer', lastReviewed: '2026-07-15',
    },
  },

  { num: 4, part: PART.two, title: 'Stoicism: Tranquility by Judgment', slug: 'tranquility-by-judgment', subtitle: 'stoicism · disturbance comes from judgment', blurb: "Stoicism's case that disturbance comes from judgment, not events, and the dichotomy of control.", routes: ['letting-go', 'perspective'], atAGlance: { thesis: 'For Stoics, virtue is the end. Tranquility follows when you distinguish your judgments and choices from outcomes you cannot command.', takeaways: ['The dichotomy concerns what is up to us, not total control over every inner state.', 'A first emotional jolt is involuntary. The next judgment is where practice can begin.', 'Act fully in the sphere you can influence, then hold the outcome in reserve.'], readingMinutes: 14, practiceMinutes: 5, signaturePractice: 'dichotomy sorter' } },
  { num: 5, part: PART.two, title: 'Epicureanism: Enough, and No Fear', slug: 'enough-and-no-fear', subtitle: 'epicureanism · want less, fear less', blurb: 'Epicurus on wanting less, sorting your desires, and why easy pleasures beat expensive ones.', routes: ['enough', 'connection', 'perspective'], atAGlance: { thesis: 'Epicurean tranquility grows from limits that can be met, ordinary pleasures, and friendship, not from luxury or solitary self-denial.', takeaways: ['Natural, necessary wants have a stopping point. Vain wants are built to expand.', 'The Garden treats friendship as a condition of security and happiness, not an optional extra.', 'The tetrapharmakos condenses Epicurean therapy but is not Epicurus’s own wording.'], readingMinutes: 14, practiceMinutes: 5, signaturePractice: 'desires sorter' } },
  { num: 6, part: PART.two, title: 'Buddhism: Calm Abiding', slug: 'calm-abiding', subtitle: 'buddhism · the mind, mapped', blurb: "Buddhism's map of the mind: the second arrow, the three marks, and equanimity that is not indifference.", routes: ['presence', 'letting-go', 'connection'], atAGlance: { thesis: 'Buddhist practice distinguishes unavoidable feeling from the resistance we add, then trains steadiness and care without becoming detached.', takeaways: ['The first arrow is painful feeling. The second arrow is the reactive suffering added around it.', 'Calm abiding and insight are partnered trainings; jhānic and boundless equanimity are related but distinct.', 'Equanimity stays awake and connected. Compassion and lovingkindness keep practice from becoming indifference.'], readingMinutes: 16, practiceMinutes: 5, signaturePractice: 'two arrows and noting' } },
  { num: 7, part: PART.two, title: 'Zen: The Ordinary Mind', slug: 'the-ordinary-mind', subtitle: 'zen · this breath, this cup', blurb: "Zen's ordinary mind: just sitting, beginner's mind, and no special state to chase.", routes: ['presence', 'enough'] },
  {
    num: 8,
    part: PART.two,
    title: 'Taoism: The Watercourse Way',
    slug: 'the-watercourse-way',
    subtitle: 'taoism · stop fighting the current',
    blurb: "Taoism's wu wei: effort without strain, and moving with the current instead of forcing it.",
    routes: ['letting-go', 'presence'],
    atAGlance: {
      thesis: 'Wu wei is skilled, non-coercive action: meeting the grain of a situation instead of adding needless strain.',
      takeaways: [
        'Effort belongs to real work. Strain is the extra friction of fighting the situation or yourself.',
        'Water and Cook Ding model responsiveness, patience, and practiced skill, not passivity.',
        'Ziran means self-so: letting things follow their own nature, not surrendering judgment or responsibility.',
      ],
      readingMinutes: 14,
      practiceMinutes: 5,
      signaturePractice: 'force or flow',
    },
  },
  {
    num: 9,
    part: PART.two,
    title: 'Yoga and the Stilling of the Mind',
    slug: 'stilling-the-mind',
    subtitle: 'yoga · the stilling of the fluctuations',
    blurb: "Yoga's eight limbs and the stilling of the mind's fluctuations, from posture to absorption.",
    routes: ['the-body', 'letting-go', 'presence'],
    atAGlance: {
      thesis: 'Classical Yoga pairs disciplined attention with non-attachment, while the Bhagavad Gita carries a related steadiness into action.',
      takeaways: [
        'Patañjali’s Yoga Sutras center the settling of mental fluctuations, not the posture-focused practice most familiar today.',
        'The eight limbs support one another. Ethical conduct, the body, attention, and absorption are not a rigid checklist.',
        'Slow breathing is a gentle option. The evidence for alternate-nostril breathing specifically remains limited, so stop if it feels unsteady.',
      ],
      readingMinutes: 16,
      practiceMinutes: 5,
      signaturePractice: 'alternate-nostril pacer',
    },
  },
  {
    num: 10,
    part: PART.two,
    title: 'The Engineering of Calm',
    slug: 'the-engineering-of-calm',
    subtitle: 'the clinical methods · calm, made testable',
    blurb: 'The clinical methods, CBT, ACT, DBT, and mindfulness, that turned old insights into testable tools.',
    routes: ['letting-go', 'presence', 'perspective'],
    atAGlance: {
      thesis: 'CBT, ACT, DBT, and MBSR offer distinct ways to create space around difficult thoughts, feelings, and situations without promising a cure-all.',
      takeaways: [
        'CBT tests a thought against evidence; ACT changes how closely you hold it. Neither requires pretending a real problem is fine.',
        'DBT joins acceptance and change. Wise mind includes emotion and reason without reducing either to the other.',
        'These methods have real, usually modest effects. Skills on this page do not replace clinical care when distress is severe.',
      ],
      readingMinutes: 18,
      practiceMinutes: 5,
      signaturePractice: 'thought distancer',
    },
  },
  {
    num: 11,
    part: PART.two,
    title: 'Internal Family Systems: The Calm at the Center',
    slug: 'the-calm-at-the-center',
    subtitle: 'internal family systems · the self beneath the parts',
    blurb: 'Internal Family Systems: a mind that is naturally multiple, and the calm Self beneath the parts.',
    routes: ['letting-go', 'connection', 'presence'],
    atAGlance: {
      thesis: 'Internal Family Systems is a clinical model that treats inner conflict as a relationship among protective parts and a steadier observing stance called Self.',
      takeaways: [
        'Parts are a model of common inner multiplicity, not a diagnosis and not evidence of dissociative identity disorder.',
        'The goal is not to erase a protector. Unblending makes room to understand its protective intent and choose a next step.',
        'IFS research is promising but early. Work that approaches trauma-bearing exiles belongs with a trained professional.',
      ],
      readingMinutes: 16,
      practiceMinutes: 5,
      signaturePractice: 'parts map',
    },
  },
  {
    num: 12,
    part: PART.two,
    title: 'Stillness and Surrender: The Contemplative Religions',
    slug: 'stillness-and-surrender',
    subtitle: 'the contemplative religions · a survey',
    blurb: 'Four contemplative religious paths, Christian, Sufi, Jewish, and their shared grammar of surrender.',
    routes: ['letting-go', 'meaning', 'presence'],
    atAGlance: {
      thesis: 'These traditions seek calm through surrender and devotion, but their practices and theological meanings are not interchangeable.',
      takeaways: [
        'The Jesus Prayer, Centering Prayer, and dhikr are devotional practices. Their anchors address God rather than merely managing attention.',
        'Shabbat is a boundary in time, and Mussar is character practice. Neither is simply a repetition exercise in another vocabulary.',
        'A secular repetition practice can borrow attention and breathing structure while leaving the traditions’ devotional claims intact.',
      ],
      readingMinutes: 18,
      practiceMinutes: 5,
      signaturePractice: 'repetition practice',
    },
  },
  {
    num: 13,
    part: PART.two,
    title: 'Nature and Simplicity: The Transcendentalists',
    slug: 'nature-and-simplicity',
    subtitle: 'the transcendentalists · solitude and simplicity',
    blurb: 'The Transcendentalists on solitude, simplicity, and what a walk in the woods actually restores.',
    routes: ['enough', 'perspective', 'presence', 'the-body'],
    atAGlance: {
      thesis: 'Thoreau and Emerson make a moral case for attention, simplicity, and nature; modern research supports some modest restorative effects without making the same philosophical claims.',
      takeaways: [
        'Simplifying is subtraction that makes room for attention, not an aesthetic performance or a demand to own almost nothing.',
        'Nature exposure can support attention and stress recovery, but the mechanisms and effect sizes remain more limited than wellness marketing suggests.',
        'Chosen solitude differs from loneliness. A small, realistic outdoor plan is more useful than an idealized escape to wilderness.',
      ],
      readingMinutes: 17,
      practiceMinutes: 5,
      signaturePractice: 'nature-dose planner',
    },
  },

  {
    num: 14,
    part: PART.three,
    title: 'One Calm, Many Doors',
    slug: 'one-calm-many-doors',
    subtitle: 'the routes, collected',
    blurb: "Where the traditions' routes to calm converge, and where they genuinely disagree.",
    atAGlance: {
      thesis: 'The traditions converge most convincingly on practical routes to calm, not on a single metaphysics or a single account of self.',
      takeaways: [
        'The seven routes are a comparison tool, not proof that every tradition says the same thing.',
        'Similar practices can have different aims. Shared phenomenology does not settle what an experience means.',
        'Use convergence to find a practice that fits, while keeping the traditions’ genuine disagreements visible.',
      ],
      readingMinutes: 16,
      practiceMinutes: 5,
      signaturePractice: 'convergence explorer',
    },
  },
  {
    num: 15,
    part: PART.three,
    title: 'What Actually Works',
    slug: 'what-actually-works',
    subtitle: 'the evidence, graded honestly',
    blurb: 'The evidence for every route to calm in this book, graded honestly, strengths and limits both.',
    atAGlance: {
      thesis: 'A practice’s evidence is only as persuasive as its comparison group, its likely effect size, and the limits the study can actually answer.',
      takeaways: [
        'Active-control trials are more informative than waitlists because expectation, time, and attention can improve outcomes too.',
        'Several practices have real, usually modest benefits. A low grade can also mean the outcome is difficult or inappropriate to randomize.',
        'Predictive processing is a useful organizing frame, not a settled explanation for every route to calm.',
      ],
      readingMinutes: 18,
      practiceMinutes: 5,
      signaturePractice: 'mechanism explorer',
    },
  },

  {
    num: 16,
    part: PART.four,
    title: 'Building Your Practice',
    slug: 'building-your-practice',
    subtitle: 'a few routes that fit you',
    blurb: 'How to turn the reading into an actual practice that fits the shape of your life.',
    atAGlance: {
      thesis: 'A durable practice is a small set of fitting actions, attached to real cues and prepared for difficult days, not a maximal routine.',
      takeaways: [
        'Choose practices for the situations that actually undo you, rather than trying to cover every route at once.',
        'Implementation intentions make a cue and response explicit. Starting small protects consistency while the practice becomes familiar.',
        'A hard-day version and a scheduled review turn an inevitable missed day into information rather than a collapse.',
      ],
      readingMinutes: 16,
      practiceMinutes: 8,
      signaturePractice: 'toolkit builder',
    },
  },
  {
    num: 17,
    part: PART.four,
    title: 'Designing for Calm',
    slug: 'designing-for-calm',
    subtitle: 'calm built around you',
    blurb: 'Redesigning your rooms, your time, and your attention so the environment stops working against you.',
    routes: ['enough', 'the-body', 'presence'],
    atAGlance: {
      thesis: 'Calm is partly a design problem: make supportive choices easier, and make interruption, clutter, and urgency less automatic.',
      takeaways: [
        'Defaults and friction often shape behavior more reliably than motivation, though many generic nudges have modest and variable effects.',
        'Notifications and task switching carry an attention cost. Batching alerts or moving a phone away can help without demanding total abstinence.',
        'Environmental changes are experiments, not moral tests. Choose one default, observe it, and adjust.',
      ],
      readingMinutes: 17,
      practiceMinutes: 8,
      signaturePractice: 'calm-environment audit',
    },
  },
  {
    num: 18,
    part: PART.four,
    title: 'Calm Is Not Numbness',
    slug: 'calm-is-not-numbness',
    subtitle: 'the spine, stated plainly',
    blurb: "The book's spine, stated plainly: real calm stays engaged, and its counterfeits are quiet for the wrong reasons.",
    atAGlance: {
      thesis: 'Calm is a base for meeting your life, not a bunker from feeling it. When safety or persistent distress is at stake, connection and professional care outrank more practice.',
      takeaways: [
        'Equanimity stays in contact with feeling and action. Bypassing, avoidance, and toxic positivity can look quiet while turning away.',
        'The self-check is a reflection tool, not a diagnosis. Yellow signposts mean it is worth talking to someone; red signposts mean reach out now.',
        'Crisis resources are region-specific. Save local options before you need them, and verify them again when you use them.',
      ],
      readingMinutes: 16,
      practiceMinutes: 8,
      signaturePractice: 'settling-or-avoiding self-check',
      lastReviewed: '2026-07-15',
    },
  },
];

const BY_SLUG = new Map(CHAPTERS.map((ch) => [ch.slug, ch]));

export function getChapter(slug: string | undefined): Chapter | undefined {
  return slug ? BY_SLUG.get(slug) : undefined;
}

export function chapterNeighbors(slug: string): { prev?: Chapter; next?: Chapter } {
  const i = CHAPTERS.findIndex((ch) => ch.slug === slug);
  if (i === -1) return {};
  return { prev: CHAPTERS[i - 1], next: CHAPTERS[i + 1] };
}

/** chapters grouped by part, in order, for the landing index */
export function chaptersByPart(): { part: PartLabel; chapters: Chapter[] }[] {
  const groups: { part: PartLabel; chapters: Chapter[] }[] = [];
  for (const ch of CHAPTERS) {
    const last = groups[groups.length - 1];
    if (last && last.part === ch.part) last.chapters.push(ch);
    else groups.push({ part: ch.part, chapters: [ch] });
  }
  return groups;
}

/** zero-padded chapter number for the § label, for example "04" */
export function chapterNumLabel(num: number): string {
  return String(num).padStart(2, '0');
}
