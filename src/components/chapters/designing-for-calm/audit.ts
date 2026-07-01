import { c } from '@/styles/tokens';
import type { RouteId } from '@/content/routes';

/**
 * The data behind widget_17.1, the calm-environment audit. Three domains, space,
 * time, and attention, each with a short set of common disturbers phrased as
 * statements the reader can mark true of their own life. Each disturber carries a
 * single targeted subtraction (the fix) and the route it serves, so the summary
 * can light the routes a reader's changes would lean on. The whole design argues
 * for subtraction and for one change at a time: the reader audits, sees the fixes,
 * then commits to a single default.
 */

export interface AuditItem {
  id: string;
  /** the disturber, phrased as a statement true of the reader's environment */
  statement: string;
  /** a short handle for the default, used on the design-one-default chips */
  short: string;
  /** the one small subtraction that flips the default */
  fix: string;
  route: RouteId;
}

export interface Domain {
  id: 'space' | 'time' | 'attention';
  label: string;
  gloss: string;
  /** the chapter-semantic accent for this domain */
  color: string;
  items: AuditItem[];
}

export const DOMAINS: Domain[] = [
  {
    id: 'space',
    label: 'your space',
    gloss: 'light, sound, clutter, green',
    color: c.coral,
    items: [
      {
        id: 's-light',
        statement:
          'After dark I sit under bright overhead light, and a screen is the last thing I see before sleep.',
        short: 'evening light',
        fix: 'After sunset, switch to one warm, low lamp. Dim screens or set them down for the last half hour, so your body gets the dark it reads as night.',
        route: 'the-body',
      },
      {
        id: 's-noise',
        statement: 'There is background noise I did not choose, and nowhere reliably quiet.',
        short: 'a quiet slot',
        fix: 'Make one quiet slot, or one quiet corner. Block what you can with a door, earplugs, or a steady fan, or trade the noise you cannot control for water or birdsong.',
        route: 'the-body',
      },
      {
        id: 's-clutter',
        statement: 'Flat surfaces collect things, and the room feels visually loud.',
        short: 'clear one surface',
        fix: 'Clear one surface and keep it clear. A short reset at the same time each day holds it. You are not tidying the house, you are lowering the noise in one place you look at often.',
        route: 'enough',
      },
      {
        id: 's-green',
        statement: 'Nothing living or natural is in view where I spend most of the day.',
        short: 'something green',
        fix: 'Put one plant, or a view of something green, where you actually sit. The effect is small and cheap, and it works on you all day without asking anything.',
        route: 'the-body',
      },
    ],
  },
  {
    id: 'time',
    label: 'your time',
    gloss: 'margin, a clear off, idleness',
    color: c.amber,
    items: [
      {
        id: 't-margin',
        statement: 'My days are booked wall to wall, one thing straight into the next, no gaps.',
        short: 'a 15-minute buffer',
        fix: 'Leave one gap on purpose. A fifteen-minute buffer between blocks is not wasted time, it is the slack that absorbs the overrun instead of passing it down the day.',
        route: 'enough',
      },
      {
        id: 't-off',
        statement: 'Work bleeds into all hours. There is no clear line where the day ends.',
        short: 'a hard stop',
        fix: 'Set a hard stop, and a short wind-down that marks it. The day needs an edge, or it never actually ends and never actually rests.',
        route: 'enough',
      },
      {
        id: 't-transitions',
        statement: 'I move from one task to the next with no pause between them.',
        short: 'a pause between tasks',
        fix: 'Put a sixty-second reset between things: a few slow breaths, a look out the window. It lets the last task close so it stops leaking into the next one.',
        route: 'presence',
      },
      {
        id: 't-idle',
        statement: 'I fill every empty moment. I am never just doing nothing.',
        short: 'idle on purpose',
        fix: 'Leave one stretch of deliberate nothing, and do not reach for a screen to fill it. Idle on purpose. The Dutch have a plain word for it, niksen.',
        route: 'presence',
      },
    ],
  },
  {
    id: 'attention',
    label: 'your attention',
    gloss: 'notifications, feeds, the phone',
    color: c.violet,
    items: [
      {
        id: 'a-notif',
        statement: 'Most of my apps can buzz or badge me whenever they want.',
        short: 'notifications off',
        fix: 'Turn off every notification that is not a person. Let people reach you, and let the feeds wait until you go to them. This is the single change with the most reach.',
        route: 'presence',
      },
      {
        id: 'a-reach',
        statement: 'My phone is always within arm’s reach, face up on the desk.',
        short: 'phone out of reach',
        fix: 'Park it in another room, or a drawer, during focused work. Its mere presence pulls a little of your attention even when it is dark and silent, so move it out of reach.',
        route: 'presence',
      },
      {
        id: 'a-friction',
        statement: 'The feeds are one tap away, with autoplay and endless scroll on.',
        short: 'friction on the feeds',
        fix: 'Add friction to the thing you want less of. Log out, kill autoplay, or take the app off the home screen, so opening it becomes a choice rather than a reflex.',
        route: 'enough',
      },
      {
        id: 'a-screens',
        statement: 'I usually have a second screen going alongside the first.',
        short: 'one screen',
        fix: 'One screen at a time. Give the thing in front of you your whole attention, and let the show be a show and the meal be a meal.',
        route: 'presence',
      },
    ],
  },
];

export const ALL_ITEMS: AuditItem[] = DOMAINS.flatMap((d) => d.items);

export function getItem(id: string): AuditItem | undefined {
  return ALL_ITEMS.find((i) => i.id === id);
}

export function domainOf(itemId: string): Domain | undefined {
  return DOMAINS.find((d) => d.items.some((i) => i.id === itemId));
}
