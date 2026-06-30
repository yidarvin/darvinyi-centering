import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/** organ effects: the two branches act on the same organs in opposite directions */
const ROWS = [
  { organ: 'heart', acc: 'speeds up', brake: 'slows down', vagus: true },
  { organ: 'airways', acc: 'open wider', brake: 'narrow' },
  { organ: 'pupils', acc: 'widen', brake: 'shrink' },
  { organ: 'digestion', acc: 'pauses', brake: 'resumes' },
];

/**
 * fig_02.1a: the two branches. The sympathetic branch is the accelerator (coral),
 * the parasympathetic is the brake (teal), and they push the same organs in
 * opposite directions. The heart row is marked because the vagus nerve carries
 * most of the brake's signal to it, fast enough to act within a single beat.
 */
export function TwoBranchesFigure() {
  const W = 480;
  const rowY = (i: number) => 118 + i * 44;
  const accX = 150;
  const organX = 240;
  const brakeX = 330;

  return (
    <Figure
      caption="fig_02.1a · the_two_branches"
      sub="one accelerator, one brake, working the same organs against each other. at rest the brake is already on, holding the heart well below its own pace. the vagus nerve is the brake's main cable to the heart."
      max={520}
    >
      <svg
        viewBox={`0 0 ${W} 278`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="The autonomic nervous system has two branches. The sympathetic branch is the accelerator: it speeds the heart, opens the airways, widens the pupils, and pauses digestion. The parasympathetic branch is the brake: it slows the heart, narrows the airways, shrinks the pupils, and resumes digestion. The vagus nerve carries most of the brake's signal to the heart."
      >
        {/* header pills */}
        <g>
          <rect x={44} y={26} width={192} height={56} rx={11} fill={c.coralFog} stroke={c.coralEdge} />
          <text x={140} y={50} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fontWeight={600} fill={c.coral}>
            accelerator
          </text>
          <text x={140} y={68} textAnchor="middle" fontFamily={monoFamily} fontSize={10.5} fill={c.muted}>
            sympathetic
          </text>
        </g>
        <g>
          <rect x={244} y={26} width={192} height={56} rx={11} fill={c.tealFog} stroke={c.tealEdge} />
          <text x={340} y={50} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fontWeight={600} fill={c.teal}>
            brake
          </text>
          <text x={340} y={68} textAnchor="middle" fontFamily={monoFamily} fontSize={10.5} fill={c.muted}>
            parasympathetic
          </text>
        </g>

        {/* center spine */}
        <line x1={organX} y1={92} x2={organX} y2={rowY(ROWS.length - 1) + 14} stroke={c.line} strokeWidth={1} />

        {ROWS.map((r, i) => {
          const y = rowY(i);
          return (
            <g key={r.organ}>
              {/* organ chip in the middle */}
              <rect x={organX - 46} y={y - 14} width={92} height={28} rx={7} fill={c.panel2} stroke={r.vagus ? c.tealEdge : c.line2} />
              <text x={organX} y={y + 4} textAnchor="middle" fontFamily={monoFamily} fontSize={11.5} fill={r.vagus ? c.teal : c.text}>
                {r.organ}
              </text>

              {/* accelerator effect, pointing in from the left */}
              <text x={accX + 18} y={y + 4} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.coral}>
                {r.acc}
              </text>
              <line x1={organX - 50} y1={y} x2={accX + 62} y2={y} stroke={c.coralEdge} strokeWidth={1} strokeDasharray="2 3" />

              {/* brake effect, pointing in from the right */}
              <text x={brakeX + 24} y={y + 4} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.teal}>
                {r.brake}
              </text>
              <line x1={organX + 50} y1={y} x2={brakeX - 18} y2={y} stroke={c.tealEdge} strokeWidth={1} strokeDasharray="2 3" />
            </g>
          );
        })}

        {/* vagus note on the heart row */}
        <text x={organX} y={rowY(0) - 24} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          ↑ vagus nerve
        </text>
      </svg>
    </Figure>
  );
}
