import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_06.2a: resistance as a multiplier on pain. The modern meditation teacher
 * Shinzen Young compresses the second-arrow teaching into a formula: suffering =
 * pain x resistance. The figure holds pain fixed (the coral baseline, the first
 * arrow, which never moves) and lets resistance grow along the x axis. The teal
 * line is the total: where resistance is near zero the total sits right on the
 * pain line (one arrow), and the amber wedge above it is everything resistance
 * multiplies in (the second arrow). The formula is Young's, a modern shorthand,
 * not a line from the canon. The teaching it compresses is the Sallatha Sutta's.
 */
export function ResistanceMultiplierFigure() {
  // geometry
  const x0 = 52;
  const x1 = 462;
  const yBase = 232; // axis
  const painY = 176; // the fixed first-arrow line
  const topY = 44; // total at maximum resistance

  return (
    <Figure
      caption="fig_06.2a · pain_times_resistance"
      sub="suffering = pain x resistance, a modern shorthand from the meditation teacher Shinzen Young, not a line from the canon. it compresses the two arrows: the pain (coral) holds steady no matter what, and the suffering you feel (teal) is that pain multiplied by how hard you push against it. turn resistance toward zero and the total drops back onto the pain line. the first arrow remains. the second goes quiet."
      max={540}
    >
      <svg
        viewBox="0 0 500 270"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A graph of suffering against resistance. A flat coral dashed line marks pain, held constant, the first arrow. A teal line starts on the pain line where resistance is none and rises steeply as resistance grows. The amber area between the pain line and the rising teal line is the second arrow, the suffering that resistance multiplies in. Where resistance is near zero, the total rests on the pain line: one arrow, not two."
      >
        {/* axes */}
        <line x1={x0} y1={28} x2={x0} y2={yBase} stroke={c.line2} strokeWidth={1} />
        <line x1={x0} y1={yBase} x2={x1 + 6} y2={yBase} stroke={c.line2} strokeWidth={1} />

        {/* the second-arrow wedge: between the pain line and the total line */}
        <path d={`M${x0},${painY} L${x1},${topY} L${x1},${painY} Z`} fill={c.amberFog} stroke="none" />

        {/* the pain region (first arrow), under the fixed line */}
        <rect x={x0} y={painY} width={x1 - x0} height={yBase - painY} fill={c.coralFog} />

        {/* the fixed pain line: the first arrow, never moves */}
        <line x1={x0} y1={painY} x2={x1} y2={painY} stroke={c.coral} strokeWidth={1.8} strokeDasharray="5 4" />

        {/* the total: pain x resistance, rising from the pain line */}
        <line x1={x0} y1={painY} x2={x1} y2={topY} stroke={c.teal} strokeWidth={2.6} />
        <circle cx={x0} cy={painY} r={4.5} fill={c.teal} />

        {/* labels: pain line */}
        <text x={x0 + 8} y={painY - 8} fontFamily={monoFamily} fontSize={10.5} fontWeight={600} fill={c.coral}>
          pain · the first arrow
        </text>
        <text x={x0 + 8} y={yBase - 9} fontFamily={monoFamily} fontSize={9} fill={c.coral} fillOpacity={0.85}>
          held fixed · always felt
        </text>

        {/* label: the wedge */}
        <text x={x1 - 8} y={topY + 60} textAnchor="end" fontFamily={monoFamily} fontSize={10.5} fontWeight={600} fill={c.amber}>
          the second arrow
        </text>
        <text x={x1 - 8} y={topY + 73} textAnchor="end" fontFamily={monoFamily} fontSize={9} fill={c.amber} fillOpacity={0.9}>
          what resistance multiplies in
        </text>

        {/* total label near the line */}
        <text x={x1 - 150} y={topY + 6} textAnchor="start" fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.teal}>
          suffering felt
        </text>

        {/* one-arrow marker at the origin of the total */}
        <text x={x0 + 8} y={painY + 16} fontFamily={monoFamily} fontSize={8.5} fill={c.teal}>
          one arrow here
        </text>

        {/* x axis labels */}
        <text x={x0} y={yBase + 16} textAnchor="start" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          none
        </text>
        <text x={(x0 + x1) / 2} y={yBase + 16} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          resistance →
        </text>
        <text x={x1} y={yBase + 16} textAnchor="end" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          fighting it hard
        </text>
      </svg>
    </Figure>
  );
}
