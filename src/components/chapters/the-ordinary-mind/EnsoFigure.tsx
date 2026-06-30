import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// one brush sweep: started near the top, carried clockwise almost all the way
// round, lifted before it closes. the radius wanders a little on purpose. the
// gap and the wobble are the figure. a compass-perfect circle would say the
// wrong thing.
const ENSO =
  'M171 38 C 214 54 244 96 245 142 C 246 190 210 230 162 238 C 112 247 60 222 42 174 C 25 128 44 74 90 50 C 120 34 152 33 180 46';

/**
 * fig_07.1: the ensō. A circle brushed in one or two strokes, in a single
 * breath, and characteristically left open and imperfect. It is the chapter's
 * motif: not a symbol of a faraway enlightenment but of this ordinary moment met
 * whole. The opening keeps it from being sealed off from the world; the wobble
 * is wabi-sabi, the beauty of the incomplete and impermanent. Nothing is added
 * after the stroke. What the brush did is what it is.
 */
export function EnsoFigure() {
  return (
    <Figure
      caption="fig_07.1 · ensō"
      sub="the ensō, the Zen circle, drawn in one breath and one unbroken gesture, then left as it fell. it is usually open, not closed, and never redrawn. complete and imperfect at once. the figure this whole chapter is brushed inside of: calm is not a perfect circle to be finished somewhere else, it is this stroke, here, met all the way."
      max={420}
    >
      <svg
        viewBox="0 0 288 276"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="An ensō: a circle brushed in a single sweep, thick where the brush pressed and thinning to nothing at each end, left open at the top so the ring never quite closes. The line wavers slightly. It is whole and imperfect at once."
      >
        <defs>
          {/* brush pressure: faded where the stroke lifts, full in the body of the sweep */}
          <linearGradient id="enso-ink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c.teal} stopOpacity={0.15} />
            <stop offset="0.12" stopColor={c.teal} stopOpacity={0.95} />
            <stop offset="0.85" stopColor={c.teal} stopOpacity={0.95} />
            <stop offset="1" stopColor={c.teal} stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <g transform="translate(0,6)">
          {/* ink bleed, a soft wide halo under the stroke */}
          <path d={ENSO} fill="none" stroke={c.teal} strokeOpacity={0.08} strokeWidth={26} strokeLinecap="round" />
          {/* the brushed circle */}
          <path d={ENSO} fill="none" stroke="url(#enso-ink)" strokeWidth={13} strokeLinecap="round" />
          {/* a couple of dry-brush flecks near where the stroke lifts */}
          <circle cx={181} cy={40} r={2.2} fill={c.teal} fillOpacity={0.5} />
          <circle cx={176} cy={47} r={1.4} fill={c.teal} fillOpacity={0.35} />

          {/* the opening, named */}
          <line x1={171} y1={40} x2={181} y2={48} stroke={c.faint} strokeWidth={1} strokeDasharray="2 3" opacity={0.7} />
          <text x={196} y={34} fontFamily={monoFamily} fontSize={10.5} fill={c.faint}>
            left open
          </text>
          <text x={144} y={150} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.muted}>
            one breath,
          </text>
          <text x={144} y={166} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.muted}>
            one stroke
          </text>
        </g>
      </svg>
    </Figure>
  );
}
