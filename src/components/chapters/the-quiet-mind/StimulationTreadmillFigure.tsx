import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// plot geometry
const X0 = 46;
const X1 = 446;
const BASE_Y_0 = 184; // where the set point starts
const BASE_SHIFT = 6; // a small permanent uptick in the baseline after each event: adaptation is real, but not total
const PEAK_Y = 86; // the height of a fresh pleasure
const AXIS_Y = 204;
const AXIS_TOP = 70;

const EVENTS = [
  { x: 120, label: 'a new thing', row: 'high' as const },
  { x: 248, label: 'something better', row: 'low' as const },
  { x: 372, label: 'the next hit', row: 'high' as const },
];

// the baseline itself, stepping up a little after each event rather than
// sitting dead flat: most of the gain fades, a small residue does not
function baselineAt(x: number): number {
  let y = BASE_Y_0;
  for (const e of EVENTS) if (x > e.x) y -= BASE_SHIFT;
  return y;
}

// a sharp rise into each peak, then an exponential fade back to the (slightly
// higher, now) baseline
function contrib(x: number, px: number): number {
  return x <= px ? Math.exp(-(px - x) / 9) : Math.exp(-(x - px) / 34);
}
function peakAt(x: number): number {
  let v = 0.05;
  for (const e of EVENTS) v = Math.max(v, contrib(x, e.x));
  return v;
}

function buildCurve(): string {
  const pts: string[] = [];
  for (let x = X0; x <= X1; x += 3.5) {
    const v = peakAt(x);
    const y = baselineAt(x) - v * (BASE_Y_0 - PEAK_Y);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(' ');
}

// the dashed baseline reference, drawn as small steps rather than one flat line
function buildBaseline(): string {
  const pts: { x: number; y: number }[] = [{ x: X0, y: baselineAt(X0) }];
  for (const e of EVENTS) {
    pts.push({ x: e.x, y: baselineAt(e.x - 0.01) });
    pts.push({ x: e.x, y: baselineAt(e.x + 0.01) });
  }
  pts.push({ x: X1, y: baselineAt(X1) });
  return pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

// event labels sit in one of two staggered rows above the peaks (a "high" row
// for the first and third events, a "low" row for the middle one) so that at
// a readable font size the three labels have room to breathe without the
// wider middle label colliding with its neighbors
const ROW_HIGH_Y = 24;
const ROW_LOW_Y = 66;
const LEADER_HIGH_Y0 = 28.4;
const LEADER_LOW_Y0 = 70.4;
const LEADER_Y1 = 83;

/**
 * fig_03.2a: the stimulation treadmill. Each new pleasure spikes how good things
 * feel, then hedonic adaptation pulls the feeling back toward baseline. To get
 * the spike again you reach for something bigger. The set point is not a fixed
 * point, though: it steps up a little after each event and never fully returns,
 * the small permanent residue the chapter's own honesty about adaptation calls
 * for. You run faster to stay in roughly, not exactly, the same place.
 */
export function StimulationTreadmillFigure() {
  const curve = buildCurve();
  const baseline = buildBaseline();
  return (
    <Figure
      caption="fig_03.2a · the_stimulation_treadmill"
      sub="each new pleasure spikes, then fades back to baseline (hedonic adaptation), so you reach for a bigger one. adaptation is real but not total: some joys and some losses you adapt to slowly, or never."
      max={500}
    >
      <svg
        viewBox="0 0 500 236"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A line of how good things feel over time. It spikes sharply at each of three pleasures (a new thing, something better, the next hit), labeled above the chart with a leader line down to each spike, and each time fades back down toward a baseline that itself steps up a little after each event, never fully returning to where it started. The inputs escalate while the baseline drifts only slightly."
      >
        <defs>
          <marker id="st-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>

        {/* axes */}
        <line x1={X0} y1={AXIS_TOP} x2={X0} y2={AXIS_Y} stroke={c.line2} strokeWidth={1} />
        <line x1={X0} y1={AXIS_Y} x2={X1 + 14} y2={AXIS_Y} stroke={c.line2} strokeWidth={1} markerEnd="url(#st-arrow)" />
        <text x={460} y={224} textAnchor="middle" fontFamily={monoFamily} fontSize={21} fill={c.faint}>
          time
        </text>
        <text
          x={16}
          y={122}
          fontFamily={monoFamily}
          fontSize={21}
          fill={c.faint}
          transform="rotate(-90 16 122)"
          textAnchor="middle"
        >
          pleasure
        </text>

        {/* the set point: dashed, stepping up a little after each event, not perfectly fixed */}
        <polyline points={baseline} fill="none" stroke={c.muted} strokeWidth={1} strokeDasharray="4 4" strokeOpacity={0.7} />
        <text x={440} y={198} textAnchor="end" fontFamily={monoFamily} fontSize={21} fill={c.muted}>
          baseline: drifts, never resets
        </text>

        {/* the felt-good curve */}
        <polyline points={curve} fill="none" stroke={c.teal} strokeWidth={2} strokeLinejoin="round" />

        {/* the escalating inputs: label in a staggered row above the chart, a thin
            leader line down to the actual spike, so wider labels never collide */}
        {EVENTS.map((e, i) => {
          const labelY = e.row === 'high' ? ROW_HIGH_Y : ROW_LOW_Y;
          const leaderY0 = e.row === 'high' ? LEADER_HIGH_Y0 : LEADER_LOW_Y0;
          return (
            <g key={i}>
              <line
                x1={e.x}
                y1={leaderY0}
                x2={e.x}
                y2={LEADER_Y1}
                stroke={c.faint}
                strokeWidth={1}
                strokeDasharray="2 3"
              />
              <circle cx={e.x} cy={PEAK_Y} r={3} fill={c.teal} />
              <text x={e.x} y={labelY} textAnchor="middle" fontFamily={monoFamily} fontSize={22} fill={c.text}>
                {e.label}
              </text>
            </g>
          );
        })}

        {/* the fade-back, called out once, well clear of the baseline caption below */}
        <text x={175} y={122} textAnchor="middle" fontFamily={monoFamily} fontSize={21} fill={c.faint}>
          fades back ↓
        </text>
      </svg>
    </Figure>
  );
}
