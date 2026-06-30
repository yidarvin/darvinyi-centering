import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_13.3, awe and the small self. Two framings of the same person. On the left the
 * self is life-size and fills the frame, looping on its own worries (rumination), and
 * the world is a thin line behind it. On the right the person stands before something
 * vast, a thing too big to fit the mind's existing categories, and the self shrinks to
 * scale. The shrinking is the relief: when the self is small, its troubles are small
 * with it. This encodes the two marks of awe, vastness and a need for accommodation
 * (Keltner & Haidt), and the small-self effect (Piff, Keltner) that follows from them.
 */

const VAST = c.amber;
const SELF_BIG = c.coral;
const SELF_SMALL = c.teal;

const PANEL_W = 196;
const GAP = 18;
const H = 168;

export function AweSmallSelfFigure() {
  const totalW = 2 * PANEL_W + GAP;
  return (
    <Figure
      caption="fig_13.3 · awe_and_the_small_self"
      sub="Awe has two marks: something vast, and a thing your mind cannot quite file, so it has to make room (a need for accommodation). Stand in front of it, a mountain, a night sky, a stand of old trees, and the self drops to its real size. That is the gift, not the view. A smaller self carries a lighter load of itself, and for a while the looping quiets."
      max={totalW}
    >
      <svg
        viewBox={`0 0 ${totalW} ${H + 20}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Left: a large self filling the frame, looping on its own worries, with a tiny world behind it. Right: the same self shrunk to a small dot before a vast mountain and stars."
      >
        {/* left: the self, life-size */}
        <g>
          <rect x={0} y={0} width={PANEL_W} height={H} rx={11} fill={`${SELF_BIG}08`} stroke={`${SELF_BIG}30`} />
          {/* thin, distant world */}
          <line x1={14} y1={H - 26} x2={PANEL_W - 14} y2={H - 26} stroke={c.faint} strokeWidth={1} strokeDasharray="3 5" />
          <text x={PANEL_W - 16} y={H - 31} textAnchor="end" style={{ ...mono, fontSize: 9, fill: c.faint }}>
            world
          </text>
          {/* the looming self */}
          <circle cx={PANEL_W / 2} cy={74} r={52} fill={`${SELF_BIG}1c`} stroke={`${SELF_BIG}99`} strokeWidth={1.6} />
          {/* rumination loops inside */}
          {[0, 1, 2].map((k) => (
            <ellipse
              key={k}
              cx={PANEL_W / 2}
              cy={74}
              rx={30 - k * 7}
              ry={16 - k * 3}
              fill="none"
              stroke={SELF_BIG}
              strokeWidth={1}
              strokeOpacity={0.5}
              transform={`rotate(${k * 60} ${PANEL_W / 2} 74)`}
            />
          ))}
          <text x={PANEL_W / 2} y={78} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 600, fill: SELF_BIG }}>
            self
          </text>
          <text x={PANEL_W / 2} y={H - 9} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 600, fill: SELF_BIG }}>
            life-size · looping
          </text>
        </g>

        {/* right: before something vast */}
        <g transform={`translate(${PANEL_W + GAP},0)`}>
          <rect x={0} y={0} width={PANEL_W} height={H} rx={11} fill={`${VAST}08`} stroke={`${VAST}30`} />
          {/* stars */}
          {[
            [40, 26],
            [150, 20],
            [110, 40],
            [70, 18],
            [170, 52],
            [24, 50],
          ].map(([sx, sy], k) => (
            <circle key={k} cx={sx} cy={sy} r={1.4} fill={VAST} opacity={0.8} />
          ))}
          {/* the vast mountain */}
          <path
            d={`M14 ${H - 26} L78 58 L120 96 L150 70 L${PANEL_W - 14} ${H - 26} Z`}
            fill={`${VAST}18`}
            stroke={`${VAST}88`}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <text x={PANEL_W / 2} y={48} textAnchor="middle" style={{ ...mono, fontSize: 9.5, fill: VAST }}>
            vastness
          </text>
          {/* the small self */}
          <circle cx={PANEL_W / 2} cy={H - 33} r={7} fill={`${SELF_SMALL}33`} stroke={SELF_SMALL} strokeWidth={1.5} />
          <text x={PANEL_W / 2 + 13} y={H - 30} style={{ ...mono, fontSize: 9, fill: SELF_SMALL }}>
            small self
          </text>
          <text x={PANEL_W / 2} y={H - 9} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 600, fill: VAST }}>
            to scale · the load lightens
          </text>
        </g>
      </svg>

      <div
        style={{
          ...mono,
          fontSize: 10,
          color: c.faint,
          marginTop: 10,
          paddingTop: 10,
          borderTop: `1px solid ${c.line}`,
          lineHeight: 1.55,
        }}
      >
        <span style={{ color: c.muted }}>the move:</span> vastness + a need for accommodation → the self
        drops to size → rumination quiets, and the same trouble is suddenly smaller than it was.
      </div>
    </Figure>
  );
}
