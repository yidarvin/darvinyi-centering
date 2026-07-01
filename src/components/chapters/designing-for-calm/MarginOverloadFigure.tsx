import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';

/**
 * fig_17.3, margin versus overload. Two versions of the same afternoon with the
 * same single overrun, a task that runs forty minutes long. Packed wall to wall,
 * the overrun has nowhere to go, so it shoves every task after it late: the whole
 * afternoon runs behind, and you feel it. With a buffer left in on purpose, the
 * same overrun lands in the empty space and stops there, and the tasks after it
 * start on time. Margin is not wasted time. It is the slack that keeps one delay
 * from becoming the day's delay.
 */

const VW = 430;
const H = 26;
const ROW1_Y = 44;
const ROW2_Y = 130;
const X0 = 16;
const W = 76; // task-block width, the same in both rows: same tasks, same length
const OV = 40; // the overrun, identical in both rows

function TaskBlock({
  x,
  y,
  w = W,
  fill,
  stroke,
  dash,
  label,
}: {
  x: number;
  y: number;
  w?: number;
  fill: string;
  stroke: string;
  dash?: boolean;
  label?: string;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={H}
        rx={5}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.2}
        strokeDasharray={dash ? '4 3' : undefined}
      />
      {label && (
        <text x={x + w / 2} y={y + H / 2 + 4} textAnchor="middle" style={{ ...mono, fontSize: 10 }} fill={c.faint}>
          {label}
        </text>
      )}
    </>
  );
}

export function MarginOverloadFigure() {
  const amber = c.amber;
  const amberFill = `${c.amber}22`;

  // packed row: back-to-back planned positions
  const p = [X0, X0 + W, X0 + 2 * W, X0 + 3 * W]; // 16, 92, 168, 244
  // buffered row: gaps of 18, with one 54-wide buffer after the culprit
  const g = 18;
  const buf = 54;
  const q0 = X0; // 16
  const q1 = q0 + W + g; // 110
  const q2 = q1 + W + buf; // 240
  const q3 = q2 + W + g; // 334

  return (
    <Figure
      caption="fig_17.3 · margin_vs_overload: where the overrun lands"
      sub="The same afternoon, the same one task that runs long. Packed with no slack, the overrun pushes every later task late and the whole afternoon runs behind. With a buffer left in on purpose, the overrun lands in the empty space and stops. Margin is the slack that keeps one delay from becoming the day's."
      max={VW}
    >
      <svg
        viewBox={`0 0 ${VW} ${ROW2_Y + H + 34}`}
        width="100%"
        role="img"
        aria-label="Two timelines of the same afternoon. Top, packed with no margin: a task overruns by forty minutes and, with no gaps to absorb it, every following task is shoved forty minutes late, so the afternoon runs behind. Bottom, with margin: the same overrun lands in a buffer of empty time left in on purpose, and the tasks after it start on time."
        style={{ display: 'block' }}
      >
        {/* ── Row 1: packed, no margin ─────────────────────────── */}
        <text x={X0} y={ROW1_Y - 12} style={{ ...mono, fontSize: 11, fontWeight: 600 }} fill={c.coral}>
          packed, no margin
        </text>

        {/* on-time (planned) ghosts for the tasks after the culprit */}
        <TaskBlock x={p[2]} y={ROW1_Y} fill="transparent" stroke={c.line2} dash />
        <TaskBlock x={p[3]} y={ROW1_Y} fill="transparent" stroke={c.line2} dash />

        {/* the first two tasks, on plan */}
        <TaskBlock x={p[0]} y={ROW1_Y} fill={amberFill} stroke={`${amber}88`} />
        <TaskBlock x={p[1]} y={ROW1_Y} fill={amberFill} stroke={`${amber}88`} />
        {/* the culprit's overrun */}
        <rect x={p[1] + W} y={ROW1_Y} width={OV} height={H} rx={5} fill={`${c.coral}33`} stroke={`${c.coral}99`} strokeWidth={1.2} />
        <text x={p[1] + W + OV / 2} y={ROW1_Y + H / 2 + 4} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={c.coral}>
          +40
        </text>

        {/* the shoved-late actual positions */}
        <TaskBlock x={p[2] + OV} y={ROW1_Y} fill={amberFill} stroke={`${amber}88`} />
        <TaskBlock x={p[3] + OV} y={ROW1_Y} fill={amberFill} stroke={`${amber}88`} />

        {/* shift arrows: planned -> late */}
        {[2, 3].map((i) => (
          <g key={i}>
            <line
              x1={p[i] + W / 2}
              y1={ROW1_Y + H + 8}
              x2={p[i] + OV + W / 2 - 4}
              y2={ROW1_Y + H + 8}
              stroke={c.coral}
              strokeWidth={1.2}
              strokeOpacity={0.7}
            />
            <path
              d={`M ${p[i] + OV + W / 2 - 4} ${ROW1_Y + H + 5} L ${p[i] + OV + W / 2 + 2} ${ROW1_Y + H + 8} L ${p[i] + OV + W / 2 - 4} ${ROW1_Y + H + 11} Z`}
              fill={c.coral}
              fillOpacity={0.8}
            />
          </g>
        ))}
        <text x={p[3] + OV + W + 6} y={ROW1_Y + H / 2 + 4} style={{ ...mono, fontSize: 9.5 }} fill={c.coral}>
          all late
        </text>

        {/* ── Row 2: with margin ───────────────────────────────── */}
        <text x={X0} y={ROW2_Y - 12} style={{ ...mono, fontSize: 11, fontWeight: 600 }} fill={c.teal}>
          with margin
        </text>

        {/* the buffer, drawn behind: intentional empty time */}
        <rect x={q1 + W} y={ROW2_Y - 3} width={buf} height={H + 6} rx={6} fill={c.tealFog} stroke={`${c.teal}3a`} strokeDasharray="4 3" />
        <text x={q1 + W + buf / 2} y={ROW2_Y + H + 15} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={c.tealDim}>
          buffer
        </text>

        {/* tasks with small gaps */}
        <TaskBlock x={q0} y={ROW2_Y} fill={amberFill} stroke={`${amber}88`} />
        <TaskBlock x={q1} y={ROW2_Y} fill={amberFill} stroke={`${amber}88`} />
        {/* the same overrun, landing in the buffer */}
        <rect x={q1 + W} y={ROW2_Y} width={OV} height={H} rx={5} fill={`${c.coral}33`} stroke={`${c.coral}99`} strokeWidth={1.2} />
        <text x={q1 + W + OV / 2} y={ROW2_Y + H / 2 + 4} textAnchor="middle" style={{ ...mono, fontSize: 9.5 }} fill={c.coral}>
          +40
        </text>
        {/* tasks after: unmoved, on time */}
        <TaskBlock x={q2} y={ROW2_Y} fill={amberFill} stroke={`${amber}88`} />
        <TaskBlock x={q3} y={ROW2_Y} fill={amberFill} stroke={`${amber}88`} />
        {/* on-time ticks */}
        {[q2, q3].map((x, i) => (
          <text key={i} x={x + W / 2} y={ROW2_Y - 5} textAnchor="middle" style={{ ...mono, fontSize: 9 }} fill={c.teal}>
            on time
          </text>
        ))}
      </svg>
    </Figure>
  );
}
