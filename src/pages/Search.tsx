import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { c, mono, space } from '@/styles/tokens';
import { search, type SearchHit } from '@/lib/search';
import { useDocumentHead } from '@/lib/useDocumentHead';

function hitHref(hit: SearchHit): string {
  return `/${hit.chapterSlug}${hit.anchor ? `#${hit.anchor}` : ''}`;
}

export function Search() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(() => params.get('q') ?? '');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useDocumentHead({ title: 'Search', description: 'Search every chapter and section of the book.', path: '/search' });

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    setParams(query ? { q: query } : {}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const hit = results[activeIndex];
      if (hit) navigate(hitHref(hit));
    }
  }

  return (
    <main id="main" style={{ maxWidth: space.reading, margin: '0 auto', padding: '44px 22px 72px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 600, color: c.text, margin: '0 0 18px' }}>Search</h1>

      <input
        autoFocus
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search the book…"
        aria-label="Search the book"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls="search-results"
        aria-activedescendant={results[activeIndex] ? `search-result-${results[activeIndex].id}` : undefined}
        style={{
          ...mono,
          width: '100%',
          fontSize: 15,
          padding: '13px 15px',
          borderRadius: 10,
          border: `1px solid ${c.line2}`,
          background: c.panel,
          color: c.text,
        }}
      />

      <p role="status" aria-live="polite" style={{ ...mono, fontSize: 12, color: c.faint, margin: '10px 0 0' }}>
        {query ? `${results.length} ${results.length === 1 ? 'result' : 'results'}` : 'Type to search every chapter.'}
      </p>

      <ul
        id="search-results"
        role="listbox"
        aria-label="Search results"
        style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {results.map((hit, i) => (
          <li key={hit.id} role="presentation">
            <Link
              id={`search-result-${hit.id}`}
              role="option"
              aria-selected={i === activeIndex}
              to={hitHref(hit)}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                display: 'block',
                textDecoration: 'none',
                border: `1px solid ${i === activeIndex ? c.tealEdge : c.line}`,
                background: i === activeIndex ? c.tealFog : c.panel,
                borderRadius: 11,
                padding: '13px 15px',
              }}
            >
              <div style={{ ...mono, fontSize: 11, color: c.tealDim, marginBottom: 4 }}>
                {hit.chapterTitle}
                {hit.sectionTitle ? ` · ${hit.sectionTitle}` : ''}
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: c.prose }}>{hit.snippet}</div>
            </Link>
          </li>
        ))}
      </ul>

      {query && results.length === 0 && (
        <p style={{ fontSize: 14, color: c.muted, marginTop: 20 }}>No results for &ldquo;{query}&rdquo;.</p>
      )}
    </main>
  );
}
