import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;
const CX = 170;
const CY = 150;

/**
 * fig_04.3a: control, influence, concern. A modern three-ring refinement of the
 * dichotomy. The center (control) is Epictetus: what is up to you. The two outer
 * rings, concern and influence, are Stephen Covey's 1989 model; the innermost
 * 'control' ring was added by later popularizers, not ancient text. The Stoic
 * version of that middle ground is the reserve clause: act fully, fate permitting.
 * The lesson either way is to spend your effort at the center.
 *
 * Legibility redesign: the original packed a ring name plus a description plus
 * an example line into three thin concentric bands only ~44px wide, which
 * forced the smallest text down to 8.5 in a 340-wide viewBox (7.2px effective
 * on a phone). Each band now carries only its single name, sized to actually
 * read inside the ring. The description and the worked examples for each ring,
 * content that was already there, none dropped, move to a stacked legend below
 * the circles, where there is real room for three two-line entries at a
 * comfortable size. The rings still nest the same way and still say the same
 * thing; they just no longer have to whisper it.
 */
export function ControlInfluenceConcernFigure() {
  return (
    <Figure
      caption="fig_04.3a · control_influence_concern"
      sub="the center is Epictetus: what is up to me. the two outer rings, influence and concern, are Stephen Covey's (1989); the 'control' label was added by later popularizers. the Stoic name for working the middle ring is the reserve clause, acting fully but holding 'fate permitting' in reserve. either way: spend your effort at the center."
      max={420}
    >
      <svg
        viewBox="0 0 340 474"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Three concentric circles with a legend below. The outer ring is concern, what you cannot move: the weather, the past, the verdict. The middle ring is influence, what you affect but do not decide: others, outcomes you contribute to. The small center is control, what is up to you: judgments, effort, chosen action. Effort belongs at the center."
      >
        <circle cx={CX} cy={CY} r={130} fill="rgba(255,255,255,0.022)" stroke={c.faint} strokeWidth={1} strokeOpacity={0.6} />
        <circle cx={CX} cy={CY} r={88} fill={c.amberFog} stroke={c.amber} strokeWidth={1.2} strokeOpacity={0.65} />
        <circle cx={CX} cy={CY} r={44} fill={c.tealFog} stroke={c.teal} strokeWidth={1.8} />

        {/* ring names, one line each, no longer sharing the band with a caption */}
        <text x={CX} y={42} textAnchor="middle" fontFamily={monoFamily} fontSize={15} fontWeight={500} fill={c.faint}>
          concern
        </text>
        <text x={CX} y={86} textAnchor="middle" fontFamily={monoFamily} fontSize={15} fontWeight={500} fill={c.amber}>
          influence
        </text>
        <text x={CX} y={156} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fontWeight={600} fill={c.teal}>
          control
        </text>

        {/* legend: each ring's description and worked examples, stacked below the diagram */}
        <text x={CX} y={310} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fontWeight={600} fill={c.teal}>
          control · up to me
        </text>
        <text x={CX} y={334} textAnchor="middle" fontFamily={monoFamily} fontSize={13.5} fill={c.teal} fillOpacity={0.85}>
          judgments · effort · chosen action
        </text>

        <text x={CX} y={368} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fontWeight={500} fill={c.amber}>
          influence · you affect, don&rsquo;t decide
        </text>
        <text x={CX} y={392} textAnchor="middle" fontFamily={monoFamily} fontSize={13.5} fill={c.amber} fillOpacity={0.85}>
          others · outcomes you contribute to
        </text>

        <text x={CX} y={426} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fontWeight={500} fill={c.faint}>
          concern · you can&rsquo;t move it
        </text>
        <text x={CX} y={450} textAnchor="middle" fontFamily={monoFamily} fontSize={13.5} fill={c.faint} fillOpacity={0.9}>
          the weather · the past · the verdict
        </text>
      </svg>
    </Figure>
  );
}
