import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_10.2 · fused_vs_defused. The same thought, held two ways. Fused, it is
 * pressed flat against the eye: it fills the whole field, and it reads as the
 * world rather than as a thought, so there is no room to choose. Defused, the
 * same words are set out at arm's length where you can see them for what they
 * are, words the mind produced, with a gap of clear space between you and them.
 * That gap is where a response becomes possible. This is the ACT move: it does
 * not argue with the thought, it changes the distance. Concept: Hayes, cognitive
 * defusion; self-as-context.
 *
 * Laid out as a stacked pair (fused on top, defused below, joined by a single
 * arrow) rather than the original side-by-side panels. At a narrow viewport a
 * two-column layout forces every label down toward illegible sizes; stacking
 * gives each panel the full width, so the two thought-cards, the eye icons,
 * and the gap marker can all run at a comfortably readable size while keeping
 * the same contrast the panels always encoded: fused first, then the same
 * words redrawn smaller and set apart, with the gap and the shift named in
 * between.
 */
export function DefusionDistanceFigure() {
  return (
    <Figure
      caption="fig_10.2 · fused_vs_defused"
      sub="defusion does not change the words. it changes how close you stand to them. fused, the thought is the world. defused, it is one more thing passing through awareness."
      max={340}
    >
      <svg
        viewBox="0 0 300 410"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two stacked panels. Top, labeled fused: a thought card reading 'I am a failure' is pressed right against an eye so it fills the view, with no gap between them. An arrow marks the shift to a different distance. Bottom, labeled defused: the same words, reframed as 'I am having the thought that I am a failure,' sit in a card set apart from the eye, with a labeled gap of clear space between them, so the thought can be seen as just a thought."
      >
        {/* ── top: FUSED ── */}
        <text x={150} y={22} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={16} fontWeight={600} fill={c.coral}>
          fused
        </text>
        <text x={150} y={40} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.faint}>
          the thought is the world
        </text>

        {/* the eye */}
        <Eye cx={32} cy={101} color={c.coral} />

        {/* the thought, pressed flat against the eye, filling the field */}
        <rect x={48} y={56} width={236} height={90} rx={6} fill={c.coralFog} stroke={c.coral} strokeWidth={1.6} />
        <text x={166} y={94} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={20} fontWeight={700} fill={c.coral}>
          I am
        </text>
        <text x={166} y={122} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={20} fontWeight={700} fill={c.coral}>
          a failure
        </text>
        {/* no-gap marker */}
        <text x={150} y={166} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.faint}>
          no gap · no choice
        </text>

        {/* the shift: same words, new distance */}
        <line x1={150} y1={182} x2={150} y2={194} stroke={c.line2} strokeWidth={1.6} />
        <polygon points="144,194 156,194 150,203" fill={c.line2} />
        <text x={150} y={221} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.muted}>
          same words. new distance.
        </text>

        {/* ── bottom: DEFUSED ── */}
        <text x={150} y={249} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={16} fontWeight={600} fill={c.teal}>
          defused
        </text>
        <text x={150} y={267} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.faint}>
          a thought, seen as a thought
        </text>

        {/* the eye */}
        <Eye cx={32} cy={328} color={c.teal} />

        {/* the gap: clear space, marked */}
        <path d="M50,328 L110,328" stroke={c.teal} strokeWidth={1} strokeDasharray="3 4" strokeOpacity={0.7} />
        <text x={80} y={318} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.teal}>
          the gap
        </text>

        {/* the same thought, set out at distance, smaller, re-framed */}
        <rect x={114} y={283} width={170} height={90} rx={8} fill={c.panel2} stroke={c.teal} strokeWidth={1.4} />
        <text x={199} y={307} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.muted}>
          I am having
        </text>
        <text x={199} y={324} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.muted}>
          the thought that
        </text>
        <text x={199} y={344} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={16} fontWeight={600} fill={c.teal}>
          I am a failure
        </text>
        <text x={199} y={391} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fill={c.faint}>
          room to respond
        </text>
      </svg>
    </Figure>
  );
}

function Eye({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g>
      <path
        d={`M${cx - 18},${cy} Q${cx},${cy - 15} ${cx + 18},${cy} Q${cx},${cy + 15} ${cx - 18},${cy} Z`}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
      />
      <circle cx={cx} cy={cy} r={6} fill={`${color}33`} stroke={color} strokeWidth={1.4} />
      <circle cx={cx} cy={cy} r={2} fill={color} />
    </g>
  );
}
