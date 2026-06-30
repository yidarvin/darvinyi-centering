import { c } from '@/styles/tokens';

/**
 * The breathing patterns and the shared geometry for widget_02.1 (the pacer) and
 * the breath-shape it draws. Timings are the verified, defensible values:
 *
 *   box           4-4-4-4 (inhale, hold, exhale, hold), 16 s cycle, 3.75 / min.
 *                 Tactical / combat breathing (Grossman, On Combat); sama vritti
 *                 before that. The equal hold on every side is the defining shape.
 *   four-seven-eight  inhale 4 (nose), hold 7, exhale 8 (mouth), 19 s cycle.
 *                 Andrew Weil's pattern, adapted from pranayama. The out-breath is
 *                 twice the in-breath, so it leans hard on the vagal brake. Weil is
 *                 explicit that the 4:7:8 ratio matters, not the absolute seconds;
 *                 1 count = 1 second is a sensible default for a pacer.
 *   coherent      inhale 5.5, exhale 5.5, no holds, ~10.9 s cycle, ~5.5 / min.
 *                 The resonance zone near 0.1 Hz, where the heart-rate wave grows
 *                 large and smooth. 5.5 / min is the common split between Elliott's
 *                 5 / min and the 6 / min of the resonance literature.
 *
 * The orb scale runs minScale..1: it expands on the inhale, holds, contracts on
 * the exhale. A hold carries the level it entered at (full after an inhale, small
 * after an exhale), which is why box has a wide top and a flat bottom.
 */

export type PhaseKind = 'inhale' | 'hold' | 'exhale';

export interface Phase {
  kind: PhaseKind;
  /** seconds this phase lasts */
  sec: number;
}

export interface Pattern {
  id: 'box' | 'four-seven-eight' | 'coherent';
  /** short human label */
  label: string;
  /** mono name shown in the read-out */
  name: string;
  /** breaths per minute, rounded for display */
  bpm: string;
  /** the one-line teaching note shown under the orb */
  note: string;
  phases: Phase[];
}

export const PATTERNS: Pattern[] = [
  {
    id: 'coherent',
    label: 'coherent',
    name: 'coherent_5.5',
    bpm: '~5.5 / min',
    note: 'Equal in and out, no holds, near five and a half breaths a minute. This is the resonance zone, where the heart-rate wave grows large and smooth. The gentlest of the three, and the one to start with.',
    phases: [
      { kind: 'inhale', sec: 5.5 },
      { kind: 'exhale', sec: 5.5 },
    ],
  },
  {
    id: 'box',
    label: 'box',
    name: 'box_4_4_4_4',
    bpm: '~3.75 / min',
    note: 'Four equal counts: in, hold, out, hold. It comes from tactical and military training, and from sama vritti before that. The two holds make it steadying and a little effortful.',
    phases: [
      { kind: 'inhale', sec: 4 },
      { kind: 'hold', sec: 4 },
      { kind: 'exhale', sec: 4 },
      { kind: 'hold', sec: 4 },
    ],
  },
  {
    id: 'four-seven-eight',
    label: '4-7-8',
    name: 'four_seven_eight',
    bpm: '~3.2 / min',
    note: 'A short in-breath, a long hold, a long out-breath. The exhale is twice the inhale, so it leans hard on the brake. Direct evidence for this exact pattern is thin. What works in it is the general effect of a slow, exhale-weighted breath.',
    phases: [
      { kind: 'inhale', sec: 4 },
      { kind: 'hold', sec: 7 },
      { kind: 'exhale', sec: 8 },
    ],
  },
];

export const MIN_SCALE = 0.34;
export const MAX_SCALE = 1;

export interface Segment {
  kind: PhaseKind;
  sec: number;
  startT: number;
  endT: number;
  fromScale: number;
  toScale: number;
}

/** precompute the timed segments of one cycle, with the scale each runs between */
export function buildSegments(p: Pattern): { segments: Segment[]; cycle: number } {
  const segments: Segment[] = [];
  let t = 0;
  // the level carried into a phase: inhale ends high, exhale ends low, hold carries
  let level = MIN_SCALE;
  for (const phase of p.phases) {
    const startT = t;
    const endT = t + phase.sec;
    let fromScale = level;
    let toScale = level;
    if (phase.kind === 'inhale') {
      fromScale = MIN_SCALE;
      toScale = MAX_SCALE;
    } else if (phase.kind === 'exhale') {
      fromScale = MAX_SCALE;
      toScale = MIN_SCALE;
    }
    // a hold keeps fromScale = toScale = level (the value it entered at)
    segments.push({ kind: phase.kind, sec: phase.sec, startT, endT, fromScale, toScale });
    level = toScale;
    t = endT;
  }
  return { segments, cycle: t };
}

/** breath-like easing: slow at the turns, quicker through the middle */
function ease(x: number): number {
  return 0.5 * (1 - Math.cos(Math.PI * Math.min(1, Math.max(0, x))));
}

export interface Sample {
  segIndex: number;
  kind: PhaseKind;
  /** whole seconds left in the current phase, for the countdown */
  secondsLeft: number;
  /** orb scale, minScale..1 */
  scale: number;
  /** position around the cycle, 0..1, for the ring marker */
  cyclePos: number;
  isExhale: boolean;
}

/**
 * Sample the pattern at elapsed time `t` (seconds). `snap` (reduced motion) holds
 * the orb at the phase's incoming target and quantizes the marker to whole seconds
 * so nothing animates continuously.
 */
export function sampleAt(
  segments: Segment[],
  cycle: number,
  t: number,
  snap = false,
): Sample {
  const posT = ((t % cycle) + cycle) % cycle;
  let segIndex = segments.length - 1;
  for (let i = 0; i < segments.length; i++) {
    if (posT < segments[i].endT) {
      segIndex = i;
      break;
    }
  }
  const seg = segments[segIndex];
  const within = posT - seg.startT;
  const progress = seg.sec > 0 ? within / seg.sec : 1;

  let scale: number;
  if (snap) {
    // hold the destination of the phase; no in-phase interpolation
    scale = seg.kind === 'hold' ? seg.fromScale : seg.toScale;
  } else if (seg.kind === 'inhale') {
    scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * ease(progress);
  } else if (seg.kind === 'exhale') {
    scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * ease(1 - progress);
  } else {
    scale = seg.fromScale;
  }

  const secondsLeft = Math.max(0, Math.ceil(seg.sec - within - 1e-6));
  const cyclePos = snap ? Math.floor(posT) / cycle : posT / cycle;

  return {
    segIndex,
    kind: seg.kind,
    secondsLeft,
    scale,
    cyclePos,
    isExhale: seg.kind === 'exhale',
  };
}

/** the breath-shape polyline for one cycle, sampled at N points (for the wave strip) */
export function waveSamples(segments: Segment[], cycle: number, n = 80): number[] {
  const out: number[] = [];
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * cycle;
    out.push(sampleAt(segments, cycle, t).scale);
  }
  return out;
}

export const PHASE_LABEL: Record<PhaseKind, string> = {
  inhale: 'breathe in',
  hold: 'hold',
  exhale: 'breathe out',
};

/** phase colors: the exhale is the teal accent, since that is where the brake engages */
export function phaseColor(kind: PhaseKind): string {
  if (kind === 'exhale') return c.teal;
  if (kind === 'inhale') return c.sky;
  return c.faint;
}
