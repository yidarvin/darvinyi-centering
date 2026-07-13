import { Link } from 'react-router-dom';
import { c, mono, space } from '@/styles/tokens';
import { GLOSSARY } from '@/content/glossary';
import { slugify } from '@/lib/slugify';

export function Glossary() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <main id="main" style={{ maxWidth: space.reading, margin: '0 auto', padding: '44px 22px 72px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 600, color: c.text, margin: '0 0 10px' }}>Glossary</h1>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: c.muted, margin: '0 0 30px' }}>
        {sorted.length} terms the book uses on their own footing, each linking back to where it is actually
        explained.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {sorted.map((entry) => {
          const slug = slugify(entry.term);
          const contextHref = `/${entry.homeSlug}${entry.anchor ? `#${entry.anchor}` : ''}`;
          return (
            <article key={slug} style={{ borderBottom: `1px solid ${c.line}`, paddingBottom: 18 }}>
              <h3
                id={slug}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 10,
                  flexWrap: 'wrap',
                  margin: '0 0 6px',
                  fontSize: 17,
                  fontWeight: 600,
                  color: c.text,
                }}
              >
                <span style={{ fontStyle: 'italic' }}>{entry.term}</span>
                <span style={{ ...mono, fontSize: 10.5, fontWeight: 400, color: c.tealDim, letterSpacing: '.03em' }}>
                  {entry.tradition}
                </span>
              </h3>
              <p style={{ margin: '0 0 8px', fontSize: 14, lineHeight: 1.6, color: c.prose }}>{entry.oneLineDef}</p>
              <div style={{ ...mono, fontSize: 11.5, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {entry.aliases && entry.aliases.length > 0 && (
                  <span style={{ color: c.faint }}>also: {entry.aliases.join(', ')}</span>
                )}
                <Link to={contextHref} style={{ color: c.teal, textDecoration: 'none' }}>
                  read in context →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
