import { ROUTES, getRoute, type RouteId, type Route } from '@/content/routes';
import { c } from '@/styles/tokens';

/**
 * The single source of truth for Ch 14, One Calm, Many Doors. It drives three
 * things at once so they can never drift: the routes-to-calm map (fig_14.1), the
 * convergence explorer graph and its inspector (widget_14.1), and the cross-links.
 *
 * The mapping below is held to the book's own claims: every (tradition, route)
 * cell here matches the RouteTags that tradition's chapter declares in Part II.
 * That is the whole discipline of this chapter. We claim convergence of METHOD,
 * a family resemblance, never identity of experience or of metaphysics. The four
 * `soft` cells are looser, literary fits, hedged in the prose and the inspector.
 *
 * Names are the traditions' own terms, verified against primary sources and
 * scholarship. Transliterations are kept plain (no diacritics) to match the house
 * style and to render cleanly in the graph's canvas labels. No em dashes anywhere
 * in a reader-facing string.
 */

export type TraditionId =
  | 'stoicism'
  | 'epicureanism'
  | 'buddhism'
  | 'zen'
  | 'taoism'
  | 'yoga'
  | 'clinical'
  | 'ifs'
  | 'contemplative'
  | 'transcendentalists';

export interface RouteCell {
  route: RouteId;
  /** the tradition's own name for this move */
  name: string;
  /** one accurate line on how this tradition walks this route */
  how: string;
  /** a looser, literary fit: hedge it rather than assert a tight parallel */
  soft?: boolean;
}

export interface Tradition {
  id: TraditionId;
  /** full display name */
  label: string;
  /** short label for the graph node */
  short: string;
  /** the chapter slug, for cross-links */
  slug: string;
  /** the chapter number, for the inspector */
  num: number;
  /** the routes this tradition leans on, with its own name for each */
  cells: RouteCell[];
}

