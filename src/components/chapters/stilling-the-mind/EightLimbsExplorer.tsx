import { ChevronDown } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { LIMBS, GROUPS } from './limbs';

/**
 * widget_09.2, the eight-limbs explorer. The staircase figure shows the shape; this
 * lets the reader open each limb and read what it holds, including the five yamas and
 * five niyamas that the figure leaves folded up. An accordion: one open at a time,
 * keyboard operable, the last-opened remembered.
 */
export function EightLimbsExplorer() {
  const [open, setOpen] = useLocalStorage<number>('centering:widget:stilling-the-mind:limb', 1);

  return (
    <WidgetShell
      id="09.1"
      name="eight_limbs"
      title="The eight limbs, up close"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          tap to open · {LIMBS.length} limbs
        </span>
      }
    >
      <div style={{ padding: '12px 14px 16px' }}>
        {LIMBS.map((limb) => {
          const isOpen = open === limb.n;
          const group = GROUPS[limb.group];
          return (
            <div
              key={limb.n}
              style={{
                border: `1px solid ${isOpen ? `${limb.color}77` : c.line}`,
                borderRadius: 11,
                background: isOpen ? limb.fill : c.panel,
                marginBottom: 9,
                overflow: 'hidden',
                transition: 'border-color .14s ease, background .14s ease',
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`limb-panel-${limb.n}`}
                onClick={() => setOpen(isOpen ? -1 : limb.n)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 11,
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  padding: '12px 13px',
                  color: c.text,
                }}
              >
                <span
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: limb.color,
                    border: `1px solid ${limb.color}66`,
                    borderRadius: 6,
                    width: 22,
                    height: 22,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {limb.n}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ ...mono, fontSize: 13.5, fontWeight: 600, color: limb.color }}>
                    {limb.sanskrit}
                  </span>
                  <span style={{ fontSize: 13, color: c.muted }}> · {limb.name}</span>
                  <span style={{ display: 'block', fontSize: 12, color: c.faint, marginTop: 1 }}>
                    {limb.gloss}
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
                <div
                  id={`limb-panel-${limb.n}`}
                  style={{ padding: '0 13px 14px 46px' }}
                >
                  <div style={{ ...mono, fontSize: 10, color: c.faint, marginBottom: 8 }}>
                    {limb.sutra} · {group.label}
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.62, color: c.prose, margin: 0 }}>
                    {limb.detail}
                  </p>

                  {limb.sub && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 12 }}>
                      {limb.sub.map((s) => (
                        <span
                          key={s.sanskrit}
                          title={s.gloss}
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
                          <span style={{ color: limb.color }}>{s.sanskrit}</span> · {s.gloss}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}
