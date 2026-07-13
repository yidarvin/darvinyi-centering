import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';

/**
 * fig_16.2, the sustainable dose. Two schematic curves and their product, not
 * measured data. The benefit of a single session rises fast and then
 * saturates: the first few minutes buy most of the calm, and more buys less
 * and less. The odds you keep it up fall as the daily ask grows: a big plan is
 * a plan you quit. What you actually get over weeks is the two multiplied
 * together, and that product peaks not at the most you could do, and not at
 * the bare threshold either, but at the point that best trades per-session
 * benefit against the odds of sticking with it. That peak, not a minimum
 * threshold, is what the figure marks.
 */

const VW = 600;
const VH = 300;
const X0 = 60;
const X1 = 560;
const Y_BASE = 250;
const Y_TOP = 50;

const x = (t: number) => X0 + t * (X1 - X0);
const y = (v: number) => Y_BASE - v * (Y_BASE - Y_TOP);

// benefit per session: saturating, diminishing returns
const benefit = (t: number) => 1 - Math.exp(-4 * t);
// adherence: the odds you keep it up, falling as the dose grows
const adherence = (t: number) => Math.exp(-2.3 * t);
// what you actually get over weeks: the product
const realized = (t: number) => benefit(t) * adherence(t);

const N = 64;
const ts = Array.from({ length: N + 1 }, (_, i) => i / N);

function path(fn: (t: number) => number) {
  return ts.map((t) => `${x(t).toFixed(1)},${y(fn(t)).toFixed(1)}`).join(' ');
}

// peak of the realized curve, found from the closed form (6.3 e^-4t = 2.3)
const T_PEAK = -Math.log(2.3 / 6.3) / 4; // ~0.252

export function MinimumDoseFigure() {
  const peakX = x(T_PEAK);
  const peakY = y(realized(T_PEAK));

  return (
    <Figure
      caption="fig_16.2 · the_sustainable_dose: where benefit times adherence peaks"
      sub="Benefit per session saturates fast, so the first few minutes carry most of the gain. The odds you keep it up fall as the daily ask grows. What you actually get is the two multiplied, and it peaks at a small, sustainable dose, well left of the most you could do. The curves are schematic, drawn to show the shape of the tradeoff, not measured data."
      max={600}
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        role="img"
        aria-label="A schematic plot of dose against benefit. The benefit of one session rises and saturates. The probability of sticking with it falls as the dose grows. Their product, what you actually get over time, peaks at a small dose, far to the left of the maximum: not the bare minimum that works, but the sustainable dose that best trades benefit against the odds of keeping it up."
        style={{ display: 'block' }}
      >
        {/* axes */}
        <line x1={X0} y1={Y_BASE} x2={X1 + 4} y2={Y_BASE} stroke={c.line2} strokeWidth={1.5} />
        <line x1={X0} y1={Y_BASE} x2={X0} y2={Y_TOP - 6} stroke={c.line2} strokeWidth={1.5} />
        <text x={X0 - 8} y={Y_TOP + 2} textAnchor="end" style={{ ...mono, fontSize: 10 }} fill={c.faint}>
          more
        </text>
        <text x={X0 - 8} y={Y_BASE} textAnchor="end" style={{ ...mono, fontSize: 10 }} fill={c.faint}>
          none
        </text>
        <text x={X0} y={Y_BASE + 22} textAnchor="start" style={{ ...mono, fontSize: 10 }} fill={c.faint}>
          tiny
        </text>
        <text x={X1} y={Y_BASE + 22} textAnchor="end" style={{ ...mono, fontSize: 10 }} fill={c.faint}>
          a lot
        </text>
        <text x={(X0 + X1) / 2} y={Y_BASE + 38} textAnchor="middle" style={{ ...mono, fontSize: 11 }} fill={c.muted}>
          dose: the time and effort you ask of yourself each day
        </text>

        {/* benefit per session (saturating) */}
        <polyline points={path(benefit)} fill="none" stroke={c.sky} strokeWidth={2} strokeOpacity={0.6} strokeDasharray="5 4" />
        <text x={X1 - 4} y={y(benefit(1)) - 8} textAnchor="end" style={{ ...mono, fontSize: 10.5 }} fill={c.sky}>
          benefit per session
        </text>

        {/* adherence (falling) */}
        <polyline points={path(adherence)} fill="none" stroke={c.amber} strokeWidth={2} strokeOpacity={0.6} strokeDasharray="5 4" />
        <text x={X1 - 4} y={y(adherence(1)) - 8} textAnchor="end" style={{ ...mono, fontSize: 10.5 }} fill={c.amber}>
          odds you keep it up
        </text>

        {/* realized = the product (the hero curve) */}
        <polyline points={path(realized)} fill="none" stroke={c.teal} strokeWidth={3} />
        <text x={x(0.62)} y={y(realized(0.62)) - 12} textAnchor="middle" style={{ ...mono, fontSize: 10.5, fontWeight: 600 }} fill={c.teal}>
          what you actually get
        </text>

        {/* the peak: minimum effective dose */}
        <line x1={peakX} y1={Y_BASE} x2={peakX} y2={peakY} stroke={c.teal} strokeWidth={1} strokeDasharray="3 3" strokeOpacity={0.7} />
        <circle cx={peakX} cy={peakY} r={5} fill={c.teal} />
        <circle cx={peakX} cy={peakY} r={9} fill="none" stroke={c.teal} strokeOpacity={0.35} strokeWidth={1.5} />
        <text x={peakX + 12} y={peakY - 10} textAnchor="start" style={{ ...mono, fontSize: 11, fontWeight: 600 }} fill={c.text}>
          the sustainable dose
        </text>
        <text x={peakX + 12} y={peakY + 4} textAnchor="start" style={{ ...mono, fontSize: 10 }} fill={c.muted}>
          the one you will actually keep
        </text>

        {/* the far-right warning */}
        <text x={X1 - 4} y={Y_BASE - 10} textAnchor="end" style={{ ...mono, fontSize: 10 }} fill={c.faint}>
          the heroic plan you quit in a week
        </text>
      </svg>
    </Figure>
  );
}
