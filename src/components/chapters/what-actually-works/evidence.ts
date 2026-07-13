import { c } from '@/styles/tokens';
import { getRoute, type RouteId } from '@/content/routes';

/**
 * The single source of truth for Ch 15, What Actually Works. It drives three
 * views at once so they can never drift: the evidence map (fig_15.1), the
 * route-to-mechanism table (fig_15.2), and the mechanism explorer (widget_15.1).
 *
 * Every number here was pulled from a primary meta-analysis or large trial and
 * then adversarially fact-checked against the source, with the comparison
 * condition (waitlist versus active control) kept attached, because that is the
 * one thing that decides whether a number means anything. Where the popular
 * figure was inflated (a waitlist effect sold as a general one, a press-release
 * relative risk, a within-group pre-post jump), the corrected, honest figure is
 * the one written down. Underclaim before overclaim. No em dashes anywhere.
 */

export type Grade = 'A' | 'B' | 'C' | 'D';

export interface GradeDef {
  id: Grade;
  label: string;
  color: string;
  gloss: string;
}

/**
 * The grade scale. A and B are the tested tier (cool colors): a real trial with a
 * real comparison sits behind them. C is thin and expectancy-driven (amber, a
 * caution). D is the untested tier (violet): either a strong association you can
 * never randomize, or an elegant model no one has put to a trial. The letter and
 * the word carry the meaning, so the figure never depends on color alone.
 */
export const GRADES: GradeDef[] = [
  {
    id: 'A',
    label: 'well supported',
    color: c.emerald,
    gloss: 'large and replicated, and the effect survives a credible active or placebo control',
  },
  {
    id: 'B',
    label: 'moderate',
    color: c.sky,
    gloss: 'real and replicated, but modest, and often no better than a fair active control',
  },
  {
    id: 'C',
    label: 'promising, thin',
    color: c.amber,
    gloss: 'small or biased trials, plausible, and the effect fades against an active comparator',
  },
  {
    id: 'D',
    label: 'observational, or theory',
    color: c.violet,
    gloss: 'a strong association you cannot randomize, or an elegant model no trial has tested',
  },
];

const GRADE_BY_ID = new Map(GRADES.map((g) => [g.id, g]));

export function getGrade(id: Grade): GradeDef {
  const g = GRADE_BY_ID.get(id);
  if (!g) throw new Error(`Unknown grade: ${id}`);
  return g;
}

export interface Practice {
  id: string;
  /** the practice or finding, named plainly */
  name: string;
  /** the primary route to calm this works through */
  route: RouteId;
  grade: Grade;
  /** how it is supposed to work, stated honestly */
  mechanism: string;
  /** what the best trials actually found, with the numbers and the comparison condition */
  evidence: string;
  /** the honest limit: the catch that the grade rests on */
  caveat: string;
  /** a short source label and a link */
  source: string;
  url: string;
}

