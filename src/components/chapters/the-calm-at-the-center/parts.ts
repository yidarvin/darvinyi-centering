import { c } from '@/styles/tokens';

/**
 * The inner system for the parts-mapper widget and the qualities-of-Self wheel.
 *
 * IFS keeps the secondary accents to their part meanings (see the design system):
 * teal is the Self (the calm center), amber the proactive managers, coral the
 * reactive firefighters, violet the exiles. The example system below is a faithful
 * sketch of how protectors organize around a single wounded exile, not a clinical
 * profile of any real person. No em dashes in any reader-facing string.
 */

export type Kind = 'self' | 'manager' | 'firefighter' | 'exile';

export interface KindStyle {
  col: string;
  fog: string;
  edge: string;
  label: string;
}

export const KIND: Record<Kind, KindStyle> = {
  self: { col: c.teal, fog: c.tealFog, edge: c.tealEdge, label: 'Self · the center' },
  manager: { col: c.amber, fog: c.amberFog, edge: c.amberEdge, label: 'manager · proactive' },
  firefighter: { col: c.coral, fog: c.coralFog, edge: c.coralEdge, label: 'firefighter · reactive' },
  exile: { col: c.violet, fog: c.violetFog, edge: c.violetEdge, label: 'exile · the wound' },
};

/** the eight qualities of Self, the "8 Cs", in Schwartz's wording and order */
export const QUALITIES_OF_SELF = [
  'calm',
  'curiosity',
  'clarity',
  'compassion',
  'confidence',
  'creativity',
  'courage',
  'connectedness',
] as const;

export interface Part {
  id: string;
  label: string;
  kind: Kind;
  /** node radius in the widget graph */
  r: number;
  /** what the part does, in plain language */
  role: string;
  /** how it sounds from the inside when you are blended with it */
  voice: string;
  /** what it is afraid would happen if it stopped */
  fear: string;
  /** the protective intent under the behavior */
  intent: string;
  /** the id of the exile this protector shields, or null for the exile itself */
  protects: string | null;
}

export const PARTS: Record<string, Part> = {
  self: {
    id: 'self',
    label: 'Self',
    kind: 'self',
    r: 30,
    role: 'Not a part. The calm seat you lead from when no part has taken the wheel.',
    voice: '',
    fear: '',
    intent: '',
    protects: null,
  },
  sentinel: {
    id: 'sentinel',
    label: 'the_sentinel',
    kind: 'manager',
    r: 23,
    role: 'Hypervigilant scanner. Runs "what if" loops to catch danger early.',
    voice: 'I am anxious. If I stop watching, something will blindside us.',
    fear: 'That a threat slips past and we are caught defenseless.',
    intent: 'Keep you safe by seeing it coming.',
    protects: 'notenough',
  },
  taskmaster: {
    id: 'taskmaster',
    label: 'the_taskmaster',
    kind: 'manager',
    r: 22,
    role: 'Perfectionist striver. Never quite enough.',
    voice: 'If the work is not flawless, we will be exposed.',
    fear: 'That falling short proves we are not enough.',
    intent: 'Earn safety and worth through achievement.',
    protects: 'notenough',
  },
  pleaser: {
    id: 'pleaser',
    label: 'the_pleaser',
    kind: 'manager',
    r: 22,
    role: "Reads the room and manages everyone's approval.",
    voice: 'Someone is upset with us. Fix it, now.',
    fear: 'That disconnection means abandonment.',
    intent: 'Keep you safe by keeping you liked.',
    protects: 'notenough',
  },
  scroller: {
    id: 'scroller',
    label: 'the_scroller',
    kind: 'firefighter',
    r: 22,
    role: 'Reactive numb-out: scroll, snack, binge, anything but feel.',
    voice: 'This is too much. Change the channel, fast.',
    fear: "That the exile's pain floods in and drowns us.",
    intent: 'Douse unbearable feeling the instant it breaks through.',
    protects: 'notenough',
  },
  notenough: {
    id: 'notenough',
    label: 'not_enough',
    kind: 'exile',
    r: 20,
    role: 'A young part carrying "I am not enough, and they will find out."',
    voice: '(quiet) I just do not want to be left behind.',
    fear: 'Being seen as worthless, and cast out.',
    intent: 'Holds the original wound the others organize around.',
    protects: null,
  },
};

export const PROTECTORS = ['sentinel', 'taskmaster', 'pleaser', 'scroller'] as const;

/** portrait-friendly radial layout for the widget graph (viewBox 0 0 480 524) */
export const RING: Record<string, { x: number; y: number }> = {
  self: { x: 240, y: 252 },
  sentinel: { x: 240, y: 96 },
  taskmaster: { x: 392, y: 206 },
  pleaser: { x: 88, y: 206 },
  scroller: { x: 360, y: 384 },
  notenough: { x: 188, y: 418 },
};

/** where the sentinel sits while blended: pulled onto the Self, obscuring it */
export const BLEND_POS = { x: 240, y: 240 };
