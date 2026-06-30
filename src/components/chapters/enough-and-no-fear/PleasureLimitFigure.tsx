import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_05.2a: the limit of pleasure. Epicurus's central economic insight (Principal
 * Doctrines III and XVIII): the magnitude of pleasure has a ceiling, and that
 * ceiling is the removal of all pain. Once want is gone, more consumption does not
 * raise pleasure, it only varies it. The solid teal curve climbs steeply out of
 * want, reaches the ceiling, then runs flat (varied, not increased). The dashed
 * coral line is the illusion we live by: that more always buys more.
 */
export function PleasureLimitFigure() {
  return (
    <Figure
      caption="fig_05.2a · the_limit_of_pleasure"
      sub="Principal Doctrines III and XVIII. the highest pleasure is the removal of all pain (ataraxia in the mind, aponia in the body). past that ceiling, luxury only varies the pleasure, it does not increase it. the dashed line is the illusion that more keeps buying more."
      max={520}
    >
      <svg
        viewBox="0 0 480 300"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A graph of pleasure against how much you consume. Pleasure rises steeply as want is removed, then reaches a flat ceiling, the limit of pleasure. Beyond that point the real curve stays flat and only wavers, while a dashed line shows the illusion that more consumption keeps raising pleasure."
      >
        {/* axes */}
        <line x1={44} y1={28} x2={44} y2={256} stroke={c.line2} strokeWidth={1} />
        <line x1={44} y1={256} x2={466} y2={256} stroke={c.line2} strokeWidth={1} />

        {/* y axis label */}
        <text
          x={-142}
          y={16}
          transform="rotate(-90 0 0)"
          fontFamily={monoFamily}
          fontSize={10}
          fill={c.faint}
          textAnchor="middle"
        >
          pleasure
        </text>

        {/* achievable region under the real curve */}
        <path
          d="M44,256 C90,120 150,84 220,80 L466,80 L466,256 Z"
          fill={c.tealFog}
          stroke="none"
        />

        {/* ceiling guide */}
        <line x1={44} y1={80} x2={466} y2={80} stroke={c.teal} strokeWidth={1} strokeDasharray="2 5" strokeOpacity={0.5} />

        {/* "needs met" vertical guide */}
        <line x1={220} y1={80} x2={220} y2={256} stroke={c.faint} strokeWidth={1} strokeDasharray="2 5" strokeOpacity={0.6} />

        {/* the illusion: more buys more */}
        <path
          d="M220,80 C300,70 380,54 466,38"
          fill="none"
          stroke={c.coral}
          strokeWidth={1.6}
          strokeDasharray="5 4"
        />

        {/* the real curve: steep rise out of want, then flat (varied) */}
        <path d="M44,256 C90,120 150,84 220,80" fill="none" stroke={c.teal} strokeWidth={2.4} />
        <path
          d="M220,80 C262,73 300,88 340,80 C376,73 430,86 466,80"
          fill="none"
          stroke={c.teal}
          strokeWidth={2.4}
        />

        {/* the point where pain is removed */}
        <circle cx={220} cy={80} r={4.5} fill={c.teal} />

        {/* ceiling label */}
        <text x={232} y={64} fontFamily={monoFamily} fontSize={11} fontWeight={600} fill={c.teal}>
          the limit of pleasure
        </text>
        <text x={232} y={77} fontFamily={monoFamily} fontSize={8.5} fill={c.teal} fillOpacity={0.8}>
          all pain removed
        </text>

        {/* "only varied" tag on the flat run */}
        <text x={356} y={104} fontFamily={monoFamily} fontSize={9} fill={c.muted} textAnchor="middle">
          only varied
        </text>

        {/* illusion label */}
        <text x={462} y={32} fontFamily={monoFamily} fontSize={9.5} fill={c.coral} textAnchor="end">
          the illusion: more buys more
        </text>

        {/* x axis labels */}
        <text x={48} y={272} fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          in want
        </text>
        <text x={220} y={272} fontFamily={monoFamily} fontSize={9.5} fill={c.teal} textAnchor="middle">
          needs met
        </text>
        <text x={462} y={272} fontFamily={monoFamily} fontSize={9.5} fill={c.faint} textAnchor="end">
          luxury, more, again
        </text>
        <text x={255} y={288} fontFamily={monoFamily} fontSize={8.5} fill={c.faint} textAnchor="middle">
          how much you consume and acquire →
        </text>
      </svg>
    </Figure>
  );
}
