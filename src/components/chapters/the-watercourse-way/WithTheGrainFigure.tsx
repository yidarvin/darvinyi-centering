import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_08.3: with the grain. Zhuangzi's Cook Ding (ch.3) is the picture of wu wei
 * as effort without strain. Force the blade straight across the natural lines
 * and it jams, sparks, and dulls. Guide it through the openings the structure
 * already offers and it glides, and after nineteen years the edge is still keen.
 * The work is the same. The strain is what the cook leaves out.
 *
 * Laid out as two stacked panels (forcing on top, flowing below) rather than
 * side by side, so each panel gets the full width to breathe and the labels
 * can run at a legible size on a phone.
 */
export function WithTheGrainFigure() {
  return (
    <Figure
      caption="fig_08.3 · with_the_grain"
      sub={
        'Cook Ding, Zhuangzi ch.3: after nineteen years and several thousand oxen his blade "is as sharp as if it had newly come from the whetstone," because he guides it through the natural crevices instead of hacking through bone. effort without strain. this is wu wei, and it is the heart of the chapter.'
      }
      max={320}
    >
      <svg
        viewBox="0 0 300 386"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels, stacked, over the same set of curved grain lines, the natural structure of the work. Top, forcing: a blade is driven straight down across the grain and jams at a line in a burst of friction, its edge chipped and dull. Bottom, flowing: the blade slides sideways along the open gap between two grain lines, parting them cleanly, its edge still keen."
      >
        {/* divider between the two panels */}
        <line x1={20} y1={196} x2={280} y2={196} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

        {/* ---- TOP: forcing, against the grain ---- */}
        <text x={20} y={26} fontFamily={monoFamily} fontSize={15} fontWeight={600} fill={c.coral}>
          forcing
        </text>

        {/* the grain (natural structure) */}
        <g stroke={c.faint} strokeWidth={1.3} fill="none" strokeOpacity={0.55}>
          <path d="M20,54 C 100,48 200,48 280,56" />
          <path d="M20,74 C 100,68 200,68 280,76" />
          <path d="M20,94 C 100,88 200,88 280,96" />
          <path d="M20,114 C 100,108 200,108 280,116" />
        </g>

        {/* the blade, driven straight down across the grain */}
        <g>
          <rect x={143} y={24} width={14} height={9} rx={2} fill={c.muted} />
          <path d="M145,33 L155,33 L152,118 L148,118 Z" fill={c.coral} fillOpacity={0.25} stroke={c.coral} strokeWidth={1.4} />
          {/* chipped, dulled edge at the tip */}
          <path d="M148,118 L150,112 L152,118 L150,116 Z" fill={c.coral} />
        </g>

        {/* the jam: a burst of friction where it crosses a line */}
        <g stroke={c.coral} strokeWidth={1.4} strokeLinecap="round">
          <path d="M150,114 L139,104 M150,114 L161,104 M150,114 L135,116 M150,114 L165,116 M150,114 L141,126 M150,114 L159,126" />
        </g>

        <text x={150} y={150} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.coral}>
          hacks across
        </text>
        <text x={150} y={172} textAnchor="middle" fontFamily={monoFamily} fontSize={12.5} fill={c.faint}>
          jams · dulls · strain
        </text>

        {/* ---- BOTTOM: flowing, with the grain ---- */}
        <text x={20} y={226} fontFamily={monoFamily} fontSize={15} fontWeight={600} fill={c.teal}>
          flowing
        </text>

        {/* the grain again */}
        <g stroke={c.faint} strokeWidth={1.3} fill="none" strokeOpacity={0.55}>
          <path d="M20,254 C 100,248 200,248 280,256" />
          <path d="M20,274 C 100,268 200,268 280,276" />
          <path d="M20,294 C 100,288 200,288 280,296" />
          <path d="M20,314 C 100,308 200,308 280,316" />
        </g>

        {/* the open gap between two lines, parted cleanly ahead of the blade */}
        <path
          d="M20,282 C 100,278 200,278 280,286"
          fill="none"
          stroke={c.teal}
          strokeWidth={1}
          strokeOpacity={0.45}
          strokeDasharray="2 4"
        />

        {/* the blade gliding sideways along the gap, with the grain */}
        <g>
          <rect x={22} y={278} width={9} height={13} rx={2} fill={c.muted} />
          <path d="M33,277 L235,281 L235,289 L33,291 Z" fill={c.tealFog} stroke={c.teal} strokeWidth={1.4} />
          {/* keen, smooth tip */}
          <path d="M235,281 L250,285 L235,289 Z" fill={c.teal} />
        </g>

        <text x={150} y={350} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.teal}>
          finds the opening
        </text>
        <text x={150} y={372} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.faint}>
          effortless · the edge stays keen
        </text>
      </svg>
    </Figure>
  );
}
