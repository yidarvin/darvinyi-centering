import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';
import { VRITTIS } from './limbs';

const monoFamily = mono.fontFamily;

// a deterministic choppy surface that flattens left to right. amplitude decays so
// the far left churns and the right goes mirror-still. (no Math.random: a fixed
// jitter pattern keeps the figure stable across renders.)
const JITTER = [0.2, -0.9, 0.6, -1, 0.85, -0.5, 0.95, -0.7, 0.4, -0.8, 0.7, -0.45, 0.6, -0.7, 0.3, -0.5, 0.4, -0.3, 0.5, -0.2, 0.25, -0.15, 0.1, -0.05, 0];
const X0 = 18;
const X1 = 502;
const BASE_Y = 96;
const AMP = 22;
const FLAT_FROM = 0.62; // fraction of width where the surface is essentially still

function surfacePath(): string {
  const n = JITTER.length;
  return JITTER.map((m, i) => {
    const f = i / (n - 1);
    const x = X0 + f * (X1 - X0);
    // amplitude decays toward the right and is gone past FLAT_FROM
    const decay = f >= FLAT_FROM ? 0 : Math.pow(1 - f / FLAT_FROM, 1.5);
    const y = BASE_Y - m * AMP * decay;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

// a small four-point star, centered at (cx, cy), radius r
function star(cx: number, cy: number, r: number): string {
  const i = r * 0.32;
  return [
    `M${cx},${cy - r}`,
    `L${cx + i},${cy - i}`,
    `L${cx + r},${cy}`,
    `L${cx + i},${cy + i}`,
    `L${cx},${cy + r}`,
    `L${cx - i},${cy + i}`,
    `L${cx - r},${cy}`,
    `L${cx - i},${cy - i}`,
    'Z',
  ].join(' ');
}

export function FluctuationsSettlingFigure() {
  const surface = surfacePath();
  const starX = 430;
  return (
    <Figure
      caption="fig_09.1 · citta_vṛtti_nirodha"
      sub="Patanjali’s opening definition (YS 1.2): yoga is the stilling (nirodha) of the fluctuations (vṛtti) of the mind (citta). A churning surface holds no reflection. Let the ripples settle and the water turns to a mirror. Then, in his words, the seer rests in its own nature (1.3); otherwise it takes the shape of whatever is moving through it (1.4)."
      max={540}
    >
      <svg
        viewBox="0 0 520 200"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A pool of water seen from the side. On the left the surface is choppy and broken, churned by the mind’s fluctuations, and it holds no clear reflection. Moving right, the waves flatten until the surface is perfectly still and mirrors a single point of light above it, the seer resting in its own nature."
      >
        <defs>
          <linearGradient id="fl-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d9488" stopOpacity={0.16} />
            <stop offset="100%" stopColor="#0d9488" stopOpacity={0.03} />
          </linearGradient>
          <linearGradient id="fl-calm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c.coral} />
            <stop offset="55%" stopColor={c.tealDim} />
            <stop offset="100%" stopColor={c.teal} />
          </linearGradient>
        </defs>

        {/* the body of water below the surface */}
        <path d={`${surface} L${X1},190 L${X0},190 Z`} fill="url(#fl-water)" />

        {/* scattered, broken reflection on the churning left: no coherent image */}
        <g fill={c.coral} fillOpacity={0.5}>
          <circle cx={70} cy={120} r={1.7} />
          <circle cx={104} cy={138} r={1.3} />
          <circle cx={56} cy={150} r={1.4} />
          <circle cx={128} cy={124} r={1.2} />
          <circle cx={92} cy={162} r={1.5} />
          <circle cx={150} cy={146} r={1.2} />
        </g>

        {/* the star above the still water, and its clean mirror reflection */}
        <path d={star(starX, 44, 9)} fill={c.teal} />
        <path d={star(starX, 148, 9)} fill={c.teal} fillOpacity={0.34} />
        <line x1={starX} y1={BASE_Y + 2} x2={starX} y2={138} stroke={c.teal} strokeWidth={0.8} strokeOpacity={0.25} strokeDasharray="2 4" />

        {/* the surface line, coral (churning) grading to teal (still) */}
        <path d={surface} fill="none" stroke="url(#fl-calm)" strokeWidth={2.2} strokeLinejoin="round" />

        {/* zone labels */}
        <text x={X0 + 4} y={28} fontFamily={monoFamily} fontSize={11} fill={c.coral}>
          the churning mind
        </text>
        <text x={X0 + 4} y={42} fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          no reflection holds
        </text>

        <text x={X1 - 4} y={84} textAnchor="end" fontFamily={monoFamily} fontSize={11} fill={c.teal}>
          stillness · nirodha
        </text>
        <text x={X1 - 4} y={176} textAnchor="end" fontFamily={monoFamily} fontSize={9} fill={c.muted}>
          the seer, in its own nature (1.3)
        </text>

        {/* the settling arrow */}
        <text x={262} y={192} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          the ripples settle →
        </text>
      </svg>

      {/* the five fluctuations: what churns the surface (YS 1.5–1.11) */}
      <div style={{ marginTop: 16 }}>
        <div style={{ ...mono, fontSize: 10.5, color: c.faint, letterSpacing: '.04em', marginBottom: 9 }}>
          the five vṛtti · every kind of ripple
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {VRITTIS.map((v) => (
            <span
              key={v.sanskrit}
              title={v.gloss}
              style={{
                ...mono,
                fontSize: 10.5,
                color: c.muted,
                border: `1px solid ${c.line2}`,
                background: c.panel2,
                borderRadius: 6,
                padding: '4px 9px',
                lineHeight: 1.3,
              }}
            >
              <span style={{ color: c.coral }}>{v.sanskrit}</span> · {v.name}
            </span>
          ))}
        </div>
      </div>
    </Figure>
  );
}
