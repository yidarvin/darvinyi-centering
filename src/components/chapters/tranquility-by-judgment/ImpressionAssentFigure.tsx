import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

interface NodeProps {
  cx: number;
  cy: number;
  w?: number;
  label: string;
  col: string;
  fill: string;
  strong?: boolean;
}

function Node({ cx, cy, w = 92, label, col, fill, strong }: NodeProps) {
  const h = 34;
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
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fontWeight={strong ? 600 : 500} fill={col}>
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
 */
export function ImpressionAssentFigure() {
  return (
    <Figure
      caption="fig_04.2a · where_judgment_enters"
      sub="an event throws up an impression on its own, a mental picture that arrives unbidden, not yet a judgment. the one step up to you is assent. grant it to 'this is bad' and a passion follows; withhold it and the impression passes. Epictetus: we are disturbed not by events, but by our judgments about them."
      max={540}
    >
      <svg
        viewBox="0 0 500 236"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A left-to-right chain: an event leads to an impression that 'this is bad,' a mental picture that arrives on its own, unbidden. The impression reaches assent, the one step that is up to you, where judgment enters. From assent the path forks two ways: withhold assent and reach equanimity, or grant assent and reach disturbance."
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
        <line x1={116} y1={132} x2={152} y2={132} stroke={c.faint} strokeWidth={1.3} markerEnd="url(#ia-arrow)" />
        <line x1={248} y1={132} x2={278} y2={132} stroke={c.faint} strokeWidth={1.3} markerEnd="url(#ia-arrow)" />

        {/* the fork */}
        <path d="M 372 124 C 392 112, 404 96, 410 86" fill="none" stroke={c.teal} strokeWidth={1.5} markerEnd="url(#ia-teal)" />
        <path d="M 372 140 C 392 152, 404 168, 410 178" fill="none" stroke={c.coral} strokeWidth={1.5} markerEnd="url(#ia-coral)" />

        {/* captions */}
        <text x={200} y={101} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.faint}>
          phantasia
        </text>
        <text x={326} y={101} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.teal}>
          sunkatathesis
        </text>
        <text x={70} y={168} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.faint}>
          something happens
        </text>
        <text x={200} y={168} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.faint}>
          &ldquo;this is bad&rdquo;
        </text>
        <text x={326} y={168} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.teal}>
          judgment enters
        </text>
        <text x={448} y={48} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.teal}>
          withhold
        </text>
        <text x={448} y={222} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.coral}>
          assent given
        </text>

        {/* the nodes */}
        <Node cx={70} cy={132} w={88} label="event" col={c.muted} fill={c.panel2} />
        <Node cx={200} cy={132} label="impression" col={c.muted} fill={c.panel2} />
        <Node cx={326} cy={132} label="assent?" col={c.teal} fill={c.tealFog} strong />
        <Node cx={448} cy={68} w={92} label="equanimity" col={c.teal} fill={c.tealFog} />
        <Node cx={448} cy={190} w={92} label="disturbance" col={c.coral} fill={c.coralFog} />
      </svg>
    </Figure>
  );
}
