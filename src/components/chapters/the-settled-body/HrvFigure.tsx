import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

const X0 = 70;
const X1 = 452;
const SPAN = X1 - X0;

function trace(mid: number, fn: (t: number) => number, n = 260): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = X0 + t * SPAN;
    pts.push(`${x.toFixed(1)},${(mid - fn(t)).toFixed(1)}`);
  }
  return pts.join(' ');
}

/**
 * fig_02.3a: heart-rate variability. The same heart, breathing two ways. Quick,
 * shallow breaths make a small, ragged wave. Slow breathing near six a minute makes
 * a large, smooth one: the breath and the heart fall into resonance and the swing
 * grows several times bigger. That amplitude is a rough window on vagal tone, not a
 * verdict on how calm you are.
 */
export function HrvFigure() {
  // shallow, quick breathing: small, irregular wobble
  const fast = trace(82, (t) => {
    const x = t * SPAN;
    return (
      9 * Math.sin(2 * Math.PI * 6.5 * t) +
      4 * Math.sin(2 * Math.PI * 11 * t + 1.1) +
      2.5 * Math.sin(2 * Math.PI * 17 * t + 0.4) +
      0.0 * x
    );
  });

  // slow breathing ~6 / min: large, clean sine (resonance)
  const slow = trace(214, (t) => 36 * Math.sin(2 * Math.PI * 2.5 * t));

  return (
    <Figure
      caption="fig_02.3a · heart_rate_variability"
      sub="the wave is real and it does track vagal activity, but it is noisy and easily confounded by posture, caffeine, sleep, and the device measuring it. read your own trend over time, gently. do not turn it into one more number to be anxious about."
      max={520}
    >
      <svg
        viewBox="0 0 480 296"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two heart-rate traces. With shallow, quick breathing the trace makes a small, ragged wave. With slow breathing near six breaths a minute the trace makes a large, smooth wave several times bigger, as the breath and heart fall into resonance."
      >
        {/* top lane: fast shallow breathing */}
        <text x={X0} y={26} fontFamily={monoFamily} fontSize={10.5} fill={c.muted}>
          shallow, quick breaths
        </text>
        <text x={X1} y={26} textAnchor="end" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          small, ragged wave
        </text>
        <line x1={X0} y1={82} x2={X1} y2={82} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />
        <polyline points={fast} fill="none" stroke={c.faint} strokeWidth={1.8} strokeLinejoin="round" />
        {/* amplitude bracket */}
        <line x1={X1 + 0} y1={73} x2={X1 + 0} y2={91} stroke={c.line2} strokeWidth={1} transform="translate(-2,0)" />

        {/* divider */}
        <line x1={X0} y1={140} x2={X1} y2={140} stroke={c.line} strokeWidth={1} />

        {/* bottom lane: slow breathing ~6 / min */}
        <text x={X0} y={170} fontFamily={monoFamily} fontSize={10.5} fill={c.teal}>
          slow breaths, ~6 / min
        </text>
        <text x={X1} y={170} textAnchor="end" fontFamily={monoFamily} fontSize={9.5} fill={c.tealDim}>
          large, smooth wave
        </text>
        <line x1={X0} y1={214} x2={X1} y2={214} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />
        <polyline points={slow} fill="none" stroke={c.teal} strokeWidth={2.2} strokeLinejoin="round" />

        {/* amplitude comparison brackets at the far left */}
        <g stroke={c.line2} strokeWidth={1}>
          <line x1={X0 - 14} y1={73} x2={X0 - 14} y2={91} />
          <line x1={X0 - 14} y1={178} x2={X0 - 14} y2={250} />
        </g>
        <text x={X0 - 20} y={86} textAnchor="end" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          small
        </text>
        <text x={X0 - 20} y={217} textAnchor="end" fontFamily={monoFamily} fontSize={8.5} fill={c.tealDim}>
          large
        </text>
      </svg>
    </Figure>
  );
}
