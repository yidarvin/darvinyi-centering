import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

const CX = 232;
const CY = 156;
const RX = 150;
const RY = 108;

function pt(angleDeg: number) {
  const r = (angleDeg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(r), y: CY + RY * Math.sin(r) };
}

/** nodes clockwise from the top: each feeds the next, and the loop closes on itself */
const NODES = [
  { angle: 270, lines: ['a slow exhale'] },
  { angle: 360, lines: ['the vagal brake', 'engages'] },
  { angle: 450, lines: ['heart and body', 'settle'] },
  { angle: 540, lines: ['the next breath', 'slows on its own'] },
];

/**
 * fig_02.4a: the relaxation loop. Herbert Benson's relaxation response runs as a
 * self-reinforcing cycle. A slow exhale engages the vagal brake, the body settles,
 * the next breath comes easier and slower, and that deeper exhale leans on the
 * brake again. It is a positive feedback loop pointed at calm instead of alarm.
 */
export function RelaxationLoopFigure() {
  // arc arrows along the ellipse, from just after one node to just before the next
  const margin = 26;
  const arrows = NODES.map((n, i) => {
    const next = NODES[(i + 1) % NODES.length].angle + (i === NODES.length - 1 ? 360 : 0);
    const a = n.angle + margin;
    const b = next - margin;
    const s = pt(a);
    const e = pt(b);
    return { d: `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${RX} ${RY} 0 0 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}` };
  });

  return (
    <Figure
      caption="fig_02.4a · the_relaxation_loop"
      sub="the relaxation response feeds itself. a long exhale pulls the brake, the body quiets, the next breath deepens on its own, and that breath pulls the brake again. the same loop that runs toward panic, run the other way."
      max={460}
    >
      <svg
        viewBox="0 0 464 312"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A four-step loop. A slow exhale engages the vagal brake. The brake settles the heart and body. The settled body lets the next breath slow on its own. That slower breath engages the brake again, closing the loop toward calm."
      >
        <defs>
          <marker id="rl-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke={c.teal} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* the connecting arcs */}
        {arrows.map((a, i) => (
          <path key={i} d={a.d} fill="none" stroke={c.tealEdge} strokeWidth={1.6} markerEnd="url(#rl-arrow)" />
        ))}

        {/* center label */}
        <text x={CX} y={CY - 7} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.tealDim}>
          the relaxation
        </text>
        <text x={CX} y={CY + 9} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.tealDim}>
          response
        </text>

        {/* nodes */}
        {NODES.map((n, i) => {
          const p = pt(n.angle);
          const w = 132;
          const h = n.lines.length > 1 ? 46 : 34;
          const first = i === 0;
          return (
            <g key={i}>
              <rect
                x={p.x - w / 2}
                y={p.y - h / 2}
                width={w}
                height={h}
                rx={9}
                fill={first ? c.tealFog : c.panel2}
                stroke={first ? c.tealEdge : c.line2}
              />
              {n.lines.map((line, li) => (
                <text
                  key={li}
                  x={p.x}
                  y={p.y + (n.lines.length > 1 ? -3 + li * 16 : 4)}
                  textAnchor="middle"
                  fontFamily={monoFamily}
                  fontSize={11}
                  fill={first ? c.teal : c.text}
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
