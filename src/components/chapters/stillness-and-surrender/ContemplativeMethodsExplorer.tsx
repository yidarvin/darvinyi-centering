import { ChevronDown } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { METHODS } from './methods';

/**
 * widget_12.1, the contemplative-methods explorer. The signature widget: tap a
 * tradition and open its core practice, what it quiets, its form of surrender, its key
 * terms on its own terms, and the calm it names. Each one carries an honest two-part
 * flag, what a secular reader can borrow and where the practice stays devotional, so the
 * survey never quietly flattens four faiths into one technique. An accordion: one open
 * at a time, keyboard operable, the last-opened remembered.
 */
export function ContemplativeMethodsExplorer() {
  const [open, setOpen] = useLocalStorage<string>(
    'centering:widget:stillness-and-surrender:method',
    'hesychasm',
  );

  return (
    <WidgetShell
      id="12.1"
      name="four_doors"
      title="The methods, up close"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          tap to open · {METHODS.length} methods
        </span>
      }
    >
      <div style={{ padding: '12px 14px 16px' }}>
        {METHODS.map((m) => {
          const isOpen = open === m.id;
          return (
            <div
              key={m.id}
              style={{
                border: `1px solid ${isOpen ? `${m.color}77` : c.line}`,
                borderRadius: 11,
                background: isOpen ? `${m.color}10` : c.panel,
                marginBottom: 9,
                overflow: 'hidden',
                transition: 'border-color .14s ease, background .14s ease',
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`method-panel-${m.id}`}
                onClick={() => setOpen(isOpen ? '' : m.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  padding: '12px 13px',
                  color: c.text,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: `${m.color}33`,
                    border: `1px solid ${m.color}`,
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ ...mono, fontSize: 10, color: c.faint, display: 'block', marginBottom: 1 }}>
                    {m.faith}
                  </span>
                  <span style={{ ...mono, fontSize: 13.5, fontWeight: 600, color: m.color }}>
                    {m.method}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  color={c.faint}
                  style={{
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform .16s ease',
                  }}
                />
              </button>

              {isOpen && (
                <div id={`method-panel-${m.id}`} style={{ padding: '0 14px 15px' }}>
                  <Block label="the practice" color={m.color} body={m.anchorLong} />
                  <Block label="what it quiets" color={m.color} body={m.quietsLong} />
                  <Block label="the surrender" color={m.color} body={m.surrenderLong} />

                  {/* the calm it names */}
                  <div
                    style={{
                      ...mono,
                      fontSize: 11.5,
                      color: c.muted,
                      margin: '4px 0 12px',
                      padding: '9px 11px',
                      borderRadius: 8,
                      background: c.panel2,
                      border: `1px solid ${c.line}`,
                    }}
                  >
                    <span style={{ color: m.color, fontWeight: 600 }}>{m.receivedCalm.term}</span>
                    <span style={{ color: c.faint }}> · {m.receivedCalm.gloss}</span>
                  </div>

                  {/* key terms */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
                    {m.terms.map((t) => (
                      <span
                        key={t.term}
                        title={t.gloss}
                        style={{
                          ...mono,
                          fontSize: 10.5,
                          color: c.muted,
                          border: `1px solid ${c.line2}`,
                          background: c.panel,
                          borderRadius: 6,
                          padding: '4px 9px',
                          lineHeight: 1.3,
                        }}
                      >
                        <span style={{ color: m.color }}>{t.term}</span> · {t.gloss}
                      </span>
                    ))}
                  </div>

                  {/* the honest two-part flag */}
                  <Flag
                    tone="secular"
                    title="you can borrow this, without belief"
                    body={m.secularForm}
                  />
                  <Flag
                    tone="devotional"
                    title="and this is where it stays devotional"
                    body={m.devotionalCore}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}

function Block({ label, body, color }: { label: string; body: string; color: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ ...mono, fontSize: 10, color, letterSpacing: '.04em', marginBottom: 4 }}>
        {'// '}
        {label}
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.62, color: c.prose, margin: 0 }}>{body}</p>
    </div>
  );
}

function Flag({ tone, title, body }: { tone: 'secular' | 'devotional'; title: string; body: string }) {
  const col = tone === 'secular' ? c.teal : c.amber;
  const edge = tone === 'secular' ? c.tealEdge : c.amberEdge;
  const fog = tone === 'secular' ? c.tealFog : c.amberFog;
  return (
    <div
      style={{
        border: `1px solid ${edge}`,
        background: fog,
        borderRadius: 9,
        padding: '10px 12px',
        marginBottom: 8,
      }}
    >
      <div style={{ ...mono, fontSize: 10.5, color: col, letterSpacing: '.03em', marginBottom: 4 }}>
        {title}
      </div>
      <p style={{ fontSize: 12.5, lineHeight: 1.55, color: c.muted, margin: 0 }}>{body}</p>
    </div>
  );
}
