import { Fragment } from 'react';
import { c, mono } from '@/styles/tokens';
import { MAP, QUADS, ex, ay } from './calmMap';

const monoFamily = mono.fontFamily;
const MIDX = ex(0.5);
const MIDY = ay(0.5);

/**
 * The shared backdrop for the calm map: quadrant tints, the equanimity target
 * ring, the frame and midlines, the four quadrant labels in their corners, and
 * the two axis labels. Rendered inside an <svg> by both fig_01.1a and
 * widget_01.1 so the figure and the interactive map line up exactly.
 */
export function CalmMapBackdrop() {
  const corners = [
    { q: QUADS.agitation, x: MAP.x0 + 7, y: MAP.y0 + 14, anchor: 'start' as const },
    { q: QUADS.flow, x: MAP.x1 - 7, y: MAP.y0 + 14, anchor: 'end' as const },
    { q: QUADS.sedation, x: MAP.x0 + 7, y: MAP.y1 - 9, anchor: 'start' as const },
    { q: QUADS.equanimity, x: MAP.x1 - 7, y: MAP.y1 - 9, anchor: 'end' as const },
  ];
  return (
    <Fragment>
      {/* quadrant tints */}
      <rect x={MAP.x0} y={MAP.y0} width={MIDX - MAP.x0} height={MIDY - MAP.y0} fill={QUADS.agitation.fog} />
      <rect x={MIDX} y={MAP.y0} width={MAP.x1 - MIDX} height={MIDY - MAP.y0} fill={QUADS.flow.fog} />
      <rect x={MAP.x0} y={MIDY} width={MIDX - MAP.x0} height={MAP.y1 - MIDY} fill={QUADS.sedation.fog} />
      <rect x={MIDX} y={MIDY} width={MAP.x1 - MIDX} height={MAP.y1 - MIDY} fill={QUADS.equanimity.fog} />

      {/* the equanimity corner, marked as the target */}
      <rect x={MIDX} y={MIDY} width={MAP.x1 - MIDX} height={MAP.y1 - MIDY} fill="none" stroke={c.tealEdge} strokeWidth={1.2} />

      {/* plot frame and midlines */}
      <rect x={MAP.x0} y={MAP.y0} width={MAP.x1 - MAP.x0} height={MAP.y1 - MAP.y0} fill="none" stroke={c.line2} strokeWidth={1} />
      <line x1={MIDX} y1={MAP.y0} x2={MIDX} y2={MAP.y1} stroke={c.line} strokeWidth={1} />
      <line x1={MAP.x0} y1={MIDY} x2={MAP.x1} y2={MIDY} stroke={c.line} strokeWidth={1} />

      {/* quadrant labels, in their corners */}
      {corners.map(({ q, x, y, anchor }) => (
        <text key={q.id} x={x} y={y} textAnchor={anchor} fontFamily={monoFamily} fontSize={11.5} fontWeight={600} fill={q.color}>
          {q.label}
        </text>
      ))}

      {/* Y axis: arousal */}
      <text
        x={14}
        y={(MAP.y0 + MAP.y1) / 2}
        textAnchor="middle"
        fontFamily={monoFamily}
        fontSize={10.5}
        fill={c.muted}
        transform={`rotate(-90 14 ${(MAP.y0 + MAP.y1) / 2})`}
      >
        arousal
      </text>
      <text x={31} y={MAP.y0 + 7} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
        high
      </text>
      <text x={31} y={MAP.y1 - 1} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
        low
      </text>

      {/* X axis: engagement */}
      <text x={(MAP.x0 + MAP.x1) / 2} y={MAP.vbH - 7} textAnchor="middle" fontFamily={monoFamily} fontSize={10.5} fill={c.muted}>
        engagement
      </text>
      <text x={MAP.x0} y={MAP.y1 + 13} textAnchor="start" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
        checked out
      </text>
      <text x={MAP.x1} y={MAP.y1 + 13} textAnchor="end" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
        present
      </text>
    </Fragment>
  );
}
