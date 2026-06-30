import { c, mono } from '@/styles/tokens';

interface SectionMarkerProps {
  /** the section label, rendered code-comment style as `// label` */
  children: string;
  /** optional anchor id so the section can be linked to */
  id?: string;
}

/**
 * A code-comment style section divider. A hairline rule, then `// the label` in
 * mono. One of the book's recurring motifs. Rendered as an h2 so it still gives
 * screen readers a real section heading; the `//` glyph is decorative.
 */
export function SectionMarker({ children, id }: SectionMarkerProps) {
  return (
    <div style={{ margin: '44px 0 22px' }}>
      <div style={{ height: 1, background: c.line, marginBottom: 14 }} />
      <h2
        id={id}
        style={{
          ...mono,
          fontSize: 12.5,
          fontWeight: 400,
          color: c.faint,
          letterSpacing: '.03em',
          margin: 0,
        }}
      >
        <span aria-hidden="true" style={{ color: c.tealDim }}>
          {'// '}
        </span>
        {children}
      </h2>
    </div>
  );
}
