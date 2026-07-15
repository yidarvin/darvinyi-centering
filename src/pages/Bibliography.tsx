import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { c, mono, space } from '@/styles/tokens';
import { CHAPTERS } from '@/content/chapters';
import { getServerChapterModule } from '@/content/loadChapter';
import { buildBibliography, type BibliographyEntry } from '@/lib/bibliography';
import { useDocumentHead } from '@/lib/useDocumentHead';

function serverEntries(): BibliographyEntry[] | null {
  if (!import.meta.env.SSR) return null;
  return buildBibliography(
    CHAPTERS.map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
      sources: getServerChapterModule(chapter.slug)?.sources ?? [],
    })),
  );
}

export function Bibliography() {
  const [entries, setEntries] = useState<BibliographyEntry[] | null>(() => serverEntries());

  useDocumentHead({
    title: 'Sources',
    description: "Every chapter's sources combined into one deduplicated, backlinked bibliography.",
    path: '/sources',
  });

  useEffect(() => {
    if (entries) return;
    let active = true;
    fetch('/bibliography.json')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load bibliography');
        return response.json() as Promise<BibliographyEntry[]>;
      })
      .then((data) => {
        if (active) setEntries(data);
      })
      .catch(() => {
        if (active) setEntries([]);
      });
    return () => {
      active = false;
    };
  }, [entries]);

  return (
    <main id="main" style={{ maxWidth: space.reading, margin: '0 auto', padding: '44px 22px 72px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 600, color: c.text, margin: '0 0 10px' }}>Sources</h1>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: c.muted, margin: '0 0 30px' }}>
        {entries ? `${entries.length} sources` : 'Loading sources…'}, deduplicated and linked back to each chapter that draws on them.
      </p>

      {!entries && <p style={{ ...mono, fontSize: 12.5, color: c.faint }}>loading sources…</p>}

      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {entries?.map((entry) => (
          <li id={entry.id} key={entry.id} style={{ borderBottom: `1px solid ${c.line}`, paddingBottom: 12, scrollMarginTop: 84 }}>
            <p style={{ margin: '0 0 6px', fontSize: 13.5, lineHeight: 1.6, color: c.prose }}>
              {entry.url ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${entry.text} (opens in a new tab)`}
                  style={{ color: c.muted, textDecoration: 'none', borderBottom: `1px solid ${c.line2}` }}
                >
                  {entry.text}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ) : (
                entry.text
              )}
            </p>
            <div style={{ ...mono, fontSize: 11, color: c.faint, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              cited in:
              {entry.chapters.map((chapter) => (
                <Link key={chapter.slug} to={`/${chapter.slug}`} style={{ color: c.teal, textDecoration: 'none' }}>
                  {chapter.title}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
