import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_13.1, attention restoration. Two panels of the same resource, a reservoir of
 * voluntary directed attention. In the city/screen panel it drains: hard, top-down
 * focus and constant interruption spend it faster than it refills, and what is left
 * runs low (directed-attention fatigue). In the nature panel it refills: soft
 * fascination (clouds, water, leaves) holds attention effortlessly from the bottom
 * up, so the directed faculty stands down and replenishes. This encodes the
 * mechanism of Attention Restoration Theory (Kaplan), not a mood: the claim is about
 * a depletable cognitive resource, and why a particular kind of attention restores it.
 */

const NATURE = c.emerald;
const DRAIN = c.coral;

interface PanelSpec {
  key: 'spend' | 'restore';
  title: string;
  sub: string;
  level: number; // 0..1 reservoir fill
  color: string;
  caption: string;
}

const PANELS: PanelSpec[] = [
  {
    key: 'spend',
    title: 'effortful focus',
    sub: 'screens · tasks · interruption',
    level: 0.22,
    color: DRAIN,
    caption: 'effortful focus and constant interruption spend directed attention. the reservoir drains.',
  },
  {
    key: 'restore',
    title: 'soft fascination',
    sub: 'clouds · water · leaves · sky',
    level: 0.88,
    color: NATURE,
    caption: 'effortless attention from the bottom up. the directed faculty rests and refills.',
  },
];

const PW = 196;
const GAP = 18;
const TANK = { w: 70, h: 96, x0: 0, y: 26 };

export function AttentionRestorationFigure() {
  const totalW = PANELS.length * PW + (PANELS.length - 1) * GAP;
  return (
    <Figure
      caption="fig_13.1 · attention_restoration"
      sub="Directed attention is a resource you spend, not a mood. Effortful focus and interruption drain it (the city panel). Soft fascination, the gentle pull of moving water or branches or a wide sky, holds your attention without effort, so the voluntary faculty stands down and refills (the nature panel). Restoration is the refill, not a good feeling laid on top."
      max={totalW}
    >
      <svg
        viewBox={`0 0 ${totalW} 184`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Two panels comparing a reservoir of directed attention: nearly empty under effortful screen-based focus, nearly full under the soft fascination of nature."
      >
        <defs>
          <marker id="ar-spend" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L5 3 L0 6 Z" fill={DRAIN} />
          </marker>
          <marker id="ar-fill" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L5 3 L0 6 Z" fill={NATURE} />
          </marker>
        </defs>

        {PANELS.map((p, i) => {
          const px = i * (PW + GAP);
          const tankX = px + 26;
          const fillH = TANK.h * p.level;
          const fillY = TANK.y + (TANK.h - fillH);
          return (
            <g key={p.key}>
              {/* panel frame */}
              <rect
                x={px}
                y={0}
                width={PW}
                height={150}
                rx={11}
                fill={`${p.color}0a`}
                stroke={`${p.color}33`}
                strokeWidth={1}
              />

              {/* the reservoir */}
              <rect
                x={tankX}
                y={TANK.y}
                width={TANK.w}
                height={TANK.h}
                rx={8}
                fill={c.bg}
                stroke={`${p.color}88`}
                strokeWidth={1.5}
              />
              <rect x={tankX} y={fillY} width={TANK.w} height={fillH} rx={6} fill={`${p.color}3a`} />
              <rect x={tankX} y={fillY} width={TANK.w} height={Math.min(6, fillH)} fill={`${p.color}`} opacity={0.65} />

              {/* level label */}
              <text
                x={tankX + TANK.w / 2}
                y={TANK.y + TANK.h / 2 + 4}
                textAnchor="middle"
                style={{ ...mono, fontSize: 12, fontWeight: 600, fill: p.color }}
              >
                {Math.round(p.level * 100)}%
              </text>
              <text
                x={tankX + TANK.w / 2}
                y={TANK.y - 9}
                textAnchor="middle"
                style={{ ...mono, fontSize: 9.5, fill: c.faint }}
              >
                directed attention
              </text>

              {/* the cause arrows, on the right of the tank */}
              {p.key === 'spend' ? (
                <>
                  {[34, 58, 82].map((yy, k) => (
                    <line
                      key={k}
                      x1={tankX + TANK.w + 8}
                      y1={yy}
                      x2={tankX + TANK.w + 40}
                      y2={yy}
                      stroke={DRAIN}
                      strokeWidth={1.4}
                      markerEnd="url(#ar-spend)"
                    />
                  ))}
                  <text
                    x={tankX + TANK.w + 24}
                    y={118}
                    textAnchor="middle"
                    style={{ ...mono, fontSize: 9.5, fill: DRAIN }}
                  >
                    spent
                  </text>
                </>
              ) : (
                <>
                  {[34, 58, 82].map((yy, k) => (
                    <line
                      key={k}
                      x1={tankX + TANK.w + 40}
                      y1={yy}
                      x2={tankX + TANK.w + 8}
                      y2={yy}
                      stroke={NATURE}
                      strokeWidth={1.4}
                      markerEnd="url(#ar-fill)"
                    />
                  ))}
                  <text
                    x={tankX + TANK.w + 24}
                    y={118}
                    textAnchor="middle"
                    style={{ ...mono, fontSize: 9.5, fill: NATURE }}
                  >
                    refills
                  </text>
                </>
              )}

              {/* titles */}
              <text x={px + 14} y={134} style={{ ...mono, fontSize: 12.5, fontWeight: 600, fill: p.color }}>
                {p.title}
              </text>
            </g>
          );
        })}
      </svg>

      {/* sub captions + the four conditions, as text for small-screen legibility */}
      <div style={{ display: 'flex', gap: GAP, marginTop: 4 }}>
        {PANELS.map((p) => (
          <div key={p.key} style={{ flex: 1, ...mono, fontSize: 10, color: c.faint, lineHeight: 1.5 }}>
            <span style={{ color: p.color }}>{p.sub}</span>
            <br />
            {p.caption}
          </div>
        ))}
      </div>
      <div
        style={{
          ...mono,
          fontSize: 10,
          color: c.faint,
          marginTop: 12,
          paddingTop: 10,
          borderTop: `1px solid ${c.line}`,
          lineHeight: 1.55,
        }}
      >
        <span style={{ color: c.muted }}>a restorative place, in the theory, has four marks:</span>{' '}
        being away · extent · fascination · compatibility
      </div>
    </Figure>
  );
}
