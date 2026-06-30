import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;
const CX = 170;
const CY = 182;

// rings from the close-in worry out to the cosmos, each fainter than the last
const RINGS = [
  { r: 26, label: 'today', op: 0.55 },
  { r: 58, label: 'your years', op: 0.42 },
  { r: 92, label: 'the city, the age', op: 0.32 },
  { r: 128, label: 'the earth', op: 0.24 },
  { r: 162, label: 'all people, all time', op: 0.18 },
];

/**
 * fig_04.4a: the view from above. Rise in imagination until human affairs are
 * seen from a height, and the trouble regains its true proportion against the
 * span of people and time. Marcus Aurelius returns to this often; Hadot named it.
 * It is a reframing, not a denial that the trouble is real.
 */
export function ViewFromAboveFigure() {
  return (
    <Figure
      caption="fig_04.4a · the_view_from_above"
      sub="rise in imagination until the trouble is seen against the whole span of people and time, and it regains its true size. Marcus Aurelius returns to this often; Pierre Hadot named it the view from above. a change of proportion, not a denial that the trouble is real."
      max={400}
    >
      <svg
        viewBox="0 0 340 360"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A worry sits as a small dot at the center of widening concentric rings labeled, from the inside out: today, your years, the city and the age, the earth, and all people and all time. Seen from the widest ring, the worry keeps its small true size."
      >
        {RINGS.map((ring) => (
          <circle key={ring.r} cx={CX} cy={CY} r={ring.r} fill="none" stroke={c.teal} strokeWidth={1} strokeOpacity={ring.op} />
        ))}

        {/* the worry, at true size, at the center */}
        <circle cx={CX} cy={CY} r={4} fill={c.coral} />
        <text x={CX + 12} y={CY + 4} textAnchor="start" fontFamily={monoFamily} fontSize={9} fill={c.coral}>
          the worry
        </text>

        {/* scale labels stacked up the axis, just inside each ring */}
        {RINGS.map((ring) => (
          <text
            key={ring.r}
            x={CX}
            y={CY - ring.r + 13}
            textAnchor="middle"
            fontFamily={monoFamily}
            fontSize={9}
            fill={c.muted}
            fillOpacity={0.5 + ring.op}
          >
            {ring.label}
          </text>
        ))}

        {/* the direction of the move */}
        <text x={CX} y={348} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          zoom out · the farther up, the smaller it looks
        </text>
      </svg>
    </Figure>
  );
}
