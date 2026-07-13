import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

const F = 14; // shared text size for the title and every node label
const CX = 160;
const BOX_W = 190;
const BOX_RIGHT = CX + BOX_W / 2;

/**
 * the loop, top to bottom: each box feeds the next, and the last arrow bows back
 * up the right side to close the loop on the first box again.
 */
const BOXES = [
  { y: 98, h: 44, lines: ['a slow exhale'] },
  { y: 186, h: 60, lines: ['the vagal brake', 'engages'] },
  { y: 282, h: 60, lines: ['heart and body', 'settle'] },
  { y: 378, h: 60, lines: ['the next breath', 'slows on its own'] },
];

/** vertical offset of a text line from its box's center, tuned per line count */
function lineY(box: (typeof BOXES)[number], li: number) {
  if (box.lines.length === 1) return box.y + 5;
  return box.y + (li === 0 ? -4 : 16);
}

/**
 * fig_02.4a: the relaxation loop. Herbert Benson's relaxation response runs as a
 * self-reinforcing cycle. A slow exhale engages the vagal brake, the body settles,
 * the next breath comes easier and slower, and that deeper exhale leans on the
 * brake again. It is a positive feedback loop pointed at calm instead of alarm.
 */
export function RelaxationLoopFigure() {
  // three straight arrows carry the loop down the stack, one at a time
  const downArrows = BOXES.slice(0, -1).map((box, i) => {
    const next = BOXES[i + 1];
    const y0 = box.y + box.h / 2;
    const y1 = next.y - next.h / 2;
    return `M ${CX} ${y0} L ${CX} ${y1}`;
  });

  // the fourth arrow bows out to the right and back up, closing the loop on box one
  const first = BOXES[0];
  const last = BOXES[BOXES.length - 1];
  const bow = BOX_RIGHT + 41;
  const returnArrow = `M ${BOX_RIGHT} ${last.y} C ${bow} ${last.y} ${bow} ${first.y} ${BOX_RIGHT} ${first.y}`;

  return (
    <Figure
      caption="fig_02.4a · the_relaxation_loop"
      sub="the relaxation response feeds itself. a long exhale pulls the brake, the body quiets, the next breath deepens on its own, and that breath pulls the brake again. the same loop that runs toward panic, run the other way."
      max={330}
    >
      <svg
        viewBox="0 0 320 440"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A four-step loop. A slow exhale engages the vagal brake. The brake settles the heart and body. The settled body lets the next breath slow on its own. That slower breath engages the brake again, closing the loop toward calm."
      >
        <defs>
          <marker id="rl-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke={c.teal} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* the three arrows that carry the loop down the stack */}
        {downArrows.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={c.tealEdge} strokeWidth={1.6} markerEnd="url(#rl-arrow)" />
        ))}

        {/* the fourth arrow, bowing back up the right side to close the loop */}
        <path d={returnArrow} fill="none" stroke={c.tealEdge} strokeWidth={1.6} markerEnd="url(#rl-arrow)" />

        {/* title */}
        <text x={CX} y={40} textAnchor="middle" fontFamily={monoFamily} fontSize={F} fill={c.tealDim}>
          the relaxation response
        </text>

        {/* nodes */}
        {BOXES.map((box, i) => {
          const isFirst = i === 0;
          return (
            <g key={i}>
              <rect
                x={CX - BOX_W / 2}
                y={box.y - box.h / 2}
                width={BOX_W}
                height={box.h}
                rx={9}
                fill={isFirst ? c.tealFog : c.panel2}
                stroke={isFirst ? c.tealEdge : c.line2}
              />
              {box.lines.map((line, li) => (
                <text
                  key={li}
                  x={CX}
                  y={lineY(box, li)}
                  textAnchor="middle"
                  fontFamily={monoFamily}
                  fontSize={F}
                  fill={isFirst ? c.teal : c.text}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
