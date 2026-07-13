import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_05.1a: the limit of pleasure. Epicurus's central economic insight (Principal
 * Doctrines III and XVIII): the magnitude of pleasure has a ceiling, and that
 * ceiling is the removal of all pain. Once want is gone, more consumption does not
 * raise pleasure, it only varies it. The solid teal curve climbs steeply out of
 * want, reaches the ceiling, then runs flat (varied, not increased). The dashed
 * coral line is the illusion we live by: that more always buys more.
 *
 * Legibility redesign: the ceiling annotation now sits below the ceiling guide,
 * inside the shaded "achievable pleasure" region, rather than above it. That
 * keeps it clear of the dashed illusion line, which only ever runs at or above
 * the ceiling. The x-axis's "more" label was shortened from "luxury, more, again"
 * to "luxury, again" to fit the phone-width canvas; the relationship encoded
 * (rise, ceiling, flat variation, illusory continued climb) is unchanged.
 */
export function PleasureLimitFigure() {
  return (
    <Figure
      caption="fig_05.1a · the_limit_of_pleasure"
      sub="Principal Doctrines III and XVIII. the highest pleasure is the removal of all pain (ataraxia in the mind, aponia in the body). past that ceiling, luxury only varies the pleasure, it does not increase it. the dashed line is the illusion that more keeps buying more."
      max={312}
    >
      <svg
        viewBox="0 0 288 266"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A graph of pleasure against how much you consume. Pleasure rises steeply as want is removed, then reaches a flat ceiling, the limit of pleasure. Beyond that point the real curve stays flat and only wavers, while a dashed line shows the illusion that more consumption keeps raising pleasure."
      >
        {/* axes */}
        <line x1={40} y1={30} x2={40} y2={210} stroke={c.line2} strokeWidth={1} />
        <line x1={40} y1={210} x2={276} y2={210} stroke={c.line2} strokeWidth={1} />

        {/* y axis label */}
        <text
          x={-120}
          y={17}
          transform="rotate(-90 0 0)"
          fontFamily={monoFamily}
          fontSize={12}
          fill={c.faint}
          textAnchor="middle"
        >
          pleasure
        </text>

        {/* achievable region under the real curve */}
        <path
          d="M40,210 C65,140 90,106 112,100 L276,100 L276,210 Z"
          fill={c.tealFog}
          stroke="none"
        />

        {/* ceiling guide */}
        <line x1={40} y1={100} x2={276} y2={100} stroke={c.teal} strokeWidth={1} strokeDasharray="2 5" strokeOpacity={0.5} />

        {/* "needs met" vertical guide */}
        <line x1={112} y1={100} x2={112} y2={210} stroke={c.faint} strokeWidth={1} strokeDasharray="2 5" strokeOpacity={0.6} />

        {/* the illusion: more buys more. only ever runs at or above the ceiling. */}
        <path
          d="M112,100 C160,84 220,62 276,46"
          fill="none"
          stroke={c.coral}
          strokeWidth={1.6}
          strokeDasharray="5 4"
        />

        {/* the real curve: steep rise out of want, then flat (varied) */}
        <path d="M40,210 C65,140 90,106 112,100" fill="none" stroke={c.teal} strokeWidth={2.4} />
        <path
          d="M112,100 C140,97 165,103 195,100 C220,97 250,102 276,100"
          fill="none"
          stroke={c.teal}
          strokeWidth={2.4}
        />

        {/* the point where pain is removed */}
        <circle cx={112} cy={100} r={4.5} fill={c.teal} />

        {/* illusion label, above and clear of everything else */}
        <text x={276} y={24} fontFamily={monoFamily} fontSize={12} fill={c.coral} textAnchor="end">
          the illusion: more buys more
        </text>

        {/* ceiling annotation, placed below the ceiling guide inside the shaded
            region so it never crosses the dashed illusion line, which lives
            only at or above y=100 */}
        <text x={128} y={122} fontFamily={monoFamily} fontSize={14} fontWeight={600} fill={c.teal}>
          the limit
        </text>
        <text x={128} y={140} fontFamily={monoFamily} fontSize={14} fontWeight={600} fill={c.teal}>
          of pleasure
        </text>
        <text x={128} y={156} fontFamily={monoFamily} fontSize={12} fill={c.teal} fillOpacity={0.8}>
          all pain removed
        </text>

        {/* "only varied" tag on the flat run, below the ceiling annotation */}
        <text x={195} y={184} fontFamily={monoFamily} fontSize={12} fill={c.muted} textAnchor="middle">
          only varied
        </text>

        {/* x axis labels */}
        <text x={44} y={232} fontFamily={monoFamily} fontSize={12} fill={c.faint}>
          in want
        </text>
        <text x={105} y={232} fontFamily={monoFamily} fontSize={12} fill={c.teal}>
          needs met
        </text>
        <text x={276} y={232} fontFamily={monoFamily} fontSize={12} fill={c.faint} textAnchor="end">
          luxury, again
        </text>
        <text x={158} y={252} fontFamily={monoFamily} fontSize={12} fill={c.faint} textAnchor="middle">
          how much you consume and acquire →
        </text>
      </svg>
    </Figure>
  );
}
