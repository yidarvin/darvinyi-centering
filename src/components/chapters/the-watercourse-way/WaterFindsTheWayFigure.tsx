import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_08.1: water finds the way. The Tao Te Ching's central image (ch.8): the
 * highest excellence is like water, which benefits all things, contends with
 * nothing, and settles in "the low place which all men dislike," and so its way
 * is near to the Tao. The figure draws a current meeting a rock: it does not
 * batter the obstacle, it parts around it, takes the lower path, rejoins, and
 * arrives. Non-contention and lowness, the watercourse way, in one stroke.
 *
 * Legibility pass: viewBox width dropped from 500 to 420 (so a fixed rendered
 * width buys more scale per point of font size) and every label rebuilt at a
 * uniform 17px floor (19px for the lead "the current" label), with the whole
 * composition re-spaced vertically (334 tall, up from 232) so the larger type
 * has room. The two side annotations that used to sit at the very bottom
 * ("higher" / "lower") now sit in a header row alongside the split callout,
 * which removes a whole redundant band without dropping any information.
 *
 * Second pass: the header block ("does not contend" / "goes around" /
 * "higher" / "lower") was pulled up 15-18 units so its lowest line clears the
 * channel fill beneath it. At the original spacing, "goes around" (baseline
 * y=75) had its descender landing right on the channel's top edge (~y=79.8
 * just below it), and "higher" (baseline y=88) had only a few units of
 * clearance above the channel's start point (~y=95.1). Both lines now sit
 * high enough that their descenders clear the channel by roughly a font
 * height, while the two stacked pairs keep their original 29-unit gap so
 * neither collides with the other.
 */
export function WaterFindsTheWayFigure() {
  return (
    <Figure
      caption="fig_08.1 · water_finds_the_way"
      sub={
        'Tao Te Ching ch.8: the highest excellence is like water. it benefits all things, contends with nothing, and settles in "the low place which all men dislike," so its way is near to the Tao. water does not batter the rock. it goes low, goes around, and arrives anyway.'
      }
      max={460}
    >
      <svg
        viewBox="0 0 420 332"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A current flows from upper left, downhill to the right. A rock sits mid-channel. The water does not strike the rock head on; it parts and curves around both sides of it, rejoins below, and gathers in a low pool at the lower right. Arrows mark the flow. The rock is unmoved and the water has arrived all the same."
      >
        <defs>
          <marker id="wfw-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L6 3.5 L0 7 Z" fill={c.teal} fillOpacity={0.7} />
          </marker>
          <linearGradient id="wfw-river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(45,212,191,0.16)" />
            <stop offset="1" stopColor="rgba(45,212,191,0.05)" />
          </linearGradient>
        </defs>

        {/* header row: the lead label, the split callout, and the higher/lower legend */}
        <text x={14} y={30} fontFamily={monoFamily} fontSize={19} fontWeight={600} fill={c.teal}>
          the current
        </text>
        <text x={234} y={31} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.muted}>
          does not contend
        </text>
        <text x={234} y={60} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.muted}>
          goes around
        </text>
        <text x={12} y={80} fontFamily={monoFamily} fontSize={17} fill={c.faint}>
          higher
        </text>
        <text x={408} y={80} textAnchor="end" fontFamily={monoFamily} fontSize={17} fill={c.faint}>
          lower
        </text>

        {/* the channel, sloping gently downhill left to right, widened around the rock
            so the two arcs have real clearance as they part around it */}
        <path
          d="M8,95 C 100,100 170,90 210,82 C 250,76 280,82 305,100 C 350,122 385,145 412,168
             L412,238 C 385,218 350,200 305,190 C 288,212 248,222 210,210 C 178,200 100,186 8,178 Z"
          fill="url(#wfw-river)"
          stroke={c.line2}
          strokeWidth={1.2}
        />

        {/* the rock, mid-channel, unmoved */}
        <path
          d="M188,128 L222,113 L270,132 L286,172 L250,190 L206,186 L182,155 Z"
          fill={c.panel2}
          stroke={c.faint}
          strokeWidth={1.6}
        />
        <path d="M200,140 L222,132 M212,168 L242,162" stroke={c.faint} strokeWidth={1.2} strokeOpacity={0.6} />
        <text x={234} y={155} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.muted}>
          the rock
        </text>

        {/* the current parts and goes around: upper arc */}
        <path
          d="M10,108 C 100,111 165,106 205,98 C 240,92 270,96 300,110 C 345,135 385,160 412,182"
          fill="none"
          stroke={c.teal}
          strokeWidth={2.3}
          strokeOpacity={0.85}
          markerEnd="url(#wfw-arrow)"
        />
        {/* lower arc, routed with real clearance under the rock's bottom edge */}
        <path
          d="M10,138 C 80,146 140,166 178,180 C 200,190 215,198 245,203 C 270,206 285,198 305,190 C 340,196 380,212 412,228"
          fill="none"
          stroke={c.teal}
          strokeWidth={2.3}
          strokeOpacity={0.6}
          markerEnd="url(#wfw-arrow)"
        />
        {/* a thin inner streamline for texture */}
        <path
          d="M20,123 C 100,128 160,145 195,158 C 215,166 225,182 255,186 C 290,190 340,192 405,205"
          fill="none"
          stroke={c.teal}
          strokeWidth={1.2}
          strokeOpacity={0.3}
          strokeDasharray="2 5"
        />

        {/* the low pool, where it gathers */}
        <ellipse cx={355} cy={252} rx={52} ry={13} fill={c.tealFog} stroke={c.teal} strokeWidth={1.2} strokeOpacity={0.5} />
        <text x={340} y={288} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.teal}>
          the low place
        </text>
        <text x={340} y={317} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.faint}>
          arrives anyway
        </text>
      </svg>
    </Figure>
  );
}
