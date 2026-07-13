import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// stages drawn top (deepest calm) to bottom (scattered start). the breath is the
// anchor running up the whole climb. the four jhanas follow the sutta drop-off:
// applied-and-sustained thought stills together at the second, rapture fades at
// the third, pleasure is set down at the fourth, leaving equanimity.
//
// each detail is pre-wrapped into short lines (not truncated or shortened) so
// every line of text can render at a legible size on a phone screen without
// overlapping its neighbors. the words themselves are unchanged from the prose.
const STAGES = [
  {
    k: 'fourth jhāna',
    lines: ['pleasure and pain set down ·', 'equanimity,', 'mindfulness purified'],
    col: c.teal,
    fill: 'rgba(45,212,191,0.16)',
    dashed: false,
  },
  {
    k: 'third jhāna',
    lines: ['rapture fades ·', 'equanimous, alert, content'],
    col: c.teal,
    fill: 'rgba(45,212,191,0.11)',
    dashed: false,
  },
  {
    k: 'second jhāna',
    lines: ['thinking stills ·', 'inner rapture and pleasure'],
    col: c.teal,
    fill: 'rgba(45,212,191,0.08)',
    dashed: false,
  },
  {
    k: 'first jhāna',
    lines: ['applied and sustained thought', '· rapture, pleasure'],
    col: c.tealDim,
    fill: 'rgba(13,148,136,0.10)',
    dashed: false,
  },
  {
    k: 'access concentration',
    lines: ['the hindrances go quiet ·', 'later commentary,', 'not the suttas'],
    col: c.amber,
    fill: c.amberFog,
    dashed: true,
  },
  {
    k: 'the scattered mind',
    lines: ['desire · ill will · sloth ·', 'restlessness · doubt'],
    col: c.coral,
    fill: c.coralFog,
    dashed: false,
  },
];

// layout constants (viewBox units). font sizes are chosen so that, once the
// SVG is scaled down to the site's fixed 288px mobile content width against
// this 600-wide viewBox (scale 0.48), every text element still renders at a
// comfortable >=11px effective size:
//   title  27 * 0.48 = 12.96px
//   detail 24 * 0.48 = 11.52px
//   breath 24 * 0.48 = 11.52px
const TITLE_FS = 27;
const DETAIL_FS = 24;
const BREATH_FS = 24;

const TOP = 60;
const GAP = 24;
const LEFT = 90;
const RIGHT = 580;
const BOTTOM_MARGIN = 20;

// vertical rhythm inside a row: top padding to the title baseline, title
// baseline to the first detail baseline, then a fixed pitch between wrapped
// detail lines, then padding below the last baseline.
const ROW_TOP_PAD = 32;
const TITLE_TO_DETAIL = 40;
const LINE_PITCH = 36;
const ROW_BOTTOM_PAD = 20;

function rowHeight(numLines: number) {
  return ROW_TOP_PAD + TITLE_TO_DETAIL + (numLines - 1) * LINE_PITCH + ROW_BOTTOM_PAD;
}

const ROW_HEIGHTS = STAGES.map((s) => rowHeight(s.lines.length));
const ROW_TOPS = ROW_HEIGHTS.reduce<number[]>((acc, _h, i) => {
  acc.push(i === 0 ? TOP : acc[i - 1] + ROW_HEIGHTS[i - 1] + GAP);
  return acc;
}, []);

const STACK_BOTTOM = ROW_TOPS[ROW_TOPS.length - 1] + ROW_HEIGHTS[ROW_HEIGHTS.length - 1];

export function SettlingStagesFigure() {
  const height = STACK_BOTTOM + BOTTOM_MARGIN;
  const railX = 34;
  const labelX = 60;
  const railTop = 44;
  const labelY = (STACK_BOTTOM + railTop) / 2;

  return (
    <Figure
      caption="fig_06.3a · the_mind_settling"
      sub="the Theravāda map. resting on the breath (ānāpānasati, MN 118), the five hindrances quiet like silt sinking out of water, and concentration deepens through the four jhānas, each shedding one more coarse factor until only equanimity and a mind of fully purified mindfulness remain. access concentration is a later refinement from the commentaries, not a stage named in the suttas. the Tibetan tradition draws a parallel nine-stage road, the elephant-taming path: a different map of the same settling."
      max={620}
    >
      <svg
        viewBox={`0 0 600 ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A ladder of calm read from the bottom up. At the base, the scattered mind with its five hindrances: desire, ill will, sloth, restlessness, and doubt. Above it, access concentration, marked as later commentary. Then the four jhanas in turn, each shedding a coarser factor: the first with applied and sustained thought, rapture, and pleasure; the second as thinking stills; the third as rapture fades into equanimity; the fourth setting down pleasure and pain into equanimity and fully purified mindfulness. The breath is the anchor running up the whole climb."
      >
        <defs>
          <marker id="ss-up" markerWidth="11" markerHeight="11" refX="3.7" refY="7.9" orient="auto">
            <path d="M0 7.9 L3.7 0 L7.4 7.9 Z" fill={c.tealDim} />
          </marker>
        </defs>

        {/* the breath rail, running up the climb */}
        <line
          x1={railX}
          y1={STACK_BOTTOM}
          x2={railX}
          y2={railTop}
          stroke={c.tealDim}
          strokeWidth={1.6}
          strokeDasharray="2.5 4.5"
          markerEnd="url(#ss-up)"
        />
        <text
          x={labelX}
          y={labelY}
          transform={`rotate(-90 ${labelX} ${labelY})`}
          textAnchor="middle"
          fontFamily={monoFamily}
          fontSize={BREATH_FS}
          fill={c.tealDim}
        >
          the breath, throughout
        </text>

        {STAGES.map((s, i) => {
          const y = ROW_TOPS[i];
          const h = ROW_HEIGHTS[i];
          const titleBaseline = y + ROW_TOP_PAD;
          return (
            <g key={s.k}>
              <rect
                x={LEFT}
                y={y}
                width={RIGHT - LEFT}
                height={h}
                rx={12}
                fill={s.fill}
                stroke={s.col}
                strokeOpacity={s.dashed ? 0.7 : 0.85}
                strokeWidth={1.5}
                strokeDasharray={s.dashed ? '5 5' : undefined}
              />
              <text
                x={LEFT + 18}
                y={titleBaseline}
                fontFamily={monoFamily}
                fontSize={TITLE_FS}
                fontWeight={600}
                fill={s.col}
              >
                {s.k}
              </text>
              {s.lines.map((line, li) => (
                <text
                  key={li}
                  x={LEFT + 18}
                  y={titleBaseline + TITLE_TO_DETAIL + li * LINE_PITCH}
                  fontFamily={monoFamily}
                  fontSize={DETAIL_FS}
                  fill={c.muted}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
