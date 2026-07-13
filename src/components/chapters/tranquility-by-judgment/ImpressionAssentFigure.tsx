import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

interface NodeProps {
  cx: number;
  cy: number;
  w?: number;
  h?: number;
  fontSize?: number;
  label: string;
  col: string;
  fill: string;
  strong?: boolean;
}

function Node({ cx, cy, w = 110, h = 42, fontSize = 15, label, col, fill, strong }: NodeProps) {
  return (
    <g>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={9}
        fill={fill}
        stroke={col}
        strokeWidth={strong ? 1.8 : 1.3}
        strokeOpacity={strong ? 1 : 0.7}
      />
      <text x={cx} y={cy + fontSize * 0.32} textAnchor="middle" fontFamily={monoFamily} fontSize={fontSize} fontWeight={strong ? 600 : 500} fill={col}>
        {label}
      </text>
    </g>
  );
}

/**
 * fig_04.2a: event to impression to assent to reaction. The Stoic mechanism of
 * disturbance. An event throws up an impression (phantasia), a mental picture
 * of what happened, arriving on its own, unbidden, and not yet a judgment. (A
 * sharp impression can also spark a first movement, propatheia, a fast,
 * pre-rational flinch in the body. That is a separate reflex, not the
 * impression itself.) The one step that is up to you is assent
 * (sunkatathesis): grant it to the impression "this is bad" and a passion
 * follows; withhold it and the impression passes. The fork is the whole lever.
 *
 * Laid out top-to-bottom rather than left-to-right so every label can run at
 * a legible size on a narrow viewport: a horizontal chain of five boxes plus
 * eight caption strings has no room to grow, but a vertical chain does, since
 * height is free while the mobile render width is not. Each node's Greek term
 * and its plain-English instance are merged onto one caption line beneath
 * that node (they were already the same color in the original, split above
 * and below); the fork keeps its two branch labels and two outcome nodes.
 */
export function ImpressionAssentFigure() {
  const cx = 150;

  // main chain
  const eventCy = 37;
  const eventBottom = eventCy + 21;
  const cap1Y = eventBottom + 16 + 11; // baseline
  const arrow1Y1 = cap1Y + 4 + 14;
  const arrow1Y2 = arrow1Y1 + 22;

  const impressionCy = arrow1Y2 + 14 + 21;
  const impressionBottom = impressionCy + 21;
  const cap2Y = impressionBottom + 16 + 11;
  const arrow2Y1 = cap2Y + 4 + 14;
  const arrow2Y2 = arrow2Y1 + 22;

  const assentCy = arrow2Y2 + 14 + 21;
  const assentBottom = assentCy + 21;
  const cap3Y = assentBottom + 16 + 11;

  const branchY = cap3Y + 4 + 22 + 11;
  const forkCy = branchY + 4 + 15 + 20;
  const forkTop = forkCy - 20;

  const viewH = forkCy + 20 + 18;

  const eqCx = 80;
  const disCx = 220;

  return (
    <Figure
      caption="fig_04.2a · where_judgment_enters"
      sub="an event throws up an impression on its own, a mental picture that arrives unbidden, not yet a judgment. the one step up to you is assent. grant it to 'this is bad' and a passion follows; withhold it and the impression passes. Epictetus: we are disturbed not by events, but by our judgments about them."
      max={380}
    >
      <svg
        viewBox={`0 0 300 ${viewH}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A top-to-bottom chain: an event leads to an impression, a mental picture that arrives on its own, unbidden, that reads 'this is bad.' The impression reaches assent, the one step that is up to you, where judgment enters. From assent the path forks two ways: withhold assent and reach equanimity, or grant assent and reach disturbance."
      >
        <defs>
          <marker id="ia-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
          <marker id="ia-teal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.teal} />
          </marker>
          <marker id="ia-coral" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.coral} />
          </marker>
        </defs>

        {/* the chain */}
        <line x1={cx} y1={arrow1Y1} x2={cx} y2={arrow1Y2} stroke={c.faint} strokeWidth={1.3} markerEnd="url(#ia-arrow)" />
        <line x1={cx} y1={arrow2Y1} x2={cx} y2={arrow2Y2} stroke={c.faint} strokeWidth={1.3} markerEnd="url(#ia-arrow)" />

        {/* the fork */}
        <path
          d={`M ${cx} ${assentBottom} C ${cx - 14} ${assentBottom + 18}, ${cx - 42} ${forkTop - 35}, ${eqCx} ${forkTop}`}
          fill="none"
          stroke={c.teal}
          strokeWidth={1.5}
          markerEnd="url(#ia-teal)"
        />
        <path
          d={`M ${cx} ${assentBottom} C ${cx + 14} ${assentBottom + 18}, ${cx + 42} ${forkTop - 35}, ${disCx} ${forkTop}`}
          fill="none"
          stroke={c.coral}
          strokeWidth={1.5}
          markerEnd="url(#ia-coral)"
        />

        {/* captions, one merged line per node: the term and its plain instance */}
        <text x={cx} y={cap1Y} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fill={c.faint}>
          something happens
        </text>
        <text x={cx} y={cap2Y} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fill={c.faint}>
          phantasia · &ldquo;this is bad&rdquo;
        </text>
        <text x={cx} y={cap3Y} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fill={c.teal}>
          sunkatathesis · judgment enters
        </text>

        {/* branch labels */}
        <text x={eqCx} y={branchY} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fill={c.teal}>
          withhold
        </text>
        <text x={disCx} y={branchY} textAnchor="middle" fontFamily={monoFamily} fontSize={14} fill={c.coral}>
          assent given
        </text>

        {/* the nodes */}
        <Node cx={cx} cy={eventCy} w={90} label="event" col={c.muted} fill={c.panel2} />
        <Node cx={cx} cy={impressionCy} w={124} label="impression" col={c.muted} fill={c.panel2} />
        <Node cx={cx} cy={assentCy} w={100} label="assent?" col={c.teal} fill={c.tealFog} strong />
        <Node cx={eqCx} cy={forkCy} w={118} h={40} fontSize={13} label="equanimity" col={c.teal} fill={c.tealFog} />
        <Node cx={disCx} cy={forkCy} w={126} h={40} fontSize={13} label="disturbance" col={c.coral} fill={c.coralFog} />
      </svg>
    </Figure>
  );
}
