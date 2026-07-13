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
  // Layout constants for the redesigned figure. All labels sit at one
  // uniform font size so the phone-width legibility floor is a single
  // number to defend. viewBox stays 320 wide (unchanged); only the height
  // grew, to give the larger text room without crowding.
  const FS = 14;
  const axisY = 147;
  const nowX = 112;
  const laterX = 214;
  const bandTop = axisY - 32; // 115
  const bandBottom = axisY + 32; // 179

  return (
    <Figure
      caption="fig_01.1c · the_movable_set_point"
      sub="temperament hands you a range. the point you keep returning to sits inside it, and practice moves it toward the settled end."
      max={520}
    >
      <svg
        viewBox="0 0 320 236"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A horizontal scale from more reactive on the left to more settled on the right. A wide band marks the partly heritable range you start with. A marker for your current set point sits left of center, and an arrow shows it moving rightward, toward settled, with practice."
      >
        <defs>
          <marker id="sp-arrow" markerWidth="7" markerHeight="7" refX="5.4" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.teal} />
          </marker>
        </defs>

        {/* the practice arc, now → later, peaking well clear of the band caption below it */}
        <path
          d={`M${nowX} ${axisY - 16} C ${nowX + 30} 36, ${laterX - 30} 36, ${laterX} ${axisY - 16}`}
          fill="none"
          stroke={c.teal}
          strokeWidth={1.6}
          markerEnd="url(#sp-arrow)"
        />
        <text x={(nowX + laterX) / 2} y={52} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.teal}>
          practice
        </text>

        {/* the heritable range band, its caption split across two short lines so it fits at a legible size */}
        <text x={162} y={88} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.faint}>
          the range you were dealt
        </text>
        <text x={162} y={107} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.faint}>
          (partly heritable)
        </text>
        <rect
          x={64}
          y={bandTop}
          width={196}
          height={bandBottom - bandTop}
          rx={10}
          fill="rgba(255,255,255,0.035)"
          stroke={c.line}
          strokeDasharray="4 3"
        />

        {/* the axis */}
        <line x1={24} y1={axisY} x2={300} y2={axisY} stroke={c.line2} strokeWidth={1.2} />
        <text x={24} y={196} textAnchor="start" fontFamily={monoFamily} fontSize={FS} fill={c.muted}>
          more reactive
        </text>
        <text x={300} y={196} textAnchor="end" fontFamily={monoFamily} fontSize={FS} fill={c.teal}>
          more settled
        </text>

        {/* now marker */}
        <line x1={nowX} y1={axisY - 12} x2={nowX} y2={axisY + 12} stroke={c.amber} strokeWidth={1.6} />
        <circle cx={nowX} cy={axisY} r={5} fill={c.amber} />
        <text x={nowX} y={218} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.amber}>
          set point
        </text>

        {/* later marker */}
        <line x1={laterX} y1={axisY - 12} x2={laterX} y2={axisY + 12} stroke={c.teal} strokeWidth={1.6} />
        <circle cx={laterX} cy={axisY} r={5} fill={c.teal} />
        <text x={laterX} y={218} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.teal}>
          settles here
        </text>
      </svg>
    </Figure>
  );
}
