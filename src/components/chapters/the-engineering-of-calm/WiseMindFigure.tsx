import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_10.3 · wise_mind. Linehan's three states drawn as two overlapping circles.
 * Emotion mind, hot and led by feeling, on one side; reasonable mind, cool and
 * led by logic, on the other. Neither alone gets it right: emotion mind acts on
 * the feeling, reasonable mind talks the feeling out of existence. Wise mind is
 * the overlap, where the feeling is felt and the facts are kept, and a response
 * comes from both at once. It is drawn in teal because it is the same calm center
 * the rest of the book keeps pointing at, reached here from a different door.
 * Concept: Linehan, wise mind.
 */
export function WiseMindFigure() {
  return (
    <Figure
      caption="fig_10.3 · wise_mind"
      sub="not feeling without facts, and not facts without feeling. wise mind is the overlap, where you act with both the emotion and the reality in view."
      max={460}
    >
      <svg
        viewBox="0 0 460 250"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A Venn diagram of two overlapping circles. The left circle, coral, is emotion mind: hot, led by feeling, acting on the feeling. The right circle, sky blue, is reasonable mind: cool, led by logic, arguing the feeling away. Their overlap in the center, teal, is wise mind: the feeling is felt and the facts are kept, and the response comes from both."
      >
        {/* emotion mind */}
        <circle cx={185} cy={120} r={92} fill={c.coralFog} stroke={c.coral} strokeWidth={1.5} />
        {/* reasonable mind */}
        <circle cx={275} cy={120} r={92} fill="rgba(56,189,248,0.10)" stroke={c.sky} strokeWidth={1.5} />

        {/* labels for the two outer lobes */}
        <text x={120} y={86} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12} fontWeight={500} fill={c.coral}>
          emotion
        </text>
        <text x={120} y={101} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12} fontWeight={500} fill={c.coral}>
          mind
        </text>
        <text x={120} y={120} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8.5} fill={c.muted}>
          led by feeling
        </text>
        <text x={120} y={133} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8.5} fill={c.faint}>
          acts on it
        </text>

        <text x={340} y={86} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12} fontWeight={500} fill={c.sky}>
          reasonable
        </text>
        <text x={340} y={101} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12} fontWeight={500} fill={c.sky}>
          mind
        </text>
        <text x={340} y={120} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8.5} fill={c.muted}>
          led by logic
        </text>
        <text x={340} y={133} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8.5} fill={c.faint}>
          argues it away
        </text>

        {/* the overlap: wise mind, drawn brighter */}
        <text x={230} y={112} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11.5} fontWeight={600} fill={c.teal}>
          wise
        </text>
        <text x={230} y={126} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11.5} fontWeight={600} fill={c.teal}>
          mind
        </text>
        <text x={230} y={142} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={7.5} fill={c.teal} fillOpacity={0.85}>
          both at once
        </text>

        {/* sub-line band */}
        <text x={230} y={228} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={9} fill={c.faint}>
          the feeling is felt · the facts are kept · the response comes from the overlap
        </text>
      </svg>
    </Figure>
  );
}
