import { c } from '@/styles/tokens';

/**
 * The four contemplative methods surveyed in Ch 12, the single source of truth for
 * both the side-by-side figure (fig_12.3) and the methods explorer (widget_12.1) so
 * the two never drift. Four methods across three faiths: two Christian (Orthodox
 * hesychasm and Western Centering Prayer), one Muslim (Sufi dhikr), one Jewish
 * (Shabbat, equanimity, hitbodedut).
 *
 * Each entry carries a SHORT form (for the figure) and a LONG form (for the
 * explorer), plus the part the chapter is most careful about: what a secular reader
 * can honestly take, and where the practice stays irreducibly devotional. The
 * research is faithful to each tradition on its own terms; the traditions are not
 * interchangeable, and the figure and widget keep the frames apart.
 */

export interface MethodTerm {
  term: string;
  gloss: string;
}

export interface Method {
  id: string;
  /** short faith label, e.g. "Christian · Orthodox" */
  faith: string;
  /** the tradition in full */
  tradition: string;
  /** the method name */
  method: string;
  /** the anchor, one short line for the figure */
  anchor: string;
  /** the anchor, fuller, for the explorer */
  anchorLong: string;
  /** what it quiets, one short line for the figure */
  quiets: string;
  /** what it quiets, fuller */
  quietsLong: string;
  /** the surrender move, fuller */
  surrenderLong: string;
  /** the word for the calm that is received, not forced */
  receivedCalm: MethodTerm;
  /** key terms, on the tradition's own terms */
  terms: MethodTerm[];
  /** what a non-believer can take, without the metaphysics */
  secularForm: string;
  /** where it stays devotional and assumes its context */
  devotionalCore: string;
  color: string;
}

