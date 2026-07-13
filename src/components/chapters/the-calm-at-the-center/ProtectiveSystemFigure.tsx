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
 *
 * Legibility pass: each ring previously carried two lines of text (a name and a
 * descriptive subtitle, e.g. "protectors" / "managers + firefighters") stacked
 * inside its own thin band, which capped how large any of it could get before
 * two rings' text collided. The subtitles were dropped and each ring now
 * carries a single, larger name label, sized well past the phone-width
 * legibility floor. The dropped detail is not lost: the paragraph right after
 * this figure spells out managers and firefighters, and the sub line below
 * already narrates the exile and the Self in full. The three-ring, nested-by-
 * depth structure, the Self at the center, is unchanged.
 */
export function ProtectiveSystemFigure() {
  return (
    <Figure
      caption="fig_11.1 · the_protective_system"
      sub="the layers are depth, not an order of access. the Self at the center is the vantage you return to first, by stepping back from a part, not buried treasure dug up last. protectors work the perimeter. exiles sit deepest, shielded, and are approached last and slowly, with a protector's consent."
      max={340}
    >
      <svg
        viewBox="0 0 300 280"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Three nested circles, drawn by structural depth. The large outer ring, amber, is labeled protectors. A violet ring inside it is labeled exiles. At the very center, a teal circle is labeled Self."
      >
        <circle cx={150} cy={140} r={124} fill={c.amberFog} stroke={c.amber} strokeWidth={1.4} />
        <circle cx={150} cy={140} r={84} fill={c.violetFog} stroke={c.violet} strokeWidth={1.4} />
        <circle cx={150} cy={140} r={44} fill={c.tealFog} stroke={c.teal} strokeWidth={2} />

        <text x={150} y={40} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={16} fontWeight={500} fill={c.amber}>
          protectors
        </text>

        <text x={150} y={80} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={16} fontWeight={500} fill={c.violet}>
          exiles
        </text>

        <text x={150} y={144} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={19} fontWeight={600} fill={c.teal}>
          Self
        </text>
      </svg>
    </Figure>
  );
}
