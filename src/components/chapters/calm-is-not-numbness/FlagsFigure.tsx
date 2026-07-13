import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';
import { FLAG_TIERS } from './flags';

/**
 * fig_18.1c: green, yellow, and red flags for when a practice is enough and when
 * it is time to bring in help. Read top to bottom as the signs escalate: green is
 * ordinary distress that a practice can meet, yellow is persistent distress worth
 * a conversation with a professional, red is a safety concern that needs help now.
 * These are signposts synthesized from public-health guidance, not a diagnosis,
 * and the sub-line says so.
 */
export function FlagsFigure() {
  return (
    <Figure
      caption="fig_18.1c · flags_for_seeking_help"
      sub="signposts, not a diagnosis. when signs persist, stop shifting, or turn toward safety, move up a tier. when in doubt, ask a professional. red is the one place the rule changes from watch to act."
      max={620}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FLAG_TIERS.map((t) => (
          <div
            key={t.id}
            style={{
              display: 'flex',
              gap: 0,
              border: `1px solid ${t.edge}`,
              borderRadius: 11,
              background: t.fog,
              overflow: 'hidden',
            }}
          >
            {/* the colored rail */}
            <div style={{ width: 6, background: t.color, flexShrink: 0 }} aria-hidden="true" />
            <div style={{ padding: '12px 14px 13px', flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap', marginBottom: 7 }}>
                <span
                  style={{
                    ...mono,
                    fontSize: 10.5,
                    color: t.color,
                    border: `1px solid ${t.edge}`,
                    borderRadius: 6,
                    padding: '2px 8px',
                    letterSpacing: '.04em',
                  }}
                >
                  {t.label}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{t.headline}</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                {t.signposts.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: c.prose,
                      display: 'flex',
                      gap: 8,
                    }}
                  >
                    <span aria-hidden="true" style={{ color: t.color, flexShrink: 0 }}>
                      ·
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}
