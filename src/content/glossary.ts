/**
 * The book's glossary: terms harvested from their first substantive
 * definition in the prose, each pointing back to the section (item 29's
 * anchors) where it is actually explained. Kept to the terms a reader would
 * plausibly want defined, technical or foreign vocabulary the traditions use
 * on their own terms, not every italicized word.
 */

export type Tradition =
  | 'Stoicism'
  | 'Epicureanism'
  | 'Buddhism'
  | 'Zen'
  | 'Taoism'
  | 'Yoga'
  | 'The Clinical Methods'
  | 'The Contemplative Religions'
  | 'The Transcendentalists'
  | 'Design Vocabulary';

export interface GlossaryEntry {
  term: string;
  aliases?: string[];
  oneLineDef: string;
  tradition: Tradition;
  homeSlug: string;
  /** the section anchor where the term is actually defined, or null if it appears before the chapter's first section */
  anchor: string | null;
}

export const GLOSSARY: GlossaryEntry[] = [
  // Stoicism · tranquility-by-judgment
  {
    term: 'telos',
    oneLineDef:
      'The end or goal a life aims at. For the Stoics, virtue itself, with tranquility as a byproduct, not the target.',
    tradition: 'Stoicism',
    homeSlug: 'tranquility-by-judgment',
    anchor: null,
  },
  {
    term: 'phantasia',
    aliases: ['impression'],
    oneLineDef: 'The initial impression an event makes on the mind, before any judgment is added to it.',
    tradition: 'Stoicism',
    homeSlug: 'tranquility-by-judgment',
    anchor: 'not-the-event-the-judgment',
  },
  {
    term: 'apatheia',
    oneLineDef:
      'Freedom from the passions, the disturbances of excessive desire, fear, grief, and pleasure. Not an absence of feeling, but the absence of tumultuous feeling.',
    tradition: 'Stoicism',
    homeSlug: 'tranquility-by-judgment',
    anchor: 'what-tranquility-is-and-is-not',
  },
  {
    term: 'adiaphora',
    aliases: ['adiaphoron'],
    oneLineDef:
      'Things outside your own judgments and choices, health, money, reputation, that are neither good nor evil, only reasonably preferred or avoided.',
    tradition: 'Stoicism',
    homeSlug: 'tranquility-by-judgment',
    anchor: 'what-tranquility-is-and-is-not',
  },
  {
    term: 'premeditatio malorum',
    oneLineDef: 'The premeditation of adversity: deliberately imagining a loss in advance so it cannot ambush you.',
    tradition: 'Stoicism',
    homeSlug: 'tranquility-by-judgment',
    anchor: 'rehearse-the-loss',
  },

  // Epicureanism · enough-and-no-fear
  {
    term: 'ataraxia',
    oneLineDef: 'An untroubled mind, free of disturbance. For Epicurus, the summit of a pleasant life.',
    tradition: 'Epicureanism',
    homeSlug: 'enough-and-no-fear',
    anchor: 'what-pleasure-actually-is',
  },
  {
    term: 'aponia',
    oneLineDef: "Freedom from bodily pain, the other half of Epicurus's idea of pleasure alongside ataraxia.",
    tradition: 'Epicureanism',
    homeSlug: 'enough-and-no-fear',
    anchor: 'what-pleasure-actually-is',
  },
  {
    term: 'autarkeia',
    oneLineDef: 'Self-sufficiency: wanting little enough that what you already have is enough.',
    tradition: 'Epicureanism',
    homeSlug: 'enough-and-no-fear',
    anchor: 'enough-and-easy-to-reach',
  },
  {
    term: 'tetrapharmakos',
    aliases: ['the fourfold cure'],
    oneLineDef:
      "Epicurus's four-line summary of the whole philosophy: don't fear god, don't worry about death, what is good is easy to get, what is terrible is easy to endure.",
    tradition: 'Epicureanism',
    homeSlug: 'enough-and-no-fear',
    anchor: 'the-fourfold-cure',
  },

  // Buddhism · calm-abiding
  {
    term: 'vedanā',
    aliases: ['vedana'],
    oneLineDef: 'The raw felt tone of an experience, pleasant, painful, or neutral, that arrives before any reaction is added.',
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'the-second-arrow',
  },
  {
    term: 'samatha',
    aliases: ['calm abiding'],
    oneLineDef: 'The cultivation of a mind that can rest, steady and unhurried, on one thing.',
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'calm-abiding',
  },
  {
    term: 'vipassanā',
    aliases: ['vipassana', 'insight'],
    oneLineDef: "Insight: the clear seeing of how experience actually behaves, samatha's partner practice.",
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'calm-abiding',
  },
  {
    term: 'jhāna',
    aliases: ['jhanas', 'jhānas'],
    oneLineDef:
      'A series of progressively deeper states of meditative concentration, each shedding a coarser mental factor.',
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'calm-abiding',
  },
  {
    term: 'anicca',
    oneLineDef: 'Impermanence: the first of the three marks, the fact that nothing conditioned stays.',
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'three-marks',
  },
  {
    term: 'dukkha',
    oneLineDef:
      'Usually translated suffering, closer to unsatisfactoriness: the way conditioned things cannot finally hold the weight we put on them.',
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'three-marks',
  },
  {
    term: 'anatta',
    aliases: ['not-self'],
    oneLineDef:
      'Not-self: the observation that no part of what you call yourself is reliably under your command or lasting, not a flat claim that there is no you.',
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'three-marks',
  },
  {
    term: 'upekkhā',
    aliases: ['upekkha'],
    oneLineDef:
      'Equanimity: the still quality that remains once the second arrow is set down, distinct from both indifference and numbness.',
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'the-trained-heart',
  },
  {
    term: 'mettā',
    aliases: ['metta'],
    oneLineDef: 'Lovingkindness: a deliberate, cultivated, unconditional good will, widened until it leaves no one out.',
    tradition: 'Buddhism',
    homeSlug: 'calm-abiding',
    anchor: 'the-boundless-heart',
  },

  // Zen · the-ordinary-mind
  {
    term: 'shikantaza',
    aliases: ['just sitting'],
    oneLineDef: 'Just sitting: a Soto Zen practice of sitting with no object of focus and nothing to attain.',
    tradition: 'Zen',
    homeSlug: 'the-ordinary-mind',
    anchor: 'just-sitting',
  },
  {
    term: 'mushin',
    aliases: ['no-mind'],
    oneLineDef: 'No-mind: a state of acting without the interference of a separate, deliberating self.',
    tradition: 'Zen',
    homeSlug: 'the-ordinary-mind',
    anchor: 'just-sitting',
  },
  {
    term: 'kōan',
    aliases: ['koan'],
    oneLineDef:
      'A paradoxical question or story used in Rinzai Zen to exhaust conceptual thinking and provoke direct insight.',
    tradition: 'Zen',
    homeSlug: 'the-ordinary-mind',
    anchor: 'just-sitting',
  },
  {
    term: 'shoshin',
    aliases: ["beginner's mind"],
    oneLineDef: "Beginner's mind: approaching something familiar as though encountering it for the first time.",
    tradition: 'Zen',
    homeSlug: 'the-ordinary-mind',
    anchor: 'beginners-mind',
  },
  {
    term: 'ma',
    aliases: ['間'],
    oneLineDef:
      'The charged, meaningful interval, in space or time: the gap that gives what surrounds it its shape.',
    tradition: 'Zen',
    homeSlug: 'the-ordinary-mind',
    anchor: 'space-and-the-imperfect-circle',
  },

  // Taoism · the-watercourse-way
  {
    term: 'wu wei',
    oneLineDef: 'Non-forcing, effortless action: not the absence of action but the absence of strain.',
    tradition: 'Taoism',
    homeSlug: 'the-watercourse-way',
    anchor: 'wu-wei-or-effort-without-strain',
  },
  {
    term: 'ziran',
    aliases: ['self-so'],
    oneLineDef: 'Self-so: the naturalness of a thing simply following its own grain, with no separate self straining against it.',
    tradition: 'Taoism',
    homeSlug: 'the-watercourse-way',
    anchor: 'wu-wei-or-effort-without-strain',
  },

  // Yoga · stilling-the-mind
  {
    term: 'citta',
    oneLineDef: 'The mind, taken broadly: the intellect, the ego, the part that processes what the senses bring in.',
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: null,
  },
  {
    term: 'vṛtti',
    oneLineDef: 'A turning, a ripple: any movement that passes across the mind.',
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: null,
  },
  {
    term: 'nirodha',
    oneLineDef: "A settling, a quieting: the calming of the mind's churn, not its destruction.",
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: null,
  },
  {
    term: 'abhyāsa',
    oneLineDef: 'Practice: steady, repeated, patient effort kept up over a long time, the doing side of yoga.',
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: 'two-wings-practice-and-letting-go',
  },
  {
    term: 'vairāgya',
    oneLineDef: "Non-attachment: loosening the grip of craving and releasing your claim on how things turn out, abhyāsa's paired opposite.",
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: 'two-wings-practice-and-letting-go',
  },
  {
    term: 'aṣṭāṅga',
    aliases: ['the eight limbs'],
    oneLineDef:
      "The eight limbs of Patañjali's path, from ethical conduct through posture, breath, and concentration to absorption.",
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: 'the-eight-limbs',
  },
  {
    term: 'prāṇāyāma',
    oneLineDef: 'The regulation of the breath, one of the eight limbs.',
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: 'the-eight-limbs',
  },
  {
    term: 'samādhi',
    oneLineDef: 'Absorption so complete that the sense of a separate watcher drops away; the eighth limb.',
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: 'the-eight-limbs',
  },
  {
    term: 'kaivalya',
    oneLineDef:
      "Aloneness: the seer resting in its own nature once even the subtlest fluctuation has stilled, Patañjali's final goal, one step past samadhi.",
    tradition: 'Yoga',
    homeSlug: 'stilling-the-mind',
    anchor: 'the-eight-limbs',
  },

  // The Clinical Methods · the-engineering-of-calm
  {
    term: 'defusion',
    aliases: ['cognitive defusion'],
    oneLineDef:
      'Changing your relationship to a thought so it carries less weight, without touching its content or arguing about whether it is true.',
    tradition: 'The Clinical Methods',
    homeSlug: 'the-engineering-of-calm',
    anchor: 'or-just-unhook-from-it',
  },

  // The Contemplative Religions · stillness-and-surrender
  {
    term: 'hesychia',
    oneLineDef:
      'A Greek word for stillness: not an empty room but a settled, attentive, present inner quiet, the goal of the hesychast tradition.',
    tradition: 'The Contemplative Religions',
    homeSlug: 'stillness-and-surrender',
    anchor: 'the-prayer-of-the-heart',
  },
  {
    term: 'dhikr',
    aliases: ['remembrance'],
    oneLineDef: 'Remembrance: the Sufi practice of repeating a name or phrase of God.',
    tradition: 'The Contemplative Religions',
    homeSlug: 'stillness-and-surrender',
    anchor: 'remembrance',
  },
  {
    term: 'sakina',
    oneLineDef:
      "A tranquility that, the Qur'an says, God sends down into the hearts of believers. Not generated by striving, but given.",
    tradition: 'The Contemplative Religions',
    homeSlug: 'stillness-and-surrender',
    anchor: 'remembrance',
  },
  {
    term: 'menuchat hanefesh',
    aliases: ['rest of the soul'],
    oneLineDef:
      "Rest of the soul: a Mussar virtue, a settled center that meets the day's ups and downs without being thrown by them.",
    tradition: 'The Contemplative Religions',
    homeSlug: 'stillness-and-surrender',
    anchor: 'rest-you-do-not-have-to-earn',
  },
  {
    term: 'hishtavut',
    oneLineDef:
      'Equanimity understood as a genuine indifference to praise and blame, from the Kabbalistic and Hasidic literature.',
    tradition: 'The Contemplative Religions',
    homeSlug: 'stillness-and-surrender',
    anchor: 'rest-you-do-not-have-to-earn',
  },
  {
    term: 'hitbodedut',
    oneLineDef: 'Secluded, spontaneous prayer, spoken aloud in your own words, as taught by Rebbe Nachman of Breslov.',
    tradition: 'The Contemplative Religions',
    homeSlug: 'stillness-and-surrender',
    anchor: 'rest-you-do-not-have-to-earn',
  },

  // The Transcendentalists · nature-and-simplicity
  {
    term: 'fascination',
    aliases: ['soft fascination', 'hard fascination'],
    oneLineDef:
      'In Attention Restoration Theory, what catches attention without effort. Soft fascination (clouds, water, light) rests the effortful faculty; hard fascination (a fight, a screen) does not.',
    tradition: 'The Transcendentalists',
    homeSlug: 'nature-and-simplicity',
    anchor: 'what-the-woods-actually-do',
  },
  {
    term: 'forest bathing',
    aliases: ['shinrin-yoku'],
    oneLineDef: "The Japanese practice of slow, sensory time among trees, named by the country's forestry agency in 1982.",
    tradition: 'The Transcendentalists',
    homeSlug: 'nature-and-simplicity',
    anchor: 'what-the-woods-actually-do',
  },

  // Design Vocabulary · designing-for-calm
  {
    term: 'lagom',
    oneLineDef: 'A Swedish word meaning just the right amount, not too much and not too little.',
    tradition: 'Design Vocabulary',
    homeSlug: 'designing-for-calm',
    anchor: 'the-words-for-it',
  },
  {
    term: 'hygge',
    oneLineDef: 'A Danish word for warm, sensory, social coziness. Not moderation, atmosphere.',
    tradition: 'Design Vocabulary',
    homeSlug: 'designing-for-calm',
    anchor: 'the-words-for-it',
  },
  {
    term: 'niksen',
    oneLineDef: 'A Dutch verb meaning to do nothing, to loaf, lifted lately into the idea of doing nothing on purpose.',
    tradition: 'Design Vocabulary',
    homeSlug: 'designing-for-calm',
    anchor: 'the-words-for-it',
  },
  {
    term: 'wabi-sabi',
    oneLineDef: 'The Japanese acceptance of things imperfect, worn, and passing.',
    tradition: 'Design Vocabulary',
    homeSlug: 'designing-for-calm',
    anchor: 'the-words-for-it',
  },
  {
    term: 'fika',
    oneLineDef: 'A Swedish coffee pause taken with someone else, a break made into a small shared ritual.',
    tradition: 'Design Vocabulary',
    homeSlug: 'designing-for-calm',
    anchor: 'the-words-for-it',
  },
];
