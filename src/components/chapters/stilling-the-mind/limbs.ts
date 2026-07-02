import { c } from '@/styles/tokens';

/**
 * The eight limbs of yoga (aṣṭāṅga), Yoga Sutra 2.29, the single source of truth
 * for both the staircase figure (fig_09.2) and the explorer (widget_09.1) so the
 * two never drift. The order is Patanjali's; the grouping (outer conduct, the body
 * and senses, the inner core) is the standard one, with the deepening teal marking
 * the move from external to internal. The last three together are saṃyama (3.4).
 *
 * One honest note carried into the prose and the figure sub-line: the eight are
 * often drawn as a staircase, but Patanjali does not insist they be climbed strictly
 * in order. They support one another, and most people work several at once. The
 * ascent is a teaching shape, not a locked sequence.
 */

export type LimbGroup = 'outer' | 'body' | 'inner';

export interface Limb {
  /** 1..8, the order in YS 2.29 */
  n: number;
  /** the Sanskrit name, IAST */
  sanskrit: string;
  /** a short English name */
  name: string;
  /** the one-line gloss for the figure */
  gloss: string;
  /** the fuller note for the explorer */
  detail: string;
  /** which band of the climb */
  group: LimbGroup;
  /** the sub-list, for yama and niyama */
  sub?: { sanskrit: string; gloss: string }[];
  /** sutra reference */
  sutra: string;
  color: string;
  fill: string;
}

export const GROUPS: Record<LimbGroup, { label: string; note: string }> = {
  outer: { label: 'outer conduct', note: 'how you meet the world and yourself' },
  body: { label: 'the body and the senses', note: 'the bridge from outer to inner' },
  inner: { label: 'the inner core · saṃyama', note: 'concentration deepening into absorption' },
};

export const LIMBS: Limb[] = [
  {
    n: 1,
    sanskrit: 'yama',
    name: 'restraints',
    gloss: 'how you treat the world',
    detail:
      'Five restraints toward others. Patanjali calls them the great vow, binding regardless of place, time, or station. Calm has an ethical floor: a mind at war with its own conduct does not settle.',
    group: 'outer',
    sutra: 'YS 2.30',
    sub: [
      { sanskrit: 'ahiṃsā', gloss: 'non-harming' },
      { sanskrit: 'satya', gloss: 'truthfulness' },
      { sanskrit: 'asteya', gloss: 'not taking what is not yours' },
      { sanskrit: 'brahmacarya', gloss: 'moderation of the appetites' },
      { sanskrit: 'aparigraha', gloss: 'not grasping or hoarding' },
    ],
    color: c.amber,
    fill: c.amberFog,
  },
  {
    n: 2,
    sanskrit: 'niyama',
    name: 'observances',
    gloss: 'how you treat yourself',
    detail:
      'Five observances turned inward, the habits that keep the inner ground in order. Note santoṣa, contentment, sitting second in the list. The same enough that runs through this whole book.',
    group: 'outer',
    sutra: 'YS 2.32',
    sub: [
      { sanskrit: 'śauca', gloss: 'cleanliness, inner and outer' },
      { sanskrit: 'santoṣa', gloss: 'contentment' },
      { sanskrit: 'tapas', gloss: 'disciplined effort' },
      { sanskrit: 'svādhyāya', gloss: 'self-study, study of the texts' },
      { sanskrit: 'īśvara-praṇidhāna', gloss: 'surrender to the divine' },
    ],
    color: c.amber,
    fill: c.amberFog,
  },
  {
    n: 3,
    sanskrit: 'āsana',
    name: 'posture',
    gloss: 'a steady, easy seat',
    detail:
      'Patanjali’s whole definition of posture is two words: sthira-sukham, steady and comfortable (2.46). Āsana here is a seat for sitting still, not a workout. The vast vocabulary of modern postures came much later. The point is a body that can be forgotten so the mind can be watched.',
    group: 'body',
    sutra: 'YS 2.46',
    color: c.tealDim,
    fill: 'rgba(13,148,136,0.10)',
  },
  {
    n: 4,
    sanskrit: 'prāṇāyāma',
    name: 'breath',
    gloss: 'regulating the breath',
    detail:
      'Once the seat is steady, the regulation of the in-breath and the out-breath (2.49). Prāṇa is the life-breath; āyāma is its extension or restraint. The breath is the one autonomic process you can take the wheel of, and through it, the nervous system.',
    group: 'body',
    sutra: 'YS 2.49',
    color: c.tealDim,
    fill: 'rgba(13,148,136,0.10)',
  },
  {
    n: 5,
    sanskrit: 'pratyāhāra',
    name: 'withdrawal',
    gloss: 'the senses come home',
    detail:
      'The senses withdraw from their objects and follow the mind inward, the way bees follow the queen (a classic image). The pull of the world quiets, not by blocking the doors, but because attention has turned around. This is the hinge between the outer limbs and the inner ones.',
    group: 'body',
    sutra: 'YS 2.54',
    color: c.tealDim,
    fill: 'rgba(13,148,136,0.10)',
  },
  {
    n: 6,
    sanskrit: 'dhāraṇā',
    name: 'concentration',
    gloss: 'attention fixed on one point',
    detail:
      'Binding the mind to a single point: a breath, a flame, a word. The same rep every later chapter trains. The mind keeps slipping; you keep returning it. Concentration is what is left when you have returned it enough times.',
    group: 'inner',
    sutra: 'YS 3.1',
    color: c.teal,
    fill: 'rgba(45,212,191,0.10)',
  },
  {
    n: 7,
    sanskrit: 'dhyāna',
    name: 'meditation',
    gloss: 'attention that no longer breaks',
    detail:
      'When the returning is no longer needed and attention flows toward the object unbroken, concentration has become meditation. Not a different act, a deeper one. The effort of holding falls away.',
    group: 'inner',
    sutra: 'YS 3.2',
    color: c.teal,
    fill: 'rgba(45,212,191,0.13)',
  },
  {
    n: 8,
    sanskrit: 'samādhi',
    name: 'absorption',
    gloss: 'the watcher and the watched, one',
    detail:
      'Absorption so complete that the sense of a separate watcher drops away and only the object remains. This is the far end of the road, where the fluctuations have stilled and, in Patanjali’s words, the seer rests in its own nature.',
    group: 'inner',
    sutra: 'YS 3.3',
    color: c.teal,
    fill: 'rgba(45,212,191,0.16)',
  },
];

/** the five vṛttis, the fluctuations yoga sets out to still (named YS 1.6, defined 1.7–1.11) */
export const VRITTIS: { sanskrit: string; name: string; gloss: string }[] = [
  { sanskrit: 'pramāṇa', name: 'right knowledge', gloss: 'true perception, inference, testimony' },
  { sanskrit: 'viparyaya', name: 'error', gloss: 'seeing what is not there, the false read' },
  { sanskrit: 'vikalpa', name: 'imagination', gloss: 'words and concepts with nothing behind them' },
  { sanskrit: 'nidrā', name: 'sleep', gloss: 'the blank of dreamless sleep' },
  { sanskrit: 'smṛti', name: 'memory', gloss: 'the past replaying, uninvited' },
];
