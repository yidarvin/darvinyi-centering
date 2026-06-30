import { c } from '@/styles/tokens';

/**
 * The calm map, shared by fig_01.1a and widget_01.1.
 *
 * Two axes, both honest. Arousal is a real dimension of affect from Russell's
 * circumplex: how activated the body is, low to high. Engagement is the second
 * axis this chapter cares about: whether you are in contact with your actual
 * present experience, or pulled out of it. The standard circumplex pairs arousal
 * with valence (pleasant/unpleasant). We swap valence for engagement on purpose,
 * because the question that separates real calm from its counterfeits is not
 * "does this feel good" but "are you still here." That substitution is an
 * adaptation, not Russell's original model, and the prose says so.
 *
 * The four quadrants:
 *   high arousal + disengaged  → agitation   (the loud counterfeit)
 *   high arousal + engaged     → flow        (activation without friction)
 *   low arousal  + disengaged  → sedation    (the quiet counterfeit: numbness)
 *   low arousal  + engaged     → equanimity  (the calm the book trains toward)
 *
 * The two counterfeits share a column (disengaged, on the left). Equanimity and
 * sedation share a row (low arousal, at the bottom): same settled body, and the
 * only thing that tells them apart is engagement. That is the whole chapter.
 */

export type QuadId = 'agitation' | 'flow' | 'sedation' | 'equanimity';

export interface Quad {
  id: QuadId;
  /** the short label shown on the map */
  label: string;
  /** the mono tag form */
  tag: string;
  color: string;
  fog: string;
  edge: string;
  /** the honest read-out: what this state actually is */
  read: string;
}

const SLATE = '#7c8794';
const SLATE_FOG = 'rgba(124,135,148,0.10)';
const SLATE_EDGE = 'rgba(124,135,148,0.42)';

export const QUADS: Record<QuadId, Quad> = {
  agitation: {
    id: 'agitation',
    label: 'agitation',
    tag: 'agitation',
    color: c.coral,
    fog: c.coralFog,
    edge: c.coralEdge,
    read: 'Activated and scattered. The alarm is on, and attention has left the room for some rehearsed future. This is the loud counterfeit of being engaged: a lot of energy, very little contact.',
  },
  flow: {
    id: 'flow',
    label: 'flow',
    tag: 'flow',
    color: c.amber,
    fog: c.amberFog,
    edge: c.amberEdge,
    read: 'Activated and fully absorbed. High energy, but no friction, because you and what you are doing have become one thing. Not calm exactly. A close cousin of it: engaged, ordered, and unworried.',
  },
  sedation: {
    id: 'sedation',
    label: 'sedation',
    tag: 'sedation',
    color: SLATE,
    fog: SLATE_FOG,
    edge: SLATE_EDGE,
    read: 'Settled, but checked out. The body is quiet because you have gone somewhere else: numb, flat, shut down, going through the motions. It can pass for calm in a photograph. It is not the calm worth having.',
  },
  equanimity: {
    id: 'equanimity',
    label: 'equanimity',
    tag: 'equanimity',
    color: c.teal,
    fog: c.tealFog,
    edge: c.tealEdge,
    read: 'Settled and still here. Low activation, full contact with your life. The trouble may not have gone anywhere, but you can meet it. This is the calm the rest of the book is about.',
  },
};

/** engagement and arousal each run 0..1; returns the quadrant they fall in */
export function quadAt(engagement: number, arousal: number): Quad {
  const engaged = engagement >= 0.5;
  const high = arousal >= 0.5;
  if (high) return engaged ? QUADS.flow : QUADS.agitation;
  return engaged ? QUADS.equanimity : QUADS.sedation;
}

/** the line that names the chapter's spine, shown when a state lands in the low-arousal row */
export const LOW_ROW_NOTE =
  'Notice where this sits. Equanimity and numbness share the bottom row: same quiet body, same low arousal. The only thing that tells them apart is whether you are still in contact with your life. That single difference is the whole chapter.';

/** plot geometry for the SVG map, shared so the figure and widget align exactly */
export const MAP = {
  vbW: 320,
  vbH: 300,
  x0: 44, // left edge of the plot area
  x1: 304, // right edge
  y0: 18, // top edge (high arousal)
  y1: 244, // bottom edge (low arousal)
} as const;

/** engagement 0..1 → svg x */
export function ex(engagement: number): number {
  return MAP.x0 + engagement * (MAP.x1 - MAP.x0);
}
/** arousal 0..1 → svg y (inverted: high arousal at the top) */
export function ay(arousal: number): number {
  return MAP.y1 - arousal * (MAP.y1 - MAP.y0);
}
/** svg x → engagement 0..1 (clamped) */
export function xe(x: number): number {
  return Math.min(1, Math.max(0, (x - MAP.x0) / (MAP.x1 - MAP.x0)));
}
/** svg y → arousal 0..1 (clamped) */
export function ya(y: number): number {
  return Math.min(1, Math.max(0, (MAP.y1 - y) / (MAP.y1 - MAP.y0)));
}
