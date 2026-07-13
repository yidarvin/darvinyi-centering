import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_11.1 · the_protective_system. The inner system drawn as nested layers, by
 * structural depth, not by the order you reach them. Self sits at the calm
 * core, the vantage you return to first, by unblending, before you turn to any
 * part. Protectors form the outer ring (managers and firefighters), doing the
 * daily guarding. Exiles sit deeper still, the wounds the protectors shield, and
 * are approached last, slowly, only with a protector's consent. Concept:
 * Schwartz, the IFS model of parts and Self.
 */
export function ProtectiveSystemFigure() {
  return (
    <Figure
      caption="fig_11.1 · the_protective_system"
      sub="the layers are depth, not an order of access. the Self at the center is the vantage you return to first, by stepping back from a part, not buried treasure dug up last. protectors work the perimeter. exiles sit deepest, shielded, and are approached last and slowly, with a protector's consent."
      max={340}
    >
      <svg
        viewBox="0 0 360 300"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Three nested circles. The large outer ring is labeled protectors, made of managers and firefighters. Inside it, a violet ring is labeled exiles, young parts that hold the burden. At the very center, a teal circle is labeled Self, the calm core."
      >
        <circle cx={180} cy={150} r={132} fill={c.amberFog} stroke={c.amber} strokeWidth={1.4} />
        <circle cx={180} cy={150} r={92} fill={c.violetFog} stroke={c.violet} strokeWidth={1.4} />
        <circle cx={180} cy={150} r={46} fill={c.tealFog} stroke={c.teal} strokeWidth={2} />

        <text x={180} y={37} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fontWeight={500} fill={c.amber}>
          protectors
        </text>
        <text x={180} y={52} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          managers + firefighters
        </text>

        <text x={180} y={89} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fontWeight={500} fill={c.violet}>
          exiles
        </text>
        <text x={180} y={104} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          young · hold the burden
        </text>

        <text x={180} y={147} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13.5} fontWeight={600} fill={c.teal}>
          Self
        </text>
        <text x={180} y={162} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          the calm center
        </text>
      </svg>
    </Figure>
  );
}
