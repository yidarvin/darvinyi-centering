import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';
import { SITUATIONS, ROUTE_ORDER, getRoute } from './practices';

/**
 * fig_16.1, the route-and-situation matrix. Down the left, six common hard
 * moments. Across the top, the seven routes. A filled cell means that route
 * actually helps with that moment. The shape is the lesson: no row is full, each
 * situation lights a different few, and the acute moments lean on the body,
 * presence, letting go, and perspective, while the slower structural routes
 * (enough, connection, meaning) carry the heavier, longer kinds of trouble.
 */

const VW = 600;
const COL_W = 50;
const X0 = 232; // grid left edge
const Y_TOP = 122; // grid top edge
const ROW_H = 40;
const LABEL_X = 212;

function colCenter(i: number) {
  return X0 + COL_W / 2 + i * COL_W;
}
function rowCenter(r: number) {
  return Y_TOP + ROW_H / 2 + r * ROW_H;
}

/** wrap a situation label onto at most two short lines for the left column */
function wrapLabel(s: string, max = 18): string[] {
  const words = s.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
}

export function RouteSituationMatrixFigure() {
  const gridBottom = Y_TOP + SITUATIONS.length * ROW_H;
  const VH = gridBottom + 22;

  return (
    <Figure
      caption="fig_16.1 · route_x_situation: which routes meet which moment"
      sub="A filled cell is a route that genuinely helps that moment. No situation needs all seven. The hot moments (a racing night, a sharp word) are met by the body, presence, letting go, and perspective. The heavier trouble (loss, going flat) leans on connection and meaning."
      max={600}
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        role="img"
        aria-label="A matrix of six hard situations by the seven routes to calm, with a filled cell where a route helps that situation. Each situation is served by a different few routes, never all seven."
        style={{ display: 'block' }}
      >
        {/* faint column tints, to tie each column to its route color */}
        {ROUTE_ORDER.map((id, i) => {
          const route = getRoute(id);
          return (
            <rect
              key={`tint-${id}`}
              x={X0 + i * COL_W + 3}
              y={Y_TOP}
              width={COL_W - 6}
              height={gridBottom - Y_TOP}
              rx={7}
              fill={route.color}
              opacity={0.05}
            />
          );
        })}

        {/* angled route headers, in route color */}
        {ROUTE_ORDER.map((id, i) => {
          const route = getRoute(id);
          const cx = colCenter(i);
          const cy = Y_TOP - 10;
          return (
            <text
              key={`head-${id}`}
              x={cx}
              y={cy}
              transform={`rotate(-40 ${cx} ${cy})`}
              textAnchor="start"
              style={{ ...mono, fontSize: 11, fontWeight: 600 }}
              fill={route.color}
            >
              {route.label}
            </text>
          );
        })}

        {/* divider between labels and grid */}
        <line x1={X0 - 12} y1={Y_TOP} x2={X0 - 12} y2={gridBottom} stroke={c.line2} strokeWidth={1} />

        {/* rows: situation label + cells */}
        {SITUATIONS.map((sit, r) => {
          const yc = rowCenter(r);
          const set = new Set(sit.routes);
          const lines = wrapLabel(sit.label);
          return (
            <g key={sit.id}>
              {/* zebra row guide */}
              {r % 2 === 1 && (
                <rect x={0} y={Y_TOP + r * ROW_H} width={VW} height={ROW_H} fill="#ffffff" opacity={0.012} />
              )}
              {/* situation label, right-aligned, up to two lines */}
              {lines.map((ln, li) => (
                <text
                  key={li}
                  x={LABEL_X}
                  y={lines.length === 1 ? yc + 4 : yc - 4 + li * 13}
                  textAnchor="end"
                  style={{ fontSize: 12.5 }}
                  fill={c.prose}
                >
                  {ln}
                </text>
              ))}
              {/* cells */}
              {ROUTE_ORDER.map((id, i) => {
                const route = getRoute(id);
                const cx = colCenter(i);
                const on = set.has(id);
                if (on) {
                  return (
                    <g key={id}>
                      <rect
                        x={cx - 10}
                        y={yc - 10}
                        width={20}
                        height={20}
                        rx={5}
                        fill={route.color}
                        fillOpacity={0.9}
                      />
                      <path
                        d={`M ${cx - 4.5} ${yc + 0.5} l 3 3 l 6 -7`}
                        fill="none"
                        stroke={c.bg}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                }
                return <circle key={id} cx={cx} cy={yc} r={2.4} fill={c.faint} opacity={0.5} />;
              })}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
