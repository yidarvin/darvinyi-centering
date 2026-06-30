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
      sub="the same ordinary act, twice. on the left, attention leaks to the next thing, a second screen, an old worry, and only a sliver lands here. on the right, the whole of it is given to the one act. nothing about the tea changes. how much of you is present for it does."
      max={520}
    >
      <svg
        viewBox="0 0 520 232"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels. Left, labeled half here: a cup of tea with attention split into thin threads pulling away to a phone, a clock, and a worry, so only a thin line reaches the cup. Right, labeled all here: the same cup of tea with a single full line of attention reaching it and nothing pulling away."
      >
        {/* divider */}
        <line x1={260} y1={20} x2={260} y2={212} stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

        {/* ---- LEFT: divided ---- */}
        <text x={20} y={30} fontFamily={monoFamily} fontSize={11} fill={c.faint}>
          half here
        </text>
        {/* the mind, top-left */}
        <circle cx={64} cy={92} r={17} fill={c.panel} stroke={c.line2} strokeWidth={1} />
        <text x={64} y={96} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.muted}>
          you
        </text>
        {/* the cup, bottom center-left, dim */}
        <g opacity={0.5}>
          <path d="M150 168 h28 v16 a14 14 0 0 1 -28 0 Z" fill="none" stroke={c.muted} strokeWidth={1.5} />
          <path d="M178 172 q9 2 9 9 q0 7 -9 8" fill="none" stroke={c.muted} strokeWidth={1.5} />
          <path d="M156 160 q3 -6 0 -10 M164 160 q3 -6 0 -10 M172 160 q3 -6 0 -10" fill="none" stroke={c.muted} strokeWidth={1} opacity={0.6} />
        </g>
        <text x={164} y={206} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          the cup
        </text>
        {/* sliver of attention to the cup */}
        <line x1={76} y1={104} x2={150} y2={170} stroke={c.teal} strokeWidth={1} strokeOpacity={0.45} />
        {/* leaks pulling away */}
        <g fontFamily={monoFamily} fontSize={9}>
          <line x1={78} y1={84} x2={150} y2={56} stroke={c.coral} strokeWidth={1.5} strokeOpacity={0.7} />
          <rect x={150} y={44} width={50} height={22} rx={5} fill={c.coralFog} stroke={c.coralEdge} strokeWidth={1} />
          <text x={175} y={58} textAnchor="middle" fill={c.coral}>phone</text>

          <line x1={80} y1={94} x2={196} y2={104} stroke={c.amber} strokeWidth={1.5} strokeOpacity={0.6} />
          <rect x={196} y={94} width={46} height={22} rx={5} fill={c.amberFog} stroke={c.amberEdge} strokeWidth={1} />
          <text x={219} y={108} textAnchor="middle" fill={c.amber}>later</text>

          <line x1={74} y1={108} x2={150} y2={132} stroke={c.violet} strokeWidth={1.5} strokeOpacity={0.6} />
          <rect x={142} y={122} width={52} height={22} rx={5} fill={c.violetFog} stroke={c.violetEdge} strokeWidth={1} />
          <text x={168} y={136} textAnchor="middle" fill={c.violet}>a worry</text>
        </g>

        {/* ---- RIGHT: whole ---- */}
        <text x={300} y={30} fontFamily={monoFamily} fontSize={11} fill={c.teal}>
          all here
        </text>
        {/* the mind */}
        <circle cx={344} cy={92} r={17} fill={c.panel} stroke={c.tealEdge} strokeWidth={1.2} />
        <text x={344} y={96} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.teal}>
          you
        </text>
        {/* the cup, bright */}
        <g>
          <path d="M430 166 h30 v18 a15 15 0 0 1 -30 0 Z" fill={c.tealFog} stroke={c.teal} strokeWidth={1.8} />
          <path d="M460 170 q10 2 10 10 q0 8 -10 9" fill="none" stroke={c.teal} strokeWidth={1.8} />
          <path d="M437 158 q3 -7 0 -11 M445 158 q3 -7 0 -11 M453 158 q3 -7 0 -11" fill="none" stroke={c.teal} strokeWidth={1.2} />
        </g>
        <text x={445} y={206} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          the cup
        </text>
        {/* one full line of attention, nothing else */}
        <line x1={356} y1={104} x2={432} y2={168} stroke={c.teal} strokeWidth={3} />
      </svg>
    </Figure>
  );
}
