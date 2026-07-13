import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_06.1a: the two arrows. The Sallatha Sutta (SN 36.6, "The Dart"): when an
 * untrained person is touched by a painful feeling (vedana), they sorrow, grieve,
 * and resist, and so feel two pains, "as if struck by a second arrow." The first
 * arrow is the unavoidable painful feeling. The second is the reaction we add:
 * aversion, lamentation, the craving to flee. The trained disciple still feels the
 * first arrow (equanimity is not numbness) and does not shoot the second.
 *
 * Two panels: the untrained response (two arrows) beside the trained one (one).
 */
export function TwoArrowsFigure() {
  return (
    <Figure
      caption="fig_06.1a · the_two_arrows"
      sub="Sallatha Sutta (SN 36.6). the first arrow is the painful feeling itself, and it lands on everyone. the second is the one you draw and fire at yourself: the sorrow, the aversion, the wish to be anywhere else. the trained mind still feels the first arrow. it just stops shooting the second."
      max={540}
    >
      <svg
        viewBox="0 0 520 300"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels. Left, the untrained response: a circle marked you is struck by a first arrow from the world, the painful feeling, and by a second arrow it fires back into itself, the reaction. Two pains, bodily and mental. Right, the trained response: the same first arrow lands, but the second is never drawn. One pain, bodily only."
      >
        <defs>
          <marker id="ta-coral" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0 0 L6.5 3 L0 6 Z" fill={c.coral} />
          </marker>
          <marker id="ta-amber" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0 0 L6.5 3 L0 6 Z" fill={c.amber} />
          </marker>
        </defs>

        {/* divider */}
        <line x1={260} y1={26} x2={260} y2={282} stroke={c.line} strokeWidth={1} strokeDasharray="2 5" />

        {/* ── panel A: the untrained response ───────────────────── */}
        <text x={132} y={36} textAnchor="middle" fontFamily={monoFamily} fontSize={11.5} fontWeight={600} fill={c.text}>
          the untrained response
        </text>

        {/* you */}
        <circle cx={132} cy={172} r={27} fill={c.panel2} stroke={c.line2} strokeWidth={1.4} />
        <text x={132} y={176} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.muted}>
          you
        </text>

        {/* first arrow: from the world, unavoidable */}
        <line x1={44} y1={88} x2={110} y2={152} stroke={c.coral} strokeWidth={2.2} markerEnd="url(#ta-coral)" />
        <text x={40} y={80} textAnchor="start" fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.coral}>
          first arrow
        </text>
        <text x={40} y={92} textAnchor="start" fontFamily={monoFamily} fontSize={9.5} fill={c.coral} fillOpacity={0.85}>
          the painful feeling
        </text>

        {/* second arrow: self-shot, looping from you back into you */}
        <path
          d="M150 192 C 196 214, 206 150, 158 156"
          fill="none"
          stroke={c.amber}
          strokeWidth={2.2}
          markerEnd="url(#ta-amber)"
        />
        <text x={212} y={186} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.amber}>
          second
        </text>
        <text x={212} y={198} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.amber}>
          arrow
        </text>
        <text x={212} y={210} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.amber} fillOpacity={0.85}>
          you add it
        </text>

        {/* verdict A */}
        <text x={132} y={258} textAnchor="middle" fontFamily={monoFamily} fontSize={10.5} fill={c.text}>
          two pains
        </text>
        <text x={132} y={272} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          bodily + mental
        </text>

        {/* ── panel B: the trained response ─────────────────────── */}
        <text x={388} y={36} textAnchor="middle" fontFamily={monoFamily} fontSize={11.5} fontWeight={600} fill={c.text}>
          the trained response
        </text>

        {/* you */}
        <circle cx={388} cy={172} r={27} fill={c.tealFog} stroke={c.tealEdge} strokeWidth={1.4} />
        <text x={388} y={176} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.teal}>
          you
        </text>

        {/* first arrow: still lands */}
        <line x1={300} y1={88} x2={366} y2={152} stroke={c.coral} strokeWidth={2.2} markerEnd="url(#ta-coral)" />
        <text x={296} y={80} textAnchor="start" fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.coral}>
          first arrow
        </text>
        <text x={296} y={92} textAnchor="start" fontFamily={monoFamily} fontSize={9.5} fill={c.coral} fillOpacity={0.85}>
          still felt, fully
        </text>

        {/* second arrow: never drawn */}
        <path
          d="M406 192 C 452 214, 462 150, 414 156"
          fill="none"
          stroke={c.faint}
          strokeWidth={1.4}
          strokeDasharray="3 5"
          strokeOpacity={0.7}
        />
        <text x={468} y={186} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          never
        </text>
        <text x={468} y={198} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          drawn
        </text>

        {/* verdict B */}
        <text x={388} y={258} textAnchor="middle" fontFamily={monoFamily} fontSize={10.5} fill={c.teal}>
          one pain
        </text>
        <text x={388} y={272} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          bodily only
        </text>
      </svg>
    </Figure>
  );
}
