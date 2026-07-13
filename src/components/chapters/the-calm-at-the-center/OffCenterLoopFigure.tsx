import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_11.4 · the_off_center_loop. The self-perpetuating cycle that keeps the Self
 * off the wheel. A protector blends and fires to keep the exile buried, which
 * means the wound never heals, which means the protector can never stand down, so
 * it stays blended and you keep acting from the part instead of from the center.
 * The one exit, drawn in teal, is to unblend: step back so the Self returns to
 * lead. Concept: Schwartz, why protectors stay stuck, and unblending as the way
 * back to Self.
 *
 * Legibility redesign: the four steps used to sit at the compass points of a
 * circle, which forced small labels into small arcs. They now run down a single
 * vertical column instead, with a loop-back arrow on the right carrying "burden
 * never heals" back to "exile pain stirs" so the same cycle still reads as a
 * closed loop. The "off_center" note moved from the middle of the (former)
 * circle to a kicker above the column, and the teal "unblend" exit moved from a
 * side note to a callout beneath the loop, with its arrow still pointing back
 * into the cycle. Same four steps, same loop, same one exit -- just stacked
 * instead of circled, so every label can be read at a legible size.
 */

const CX = 118;
const BOX_W = 210;
const HALF_W = BOX_W / 2;

const NODES = [
  { y: 86, h: 44, lines: ['exile pain stirs'], col: c.violet },
  { y: 185, h: 62, lines: ['protector', 'blends, fires'], col: c.amber },
  { y: 284, h: 44, lines: ['you act off-center'], col: c.coral },
  { y: 374, h: 44, lines: ['burden never heals'], col: c.violet },
];

export function OffCenterLoopFigure() {
  return (
    <Figure
      caption="fig_11.4 · the_off_center_loop"
      sub="the protector keeps the exile buried, so the burden never heals, and the protector can never rest. the way out is not to win the loop. it is to step out of it: unblend, and let the Self return to the center."
      max={280}
    >
      <svg
        viewBox="0 0 300 480"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A four-step cycle drawn as a vertical loop, labeled off_center: the Self is off the wheel. Exile pain stirs, then the protector blends and fires, then you act off-center, then the burden never heals, and a loop-back arrow on the right carries the cycle back to the start. Below the loop, a teal arrow points back into it with the note: unblend, return to center."
      >
        <defs>
          <marker id="ocl-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.muted} />
          </marker>
          <marker id="ocl-arrow-teal" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.teal} />
          </marker>
        </defs>

        <text x={150} y={24} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
          off_center
        </text>
        <text x={150} y={42} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
          the Self is off the wheel
        </text>

        {/* down-arrows between consecutive steps */}
        <line x1={CX} y1={108} x2={CX} y2={154} stroke={c.muted} strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#ocl-arrow)" />
        <line x1={CX} y1={216} x2={CX} y2={262} stroke={c.muted} strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#ocl-arrow)" />
        <line x1={CX} y1={306} x2={CX} y2={352} stroke={c.muted} strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#ocl-arrow)" />

        {/* loop-back arrow: burden never heals, back to exile pain stirs */}
        <path
          d="M 223 374 C 280 350, 280 110, 223 86"
          fill="none"
          stroke={c.muted}
          strokeOpacity={0.5}
          strokeWidth={1.5}
          markerEnd="url(#ocl-arrow)"
        />

        {NODES.map((n, i) => (
          <g key={i}>
            <rect
              x={CX - HALF_W}
              y={n.y - n.h / 2}
              width={BOX_W}
              height={n.h}
              rx={9}
              fill={c.panel2}
              stroke={n.col}
              strokeWidth={1.4}
              strokeOpacity={0.7}
            />
            {n.lines.length === 1 ? (
              <text x={CX} y={n.y + 5} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={14} fontWeight={500} fill={n.col}>
                {n.lines[0]}
              </text>
            ) : (
              <>
                <text x={CX} y={n.y - 4} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={14} fontWeight={500} fill={n.col}>
                  {n.lines[0]}
                </text>
                <text x={CX} y={n.y + 17} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={14} fontWeight={500} fill={n.col}>
                  {n.lines[1]}
                </text>
              </>
            )}
          </g>
        ))}

        <line x1={150} y1={430} x2={204} y2={396} stroke={c.teal} strokeWidth={1.2} strokeOpacity={0.8} markerEnd="url(#ocl-arrow-teal)" />
        <text x={150} y={452} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={14} fontWeight={500} fill={c.teal}>
          unblend, return to center
        </text>
      </svg>
    </Figure>
  );
}
