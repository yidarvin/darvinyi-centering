import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_06.4a: impermanence as flowing water. The Pheṇapiṇḍūpama Sutta (SN 22.95)
 * likens the five aggregates to things with no solid core, carried on a river:
 * form is a lump of foam, feeling a bubble, perception a mirage, formations a
 * hollow plantain trunk, consciousness a conjuror's trick. The figure draws the
 * current and three of those forms arising and dissolving on it, to make anicca
 * concrete: conditioned things flow, they do not stay. (The "you cannot step in
 * the same river twice" line is Heraclitus, Greek, not the Buddha. The flowing
 * image is genuinely Buddhist. The Greek aphorism is not.)
 */
export function FlowingWaterFigure() {
  return (
    <Figure
      caption="fig_06.4a · impermanence_flows"
      sub="Pheṇapiṇḍūpama Sutta (SN 22.95): form is like a lump of foam, feeling like a bubble, perception like a mirage, all of it carried on the current and gone. anicca, the first of the three marks: every conditioned thing arises and passes. you are not watching a fixed scene. you are watching a river."
      max={540}
    >
      <svg
        viewBox="0 0 500 224"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A river flowing left to right. On its current, three transient forms each shown arising faintly, cresting, and dissolving into dashed outlines: a bubble of feeling, a lump of foam that is form, and a shimmer of perception like a mirage. Downstream arrows mark the flow. Nothing on the water stays. This is impermanence, anicca: every conditioned thing arises and passes."
      >
        <defs>
          <marker id="fw-flow" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L5.5 3 L0 6 Z" fill={c.tealDim} />
          </marker>
          <linearGradient id="fw-river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(45,212,191,0.16)" />
            <stop offset="1" stopColor="rgba(45,212,191,0.04)" />
          </linearGradient>
        </defs>

        {/* the river channel */}
        <path
          d="M8,92 C 120,74 200,110 320,92 C 400,80 460,98 492,92 L492,156 C 460,162 400,144 320,156 C 200,170 120,138 8,156 Z"
          fill="url(#fw-river)"
          stroke={c.line2}
          strokeWidth={1}
        />

        {/* current lines */}
        <path d="M30,118 C 150,104 260,132 360,118 C 420,110 460,120 482,116" fill="none" stroke={c.tealDim} strokeWidth={1} strokeOpacity={0.4} markerEnd="url(#fw-flow)" />
        <path d="M30,134 C 150,148 260,120 360,134 C 420,142 460,130 482,136" fill="none" stroke={c.tealDim} strokeWidth={1} strokeOpacity={0.3} markerEnd="url(#fw-flow)" />

        {/* form A: a bubble (feeling), at left, lifecycle arising -> cresting -> gone */}
        <circle cx={70} cy={108} r={5} fill="none" stroke={c.violet} strokeOpacity={0.45} strokeWidth={1} />
        <circle cx={104} cy={104} r={9} fill={c.violetFog} stroke={c.violet} strokeWidth={1.4} />
        <circle cx={138} cy={110} r={6} fill="none" stroke={c.violet} strokeWidth={1} strokeDasharray="2 3" strokeOpacity={0.6} />
        <text x={104} y={84} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.violet}>
          feeling
        </text>
        <text x={104} y={188} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.muted}>
          a bubble
        </text>

        {/* form B: foam (form), center */}
        <g>
          <circle cx={232} cy={106} r={6} fill={c.tealFog} stroke={c.teal} strokeWidth={1.2} />
          <circle cx={244} cy={114} r={8} fill={c.tealFog} stroke={c.teal} strokeWidth={1.4} />
          <circle cx={256} cy={104} r={5} fill={c.tealFog} stroke={c.teal} strokeWidth={1.1} />
          <circle cx={272} cy={112} r={6} fill="none" stroke={c.teal} strokeWidth={1} strokeDasharray="2 3" strokeOpacity={0.6} />
        </g>
        <text x={248} y={84} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.teal}>
          form
        </text>
        <text x={248} y={188} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.muted}>
          a lump of foam
        </text>

        {/* form C: a mirage (perception), right, shimmer */}
        <path d="M372,112 q 6,-12 12,0 q 6,12 12,0 q 6,-12 12,0" fill="none" stroke={c.amber} strokeWidth={1.4} />
        <path d="M376,122 q 6,-8 12,0 q 6,8 12,0" fill="none" stroke={c.amber} strokeWidth={1} strokeOpacity={0.5} strokeDasharray="2 3" />
        <text x={396} y={84} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.amber}>
          perception
        </text>
        <text x={396} y={188} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.muted}>
          a mirage
        </text>

        {/* anicca caption */}
        <text x={250} y={212} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.faint}>
          anicca · sabbe saṅkhārā aniccā · all conditioned things flow and pass
        </text>
      </svg>
    </Figure>
  );
}
