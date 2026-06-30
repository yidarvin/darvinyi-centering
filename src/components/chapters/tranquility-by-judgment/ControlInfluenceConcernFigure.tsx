import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;
const CX = 170;
const CY = 150;

/**
 * fig_04.3a: control, influence, concern. A modern three-ring refinement of the
 * dichotomy. The center (control) is Epictetus: what is up to you. The middle
 * (influence) and the three names are Stephen Covey's 1989 model, not ancient
 * text. The Stoic version of that middle ground is the reserve clause: act fully,
 * fate permitting. The lesson either way is to spend your effort at the center.
 */
export function ControlInfluenceConcernFigure() {
  return (
    <Figure
      caption="fig_04.3a · control_influence_concern"
      sub="the center (up to me, or not) is Epictetus. the two outer rings, influence and concern, are Stephen Covey's (1989); the 'control' label was added by later popularizers. the Stoic name for working the middle ring is the reserve clause, acting fully but holding 'fate permitting' in reserve. either way: spend your effort at the center."
      max={420}
    >
      <svg
        viewBox="0 0 340 300"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Three concentric circles. The outer ring is concern, what you cannot move. The middle ring is influence, what you affect but do not decide. The small center is control, what is up to you. Effort belongs at the center."
      >
        <circle cx={CX} cy={CY} r={130} fill="rgba(255,255,255,0.022)" stroke={c.faint} strokeWidth={1} strokeOpacity={0.6} />
        <circle cx={CX} cy={CY} r={88} fill={c.amberFog} stroke={c.amber} strokeWidth={1.2} strokeOpacity={0.65} />
        <circle cx={CX} cy={CY} r={44} fill={c.tealFog} stroke={c.teal} strokeWidth={1.8} />

        {/* concern (outer) */}
        <text x={CX} y={36} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fontWeight={500} fill={c.faint}>
          concern
        </text>
        <text x={CX} y={49} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          you can&rsquo;t move it
        </text>

        {/* influence (middle) */}
        <text x={CX} y={80} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fontWeight={500} fill={c.amber}>
          influence
        </text>
        <text x={CX} y={93} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          you affect, you don&rsquo;t decide
        </text>

        {/* control (center) */}
        <text x={CX} y={146} textAnchor="middle" fontFamily={monoFamily} fontSize={12.5} fontWeight={600} fill={c.teal}>
          control
        </text>
        <text x={CX} y={160} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.teal} fillOpacity={0.8}>
          up to me
        </text>

        {/* examples keyed to each ring */}
        <text x={CX} y={206} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.teal} fillOpacity={0.85}>
          judgments · effort · chosen action
        </text>
        <text x={CX} y={232} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.amber} fillOpacity={0.85}>
          others &middot; outcomes you contribute to
        </text>
        <text x={CX} y={258} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          the weather &middot; the past &middot; the final verdict
        </text>
      </svg>
    </Figure>
  );
}
