import { c, mono } from '@/styles/tokens';

export interface Source {
  /** the reference text, for example "Epictetus, Enchiridion (public-domain translation)" */
  text: string;
  /** an optional link to the source */
  url?: string;
}

interface SourcesProps {
  items: Source[];
}

/**
 * A chapter's Sources list: a short, honest record of what the chapter drew on.
 * Rendered in the house style, parallel to the Reflection block. A chapter supplies
 * its references by exporting `sources` from its MDX; the layout renders this.
 */
export function Sources({ items }: SourcesProps) {
  if (!items || items.length === 0) return null;
  return (
    <section style={{ marginBottom: 44 }}>
      <div style={{ height: 1, background: c.line, marginBottom: 14 }} />
      <h2
        style={{
          ...mono,
          fontSize: 12.5,
          fontWeight: 400,
          color: c.faint,
          letterSpacing: '.03em',
          margin: '0 0 14px',
        }}
      >
        <span aria-hidden="true" style={{ color: c.tealDim }}>
          {'// '}
        </span>
        sources
      </h2>
      <ol
        style={{
          margin: 0,
          paddingLeft: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {items.map((s, i) => (
          <li key={i} style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted }}>
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                style={{ color: c.muted, textDecoration: 'none', borderBottom: `1px solid ${c.line2}` }}
              >
                {s.text}
              </a>
            ) : (
              s.text
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
