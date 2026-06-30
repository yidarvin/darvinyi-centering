import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_02.2a: the breath-to-vagus link. Heart rate rises on the inhale and falls on
 * the exhale (respiratory sinus arrhythmia), because the vagal brake is briefly let
 * off during inspiration and reapplied during expiration. The exhale bands are
 * tinted teal: that is where the brake engages and the heart slows. This is why a
 * longer out-breath settles the body.
 */
export function BreathVagusFigure() {
  const W = 480;
  const x0 = 64;
  const x1 = 452;
  const span = x1 - x0;
  const cycles = 2.5;
  const cycleW = span / cycles;

  // breath: rises on inhale (first half), falls on exhale (second half)
  const breathMid = 64;
  const breathAmp = 30;
  // heart rate: tracks the breath, peaking on the inhale, dipping on the exhale
  const hrMid = 196;
  const hrAmp = 28;

  const N = 240;
  const breathPts: string[] = [];
  const hrPts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = x0 + (i / N) * span;
    const phase = ((x - x0) / cycleW) % 1;
    const v = 0.5 - 0.5 * Math.cos(2 * Math.PI * phase); // 0 at start, 1 mid-cycle
    breathPts.push(`${x.toFixed(1)},${(breathMid - breathAmp * (v - 0.5) * 2).toFixed(1)}`);
    // a small lag on the heart rate reads more honestly than perfect lock-step
    const hv = 0.5 - 0.5 * Math.cos(2 * Math.PI * (phase - 0.06));
    hrPts.push(`${x.toFixed(1)},${(hrMid - hrAmp * (hv - 0.5) * 2).toFixed(1)}`);
  }

  // exhale bands: the second half of each cycle
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

  return (
    <Figure
      caption="fig_02.2a · the_breath_to_vagus_link"
      sub="the heart speeds a little on every in-breath and slows on every out-breath. the exhale (teal) is when the vagal brake comes back on. a longer exhale means more time with the brake engaged, which is the whole reason slow, out-breath-weighted breathing settles you."
      max={520}
    >
      <svg
        viewBox={`0 0 ${W} 252`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two aligned traces over time. The top trace is the breath, rising on each inhale and falling on each exhale. The bottom trace is heart rate, which rises slightly during each inhale and falls during each exhale. The exhale portions are shaded, marking where the vagal brake re-engages and the heart slows."
      >
        {/* exhale bands span both lanes */}
        {bands.map((b, i) => (
          <rect key={i} x={b.x} y={28} width={b.w} height={188} fill={c.tealFog} />
        ))}

        {/* lane labels */}
        <text x={x0} y={22} fontFamily={monoFamily} fontSize={10} fill={c.muted}>
          breath
        </text>
        <text x={x0} y={150} fontFamily={monoFamily} fontSize={10} fill={c.muted}>
          heart rate
        </text>

        {/* breath baseline + curve */}
        <line x1={x0} y1={breathMid} x2={x1} y2={breathMid} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />
        <polyline points={breathPts.join(' ')} fill="none" stroke={c.sky} strokeWidth={2} strokeLinejoin="round" />

        {/* heart-rate baseline + curve */}
        <line x1={x0} y1={hrMid} x2={x1} y2={hrMid} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />
        <polyline points={hrPts.join(' ')} fill="none" stroke={c.coral} strokeWidth={2} strokeLinejoin="round" />

        {/* beats: spacing widens on the exhale */}
        {beats.map((x, i) => (
          <line key={i} x1={x} y1={hrMid + 30} x2={x} y2={hrMid + 40} stroke={c.faint} strokeWidth={1.4} />
        ))}

        {/* phase labels in the clear gap between the two lanes */}
        <text x={x0 + cycleW * 0.25} y={124} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.coral}>
          inhale
        </text>
        <text x={x0 + cycleW * 0.75} y={124} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.teal}>
          exhale · brake on
        </text>
      </svg>
    </Figure>
  );
}
