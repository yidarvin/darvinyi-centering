import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_01.1c: calm as a movable set point. Temperament hands you a starting
 * range, not a sentence. The point you keep returning to sits inside that range,
 * and sustained practice moves it toward the settled end. A set point, not a
 * fixed point.
 */
export function SetPointFigure() {
  const axisY = 96;
  const nowX = 112;
  const laterX = 214;
  return (
    <Figure
      caption="fig_01.1c · the_movable_set_point"
      sub="temperament gives you a range, not a verdict. the point you keep returning to is movable, and moving it toward the settled end is what practice does."
      max={520}
    >
      <svg
        viewBox="0 0 320 164"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A horizontal scale from more reactive on the left to more settled on the right. A wide band marks the partly heritable range you start with. A marker for your current set point sits left of center, and an arrow shows it moving rightward, toward settled, with practice."
      >
        <defs>
          <marker id="sp-arrow" markerWidth="7" markerHeight="7" refX="5.4" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.teal} />
          </marker>
        </defs>

        {/* the heritable range band */}
        <rect x={64} y={axisY - 20} width={196} height={40} rx={10} fill="rgba(255,255,255,0.035)" stroke={c.line} strokeDasharray="4 3" />
        <text x={162} y={axisY - 26} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          the range you were dealt · partly heritable
        </text>

        {/* the axis */}
        <line x1={24} y1={axisY} x2={300} y2={axisY} stroke={c.line2} strokeWidth={1.2} />
        <text x={24} y={axisY + 26} textAnchor="start" fontFamily={monoFamily} fontSize={9} fill={c.muted}>
          more reactive
        </text>
        <text x={300} y={axisY + 26} textAnchor="end" fontFamily={monoFamily} fontSize={9} fill={c.teal}>
          more settled
        </text>

        {/* the practice arc, now → later, lifted clear of the band caption */}
        <path
          d={`M${nowX} ${axisY - 12} C ${nowX + 30} ${axisY - 54}, ${laterX - 30} ${axisY - 54}, ${laterX} ${axisY - 12}`}
          fill="none"
          stroke={c.teal}
          strokeWidth={1.6}
          markerEnd="url(#sp-arrow)"
        />
        <text x={(nowX + laterX) / 2} y={axisY - 50} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.teal}>
          practice
        </text>

        {/* now marker */}
        <line x1={nowX} y1={axisY - 8} x2={nowX} y2={axisY + 8} stroke={c.amber} strokeWidth={1.6} />
        <circle cx={nowX} cy={axisY} r={4} fill={c.amber} />
        <text x={nowX} y={axisY + 40} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.amber}>
          set point now
        </text>

        {/* later marker */}
        <line x1={laterX} y1={axisY - 8} x2={laterX} y2={axisY + 8} stroke={c.teal} strokeWidth={1.6} />
        <circle cx={laterX} cy={axisY} r={4} fill={c.teal} />
        <text x={laterX} y={axisY + 40} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.teal}>
          where it settles
        </text>
      </svg>
    </Figure>
  );
}
