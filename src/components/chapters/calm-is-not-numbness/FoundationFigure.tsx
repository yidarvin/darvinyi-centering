import type { ReactNode } from 'react';
import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

const SLATE = '#7c8794';
const SLATE_FOG = 'rgba(124,135,148,0.10)';

/** the four things a settled center either shuts out or steps toward */
const ITEMS = [
  { label: 'the hard talk', x: 40 },
  { label: 'grief', x: 96 },
  { label: 'the work', x: 152 },
  { label: 'other people', x: 208 },
];

function Bunker() {
  return (
    <svg
      viewBox="0 0 248 168"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Calm as a bunker. A settled center is sealed inside a thick wall. The hard conversation, grief, the work, and other people all sit outside and bounce off the wall. Nothing reaches in and nothing steps out."
    >
      {/* the items, outside, kept out */}
      {ITEMS.map((it) => (
        <g key={it.label}>
          <circle cx={it.x} cy={26} r={4} fill="none" stroke={SLATE} strokeWidth={1.2} />
          <text x={it.x} y={16} textAnchor="middle" fontFamily={monoFamily} fontSize={7} fill={c.faint}>
            {it.label}
          </text>
          {/* bouncing off the wall */}
          <path d={`M${it.x} 32 L${it.x} 52`} stroke={SLATE} strokeWidth={1} strokeDasharray="2 3" opacity={0.7} />
          <path d={`M${it.x - 3} 48 L${it.x} 53 L${it.x + 3} 48`} fill="none" stroke={SLATE} strokeWidth={1} opacity={0.7} />
        </g>
      ))}

      {/* the wall */}
      <rect x={28} y={62} width={192} height={92} rx={10} fill="none" stroke={SLATE} strokeWidth={2.4} />
      <rect x={28} y={62} width={192} height={92} rx={10} fill={SLATE_FOG} />

      {/* you, sealed inside */}
      <circle cx={124} cy={112} r={11} fill="none" stroke={SLATE} strokeWidth={1.4} />
      <circle cx={124} cy={112} r={4.4} fill={SLATE} />
      <text x={124} y={138} textAnchor="middle" fontFamily={monoFamily} fontSize={7.5} fill={c.muted}>
        sealed in
      </text>
    </svg>
  );
}

function Base() {
  const cx = 124;
  const groundY = 128;
  return (
    <svg
      viewBox="0 0 248 168"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Calm as a base. A settled center is the ground you stand on, and from it you reach out toward the hard conversation, grief, the work, and other people. The base does not keep the world away. It is what lets you meet it."
    >
      {/* the items, reached toward */}
      {ITEMS.map((it) => (
        <g key={it.label}>
          {/* branch from you out to the item */}
          <path
            d={`M${cx} ${groundY - 6} Q${(cx + it.x) / 2} ${it.x === cx ? 60 : 54}, ${it.x} 34`}
            fill="none"
            stroke={c.teal}
            strokeWidth={1.3}
          />
          <circle cx={it.x} cy={30} r={4.4} fill={c.tealFog} stroke={c.teal} strokeWidth={1.3} />
          <text x={it.x} y={20} textAnchor="middle" fontFamily={monoFamily} fontSize={7} fill={c.teal}>
            {it.label}
          </text>
        </g>
      ))}

      {/* you, standing on the base */}
      <circle cx={cx} cy={groundY - 16} r={7.5} fill="none" stroke={c.teal} strokeWidth={1.5} />
      <circle cx={cx} cy={groundY - 16} r={3.4} fill={c.teal} />
      <text x={cx} y={groundY - 26} textAnchor="middle" fontFamily={monoFamily} fontSize={7} fill={c.teal}>
        you
      </text>

      {/* the settled base: a broad, low platform */}
      <path d={`M40 ${groundY} Q124 ${groundY + 16}, 208 ${groundY} L208 ${groundY + 6} Q124 ${groundY + 22}, 40 ${groundY + 6} Z`} fill={c.teal} opacity={0.9} />
      <line x1={40} y1={groundY} x2={208} y2={groundY} stroke={c.teal} strokeWidth={2.4} />
      <text x={cx} y={groundY + 34} textAnchor="middle" fontFamily={monoFamily} fontSize={7.5} fill={c.teal}>
        the settled base
      </text>
    </svg>
  );
}

function Panel({ tag, title, sub, children, real }: { tag: string; title: string; sub: string; children: ReactNode; real: boolean }) {
  return (
    <div
      style={{
        flex: '1 1 240px',
        minWidth: 0,
        border: `1px solid ${real ? c.tealEdge : c.line}`,
        borderRadius: 11,
        background: real ? c.tealFog : c.panel2,
        padding: '13px 13px 15px',
      }}
    >
      <div style={{ ...mono, fontSize: 10.5, color: real ? c.teal : SLATE, marginBottom: 3, letterSpacing: '.03em' }}>{tag}</div>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: c.text, marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: c.muted, lineHeight: 1.5, marginBottom: 8 }}>{sub}</div>
      {children}
    </div>
  );
}

/**
 * fig_18.1b: calm as a foundation, not a withdrawal. The counterfeit uses calm to
 * seal the world out: a bunker with you safe and unreachable inside, the hard
 * conversation and the grief and the work all kept on the far side of the wall.
 * The real thing uses the same settled center as a base to stand on and step out
 * from. It does not keep your life at a distance. It is the ground that lets you
 * go meet it.
 */
export function FoundationFigure() {
  return (
    <Figure
      caption="fig_18.1b · calm_as_foundation"
      sub="the counterfeit uses a settled state to wall the world out. the real one uses it as a base to step out from. same quiet center, opposite direction."
      max={600}
    >
      <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
        <Panel tag="the_counterfeit" title="Calm as a bunker" sub="A place to hide. Nothing gets in, and you do not come out." real={false}>
          <Bunker />
        </Panel>
        <Panel tag="the_real_thing" title="Calm as a base" sub="A place to stand. The ground you push off from to meet your life." real={true}>
          <Base />
        </Panel>
      </div>
    </Figure>
  );
}
