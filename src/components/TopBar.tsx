import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getChapter } from '@/content/chapters';
import { c, mono } from '@/styles/tokens';

/**
 * A minimal top bar: the wordmark links home, a search box, and on a chapter
 * page a subtle teal line tracks reading progress down the page. Pressing
 * `/` from anywhere on the site focuses the search box, unless the reader is
 * already typing somewhere.
 */
export function TopBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onChapter = Boolean(getChapter(pathname.slice(1)));
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!onChapter) {
      setProgress(0);
      return;
    }
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onChapter, pathname]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== '/') return;
      const active = document.activeElement;
      const isTyping =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active instanceof HTMLElement && active.isContentEditable);
      if (isTyping) return;
      e.preventDefault();
      searchInputRef.current?.focus();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  }

  return (
    <div
      className="topbar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(10,10,11,0.82)',
        backdropFilter: 'saturate(140%) blur(8px)',
        borderBottom: `1px solid ${c.line}`,
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: '0 auto',
          padding: '11px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <Link
          to="/"
          style={{
            ...mono,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '.02em',
            color: c.text,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <span style={{ color: c.teal }}>centering</span>
          <span style={{ color: c.faint, fontWeight: 400 }}>/ calm</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <form onSubmit={submitSearch} style={{ minWidth: 0 }}>
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search  /"
              aria-label="Search the book"
              style={{
                ...mono,
                width: '100%',
                maxWidth: 170,
                minWidth: 64,
                fontSize: 12,
                padding: '6px 10px',
                borderRadius: 7,
                border: `1px solid ${c.line2}`,
                background: c.panel,
                color: c.text,
              }}
            />
          </form>
          <Link
            to="/glossary"
            style={{ ...mono, fontSize: 11.5, color: c.faint, textDecoration: 'none', flexShrink: 0 }}
          >
            glossary
          </Link>
          {onChapter && (
            <Link
              to="/"
              style={{ ...mono, fontSize: 11.5, color: c.faint, textDecoration: 'none', flexShrink: 0 }}
            >
              contents
            </Link>
          )}
        </div>
      </div>
      {/* reading progress */}
      <div style={{ height: 2, background: 'transparent' }}>
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: c.teal,
            opacity: onChapter && progress > 0 ? 0.7 : 0,
            transition: 'width .1s linear',
          }}
        />
      </div>
    </div>
  );
}
