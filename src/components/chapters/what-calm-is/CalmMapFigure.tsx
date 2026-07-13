import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';
import { MAP, QUADS, ex, ay } from './calmMap';
import { CalmMapBackdrop } from './CalmMapBackdrop';

const monoFamily = mono.fontFamily;

/** a faint example feeling placed on the map, for orientation */
function Sample({ e, a, text, color }: { e: number; a: number; text: string; color: string }) {
  return (
    <g>
      <circle cx={ex(e)} cy={ay(a)} r={3} fill={color} opacity={0.75} />
      <text x={ex(e) + 7} y={ay(a) + 4} fontFamily={monoFamily} fontSize={12.5} fill={c.faint}>
        {text}
      </text>
    </g>
  );
}

/**
 * fig_01.1a: the calm map. Arousal (vertical) by engagement (horizontal), with
 * the four states located: agitation and flow up high, sedation and equanimity
 * down low. The two counterfeits share the left column. Equanimity and sedation
 * share the bottom row, separated only by engagement.
 */
export function CalmMapFigure() {
  return (
    <Figure
      caption="fig_01.1a · the_calm_map"
      sub="arousal by engagement. the two counterfeits sit on the left (checked out). equanimity and sedation share the low-arousal row: same quiet body, told apart only by whether you are still here."
      max={520}
    >
      <svg
        viewBox={`0 0 ${MAP.vbW} ${MAP.vbH}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A two-by-two map. The vertical axis is arousal, low at the bottom to high at the top. The horizontal axis is engagement, checked out on the left to present on the right. Top left is agitation, top right is flow, bottom left is sedation, bottom right is equanimity, marked as the target."
      >
        <CalmMapBackdrop />

        {/* orienting samples, kept short so labels stay inside their quadrants */}
        <Sample e={0.2} a={0.84} text="panic" color={QUADS.agitation.color} />
        <Sample e={0.24} a={0.58} text="worry" color={QUADS.agitation.color} />
        <Sample e={0.74} a={0.82} text="absorbed" color={QUADS.flow.color} />
        <Sample e={0.2} a={0.22} text="numb" color={QUADS.sedation.color} />
        <Sample e={0.3} a={0.44} text="flat" color={QUADS.sedation.color} />
        <Sample e={0.58} a={0.36} text="steady" color={QUADS.equanimity.color} />
        <Sample e={0.74} a={0.18} text="ease" color={QUADS.equanimity.color} />
      </svg>
    </Figure>
  );
}
