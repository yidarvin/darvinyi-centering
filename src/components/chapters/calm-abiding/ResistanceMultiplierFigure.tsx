import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_06.2a: resistance as a multiplier on pain. The modern meditation teacher
 * Shinzen Young compresses the second-arrow teaching into a formula: suffering =
 * pain x resistance. The figure holds pain fixed (the coral baseline, the first
 * arrow, which never moves) and lets resistance grow along the x axis. The teal
 * line is the total, everything felt: pain plus the suffering resistance adds on
 * top. Where resistance is near zero the total sits right on the pain line (one
 * arrow), and the amber wedge above it is the suffering itself, the second arrow,
 * pain times resistance. The formula is Young's, a modern shorthand, not a line
 * from the canon. The teaching it compresses is the Sallatha Sutta's.
 *
 * Legibility pass: the on-chart callouts from the original layout (label plus a
 * sub-line, nested inside the amber wedge) could not grow to a legible size
 * without spilling outside the wedge they were meant to sit in, since the wedge
 * is narrow everywhere except right at its tall edge. Redesigned as chart-on-top,
 * legend-below: the chart carries only the axis and a short in-context marker
 * ("one arrow here"), and a color-keyed legend underneath names pain, suffering,
 * and the total at a size that never has to fit inside a shrinking triangle.
 * Same lines, same wedge, same axis, same relationship. Only the labeling moved.
 */
export function ResistanceMultiplierFigure() {
  // geometry
  const x0 = 40;
  const x1 = 296;
  const topY = 66; // total at maximum resistance (top of the total line, at x1)
  const painY = 172; // the fixed first-arrow line
  const yBase = 214; // axis baseline

  return (
    <Figure
      caption="fig_06.2a · pain_times_resistance"
      sub="suffering = pain x resistance, a modern shorthand from the meditation teacher Shinzen Young, not a line from the canon. the coral floor is the pain itself, the first arrow, and it holds steady no matter what. the teal line above it is the total, everything you feel: pain plus the suffering resistance adds on top, the amber wedge, pain times resistance. turn resistance toward zero and the wedge collapses, and the total drops back onto the pain line. the first arrow remains. the second goes quiet."
      max={440}
    >
      <svg
        viewBox="0 0 320 380"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A graph of suffering against resistance, with a legend below. A flat coral dashed line marks pain, held constant, the first arrow. A teal line, the total of everything felt, starts on the pain line where resistance is none and rises steeply as resistance grows. The amber area between the pain line and the rising teal line is the suffering itself, the second arrow, the amount resistance multiplies in. Where resistance is near zero, the total rests on the pain line: one arrow, not two. The legend below the axis labels each line and region by color: pain, the first arrow; suffering, the second arrow; total, everything felt."
      >
        {/* the core equation, stated once, up top */}
        <text x={160} y={26} textAnchor="middle" fontFamily={monoFamily} fontSize={15} fontWeight={700} fill={c.text}>
          suffering = pain × resistance
        </text>

        {/* axes */}
        <line x1={x0} y1={42} x2={x0} y2={yBase} stroke={c.line2} strokeWidth={1} />
        <line x1={x0} y1={yBase} x2={x1 + 6} y2={yBase} stroke={c.line2} strokeWidth={1} />

        {/* the second-arrow wedge: between the pain line and the total line */}
        <path d={`M${x0},${painY} L${x1},${topY} L${x1},${painY} Z`} fill={c.amberFog} stroke="none" />

        {/* the pain region (first arrow), under the fixed line */}
        <rect x={x0} y={painY} width={x1 - x0} height={yBase - painY} fill={c.coralFog} />

        {/* the fixed pain line: the first arrow, never moves */}
        <line x1={x0} y1={painY} x2={x1} y2={painY} stroke={c.coral} strokeWidth={1.8} strokeDasharray="5 4" />

        {/* the total: pain x resistance, rising from the pain line */}
        <line x1={x0} y1={painY} x2={x1} y2={topY} stroke={c.teal} strokeWidth={2.6} />
        <circle cx={x0} cy={painY} r={5.5} fill={c.teal} />

        {/* one in-context marker: where resistance is near zero, only one arrow */}
        <text x={x0 + 8} y={painY + 22} fontFamily={monoFamily} fontSize={13} fill={c.teal}>
          one arrow here
        </text>

        {/* x axis labels, two rows so the endpoints never crowd the title */}
        <text x={x0} y={yBase + 22} textAnchor="start" fontFamily={monoFamily} fontSize={13} fill={c.faint}>
          none
        </text>
        <text x={x1} y={yBase + 22} textAnchor="end" fontFamily={monoFamily} fontSize={13} fill={c.faint}>
          fighting it
        </text>
        <text x={(x0 + x1) / 2} y={yBase + 46} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.faint}>
          resistance →
        </text>

        {/* legend: color-keyed, stacked, plenty of room, nothing crammed inside the wedge */}
        <line x1={x0} y1={289} x2={x0 + 16} y2={289} stroke={c.coral} strokeWidth={2} strokeDasharray="4 3" />
        <text x={x0 + 24} y={294} fontFamily={monoFamily} fontSize={14} fontWeight={600} fill={c.coral}>
          pain · the first arrow
        </text>

        <rect x={x0} y={313} width={16} height={12} fill={c.amberFog} stroke={c.amber} strokeWidth={1} />
        <text x={x0 + 24} y={324} fontFamily={monoFamily} fontSize={14} fontWeight={600} fill={c.amber}>
          suffering · the second arrow
        </text>

        <line x1={x0} y1={349} x2={x0 + 16} y2={349} stroke={c.teal} strokeWidth={2.6} />
        <circle cx={x0 + 8} cy={349} r={3} fill={c.teal} />
        <text x={x0 + 24} y={354} fontFamily={monoFamily} fontSize={14} fontWeight={600} fill={c.teal}>
          total · everything felt
        </text>
      </svg>
    </Figure>
  );
}