export const PRACTICES: Practice[] = [
  // ---- A: well supported (by scale and design, not by power) -------------
  {
    id: 'income-enough',
    name: 'Wanting less than you could buy',
    route: 'enough',
    grade: 'A',
    mechanism:
      'Happiness rises with the logarithm of income, so past a comfortable level each extra dollar moves it less and less. The reference point keeps climbing to meet what you have, which is the treadmill the whole route is built to step off.',
    evidence:
      'Across 1.7 million real-time reports from 33,391 adults, and a rare adversarial collaboration between former rivals (Killingsworth, Kahneman, and Mellers, 2023), happiness keeps rising with income, but only with its logarithm. The entire span from 15,000 to 250,000 dollars a year moves well-being about five points on a hundred-point scale. The correlation is about 0.09. The shape of the curve is nailed down by sheer scale.',
    caveat:
      'All correlational and US-centric. Income is tangled with health, marriage, and temperament, and reverse causation is plausible. The grade is for how well we know the curve, not for any power in the practice. The effect is genuine and tiny.',
    source: 'Killingsworth, Kahneman & Mellers 2023, PNAS',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10013834/',
  },
  {
    id: 'cbt',
    name: 'Cognitive behavioral therapy',
    route: 'perspective',
    grade: 'A',
    mechanism:
      'Catch the automatic thought, test it against the evidence, and adopt a more accurate appraisal, paired with behavioral activation or exposure. It is reappraisal turned into a structured, teachable course.',
    evidence:
      'One of the most trialed treatments in all of psychology. Against a true placebo, CBT moves target anxiety and depression symptoms by about g = 0.56, with response roughly three times as likely (Carpenter 2018, 41 placebo-controlled trials). The larger famous numbers, g around 0.75 to 0.98, are measured against waitlists, which Cuijpers calls "probably a nocebo" that overstates the effect.',
    caveat:
      'The edge shrinks against active and placebo controls, and publication-bias adjustment deflates it further (MDD from g = 0.75 to 0.65). It is not reliably better than other bona fide therapies, the Dodo bird verdict. Every headline number needs its comparison condition attached.',
    source: 'Carpenter 2018; Cuijpers 2016',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5992015/',
  },

  // ---- B: moderate (real, modest, often nonspecific) ---------------------
  {
    id: 'mbct',
    name: 'MBCT for depressive relapse',
    route: 'presence',
    grade: 'B',
    mechanism:
      'Teach a recovered patient to spot the early signature of a slide back into depression and to step back from the ruminative loop before it catches. The proposed active ingredient is decentering: relating to a dark thought as a passing event, not the truth.',
    evidence:
      'An individual-patient meta-analysis of 9 trials and 1,258 patients (Kuyken 2016) found mindfulness-based cognitive therapy cut relapse over 60 weeks versus non-MBCT comparators (HR 0.69) and even versus maintenance antidepressants (HR 0.77). The benefit was largest in those with the most residual symptoms. This is the single strongest application of trained presence in the book.',
    caveat:
      'The edge over antidepressants is modest, with the upper confidence bound nearly touching 1.0. The benefit concentrates in higher-severity patients, not everyone. This is relapse prevention for recurrent depression, not a general wellness practice.',
    source: 'Kuyken 2016, JAMA Psychiatry',
    url: 'https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2517515',
  },
  {
    id: 'mbsr',
    name: 'Mindfulness and MBSR for distress',
    route: 'presence',
    grade: 'B',
    mechanism:
      'Pay attention on purpose, in the present, without judgment, until a thought can be seen as a passing mental event rather than a report from the world. Proposed engines: attention regulation, body awareness, and decentering.',
    evidence:
      'Against credible active controls, Goyal 2014 (47 trials) found moderate evidence and small effects: anxiety about 0.38, depression about 0.30, pain about 0.33, all fading within a few months. Goldberg 2022 (44 meta-analyses) and Galante 2021 (136 trials) confirm the pattern: clearly better than doing nothing, only comparable to other active treatments.',
    caveat:
      'The most oversold practice in this set. Against a fair active control the advantage often vanishes (Galante found a between-group effect of -0.01 on distress). Heterogeneity is high, and the brain-imaging story rests on small, inconsistent samples.',
    source: 'Goyal 2014, JAMA Intern Med',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4142584/',
  },
  {
    id: 'nature',
    name: 'A single walk in nature',
    route: 'presence',
    grade: 'B',
    mechanism:
      'A natural scene holds attention softly and effortlessly, which lets depleted directed attention recover (attention restoration theory), and lifts mood at the same time. It runs partly through presence and partly through the body and the senses.',
    evidence:
      'A nature walk reliably beats a city walk on mood and on attention: Berman 2008 found about a 20 percent gain on a backward digit-span task, near zero after an urban walk. Bratman 2015 found a real drop in subgenual prefrontal activity, a region tied to brooding (a large effect, d about 1.0). A meta-analysis of 32 studies (McMahan 2015) finds a moderate lift in positive affect.',
    caveat:
      'Almost all single-session, with an urban-only comparator, so nature cannot be separated from novelty or simply leaving a stressful place. On the widely repeated "less rumination" self-report, the nature-versus-urban interaction was only a non-significant trend (p = 0.07). Samples are small and skew young.',
    source: 'Berman 2008; Bratman 2015',
    url: 'https://www.pnas.org/doi/10.1073/pnas.1510459112',
  },
  {
    id: 'slow-breathing',
    name: 'Slow breathing, longer exhale',
    route: 'the-body',
    grade: 'B',
    mechanism:
      'Breathing near six per minute (about 0.1 Hz) matches the baroreflex, so the respiration-driven and pressure-driven swings in heart rate fall into phase and resonate. A longer exhale lengthens the stretch where the vagal brake is engaged. HRV climbs.',
    evidence:
      'The acute physiology is reliable and well documented (Zaccaro 2018). A meta-analysis of breathwork (Fincham 2023) found small effects on stress (g = -0.35), anxiety (g = -0.32), and depression (g = -0.40), with low publication bias.',
    caveat:
      'The strongest single test, a preregistered RCT of 400 people, found coherent breathing at 5.5 per minute beat nothing but did not beat a 12 per minute attention placebo. Both arms improved equally. Much of the benefit may be the focused-attention time-out it shares with brief mindfulness. Stop if you feel lightheaded.',
    source: 'Fincham et al. 2023, Sci Reports (meta-analysis)',
    url: 'https://doi.org/10.1038/s41598-022-27247-y',
  },
  {
    id: 'hrv-biofeedback',
    name: 'HRV biofeedback',
    route: 'the-body',
    grade: 'B',
    mechanism:
      'A live heart-rate display helps you find and hold the breathing rate that makes your heart-rate swings the largest, proposed to strengthen baroreflex gain and vagal regulation over weeks of training.',
    evidence:
      'Controlled trials find a real effect on stress and anxiety: Goessl 2017 reports a between-group g around 0.83, though from only about 13 small controlled studies, and Lehrer\'s broader 58-trial review calls the pooled effect small to moderate. This corner of the literature is relatively clean: the depression meta-analysis (Pizzoli 2021) shows no detectable publication bias.',
    caveat:
      'Lehrer\'s review found the effect "does not differ from that of other effective treatments": a valid option, not a superior one. The g around 0.8 rests on a handful of small trials, so treat it as an upper bound rather than a settled size.',
    source: 'Goessl 2017; Lehrer 2020',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32385728/',
  },
  {
    id: 'reappraisal',
    name: 'Cognitive reappraisal',
    route: 'perspective',
    grade: 'B',
    mechanism:
      'Reinterpret what an event means before the feeling has fully formed, lowering the emotion at its source. In Gross\'s model this is cheaper than suppressing the feeling after it arrives.',
    evidence:
      'A meta-analysis of 306 lab comparisons (Webb 2012) found reappraisal works, but the effect is small (about d = 0.36). Reappraising the situation beats reappraising your reaction, and perspective-taking was the strongest variant (d = 0.45). It is also the engine inside CBT, which is itself well supported.',
    caveat:
      'Most data are single-session lab inductions, not patients or lasting mood change. Effects are small, heavily moderated by the kind of emotion, and they shrink exactly when the feeling is most intense.',
    source: 'Webb, Miles & Sheeran 2012, Psych Bulletin',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22582737/',
  },
  {
    id: 'act',
    name: 'Acceptance and defusion (ACT)',
    route: 'letting-go',
    grade: 'B',
    mechanism:
      'Stop struggling to control inner experience. See a thought as words and images passing through, not an order to obey. The proposed mechanism is that the struggle to control a feeling is itself a driver of suffering.',
    evidence:
      'A meta-analysis of 39 trials (A-Tjak 2015) found ACT helps versus inactive controls (versus waitlist g = 0.82, versus a psychological placebo g = 0.51), and reaches parity with established CBT (g = 0.32, not statistically significant).',
    caveat:
      'The g = 0.82 is the waitlist figure, the weakest comparison, and must never be quoted alone. Higher-quality trials found smaller effects. Whether acceptance and defusion add anything beyond ordinary cognitive change is still unsettled.',
    source: 'A-Tjak 2015, Psychother & Psychosom',
    url: 'https://karger.com/pps/article/84/1/30/282854/',
  },
  {
    id: 'hedonic',
    name: 'Seeing the hedonic treadmill',
    route: 'enough',
    grade: 'B',
    mechanism:
      'We habituate to most gains and drift back toward a baseline, so a new acquisition buys less lasting happiness than we predict. Noticing this is supposed to redirect attention from getting more toward appreciating what is here.',
    evidence:
      'Large national panel studies (Lucas and colleagues) show substantial but incomplete, event-specific adaptation. The iconic lottery-and-paralysis study (Brickman 1978) found winners no happier than controls and savoring everyday pleasures less, but it is tiny (22 winners) and cross-sectional.',
    caveat:
      'Adaptation is real but partial: people do not fully adapt to unemployment, severe disability, or grief. The famous study has been overread as "happiness is fixed." The jump from "we adapt" to "therefore want less" is a value choice, not a finding.',
    source: 'Brickman 1978; Lucas (SOEP)',
    url: 'https://gwern.net/doc/psychology/1978-brickman.pdf',
  },

  // ---- C: promising but thin (fades against a fair comparator) -----------
  {
    id: 'lovingkindness',
    name: 'Lovingkindness meditation',
    route: 'connection',
    grade: 'C',
    mechanism:
      'Deliberately generate warmth toward yourself and others, proposed to build an upward spiral of positive emotion and to loosen self-criticism and threat-focus.',
    evidence:
      'Meta-analyses find medium effects on positive emotion and self-compassion against do-nothing controls (Zeng 2015, g around 0.39; Kirby 2017). But Galante 2014 found the result inconclusive against active controls, and the compassion effects shrink once active-control trials and publication bias are accounted for.',
    caveat:
      'The active-control problem dominates. Trials are small, short, mostly nonclinical, and often enroll people already drawn to meditation. Forced warmth can backfire for some. Treat the do-nothing effect sizes as an upper bound.',
    source: 'Zeng 2015; Kirby 2017',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4630307/',
  },
  {
    id: 'gratitude',
    name: 'Gratitude practices',
    route: 'enough',
    grade: 'C',
    mechanism:
      'Redirect attention from what is missing toward what is already here, and toward the people behind it. Proposed to strengthen social bonds and reset the reference point.',
    evidence:
      'A meta-analysis of 27 trials (Cregg 2021) found small effects on depression and anxiety (g around -0.29). But against an equally effortful positive activity, the life-satisfaction effect drops to about d = 0.03 (Dickens 2017), essentially nothing.',
    caveat:
      'The benefit shrinks toward zero against an active comparator, which implicates expectancy and demand. Trials are short and self-report. Real but modest, and frequently oversold. Not a treatment for clinical depression or anxiety.',
    source: 'Cregg & Cheavens 2021; Dickens 2017',
    url: 'https://doi.org/10.1007/s10902-020-00236-6',
  },
  {
    id: 'self-distancing',
    name: 'Self-distancing',
    route: 'perspective',
    grade: 'C',
    mechanism:
      'Step back to a fly-on-the-wall view of your own distress instead of reliving it in the first person. The shift moves thought from recounting the hurt toward reconstruing its meaning, which blocks the rumination loop.',
    evidence:
      'Kross and Ayduk\'s studies (Ayduk 2010) found people who spontaneously self-distance show lower emotional reactivity (correlations around -0.31 to -0.34) and fewer intrusive thoughts about seven weeks later. It maps onto the decentering inside mindfulness and cognitive therapy.',
    caveat:
      'Samples are small (tens of people), and key findings are correlational or rely on spontaneous, not assigned, distancing, which leaves confounding open. Most outcomes are short-term lab measures in nonclinical samples. Plausible, not yet proven.',
    source: 'Ayduk & Kross 2010, JPSP',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2881638/',
  },
  {
    id: 'mindfulness-wellness',
    name: 'Mindfulness for everyday wellness',
    route: 'presence',
    grade: 'C',
    mechanism:
      'The popular claim that a few minutes of daily practice raises baseline well-being for anyone, healthy or not. The same skill as clinical mindfulness, sold as a universal tonic.',
    evidence:
      'In non-clinical adults, mindfulness reduces distress versus doing nothing (Galante 2021, SMD -0.45) but essentially not at all versus an active control (SMD -0.01). The clinical effect (grade B) and this everyday-wellness effect are not the same thing.',
    caveat:
      'The headline wellness benefit rests almost entirely on comparisons to doing nothing. Prediction intervals show that in more than 5 percent of settings the programs may not help and could leave people slightly worse. The universal-benefit framing is not supported.',
    source: 'Galante 2021, PLOS Medicine',
    url: 'https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003481',
  },

  // ---- D: observational, or theory --------------------------------------
  {
    id: 'social',
    name: 'Strong social relationships',
    route: 'connection',
    grade: 'D',
    mechanism:
      'Close ties are thought to buffer the stress response, nudge healthier behavior, and meet a basic need to belong. The biology is plausible and partly supported.',
    evidence:
      'A meta-analysis of 148 studies and over 308,000 people (Holt-Lunstad 2010) found stronger relationships gave about 50 percent greater odds of being alive at follow-up (OR 1.50), with the richest social-integration measures strongest (OR 1.91). This is among the largest associations in the whole map.',
    caveat:
      'Entirely observational. You cannot randomize people into isolation, so reverse causation (declining health drives withdrawal) and confounding stay live. The "rivals smoking" line is a size analogy, not equal causal force. When you actually run loneliness interventions, the effects are only small-to-moderate.',
    source: 'Holt-Lunstad 2010, PLoS Medicine',
    url: 'https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000316',
  },
  {
    id: 'purpose',
    name: 'A sense of purpose',
    route: 'meaning',
    grade: 'D',
    mechanism:
      'A clear reason to get up is thought to lower stress reactivity and inflammation and to motivate health-protective behavior, setting a hard day inside something that can carry its weight.',
    evidence:
      'Purpose predicts lower mortality across large cohorts (Hill 2014, HR 0.85 per standard deviation; a meta-analysis of 136,000 people, Cohen 2016, RR 0.83) and lower Alzheimer\'s risk (Boyle 2010). The associations are strong and convergent.',
    caveat:
      'Almost all correlational, so reverse causation is live: calm, healthy, connected people report more purpose. Mortality is not calm. The one randomized program, meaning-centered therapy, barely beats an active control and is specialized to advanced cancer. Generalizing to a healthy reader is not warranted.',
    source: 'Hill 2014; Cohen 2016 (meta-analysis)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4224996/',
  },
  {
    id: 'predictive-brain',
    name: 'The predictive brain (active inference)',
    route: 'letting-go',
    grade: 'D',
    mechanism:
      'Under predictive processing the brain runs on forecasts: it predicts the next moment, compares the prediction to what arrives, and updates on the error. Anxiety becomes chronic over-prediction of threat, held with too much confidence to update. Letting-go practices are reread as feeding gentler evidence so the forecast can soften.',
    evidence:
      'An elegant lens that organizes the entire map (Clark 2013; Friston 2010). But it is a theory, not a tested treatment. Seth and Friston themselves write that direct evidence for interoceptive prediction errors "is still lacking." No trial shows that altering prediction precision causes durable calm.',
    caveat:
      'It spans all seven routes, so any single mapping is loose. Precision and threat priors are inferred, not measured. The free energy principle is widely argued to be unfalsifiable as stated. It belongs in the book as a way of seeing, not a validated mechanism.',
    source: 'Clark 2013; Seth & Friston 2016',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5062097/',
  },
  {
    id: 'materialism',
    name: 'Holding looser to status goals',
    route: 'enough',
    grade: 'D',
    mechanism:
      'Extrinsic, status-driven goals are theorized to fail at meeting basic needs and to crowd out the intrinsic pursuits that do. Loosening them is supposed to free up room.',
    evidence:
      'A meta-analysis of 753 effect sizes (Dittmar 2014) found materialism reliably associated with lower well-being (about r = -0.19), consistent across cultures.',
    caveat:
      'Almost entirely correlational, and the effect is small. Insecurity may drive materialism as much as the reverse. No large trial shows that deliberately wanting less causally raises well-being. A strong association, not a demonstrated intervention.',
    source: 'Dittmar 2014, JPSP',
    url: 'https://pubmed.ncbi.nlm.nih.gov/25347131/',
  },
];

