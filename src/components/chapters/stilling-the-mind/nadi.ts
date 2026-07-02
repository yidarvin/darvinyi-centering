/**
 * The timing and geometry for widget_09.2, the nāḍī śodhana pacer.
 *
 * One honest note carried into the chapter: nāḍī śodhana (alternate-nostril
 * breathing) is a haṭha-yoga technique from later texts like the Haṭha Yoga
 * Pradīpikā, not a method named in Patanjali, who defines prāṇāyāma generally as
 * the regulation of the in-breath and the out-breath (YS 2.49). The science of the
 * longer exhale and the vagal brake lives in Chapter 2 (The Settled Body); here the
 * point is only the felt rhythm of the alternation, kept gentle and safe.
 *
 * A round is four phases: inhale left, exhale right, inhale right, exhale left, so
 * you always breathe in one nostril and out the other, closing the off nostril with
 * a finger. We do not script breath retention (kumbhaka): the safe, defensible core
 * is slow, exhale-emphasized breathing, and retention raises the only real cautions.
 */

export type Nostril = 'left' | 'right';
export type PhaseKind = 'inhale' | 'exhale';

export interface NadiPattern {
  id: 'even' | 'extended';
  label: string;
  /** inhale seconds */
  in: number;
  /** exhale seconds */
  out: number;
  /** breaths per minute, for display */
  bpm: string;
  note: string;
}

export const NADI_PATTERNS: NadiPattern[] = [
  {
    id: 'even',
    label: 'even · 4–4',
    in: 4,
    out: 4,
    bpm: '~7.5 / min',
    note: 'Equal in and out, switching nostrils each breath. The simplest version, and the one to learn on. Balanced, steadying, no strain.',
  },
  {
    id: 'extended',
    label: 'extended exhale · 4–6',
    in: 4,
    out: 6,
    bpm: '~6 / min',
    note: 'The out-breath runs longer than the in-breath. A longer exhale leans on the body’s brake (the why is in The Settled Body). Settling, and still gentle.',
  },
];

export interface NadiPhase {
  kind: PhaseKind;
  /** the open nostril you breathe through; the other is held closed */
  nostril: Nostril;
  sec: number;
}

/** the four phases of one round: in left, out right, in right, out left */
export function roundPhases(p: NadiPattern): NadiPhase[] {
  return [
    { kind: 'inhale', nostril: 'left', sec: p.in },
    { kind: 'exhale', nostril: 'right', sec: p.out },
    { kind: 'inhale', nostril: 'right', sec: p.in },
    { kind: 'exhale', nostril: 'left', sec: p.out },
  ];
}

export const MIN_SCALE = 0.36;
export const MAX_SCALE = 1;

export interface NadiSegment extends NadiPhase {
  startT: number;
  endT: number;
}

export function buildRound(p: NadiPattern): { segments: NadiSegment[]; cycle: number } {
  const segments: NadiSegment[] = [];
  let t = 0;
  for (const ph of roundPhases(p)) {
    segments.push({ ...ph, startT: t, endT: t + ph.sec });
    t += ph.sec;
  }
  return { segments, cycle: t };
}

/** breath-like easing: slow at the turns, quicker through the middle */
function ease(x: number): number {
  return 0.5 * (1 - Math.cos(Math.PI * Math.min(1, Math.max(0, x))));
}

export interface NadiSample {
  segIndex: number;
  kind: PhaseKind;
  nostril: Nostril;
  /** the closed nostril */
  closed: Nostril;
  secondsLeft: number;
  /** orb scale, MIN_SCALE..MAX_SCALE */
  scale: number;
  /** progress through the current phase, 0..1 */
  progress: number;
}

export function sampleAt(segments: NadiSegment[], cycle: number, t: number, snap = false): NadiSample {
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
  if (seg.kind === 'inhale') {
    scale = snap ? MAX_SCALE : MIN_SCALE + (MAX_SCALE - MIN_SCALE) * ease(progress);
  } else {
    scale = snap ? MIN_SCALE : MIN_SCALE + (MAX_SCALE - MIN_SCALE) * ease(1 - progress);
  }

  const secondsLeft = Math.max(0, Math.ceil(seg.sec - within - 1e-6));

  return {
    segIndex,
    kind: seg.kind,
    nostril: seg.nostril,
    closed: seg.nostril === 'left' ? 'right' : 'left',
    secondsLeft,
    scale,
    progress: snap ? 0 : progress,
  };
}

export const PHASE_LABEL: Record<PhaseKind, string> = {
  inhale: 'breathe in',
  exhale: 'breathe out',
};

export function pattern(id: string): NadiPattern {
  return NADI_PATTERNS.find((p) => p.id === id) ?? NADI_PATTERNS[0];
}
