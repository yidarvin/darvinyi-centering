import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';
import { practicesByGrade, getRoute } from './evidence';
import { ROUTES, type RouteId } from '@/content/routes';

// short, distinct labels for the route mark on each practice, so it does not
// rely on color alone: the route colors reuse the same hues as the four grade
// bands (connection/emerald, enough/sky, perspective/amber, presence/violet),
// so a dot by itself can read as "which grade," not "which route."
const ROUTE_ABBR: Record<RouteId, string> = {
  'letting-go': 'LG',
  presence: 'PR',
  'the-body': 'BD',
  perspective: 'PV',
  enough: 'EN',
  connection: 'CN',
  meaning: 'MN',
};

/**
 * fig_15.1, the evidence map. Every graded practice, sorted into four bands from
 * well supported down to observational or theory. The shape is the argument. The
 * top band is nearly empty, and what is there is either certain but tiny (the
 * income curve) or large but heavily caveated (CBT). The fat middle is "real but
 * modest." The bottom band is not junk: it holds the deepest routes in the book,
 * connection and meaning, graded D not because they are false but because you can
 * never run the trial. Reads off the same data as the table and the widget.
 */
export function EvidenceMapFigure() {
  const bands = practicesByGrade();

  return (
    <Figure
      caption="fig_15.1 · the_evidence_map: every practice, sorted by how well it is supported"
      sub="The shape is the point. The strongest tier is nearly empty, and what sits there is either certain and tiny or large and heavily hedged. Most of the field is real but modest. The bottom tier is not false, it is unrandomizable: the deepest routes, connection and meaning, are graded by what a trial cannot reach."
      max={560}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {bands.map(({ grade, practices }) => (
          <div
            key={grade.id}
            style={{
              border: `1px solid ${grade.color}33`,
              background: `${grade.color}0a`,
              borderRadius: 10,
              padding: '11px 12px 12px',
            }}
          >
            {/* the grade label */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 9, flexWrap: 'wrap' }}>
              <span
                style={{
                  ...mono,
                  fontSize: 13,
                  fontWeight: 700,
                  color: grade.color,
                  border: `1px solid ${grade.color}66`,
                  borderRadius: 6,
                  padding: '1px 8px',
                  background: `${grade.color}14`,
                }}
              >
                {grade.id}
              </span>
              <span style={{ ...mono, fontSize: 12, color: grade.color }}>{grade.label}</span>
              <span style={{ ...mono, fontSize: 10.5, color: c.faint }}>
                {practices.length === 1 ? '1 practice' : `${practices.length} practices`}
              </span>
            </div>

            {/* one chip per practice, with a route-colored dot */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {practices.map((p) => {
                const route = getRoute(p.route);
                return (
                  <span
                    key={p.id}
                    title={`${p.name} · route: ${route.label}`}
                    style={{
                      ...mono,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      fontSize: 11.5,
                      color: c.text,
                      border: `1px solid ${c.line2}`,
                      background: c.panel2,
                      borderRadius: 7,
                      padding: '5px 9px',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        ...mono,
                        fontSize: 7.5,
                        fontWeight: 700,
                        color: route.color,
                        border: `1px solid ${route.color}66`,
                        background: `${route.color}18`,
                        borderRadius: 4,
                        padding: '1px 3px',
                        flexShrink: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {ROUTE_ABBR[p.route]}
                    </span>
                    {p.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* a visible legend for the route mark, since several route colors reuse
          the same hues as the grade bands above */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${c.line}` }}>
        {ROUTES.map((r) => (
          <span key={r.id} style={{ ...mono, display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, color: c.muted }}>
            <span
              aria-hidden="true"
              style={{
                ...mono,
                fontSize: 7.5,
                fontWeight: 700,
                color: r.color,
                border: `1px solid ${r.color}66`,
                background: `${r.color}18`,
                borderRadius: 4,
                padding: '1px 3px',
              }}
            >
              {ROUTE_ABBR[r.id]}
            </span>
            {r.label}
          </span>
        ))}
      </div>

      <div
        style={{
          ...mono,
          fontSize: 10.5,
          color: c.faint,
          marginTop: 10,
          lineHeight: 1.6,
        }}
      >
        the mark on each practice is the route it works through, from the legend above. grade is strength of
        evidence, not size of effect: a certain, tiny finding can outrank a dramatic, untested one.
      </div>
    </Figure>
  );
}
