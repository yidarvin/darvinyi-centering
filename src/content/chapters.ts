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
}

export const CHAPTERS: Chapter[] = [
  { num: 0, part: PART.start, title: 'How to Use This Book', slug: 'how-to-use-this-book', subtitle: 'how to read this · calm is trainable' },

  { num: 1, part: PART.one, title: "What Calm Is, and Isn't", slug: 'what-calm-is', subtitle: 'equanimity, not numbness' },
  { num: 2, part: PART.one, title: 'The Settled Body', slug: 'the-settled-body', subtitle: 'the body has a brake' },
  { num: 3, part: PART.one, title: 'The Quiet Mind', slug: 'the-quiet-mind', subtitle: 'why the mind resists, and how to train it' },

  { num: 4, part: PART.two, title: 'Stoicism: Tranquility by Judgment', slug: 'tranquility-by-judgment', subtitle: 'stoicism · disturbance comes from judgment' },
  { num: 5, part: PART.two, title: 'Epicureanism: Enough, and No Fear', slug: 'enough-and-no-fear', subtitle: 'epicureanism · want less, fear less' },
  { num: 6, part: PART.two, title: 'Buddhism: Calm Abiding', slug: 'calm-abiding', subtitle: 'buddhism · the mind, mapped' },
  { num: 7, part: PART.two, title: 'Zen: The Ordinary Mind', slug: 'the-ordinary-mind', subtitle: 'zen · this breath, this cup' },
  { num: 8, part: PART.two, title: 'Taoism: The Watercourse Way', slug: 'the-watercourse-way', subtitle: 'taoism · stop fighting the current' },
  { num: 9, part: PART.two, title: 'Yoga and the Stilling of the Mind', slug: 'stilling-the-mind', subtitle: 'yoga · the stilling of the fluctuations' },
  { num: 10, part: PART.two, title: 'The Engineering of Calm', slug: 'the-engineering-of-calm', subtitle: 'the clinical methods · calm, made testable' },
  { num: 11, part: PART.two, title: 'Internal Family Systems: The Calm at the Center', slug: 'the-calm-at-the-center', subtitle: 'internal family systems · the self beneath the parts' },
  { num: 12, part: PART.two, title: 'Stillness and Surrender: The Contemplative Religions', slug: 'stillness-and-surrender', subtitle: 'the contemplative religions · a survey' },
  { num: 13, part: PART.two, title: 'Nature and Simplicity: The Transcendentalists', slug: 'nature-and-simplicity', subtitle: 'the transcendentalists · solitude and simplicity' },

  { num: 14, part: PART.three, title: 'One Calm, Many Doors', slug: 'one-calm-many-doors', subtitle: 'the routes, collected' },
  { num: 15, part: PART.three, title: 'What Actually Works', slug: 'what-actually-works', subtitle: 'the evidence, graded honestly' },

  { num: 16, part: PART.four, title: 'Building Your Practice', slug: 'building-your-practice', subtitle: 'a few routes that fit you' },
  { num: 17, part: PART.four, title: 'Designing for Calm', slug: 'designing-for-calm', subtitle: 'calm built around you' },
  { num: 18, part: PART.four, title: 'Calm Is Not Numbness', slug: 'calm-is-not-numbness', subtitle: 'the spine, stated plainly' },
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
