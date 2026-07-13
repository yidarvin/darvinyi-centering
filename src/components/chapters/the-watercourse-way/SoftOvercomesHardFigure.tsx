import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

const TITLE_FS = 15;
const LABEL_FS = 13;

/**
 * fig_08.2: soft overcomes hard. Two faithful facets of the same Taoist claim.
 * Top, ch.76: the living are supple and the dead are stiff, so the reed bends
 * with the storm and lives while the rigid branch snaps. Bottom, ch.78: there is
 * nothing softer than water, yet nothing surpasses it for wearing down the hard,
 * so the patient drop carves a channel the hammer never could. Yielding is not
 * weakness here. It is a slower, surer kind of strength.
 *
 * Stacked (not side by side) so every label can sit at a legible size on a
 * phone-width viewBox. The two ch.76/ch.78 scenes are separated by a dashed
 * divider rather than crowded into two narrow columns.
 */
export function SoftOvercomesHardFigure() {
  return (
    <Figure
      caption="fig_08.2 · soft_overcomes_hard"
      sub={
        'ch.76: the living are supple, the dead stiff. "firmness and strength are the concomitants of death; softness and weakness, the concomitants of life." ch.78: nothing is softer or weaker than water, yet for wearing down the firm and strong nothing surpasses it. the soft does not break. it outlasts.'
      }
      max={420}
    >
      <svg
        viewBox="0 0 320 500"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two stacked panels. Top: a storm blows across a supple stalk and a rigid branch. The stalk bends far over with the wind and stays whole, while the branch snaps clean in two. What bends, lives. Bottom: drops of water fall onto a block of stone and have worn a smooth channel from top to bottom through it. The softest thing wears away the hardest."
      >
        <defs>
          <marker id="soh-wind" markerWidth="8" markerHeight="8" refX="5" refY="3.5" orient="auto">
            <path d="M0 0 L5 3.5 L0 7 Z" fill={c.faint} fillOpacity={0.8} />
          </marker>
        </defs>

        {/* ---- TOP: what bends, lives (ch.76) ---- */}
        <text x={20} y={30} fontFamily={monoFamily} fontSize={TITLE_FS} fontWeight={600} fill={c.teal}>
          what bends, lives
        </text>

        {/* the wind */}
        <text x={20} y={55} fontFamily={monoFamily} fontSize={LABEL_FS} fill={c.faint}>
          the storm
        </text>
        <g stroke={c.faint} strokeWidth={1.3} fill="none" strokeOpacity={0.7}>
          <path d="M20,66 q 50,-10 100,0" markerEnd="url(#soh-wind)" />
          <path d="M20,80 q 58,-10 116,0" markerEnd="url(#soh-wind)" />
          <path d="M20,94 q 48,-10 96,0" markerEnd="url(#soh-wind)" />
        </g>

        {/* ground */}
        <line x1={20} y1={190} x2={300} y2={190} stroke={c.line2} strokeWidth={1} />

        {/* the supple reed, bent far over with the wind, intact */}
        <path
          d="M80,190 C 83,150 95,120 138,102"
          fill="none"
          stroke={c.teal}
          strokeWidth={2.8}
          strokeLinecap="round"
        />
        <path d="M138,102 q 18,-6 30,4" fill="none" stroke={c.teal} strokeWidth={1.8} strokeLinecap="round" />
        <path
          d="M124,112 q 16,-9 30,-4"
          fill="none"
          stroke={c.teal}
          strokeWidth={1.4}
          strokeOpacity={0.7}
          strokeLinecap="round"
        />
        <text x={80} y={214} textAnchor="middle" fontFamily={monoFamily} fontSize={LABEL_FS} fill={c.teal}>
          the reed bends
        </text>

        {/* the rigid branch, snapped */}
        <path d="M240,190 L240,128" stroke={c.faint} strokeWidth={3.4} strokeLinecap="butt" />
        {/* break gap, then the broken-off top fallen aside */}
        <path d="M241,128 L248,118" stroke={c.faint} strokeWidth={3.4} strokeLinecap="butt" />
        <path
          d="M254,128 L286,116"
          stroke={c.faint}
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeOpacity={0.8}
        />
        <text x={258} y={110} fontFamily={monoFamily} fontSize={LABEL_FS} fill={c.coral}>
          snap
        </text>
        <text x={240} y={214} textAnchor="middle" fontFamily={monoFamily} fontSize={LABEL_FS} fill={c.faint}>
          the rigid breaks
        </text>

        {/* divider between the two scenes */}
        <line x1={20} y1={234} x2={300} y2={234} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

        {/* ---- BOTTOM: what yields, wears it down (ch.78) ---- */}
        <text x={20} y={262} fontFamily={monoFamily} fontSize={TITLE_FS} fontWeight={600} fill={c.teal}>
          what yields, prevails
        </text>

        {/* falling drops */}
        <text x={20} y={288} fontFamily={monoFamily} fontSize={LABEL_FS} fill={c.teal}>
          the soft drop
        </text>
        <g fill={c.teal}>
          <ellipse cx={80} cy={308} rx={3.6} ry={6} />
          <ellipse cx={80} cy={330} rx={3.1} ry={5.2} fillOpacity={0.7} />
          <ellipse cx={80} cy={352} rx={2.6} ry={4.4} fillOpacity={0.45} />
        </g>

        {/* the stone block */}
        <path d="M150,298 L300,298 L300,460 L150,460 Z" fill={c.panel2} stroke={c.faint} strokeWidth={1.4} />
        {/* texture cracks */}
        <path
          d="M168,330 L184,330 M266,350 L284,350"
          stroke={c.faint}
          strokeWidth={1}
          strokeOpacity={0.5}
        />
        {/* the channel worn down through it, top to bottom */}
        <path
          d="M222,298 C 216,330 228,352 220,378 C 214,404 224,420 220,460"
          fill="none"
          stroke={c.teal}
          strokeWidth={6}
          strokeOpacity={0.85}
          strokeLinecap="round"
        />
        <text textAnchor="middle" fontFamily={monoFamily} fontSize={LABEL_FS} fill={c.teal}>
          <tspan x={267} y={316}>
            worn
          </tspan>
          <tspan x={267} y={332}>
            through
          </tspan>
        </text>
        <text
          x={225}
          y={484}
          textAnchor="middle"
          fontFamily={monoFamily}
          fontSize={LABEL_FS}
          fill={c.faint}
        >
          the hardest stone
        </text>
      </svg>
    </Figure>
  );
}
