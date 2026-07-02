import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_12.3, repetition as an anchor. Attention (the wandering line) keeps drifting up
 * into thought and keeps being drawn back down to a single repeated anchor (the
 * baseline). Each return is a teal dot: the return is the practice, not the failure of
 * it. This is the mechanism shared by the Jesus Prayer, the sacred word, dhikr, and a
 * secular repeated word alike, and it is the same attention rep trained in The Quiet Mind.
 */

const VB_W = 460;
const BASE_Y = 132;

// the wandering attention path: depart up into thought, return to the baseline, repeat
const PEAKS = [
  { up: 70, peak: 58, back: 116 },
  { up: 150, peak: 74, back: 210 },
  { up: 250, peak: 54, back: 312 },
  { up: 352, peak: 78, back: 414 },
];

function buildPath(): string {
  let d = `M 24 ${BASE_Y}`;
  let prev = 24;
  for (const seg of PEAKS) {
    // rise to a thought peak, then fall back to the anchor
    d += ` C ${(prev + seg.up) / 2} ${BASE_Y} ${seg.up - 14} ${seg.peak} ${seg.up} ${seg.peak}`;
    d += ` C ${seg.up + 18} ${seg.peak + 4} ${seg.back - 18} ${BASE_Y} ${seg.back} ${BASE_Y}`;
    prev = seg.back;
  }
  d += ` L ${VB_W - 20} ${BASE_Y}`;
  return d;
}

const ANCHORS = [
  { label: 'the Jesus Prayer', color: c.coral },
  { label: 'a sacred word', color: c.violet },
  { label: 'dhikr', color: c.amber },
  { label: 'the breath', color: c.teal },
];

export function RepetitionAnchorFigure() {
  return (
    <Figure
      caption="fig_12.3 · the_anchor_and_the_return"
      sub="Attention wanders up into thought, again and again. Every tradition here hands it one undemanding thing to come back to: a phrase, a name, a word, the breath. The dots are the returns. The return is the practice, not the interruption of it, which is exactly the attention rep from The Quiet Mind."
      max={VB_W}
    >
      <svg
        viewBox={`0 0 ${VB_W} 168`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A line of attention repeatedly drifts up into thought and is drawn back down to a single repeated anchor at the baseline; each return is marked."
      >
        {/* a thought cloud band up top */}
        <text x={24} y={30} style={{ ...mono, fontSize: 11, fill: c.faint }}>
          the mind wanders (it always will)
        </text>

        {/* faint drift markers at the peaks */}
        {PEAKS.map((seg, i) => (
          <line
            key={`d${i}`}
            x1={seg.up}
            y1={seg.peak - 6}
            x2={seg.up}
            y2={seg.peak - 16}
            stroke={c.line2}
            strokeWidth={1}
            strokeDasharray="2 3"
          />
        ))}

        {/* the wandering attention line */}
        <path d={buildPath()} fill="none" stroke={c.muted} strokeWidth={1.8} strokeLinecap="round" />

        {/* the anchor baseline */}
        <line x1={20} y1={BASE_Y} x2={VB_W - 20} y2={BASE_Y} stroke={c.teal} strokeWidth={1.6} strokeOpacity={0.7} />

        {/* the returns: a teal dot where attention comes back to the anchor */}
        {PEAKS.map((seg, i) => (
          <g key={`r${i}`}>
            <circle cx={seg.back} cy={BASE_Y} r={4.5} fill={c.teal} />
            <circle cx={seg.back} cy={BASE_Y} r={8.5} fill="none" stroke={c.teal} strokeWidth={1} strokeOpacity={0.5} />
          </g>
        ))}

        <text x={VB_W - 20} y={BASE_Y + 22} textAnchor="end" style={{ ...mono, fontSize: 11, fill: c.teal }}>
          you return, gently · the anchor
        </text>
      </svg>

      {/* the four anchors, one per tradition, sharing one baseline */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 8, justifyContent: 'center' }}>
        {ANCHORS.map((a) => (
          <span
            key={a.label}
            style={{
              ...mono,
              fontSize: 10.5,
              color: a.color,
              border: `1px solid ${a.color}55`,
              background: `${a.color}12`,
              borderRadius: 6,
              padding: '3px 9px',
            }}
          >
            {a.label}
          </span>
        ))}
      </div>
    </Figure>
  );
}
