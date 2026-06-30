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
 */

const NODES = [
  { x: 240, y: 40, label: 'exile pain stirs', col: c.violet },
  { x: 360, y: 160, label: 'protector blends, fires', col: c.amber },
  { x: 240, y: 280, label: 'you act off-center', col: c.coral },
  { x: 120, y: 160, label: 'burden never heals', col: c.violet },
];

const ARCS = [
  'M 273.1 44.6 A 120 120 0 0 1 355.4 126.9',
  'M 355.4 193.1 A 120 120 0 0 1 273.1 275.4',
  'M 206.9 275.4 A 120 120 0 0 1 124.6 193.1',
  'M 124.6 126.9 A 120 120 0 0 1 206.9 44.6',
];

export function OffCenterLoopFigure() {
  return (
    <Figure
      caption="fig_11.4 · the_off_center_loop"
      sub="the protector keeps the exile buried, so the burden never heals, and the protector can never rest. the way out is not to win the loop. it is to step out of it: unblend, and let the Self return to the center."
      max={440}
    >
      <svg
        viewBox="0 0 480 320"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A four-step loop drawn as a circle of arrows. Exile pain stirs, the protector blends and fires, you act off-center, the burden never heals, and back to the start. A teal note off to the side points in to the cycle and reads: unblend, return to center."
      >
        <defs>
          <marker id="ocl-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.muted} />
          </marker>
          <marker id="ocl-arrow-teal" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.teal} />
          </marker>
        </defs>

        {ARCS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={c.muted} strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#ocl-arrow)" />
        ))}

        <text x={240} y={156} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11} fill={c.faint}>
          off_center
        </text>
        <text x={240} y={171} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          the Self is off the wheel
        </text>

        {NODES.map((n, i) => (
          <g key={i}>
            <rect x={n.x - 70} y={n.y - 19} width={140} height={38} rx={9} fill={c.panel2} stroke={n.col} strokeWidth={1.4} strokeOpacity={0.7} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11} fontWeight={500} fill={n.col}>
              {n.label}
            </text>
          </g>
        ))}

        <line x1={92} y1={88} x2={150} y2={104} stroke={c.teal} strokeWidth={1} strokeOpacity={0.7} markerEnd="url(#ocl-arrow-teal)" />
        <text x={70} y={70} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fontWeight={500} fill={c.teal}>
          unblend ·
        </text>
        <text x={70} y={83} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fontWeight={500} fill={c.teal}>
          return to center
        </text>
      </svg>
    </Figure>
  );
}
