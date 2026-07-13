/**
 * Proper names and mechanisms that round out the A-Z index alongside the
 * glossary (src/content/glossary.ts): people and named concepts, rather than
 * the traditions' own vocabulary. Same shape as a glossary entry, kept
 * separate since these aren't terms a chapter's prose italicizes.
 */

export interface NamedEntry {
  name: string;
  aliases?: string[];
  oneLineDef: string;
  homeSlug: string;
  anchor: string | null;
}

export const NAMED_ENTRIES: NamedEntry[] = [
  {
    name: 'Epictetus',
    oneLineDef: 'Stoic teacher born a slave, whose student\'s notes (the Enchiridion) open with the dichotomy of control.',
    homeSlug: 'tranquility-by-judgment',
    anchor: null,
  },
  {
    name: 'Marcus Aurelius',
    oneLineDef: "Roman emperor whose private notebook, the Meditations, is the source of the Stoic view from above.",
    homeSlug: 'tranquility-by-judgment',
    anchor: 'the-view-from-above',
  },
  {
    name: 'Epicurus',
    oneLineDef: 'Founder of the garden school in Athens that made pleasure, carefully redefined, the aim of a philosophic life.',
    homeSlug: 'enough-and-no-fear',
    anchor: null,
  },
  {
    name: 'Henry David Thoreau',
    oneLineDef: "Author of Walden, who went to the woods to live deliberately and pared his wants down to a short list.",
    homeSlug: 'nature-and-simplicity',
    anchor: null,
  },
  {
    name: 'Ralph Waldo Emerson',
    oneLineDef: "Thoreau's mentor and the center of the Transcendentalist circle; owned the Walden land.",
    homeSlug: 'nature-and-simplicity',
    anchor: null,
  },
  {
    name: 'vagus nerve',
    oneLineDef: "The long nerve whose outgoing fibers carry the brake to the heart, cleared fast enough to ease off on one beat and clamp down on the next.",
    homeSlug: 'the-settled-body',
    anchor: 'the-two-controls',
  },
  {
    name: 'respiratory sinus arrhythmia',
    oneLineDef: 'The heart speeding up a little on the inhale and slowing on the exhale, as the brainstem eases and reapplies the vagal brake.',
    homeSlug: 'the-settled-body',
    anchor: 'the-brake-runs-on-the-breath',
  },
  {
    name: 'Herbert Benson',
    aliases: ['the relaxation response'],
    oneLineDef: 'Harvard cardiologist who named the relaxation response and showed it could be brought on with a repeated focus and a passive return to it.',
    homeSlug: 'the-settled-body',
    anchor: 'the-loop-you-are-turning',
  },
  {
    name: 'default mode network',
    oneLineDef: "The brain network active during mind-wandering, remembering, planning, and imagining other minds; not a bad network, just one that can run unnoticed.",
    homeSlug: 'the-quiet-mind',
    anchor: 'the-default-is-drift',
  },
  {
    name: 'Marsha Linehan',
    aliases: ['wise mind', 'DBT'],
    oneLineDef: 'Built dialectical behavior therapy after straight CBT failed her most severe patients; wise mind is her name for the integration beneath reason and emotion.',
    homeSlug: 'the-engineering-of-calm',
    anchor: 'wise-mind',
  },
  {
    name: 'Steven Hayes',
    aliases: ['experiential avoidance'],
    oneLineDef: 'Named experiential avoidance, the effort to escape unwanted inner experience even when it costs you, as a process running across many disorders.',
    homeSlug: 'calm-is-not-numbness',
    anchor: 'the-quiet-exit',
  },
  {
    name: 'Richard Schwartz',
    oneLineDef: 'Family therapist who built Internal Family Systems after noticing clients describing themselves in the plural.',
    homeSlug: 'the-calm-at-the-center',
    anchor: 'you-are-a-crowd',
  },
];
