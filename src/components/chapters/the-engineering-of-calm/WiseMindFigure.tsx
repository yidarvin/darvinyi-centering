import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_10.3 · wise_mind. Linehan's three states drawn as two overlapping circles,
 * stacked vertically rather than side by side so every label can run at a legible
 * size in a narrow column. Emotion mind, hot and led by feeling, is the top circle;
 * reasonable mind, cool and led by logic, is the bottom circle. Neither alone gets
 * it right: emotion mind acts on the feeling, reasonable mind argues the feeling
 * away. Wise mind is the overlap in the middle, where the feeling is felt and the
 * facts are kept, and a response comes from both at once. It is drawn in teal
 * because it is the same calm center the rest of the book keeps pointing at,
 * reached here from a different door.
 * Concept: Linehan, wise mind.
 */
export function WiseMindFigure() {
  return (
    <Figure
      caption="fig_10.3 · wise_mind"
      sub="not feeling without facts, and not facts without feeling. wise mind is the overlap, where you act with both the emotion and the reality in view."
      max={340}
    >
      <svg
        viewBox="0 0 280 530"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A Venn diagram of two overlapping circles, stacked vertically. The top circle, coral, is emotion mind: hot, led by feeling, acting on the feeling. The bottom circle, sky blue, is reasonable mind: cool, led by logic, arguing the feeling away. Their overlap in the middle, teal, is wise mind: the feeling is felt and the facts are kept, and the response comes from both at once."
      >
        {/* emotion mind, top */}
        <circle cx={140} cy={145} r={125} fill={c.coralFog} stroke={c.coral} strokeWidth={1.5} />
        {/* reasonable mind, bottom */}
        <circle cx={140} cy={305} r={125} fill="rgba(56,189,248,0.10)" stroke={c.sky} strokeWidth={1.5} />

        {/* emotion mind: title, descriptor, failure mode */}
        <text x={140} y={70} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={18} fontWeight={600} fill={c.coral}>
          emotion mind
        </text>
        <text x={140} y={100} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.muted}>
          hot, led by feeling
        </text>
        <text x={140} y={130} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.faint}>
          acts on the feeling
        </text>

        {/* wise mind: the overlap, drawn brighter */}
        <text x={140} y={208} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={20} fontWeight={700} fill={c.teal}>
          wise mind
        </text>
        <text x={140} y={240} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.teal} fillOpacity={0.85}>
          both at once
        </text>

        {/* reasonable mind: failure mode, descriptor, title (mirrored order) */}
        <text x={140} y={320} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.faint}>
          argues the feeling away
        </text>
        <text x={140} y={350} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.muted}>
          cool, led by logic
        </text>
        <text x={140} y={380} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={18} fontWeight={600} fill={c.sky}>
          reasonable mind
        </text>

        {/* sub-line band, broken across four short rows so it fits the narrow column */}
        <text x={140} y={454} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12} fill={c.faint}>
          the feeling is felt
        </text>
        <text x={140} y={472} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12} fill={c.faint}>
          the facts are kept
        </text>
        <text x={140} y={496} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12} fill={c.faint}>
          the response comes
        </text>
        <text x={140} y={514} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12} fill={c.faint}>
          from the overlap
        </text>
      </svg>
    </Figure>
  );
}
