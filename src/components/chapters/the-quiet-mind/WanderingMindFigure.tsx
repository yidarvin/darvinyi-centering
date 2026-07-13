import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// the four stations of the default loop, top to bottom. this is a straight
// chain, not a self-closing loop: on its own, attention runs from the task
// down through the default-mode stations and stops there. it never climbs
// back up to "on the task" by itself. that return only happens through the
// separate teal notice-and-return path drawn to the left.
const NODES = [
  { y: 70, label: 'on the task', col: c.teal },
  { y: 148, label: 'attention slips', col: c.muted },
  { y: 226, label: 'past, future, self', col: c.violet },
  { y: 304, label: 'minutes pass', col: c.muted },
];

const BOX_W = 170;
const BOX_H = 42;
const CX = 160; // shared x-center of the station column

/**
 * fig_03.1a: the wandering-mind loop. Left to its own devices the brain does not
 * rest on a task. It falls into the default mode network, a self-referential
 * circuit of past, future, and self, and minutes pass with no way back on its
 * own. The one trained move, drawn as the only path back to the task, is the
 * teal exit: notice the drift, return attention to the task.
 */
export function WanderingMindFigure() {
  return (
    <Figure
      caption="fig_03.1a · the_wandering_mind"
      sub="left alone, attention drifts into self-referential thought (the default mode network), and the loop sustains itself. what you train is the return: noticing the drift and coming back."
      max={320}
    >
      <svg
        viewBox="0 0 280 340"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Four stations flow top to bottom: on the task, attention slips, thoughts of past and future and self, minutes pass. This chain does not loop back to the task on its own. A separate teal arrow, labeled notice and return, curves from minutes pass back up to on the task: the one trained move, and the only way back."
      >
        <defs>
          <marker id="wm-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.muted} />
          </marker>
          <marker id="wm-teal" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.teal} />
          </marker>
        </defs>

        {/* the default chain: muted, running one way, on its own */}
        {NODES.slice(0, -1).map((n, i) => {
          const next = NODES[i + 1];
          return (
            <line
              key={i}
              x1={CX}
              y1={n.y + BOX_H / 2}
              x2={CX}
              y2={next.y - BOX_H / 2}
              stroke={c.muted}
              strokeOpacity={0.5}
              strokeWidth={1.5}
              markerEnd="url(#wm-arrow)"
            />
          );
        })}

        <text x={140} y={24} textAnchor="middle" fontFamily={monoFamily} fontSize={11.5} fill={c.faint}>
          the default loop · self-sustaining
        </text>

        {/* the stations */}
        {NODES.map((n, i) => (
          <g key={i}>
            <rect
              x={CX - BOX_W / 2}
              y={n.y - BOX_H / 2}
              width={BOX_W}
              height={BOX_H}
              rx={9}
              fill={c.panel2}
              stroke={n.col}
              strokeWidth={1.4}
              strokeOpacity={0.75}
            />
            <text
              x={CX}
              y={n.y + 4}
              textAnchor="middle"
              fontFamily={monoFamily}
              fontSize={13}
              fontWeight={500}
              fill={n.col === c.muted ? c.muted : n.col}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* the trained exit: notice and return. this is the only path back to
            the task; the automatic chain above never closes itself. routed
            up the left margin so it never crosses the station column. */}
        <path
          d="M 75 304 Q 20 304 20 284 L 20 102 Q 20 82 75 82"
          fill="none"
          stroke={c.teal}
          strokeWidth={1.8}
          markerEnd="url(#wm-teal)"
        />
        <text x={51} y={182} textAnchor="middle" fontFamily={monoFamily} fontSize={11.5} fontWeight={500} fill={c.teal}>
          notice
        </text>
        <text x={51} y={204} textAnchor="middle" fontFamily={monoFamily} fontSize={11.5} fontWeight={500} fill={c.teal}>
          return
        </text>
      </svg>
    </Figure>
  );
}
