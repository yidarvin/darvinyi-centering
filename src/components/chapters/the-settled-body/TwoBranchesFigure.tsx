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
 *
 * Layout notes: the viewBox is deliberately narrower (400) than a typical figure
 * so that the fixed phone render width (288px) yields a larger scale factor
 * (0.72 instead of 0.6), which lets every label clear an 11px effective floor
 * without shrinking the tug-of-war layout (accelerator left, organ center,
 * brake right) that the prose's "same organs, opposite directions" claim needs.
 */
export function TwoBranchesFigure() {
  const W = 400;
  const H = 430;
  const rowY = (i: number) => 170 + i * 70;
  const organX = 200;
  const accX = 72;
  const brakeX = 328;
  // Narrowed from 65: at the 17px label font, the longest row words ('open
  // wider', 'slows down', 10 chars) need a text half-width of ~51px plus an
  // 8px no-overlap margin before the dashed connector's near end. That only
  // leaves room if the organ chip's edge sits further out, so the chip is
  // narrower than the old 11px-font version needed.
  const chipHalfW = 55;
  const chipHalfH = 20;
  // Distance from accX/brakeX (the label's center) out to the dashed
  // connector's near end. Must clear (longest label half-width 51) + (margin
  // 8) = 59; rounded up to keep a hair of extra clearance across renderers.
  const connectorOffset = 59;

  return (
    <Figure
      caption="fig_02.1a · the_two_branches"
      sub="one accelerator, one brake, working the same organs against each other. at rest the brake is already on, holding the heart well below its own pace. the vagus nerve is the brake's main cable to the heart."
      max={440}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="The autonomic nervous system has two branches. The sympathetic branch is the accelerator: it speeds the heart, opens the airways, widens the pupils, and pauses digestion. The parasympathetic branch is the brake: it slows the heart, narrows the airways, shrinks the pupils, and resumes digestion. The vagus nerve carries most of the brake's signal to the heart."
      >
        {/* header pills */}
        <g>
          <rect x={14} y={24} width={180} height={70} rx={14} fill={c.coralFog} stroke={c.coralEdge} />
          <text x={104} y={52} textAnchor="middle" fontFamily={monoFamily} fontSize={20} fontWeight={600} fill={c.coral}>
            accelerator
          </text>
          <text x={104} y={82} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.muted}>
            sympathetic
          </text>
        </g>
        <g>
          <rect x={206} y={24} width={180} height={70} rx={14} fill={c.tealFog} stroke={c.tealEdge} />
          <text x={296} y={52} textAnchor="middle" fontFamily={monoFamily} fontSize={20} fontWeight={600} fill={c.teal}>
            brake
          </text>
          <text x={296} y={82} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.muted}>
            parasympathetic
          </text>
        </g>

        {/* center spine */}
        <line x1={organX} y1={98} x2={organX} y2={rowY(ROWS.length - 1) + chipHalfH} stroke={c.line} strokeWidth={1} />

        {ROWS.map((r, i) => {
          const y = rowY(i);
          return (
            <g key={r.organ}>
              {/* organ chip in the middle */}
              <rect
                x={organX - chipHalfW}
                y={y - chipHalfH}
                width={chipHalfW * 2}
                height={chipHalfH * 2}
                rx={10}
                fill={c.panel2}
                stroke={r.vagus ? c.tealEdge : c.line2}
              />
              <text x={organX} y={y + 6} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={r.vagus ? c.teal : c.text}>
                {r.organ}
              </text>

              {/* accelerator effect, pointing in from the left */}
              <text x={accX} y={y + 6} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.coral}>
                {r.acc}
              </text>
              <line
                x1={organX - chipHalfW}
                y1={y}
                x2={accX + connectorOffset}
                y2={y}
                stroke={c.coralEdge}
                strokeWidth={1}
                strokeDasharray="2 3"
              />

              {/* brake effect, pointing in from the right */}
              <text x={brakeX} y={y + 6} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.teal}>
                {r.brake}
              </text>
              <line
                x1={organX + chipHalfW}
                y1={y}
                x2={brakeX - connectorOffset}
                y2={y}
                stroke={c.tealEdge}
                strokeWidth={1}
                strokeDasharray="2 3"
              />
            </g>
          );
        })}

        {/* vagus note on the heart row */}
        <text x={organX} y={rowY(0) - 34} textAnchor="middle" fontFamily={monoFamily} fontSize={17} fill={c.faint}>
          ↑ vagus nerve
        </text>
      </svg>
    </Figure>
  );
}