export const TRADITIONS: Tradition[] = [
  {
    id: 'stoicism',
    label: 'Stoicism',
    short: 'Stoicism',
    slug: 'tranquility-by-judgment',
    num: 4,
    cells: [
      {
        route: 'letting-go',
        name: 'the dichotomy of control',
        how: 'Release what is not up to you and spend your effort only on your own judgments and choices.',
      },
      {
        route: 'perspective',
        name: 'the view from above',
        how: 'Zoom out to the scale of the whole, and the trouble shrinks back to its real size.',
      },
    ],
  },
  {
    id: 'epicureanism',
    label: 'Epicureanism',
    short: 'Epicurus',
    slug: 'enough-and-no-fear',
    num: 5,
    cells: [
      {
        route: 'enough',
        name: 'natural and necessary desires',
        how: 'Keep the wants that are easy to meet, prune the groundless ones, and the gap anxiety lives in narrows.',
      },
      {
        route: 'connection',
        name: 'friendship',
        how: 'Of the things wisdom provides for a blessed life, the greatest by far is friendship.',
      },
      {
        route: 'perspective',
        name: 'death is nothing to us',
        how: 'Where we are, death is not; where death is, we are not. So it is no business of ours to dread.',
      },
    ],
  },
  {
    id: 'buddhism',
    label: 'Buddhism',
    short: 'Buddhism',
    slug: 'calm-abiding',
    num: 6,
    cells: [
      {
        route: 'presence',
        name: 'sati (mindfulness)',
        how: 'Present-moment awareness, trained through the foundations of mindfulness, seeing experience clearly as it arises.',
      },
      {
        route: 'letting-go',
        name: 'non-clinging, the second arrow',
        how: 'Let go of craving, and refuse the second arrow of resistance you add to unavoidable pain.',
      },
      {
        route: 'connection',
        name: 'metta (lovingkindness)',
        how: 'Cultivate goodwill outward, the lovingkindness and compassion that loosen the knot of self.',
      },
    ],
  },
  {
    id: 'zen',
    label: 'Zen',
    short: 'Zen',
    slug: 'the-ordinary-mind',
    num: 7,
    cells: [
      {
        route: 'presence',
        name: 'the ordinary mind, this cup of tea',
        how: 'The ordinary mind is the way: full attention on the plain task in front of you, nothing added.',
      },
      {
        route: 'enough',
        name: 'just this',
        how: 'When hungry, eat. When tired, sleep. Nothing is needed beyond what is already here.',
        soft: true,
      },
    ],
  },
  {
    id: 'taoism',
    label: 'Taoism',
    short: 'Taoism',
    slug: 'the-watercourse-way',
    num: 8,
    cells: [
      {
        route: 'letting-go',
        name: 'wu wei (non-forcing)',
        how: 'Act without strain. Stop imposing your will on the current and move with it instead.',
      },
      {
        route: 'presence',
        name: 'ziran (being so of itself)',
        how: 'Move with the spontaneous flow of the moment rather than living ahead of it in calculation.',
        soft: true,
      },
    ],
  },
  {
    id: 'yoga',
    label: 'Yoga',
    short: 'Yoga',
    slug: 'stilling-the-mind',
    num: 9,
    cells: [
      {
        route: 'the-body',
        name: 'pranayama and asana',
        how: 'Enter the mind through the body: breath regulation and posture, the limbs that prepare it for stillness.',
      },
      {
        route: 'letting-go',
        name: 'vairagya (non-attachment)',
        how: 'Non-attachment paired with steady practice is what stills the fluctuations of the mind.',
      },
      {
        route: 'presence',
        name: 'dharana and dhyana',
        how: 'Fix attention on a single object, then sustain it into meditation. Present focus, trained in stages.',
      },
    ],
  },
  {
    id: 'clinical',
    label: 'the clinical methods',
    short: 'clinical',
    slug: 'the-engineering-of-calm',
    num: 10,
    cells: [
      {
        route: 'letting-go',
        name: 'acceptance and defusion',
        how: 'Drop the struggle to control inner experience, and unhook from the thought instead of obeying it.',
      },
      {
        route: 'presence',
        name: 'mindfulness (MBSR)',
        how: 'Pay attention on purpose, in the present moment, without judgment. The secular core of the same skill.',
      },
      {
        route: 'perspective',
        name: 'reappraisal and decentering',
        how: 'Re-judge the distorted interpretation, and step back far enough to see a thought as a thought.',
      },
    ],
  },
  {
    id: 'ifs',
    label: 'Internal Family Systems',
    short: 'IFS',
    slug: 'the-calm-at-the-center',
    num: 11,
    cells: [
      {
        route: 'letting-go',
        name: 'unblending',
        how: 'Separate from the part that has taken over, so the Self can come back to the center and lead.',
      },
      {
        route: 'connection',
        name: 'connectedness',
        how: 'One of the qualities of Self: the felt sense of being linked, to your own parts and to others.',
      },
      {
        route: 'presence',
        name: 'being with a part',
        how: 'Turn toward a part and stay with it, from the calm and curious presence of the Self.',
        soft: true,
      },
    ],
  },
  {
    id: 'contemplative',
    label: 'the contemplative religions',
    short: 'contemplative',
    slug: 'stillness-and-surrender',
    num: 12,
    cells: [
      {
        route: 'letting-go',
        name: 'surrender',
        how: 'Entrust the outcome to God. Islamic tawakkul, Christian abandonment to providence: release the grip.',
      },
      {
        route: 'meaning',
        name: 'held in a larger story',
        how: 'Set the hardship inside a meaningful whole, and a weight that would crush you alone becomes bearable.',
      },
      {
        route: 'presence',
        name: 'the presence of God',
        how: 'Practice the presence: continual, present-moment attention turned toward God in the most ordinary tasks.',
      },
    ],
  },
  {
    id: 'transcendentalists',
    label: 'the Transcendentalists',
    short: 'Walden',
    slug: 'nature-and-simplicity',
    num: 13,
    cells: [
      {
        route: 'enough',
        name: 'simplify, simplify',
        how: 'Cut your wants down to a size you can carry, and a small life turns out to be a wide one.',
      },
      {
        route: 'perspective',
        name: 'the transparent eyeball',
        how: 'Standing in the open, the petty self thins out: I am nothing, I see all.',
      },
      {
        route: 'presence',
        name: 'deliberate attention in nature',
        how: 'Go to the woods to live deliberately, attending closely to the living world in front of you.',
      },
      {
        route: 'the-body',
        name: 'nature through the senses',
        how: 'Meet the world through direct physical sensation, taking it in through the pores.',
        soft: true,
      },
    ],
  },
];

const TRAD_BY_ID = new Map(TRADITIONS.map((t) => [t.id, t]));

export function getTradition(id: TraditionId): Tradition {
  const t = TRAD_BY_ID.get(id);
  if (!t) throw new Error(`Unknown tradition id: ${id}`);
  return t;
}

/** which traditions walk a given route, with each one's name for the move */
export interface RouteTraditions {
  route: Route;
  traditions: { tradition: Tradition; cell: RouteCell }[];
}

/** invert the mapping: for each route, every tradition that uses it. Ordered by
 *  breadth, the most-traveled routes first, which is the convergence gradient. */
export function routesWithTraditions(): RouteTraditions[] {
  const rows = ROUTES.map((route) => {
    const traditions = TRADITIONS.flatMap((tradition) => {
      const cell = tradition.cells.find((x) => x.route === route.id);
      return cell ? [{ tradition, cell }] : [];
    });
    return { route, traditions };
  });
  return rows.sort((a, b) => b.traditions.length - a.traditions.length);
}

/** total tradition count for a route, used for node sizing and the figure */
export function routeBreadth(id: RouteId): number {
  return TRADITIONS.filter((t) => t.cells.some((cell) => cell.route === id)).length;
}

export { ROUTES, getRoute };
export type { RouteId, Route };

/* --------------------------------------------------------------------------
 * The witness cluster (fig_14.2): the same phenomenology, a watchful awareness
 * behind the contents of the mind, read in opposite metaphysical directions.
 * The fault line is the lesson. Some traditions posit a permanent witnessing
 * Self. Others deny exactly that and call reifying awareness into a Self the
 * very error to undo. Saying "they all point to the witness Self" silently takes
 * one side. We sort each onto the fault line and keep the honest hedges.
 * ------------------------------------------------------------------------ */

