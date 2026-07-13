import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_07.2: full attention on one ordinary act. Two panels, the same plain act
 * (a cup of tea) in each. On the left the attention is split, most of it leaking
 * off to the next thing, the phone, an old worry, so only a sliver lands on the
 * cup. On the right the same act gets the whole of the attention, one line, and
 * nothing else. The act does not change. What changes is how much of you is
 * there for it. "This moment, this cup, fully met" is the entire teaching.
 */
export function OneActFigure() {
  return (
    <Figure
      caption="fig_07.2 · one_act"
      sub="the same ordinary act, twice. at the top, attention leaks to the next thing, a second screen, an old worry, and only a sliver lands here. at the bottom, the whole of it is given to the one act. nothing about the cup changes. how much of you is present for it does."
      max={340}
    >
      <svg
        viewBox="0 0 320 442"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two stacked panels, the same cup of tea. Top, labeled half here: attention splits into three threads pulling toward a phone, later, and a worry, so only a thin line reaches the cup. Bottom, labeled all here: the same cup with a single thick line of attention reaching it and nothing pulling away."
      >
        {/* divider */}
        <line x1={16} y1={216} x2={304} y2={216} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

        {/* ---- TOP: divided ---- */}
        <text x={16} y={22} fontFamily={monoFamily} fontSize={14} fill={c.faint}>
          half here
        </text>
        {/* the mind */}
        <circle cx={54} cy={95} r={22} fill={c.panel} stroke={c.line2} strokeWidth={1} />
        <text x={54} y={100} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.muted}>
          you
        </text>
        {/* the cup, dim */}
        <g opacity={0.5}>
          <path d="M167 140 h36 v21 a18 18 0 0 1 -36 0 Z" fill="none" stroke={c.muted} strokeWidth={1.5} />
          <path d="M203 145 q12 3 12 12 q0 9 -12 10" fill="none" stroke={c.muted} strokeWidth={1.5} />
          <path d="M176 128 q4 -8 0 -13 M186 128 q4 -8 0 -13 M196 128 q4 -8 0 -13" fill="none" stroke={c.muted} strokeWidth={1} opacity={0.6} />
        </g>
        <text x={185} y={200} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.faint}>
          the cup
        </text>
        {/* sliver of attention to the cup */}
        <line x1={70} y1={110} x2={170} y2={143} stroke={c.teal} strokeWidth={1} strokeOpacity={0.45} />
        {/* leaks pulling away */}
        <g fontFamily={monoFamily} fontSize={13}>
          <line x1={70} y1={80} x2={240} y2={43} stroke={c.coral} strokeWidth={1.5} strokeOpacity={0.7} />
          <rect x={240} y={30} width={64} height={26} rx={6} fill={c.coralFog} stroke={c.coralEdge} strokeWidth={1} />
          <text x={272} y={47} textAnchor="middle" fill={c.coral}>phone</text>

          <line x1={76} y1={95} x2={240} y2={77} stroke={c.amber} strokeWidth={1.5} strokeOpacity={0.6} />
          <rect x={240} y={64} width={64} height={26} rx={6} fill={c.amberFog} stroke={c.amberEdge} strokeWidth={1} />
          <text x={272} y={81} textAnchor="middle" fill={c.amber}>later</text>

          <line x1={68} y1={112} x2={222} y2={111} stroke={c.violet} strokeWidth={1.5} strokeOpacity={0.6} />
          <rect x={222} y={98} width={82} height={26} rx={6} fill={c.violetFog} stroke={c.violetEdge} strokeWidth={1} />
          <text x={263} y={115} textAnchor="middle" fill={c.violet}>a worry</text>
        </g>

        {/* ---- BOTTOM: whole ---- */}
        <text x={16} y={250} fontFamily={monoFamily} fontSize={14} fill={c.teal}>
          all here
        </text>
        {/* the mind */}
        <circle cx={54} cy={323} r={22} fill={c.panel} stroke={c.tealEdge} strokeWidth={1.2} />
        <text x={54} y={328} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.teal}>
          you
        </text>
        {/* the cup, bright */}
        <g>
          <path d="M167 368 h36 v21 a18 18 0 0 1 -36 0 Z" fill={c.tealFog} stroke={c.teal} strokeWidth={1.8} />
          <path d="M203 373 q12 3 12 12 q0 9 -12 10" fill="none" stroke={c.teal} strokeWidth={1.8} />
          <path d="M176 356 q4 -9 0 -14 M186 356 q4 -9 0 -14 M196 356 q4 -9 0 -14" fill="none" stroke={c.teal} strokeWidth={1.2} />
        </g>
        <text x={185} y={428} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.faint}>
          the cup
        </text>
        {/* one full line of attention, nothing else */}
        <line x1={70} y1={333} x2={170} y2={371} stroke={c.teal} strokeWidth={3} />
      </svg>
    </Figure>
  );
}
