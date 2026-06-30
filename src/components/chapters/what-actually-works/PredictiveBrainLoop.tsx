import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';

const monoFamily = mono.fontFamily;

const CX = 240;
const CY = 168;
const RX = 150;
const RY = 92;

function pt(angleDeg: number) {
  const r = (angleDeg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(r), y: CY + RY * Math.sin(r) };
}

/** three nodes, clockwise from the top, each feeding the next; the loop closes */
const NODES = [
  { angle: -90, head: 'predict', sub: 'the brain forecasts the next moment' },
  { angle: 30, head: 'compare', sub: 'measure the forecast against what arrives' },
  { angle: 150, head: 'update', sub: 'revise on the prediction error' },
];

/**
 * fig_15.3, the predictive loop. The quiet unifier of the whole book, drawn as a
 * three-step cycle: the brain predicts the next moment, compares the prediction
 * to what actually arrives, and updates on the gap (the prediction error). In
 * anxiety the threat prediction is set too high and held too confidently, so
 * benign evidence cannot update it. The calm practices are reread as feeding
 * gentler evidence and loosening the confidence, so the loop can settle toward
 * safety. The frame is elegant and increasingly influential, and it is a lens,
 * not a proven clinical mechanism (graded D in this chapter).
 * Concept: Clark 2013; Friston 2010; Seth & Friston 2016.
 */
export function PredictiveBrainLoop() {
  const margin = 30;
  const arrows = NODES.map((n) => {
    const a = n.angle + margin;
    const b = n.angle + 120 - margin;
    const s = pt(a);
    const e = pt(b);
    return { d: `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${RX} ${RY} 0 0 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}` };
  });

  return (
    <Figure
      caption="fig_15.3 · the_predictive_loop: the lens that ties the routes together"
      sub="Predict, compare, update, and around again. Anxiety is the loop stuck on a high threat forecast it will not revise. Calm practices feed it gentler evidence and lower its certainty, so the prediction can settle. An elegant unifier, and still a theory: graded D, a way of seeing, not a tested mechanism."
      max={500}
    >
      <svg
        viewBox="0 0 480 300"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A three-step loop. The brain predicts the next moment. It compares the prediction against what arrives. It updates on the prediction error, the gap between the two. The revised prediction feeds the next forecast, closing the loop. In anxiety the loop is stuck on a high threat prediction held with too much confidence to update; calm practices feed gentler evidence and loosen that confidence so the loop can settle toward safety."
      >
        <defs>
          <marker id="pb-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke={c.teal} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* the connecting arcs */}
        {arrows.map((a, i) => (
          <path key={i} d={a.d} fill="none" stroke={c.tealEdge} strokeWidth={1.6} markerEnd="url(#pb-arrow)" />
        ))}

        {/* the prediction-error label, riding the update arrow */}
        <text x={CX} y={CY + RY + 22} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.amber}>
          prediction error
        </text>

        {/* center label */}
        <text x={CX} y={CY - 4} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.tealDim}>
          the predictive
        </text>
        <text x={CX} y={CY + 12} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.tealDim}>
          loop
        </text>

        {/* nodes */}
        {NODES.map((n, i) => {
          const p = pt(n.angle);
          const w = 168;
          const h = 50;
          const first = i === 0;
          return (
            <g key={i}>
              <rect
                x={p.x - w / 2}
                y={p.y - h / 2}
                width={w}
                height={h}
                rx={9}
                fill={first ? c.tealFog : c.panel2}
                stroke={first ? c.tealEdge : c.line2}
              />
              <text
                x={p.x}
                y={p.y - 6}
                textAnchor="middle"
                fontFamily={monoFamily}
                fontSize={12.5}
                fontWeight={600}
                fill={first ? c.teal : c.text}
              >
                {n.head}
              </text>
              <text x={p.x} y={p.y + 11} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* the two readings of the same loop */}
      <div style={{ display: 'flex', gap: 9, marginTop: 4, flexWrap: 'wrap' }}>
        <div
          style={{
            flex: 1,
            minWidth: 180,
            border: `1px solid ${c.coral}33`,
            background: c.coralFog,
            borderRadius: 9,
            padding: '10px 12px',
          }}
        >
          <div style={{ ...mono, fontSize: 11, color: c.coral, fontWeight: 600, marginBottom: 5 }}>anxiety</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted }}>
            The threat forecast is set too high and held with too much confidence, so safe evidence cannot
            update it. The loop keeps predicting danger.
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 180,
            border: `1px solid ${c.tealEdge}`,
            background: c.tealFog,
            borderRadius: 9,
            padding: '10px 12px',
          }}
        >
          <div style={{ ...mono, fontSize: 11, color: c.teal, fontWeight: 600, marginBottom: 5 }}>calm practices</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted }}>
            Feed the loop gentler evidence and loosen its certainty. The breath, presence, and letting go all
            let the forecast settle toward safety.
          </div>
        </div>
      </div>
    </Figure>
  );
}
