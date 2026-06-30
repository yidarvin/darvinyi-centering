import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';
import { QUALITIES_OF_SELF } from './parts';

/**
 * fig_11.3 · the_qualities_of_self. The "8 Cs" drawn as a wheel radiating from a
 * teal center. The figure encodes a specific claim from IFS: these qualities are
 * not skills you build or parts you cultivate. They are what is already present
 * once no part is blended, so they double as a readout. When several show up at
 * once, calm and curiosity and compassion together, that is the sign the Self is
 * the one leading. Concept: Schwartz, the qualities of Self.
 */

const CX = 230;
const CY = 185;
const R_DOT = 122;
const CENTER_R = 46;

export function QualitiesOfSelfFigure() {
  const points = QUALITIES_OF_SELF.map((label, i) => {
    const theta = (-90 + i * 45) * (Math.PI / 180);
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const dotX = CX + R_DOT * cos;
    const dotY = CY + R_DOT * sin;
    const labelX = CX + (R_DOT + 15) * cos;
    const labelY = CY + (R_DOT + 15) * sin;
    const anchor: 'start' | 'middle' | 'end' = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';
    // spoke starts at the rim of the center circle, not its core
    const spokeX = CX + (CENTER_R + 6) * cos;
    const spokeY = CY + (CENTER_R + 6) * sin;
    return { label, dotX, dotY, labelX, labelY, anchor, spokeX, spokeY };
  });

  return (
    <Figure
      caption="fig_11.3 · the_qualities_of_self"
      sub="the eight Cs. not qualities to manufacture, but the ones already there once no part is blended. when several show up together, that is the readout that the Self is leading."
      max={400}
    >
      <svg
        viewBox="0 0 460 380"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A wheel. At the center, a teal circle labeled Self. Eight spokes radiate out to eight labels, the qualities of Self: calm, curiosity, clarity, compassion, confidence, creativity, courage, and connectedness."
      >
        <defs>
          <radialGradient id="qself-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.teal} stopOpacity={0.28} />
            <stop offset="60%" stopColor={c.teal} stopOpacity={0.06} />
            <stop offset="100%" stopColor={c.teal} stopOpacity={0} />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={96} fill="url(#qself-glow)" />

        {/* spokes */}
        {points.map((p) => (
          <line
            key={`spoke-${p.label}`}
            x1={p.spokeX}
            y1={p.spokeY}
            x2={p.dotX}
            y2={p.dotY}
            stroke={c.teal}
            strokeWidth={1}
            strokeOpacity={0.32}
          />
        ))}

        {/* the C nodes and labels */}
        {points.map((p) => (
          <g key={`node-${p.label}`}>
            <circle cx={p.dotX} cy={p.dotY} r={4} fill={c.teal} />
            <text
              x={p.labelX}
              y={p.labelY}
              textAnchor={p.anchor}
              dominantBaseline="middle"
              fontFamily={mono.fontFamily}
              fontSize={12}
              fill={c.teal}
            >
              {p.label}
            </text>
          </g>
        ))}

        {/* the Self at the center */}
        <circle cx={CX} cy={CY} r={CENTER_R} fill={c.tealFog} stroke={c.teal} strokeWidth={2.2} />
        <text x={CX} y={CY - 2} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={14} fontWeight={600} fill={c.teal}>
          Self
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={9.5} fill={c.faint}>
          no part in charge
        </text>
      </svg>
    </Figure>
  );
}
