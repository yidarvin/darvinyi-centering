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
}

export const CHAPTERS: Chapter[] = [
  { num: 0, part: PART.start, title: 'How to Use This Book', slug: 'how-to-use-this-book', subtitle: 'how to read this · calm is trainable', blurb: 'How this book works, and why calm is trainable rather than fixed.' },

  { num: 1, part: PART.one, title: "What Calm Is, and Isn't", slug: 'what-calm-is', subtitle: 'equanimity, not numbness', blurb: 'What calm actually is: equanimity, not numbness, engaged rather than checked out.' },
  { num: 2, part: PART.one, title: 'The Settled Body', slug: 'the-settled-body', subtitle: 'the body has a brake', blurb: "How the body's own brake, the vagus nerve and the long exhale, lowers arousal on command." },
  { num: 3, part: PART.one, title: 'The Quiet Mind', slug: 'the-quiet-mind', subtitle: 'why the mind resists, and how to train it', blurb: 'Why attention wanders by default, and the one move that trains it back.' },

  { num: 4, part: PART.two, title: 'Stoicism: Tranquility by Judgment', slug: 'tranquility-by-judgment', subtitle: 'stoicism · disturbance comes from judgment', blurb: "Stoicism's case that disturbance comes from judgment, not events, and the dichotomy of control.", routes: ['letting-go', 'perspective'] },
  { num: 5, part: PART.two, title: 'Epicureanism: Enough, and No Fear', slug: 'enough-and-no-fear', subtitle: 'epicureanism · want less, fear less', blurb: 'Epicurus on wanting less, sorting your desires, and why easy pleasures beat expensive ones.', routes: ['enough', 'connection', 'perspective'] },
  { num: 6, part: PART.two, title: 'Buddhism: Calm Abiding', slug: 'calm-abiding', subtitle: 'buddhism · the mind, mapped', blurb: "Buddhism's map of the mind: the second arrow, the three marks, and equanimity that is not indifference.", routes: ['presence', 'letting-go', 'connection'] },
  { num: 7, part: PART.two, title: 'Zen: The Ordinary Mind', slug: 'the-ordinary-mind', subtitle: 'zen · this breath, this cup', blurb: "Zen's ordinary mind: just sitting, beginner's mind, and no special state to chase.", routes: ['presence', 'enough'] },
  { num: 8, part: PART.two, title: 'Taoism: The Watercourse Way', slug: 'the-watercourse-way', subtitle: 'taoism · stop fighting the current', blurb: "Taoism's wu wei: effort without strain, and moving with the current instead of forcing it.", routes: ['letting-go', 'presence'] },
  { num: 9, part: PART.two, title: 'Yoga and the Stilling of the Mind', slug: 'stilling-the-mind', subtitle: 'yoga · the stilling of the fluctuations', blurb: "Yoga's eight limbs and the stilling of the mind's fluctuations, from posture to absorption.", routes: ['the-body', 'letting-go', 'presence'] },
  { num: 10, part: PART.two, title: 'The Engineering of Calm', slug: 'the-engineering-of-calm', subtitle: 'the clinical methods · calm, made testable', blurb: 'The clinical methods, CBT, ACT, DBT, and mindfulness, that turned old insights into testable tools.', routes: ['letting-go', 'presence', 'perspective'] },
  { num: 11, part: PART.two, title: 'Internal Family Systems: The Calm at the Center', slug: 'the-calm-at-the-center', subtitle: 'internal family systems · the self beneath the parts', blurb: 'Internal Family Systems: a mind that is naturally multiple, and the calm Self beneath the parts.', routes: ['letting-go', 'connection', 'presence'] },
  { num: 12, part: PART.two, title: 'Stillness and Surrender: The Contemplative Religions', slug: 'stillness-and-surrender', subtitle: 'the contemplative religions · a survey', blurb: 'Four contemplative religious paths, Christian, Sufi, Jewish, and their shared grammar of surrender.', routes: ['letting-go', 'meaning', 'presence'] },
  { num: 13, part: PART.two, title: 'Nature and Simplicity: The Transcendentalists', slug: 'nature-and-simplicity', subtitle: 'the transcendentalists · solitude and simplicity', blurb: 'The Transcendentalists on solitude, simplicity, and what a walk in the woods actually restores.', routes: ['enough', 'perspective', 'presence', 'the-body'] },

  { num: 14, part: PART.three, title: 'One Calm, Many Doors', slug: 'one-calm-many-doors', subtitle: 'the routes, collected', blurb: "Where the traditions' routes to calm converge, and where they genuinely disagree." },
  { num: 15, part: PART.three, title: 'What Actually Works', slug: 'what-actually-works', subtitle: 'the evidence, graded honestly', blurb: 'The evidence for every route to calm in this book, graded honestly, strengths and limits both.' },

  { num: 16, part: PART.four, title: 'Building Your Practice', slug: 'building-your-practice', subtitle: 'a few routes that fit you', blurb: 'How to turn the reading into an actual practice that fits the shape of your life.' },
  { num: 17, part: PART.four, title: 'Designing for Calm', slug: 'designing-for-calm', subtitle: 'calm built around you', blurb: 'Redesigning your rooms, your time, and your attention so the environment stops working against you.', routes: ['enough', 'the-body', 'presence'] },
  { num: 18, part: PART.four, title: 'Calm Is Not Numbness', slug: 'calm-is-not-numbness', subtitle: 'the spine, stated plainly', blurb: "The book's spine, stated plainly: real calm stays engaged, and its counterfeits are quiet for the wrong reasons." },
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
