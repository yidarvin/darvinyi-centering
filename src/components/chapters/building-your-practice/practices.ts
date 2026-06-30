import { getRoute, type RouteId } from '@/content/routes';

/**
 * The single source of truth for Ch 16, Building Your Practice. It drives the
 * route-and-situation matrix (fig_16.1) and the toolkit builder (widget_16.1),
 * so the menu of practices and the situations can never drift apart.
 *
 * Every practice here is one the book already taught, named plainly and tagged
 * with the route it leans on, the chapter it came from, and its minimum effective
 * dose: the smallest version that still does something. Nothing new is invented.
 * The whole point of the chapter is subtraction, not addition: a few of these,
 * anchored to your day, beats the whole list admired and abandoned.
 */

export { getRoute };
export type { RouteId };

/**
 * How a practice fits a day.
 *  - 'reset'  a short in-the-moment tool, seconds to a minute, for a hot moment
 *  - 'anchor' a small steady thing you hang on an existing routine
 *  - 'session' a longer sit you do when there is room, not every day
 *  - 'weekly' a once-a-week move
 */
export type Kind = 'reset' | 'anchor' | 'session' | 'weekly';

export interface KindDef {
  id: Kind;
  label: string;
  gloss: string;
}

export const KINDS: KindDef[] = [
  { id: 'reset', label: 'in-the-moment', gloss: 'seconds to a minute, for a hard moment' },
  { id: 'anchor', label: 'daily anchor', gloss: 'a small steady thing, hung on a routine you already have' },
  { id: 'session', label: 'when there is room', gloss: 'a longer sit, a few times a week, not a daily duty' },
  { id: 'weekly', label: 'weekly', gloss: 'once a week is plenty' },
];

const KIND_BY_ID = new Map(KINDS.map((k) => [k.id, k]));

export function getKind(id: Kind): KindDef {
  const k = KIND_BY_ID.get(id);
  if (!k) throw new Error(`Unknown kind: ${id}`);
  return k;
}

export interface Practice {
  id: string;
  /** the practice, named plainly */
  name: string;
  /** the route to calm it leans on */
  route: RouteId;
  /** one line on what it is and what it does */
  line: string;
  /** the minimum effective dose: the smallest version that still helps */
  dose: string;
  kind: Kind;
  /** true if it works in an acute, hot moment (the hard-day card draws from these) */
  hotMoment: boolean;
  /** the chapter it came from */
  chapter: string;
  /** the short label for the chapter link */
  chapterShort: string;
}

