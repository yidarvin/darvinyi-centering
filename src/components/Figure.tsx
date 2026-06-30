import type { ReactNode } from 'react';
import { c, mono } from '@/styles/tokens';

interface FigureProps {
  /** the mono caption, for example "fig_02.1a · the_two_bins" */
  caption: string;
  /** an optional sub-line under the panel */
  sub?: string;
  /** max width of the inner content, so wide figures stay legible on a phone */
  max?: number;
  children: ReactNode;
}

/**
 * A bordered figure panel with a mono caption and an optional sub-line. Children
 * are usually SVG. Responsive: the inner content is capped at `max` and centered,
 * the panel fills the column. Matches the reference prototypes.
 */
export function Figure({ caption, sub, max = 460, children }: FigureProps) {
  return (
    <figure style={{ margin: '0 0 34px' }}>
      <figcaption
        style={{
          ...mono,
          fontSize: 11.5,
          color: c.faint,
          marginBottom: 12,
          letterSpacing: '.04em',
        }}
      >
        {caption}
      </figcaption>
      <div
        style={{
          border: `1px solid ${c.line}`,
          borderRadius: 12,
          background: c.panel,
          padding: '18px 14px',
        }}
      >
        <div style={{ maxWidth: max, margin: '0 auto' }}>{children}</div>
      </div>
      {sub && (
        <div style={{ ...mono, fontSize: 11, color: c.faint, marginTop: 10, lineHeight: 1.55 }}>
          {sub}
        </div>
      )}
    </figure>
  );
}
