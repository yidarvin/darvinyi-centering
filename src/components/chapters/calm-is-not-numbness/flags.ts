import { c } from '@/styles/tokens';

/**
 * The data behind widget_18.1, the self-check. Two separate instruments, kept
 * apart on purpose:
 *
 *  1. "settling or avoiding": a handful of honest questions that sort a calm you
 *     have been leaning on toward equanimity or toward one of its counterfeits.
 *     This is reflection, not measurement. The read-out is a mirror, never a score.
 *
 *  2. the flags: green, yellow, and red signposts for whether a practice is a
 *     fair place to start or whether it is time to bring in a professional. The
 *     tiers are synthesized from NIMH, WHO, and NHS public-health guidance and the
 *     Mental Health First Aid action plan. They are signposts, not a diagnosis,
 *     and the widget and prose both say so. A red flag surfaces crisis resources
 *     immediately.
 */

export type Lean = 'settling' | 'mixed' | 'avoiding';

export interface CheckQuestion {
  id: string;
  prompt: string;
  /** the two poles, shown as the settling and avoiding options */
  settling: string;
  avoiding: string;
}

export const CHECK_QUESTIONS: CheckQuestion[] = [
  {
    id: 'q-feel',
    prompt: 'When a hard feeling shows up, my practice mostly helps me…',
    settling: 'feel it and stay with it until it moves',
    avoiding: 'not feel it, or make it go quiet fast',
  },
  {
    id: 'q-after',
    prompt: 'After I practice, I am more able to…',
    settling: 'turn back toward the thing and act',
    avoiding: 'put the thing off a little longer',
  },
  {
    id: 'q-closer',
    prompt: 'The calm I reach tends to leave me…',
    settling: 'closer to the people and work I care about',
    avoiding: 'further away, behind a kind of wall',
  },
  {
    id: 'q-itsfine',
    prompt: 'When I say "it\'s fine" or "I\'ve let that go," it is usually…',
    settling: 'true, the feeling has actually been met',
    avoiding: 'a way to end it before I have to feel it',
  },
  {
    id: 'q-avoid',
    prompt: 'Is there something I have been using calm, acceptance, or "staying positive" to avoid dealing with?',
    settling: 'no, I tend to face what is mine to face',
    avoiding: 'yes, if I am honest, there is',
  },
];

export interface FlagTier {
  id: 'green' | 'yellow' | 'red';
  label: string;
  headline: string;
  color: string;
  fog: string;
  edge: string;
  signposts: string[];
}

const EMERALD = c.emerald;
const EMERALD_FOG = 'rgba(52,211,153,0.10)';
const EMERALD_EDGE = 'rgba(52,211,153,0.42)';

export const FLAG_TIERS: FlagTier[] = [
  {
    id: 'green',
    label: 'green',
    headline: 'A practice is a fair place to start.',
    color: EMERALD,
    fog: EMERALD_FOG,
    edge: EMERALD_EDGE,
    signposts: [
      'The stress comes and goes, and it moves when you rest, move, or talk to someone.',
      'You can still work, connect, and take some pleasure in ordinary things.',
      'The hard days are hard, but they pass.',
    ],
  },
  {
    id: 'yellow',
    label: 'yellow',
    headline: 'Worth talking to someone.',
    color: c.amber,
    fog: c.amberFog,
    edge: c.amberEdge,
    signposts: [
      'Low mood or anxiety most of the day, nearly every day, for two weeks or more.',
      'Sleep or appetite has clearly changed, up or down.',
      'You have pulled away from people, or lost interest in what you used to enjoy.',
      'You are leaning on alcohol, food, or something else to get through.',
      'The distress is not shifting, and work or relationships are starting to slip.',
    ],
  },
  {
    id: 'red',
    label: 'red',
    headline: 'Reach out now. Do not wait.',
    color: c.coral,
    fog: c.coralFog,
    edge: c.coralEdge,
    signposts: [
      'Thoughts of suicide or self-harm, or that you have no reason to be here.',
      'Thoughts of harming someone else.',
      'You cannot keep yourself, or someone in your care, safe.',
      'You are losing contact with what is real: hearing or seeing things others do not, or fears that will not budge.',
    ],
  },
];

export function tierOf(id: FlagTier['id']): FlagTier {
  const t = FLAG_TIERS.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown flag tier: ${id}`);
  return t;
}
