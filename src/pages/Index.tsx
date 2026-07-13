import { Link } from 'react-router-dom';
import { c, mono, space } from '@/styles/tokens';
import { GLOSSARY } from '@/content/glossary';
import { NAMED_ENTRIES } from '@/content/namedEntries';
import { slugify } from '@/lib/slugify';
import { useDocumentHead } from '@/lib/useDocumentHead';

interface Row {
  label: string;
  oneLineDef: string;
  href: string;
}

export function Index() {
  useDocumentHead({
    title: 'A-Z Index',
    description: 'Every name and term the book uses, from the glossary and the people and mechanisms it cites, alphabetized.',
    path: '/index',
  });

  const rows: Row[] = [
    ...GLOSSARY.map((entry) => ({
      label: entry.term,
      oneLineDef: entry.oneLineDef,
      href: `/glossary#${slugify(entry.term)}`,
    })),
    ...NAMED_ENTRIES.map((entry) => ({
      label: entry.name,
      oneLineDef: entry.oneLineDef,
      href: `/${entry.homeSlug}${entry.anchor ? `#${entry.anchor}` : ''}`,
    })),
  ].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <main id="main" style={{ maxWidth: space.reading, margin: '0 auto', padding: '44px 22px 72px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 600, color: c.text, margin: '0 0 10px' }}>A-Z Index</h1>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: c.muted, margin: '0 0 30px' }}>
        {rows.length} names and terms, from the{' '}
        <Link to="/glossary" style={{ color: c.teal, textDecoration: 'none' }}>
          glossary
        </Link>{' '}
        and the people and mechanisms the book names along the way.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((row) => (
          <div key={row.label} style={{ borderBottom: `1px solid ${c.line}`, paddingBottom: 10 }}>
            <Link
              to={row.href}
              style={{ display: 'block', textDecoration: 'none', color: c.text, marginBottom: 3 }}
            >
              <span style={{ fontSize: 15, fontWeight: 600 }}>{row.label}</span>
            </Link>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: c.muted }}>{row.oneLineDef}</p>
          </div>
        ))}
      </div>

      <p style={{ ...mono, fontSize: 11.5, color: c.faint, marginTop: 26 }}>
        Looking for the sources themselves?{' '}
        <Link to="/sources" style={{ color: c.teal, textDecoration: 'none' }}>
          Browse the bibliography →
        </Link>
      </p>
    </main>
  );
}