const PRACTICE_BY_ID = new Map(PRACTICES.map((p) => [p.id, p]));

export function getPractice(id: string): Practice | undefined {
  return PRACTICE_BY_ID.get(id);
}

/** practices grouped by grade, A through D, in the canonical grade order */
export function practicesByGrade(): { grade: GradeDef; practices: Practice[] }[] {
  return GRADES.map((grade) => ({
    grade,
    practices: PRACTICES.filter((p) => p.grade === grade.id),
  }));
}

/** how many practices sit at each grade, for the figure's shape note */
export function gradeCounts(): Record<Grade, number> {
  const out: Record<Grade, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const p of PRACTICES) out[p.grade] += 1;
  return out;
}

/* --------------------------------------------------------------------------
 * The route-to-mechanism table (fig_15.2). Each of the seven routes, the
 * mechanism it is proposed to work through, and the honest strength of the best
 * evidence on that route. "enough" is marked mixed on purpose: the descriptive
 * science of wanting less (the income curve, adaptation) is graded A and B, while
 * the practices meant to cultivate it (gratitude, holding looser) are C and D.
 * That split is the honest story, not a flaw to hide.
 * ------------------------------------------------------------------------ */

export type RouteGrade = Grade | 'mixed';

export interface RouteMechanism {
  route: RouteId;
  /** the proposed mechanism, in a few words */
  mechanism: string;
  /** how calm practices are thought to work it */
  how: string;
  /** the strength of the best evidence on this route */
  grade: RouteGrade;
  /** a short, honest line on that evidence */
  note: string;
}

