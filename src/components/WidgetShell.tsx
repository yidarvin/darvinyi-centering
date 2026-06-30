import type { ReactNode } from 'react';
import { c, mono } from '@/styles/tokens';

interface WidgetShellProps {
  /** the widget number, for example "00.1" */
  id: string;
  /** the short mono name, for example "where_to_start" */
  name: string;
  /** an optional human title line under the mono header */
  title?: string;
  /** an optional legend or counter, shown at the right of the header */
  legend?: ReactNode;
  children: ReactNode;
  /** an optional footer row (buttons, status) */
  footer?: ReactNode;
}

/**
 * The consistent frame for a chapter's signature widget: a bordered panel with a
 * mono header (`widget_NN · name`), an optional title and legend, a body, and an
 * optional footer. Reduced motion is handled globally in global.css.
 */
export function WidgetShell({ id, name, title, legend, children, footer }: WidgetShellProps) {
  return (
    <section
      style={{
        border: `1px solid ${c.line2}`,
        borderRadius: 14,
        background: c.panel2,
        overflow: 'hidden',
        marginBottom: 40,
      }}
    >
      <header
        style={{
          padding: '15px 18px 13px',
          borderBottom: `1px solid ${c.line}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: title ? 'baseline' : 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              ...mono,
              fontSize: 11.5,
              color: c.tealDim,
              letterSpacing: '.04em',
              marginBottom: title ? 4 : 0,
            }}
          >
            widget_{id} · {name}
          </div>
          {title && <div style={{ fontSize: 14.5, fontWeight: 500, color: c.text }}>{title}</div>}
        </div>
        {legend && <div>{legend}</div>}
      </header>

      <div>{children}</div>

      {footer && (
        <div
          style={{
            padding: '12px 16px 16px',
            borderTop: `1px solid ${c.line}`,
          }}
        >
          {footer}
        </div>
      )}
    </section>
  );
}
