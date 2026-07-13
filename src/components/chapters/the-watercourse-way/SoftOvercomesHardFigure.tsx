import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_08.2: soft overcomes hard. Two faithful facets of the same Taoist claim.
 * Left, ch.76: the living are supple and the dead are stiff, so the reed bends
 * with the storm and lives while the rigid branch snaps. Right, ch.78: there is
 * nothing softer than water, yet nothing surpasses it for wearing down the hard,
 * so the patient drop carves a channel the hammer never could. Yielding is not
 * weakness here. It is a slower, surer kind of strength.
 */
export function SoftOvercomesHardFigure() {
  return (
    <Figure
      caption="fig_08.2 · soft_overcomes_hard"
      sub={
        'ch.76: the living are supple, the dead stiff. "firmness and strength are the concomitants of death; softness and weakness, the concomitants of life." ch.78: nothing is softer or weaker than water, yet for wearing down the firm and strong nothing surpasses it. the soft does not break. it outlasts.'
      }
      max={540}
    >
      <svg
        viewBox="0 0 520 244"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels. Left: a storm wind blows from the upper left. A supple stalk bends far over with the wind and stays whole, while beside it a rigid branch has snapped clean in two. What bends, lives. Right: drops of water fall onto a block of stone and have worn a smooth channel down through it. The softest thing wears away the hardest."
      >
        <defs>
          <marker id="soh-wind" markerWidth="7" markerHeight="7" refX="4.5" refY="3" orient="auto">
            <path d="M0 0 L4.5 3 L0 6 Z" fill={c.faint} fillOpacity={0.8} />
          </marker>
        </defs>

        <line x1={260} y1={20} x2={260} y2={224} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

        {/* ---- LEFT: what bends, lives (ch.76) ---- */}
        <text x={24} y={32} fontFamily={monoFamily} fontSize={11} fontWeight={600} fill={c.teal}>
          what bends, lives
        </text>

        {/* the wind */}
        <g stroke={c.faint} strokeWidth={1.2} fill="none" strokeOpacity={0.7}>
          <path d="M20,58 q 40,-8 80,0" markerEnd="url(#soh-wind)" />
          <path d="M20,74 q 50,-8 96,0" markerEnd="url(#soh-wind)" />
          <path d="M20,92 q 40,-8 78,0" markerEnd="url(#soh-wind)" />
        </g>
        <text x={28} y={50} fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          the storm
        </text>

        {/* ground */}
        <line x1={36} y1={196} x2={244} y2={196} stroke={c.line2} strokeWidth={1} />

        {/* the supple reed, bent far over with the wind, intact */}
        <path d="M84,196 C 86,150 96,120 132,108" fill="none" stroke={c.teal} strokeWidth={2.6} strokeLinecap="round" />
        <path d="M132,108 q 18,-6 30,4" fill="none" stroke={c.teal} strokeWidth={1.6} strokeLinecap="round" />
        <path d="M120,118 q 16,-10 30,-4" fill="none" stroke={c.teal} strokeWidth={1.4} strokeOpacity={0.7} strokeLinecap="round" />
        <text x={96} y={214} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.teal}>
          the reed bends
        </text>

        {/* the rigid branch, snapped */}
        <path d="M198,196 L198,150" stroke={c.faint} strokeWidth={3} strokeLinecap="butt" />
        {/* break gap, then the broken-off top fallen aside */}
        <path d="M199,150 L206,142" stroke={c.faint} strokeWidth={3} strokeLinecap="butt" />
        <path d="M212,150 L240,140" stroke={c.faint} strokeWidth={3} strokeLinecap="round" strokeOpacity={0.8} />
        <text x={210} y={132} fontFamily={monoFamily} fontSize={9} fill={c.coral}>
          snap
        </text>
        <text x={202} y={214} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          the rigid breaks
        </text>

        {/* ---- RIGHT: what yields, wears it down (ch.78) ---- */}
        <text x={296} y={32} fontFamily={monoFamily} fontSize={11} fontWeight={600} fill={c.teal}>
          what yields, prevails
        </text>

        {/* falling drops */}
        <g fill={c.teal}>
          <ellipse cx={392} cy={54} rx={3} ry={5} />
          <ellipse cx={392} cy={76} rx={2.6} ry={4.4} fillOpacity={0.7} />
          <ellipse cx={392} cy={96} rx={2.2} ry={3.8} fillOpacity={0.45} />
        </g>
        <text x={406} y={58} fontFamily={monoFamily} fontSize={9.5} fill={c.teal}>
          the soft drop
        </text>

        {/* the stone block */}
        <path d="M320,118 L470,118 L470,200 L320,200 Z" fill={c.panel2} stroke={c.faint} strokeWidth={1.4} />
        {/* texture cracks */}
        <path d="M334,150 L348,150 M438,168 L454,168" stroke={c.faint} strokeWidth={1} strokeOpacity={0.5} />
        {/* the channel worn down through it */}
        <path
          d="M392,118 C 388,140 396,150 391,168 C 387,182 393,192 391,200"
          fill="none"
          stroke={c.teal}
          strokeWidth={5}
          strokeOpacity={0.85}
          strokeLinecap="round"
        />
        <text x={395} y={216} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          the hardest stone
        </text>
        <text x={448} y={138} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.teal}>
          worn through
        </text>
      </svg>
    </Figure>
  );
}