export const ROUTE_MECHANISMS: RouteMechanism[] = [
  {
    route: 'the-body',
    mechanism: 'vagal tone and the baroreflex',
    how: 'A slow, long exhale and resonant breathing raise parasympathetic outflow and heart-rate variability.',
    grade: 'B',
    note: 'Real physiology, modest clinical edge. Slow breathing matches a breathing placebo as often as it beats one.',
  },
  {
    route: 'presence',
    mechanism: 'attention regulation and decentering',
    how: 'Trained attention lets a thought be seen as a passing event rather than the truth, loosening its grip.',
    grade: 'B',
    note: 'Small effects that shrink against active controls. MBCT for depressive relapse is the standout exception.',
  },
  {
    route: 'letting-go',
    mechanism: 'ending the struggle to control inner experience',
    how: 'Acceptance and defusion drop the second-arrow fight with a feeling, which tends to amplify it.',
    grade: 'B',
    note: 'ACT clearly beats doing nothing and reaches parity with CBT, not superiority.',
  },
  {
    route: 'perspective',
    mechanism: 'reappraisal and self-distancing',
    how: 'Re-judge what an event means, or step back to an observer\'s view, and the feeling drops at its source.',
    grade: 'A',
    note: 'CBT survives placebo controls. The lab tactic on its own is real but small (about d = 0.36).',
  },
  {
    route: 'enough',
    mechanism: 'lowering the reference point',
    how: 'Want less, and the same life clears more of the bar. Undo the treadmill that keeps raising it.',
    grade: 'mixed',
    note: 'The income and adaptation science is strong (A and B). The practices meant to cultivate it (gratitude, holding looser) are C and D.',
  },
  {
    route: 'connection',
    mechanism: 'stress-buffering and belonging',
    how: 'Close ties dampen the stress response and meet a basic need, a calm shared rather than manufactured alone.',
    grade: 'D',
    note: 'A huge survival association (OR 1.50), but observational. You cannot randomize people into isolation.',
  },
  {
    route: 'meaning',
    mechanism: 'a reason that can carry the weight',
    how: 'Set the hard day inside something larger and it lowers the load the day puts on you.',
    grade: 'D',
    note: 'A strong mortality association (RR 0.83), but almost no trial evidence that raising purpose produces calm.',
  },
];

export { getRoute };
export type { RouteId };