export const PRACTICES: Practice[] = [
  // ---- the body ----------------------------------------------------------
  {
    id: 'slow-breath',
    name: 'A few slow breaths, exhale long',
    route: 'the-body',
    line: 'Make the out-breath longer than the in-breath. The long exhale pulls the parasympathetic brake. It works in about a minute and you can do it anywhere.',
    dose: '3 breaths',
    kind: 'reset',
    hotMoment: true,
    chapter: 'the-settled-body',
    chapterShort: 'the settled body',
  },
  {
    id: 'coherent',
    name: 'Coherent breathing, near six a minute',
    route: 'the-body',
    line: 'Breathe at about five and a half a minute and the heart and the baroreflex fall into resonance. A steady five minutes, eyes open or closed.',
    dose: '5 min',
    kind: 'session',
    hotMoment: false,
    chapter: 'the-settled-body',
    chapterShort: 'the settled body',
  },
  {
    id: 'wind-down',
    name: 'A fixed wind-down before sleep',
    route: 'the-body',
    line: 'The same small sequence every night, dimmed and unhurried, so the body learns that this is the off-ramp. Lights down, screen away, a few slow breaths.',
    dose: '10 min',
    kind: 'anchor',
    hotMoment: false,
    chapter: 'the-settled-body',
    chapterShort: 'the settled body',
  },

  // ---- presence ----------------------------------------------------------
  {
    id: 'breath-anchor',
    name: 'A breath-anchor sit',
    route: 'presence',
    line: 'Sit, rest attention on the breath, and when it wanders, bring it back. The wandering is not failure. The return is the rep.',
    dose: '5 min',
    kind: 'session',
    hotMoment: false,
    chapter: 'calm-abiding',
    chapterShort: 'calm abiding',
  },
  {
    id: 'one-act',
    name: 'One ordinary act, full attention',
    route: 'presence',
    line: 'Pick one daily thing, the tea, the dishes, the walk to the car, and give it your whole attention, no second screen. One act done completely.',
    dose: '1 act',
    kind: 'anchor',
    hotMoment: false,
    chapter: 'the-ordinary-mind',
    chapterShort: 'the ordinary mind',
  },
  {
    id: 'noting',
    name: 'Note the feeling, name it once',
    route: 'presence',
    line: 'When something grips you, name it quietly: tension, fear, wanting. Naming it once puts a thumb-width of space between you and it.',
    dose: '30 sec',
    kind: 'reset',
    hotMoment: true,
    chapter: 'calm-abiding',
    chapterShort: 'calm abiding',
  },
  {
    id: 'return-rep',
    name: 'Notice the drift, come back',
    route: 'presence',
    line: 'The one move under every practice in the book. Catch that your mind has left, and walk it back to here. A few reps is a whole practice.',
    dose: 'a few reps',
    kind: 'reset',
    hotMoment: true,
    chapter: 'the-quiet-mind',
    chapterShort: 'the quiet mind',
  },
  {
    id: 'phone-free-walk',
    name: 'A phone-free walk',
    route: 'presence',
    line: 'Ten minutes outside with attention free to wander. A natural scene holds it softly, and depleted attention refills on its own.',
    dose: '10 min',
    kind: 'session',
    hotMoment: false,
    chapter: 'nature-and-simplicity',
    chapterShort: 'nature and simplicity',
  },

  // ---- letting go --------------------------------------------------------
  {
    id: 'control',
    name: 'Name what is not up to you',
    route: 'letting-go',
    line: 'Split the worry in two: the part you can act on, and the part you cannot. Put your hands on the first and set the second down.',
    dose: '1 worry',
    kind: 'reset',
    hotMoment: true,
    chapter: 'tranquility-by-judgment',
    chapterShort: 'tranquility by judgment',
  },
  {
    id: 'second-arrow',
    name: 'Drop the second arrow',
    route: 'letting-go',
    line: 'The first arrow is the pain itself. The second is the struggle against it, the why-me added on top. Notice the second one, and let it fall.',
    dose: '1 noticing',
    kind: 'reset',
    hotMoment: true,
    chapter: 'calm-abiding',
    chapterShort: 'calm abiding',
  },
  {
    id: 'defuse',
    name: 'Defuse a sticky thought',
    route: 'letting-go',
    line: 'Put a frame around it: "I am having the thought that…" A thought you can watch is a thought you do not have to obey.',
    dose: '1 thought',
    kind: 'reset',
    hotMoment: true,
    chapter: 'the-engineering-of-calm',
    chapterShort: 'the engineering of calm',
  },
  {
    id: 'stop-forcing',
    name: 'Find one place you are forcing',
    route: 'letting-go',
    line: 'Look for where you are pushing against the grain and ask what moving with it would look like. Strain is a signal, not a virtue.',
    dose: '1 place',
    kind: 'anchor',
    hotMoment: false,
    chapter: 'the-watercourse-way',
    chapterShort: 'the watercourse way',
  },

  // ---- perspective -------------------------------------------------------
  {
    id: 'view-above',
    name: 'Zoom out, the view from above',
    route: 'perspective',
    line: 'Lift the camera. The room, the city, the year, the long arc. From far enough up the trouble keeps its shape but loses its size.',
    dose: '1 min',
    kind: 'reset',
    hotMoment: true,
    chapter: 'tranquility-by-judgment',
    chapterShort: 'tranquility by judgment',
  },
  {
    id: 'reframe',
    name: 'Is this a fact, or a thought?',
    route: 'perspective',
    line: 'Catch the automatic line, write it down, and test it against the evidence. Most of what spikes the feeling is a story, not a report.',
    dose: '1 thought',
    kind: 'reset',
    hotMoment: true,
    chapter: 'the-engineering-of-calm',
    chapterShort: 'the engineering of calm',
  },
  {
    id: 'premeditation',
    name: 'Name what could go wrong, and your plan',
    route: 'perspective',
    line: 'Before the thing you dread, picture it going sideways and decide now what you would do. Rehearsed trouble is smaller trouble.',
    dose: '2 min',
    kind: 'session',
    hotMoment: false,
    chapter: 'tranquility-by-judgment',
    chapterShort: 'tranquility by judgment',
  },

  // ---- enough ------------------------------------------------------------
  {
    id: 'need-check',
    name: 'Sort one want: need, or just loud?',
    route: 'enough',
    line: 'Take one craving and ask which bin it is in: natural and needed, natural but not needed, or empty and endless. Most of the noise is the third.',
    dose: '1 want',
    kind: 'anchor',
    hotMoment: false,
    chapter: 'enough-and-no-fear',
    chapterShort: 'enough, and no fear',
  },
  {
    id: 'subtract',
    name: 'Subtract one thing',
    route: 'enough',
    line: 'Once a week, take one thing out: a commitment, a feed, a surface of clutter. Calm is built by removal at least as much as by addition.',
    dose: '1 thing',
    kind: 'weekly',
    hotMoment: false,
    chapter: 'nature-and-simplicity',
    chapterShort: 'nature and simplicity',
  },

  // ---- connection --------------------------------------------------------
  {
    id: 'one-contact',
    name: 'One real contact, on purpose',
    route: 'connection',
    line: 'Reach one person deliberately: a message that is not logistics, a call, a shared meal. The most under-rated calming move there is.',
    dose: '1 reach',
    kind: 'anchor',
    hotMoment: false,
    chapter: 'enough-and-no-fear',
    chapterShort: 'enough, and no fear',
  },
  {
    id: 'metta',
    name: 'A few lines of goodwill',
    route: 'connection',
    line: 'Send a short, plain wish of wellbeing to yourself, to someone easy, to someone hard. Warmth practiced on purpose loosens the threat-focus.',
    dose: '2 min',
    kind: 'session',
    hotMoment: false,
    chapter: 'calm-abiding',
    chapterShort: 'calm abiding',
  },

  // ---- meaning -----------------------------------------------------------
  {
    id: 'larger-frame',
    name: 'Set the day inside something larger',
    route: 'meaning',
    line: 'One line on why the hard day matters, what it is in service of. A small day set inside a larger frame weighs less.',
    dose: '1 line',
    kind: 'anchor',
    hotMoment: false,
    chapter: 'stillness-and-surrender',
    chapterShort: 'stillness and surrender',
  },
  {
    id: 'centering-word',
    name: 'A word, repeated, into stillness',
    route: 'meaning',
    line: 'A single word held lightly and returned to, a descent below the noise of thought. It needs no belief to work as an anchor.',
    dose: '5 min',
    kind: 'session',
    hotMoment: false,
    chapter: 'stillness-and-surrender',
    chapterShort: 'stillness and surrender',
  },
];

