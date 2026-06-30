import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_08.3: with the grain. Zhuangzi's Cook Ding (ch.3) is the picture of wu wei
 * as effort without strain. Force the blade straight across the natural lines
 * and it jams, sparks, and dulls. Guide it through the openings the structure
 * already offers and it glides, and after nineteen years the edge is still keen.
 * The work is the same. The strain is what the cook leaves out.
 */
export function WithTheGrainFigure() {
  return (
    <Figure
      caption="fig_08.3 · with_the_grain"
      sub={
        'Cook Ding, Zhuangzi ch.3: after nineteen years and many thousands of oxen his blade "is as sharp as if it had newly come from the whetstone," because he guides it through the natural crevices instead of hacking through bone. effort without strain. this is wu wei, and it is the heart of the chapter.'
      }
      max={540}
    >
      <svg
        viewBox="0 0 520 250"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels over the same set of curved grain lines, the natural structure of the work. Left, forcing: a blade is driven straight down across the grain and jams at a line in a burst of friction, its edge chipped and dull. Right, flowing: the blade slides sideways along the open gap between two grain lines, parting them cleanly, its edge still keen."
      >
        <line x1={260} y1={20} x2={260} y2={228} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

        {/* ---- LEFT: forcing, against the grain ---- */}
        <text x={24} y={32} fontFamily={monoFamily} fontSize={11} fontWeight={600} fill={c.coral}>
          forcing
        </text>

        {/* the grain (natural structure) */}
        <g stroke={c.faint} strokeWidth={1.3} fill="none" strokeOpacity={0.55}>
          <path d="M28,76 C 90,70 160,70 236,78" />
          <path d="M28,106 C 90,100 160,100 236,108" />
          <path d="M28,136 C 90,130 160,130 236,138" />
          <path d="M28,166 C 90,160 160,160 236,168" />
        </g>

        {/* the blade, driven straight down across the grain */}
        <g>
          <rect x={124} y={40} width={14} height={9} rx={2} fill={c.muted} />
          <path d="M126,49 L136,49 L133,150 L129,150 Z" fill={c.coral} fillOpacity={0.25} stroke={c.coral} strokeWidth={1.4} />
          {/* chipped, dulled edge at the tip */}
          <path d="M129,150 L131,144 L133,150 L131,148 Z" fill={c.coral} />
        </g>

        {/* the jam: a burst of friction where it crosses a line */}
        <g stroke={c.coral} strokeWidth={1.4} strokeLinecap="round">
          <path d="M131,138 L120,128 M131,138 L142,128 M131,138 L116,140 M131,138 L146,140 M131,138 L122,150 M131,138 L140,150" />
        </g>

        <text x={132} y={196} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.coral}>
          hacks across
        </text>
        <text x={132} y={210} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          jams · dulls · strain
        </text>

        {/* ---- RIGHT: flowing, with the grain ---- */}
        <text x={296} y={32} fontFamily={monoFamily} fontSize={11} fontWeight={600} fill={c.teal}>
          flowing
        </text>

        {/* the grain again */}
        <g stroke={c.faint} strokeWidth={1.3} fill="none" strokeOpacity={0.55}>
          <path d="M284,76 C 346,70 416,70 492,78" />
          <path d="M284,106 C 346,100 416,100 492,108" />
          <path d="M284,136 C 346,130 416,130 492,138" />
          <path d="M284,166 C 346,160 416,160 492,168" />
        </g>

        {/* the open gap between two lines, parted cleanly ahead of the blade */}
        <path
          d="M284,121 C 346,116 416,116 492,123"
          fill="none"
          stroke={c.teal}
          strokeWidth={1}
          strokeOpacity={0.45}
          strokeDasharray="2 4"
        />

        {/* the blade gliding sideways along the gap, with the grain */}
        <g>
          <rect x={300} y={116} width={9} height={12} rx={2} fill={c.muted} />
          <path d="M309,117 L412,119 L412,125 L309,127 Z" fill={c.tealFog} stroke={c.teal} strokeWidth={1.4} />
          {/* keen, smooth tip */}
          <path d="M412,119 L424,122 L412,125 Z" fill={c.teal} />
        </g>

        <text x={388} y={196} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.teal}>
          finds the opening
        </text>
        <text x={388} y={210} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          effortless · the edge stays keen
        </text>
      </svg>
    </Figure>
  );
}
