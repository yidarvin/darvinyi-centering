import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';
import { routesWithTraditions, TRADITIONS, type TraditionId } from './convergence';

/**
 * fig_14.1, the routes-to-calm map. Seven routes, sorted by how many traditions
 * walk each one, each tradition shown as a small coded chip in the route's color.
 * The shape is the point: presence and letting go are the most-traveled roads,
 * meaning is walked by one. The convergence is real and uneven, and the figure
 * does not pretend otherwise. Read straight off the same data as the widget, so
 * the two can never disagree.
 */

const CODE: Record<TraditionId, string> = {
  stoicism: 'St',
  epicureanism: 'Ep',
  buddhism: 'Bu',
  zen: 'Ze',
  taoism: 'Ta',
  yoga: 'Yo',
  clinical: 'Cl',
  ifs: 'IF',
  contemplative: 'Co',
  transcendentalists: 'Tr',
};

const ROW_H = 40;
const TOP = 12;
const LABEL_W = 128;
const PITCH = 34;
const R = 13;
const DOT_START = LABEL_W + 6;
const MAX_DOTS = 8; // presence, the widest row
const WIDTH = DOT_START + MAX_DOTS * PITCH + 6;

export function RoutesMapFigure() {
  const rows = routesWithTraditions();
  const height = TOP * 2 + rows.length * ROW_H;

  return (
    <Figure
      caption="fig_14.1 · the_routes, and how many doors open onto each"
      sub="The same handful of moves, each shown across the traditions at once. Presence and letting go are the most-traveled. Meaning is walked here by one. Convergence is real and uneven, and a thin row is honest, not a gap to paper over."
      max={460}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="The seven routes to calm, sorted by how many traditions use each. Presence is used by eight traditions, letting go by seven, perspective by four, enough and connection by three each, the body by two, and meaning by one."
      >
        {rows.map((row, i) => {
          const cy = TOP + i * ROW_H + ROW_H / 2;
          return (
            <g key={row.route.id}>
              {/* route label */}
              <text
                x={0}
                y={cy}
                dy={4}
                fontFamily={mono.fontFamily}
                fontSize={12.5}
                fontWeight={600}
                fill={row.route.color}
              >
                {row.route.label}
              </text>
              <text
                x={0}
                y={cy}
                dy={18}
                fontFamily={mono.fontFamily}
                fontSize={10}
                fill={c.faint}
              >
                {row.traditions.length === 1 ? '1 door' : `${row.traditions.length} doors`}
              </text>

              {/* a faint rail behind the chips */}
              <line
                x1={DOT_START + R}
                y1={cy}
                x2={DOT_START + (row.traditions.length - 1) * PITCH + R}
                y2={cy}
                stroke={row.route.color}
                strokeOpacity={0.22}
                strokeWidth={1}
              />

              {/* one coded chip per tradition that walks this route */}
              {row.traditions.map((t, j) => {
                const cx = DOT_START + j * PITCH + R;
                const soft = t.cell.soft;
                return (
                  <g key={t.tradition.id}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={R}
                      fill={`${row.route.color}22`}
                      stroke={row.route.color}
                      strokeOpacity={soft ? 0.4 : 0.85}
                      strokeWidth={1.4}
                      strokeDasharray={soft ? '2 3' : undefined}
                    />
                    <text
                      x={cx}
                      y={cy}
                      dy={3.5}
                      textAnchor="middle"
                      fontFamily={mono.fontFamily}
                      fontSize={9.5}
                      fontWeight={600}
                      fill={row.route.color}
                    >
                      {CODE[t.tradition.id]}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* the legend maps the two-letter codes to the traditions */}
      <div
        style={{
          ...mono,
          fontSize: 10.5,
          color: c.faint,
          marginTop: 14,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px 12px',
          lineHeight: 1.5,
        }}
      >
        {TRADITIONS.map((t) => (
          <span key={t.id}>
            <span style={{ color: c.muted }}>{CODE[t.id]}</span> {t.label}
          </span>
        ))}
        <span style={{ color: c.faint }}>
          <span style={{ color: c.muted }}>dashed</span> a looser fit
        </span>
      </div>
    </Figure>
  );
}