const PRACTICE_BY_ID = new Map(PRACTICES.map((p) => [p.id, p]));

export function getPractice(id: string): Practice | undefined {
  return PRACTICE_BY_ID.get(id);
}

/** the practices that work in an acute moment, the pool the hard-day card draws from */
export const HOT_MOMENT_PRACTICES = PRACTICES.filter((p) => p.hotMoment);

/* --------------------------------------------------------------------------
 * The route-and-situation matrix (fig_16.1). Six common hard situations, and
 * which of the seven routes actually help with each. The honest pattern: no
 * situation needs all seven, each calls a different few, and the acute moments
 * are handled by the body, presence, letting go, and perspective, while enough,
 * connection, and meaning are the slower, structural routes.
 * ------------------------------------------------------------------------ */

export interface Situation {
  id: string;
  /** the situation, in the reader's words */
  label: string;
  /** the routes that fit this moment */
  routes: RouteId[];
}

export const SITUATIONS: Situation[] = [
  {
    id: 'racing-night',
    label: 'A racing mind at 2am',
    routes: ['the-body', 'presence', 'letting-go'],
  },
  {
    id: 'overloaded-day',
    label: 'A tense, overloaded day',
    routes: ['the-body', 'presence', 'perspective', 'enough'],
  },
  {
    id: 'conflict',
    label: 'A conflict, a sharp word',
    routes: ['the-body', 'letting-go', 'perspective'],
  },
  {
    id: 'wanting',
    label: 'A wave of wanting, comparison',
    routes: ['enough', 'perspective', 'letting-go'],
  },
  {
    id: 'loss',
    label: 'Grief, a loss you cannot fix',
    routes: ['letting-go', 'connection', 'meaning', 'presence'],
  },
  {
    id: 'flat',
    label: 'Going through the motions',
    routes: ['presence', 'connection', 'meaning'],
  },
];

/** the seven routes, in the canonical order used across the matrix columns */
export const ROUTE_ORDER: RouteId[] = [
  'the-body',
  'presence',
  'letting-go',
  'perspective',
  'enough',
  'connection',
  'meaning',
];

/* --------------------------------------------------------------------------
 * The daily-and-weekly template (fig_16.2). A realistic rhythm, not a regimen:
 * a couple of small daily anchors, a longer session when there is room, an
 * in-the-moment reset always available, and one weekly review. The shape is the
 * lesson. Most of it is small and most of it is daily.
 * ------------------------------------------------------------------------ */

export interface DaySlot {
  id: string;
  /** when in the day */
  when: string;
  /** the kind of practice that fits here */
  kind: Kind;
  /** an example, anchored to an existing routine */
  example: string;
}

export const DAY_SLOTS: DaySlot[] = [
  { id: 'morning', when: 'morning', kind: 'anchor', example: 'after coffee: three slow breaths' },
  { id: 'midday', when: 'midday', kind: 'reset', example: 'before lunch: one minute, come back' },
  { id: 'asneeded', when: 'as needed', kind: 'reset', example: 'a hot moment: name it, exhale long' },
  { id: 'evening', when: 'evening', kind: 'session', example: 'before bed: a five-minute sit' },
];

export interface WeekDay {
  id: string;
  /** two-letter day label */
  label: string;
  /** the daily anchor: every day */
  anchor: boolean;
  /** a longer session this day */
  session: boolean;
  /** the weekly review */
  review: boolean;
}

export const WEEK: WeekDay[] = [
  { id: 'mon', label: 'M', anchor: true, session: false, review: false },
  { id: 'tue', label: 'T', anchor: true, session: true, review: false },
  { id: 'wed', label: 'W', anchor: true, session: false, review: false },
  { id: 'thu', label: 'T', anchor: true, session: true, review: false },
  { id: 'fri', label: 'F', anchor: true, session: false, review: false },
  { id: 'sat', label: 'S', anchor: true, session: true, review: false },
  { id: 'sun', label: 'S', anchor: true, session: false, review: true },
];
