import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// the four stations of the default loop, clockwise from the top
const NODES = [
  { x: 240, y: 40, label: 'on the task', col: c.teal },
  { x: 360, y: 160, label: 'attention slips', col: c.muted },
  { x: 240, y: 280, label: 'past, future, self', col: c.violet },
  { x: 120, y: 160, label: 'minutes pass', col: c.muted },
];

// arcs between node edges, center (240,160) r=120, clockwise
const ARCS = [
  'M 273.1 44.6 A 120 120 0 0 1 355.4 126.9',
  'M 355.4 193.1 A 120 120 0 0 1 273.1 275.4',
  'M 206.9 275.4 A 120 120 0 0 1 124.6 193.1',
  'M 124.6 126.9 A 120 120 0 0 1 206.9 44.6',
];

/**
 * fig_03.1a: the wandering-mind loop. Left to its own devices the brain does not
 * rest on a task. It falls into the default mode network, a self-referential
 * circuit of past, future, and self, and the loop sustains itself. The one
 * trained move is the teal exit: notice the drift, return attention to the task.
 */
export function WanderingMindFigure() {
  return (
    <Figure
      caption="fig_03.1a · the_wandering_mind"
      sub="left alone, attention drifts into self-referential thought (the default mode network), and the loop sustains itself. what you train is the return: noticing the drift and coming back."
      max={460}
    >
      <svg
        viewBox="0 0 480 320"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A loop of four stations turning clockwise: on the task, attention slips, thoughts of past and future and self, minutes pass, and back to on the task. A teal arrow points into the first station, labeled notice and return, the one move you train."
      >
        <defs>
          <marker id="wm-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.muted} />
          </marker>
          <marker id="wm-teal" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.teal} />
          </marker>
        </defs>

        {/* the default loop: muted, self-sustaining */}
        {ARCS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={c.muted}
            strokeOpacity={0.5}
            strokeWidth={1.5}
            markerEnd="url(#wm-arrow)"
          />
        ))}

        <text x={240} y={156} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.faint}>
          the default loop
        </text>
        <text x={240} y={171} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.faint}>
          it runs on its own
        </text>

        {/* the stations */}
        {NODES.map((n, i) => (
          <g key={i}>
            <rect
              x={n.x - 66}
              y={n.y - 19}
              width={132}
              height={38}
              rx={9}
              fill={c.panel2}
              stroke={n.col}
              strokeWidth={1.4}
              strokeOpacity={0.75}
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fontFamily={monoFamily}
              fontSize={11}
              fontWeight={500}
              fill={n.col === c.muted ? c.muted : n.col}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* the trained exit: notice and return, re-aiming attention at the task */}
        <path
          d="M 392 56 C 350 36, 312 34, 282 38"
          fill="none"
          stroke={c.teal}
          strokeWidth={1.6}
          markerEnd="url(#wm-teal)"
        />
        <text x={400} y={52} textAnchor="start" fontFamily={monoFamily} fontSize={10.5} fontWeight={500} fill={c.teal}>
          notice
        </text>
        <text x={400} y={66} textAnchor="start" fontFamily={monoFamily} fontSize={10.5} fontWeight={500} fill={c.teal}>
          + return
        </text>
      </svg>
    </Figure>
  );
}
