import type { ReactNode } from 'react';
import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

const SLATE = '#7c8794';
const SLATE_FOG = 'rgba(124,135,148,0.10)';

/** shared geometry: a 260x196 viewBox, four items across, wide enough at the
 * legible font sizes below that "hard talk" and "others" never touch. */
const VB_W = 260;
const VB_H = 196;
const CX = 130;
const FS = 10.5; // every <text> in this figure uses this one size, on purpose

/** the four things a settled center either shuts out or steps toward.
 * labels are shortened from the prose's "the hard conversation," "other
 * people" etc. so four of them fit across 260px at a legible size; the
 * aria-labels below spell the full phrasing out for anyone not seeing the shapes. */
const ITEMS = [
  { label: 'hard talk', x: 40 },
  { label: 'grief', x: 100 },
  { label: 'the work', x: 160 },
  { label: 'others', x: 220 },
];

const ITEM_LABEL_Y = 18;
const ITEM_CIRCLE_CY = 34;
const ITEM_R = 5;

function Bunker() {
  const wallY = 72;
  const wallH = 114;
  const youCy = 129;
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Calm as a bunker. A settled center is sealed inside a thick wall. The hard conversation, grief, the work, and other people all sit outside and bounce off the wall. Nothing reaches in and nothing steps out."
    >
      {/* the items, outside, kept out */}
      {ITEMS.map((it) => (
        <g key={it.label}>
          <circle cx={it.x} cy={ITEM_CIRCLE_CY} r={ITEM_R} fill="none" stroke={SLATE} strokeWidth={1.3} />
          <text x={it.x} y={ITEM_LABEL_Y} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.faint}>
            {it.label}
          </text>
          {/* bouncing off the wall */}
          <path d={`M${it.x} 41 L${it.x} 59`} stroke={SLATE} strokeWidth={1} strokeDasharray="2 3" opacity={0.7} />
          <path d={`M${it.x - 3} 59 L${it.x} 64 L${it.x + 3} 59`} fill="none" stroke={SLATE} strokeWidth={1} opacity={0.7} />
        </g>
      ))}

      {/* the wall */}
      <rect x={30} y={wallY} width={200} height={wallH} rx={10} fill="none" stroke={SLATE} strokeWidth={2.4} />
      <rect x={30} y={wallY} width={200} height={wallH} rx={10} fill={SLATE_FOG} />

      {/* you, sealed inside */}
      <circle cx={CX} cy={youCy} r={12} fill="none" stroke={SLATE} strokeWidth={1.5} />
      <circle cx={CX} cy={youCy} r={5} fill={SLATE} />
      <text x={CX} y={176} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.muted}>
        sealed in
      </text>
    </svg>
  );
}

function Base() {
  const youCy = 100;
  const hubY = 112; // where the branches leave from, just under the "you" circle
  const groundY = 144;
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Calm as a base. A settled center is the ground you stand on, and from it you reach out toward the hard conversation, grief, the work, and other people. The base does not keep the world away. It is what lets you meet it."
    >
      {/* the items, reached toward */}
      {ITEMS.map((it) => (
        <g key={it.label}>
          {/* branch from you out to the item */}
          <path
            d={`M${CX} ${hubY} Q${(CX + it.x) / 2} 45, ${it.x} 38`}
            fill="none"
            stroke={c.teal}
            strokeWidth={1.4}
          />
          <circle cx={it.x} cy={ITEM_CIRCLE_CY} r={ITEM_R} fill={c.tealFog} stroke={c.teal} strokeWidth={1.3} />
          <text x={it.x} y={ITEM_LABEL_Y} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.teal}>
            {it.label}
          </text>
        </g>
      ))}

      {/* you, standing on the base */}
      <circle cx={CX} cy={youCy} r={9} fill="none" stroke={c.teal} strokeWidth={1.6} />
      <circle cx={CX} cy={youCy} r={4.2} fill={c.teal} />
      <text x={CX} y={128} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.teal}>
        you
      </text>

      {/* the settled base: a broad, low platform */}
      <path
        d={`M40 ${groundY} Q${CX} ${groundY + 16}, 220 ${groundY} L220 ${groundY + 6} Q${CX} ${groundY + 22}, 40 ${groundY + 6} Z`}
        fill={c.teal}
        opacity={0.9}
      />
      <line x1={40} y1={groundY} x2={220} y2={groundY} stroke={c.teal} strokeWidth={2.4} />
      <text x={CX} y={182} textAnchor="middle" fontFamily={monoFamily} fontSize={FS} fill={c.teal}>
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