export const METHODS: Method[] = [
  {
    id: 'hesychasm',
    faith: 'Christian · Orthodox',
    tradition: 'Eastern Orthodox Christianity',
    method: 'Hesychasm · the Jesus Prayer',
    anchor: '"Lord Jesus Christ, Son of God, have mercy on me," repeated until it prays itself',
    anchorLong:
      'A single short invocation, "Lord Jesus Christ, Son of God, have mercy on me, a sinner," repeated slowly and attentively, hundreds or thousands of times, often counted on a knotted prayer rope (komboskini) so the hands keep the count and the mind does not. Shorter forms are sanctioned for keeping the rhythm: "Lord Jesus Christ, have mercy on me," or just "Lord, have mercy." The aim is unceasing prayer that eventually runs on its own, beneath ordinary awareness, the "prayer of the heart."',
    quiets: 'gives the churning mind one object; trains nepsis, the watchful return',
    quietsLong:
      'It gives attention a single, undemanding object so the churn of thought has somewhere to rest, and it trains nepsis, watchfulness: catch the mind when it wanders off into a thought, and bring it back to the words, again and again. That return is the work. It also moves the felt center of awareness out of the busy, commentating head and down into the heart. Because the operative words are "have mercy," the practice quiets the self by decentering it rather than building it up.',
    surrenderLong:
      'Surrender is built into the grammar. The active verb belongs to God, "have mercy," not to you. You are not fixing yourself by effort; you are asking to be acted upon. "On me, a sinner" makes it a prayer of dependence, not achievement. Stillness (hesychia) is something you make room for and receive, never something you manufacture by force of will.',
    receivedCalm: {
      term: 'hesychia',
      gloss: 'stillness: a settled, attentive quiet, not merely the absence of noise',
    },
    terms: [
      { term: 'hesychia', gloss: 'stillness, inner quiet; the root of "hesychasm"' },
      { term: 'nepsis', gloss: 'watchfulness, sobriety; the vigilance that catches a stray thought and returns' },
      { term: 'nous → kardia', gloss: 'bringing the mind down "into the heart" so the whole person prays, not just the head' },
      { term: 'Philokalia', gloss: 'the 1782 anthology of the watchful fathers that codified the tradition' },
      { term: 'komboskini', gloss: 'the knotted wool prayer rope used to count repetitions' },
    ],
    secularForm:
      'A short phrase repeated as an anchor, plus the watchful return whenever you notice you have drifted, is exactly the attention training the meditation chapters teach. A worry-bead or counter keeps the hands and the counting out of the thinking mind. Dropping attention from the head into the chest is a usable instruction on its own.',
    devotionalCore:
      'The prayer is addressed to a named person, Jesus, confessed as Son of God, and its aim is union with God (theosis), with calm only ever a byproduct. The deeper breath-and-posture method the tradition itself reserves for those under a living elder, never to be bootstrapped from a book.',
    color: c.coral,
  },
  {
    id: 'centering-prayer',
    faith: 'Christian · contemplative',
    tradition: 'Western (Latin) Christianity',
    method: 'Centering Prayer · The Cloud of Unknowing',
    anchor: 'a single "sacred word," returned to only when a thought carries you off',
    anchorLong:
      'A modern method, distilled in the 1970s by Trappist monks from a fourteenth-century English text, The Cloud of Unknowing. You choose one short "sacred word" (God, Love, Peace) as the symbol of your consent to God\'s presence. You sit, settle, and introduce it silently. When you notice you have been carried off by a thought, you return "ever so gently" to the word. Then you rest in silence. Roughly twenty minutes, twice a day. The word is not a mantra you repeat continuously: it is a symbol of intention, returned to only when you notice you have wandered.',
    quiets: 'thoughts loosen by withdrawal of interest, not force; intention, not attention',
    quietsLong:
      'It works by withdrawal of interest rather than by force. You do not fight thoughts; you let them be and keep returning your quiet intention. Thomas Keating reframed this as intention over attention: you are not concentrating on anything, not even on God as an object. Each return to the sacred word releases whatever thought has carried you off. Over a sitting, the narrating, planning, defending self falls quiet, not by suppression but by repeated non-engagement. The interior silence, when it comes, is received, not manufactured.',
    surrenderLong:
      'Surrender is the entire point, not a side effect. The sacred word is a symbol of consent: consent to God\'s presence and action within you. The posture is receptive and trusting. And the gesture of returning to the word is itself a micro-surrender repeated dozens of times a sitting: each time you notice you have drifted, you let go and consent again, "ever so gently," with no self-reproach.',
    receivedCalm: {
      term: 'interior silence',
      gloss: 'a stillness that is received, not manufactured; the fruit of consent',
    },
    terms: [
      { term: 'apophatic', gloss: 'the way of negation: approach God by setting aside every image and concept' },
      { term: 'cloud of unknowing', gloss: 'the dark not-knowing between us and God, crossed by love, not thought' },
      { term: 'cloud of forgetting', gloss: 'the deliberate setting-aside of everything knowable beneath you' },
      { term: 'sacred word', gloss: 'a short word held as a symbol of consent, not an object of concentration' },
      { term: 'consent', gloss: 'the continual yes renewed each time you return to the word' },
    ],
    secularForm:
      'A fixed short anchor word, and above all the discipline of returning "ever so gently," without self-judgment, is a portable corrective to effortful mind-clearing. The intention-not-attention framing keeps you from straining. The Cloud\'s "cloud of forgetting," setting aside the to-do list and the commentary, is a usable image for de-cluttering attention.',
    devotionalCore:
      'The content is consent to a personal God\'s presence and action within. Remove the One you are consenting to and the sacred word collapses back into the very mantra Keating insists it is not. The apophatic darkness is not blankness; it is a relationship with a hidden presence.',
    color: c.violet,
  },
  {
    id: 'dhikr',
    faith: 'Muslim · Sufi',
    tradition: 'Islam · Sufism',
    method: 'Dhikr · the remembrance of God',
    anchor: 'a divine name or short phrase repeated, silent or aloud, often counted on beads',
    anchorLong:
      'Dhikr means "remembrance." You repeat a divine name or a short Quranic formula, most often "la ilaha illa Allah" (there is no god but God) or simply the name "Allah," silently held in the heart (the Naqshbandi way) or recited aloud, alone or in a circle (hadra), frequently counted on a string of ninety-nine beads (misbaha). A related sitting practice, muraqaba, is watchful stillness: resting in the awareness of being in God\'s presence and returning attention, again and again, to that felt sense.',
    quiets: 'crowds out the chatter of the nafs; "polishes the mirror of the heart"',
    quietsLong:
      'By occupying the discursive mind with one short formula tied to the breath and the beads, dhikr crowds out the restless chatter of the nafs, the lower, ego-bound self, and the heedlessness (ghaflah) that Sufi writers call rust on the heart. Attention is gathered from scattered worldly objects onto a single point, the name of God. The classic image is "polishing the mirror of the heart" (qalb) until it reflects clearly. At its furthest reach the practice aims at fana, the passing away of the separate self.',
    surrenderLong:
      'Surrender here is remembrance, not self-improvement. The word Islam itself means submission. The Quran\'s promise is that hearts find rest by the remembrance of God, not by the self\'s striving (13:28). Sakina sharpens this: it is a tranquility God "sends down" into the heart. The peace is received, descended, gifted. Muraqaba reframes surrender as being watched: you rest in the awareness that al-Raqib, the Watchful, already sees, so vigilance becomes a letting-be in the divine gaze rather than anxious self-monitoring.',
    receivedCalm: {
      term: 'sakina',
      gloss: 'a tranquility God sends down into the heart; cognate with the Hebrew Shekhinah, related but not identical',
    },
    terms: [
      { term: 'dhikr', gloss: 'remembrance of God; the repetition of a divine name or phrase' },
      { term: 'nafs', gloss: 'the lower, appetitive self the path works to quiet and refine' },
      { term: 'qalb', gloss: 'the spiritual heart, the mirror dhikr aims to polish clear' },
      { term: 'muraqaba', gloss: 'watchful meditation; from al-Raqib, the Watchful' },
      { term: 'misbaha', gloss: 'the string of ninety-nine prayer beads used to count' },
    ],
    secularForm:
      'The structure transfers: a short fixed phrase, tied to the breath and counted on beads, is a reliable attentional anchor that gathers scattered attention to a point and settles the nervous system. The muraqaba posture, sitting still in a quiet, vigilant, non-grasping awareness, maps cleanly onto secular meditation.',
    devotionalCore:
      'Remembrance presupposes Someone remembered. Sakina is explicitly a peace received from God, not generated by the self; muraqaba is awareness of being watched by God. Strip the metaphysics and you keep a calming technique but lose the turning of the heart toward a personal Beloved, which the tradition says is the thing that actually does the work.',
    color: c.amber,
  },
  {
    id: 'jewish',
    faith: 'Jewish',
    tradition: 'Judaism',
    method: 'Shabbat, equanimity, hitbodedut',
    anchor: 'rest built into time, equanimity trained as a trait, and talking it out alone',
    anchorLong:
      'Three threads rather than one repeated word. Shabbat is a weekly cessation, roughly twenty-five hours, from creative and constructive work (melacha); its inner quality is menucha, rest. Menuchat hanefesh, "rest of the soul," is equanimity trained as a character trait in Mussar, the Jewish ethical tradition revived by Israel Salanter; its high form, hishtavut, is indifference to praise and blame, tested by a single question: is it equal to you whether people honor you or scorn you? Hitbodedut, in Rebbe Nachman of Breslov\'s sense, is going out alone, ideally into a field, and talking to God aloud in your own everyday words for a set time, an hour a day.',
    quiets: 'removes you from the role of maker and fixer; loosens the grip of others\' verdict',
    quietsLong:
      'Shabbat removes you from the role of maker, fixer, and controller for a day, so the restless, instrumental, future-grasping mode of attention has nowhere to go and must settle into presence. Hishtavut dissolves the praise-hungry, shame-averse self: when honor and contempt become equal, a load-bearing wall of the ego comes down. Nachman\'s hitbodedut externalizes the inner monologue into spoken address, which empties pent-up feeling and reframes the self as held in relationship rather than alone with its problems.',
    surrenderLong:
      'Surrender here is trust (bitachon), not resignation. Shabbat is surrender of control built into time: by ceasing to make and fix, you concede that the world holds together without your management for a day, a recurring rehearsal of letting go. Hishtavut is surrender of the ego\'s stake in others\' verdict, grounded in devekut, cleaving to God, so it is the surrender of ego-stakes, not of agency. Hitbodedut hands the burden over by speaking it aloud to a Listener. In each, calm is received when you stop gripping.',
    receivedCalm: {
      term: 'menucha',
      gloss: 'rest you do not have to earn; Heschel\'s "palace in time," a sanctuary built in time, not space',
    },
    terms: [
      { term: 'Shabbat · menucha', gloss: 'the weekly cessation from melacha, and its inner quality, rest' },
      { term: 'menuchat hanefesh', gloss: 'equanimity as a foundational trait in Mussar' },
      { term: 'hishtavut', gloss: 'equanimity as indifference to praise and blame' },
      { term: 'hitbodedut', gloss: 'spontaneous spoken prayer, alone, in your own words' },
      { term: 'bitachon', gloss: 'trust; the disposition under surrender-as-trust, not resignation' },
    ],
    secularForm:
      'A fixed, unplugged rest period built into the week, where you produce, fix, and optimize nothing, translates cleanly; its genius is that it is a structural cessation built into time, not a mood you have to summon. The hishtavut test ("is it equal to me whether this person praises or criticizes me?") is a usable gauge of how much your peace depends on others. Speaking your worries aloud, alone, for a set time empties and reframes them.',
    devotionalCore:
      'Hishtavut, in its own terms, is a byproduct of devekut, attachment to God, not willpower over ego. Shabbat\'s exact shape is a covenantal observance, not a generic digital detox. And Nachman\'s hitbodedut presumes a Listener: the relief of having handed the burden to Someone is exactly the part that requires the metaphysics.',
    color: c.sky,
  },
];
