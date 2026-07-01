import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';

/**
 * fig_17.2, the default as terrain. The option you get when you do nothing is the
 * option you get most of the time, so the shape of the ground decides where you
 * end up. On the left the ground is graded for someone else's benefit: the feed is
 * downhill and frictionless, the walk is uphill, and you slide to the feed without
 * deciding to. On the right it is the same two options and the same you, but you
 * have regraded the hill, adding friction to the feed and taking it off the calm
 * choice, so now you slide to calm. Designing your defaults is regrading the hill.
 */

const PW = 256; // panel width
const PH = 172; // panel height
const GAP = 20;
const VW = PW * 2 + GAP;

// friction marks: short strokes along the uphill shoulder to read as effort
function hatch(cx: number, cy: number, color: string, i: number) {
  return (
    <line
      key={i}
      x1={cx - 5}
      y1={cy - 6}
      x2={cx + 3}
      y2={cy + 4}
      stroke={color}
      strokeWidth={1.4}
      strokeOpacity={0.7}
      strokeLinecap="round"
    />
  );
}

export function DefaultTerrainFigure() {
  return (
    <Figure
      caption="fig_17.2 · the_default_is_terrain: regrade the hill"
      sub="The default is whatever you get when you do nothing, and you do nothing most of the time, so it wins. Much of your environment is graded for someone else, with the feed downhill and frictionless. You can regrade it: add friction to what you want less of, take it off what you want more of, and the calm option becomes the one you slide into."
      max={VW}
    >
      <svg
        viewBox={`0 0 ${VW} ${PH + 26}`}
        width="100%"
        role="img"
        aria-label="Two panels showing the same landscape graded two ways. On the left, set for you, the ground slopes down to the right toward the feed, which is frictionless, while a walk or a book sits uphill, so the ball rolls to the feed. On the right, reset by you, the ground has been regraded to slope down to the left toward a walk, a book, and quiet, with friction added to the feed uphill, so the ball rolls to calm."
        style={{ display: 'block' }}
      >
        {/* ── Panel A: the default, set for you ─────────────────── */}
        <g>
          <rect x={0} y={0} width={PW} height={PH} rx={12} fill={c.panel} stroke={c.line} />
          <text x={14} y={20} style={{ ...mono, fontSize: 11.5, fontWeight: 600 }} fill={c.muted}>
            the default, set for you
          </text>

          {/* ground: downhill to the right */}
          <path
            d={`M 18 60 C 96 60, 150 128, ${PW - 18} 130 L ${PW - 18} ${PH - 14} L 18 ${PH - 14} Z`}
            fill={`${c.coral}0c`}
          />
          <path
            d={`M 18 60 C 96 60, 150 128, ${PW - 18} 130`}
            fill="none"
            stroke={c.coral}
            strokeOpacity={0.55}
            strokeWidth={2}
          />

          {/* friction on the uphill (calm) shoulder, top left */}
          {[0, 1, 2].map((i) => hatch(30 + i * 12, 60 + i * 1.5, c.faint, i))}
          <text x={18} y={50} style={{ ...mono, fontSize: 10.5, fontWeight: 600 }} fill={c.muted}>
            a walk, a book
          </text>
          <text x={18} y={63} style={{ ...mono, fontSize: 9.5 }} fill={c.faint}>
            uphill from here
          </text>

          {/* the ball, resting in the feed */}
          <circle cx={PW - 42} cy={119} r={9} fill={c.coral} />
          <circle cx={PW - 42} cy={119} r={13} fill="none" stroke={c.coral} strokeOpacity={0.3} strokeWidth={1.5} />
          <text x={PW - 18} y={150} textAnchor="end" style={{ ...mono, fontSize: 11.5, fontWeight: 600 }} fill={c.coral}>
            the feed
          </text>
          <text x={PW - 18} y={163} textAnchor="end" style={{ ...mono, fontSize: 9.5 }} fill={c.faint}>
            one tap, no friction
          </text>
        </g>

        {/* ── Panel B: reset by you ─────────────────────────────── */}
        <g transform={`translate(${PW + GAP},0)`}>
          <rect x={0} y={0} width={PW} height={PH} rx={12} fill={c.panel} stroke={c.line} />
          <text x={14} y={20} style={{ ...mono, fontSize: 11.5, fontWeight: 600 }} fill={c.teal}>
            the default, reset by you
          </text>

          {/* ground: downhill to the left */}
          <path
            d={`M 18 130 C ${PW - 150} 128, ${PW - 96} 60, ${PW - 18} 60 L ${PW - 18} ${PH - 14} L 18 ${PH - 14} Z`}
            fill={`${c.teal}0d`}
          />
          <path
            d={`M 18 130 C ${PW - 150} 128, ${PW - 96} 60, ${PW - 18} 60`}
            fill="none"
            stroke={c.teal}
            strokeOpacity={0.6}
            strokeWidth={2}
          />

          {/* friction added on the uphill (feed) shoulder, top right */}
          {[0, 1, 2].map((i) => hatch(PW - 54 + i * 12, 62 - i * 1.5, c.amber, i))}
          <text x={PW - 18} y={50} textAnchor="end" style={{ ...mono, fontSize: 10.5, fontWeight: 600 }} fill={c.muted}>
            the feed
          </text>
          <text x={PW - 18} y={62} textAnchor="end" style={{ ...mono, fontSize: 9.5 }} fill={c.amber}>
            friction added
          </text>

          {/* the ball, resting in calm */}
          <circle cx={42} cy={119} r={9} fill={c.teal} />
          <circle cx={42} cy={119} r={13} fill="none" stroke={c.teal} strokeOpacity={0.35} strokeWidth={1.5} />
          <text x={18} y={150} style={{ ...mono, fontSize: 11.5, fontWeight: 600 }} fill={c.teal}>
            a walk, quiet
          </text>
          <text x={18} y={163} style={{ ...mono, fontSize: 9.5 }} fill={c.faint}>
            now the easy path
          </text>
        </g>
      </svg>

      <div style={{ display: 'flex', gap: GAP, marginTop: 4 }}>
        <div style={{ flex: 1, textAlign: 'center', ...mono, fontSize: 10, color: c.faint }}>
          do nothing, and you slide to the feed
        </div>
        <div style={{ flex: 1, textAlign: 'center', ...mono, fontSize: 10, color: c.faint }}>
          do nothing, and you slide to calm
        </div>
      </div>
    </Figure>
  );
}
