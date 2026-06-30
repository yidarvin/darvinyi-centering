import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_12.1, surrender as releasing the grip. Three states of the same worry (the
 * orb): white-knuckle gripping (strain, the thing held so tight it deforms),
 * abandoning it (letting it drop and turning away, which is resignation, not calm),
 * and releasing it (holding it open, present but unclenched). Surrender is the third,
 * the middle path between forcing and giving up. This encodes the chapter's care that
 * letting go is not the same as not caring, the equanimity-versus-suppression spine.
 */

interface Panel {
  key: string;
  label: string;
  sub: string;
  color: string;
}

const PANELS: Panel[] = [
  { key: 'grip', label: 'grip', sub: 'white-knuckle', color: c.coral },
  { key: 'abandon', label: 'abandon', sub: 'give up, walk away', color: c.faint },
  { key: 'release', label: 'release', sub: 'hold it open', color: c.teal },
];

const PW = 150; // panel width
const GAP = 14;
const CY = 64; // vertical center of the drawing

function panelX(i: number) {
  return i * (PW + GAP) + PW / 2;
}

export function SurrenderGripFigure() {
  const totalW = PANELS.length * PW + (PANELS.length - 1) * GAP;
  return (
    <Figure
      caption="fig_12.1 · surrender_is_not_resignation"
      sub="The same worry, held three ways. Grip it and the strain is yours and it deforms. Drop it and turn away, and that is resignation, the numbness this book keeps refusing. Surrender is the third: you stop clenching, but the thing stays in view, held open. Letting go is not not caring."
      max={totalW}
    >
      <svg
        viewBox={`0 0 ${totalW} 116`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Three states of holding a worry: gripping with strain, abandoning by letting it drop, and releasing by holding it open without strain."
      >
        <defs>
          <marker id="grip-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L5 3 L0 6 Z" fill={c.coral} />
          </marker>
          <marker id="drop-arrow" markerWidth="8" markerHeight="8" refX="3" refY="6" orient="auto">
            <path d="M0 0 L6 0 L3 6 Z" fill={c.faint} />
          </marker>
        </defs>

        {PANELS.map((p, i) => {
          const cx = panelX(i);
          return (
            <g key={p.key}>
              {/* panel frame */}
              <rect
                x={i * (PW + GAP)}
                y={0}
                width={PW}
                height={92}
                rx={11}
                fill={`${p.color}0c`}
                stroke={`${p.color}3a`}
                strokeWidth={1}
              />

              {p.key === 'grip' && (
                <>
                  {/* a near-closed claw clamping the orb */}
                  <path
                    d={`M${cx + 26} ${CY - 22} A 26 26 0 1 1 ${cx + 12} ${CY - 23}`}
                    fill="none"
                    stroke={p.color}
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  {/* the squeezed orb, deformed to an ellipse */}
                  <ellipse cx={cx} cy={CY} rx={12} ry={9.5} fill={`${p.color}33`} stroke={p.color} strokeWidth={1.5} />
                  {/* compression arrows pointing inward */}
                  {[
                    [cx - 34, CY, cx - 18, CY],
                    [cx + 34, CY, cx + 18, CY],
                    [cx, CY - 34, cx, CY - 16],
                    [cx, CY + 30, cx, CY + 14],
                  ].map(([x1, y1, x2, y2], k) => (
                    <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={p.color} strokeWidth={1.4} markerEnd="url(#grip-arrow)" />
                  ))}
                </>
              )}

              {p.key === 'abandon' && (
                <>
                  {/* an open hand-curve at the top, tipped, now empty */}
                  <path
                    d={`M${cx - 30} ${CY - 26} Q ${cx} ${CY - 6} ${cx + 30} ${CY - 26}`}
                    fill="none"
                    stroke={p.color}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                  />
                  {/* the orb falling away */}
                  <circle cx={cx} cy={CY + 22} r={10.5} fill={`${p.color}22`} stroke={p.color} strokeWidth={1.4} strokeDasharray="3 3" />
                  <line x1={cx} y1={CY - 6} x2={cx} y2={CY + 8} stroke={p.color} strokeWidth={1.3} strokeDasharray="2 3" markerEnd="url(#drop-arrow)" />
                </>
              )}

              {p.key === 'release' && (
                <>
                  {/* an open cup holding the orb at rest */}
                  <path
                    d={`M${cx - 30} ${CY - 18} Q ${cx} ${CY + 30} ${cx + 30} ${CY - 18}`}
                    fill="none"
                    stroke={p.color}
                    strokeWidth={2.6}
                    strokeLinecap="round"
                  />
                  {/* soft halo + the resting orb */}
                  <circle cx={cx} cy={CY - 2} r={18} fill={`${p.color}10`} />
                  <circle cx={cx} cy={CY - 2} r={12} fill={`${p.color}2e`} stroke={p.color} strokeWidth={1.5} />
                </>
              )}

              {/* labels */}
              <text
                x={cx}
                y={106}
                textAnchor="middle"
                style={{ ...mono, fontSize: 12.5, fill: p.color, fontWeight: 600 }}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* sub labels as text under the svg, for legibility on small screens */}
      <div style={{ display: 'flex', gap: GAP, marginTop: 2 }}>
        {PANELS.map((p) => (
          <div
            key={p.key}
            style={{
              flex: 1,
              textAlign: 'center',
              ...mono,
              fontSize: 10.5,
              color: c.faint,
            }}
          >
            {p.sub}
          </div>
        ))}
      </div>
    </Figure>
  );
}
