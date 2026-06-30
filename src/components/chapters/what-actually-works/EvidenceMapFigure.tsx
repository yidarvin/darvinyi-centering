import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';
import { practicesByGrade, getRoute } from './evidence';

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
                        width: 8,
                        height: 8,
                        borderRadius: 99,
                        background: route.color,
                        flexShrink: 0,
                      }}
                    />
                    {p.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* the dot legend maps to the seven routes */}
      <div
        style={{
          ...mono,
          fontSize: 10.5,
          color: c.faint,
          marginTop: 14,
          lineHeight: 1.6,
        }}
      >
        the dot marks the route each practice works through. grade is strength of evidence, not size of effect: a
        certain, tiny finding can outrank a dramatic, untested one.
      </div>
    </Figure>
  );
}
