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
 */
export function DefusionDistanceFigure() {
  return (
    <Figure
      caption="fig_10.2 · fused_vs_defused"
      sub="defusion does not change the words. it changes how close you stand to them. fused, the thought is the world. defused, it is one more thing passing through awareness."
      max={520}
    >
      <svg
        viewBox="0 0 520 230"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels. On the left, labeled fused, a thought card reading 'I am a failure' is pressed right against an eye so it fills the whole view; there is no gap. On the right, labeled defused, the same words are reframed as 'I am having the thought that I am a failure,' set out at a distance from the eye with clear space between, so it can be seen as just a thought."
      >
        {/* ── left: FUSED ── */}
        <text x={130} y={20} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11} fontWeight={500} fill={c.coral}>
          fused
        </text>
        <text x={130} y={34} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={9} fill={c.faint}>
          the thought is the world
        </text>

        {/* the eye */}
        <Eye cx={36} cy={120} color={c.coral} />

        {/* the thought, pressed flat against the eye, filling the field */}
        <rect x={64} y={66} width={190} height={108} rx={6} fill={c.coralFog} stroke={c.coral} strokeWidth={1.6} />
        <text x={159} y={116} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={15} fontWeight={600} fill={c.coral}>
          I am
        </text>
        <text x={159} y={138} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={15} fontWeight={600} fill={c.coral}>
          a failure
        </text>
        {/* no-gap marker */}
        <text x={159} y={166} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8} fill={c.faint}>
          no gap · no choice
        </text>

        {/* divider */}
        <line x1={268} y1={48} x2={268} y2={196} stroke={c.line} strokeWidth={1} strokeDasharray="2 5" />

        {/* ── right: DEFUSED ── */}
        <text x={394} y={20} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11} fontWeight={500} fill={c.teal}>
          defused
        </text>
        <text x={394} y={34} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={9} fill={c.faint}>
          a thought, seen as a thought
        </text>

        {/* the eye */}
        <Eye cx={292} cy={120} color={c.teal} />

        {/* the gap: clear space, marked */}
        <path d="M312,120 L378,120" stroke={c.teal} strokeWidth={1} strokeDasharray="3 4" strokeOpacity={0.7} />
        <text x={345} y={112} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8} fill={c.teal}>
          the gap
        </text>

        {/* the same thought, set out at distance, smaller, re-framed */}
        <rect x={380} y={84} width={128} height={72} rx={8} fill={c.panel2} stroke={c.teal} strokeWidth={1.4} />
        <text x={444} y={104} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8.5} fill={c.muted}>
          I am having
        </text>
        <text x={444} y={117} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8.5} fill={c.muted}>
          the thought that
        </text>
        <text x={444} y={134} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11} fontWeight={600} fill={c.teal}>
          I am a failure
        </text>
        <text x={444} y={149} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={7.5} fill={c.faint}>
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
