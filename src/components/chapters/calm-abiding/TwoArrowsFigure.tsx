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
 * Two panels, stacked top-to-bottom (rather than side by side): the untrained
 * response (two arrows) above the trained one (one arrow). Stacking gives each
 * panel the full width to breathe, which is what lets the labels run at a
 * legible size on a narrow phone screen without crowding the "you" circle or
 * the arrow paths. The relationship encoded (first arrow always lands; second
 * arrow is optional and self-drawn) is unchanged from the original side-by-side
 * version.
 */
export function TwoArrowsFigure() {
  return (
    <Figure
      caption="fig_06.1a · the_two_arrows"
      sub="Sallatha Sutta (SN 36.6). the first arrow is the painful feeling itself, and it lands on everyone. the second is the one you draw and fire at yourself: the sorrow, the aversion, the wish to be anywhere else. the trained mind still feels the first arrow. it just stops shooting the second."
      max={380}
    >
      <svg
        viewBox="0 0 300 450"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels, stacked vertically. Top, the untrained response: a circle marked you is struck by a first arrow from the world, the painful feeling, and draws a second arrow that loops back into itself, the reaction. Two pains, bodily and mental. Bottom, the trained response: the same first arrow lands, but the second is never drawn. One pain, bodily only."
      >
        <defs>
          <marker id="ta-coral" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0 0 L6.5 3 L0 6 Z" fill={c.coral} />
          </marker>
          <marker id="ta-amber" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0 0 L6.5 3 L0 6 Z" fill={c.amber} />
          </marker>
        </defs>

        {/* divider between the two stacked panels */}
        <line x1={20} y1={227} x2={280} y2={227} stroke={c.line} strokeWidth={1} strokeDasharray="2 5" />

        {/* ── panel A: the untrained response (top) ─────────────────── */}
        <text x={150} y={32} textAnchor="middle" fontFamily={monoFamily} fontSize={16} fontWeight={600} fill={c.text}>
          the untrained response
        </text>

        {/* you */}
        <circle cx={95} cy={118} r={30} fill={c.panel2} stroke={c.line2} strokeWidth={1.4} />
        <text x={95} y={122} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.muted}>
          you
        </text>

        {/* first arrow: from the world, unavoidable */}
        <line x1={25} y1={90} x2={67} y2={107} stroke={c.coral} strokeWidth={2.2} markerEnd="url(#ta-coral)" />
        <text x={14} y={64} textAnchor="start" fontFamily={monoFamily} fontSize={13} fontWeight={600} fill={c.coral}>
          first arrow
        </text>
        <text x={14} y={80} textAnchor="start" fontFamily={monoFamily} fontSize={12} fill={c.coral} fillOpacity={0.85}>
          the painful feeling
        </text>

        {/* second arrow: self-shot, looping from you back into you */}
        <path
          d="M115 140 C 166 165, 170 94, 124 100"
          fill="none"
          stroke={c.amber}
          strokeWidth={2.2}
          markerEnd="url(#ta-amber)"
        />
        <text x={230} y={100} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fontWeight={600} fill={c.amber}>
          second arrow
        </text>
        <text x={230} y={116} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.amber} fillOpacity={0.85}>
          you add it
        </text>

        {/* verdict A */}
        <text x={150} y={192} textAnchor="middle" fontFamily={monoFamily} fontSize={13.5} fill={c.text}>
          two pains
        </text>
        <text x={150} y={210} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.faint}>
          bodily + mental
        </text>

        {/* ── panel B: the trained response (bottom) ────────────────── */}
        <text x={150} y={257} textAnchor="middle" fontFamily={monoFamily} fontSize={16} fontWeight={600} fill={c.text}>
          the trained response
        </text>

        {/* you */}
        <circle cx={95} cy={343} r={30} fill={c.tealFog} stroke={c.tealEdge} strokeWidth={1.4} />
        <text x={95} y={347} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.teal}>
          you
        </text>

        {/* first arrow: still lands */}
        <line x1={25} y1={315} x2={67} y2={332} stroke={c.coral} strokeWidth={2.2} markerEnd="url(#ta-coral)" />
        <text x={14} y={289} textAnchor="start" fontFamily={monoFamily} fontSize={13} fontWeight={600} fill={c.coral}>
          first arrow
        </text>
        <text x={14} y={305} textAnchor="start" fontFamily={monoFamily} fontSize={12} fill={c.coral} fillOpacity={0.85}>
          still felt, fully
        </text>

        {/* second arrow: never drawn */}
        <path
          d="M115 365 C 166 390, 170 319, 124 325"
          fill="none"
          stroke={c.faint}
          strokeWidth={1.4}
          strokeDasharray="3 5"
          strokeOpacity={0.7}
        />
        <text x={230} y={325} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.faint} fillOpacity={0.7}>
          second arrow
        </text>
        <text x={230} y={341} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.faint} fillOpacity={0.7}>
          never drawn
        </text>

        {/* verdict B */}
        <text x={150} y={417} textAnchor="middle" fontFamily={monoFamily} fontSize={13.5} fill={c.teal}>
          one pain
        </text>
        <text x={150} y={435} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.faint}>
          bodily only
        </text>
      </svg>
    </Figure>
  );
}
