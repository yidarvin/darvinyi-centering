import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_13.2, simplicity as freedom. The same fixed container, your finite time and
 * attention and space, filled two ways. On the left it is packed edge to edge with
 * small obligations and wants, "frittered away by detail," with no room left over.
 * On the right most of those are subtracted, a few essentials remain, and the room
 * that opens up is the point: the teal center, the calm, finally has space to sit in.
 * Simplicity here is not aesthetic minimalism. It is room, bought by subtraction.
 */

const PANEL_W = 196;
const GAP = 18;
const GRID = { x: 16, y: 22, cell: 30, cols: 5, rows: 4, pad: 4 };

// which cells stay filled in the "deliberate" panel (the essentials, two or three)
const KEEP = new Set([7, 8, 11, 12]);

function cellRect(i: number) {
  const col = i % GRID.cols;
  const row = Math.floor(i / GRID.cols);
  return {
    x: GRID.x + col * GRID.cell + GRID.pad / 2,
    y: GRID.y + row * GRID.cell + GRID.pad / 2,
    s: GRID.cell - GRID.pad,
  };
}

export function SimplicityFreedomFigure() {
  const totalW = 2 * PANEL_W + GAP;
  const count = GRID.cols * GRID.rows;
  const panelH = GRID.y + GRID.rows * GRID.cell + 14;

  return (
    <Figure
      caption="fig_13.2 · simplicity_as_freedom"
      sub="The container is the same size on both sides: your one finite life. Pack it with detail and there is no room left to be in it. Subtract most of it, keep the two or three things that matter, and the room that opens is not emptiness. It is where the calm gets to sit. Fewer wants, more room."
      max={totalW}
    >
      <svg
        viewBox={`0 0 ${totalW} ${panelH + 22}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two equal containers. The first is packed full of small tiles with no space. The second keeps only a few tiles, and the open room left over holds a calm teal center."
      >
        {/* left: frittered */}
        <g>
          <rect x={0} y={0} width={PANEL_W} height={panelH} rx={11} fill={`${c.coral}08`} stroke={`${c.coral}33`} />
          {Array.from({ length: count }, (_, i) => {
            const r = cellRect(i);
            return (
              <rect
                key={i}
                x={r.x}
                y={r.y}
                width={r.s}
                height={r.s}
                rx={4}
                fill={`${c.coral}26`}
                stroke={`${c.coral}55`}
                strokeWidth={0.8}
              />
            );
          })}
          <text x={PANEL_W / 2} y={panelH - 1} textAnchor="middle" style={{ ...mono, fontSize: 11.5, fontWeight: 600, fill: c.coral }}>
            frittered
          </text>
        </g>

        {/* right: deliberate */}
        <g transform={`translate(${PANEL_W + GAP},0)`}>
          <rect x={0} y={0} width={PANEL_W} height={panelH} rx={11} fill={`${c.teal}08`} stroke={`${c.teal}33`} />
          {/* the open room: a soft halo + the calm center */}
          <circle cx={PANEL_W / 2} cy={GRID.y + (GRID.rows * GRID.cell) / 2} r={46} fill={`${c.teal}0e`} />
          <circle cx={PANEL_W / 2} cy={GRID.y + (GRID.rows * GRID.cell) / 2} r={15} fill={`${c.teal}2e`} stroke={c.teal} strokeWidth={1.6} />
          {Array.from({ length: count }, (_, i) => {
            const r = cellRect(i);
            const keep = KEEP.has(i);
            if (!keep) return null;
            return (
              <rect
                key={i}
                x={r.x}
                y={r.y}
                width={r.s}
                height={r.s}
                rx={4}
                fill={`${c.teal}26`}
                stroke={`${c.teal}66`}
                strokeWidth={0.9}
              />
            );
          })}
          <text x={PANEL_W / 2} y={panelH - 1} textAnchor="middle" style={{ ...mono, fontSize: 11.5, fontWeight: 600, fill: c.teal }}>
            deliberate
          </text>
        </g>
      </svg>

      <div style={{ display: 'flex', gap: GAP, marginTop: 4 }}>
        <div style={{ flex: 1, textAlign: 'center', ...mono, fontSize: 10, color: c.faint }}>
          every cell spoken for · no margin
        </div>
        <div style={{ flex: 1, textAlign: 'center', ...mono, fontSize: 10, color: c.faint }}>
          a few essentials · the rest is room
        </div>
      </div>
    </Figure>
  );
}
