import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { c, mono, space } from '@/styles/tokens';
import { CHAPTERS } from '@/content/chapters';
import { getChapterLoader } from '@/content/loadChapter';

interface BibEntry {
  text: string;
  url?: string;
  chapters: { slug: string; title: string }[];
}

export function Bibliography() {
  const [entries, setEntries] = useState<BibEntry[] | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all(
      CHAPTERS.map(async (chapter) => {
        const loader = getChapterLoader(chapter.slug);
        if (!loader) return { chapter, sources: [] };
        try {
          const mod = await loader();
          return { chapter, sources: mod.sources ?? [] };
        } catch {
          return { chapter, sources: [] };
        }
      }),
    ).then((results) => {
      if (!active) return;
      const byKey = new Map<string, BibEntry>();
      for (const { chapter, sources } of results) {
        for (const source of sources) {
          const key = (source.url ?? source.text).trim();
          const existing = byKey.get(key);
          if (existing) {
            if (!existing.chapters.some((c) => c.slug === chapter.slug)) {
              existing.chapters.push({ slug: chapter.slug, title: chapter.title });
            }
          } else {
            byKey.set(key, {
              text: source.text,
              url: source.url,
              chapters: [{ slug: chapter.slug, title: chapter.title }],
            });
          }
        }
      }
      setEntries(Array.from(byKey.values()).sort((a, b) => a.text.localeCompare(b.text)));
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main id="main" style={{ maxWidth: space.reading, margin: '0 auto', padding: '44px 22px 72px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 600, color: c.text, margin: '0 0 10px' }}>Sources</h1>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: c.muted, margin: '0 0 30px' }}>
        {entries ? `${entries.length} sources` : 'Loading…'}, every chapter's list combined, deduplicated, and
        backlinked to where each is cited.
      </p>

      {!entries && (
        <p style={{ ...mono, fontSize: 12.5, color: c.faint }}>loading…</p>
      )}

      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {entries?.map((entry, i) => (
          <li key={i} style={{ borderBottom: `1px solid ${c.line}`, paddingBottom: 12 }}>
            <p style={{ margin: '0 0 6px', fontSize: 13.5, lineHeight: 1.6, color: c.prose }}>
              {entry.url ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ color: c.muted, textDecoration: 'none', borderBottom: `1px solid ${c.line2}` }}
                >
                  {entry.text}
                </a>
              ) : (
                entry.text
              )}
            </p>
            <div style={{ ...mono, fontSize: 11, color: c.faint, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              cited in:
              {entry.chapters.map((ch) => (
                <Link key={ch.slug} to={`/${ch.slug}`} style={{ color: c.teal, textDecoration: 'none' }}>
                  {ch.title}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
