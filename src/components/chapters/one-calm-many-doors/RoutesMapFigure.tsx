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
 *
 * Layout: each route gets a two-line block, a header (route label left, door
 * count right) over a row of coded chips, one per tradition that walks it. The
 * header sits above the chips rather than beside them so the whole figure can
 * run at a narrow viewBox width and still stay legible on a phone; the earlier
 * side-by-side layout wasted no data, but it forced a wide, cramped canvas.
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

const WIDTH = 300;
const MARGIN_X = 4;
const TOP = 16;
const ROW_H = 76;
const HEADER_DY = 16; // header text baseline, measured from the row's top
const CHIP_DY = 50; // chip row center, measured from the row's top
const R = 12; // chip radius
const PITCH = 34; // chip center-to-center spacing
const DOT_START = MARGIN_X + R; // first chip's center x

export function RoutesMapFigure() {
  const rows = routesWithTraditions();
  const height = TOP * 2 + rows.length * ROW_H;

  return (
    <Figure
      caption="fig_14.1 · the_routes, and how many doors open onto each"
      sub="The same handful of moves, each shown across the traditions at once, sorted from the most-traveled road to the least crowded."
      max={330}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="The seven routes to calm, sorted by how many traditions use each. Presence is used by eight traditions, letting go by seven, perspective by four, enough and connection by three each, the body by two, and meaning by one."
      >
        {rows.map((row, i) => {
          const rowTop = TOP + i * ROW_H;
          const headerY = rowTop + HEADER_DY;
          const chipY = rowTop + CHIP_DY;
          const lastChipX = DOT_START + (row.traditions.length - 1) * PITCH;

          return (
            <g key={row.route.id}>
              {/* header line: route label left, door count right */}
              <text
                x={MARGIN_X}
                y={headerY}
                fontFamily={mono.fontFamily}
                fontSize={16}
                fontWeight={600}
                fill={row.route.color}
              >
                {row.route.label}
              </text>
              <text
                x={WIDTH - MARGIN_X}
                y={headerY}
                textAnchor="end"
                fontFamily={mono.fontFamily}
                fontSize={13}
                fill={c.faint}
              >
                {row.traditions.length === 1 ? '1 door' : `${row.traditions.length} doors`}
              </text>

              {/* a faint rail behind the chips */}
              <line
                x1={DOT_START}
                y1={chipY}
                x2={lastChipX}
                y2={chipY}
                stroke={row.route.color}
                strokeOpacity={0.22}
                strokeWidth={1}
              />

              {/* one coded chip per tradition that walks this route */}
              {row.traditions.map((t, j) => {
                const cx = DOT_START + j * PITCH;
                const soft = t.cell.soft;
                return (
                  <g key={t.tradition.id}>
                    <circle
                      cx={cx}
                      cy={chipY}
                      r={R}
                      fill={`${row.route.color}22`}
                      stroke={row.route.color}
                      strokeOpacity={soft ? 0.4 : 0.85}
                      strokeWidth={1.4}
                      strokeDasharray={soft ? '2 3' : undefined}
                    />
                    <text
                      x={cx}
                      y={chipY}
                      dy={4.5}
                      textAnchor="middle"
                      fontFamily={mono.fontFamily}
                      fontSize={13}
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
          fontSize: 11.5,
          color: c.faint,
          marginTop: 14,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px 12px',
          lineHeight: 1.55,
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
