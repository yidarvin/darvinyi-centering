import { c, mono } from '@/styles/tokens';
import { slugify } from '@/lib/slugify';

interface SectionMarkerProps {
  /** the section label, rendered code-comment style as `// label` */
  children: string;
  /** optional anchor id override; auto-derived from the label if omitted */
  id?: string;
}

/**
 * A code-comment style section divider. A hairline rule, then `// the label` in
 * mono. One of the book's recurring motifs. Rendered as an h2 so it still gives
 * screen readers a real section heading; the `//` glyph is decorative. The
 * heading's id is auto-derived from the label (stable within a chapter, since
 * no chapter repeats a section title), which is what the per-chapter table of
 * contents and any deep link into a section jump to.
 */
export function SectionMarker({ children, id }: SectionMarkerProps) {
  return (
    <div style={{ margin: '44px 0 22px' }}>
      <div style={{ height: 1, background: c.line, marginBottom: 14 }} />
      <h2
        id={id ?? slugify(children)}
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
