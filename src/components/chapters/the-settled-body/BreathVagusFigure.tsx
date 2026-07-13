import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_02.2a: the breath-to-vagus link. Heart rate rises on the inhale and falls on
 * the exhale (respiratory sinus arrhythmia), because the vagal brake is briefly let
 * off during inspiration and reapplied during expiration. The exhale bands are
 * tinted teal: that is where the brake engages and the heart slows. This is why a
 * longer out-breath settles the body.
 *
 * Layout note: the phase names ("inhale" / "exhale · brake on") used to sit inline
 * between the two lanes, positioned at a specific point along the time axis. At the
 * font size needed for phone legibility that inline placement collided across the
 * gap, so the phase key now lives in its own legend row under the chart. Nothing
 * about the encoded relationship changed: the bands still mark exactly the same
 * exhale windows, the curves still trace the same rise-on-inhale/fall-on-exhale
 * shape, and the legend still ties phase name to color exactly as the inline labels
 * did.
 */
export function BreathVagusFigure() {
  const W = 480;
  const x0 = 64;
  const x1 = 452;
  const span = x1 - x0;
  const cycles = 2.5;
  const cycleW = span / cycles;

  const FS = 21;

  // vertical layout, top to bottom, with explicit clearance between every text
  // baseline and its neighboring curve or row so nothing collides at larger type
  // PAD_TOP (14) is baked into LABEL1_Y below
  const LABEL1_Y = 34; // "breath" label baseline
  const CURVE1_TOP = 56;
  const BREATH_AMP = 30;
  const BREATH_MID = CURVE1_TOP + BREATH_AMP; // 86

  const LABEL2_Y = 156; // "heart rate" label baseline
  const CURVE2_TOP = 176;
  const HR_AMP = 28;
  const HR_MID = CURVE2_TOP + HR_AMP; // 204

  const TICK_Y1 = HR_MID + HR_AMP + 10; // 242
  const TICK_Y2 = TICK_Y1 + 14; // 256

  const LEGEND_SWATCH_Y = 296;
  const LEGEND_SWATCH_SIZE = 14;
  const LEGEND_TEXT_Y = 308;

  const BOTTOM_PAD = 22;
  const H = LEGEND_TEXT_Y + BOTTOM_PAD; // 330

  const N = 240;
  const breathPts: string[] = [];
  const hrPts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = x0 + (i / N) * span;
    const phase = ((x - x0) / cycleW) % 1;
    const v = 0.5 - 0.5 * Math.cos(2 * Math.PI * phase); // 0 at start, 1 mid-cycle
    breathPts.push(`${x.toFixed(1)},${(BREATH_MID - BREATH_AMP * (v - 0.5) * 2).toFixed(1)}`);
    // a small lag on the heart rate reads more honestly than perfect lock-step
    const hv = 0.5 - 0.5 * Math.cos(2 * Math.PI * (phase - 0.06));
    hrPts.push(`${x.toFixed(1)},${(HR_MID - HR_AMP * (hv - 0.5) * 2).toFixed(1)}`);
  }

  // exhale bands: the second half of each cycle, spanning both lanes
  const bandY = 50;
  const bandHeight = 216;
  const bands: { x: number; w: number }[] = [];
  for (let cyc = 0; cyc < Math.ceil(cycles); cyc++) {
    const bx = x0 + (cyc + 0.5) * cycleW;
    const bw = Math.min(cycleW / 2, x1 - bx);
    if (bw > 0) bands.push({ x: bx, w: bw });
  }

  // beats: denser (faster) on the inhale, sparser (slower) on the exhale
  const beatPhases = [0.0, 0.08, 0.17, 0.27, 0.38, 0.52, 0.68, 0.86];
  const beats: number[] = [];
  for (let cyc = 0; cyc < Math.ceil(cycles); cyc++) {
    for (const p of beatPhases) {
      const x = x0 + (cyc + p) * cycleW;
      if (x >= x0 && x <= x1) beats.push(x);
    }
  }

  // legend: phase name tied to its color, laid out as its own row so the labels
  // never have to compete for width with the time axis above
  const legendItem1X = x0;
  const legendText1X = legendItem1X + LEGEND_SWATCH_SIZE + 8;
  const legendItem2X = 188;
  const legendText2X = legendItem2X + LEGEND_SWATCH_SIZE + 8;

  return (
    <Figure
      caption="fig_02.2a · the_breath_to_vagus_link"
      sub="the heart speeds a little on every in-breath and slows on every out-breath. the exhale (teal) is when the vagal brake comes back on. a longer exhale means more time with the brake engaged, which is the whole reason slow, out-breath-weighted breathing settles you."
      max={480}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two aligned traces over time. The top trace is the breath, rising on each inhale and falling on each exhale. The bottom trace is heart rate, which rises slightly during each inhale and falls during each exhale. The exhale portions are shaded, marking where the vagal brake re-engages and the heart slows. A legend below the chart ties the inhale and exhale phases to their colors."
      >
        {/* exhale bands span both lanes */}
        {bands.map((b, i) => (
          <rect key={i} x={b.x} y={bandY} width={b.w} height={bandHeight} fill={c.tealFog} />
        ))}

        {/* lane labels */}
        <text x={x0} y={LABEL1_Y} fontFamily={monoFamily} fontSize={FS} fill={c.muted}>
          breath
        </text>
        <text x={x0} y={LABEL2_Y} fontFamily={monoFamily} fontSize={FS} fill={c.muted}>
          heart rate
        </text>

        {/* breath baseline + curve */}
        <line x1={x0} y1={BREATH_MID} x2={x1} y2={BREATH_MID} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />
        <polyline points={breathPts.join(' ')} fill="none" stroke={c.sky} strokeWidth={2} strokeLinejoin="round" />

        {/* heart-rate baseline + curve */}
        <line x1={x0} y1={HR_MID} x2={x1} y2={HR_MID} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />
        <polyline points={hrPts.join(' ')} fill="none" stroke={c.coral} strokeWidth={2} strokeLinejoin="round" />

        {/* beats: spacing widens on the exhale */}
        {beats.map((x, i) => (
          <line key={i} x1={x} y1={TICK_Y1} x2={x} y2={TICK_Y2} stroke={c.faint} strokeWidth={1.4} />
        ))}

        {/* phase legend: color-keyed, in its own row clear of the time axis */}
        <rect x={legendItem1X} y={LEGEND_SWATCH_Y} width={LEGEND_SWATCH_SIZE} height={LEGEND_SWATCH_SIZE} fill={c.coral} />
        <text x={legendText1X} y={LEGEND_TEXT_Y} fontFamily={monoFamily} fontSize={FS} fill={c.coral}>
          inhale
        </text>
        <rect x={legendItem2X} y={LEGEND_SWATCH_Y} width={LEGEND_SWATCH_SIZE} height={LEGEND_SWATCH_SIZE} fill={c.teal} />
        <text x={legendText2X} y={LEGEND_TEXT_Y} fontFamily={monoFamily} fontSize={FS} fill={c.teal}>
          exhale · brake on
        </text>
      </svg>
    </Figure>
  );
}
