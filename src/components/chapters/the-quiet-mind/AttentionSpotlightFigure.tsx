import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// candidates competing for the beam. one is lit, the rest fade to background.
const DIM = [
  { x: 250, y: 52, label: 'a worry' },
  { x: 392, y: 60, label: 'a sound' },
  { x: 250, y: 188, label: 'a plan' },
  { x: 392, y: 180, label: 'this page' },
];

/**
 * fig_03.4a: attention as a spotlight. A narrow, movable beam. What it lands on
 * grows vivid and detailed; everything outside it dims to background. The beam
 * can be aimed, and aiming it is the skill the rest of the book trains.
 */
export function AttentionSpotlightFigure() {
  return (
    <Figure
      caption="fig_03.4a · attention_as_a_spotlight"
      sub="attention is a narrow, movable beam. what it lands on grows vivid; the rest dims to background. you can aim it, and aiming it is a trainable skill."
      max={460}
    >
      <svg
        viewBox="0 0 460 240"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A source labeled attention on the left casts a teal cone of light onto one object, the breath, which is bright and vivid. Four other objects (a worry, a sound, a plan, this page) sit outside the beam, dim and faint."
      >
        <defs>
          <linearGradient id="as-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c.teal} stopOpacity={0.04} />
            <stop offset="100%" stopColor={c.teal} stopOpacity={0.22} />
          </linearGradient>
          <radialGradient id="as-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.teal} stopOpacity={0.35} />
            <stop offset="65%" stopColor={c.teal} stopOpacity={0.07} />
            <stop offset="100%" stopColor={c.teal} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* the beam: a cone from the source to the lit object */}
        <polygon points="62,120 326,96 326,144" fill="url(#as-beam)" />

        {/* the source: where attention is cast from */}
        <circle cx={62} cy={120} r={7} fill={c.panel2} stroke={c.teal} strokeWidth={1.6} />
        <circle cx={62} cy={120} r={2.6} fill={c.teal} />
        <text x={62} y={148} textAnchor="middle" fontFamily={monoFamily} fontSize={10.5} fill={c.muted}>
          attention
        </text>

        {/* the unlit candidates: faint, easy to miss */}
        {DIM.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r={6.5} fill="none" stroke={c.faint} strokeWidth={1.2} />
            <text
              x={d.x}
              y={d.y - 12}
              textAnchor="middle"
              fontFamily={monoFamily}
              fontSize={10}
              fill={c.faint}
            >
              {d.label}
            </text>
          </g>
        ))}

        {/* the lit object: vivid, full of detail */}
        <circle cx={356} cy={120} r={34} fill="url(#as-glow)" />
        <circle cx={356} cy={120} r={11} fill={c.tealFog} stroke={c.teal} strokeWidth={2} />
        <circle cx={356} cy={120} r={3.4} fill={c.teal} />
        <text x={356} y={84} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fontWeight={500} fill={c.teal}>
          the breath
        </text>
        <text x={356} y={166} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.muted}>
          lit · vivid
        </text>

        <text x={250} y={222} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          everything unlit fades to background
        </text>
      </svg>
    </Figure>
  );
}