export type WitnessPole = 'self' | 'no-self' | 'stance' | 'union' | 'disanalogy';

export interface WitnessEntry {
  tradition: string;
  term: string;
  note: string;
  pole: WitnessPole;
}

export const WITNESS: WitnessEntry[] = [
  {
    tradition: 'Advaita Vedanta',
    term: 'the witness, sakshin',
    note: 'A self-luminous consciousness that lights up every passing state and is never itself an object. Permanent, and real.',
    pole: 'self',
  },
  {
    tradition: 'Yoga and Samkhya',
    term: 'the seer, purusha',
    note: 'When the mind settles, the seer rests in its own nature. Pure consciousness, set apart from everything it watches.',
    pole: 'self',
  },
  {
    tradition: 'Internal Family Systems',
    term: 'the Self',
    note: 'The calm center that sees the parts and is not one of them. The most essence-like of the modern frames, and a boundary case.',
    pole: 'self',
  },
  {
    tradition: 'Buddhism',
    term: 'bare awareness, sati, and anatta',
    note: 'There is watching, but no watcher behind it. Treating awareness as a stable self is precisely the error the practice undoes.',
    pole: 'no-self',
  },
  {
    tradition: 'Zen',
    term: 'no-mind, mushin',
    note: 'Awake functioning with no clinging ego at the center. Often it collapses the watcher and the watched rather than installing a watcher.',
    pole: 'no-self',
  },
  {
    tradition: 'ACT',
    term: 'the observing self',
    note: 'The place you watch thoughts from, named on purpose as a skill you take up, not a soul you are claiming exists.',
    pole: 'stance',
  },
  {
    tradition: 'Christian contemplation',
    term: 'the ground of the soul',
    note: 'The silent innermost ground, reached by subtraction. But the aim is union with God, not resting as a neutral observer.',
    pole: 'union',
  },
  {
    tradition: 'Stoicism',
    term: 'the ruling faculty',
    note: 'Not a witness at all. It tests each impression and assents or refuses. An active judge, the contrast that defines the rest.',
    pole: 'disanalogy',
  },
];

/* --------------------------------------------------------------------------
 * The genuine divergences (fig_14.3): real forks where the traditions
 * contradict each other, not vocabulary differences. The chapter needs these so
 * the convergence claim stays honest. Convergence of method is not identity of
 * aim.
 * ------------------------------------------------------------------------ */

export interface Divergence {
  question: string;
  a: { who: string; pos: string };
  b: { who: string; pos: string };
}

export const DIVERGENCES: Divergence[] = [
  {
    question: 'Is the cosmos a providential order, or impersonal cause with no mind behind it?',
    a: { who: 'Stoicism', pos: 'The universe is a rational whole, and what happens is fated and good for it.' },
    b: { who: 'Buddhism', pos: 'No creator, no cosmic plan. Just conditions arising and passing, owed to no one.' },
  },
  {
    question: 'Does the calm require surrender to a personal God, or no God at all?',
    a: { who: 'The contemplative religions', pos: 'Peace is communion with God, and grace comes from outside the self.' },
    b: { who: 'Stoicism, Buddhism, the clinic', pos: 'The discipline runs on attention and judgment, with no deity required.' },
  },
  {
    question: 'Is there a permanent self to uncover, or a fixed self to see through?',
    a: { who: 'Vedanta, IFS, the soul', pos: 'A real, enduring center to realize, free, or return to.' },
    b: { who: 'Buddhism', pos: 'No permanent self anywhere. Clinging to one as "me" is the root of the trouble.' },
  },
  {
    question: 'What is the goal, really?',
    a: { who: 'Epicurus', pos: 'Tranquility itself is the summit, the whole point of the work.' },
    b: { who: 'Buddhism, Stoicism, the mystics', pos: 'Calm is a byproduct of liberation, of virtue, of union. Chased directly, it is worthless.' },
  },
  {
    question: 'Is peace reached by more reason and effort, or by less?',
    a: { who: 'Stoicism, the clinic', pos: 'Engineer it. Examine the impression, re-judge it, act on duty.' },
    b: { who: 'Taoism', pos: 'Stop engineering. Drop the striving and let the natural current carry you.' },
  },
  {
    question: 'Are the hard emotions to be erased, or met and accepted?',
    a: { who: 'Stoicism', pos: 'The destructive passions rest on false judgments and are to be rooted out entirely.' },
    b: { who: 'Buddhism, ACT, IFS', pos: 'They are not errors to delete. You meet them, watch them pass, befriend the part that carries them.' },
  },
];

/** the legend colors used by the witness fault line and elsewhere */
export const POLE_COLOR: Record<WitnessPole, string> = {
  self: c.amber,
  'no-self': c.teal,
  stance: c.violet,
  union: c.coral,
  disanalogy: c.faint,
};
