import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// the plot square: skill on x, challenge on y (inverted, high at the top)
const X0 = 54;
const X1 = 300;
const YT = 36; // high challenge
const YB = 232; // low challenge

/**
 * fig_03.3a: the flow channel. Csikszentmihalyi's challenge-by-skill map. When a
 * task's challenge runs far ahead of your skill you tip into anxiety; when skill
 * runs far ahead of challenge you slide into boredom. Flow is the diagonal band
 * where the two are matched and both are high: engaged, absorbed, time gone.
 */
export function FlowChannelFigure() {
  return (
    <Figure
      caption="fig_03.3a · the_flow_channel"
      sub="flow is matched challenge and skill, both high: deep, engaged absorption, not relaxation. (the original three-channel sketch; later experience-sampling work refined it into eight.)"
      max={420}
    >
      <svg
        viewBox="0 0 360 290"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A square mapping skill on the horizontal axis against challenge on the vertical. The upper-left, where challenge far exceeds skill, is anxiety. The lower-right, where skill far exceeds challenge, is boredom. The diagonal band where challenge and skill are matched and both high is flow. The low corner where both are low is apathy."
      >
        <defs>
          <marker id="fc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>

        {/* the two off-diagonal regions */}
        <polygon points={`${X0},${YB} ${X0},${YT} ${X1},${YT}`} fill={c.coralFog} />
        <polygon points={`${X0},${YB} ${X1},${YB} ${X1},${YT}`} fill={c.amberFog} />

        {/* the flow band along the matched diagonal, inset so its caps stay in frame */}
        <line x1={66} y1={223} x2={288} y2={45} stroke={c.teal} strokeWidth={30} strokeLinecap="round" strokeOpacity={0.16} />
        <line x1={X0} y1={YB} x2={X1} y2={YT} stroke={c.teal} strokeWidth={1.6} strokeDasharray="5 4" strokeOpacity={0.8} />

        {/* the frame */}
        <rect x={X0} y={YT} width={X1 - X0} height={YB - YT} fill="none" stroke={c.line2} strokeWidth={1} />

        {/* axes */}
        <line x1={X0} y1={YB} x2={X1 + 16} y2={YB} stroke={c.faint} strokeWidth={1.2} markerEnd="url(#fc-arrow)" />
        <line x1={X0} y1={YB} x2={X0} y2={YT - 16} stroke={c.faint} strokeWidth={1.2} markerEnd="url(#fc-arrow)" />
        <text x={(X0 + X1) / 2} y={266} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.muted}>
          skill →
        </text>
        <text
          x={26}
          y={(YT + YB) / 2}
          textAnchor="middle"
          fontFamily={monoFamily}
          fontSize={11}
          fill={c.muted}
          transform={`rotate(-90 26 ${(YT + YB) / 2})`}
        >
          challenge →
        </text>

        {/* region labels */}
        <text x={120} y={80} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fontWeight={500} fill={c.coral}>
          anxiety
        </text>
        <text x={120} y={95} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          challenge ≫ skill
        </text>

        <text x={236} y={196} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fontWeight={500} fill={c.amber}>
          boredom
        </text>
        <text x={236} y={211} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          skill ≫ challenge
        </text>

        <text x={208} y={112} textAnchor="middle" fontFamily={monoFamily} fontSize={12.5} fontWeight={600} fill={c.teal}>
          flow
        </text>
        <text x={208} y={127} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          matched, both high
        </text>

        <circle cx={X0 + 16} cy={YB - 16} r={3} fill={c.faint} />
        <text x={X0 + 26} y={YB - 12} textAnchor="start" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          apathy · both low
        </text>
      </svg>
    </Figure>
  );
}
