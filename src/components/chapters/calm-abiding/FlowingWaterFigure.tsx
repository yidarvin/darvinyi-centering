import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// layout constants: three stacked "passages" of the same river, each showing
// one transient form arising, cresting, and dissolving. Stacking (rather than
// the old left-to-right triptych) gives every row the full canvas width for
// its label, which is what makes the type legible at phone width.
const VB_W = 360;
const TITLE_FS = 17; // bold row title: feeling / form / perception
const SUB_FS = 15; // "a bubble" / "a lump of foam" / "a mirage"
const CAPTION_FS = 15; // bottom anicca lines

const TOP_PAD = 14;
const ROW_H = 118; // vertical distance from one row's top to the next
const TITLE_DY = 20; // row top -> title baseline
const GRAPHIC_DY = 58; // row top -> graphic center y
const SUB_DY = 102; // row top -> sublabel baseline
const CAPTION_GAP = 26;
const CAPTION_LINE_H = 26;

const row1Top = TOP_PAD;
const row2Top = row1Top + ROW_H;
const row3Top = row2Top + ROW_H;

const caption1Y = row3Top + SUB_DY + CAPTION_GAP;
const caption2Y = caption1Y + CAPTION_LINE_H;
const VB_H = caption2Y + 20;

const CX = VB_W / 2; // 180, the shared center column for title/graphic/sublabel

/**
 * fig_06.4a: impermanence as flowing water. The Pheṇapiṇḍūpama Sutta (SN 22.95)
 * likens the five aggregates to things with no solid core, carried on a river:
 * form is a lump of foam, feeling a bubble, perception a mirage, formations a
 * hollow plantain trunk, consciousness a conjuror's trick. The figure draws
 * three of those forms, each arising and dissolving on its own passage of the
 * current, stacked top to bottom, to make anicca concrete: conditioned things
 * flow, they do not stay. (The "you cannot step in the same river twice" line
 * is Heraclitus, Greek, not the Buddha. The flowing image is genuinely
 * Buddhist. The Greek aphorism is not.)
 */
