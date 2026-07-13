import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// plot geometry
const X0 = 46;
const X1 = 446;
const BASE_Y_0 = 150; // where the set point starts
const BASE_SHIFT = 6; // a small permanent uptick in the baseline after each event: adaptation is real, but not total
const PEAK_Y = 52; // the height of a fresh pleasure
const AXIS_Y = 170;

const EVENTS = [
  { x: 120, label: 'a new thing' },
  { x: 248, label: 'something better' },
  { x: 372, label: 'the next hit' },
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
        viewBox="0 0 480 210"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A line of how good things feel over time. It spikes sharply at each of three pleasures (a new thing, something better, the next hit) and each time fades back down toward a baseline that itself steps up a little after each event, never fully returning to where it started. The inputs escalate while the baseline drifts only slightly."
      >
        <defs>
          <marker id="st-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>

        {/* axes */}
        <line x1={X0} y1={36} x2={X0} y2={AXIS_Y} stroke={c.line2} strokeWidth={1} />
        <line x1={X0} y1={AXIS_Y} x2={X1 + 14} y2={AXIS_Y} stroke={c.line2} strokeWidth={1} markerEnd="url(#st-arrow)" />
        <text x={X1 + 18} y={AXIS_Y + 4} fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          time
        </text>
        <text
          x={18}
          y={100}
          fontFamily={monoFamily}
          fontSize={9.5}
          fill={c.faint}
          transform="rotate(-90 18 100)"
          textAnchor="middle"
        >
          how good it feels
        </text>

        {/* the set point: dashed, stepping up a little after each event, not perfectly fixed */}
        <polyline points={baseline} fill="none" stroke={c.muted} strokeWidth={1} strokeDasharray="4 4" strokeOpacity={0.7} />
        <text x={X1} y={baselineAt(X1) + 14} textAnchor="end" fontFamily={monoFamily} fontSize={9.5} fill={c.muted}>
          baseline · drifts a little, does not fully reset
        </text>

        {/* the felt-good curve */}
        <polyline points={curve} fill="none" stroke={c.teal} strokeWidth={2} strokeLinejoin="round" />

        {/* the escalating inputs, marked at each peak */}
        {EVENTS.map((e, i) => (
          <g key={i}>
            <circle cx={e.x} cy={PEAK_Y} r={3} fill={c.teal} />
            <text x={e.x} y={PEAK_Y - 9} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.text}>
              {e.label}
            </text>
          </g>
        ))}

        {/* the fade-back, called out once */}
        <text x={175} y={120} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          fades back ↓
        </text>
      </svg>
    </Figure>
  );
}
