import { type CSSProperties, type ReactNode } from 'react';
import { Check, CornerDownRight, RotateCcw, ArrowRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { getRoute } from '@/content/routes';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { DOMAINS, ALL_ITEMS, getItem, domainOf, type Domain } from './audit';

/**
 * widget_17.1, the calm-environment audit. The reader marks which common defaults
 * are true of their own space, time, and attention, and each one they mark reveals
 * its targeted subtraction, the single small change that flips the default. A live
 * readout counts the disturbers and lights the routes the fixes lean on. Then the
 * move the whole chapter argues for: not a renovation, one default. The reader
 * picks a single change to make this week and writes where it lives. Everything
 * persists, so the audit is there to return to.
 */

const NS = 'centering:widget:designing-for-calm';

export function CalmEnvironmentAudit() {
  const [flagged, setFlagged] = useLocalStorage<Record<string, boolean>>(`${NS}:flagged`, {});
  const [pick, setPick] = useLocalStorage<string>(`${NS}:pick`, '');
  const [change, setChange] = useLocalStorage<string>(`${NS}:change`, '');

  const flaggedItems = ALL_ITEMS.filter((i) => flagged[i.id]);
  const total = flaggedItems.length;
  const litRoutes = Array.from(new Set(flaggedItems.map((i) => i.route)));
  const countIn = (d: Domain) => d.items.filter((i) => flagged[i.id]).length;

  const toggle = (id: string) => {
    const turningOff = !!flagged[id];
    setFlagged((f) => ({ ...f, [id]: !f[id] }));
    if (turningOff && pick === id) setPick('');
  };

  const reset = () => {
    setFlagged({});
    setPick('');
    setChange('');
  };

  const started = total > 0 || change.trim().length > 0;

  return (
    <WidgetShell
      id="17.1"
      name="calm_environment_audit"
      title="Audit your space, time, and attention"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: total > 0 ? c.amber : c.faint, whiteSpace: 'nowrap' }}>
          {total} default{total === 1 ? '' : 's'} to flip
        </span>
      }
      footer={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <CornerDownRight size={14} color={c.faint} style={{ flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: 11.5, color: c.faint, flex: 1, minWidth: 170, lineHeight: 1.5 }}>
            a mirror, not a score. it saves as you go.
          </span>
          {started && (
            <button type="button" onClick={reset} style={footBtn}>
              <RotateCcw size={12} /> clear
            </button>
          )}
        </div>
      }
    >
      <div style={{ padding: '14px 16px 4px' }}>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 6px' }}>
          Go through the three domains and mark what is true of your own life. Do not try to fix anything yet.
          Each one you mark opens its targeted subtraction, the one small change that flips the default. The aim
          is to see clearly, then choose a single change at the end.
        </p>
      </div>

      {/* ── the three domains ─────────────────────────────────── */}
      {DOMAINS.map((d) => {
        const n = countIn(d);
        return (
          <div key={d.id} style={{ padding: '13px 16px', borderTop: `1px solid ${c.line}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, gap: 10 }}>
              <div style={{ ...mono, fontSize: 12, fontWeight: 600, color: d.color, letterSpacing: '.03em' }}>
                {'// '}
                {d.label}
              </div>
              <div style={{ ...mono, fontSize: 10.5, color: n > 0 ? d.color : c.faint }}>
                {n > 0 ? `${n} flagged` : d.gloss}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {d.items.map((item) => {
                const on = !!flagged[item.id];
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(item.id)}
                      style={{
                        display: 'flex',
                        width: '100%',
                        textAlign: 'left',
                        alignItems: 'flex-start',
                        gap: 11,
                        cursor: 'pointer',
                        border: `1px solid ${on ? `${d.color}77` : c.line}`,
                        borderRadius: 10,
                        background: on ? `${d.color}10` : c.panel,
                        padding: '10px 12px',
                        transition: 'border-color .14s ease, background .14s ease',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 18,
                          height: 18,
                          flexShrink: 0,
                          marginTop: 1,
                          borderRadius: 5,
                          border: `1px solid ${on ? d.color : c.line2}`,
                          background: on ? `${d.color}26` : 'transparent',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {on && <Check size={13} color={d.color} strokeWidth={3} />}
                      </span>
                      <span style={{ flex: 1, minWidth: 0, fontSize: 13.5, lineHeight: 1.5, color: on ? c.text : c.prose }}>
                        {item.statement}
                      </span>
                    </button>

                    {on && (
                      <div
                        style={{
                          margin: '6px 0 2px',
                          borderLeft: `3px solid ${d.color}`,
                          background: c.panel,
                          border: `1px solid ${c.line}`,
                          borderLeftWidth: 3,
                          borderLeftColor: d.color,
                          borderRadius: 8,
                          padding: '9px 12px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginBottom: 4 }}>
                          <ArrowRight size={13} color={d.color} style={{ flexShrink: 0, transform: 'translateY(2px)' }} />
                          <span style={{ ...mono, fontSize: 10, color: c.faint, letterSpacing: '.03em' }}>
                            the subtraction
                          </span>
                          <RouteTag route={item.route} />
                        </div>
                        <p style={{ fontSize: 13, lineHeight: 1.58, color: c.muted, margin: 0 }}>{item.fix}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ── live summary ──────────────────────────────────────── */}
      <div style={{ padding: '6px 16px 14px', borderTop: `1px solid ${c.line}` }}>
        <div
          style={{
            border: `1px solid ${total > 0 ? c.line2 : c.line}`,
            borderRadius: 11,
            background: c.panel,
            padding: '12px 14px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ ...mono, fontSize: 11, color: c.faint, letterSpacing: '.03em' }}>{'// '}what the audit found</span>
            <span style={{ ...mono, fontSize: 11.5, color: total > 0 ? c.text : c.faint }}>
              {total} of {ALL_ITEMS.length} flagged
            </span>
          </div>

          {total === 0 ? (
            <p style={{ ...mono, fontSize: 11.5, color: c.faint, margin: '9px 0 0', lineHeight: 1.5 }}>
              mark what is true above, and the count and the routes fill in here.
            </p>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 10 }}>
                {DOMAINS.map((d) => {
                  const n = countIn(d);
                  return (
                    <span
                      key={d.id}
                      style={{
                        ...mono,
                        fontSize: 10.5,
                        color: n > 0 ? d.color : c.faint,
                        border: `1px solid ${n > 0 ? `${d.color}55` : c.line2}`,
                        background: n > 0 ? `${d.color}12` : 'transparent',
                        borderRadius: 6,
                        padding: '2px 8px',
                      }}
                    >
                      {d.label.replace('your ', '')} · {n}
                    </span>
                  );
                })}
              </div>
              {litRoutes.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10, alignItems: 'center' }}>
                  <span style={{ ...mono, fontSize: 10, color: c.faint }}>fixes lean on:</span>
                  {litRoutes.map((id) => (
                    <RouteTag key={id} route={id} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── design one default ────────────────────────────────── */}
      <div style={{ padding: '16px 16px 20px', borderTop: `1px solid ${c.line}`, background: c.tealFog }}>
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 4 }}>
          {'// '}design one default
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 12px' }}>
          Not all of it. One. Pick the single default that would do the most for you, and change that one this
          week. A room redesigned by one flip you keep beats the whole list you admire and abandon.
        </p>

        {total === 0 ? (
          <p style={{ ...mono, fontSize: 12, color: c.faint, margin: 0 }}>
            flag a few defaults above, then choose one to change here.
          </p>
        ) : (
          <>
            <div style={{ ...mono, fontSize: 11, color: c.faint, marginBottom: 8 }}>the one I will change</div>
            <div role="group" aria-label="the one default to change" style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
              {flaggedItems.map((item) => {
                const on = pick === item.id;
                const dom = domainOf(item.id);
                const color = dom ? dom.color : c.teal;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPick(on ? '' : item.id)}
                    style={{
                      ...mono,
                      cursor: 'pointer',
                      fontSize: 11.5,
                      padding: '7px 11px',
                      borderRadius: 8,
                      border: `1px solid ${on ? c.tealEdge : c.line2}`,
                      background: on ? c.tealFog : 'transparent',
                      color: on ? c.teal : c.muted,
                      transition: 'all .14s ease',
                    }}
                  >
                    {on && <Check size={11} strokeWidth={3} style={{ verticalAlign: '-1px', marginRight: 5 }} />}
                    <span aria-hidden="true" style={{ color: on ? c.teal : color }}>
                      {'· '}
                    </span>
                    {item.short}
                  </button>
                );
              })}
            </div>

            {pick && (
              <div style={{ ...mono, fontSize: 11, color: c.tealDim, marginBottom: 8, lineHeight: 1.5 }}>
                {getItem(pick)?.fix}
              </div>
            )}

            <label htmlFor="dfc-change" style={{ ...mono, fontSize: 11.5, color: c.tealDim, display: 'block', marginBottom: 7 }}>
              the change I will make, and where in my day or space it lives
            </label>
            <textarea
              id="dfc-change"
              rows={2}
              value={change}
              onChange={(e) => setChange(e.target.value)}
              placeholder="tonight, one warm lamp instead of the overhead… · phone charges in the kitchen, not the bedroom…"
              style={{
                ...mono,
                width: '100%',
                boxSizing: 'border-box',
                resize: 'vertical',
                background: c.panel2,
                color: c.text,
                border: `1px solid ${c.line}`,
                borderRadius: 8,
                padding: '11px 12px',
                fontSize: 13,
                lineHeight: 1.6,
              }}
            />
          </>
        )}
      </div>
    </WidgetShell>
  );
}

/* ── small parts ───────────────────────────────────────────── */

function RouteTag({ route }: { route: Parameters<typeof getRoute>[0] }): ReactNode {
  const r = getRoute(route);
  return (
    <span
      style={{
        ...mono,
        fontSize: 10,
        color: r.color,
        border: `1px solid ${r.color}55`,
        background: `${r.color}12`,
        borderRadius: 6,
        padding: '2px 7px',
      }}
    >
      {r.label}
    </span>
  );
}

const footBtn: CSSProperties = {
  ...mono,
  fontSize: 12,
  cursor: 'pointer',
  padding: '8px 12px',
  borderRadius: 8,
  border: `1px solid ${c.line2}`,
  background: 'transparent',
  color: c.muted,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
};