export function FlowingWaterFigure() {
  return (
    <Figure
      caption="fig_06.4a · impermanence_flows"
      sub="Pheṇapiṇḍūpama Sutta (SN 22.95): form is like a lump of foam, feeling like a bubble, perception like a mirage, all of it carried on the current and gone. anicca, the first of the three marks: every conditioned thing arises and passes. you are not watching a fixed scene. you are watching a river."
      max={420}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Three transient forms, each shown arising faintly, cresting, and dissolving into a dashed outline, stacked in their own rows top to bottom, each on its own passage of the same flowing river: a bubble of feeling, a lump of foam that is form, and a shimmer of perception like a mirage. Downstream arrows mark the flow in every row. Nothing on the water stays. This is impermanence, anicca: every conditioned thing arises and passes."
      >
        <defs>
          <marker id="fw-flow" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L5.5 3 L0 6 Z" fill={c.tealDim} />
          </marker>
          <linearGradient id="fw-river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(45,212,191,0.16)" />
            <stop offset="1" stopColor="rgba(45,212,191,0.04)" />
          </linearGradient>
        </defs>

        {/* row 1: feeling, a bubble -- arises, crests, dissolves */}
        <g>
          <path
            d={`M16,${row1Top + GRAPHIC_DY - 12} C 100,${row1Top + GRAPHIC_DY - 16} 220,${row1Top + GRAPHIC_DY - 6} 344,${row1Top + GRAPHIC_DY - 12} L344,${row1Top + GRAPHIC_DY + 14} C 220,${row1Top + GRAPHIC_DY + 10} 100,${row1Top + GRAPHIC_DY + 18} 16,${row1Top + GRAPHIC_DY + 14} Z`}
            fill="url(#fw-river)"
            stroke={c.line2}
            strokeWidth={1}
          />
          <path d={`M30,${row1Top + GRAPHIC_DY - 4} C 120,${row1Top + GRAPHIC_DY - 12} 220,${row1Top + GRAPHIC_DY + 2} 330,${row1Top + GRAPHIC_DY - 4}`} fill="none" stroke={c.tealDim} strokeWidth={1} strokeOpacity={0.4} markerEnd="url(#fw-flow)" />
          <path d={`M30,${row1Top + GRAPHIC_DY + 10} C 120,${row1Top + GRAPHIC_DY + 20} 220,${row1Top + GRAPHIC_DY + 4} 330,${row1Top + GRAPHIC_DY + 12}`} fill="none" stroke={c.tealDim} strokeWidth={1} strokeOpacity={0.3} markerEnd="url(#fw-flow)" />

          <circle cx={132} cy={row1Top + GRAPHIC_DY + 6} r={7} fill="none" stroke={c.violet} strokeOpacity={0.45} strokeWidth={1.2} />
          <circle cx={CX} cy={row1Top + GRAPHIC_DY} r={13} fill={c.violetFog} stroke={c.violet} strokeWidth={1.6} />
          <circle cx={228} cy={row1Top + GRAPHIC_DY + 10} r={8.5} fill="none" stroke={c.violet} strokeWidth={1.2} strokeDasharray="3 4" strokeOpacity={0.6} />

          <text x={CX} y={row1Top + TITLE_DY} textAnchor="middle" fontFamily={monoFamily} fontSize={TITLE_FS} fontWeight={600} fill={c.violet}>
            feeling
          </text>
          <text x={CX} y={row1Top + SUB_DY} textAnchor="middle" fontFamily={monoFamily} fontSize={SUB_FS} fill={c.muted}>
            a bubble
          </text>
        </g>

        {/* row 2: form, a lump of foam -- a cluster of bubbles, one already dissolving */}
        <g>
          <path
            d={`M16,${row2Top + GRAPHIC_DY - 12} C 100,${row2Top + GRAPHIC_DY - 16} 220,${row2Top + GRAPHIC_DY - 6} 344,${row2Top + GRAPHIC_DY - 12} L344,${row2Top + GRAPHIC_DY + 14} C 220,${row2Top + GRAPHIC_DY + 10} 100,${row2Top + GRAPHIC_DY + 18} 16,${row2Top + GRAPHIC_DY + 14} Z`}
            fill="url(#fw-river)"
            stroke={c.line2}
            strokeWidth={1}
          />
          <path d={`M30,${row2Top + GRAPHIC_DY - 4} C 120,${row2Top + GRAPHIC_DY - 12} 220,${row2Top + GRAPHIC_DY + 2} 330,${row2Top + GRAPHIC_DY - 4}`} fill="none" stroke={c.tealDim} strokeWidth={1} strokeOpacity={0.4} markerEnd="url(#fw-flow)" />
          <path d={`M30,${row2Top + GRAPHIC_DY + 10} C 120,${row2Top + GRAPHIC_DY + 20} 220,${row2Top + GRAPHIC_DY + 4} 330,${row2Top + GRAPHIC_DY + 12}`} fill="none" stroke={c.tealDim} strokeWidth={1} strokeOpacity={0.3} markerEnd="url(#fw-flow)" />

          <circle cx={160} cy={row2Top + GRAPHIC_DY - 4} r={8} fill={c.tealFog} stroke={c.teal} strokeWidth={1.4} />
          <circle cx={177} cy={row2Top + GRAPHIC_DY + 9} r={11} fill={c.tealFog} stroke={c.teal} strokeWidth={1.6} />
          <circle cx={196} cy={row2Top + GRAPHIC_DY - 6} r={7} fill={c.tealFog} stroke={c.teal} strokeWidth={1.3} />
          <circle cx={219} cy={row2Top + GRAPHIC_DY + 6} r={8} fill="none" stroke={c.teal} strokeWidth={1.2} strokeDasharray="3 4" strokeOpacity={0.6} />

          <text x={CX} y={row2Top + TITLE_DY} textAnchor="middle" fontFamily={monoFamily} fontSize={TITLE_FS} fontWeight={600} fill={c.teal}>
            form
          </text>
          <text x={CX} y={row2Top + SUB_DY} textAnchor="middle" fontFamily={monoFamily} fontSize={SUB_FS} fill={c.muted}>
            a lump of foam
          </text>
        </g>

        {/* row 3: perception, a mirage -- a shimmer, then a fainter, fading shimmer */}
        <g>
          <path
            d={`M16,${row3Top + GRAPHIC_DY - 12} C 100,${row3Top + GRAPHIC_DY - 16} 220,${row3Top + GRAPHIC_DY - 6} 344,${row3Top + GRAPHIC_DY - 12} L344,${row3Top + GRAPHIC_DY + 14} C 220,${row3Top + GRAPHIC_DY + 10} 100,${row3Top + GRAPHIC_DY + 18} 16,${row3Top + GRAPHIC_DY + 14} Z`}
            fill="url(#fw-river)"
            stroke={c.line2}
            strokeWidth={1}
          />
          <path d={`M30,${row3Top + GRAPHIC_DY - 4} C 120,${row3Top + GRAPHIC_DY - 12} 220,${row3Top + GRAPHIC_DY + 2} 330,${row3Top + GRAPHIC_DY - 4}`} fill="none" stroke={c.tealDim} strokeWidth={1} strokeOpacity={0.4} markerEnd="url(#fw-flow)" />
          <path d={`M30,${row3Top + GRAPHIC_DY + 10} C 120,${row3Top + GRAPHIC_DY + 20} 220,${row3Top + GRAPHIC_DY + 4} 330,${row3Top + GRAPHIC_DY + 12}`} fill="none" stroke={c.tealDim} strokeWidth={1} strokeOpacity={0.3} markerEnd="url(#fw-flow)" />

          <path d={`M140,${row3Top + GRAPHIC_DY + 2} q 10,-18 20,0 q 10,18 20,0 q 10,-18 20,0`} fill="none" stroke={c.amber} strokeWidth={1.8} />
          <path d={`M164,${row3Top + GRAPHIC_DY + 12} q 8,-10 16,0 q 8,10 16,0`} fill="none" stroke={c.amber} strokeWidth={1.2} strokeOpacity={0.5} strokeDasharray="3 4" />

          <text x={CX} y={row3Top + TITLE_DY} textAnchor="middle" fontFamily={monoFamily} fontSize={TITLE_FS} fontWeight={600} fill={c.amber}>
            perception
          </text>
          <text x={CX} y={row3Top + SUB_DY} textAnchor="middle" fontFamily={monoFamily} fontSize={SUB_FS} fill={c.muted}>
            a mirage
          </text>
        </g>

        {/* anicca caption, two lines, read after all three passages */}
        <text x={CX} y={caption1Y} textAnchor="middle" fontFamily={monoFamily} fontSize={CAPTION_FS} fill={c.faint}>
          anicca · sabbe saṅkhārā aniccā
        </text>
        <text x={CX} y={caption2Y} textAnchor="middle" fontFamily={monoFamily} fontSize={CAPTION_FS} fill={c.faint}>
          all conditioned things flow and pass
        </text>
      </svg>
    </Figure>
  );
}
