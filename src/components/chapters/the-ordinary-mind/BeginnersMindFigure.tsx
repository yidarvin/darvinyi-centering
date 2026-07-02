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
 */
export function BeginnersMindFigure() {
  return (
    <Figure
      caption="fig_07.3 · beginners_mind"
      sub={'shoshin, beginner’s mind. the expert meets a familiar thing already labeled and filed, and sees one worn groove. the beginner meets it without the stack of assumptions, and it opens. Shunryu Suzuki: “in the beginner’s mind there are many possibilities, but in the expert’s there are few.” not ignorance. a trained willingness to see the ordinary as if for the first time.'}
      max={520}
    >
      <svg
        viewBox="0 0 520 234"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels around the same plain object. Left, the expert's mind: the object boxed in by stacked labels (known, seen it, boring, next) with a single narrow worn path leading away, few possibilities. Right, the beginner's mind: the same object open, with many faint light lines branching out into possibility."
      >
        <line x1={260} y1={22} x2={260} y2={214} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

        {/* ---- LEFT: the expert, crowded ---- */}
        <text x={20} y={32} fontFamily={monoFamily} fontSize={11} fill={c.faint}>
          the expert
        </text>

        {/* stacked labels boxing it in */}
        <g fontFamily={monoFamily} fontSize={9}>
          <rect x={36} y={48} width={66} height={20} rx={4} fill={c.panel} stroke={c.line2} strokeWidth={1} />
          <text x={69} y={62} textAnchor="middle" fill={c.muted}>known</text>
          <rect x={150} y={52} width={70} height={20} rx={4} fill={c.panel} stroke={c.line2} strokeWidth={1} />
          <text x={185} y={66} textAnchor="middle" fill={c.muted}>seen it</text>
          <rect x={28} y={150} width={70} height={20} rx={4} fill={c.panel} stroke={c.line2} strokeWidth={1} />
          <text x={63} y={164} textAnchor="middle" fill={c.muted}>boring</text>
          <rect x={158} y={150} width={70} height={20} rx={4} fill={c.panel} stroke={c.line2} strokeWidth={1} />
          <text x={193} y={164} textAnchor="middle" fill={c.muted}>→ next</text>
        </g>

        {/* the thing, dim, hemmed in */}
        <circle cx={128} cy={110} r={20} fill={c.panel2} stroke={c.faint} strokeWidth={1.4} />
        <circle cx={128} cy={110} r={20} fill="none" stroke={c.faint} strokeWidth={1.4} strokeDasharray="2 3" opacity={0.6} />

        {/* one worn groove out */}
        <line x1={148} y1={110} x2={232} y2={110} stroke={c.faint} strokeWidth={2.5} />
        <text x={190} y={102} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          one groove
        </text>

        {/* ---- RIGHT: the beginner, open ---- */}
        <text x={300} y={32} fontFamily={monoFamily} fontSize={11} fill={c.teal}>
          the beginner
        </text>

        {/* many faint possibilities branching */}
        <g stroke={c.teal} strokeWidth={1.2} fill="none">
          <line x1={392} y1={120} x2={486} y2={56} strokeOpacity={0.55} />
          <line x1={392} y1={120} x2={500} y2={92} strokeOpacity={0.5} />
          <line x1={392} y1={120} x2={502} y2={126} strokeOpacity={0.6} />
          <line x1={392} y1={120} x2={498} y2={162} strokeOpacity={0.5} />
          <line x1={392} y1={120} x2={476} y2={196} strokeOpacity={0.45} />
          <line x1={392} y1={120} x2={420} y2={54} strokeOpacity={0.4} />
        </g>
        {/* the possibility ends */}
        <g fill={c.teal}>
          <circle cx={486} cy={56} r={2.4} fillOpacity={0.7} />
          <circle cx={500} cy={92} r={2.4} fillOpacity={0.7} />
          <circle cx={502} cy={126} r={2.4} fillOpacity={0.7} />
          <circle cx={498} cy={162} r={2.4} fillOpacity={0.7} />
          <circle cx={476} cy={196} r={2.4} fillOpacity={0.7} />
          <circle cx={420} cy={54} r={2.4} fillOpacity={0.6} />
        </g>

        {/* the same thing, bright and open */}
        <circle cx={372} cy={120} r={20} fill={c.tealFog} stroke={c.teal} strokeWidth={1.8} />
        <text x={372} y={214} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          many possibilities
        </text>
      </svg>
    </Figure>
  );
}
