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
 */
export function WaterFindsTheWayFigure() {
  return (
    <Figure
      caption="fig_08.1 · water_finds_the_way"
      sub={
        'Tao Te Ching ch.8: the highest excellence is like water. it benefits all things, contends with nothing, and settles in "the low place which all men dislike," so its way is near to the Tao. water does not batter the rock. it goes low, goes around, and arrives anyway.'
      }
      max={540}
    >
      <svg
        viewBox="0 0 500 232"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A current flows from upper left, downhill to the right. A rock sits mid-channel. The water does not strike the rock head on; it parts and curves around both sides of it, rejoins below, and gathers in a low pool at the lower right. Arrows mark the flow. The rock is unmoved and the water has arrived all the same."
      >
        <defs>
          <marker id="wfw-arrow" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L5.5 3 L0 6 Z" fill={c.teal} fillOpacity={0.7} />
          </marker>
          <linearGradient id="wfw-river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(45,212,191,0.16)" />
            <stop offset="1" stopColor="rgba(45,212,191,0.05)" />
          </linearGradient>
        </defs>

        {/* the channel, sloping gently downhill left to right */}
        <path
          d="M6,78 C 130,90 200,96 250,98 C 330,101 420,118 494,130 L494,188 C 420,176 330,159 250,156 C 200,154 130,148 6,136 Z"
          fill="url(#wfw-river)"
          stroke={c.line2}
          strokeWidth={1}
        />

        {/* the rock, mid-channel, unmoved */}
        <path
          d="M236,104 L262,99 L284,112 L288,138 L268,152 L242,150 L230,128 Z"
          fill={c.panel2}
          stroke={c.faint}
          strokeWidth={1.4}
        />
        <path d="M246,116 L260,112 M252,132 L272,128" stroke={c.faint} strokeWidth={1} strokeOpacity={0.6} />
        <text x={259} y={129} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.muted}>
          the rock
        </text>

        {/* the current parts and goes around: upper arc */}
        <path
          d="M20,102 C 110,104 170,100 214,92 C 244,86 270,90 296,104 C 360,138 430,150 484,156"
          fill="none"
          stroke={c.teal}
          strokeWidth={2}
          strokeOpacity={0.85}
          markerEnd="url(#wfw-arrow)"
        />
        {/* lower arc */}
        <path
          d="M20,118 C 110,122 168,134 212,150 C 240,160 272,162 300,150 C 362,124 430,150 484,166"
          fill="none"
          stroke={c.teal}
          strokeWidth={2}
          strokeOpacity={0.6}
          markerEnd="url(#wfw-arrow)"
        />
        {/* a thin inner streamline for texture */}
        <path
          d="M30,110 C 120,112 175,116 210,120 C 235,123 250,150 285,150 C 350,150 430,158 480,161"
          fill="none"
          stroke={c.teal}
          strokeWidth={1}
          strokeOpacity={0.3}
          strokeDasharray="2 4"
        />

        {/* labels */}
        <text x={70} y={88} fontFamily={monoFamily} fontSize={10} fontWeight={600} fill={c.teal}>
          the current
        </text>
        <text x={196} y={74} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.muted}>
          does not contend
        </text>
        <text x={196} y={86} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.muted}>
          goes around
        </text>

        {/* the low pool, where it gathers */}
        <ellipse cx={452} cy={170} rx={40} ry={9} fill={c.tealFog} stroke={c.teal} strokeWidth={1} strokeOpacity={0.5} />
        <text x={452} y={196} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.teal}>
          takes the low place
        </text>
        <text x={452} y={208} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          and arrives
        </text>

        {/* downhill marker */}
        <text x={30} y={222} fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          ← higher
        </text>
        <text x={470} y={222} textAnchor="end" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          lower →
        </text>
      </svg>
    </Figure>
  );
}
