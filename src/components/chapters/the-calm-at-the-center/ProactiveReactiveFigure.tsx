import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_11.2 · proactive_vs_reactive. Managers and firefighters share one goal,
 * shielding the exile, but they sit at different points on the timeline. The
 * manager works ahead of the trigger to keep pain from surfacing at all. When it
 * fails and the pain breaks through, the firefighter rushes in after the fact to
 * put it out, usually with something fast and blunt. Concept: Schwartz, the two
 * kinds of protector.
 *
 * Laid out as a vertical timeline (time running top to bottom) rather than the
 * original left-to-right version: at a 360px phone width a horizontal timeline
 * with two side-by-side boxes could not reach a legible text size without
 * overflowing its columns, so the same relationship -- one line, two markers,
 * a box before and a box after -- is redrawn top to bottom instead, which gives
 * every label the vertical room it needs.
 */
export function ProactiveReactiveFigure() {
  return (
    <Figure
      caption="fig_11.2 · proactive_vs_reactive"
      sub="same goal, protecting the exile, but the manager moves first and the firefighter cleans up. anxiety lives in the manager. the late-night binge lives in the firefighter."
      max={340}
    >
      <svg
        viewBox="0 0 300 456"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A vertical timeline read top to bottom. A manager box sits near the top, acting before the trigger. A dashed tick marks the trigger. Below it, a note reads: the manager misses. A second dashed tick, with a dot, marks where the pain surfaces. A firefighter box sits near the bottom, acting after the fact. An arrow at the bottom of the line marks time moving downward."
      >
        <defs>
          <marker id="pr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>

        <line x1={48} y1={24} x2={48} y2={420} stroke={c.faint} strokeWidth={1.4} markerEnd="url(#pr-arrow)" />
        <text x={48} y={438} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
          t
        </text>

        <rect x={65} y={36} width={170} height={82} rx={8} fill={c.amberFog} stroke={c.amberEdge} strokeWidth={1} />
        <text x={150} y={66} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={17} fontWeight={500} fill={c.amber}>
          manager
        </text>
        <text x={150} y={94} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
          acts before
        </text>

        <line x1={44} y1={150} x2={60} y2={150} stroke={c.line2} strokeWidth={1} strokeDasharray="3 4" />
        <text x={68} y={154} fontFamily={mono.fontFamily} fontSize={13} fill={c.muted}>
          trigger
        </text>

        <text x={150} y={228} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
          the manager misses
        </text>

        <line x1={44} y1={300} x2={60} y2={300} stroke={c.violetEdge} strokeWidth={1} strokeDasharray="3 4" />
        <circle cx={48} cy={300} r={4.5} fill={c.violet} />
        <text x={68} y={304} fontFamily={mono.fontFamily} fontSize={13} fill={c.violet}>
          pain surfaces
        </text>

        <rect x={65} y={330} width={170} height={82} rx={8} fill={c.coralFog} stroke={c.coralEdge} strokeWidth={1} />
        <text x={150} y={360} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={17} fontWeight={500} fill={c.coral}>
          firefighter
        </text>
        <text x={150} y={388} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
          acts after
        </text>
      </svg>
    </Figure>
  );
}
