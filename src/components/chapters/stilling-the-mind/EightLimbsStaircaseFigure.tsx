import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';
import { LIMBS } from './limbs';

const monoFamily = mono.fontFamily;

// Layout constants. Rows are drawn wide (one sanskrit+citation line, one short
// gloss line) and stacked vertically rather than packed with four separate
// text fields per row, so every label stays comfortably readable at phone
// width. See the component doc comment below for the legibility math.
const ROW_H = 50;
const GAP = 12;
const STEP = 7; // each higher limb steps right: the staircase rises left to right
const LEFT = 14;
const W_ROW = 240;
const TOP = 18;
const BOTTOM_PAD = 22;
const VBW = 352;

// Font sizes (SVG user units). At the site-wide phone render width of 288px
// against this 352-wide viewBox, the scale factor is 288/352 = 0.818, so:
//   F_MAIN (17)      -> 13.9px effective
//   F_SUB  (14.5)    -> 11.9px effective (sutra refs, gloss line, index digit)
//   F_BRACKET (15)   -> 12.3px effective (the saṃyama label)
// All comfortably clear the ~11px legibility floor.
const F_MAIN = 17;
const F_SUB = 14.5;
const F_BRACKET = 15;

// A short, figure-only paraphrase of each limb's gloss (the fuller gloss and
// detail live in limbs.ts, the prose, and the eight-limbs explorer widget).
// Kept to roughly 20 characters so the line fits a single row at legible
// size on a 360px phone; still an accurate compression of the canonical
// gloss, not a different claim.
const GLOSS_SHORT: Record<number, string> = {
  1: 'toward others',
  2: 'toward yourself',
  3: 'a steady, easy seat',
  4: 'regulating breath',
  5: 'senses turn inward',
  6: 'bound to one point',
  7: 'attention unbroken',
  8: 'watcher, watched, one',
};

export function EightLimbsStaircaseFigure() {
  const n = LIMBS.length;
  const height = TOP + n * ROW_H + (n - 1) * GAP + BOTTOM_PAD;
  // draw top (samādhi, n=8) down to bottom (yama, n=1)
  const rows = [...LIMBS].sort((a, b) => b.n - a.n);
  const innerTopY = TOP; // samādhi row top
  const innerBottomY = TOP + 2 * (ROW_H + GAP) + ROW_H; // bottom of dhāraṇā row
  const bracketX = LEFT + 7 * STEP + W_ROW + 8;
  const labelX = bracketX + 18;

  return (
    <Figure
      caption="fig_09.2 · the_eight_limbs"
      sub="The eight limbs (aṣṭāṅga, YS 2.29), climbing from outward conduct through the body and the senses to the still inner core. The last three together are saṃyama. One honest caution: Patanjali draws them in order, but he does not say you must finish one before starting the next. They lean on each other, and most people work several at once. The staircase is a teaching shape, not a locked sequence."
      max={380}
    >
      <svg
        viewBox={`0 0 ${VBW} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="The eight limbs of yoga drawn as a staircase rising from lower left to upper right. From the bottom: yama, the restraints, and niyama, the observances, the outer conduct in amber. Then asana, posture; pranayama, the breath; and pratyahara, the withdrawal of the senses, the body and senses in dim teal. Then dharana, concentration; dhyana, meditation; and samadhi, absorption, the inner core in bright teal, the three together called samyama."
      >
        <defs>
          <marker id="el-up" markerWidth="9" markerHeight="9" refX="3" refY="6.5" orient="auto">
            <path d="M0 6.5 L3 0 L6 6.5 Z" fill={c.teal} />
          </marker>
        </defs>

        {/* the ascent arrow, lower-left to upper-right */}
        <line
          x1={LEFT - 4}
          y1={TOP + n * (ROW_H + GAP) - GAP}
          x2={LEFT + (n - 1) * STEP - 4}
          y2={TOP + 6}
          stroke={c.tealDim}
          strokeWidth={1.3}
          strokeDasharray="2 4"
          markerEnd="url(#el-up)"
        />

        {rows.map((limb) => {
          const idx = limb.n - 1; // 0..7
          const x = LEFT + idx * STEP;
          const y = TOP + (n - limb.n) * (ROW_H + GAP);
          return (
            <g key={limb.n}>
              <rect
                x={x}
                y={y}
                width={W_ROW}
                height={ROW_H}
                rx={8}
                fill={limb.fill}
                stroke={limb.color}
                strokeOpacity={0.85}
                strokeWidth={1.2}
              />
              {/* line 1: index + sanskrit name, sutra ref right-aligned */}
              <text x={x + 14} y={y + 22} fontFamily={monoFamily} fontSize={F_MAIN} fontWeight={600} fill={limb.color}>
                <tspan fill={c.faint} fontWeight={400} fontSize={F_SUB}>
                  {limb.n}
                </tspan>
                <tspan dx={7}>{limb.sanskrit}</tspan>
              </text>
              <text
                x={x + W_ROW - 14}
                y={y + 22}
                textAnchor="end"
                fontFamily={monoFamily}
                fontSize={F_SUB}
                fill={c.faint}
              >
                {limb.sutra}
              </text>
              {/* line 2: the short gloss */}
              <text x={x + 14} y={y + 42} fontFamily={monoFamily} fontSize={F_SUB} fill={c.muted}>
                {GLOSS_SHORT[limb.n]}
              </text>
            </g>
          );
        })}

        {/* saṃyama bracket on the top three (inner) limbs */}
        <g stroke={c.teal} strokeWidth={1.2} fill="none" strokeOpacity={0.8}>
          <path d={`M${bracketX},${innerTopY + 4} h8 V${innerBottomY - 4} h-8`} />
        </g>
        <text
          x={labelX}
          y={(innerTopY + innerBottomY) / 2 - 4}
          fontFamily={monoFamily}
          fontSize={F_BRACKET}
          fontWeight={600}
          fill={c.teal}
          transform={`rotate(90 ${labelX} ${(innerTopY + innerBottomY) / 2 - 4})`}
          textAnchor="middle"
        >
          saṃyama (3.4)
        </text>
      </svg>

      {/* group legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14 }}>
        {[
          { col: c.amber, label: 'outer conduct', note: 'limbs 1–2' },
          { col: c.tealDim, label: 'the body and senses', note: 'limbs 3–5' },
          { col: c.teal, label: 'the inner core', note: 'limbs 6–8 · saṃyama' },
        ].map((g) => (
          <span key={g.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: g.col, flexShrink: 0 }} />
            <span style={{ ...mono, fontSize: 11, color: c.muted }}>
              {g.label} <span style={{ color: c.faint }}>· {g.note}</span>
            </span>
          </span>
        ))}
      </div>
    </Figure>
  );
}
