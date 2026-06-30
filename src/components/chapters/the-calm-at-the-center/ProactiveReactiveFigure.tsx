import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_11.2 · proactive_vs_reactive. Managers and firefighters share one goal,
 * shielding the exile, but they sit at different points on the timeline. The
 * manager works ahead of the trigger to keep pain from surfacing at all. When it
 * fails and the pain breaks through, the firefighter rushes in after the fact to
 * put it out, usually with something fast and blunt. Concept: Schwartz, the two
 * kinds of protector.
 */
export function ProactiveReactiveFigure() {
  return (
    <Figure
      caption="fig_11.2 · proactive_vs_reactive"
      sub="same goal, protecting the exile, but the manager moves first and the firefighter cleans up. anxiety lives in the manager. the late-night binge lives in the firefighter."
      max={460}
    >
      <svg
        viewBox="0 0 480 188"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A timeline. A manager box sits on the left, acting before the trigger. A dashed line marks the trigger in the middle. To the right, where the exile's pain surfaces, a firefighter box acts after the fact. Both point toward the same exile."
      >
        <defs>
          <marker id="pr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>

        <line x1={40} y1={128} x2={430} y2={128} stroke={c.faint} strokeWidth={1.4} markerEnd="url(#pr-arrow)" />
        <text x={438} y={132} fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          t
        </text>

        <line x1={196} y1={72} x2={196} y2={138} stroke={c.line2} strokeWidth={1} strokeDasharray="3 4" />
        <text x={196} y={156} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11} fill={c.muted}>
          trigger
        </text>

        <line x1={312} y1={72} x2={312} y2={138} stroke={c.violetEdge} strokeWidth={1} strokeDasharray="3 4" />
        <circle cx={312} cy={128} r={4.5} fill={c.violet} />
        <text x={312} y={156} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11} fill={c.violet}>
          pain surfaces
        </text>

        <rect x={40} y={70} width={156} height={38} rx={8} fill={c.amberFog} stroke={c.amberEdge} strokeWidth={1} />
        <text x={118} y={86} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fontWeight={500} fill={c.amber}>
          manager
        </text>
        <text x={118} y={100} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          acts before →
        </text>

        <rect x={312} y={70} width={120} height={38} rx={8} fill={c.coralFog} stroke={c.coralEdge} strokeWidth={1} />
        <text x={372} y={86} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={12.5} fontWeight={500} fill={c.coral}>
          firefighter
        </text>
        <text x={372} y={100} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          ← acts after
        </text>

        <text x={254} y={58} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          the manager misses
        </text>
      </svg>
    </Figure>
  );
}
