import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';
import { LIMBS } from './limbs';

const monoFamily = mono.fontFamily;

const ROW_H = 40;
const GAP = 8;
const STEP = 13; // each higher limb steps right: the staircase rises left to right
const LEFT = 16;
const W_ROW = 372;
const TOP = 14;

export function EightLimbsStaircaseFigure() {
  const n = LIMBS.length;
  const height = TOP + n * ROW_H + (n - 1) * GAP + 30;
  // draw top (samādhi, n=8) down to bottom (yama, n=1)
  const rows = [...LIMBS].sort((a, b) => b.n - a.n);
  const innerTopY = TOP; // samādhi row top
  const innerBottomY = TOP + 2 * (ROW_H + GAP) + ROW_H; // bottom of dhāraṇā row

  return (
    <Figure
      caption="fig_09.2 · the_eight_limbs"
      sub="The eight limbs (aṣṭāṅga, YS 2.29), climbing from outward conduct through the body and the senses to the still inner core. The last three together are saṃyama. One honest caution: Patanjali draws them in order, but he does not say you must finish one before starting the next. They lean on each other, and most people work several at once. The staircase is a teaching shape, not a locked sequence."
      max={540}
    >
      <svg
        viewBox={`0 0 520 ${height}`}
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
              <text
                x={x + 13}
                y={y + 17}
                fontFamily={monoFamily}
                fontSize={9}
                fill={c.faint}
              >
                {limb.n}
              </text>
              <text
                x={x + 28}
                y={y + 18}
                fontFamily={monoFamily}
                fontSize={12.5}
                fontWeight={600}
                fill={limb.color}
              >
                {limb.sanskrit}
              </text>
              <text x={x + 28} y={y + 32} fontFamily={monoFamily} fontSize={9.5} fill={c.muted}>
                {limb.name} · {limb.gloss}
              </text>
              <text
                x={x + W_ROW - 12}
                y={y + 17}
                textAnchor="end"
                fontFamily={monoFamily}
                fontSize={8.5}
                fill={c.faint}
              >
                {limb.sutra}
              </text>
            </g>
          );
        })}

        {/* saṃyama bracket on the top three (inner) limbs */}
        <g stroke={c.teal} strokeWidth={1.2} fill="none" strokeOpacity={0.8}>
          <path
            d={`M${LEFT + 7 * STEP + W_ROW + 8},${innerTopY + 4} h8 V${innerBottomY - 4} h-8`}
          />
        </g>
        <text
          x={LEFT + 7 * STEP + W_ROW + 20}
          y={(innerTopY + innerBottomY) / 2 - 4}
          fontFamily={monoFamily}
          fontSize={10}
          fontWeight={600}
          fill={c.teal}
          transform={`rotate(90 ${LEFT + 7 * STEP + W_ROW + 20} ${(innerTopY + innerBottomY) / 2 - 4})`}
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
            <span style={{ ...mono, fontSize: 10.5, color: c.muted }}>
              {g.label} <span style={{ color: c.faint }}>· {g.note}</span>
            </span>
          </span>
        ))}
      </div>
    </Figure>
  );
}
