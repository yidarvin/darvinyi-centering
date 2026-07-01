import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';

/**
 * fig_17.1, the calm-environment checklist. The chapter's map: three domains you
 * can design, space, time, and attention, each with the handful of levers that
 * matter, and one lever running under all three. It reads top to bottom so it
 * stays legible on a phone. The teal spine at the foot is the point: in every
 * domain the move is the same, change the default so the calm option is the easy
 * one. Not a scored checklist, a layout of where the work is.
 */

const VW = 520;
const ROW_H = 66;
const ROW_GAP = 12;
const TOP = 6;
const LABEL_W = 132;

interface Band {
  name: string;
  color: string;
  levers: string[];
}

const BANDS: Band[] = [
  { name: 'your space', color: c.coral, levers: ['light', 'sound', 'clutter', 'green'] },
  { name: 'your time', color: c.amber, levers: ['margin', 'a clear off', 'slow transitions', 'idleness'] },
  { name: 'your attention', color: c.violet, levers: ['notifications', 'feeds', "the phone's pull", 'one screen'] },
];

function Chip({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  const w = label.length * 6.6 + 18;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={22} rx={6} fill={`${color}14`} stroke={`${color}55`} />
      <text x={w / 2} y={15} textAnchor="middle" style={{ ...mono, fontSize: 11 }} fill={color}>
        {label}
      </text>
    </g>
  );
}

export function CalmChecklistFigure() {
  const bandsTop = TOP;
  const spineY = bandsTop + BANDS.length * (ROW_H + ROW_GAP) + 6;
  const VH = spineY + 46;

  return (
    <Figure
      caption="fig_17.1 · calm_environment_checklist: space, time, attention"
      sub="Three domains you can design, and the levers in each. The one move that runs under all of them sits at the foot: change the default so the calm option is the path of least resistance. Most of the levers are subtractions."
      max={VW}
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        role="img"
        aria-label="A map of three domains you can design for calm. Your space: light, sound, clutter, green. Your time: margin, a clear off, slow transitions, idleness. Your attention: notifications, feeds, the phone's pull, one screen. Running under all three: change the default so the calm option is the easy one."
        style={{ display: 'block' }}
      >
        {BANDS.map((b, i) => {
          const y = bandsTop + i * (ROW_H + ROW_GAP);
          // lay the chips out in two rows of two so they never crowd on a phone
          const chipX = LABEL_W + 14;
          return (
            <g key={b.name}>
              {/* band frame */}
              <rect
                x={0}
                y={y}
                width={VW}
                height={ROW_H}
                rx={11}
                fill={`${b.color}0a`}
                stroke={`${b.color}33`}
              />
              {/* domain label cell */}
              <rect x={0} y={y} width={LABEL_W} height={ROW_H} rx={11} fill={`${b.color}12`} />
              <line x1={LABEL_W} y1={y + 8} x2={LABEL_W} y2={y + ROW_H - 8} stroke={`${b.color}30`} />
              <text x={16} y={y + ROW_H / 2 - 3} style={{ ...mono, fontSize: 13, fontWeight: 600 }} fill={b.color}>
                {b.name}
              </text>
              <text x={16} y={y + ROW_H / 2 + 15} style={{ ...mono, fontSize: 10 }} fill={c.faint}>
                design it
              </text>
              {/* levers, two per row */}
              <Chip x={chipX} y={y + 10} label={b.levers[0]} color={b.color} />
              <Chip x={chipX + 128} y={y + 10} label={b.levers[1]} color={b.color} />
              <Chip x={chipX} y={y + 34} label={b.levers[2]} color={b.color} />
              <Chip x={chipX + 128} y={y + 34} label={b.levers[3]} color={b.color} />
            </g>
          );
        })}

        {/* the shared lever: the teal spine under all three */}
        <rect x={0} y={spineY} width={VW} height={34} rx={10} fill={c.tealFog} stroke={c.tealEdge} />
        <text x={VW / 2} y={spineY + 15} textAnchor="middle" style={{ ...mono, fontSize: 11.5, fontWeight: 600 }} fill={c.teal}>
          the lever in all three
        </text>
        <text x={VW / 2} y={spineY + 28} textAnchor="middle" style={{ ...mono, fontSize: 10.5 }} fill={c.muted}>
          change the default so calm is the path of least resistance
        </text>
      </svg>
    </Figure>
  );
}
