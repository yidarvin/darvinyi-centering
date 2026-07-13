import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_07.3: beginner's mind against the expert's clutter (shoshin). The same
 * ordinary thing met by two minds. The expert's mind has already labeled it,
 * filed it, and decided what it is, so it sees one worn groove and little else.
 * The beginner's mind comes without the stack of assumptions, so the same thing
 * opens into many possibilities. Suzuki Roshi's line, paraphrased on the figure:
 * in the beginner's mind there are many possibilities; in the expert's, few.
 *
 * Layout note: stacked top/bottom (expert above, beginner below) rather than
 * side-by-side. A two-column layout could not give the text enough width to
 * clear a comfortable legible size on a narrow phone viewport; stacking lets
 * each panel use the full canvas width. The comparison it encodes is unchanged:
 * the same object, hemmed in by labels with one narrow way out versus the same
 * object opening into several branching possibilities.
 */
export function BeginnersMindFigure() {
  return (
    <Figure
      caption="fig_07.3 · beginners_mind"
      sub={'shoshin, beginner’s mind. the expert meets a familiar thing already labeled and filed, and sees one worn groove. the beginner meets it without the stack of assumptions, and it opens. Shunryu Suzuki: “in the beginner’s mind there are many possibilities, but in the expert’s there are few.” not ignorance. a trained willingness to see the ordinary as if for the first time.'}
      max={360}
    >
      <svg
        viewBox="0 0 288 436"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels, one above the other, around the same plain object. Top, the expert's mind: the object boxed in by stacked labels (known, seen it, boring, next) with a single narrow worn path leading away, few possibilities. Bottom, the beginner's mind: the same object open, with several faint light lines branching out into possibility."
      >
        {/* ---- TOP: the expert, crowded ---- */}
        <text x={16} y={28} fontFamily={monoFamily} fontSize={13} fill={c.faint}>
          the expert
        </text>

        {/* stacked labels boxing it in */}
        <g fontFamily={monoFamily} fontSize={12}>
          <rect x={16} y={46} width={78} height={28} rx={5} fill={c.panel} stroke={c.line2} strokeWidth={1} />
          <text x={55} y={65} textAnchor="middle" fill={c.muted}>known</text>
          <rect x={168} y={52} width={88} height={28} rx={5} fill={c.panel} stroke={c.line2} strokeWidth={1} />
          <text x={212} y={71} textAnchor="middle" fill={c.muted}>seen it</text>
          <rect x={14} y={182} width={78} height={28} rx={5} fill={c.panel} stroke={c.line2} strokeWidth={1} />
          <text x={53} y={201} textAnchor="middle" fill={c.muted}>boring</text>
          <rect x={176} y={182} width={88} height={28} rx={5} fill={c.panel} stroke={c.line2} strokeWidth={1} />
          <text x={220} y={201} textAnchor="middle" fill={c.muted}>→ next</text>
        </g>

        {/* the thing, dim, hemmed in */}
        <circle cx={132} cy={124} r={24} fill={c.panel2} stroke={c.faint} strokeWidth={1.4} />
        <circle cx={132} cy={124} r={24} fill="none" stroke={c.faint} strokeWidth={1.4} strokeDasharray="2 3" opacity={0.6} />

        {/* one worn groove out */}
        <line x1={156} y1={124} x2={248} y2={124} stroke={c.faint} strokeWidth={2.5} />
        <text x={202} y={112} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.faint}>
          one groove
        </text>

        {/* divider between the two minds */}
        <line x1={16} y1={224} x2={272} y2={224} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

        {/* ---- BOTTOM: the beginner, open ---- */}
        <text x={16} y={258} fontFamily={monoFamily} fontSize={13} fill={c.teal}>
          the beginner
        </text>

        {/* many faint possibilities branching */}
        <g stroke={c.teal} strokeWidth={1.2} fill="none">
          <line x1={96} y1={326} x2={245} y2={258} strokeOpacity={0.4} />
          <line x1={96} y1={326} x2={258} y2={290} strokeOpacity={0.55} />
          <line x1={96} y1={326} x2={262} y2={326} strokeOpacity={0.6} />
          <line x1={96} y1={326} x2={258} y2={362} strokeOpacity={0.5} />
          <line x1={96} y1={326} x2={245} y2={394} strokeOpacity={0.45} />
        </g>
        {/* the possibility ends */}
        <g fill={c.teal}>
          <circle cx={245} cy={258} r={2.8} fillOpacity={0.7} />
          <circle cx={258} cy={290} r={2.8} fillOpacity={0.7} />
          <circle cx={262} cy={326} r={2.8} fillOpacity={0.7} />
          <circle cx={258} cy={362} r={2.8} fillOpacity={0.7} />
          <circle cx={245} cy={394} r={2.8} fillOpacity={0.6} />
        </g>

        {/* the same thing, bright and open */}
        <circle cx={72} cy={326} r={24} fill={c.tealFog} stroke={c.teal} strokeWidth={1.8} />
        <text x={144} y={418} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.faint}>
          many possibilities
        </text>
      </svg>
    </Figure>
  );
}
