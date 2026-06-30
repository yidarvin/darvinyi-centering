import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// stages drawn top (deepest calm) to bottom (scattered start). the breath is the
// anchor running up the whole climb. the four jhanas follow the sutta drop-off:
// applied-and-sustained thought stills together at the second, rapture fades at
// the third, pleasure is set down at the fourth, leaving equanimity.
const STAGES = [
  {
    k: 'fourth jhāna',
    detail: 'pleasure and pain set down · pure equanimity, one-pointed',
    col: c.teal,
    fill: 'rgba(45,212,191,0.16)',
    dashed: false,
  },
  {
    k: 'third jhāna',
    detail: 'rapture fades · equanimous, alert, content',
    col: c.teal,
    fill: 'rgba(45,212,191,0.11)',
    dashed: false,
  },
  {
    k: 'second jhāna',
    detail: 'thinking stills · inner rapture and pleasure',
    col: c.teal,
    fill: 'rgba(45,212,191,0.08)',
    dashed: false,
  },
  {
    k: 'first jhāna',
    detail: 'applied and sustained thought · rapture, pleasure',
    col: c.tealDim,
    fill: 'rgba(13,148,136,0.10)',
    dashed: false,
  },
  {
    k: 'access concentration',
    detail: 'the hindrances go quiet · later commentary, not the suttas',
    col: c.amber,
    fill: c.amberFog,
    dashed: true,
  },
  {
    k: 'the scattered mind',
    detail: 'desire · ill will · sloth · restlessness · doubt',
    col: c.coral,
    fill: c.coralFog,
    dashed: false,
  },
];

const TOP = 40;
const ROW_H = 44;
const GAP = 8;
const LEFT = 64;
const RIGHT = 482;

export function SettlingStagesFigure() {
  const height = TOP + STAGES.length * ROW_H + (STAGES.length - 1) * GAP + 14;
  return (
    <Figure
      caption="fig_06.3a · the_mind_settling"
      sub="the Theravāda map. resting on the breath (ānāpānasati, MN 118), the five hindrances quiet like silt sinking out of water, and concentration deepens through the four jhānas, each shedding one more coarse factor until only equanimity and one-pointedness remain. access concentration is a later refinement from the commentaries, not a stage named in the suttas. the Tibetan tradition draws a parallel nine-stage road, the elephant-taming path: a different map of the same settling."
      max={540}
    >
      <svg
        viewBox={`0 0 520 ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A ladder of calm read from the bottom up. At the base, the scattered mind with its five hindrances: desire, ill will, sloth, restlessness, and doubt. Above it, access concentration, marked as later commentary. Then the four jhanas in turn, each shedding a coarser factor: the first with applied and sustained thought, rapture, and pleasure; the second as thinking stills; the third as rapture fades into equanimity; the fourth setting down pleasure and pain into pure equanimity and one-pointedness. The breath is the anchor running up the whole climb."
      >
        <defs>
          <marker id="ss-up" markerWidth="9" markerHeight="9" refX="3" refY="6.5" orient="auto">
            <path d="M0 6.5 L3 0 L6 6.5 Z" fill={c.tealDim} />
          </marker>
        </defs>

        {/* the breath rail, running up the climb */}
        <line
          x1={34}
          y1={TOP + STAGES.length * ROW_H + (STAGES.length - 1) * GAP}
          x2={34}
          y2={TOP + 6}
          stroke={c.tealDim}
          strokeWidth={1.4}
          strokeDasharray="2 4"
          markerEnd="url(#ss-up)"
        />
        <text
          x={20}
          y={TOP + (STAGES.length * ROW_H) / 2}
          transform={`rotate(-90 20 ${TOP + (STAGES.length * ROW_H) / 2})`}
          textAnchor="middle"
          fontFamily={monoFamily}
          fontSize={10}
          fill={c.tealDim}
        >
          the breath, throughout
        </text>

        {STAGES.map((s, i) => {
          const y = TOP + i * (ROW_H + GAP);
          return (
            <g key={s.k}>
              <rect
                x={LEFT}
                y={y}
                width={RIGHT - LEFT}
                height={ROW_H}
                rx={9}
                fill={s.fill}
                stroke={s.col}
                strokeOpacity={s.dashed ? 0.7 : 0.85}
                strokeWidth={1.3}
                strokeDasharray={s.dashed ? '4 4' : undefined}
              />
              <text
                x={LEFT + 16}
                y={y + 19}
                fontFamily={monoFamily}
                fontSize={12.5}
                fontWeight={600}
                fill={s.col}
              >
                {s.k}
              </text>
              <text x={LEFT + 16} y={y + 34} fontFamily={monoFamily} fontSize={9.5} fill={c.muted}>
                {s.detail}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
