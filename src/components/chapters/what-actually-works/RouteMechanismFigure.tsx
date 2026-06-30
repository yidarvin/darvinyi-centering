import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';
import { ROUTE_MECHANISMS, getRoute, getGrade, type RouteGrade } from './evidence';

/**
 * fig_15.2, the route-to-mechanism table. Each of the seven routes, the mechanism
 * it is proposed to work through, and the honest strength of the best evidence on
 * it. The body and presence and perspective have real mechanisms and real, modest
 * trials. Connection and meaning have powerful associations and almost no trials.
 * The "enough" route is split on purpose: the science of wanting less is strong,
 * the practices for cultivating it are weak. Each row carries a grade badge so
 * the reader can see at a glance where the floor is solid and where it is theory.
 */

function gradeColor(g: RouteGrade): string {
  return g === 'mixed' ? c.faint : getGrade(g).color;
}

function gradeBadge(g: RouteGrade) {
  const color = gradeColor(g);
  const text = g === 'mixed' ? 'A to D' : g;
  return (
    <span
      style={{
        ...mono,
        fontSize: 11.5,
        fontWeight: 700,
        color,
        border: `1px solid ${color}66`,
        background: `${color}14`,
        borderRadius: 6,
        padding: '2px 8px',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}

export function RouteMechanismFigure() {
  return (
    <Figure
      caption="fig_15.2 · route_to_mechanism: what each route is proposed to do, and how well we know it"
      sub="A mechanism is a story about why a thing works. A grade is how much the story has been tested. The body, presence, and perspective have both. Connection and meaning have the strongest associations in the book and the thinnest trials."
      max={560}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {ROUTE_MECHANISMS.map((row) => {
          const route = getRoute(row.route);
          return (
            <div
              key={row.route}
              style={{
                border: `1px solid ${c.line}`,
                borderLeft: `3px solid ${route.color}`,
                background: c.panel2,
                borderRadius: 9,
                padding: '11px 13px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap', marginBottom: 5 }}>
                <span style={{ ...mono, fontSize: 13, fontWeight: 600, color: route.color }}>{route.label}</span>
                <span style={{ ...mono, fontSize: 11, color: c.muted }}>{row.mechanism}</span>
                <span style={{ marginLeft: 'auto' }}>{gradeBadge(row.grade)}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: c.prose, marginBottom: 5 }}>{row.how}</div>
              <div style={{ ...mono, fontSize: 11, lineHeight: 1.5, color: c.faint }}>{row.note}</div>
            </div>
          );
        })}
      </div>
    </Figure>
  );
}
