import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { c, mono } from '@/styles/tokens';

/**
 * A minimal top bar: the wordmark links home, and on a chapter page a subtle
 * teal line tracks reading progress down the page.
 */
export function TopBar() {
  const { pathname } = useLocation();
  const onChapter = pathname !== '/';
  const [progress, setProgress] = useState(0);

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

  return (
    <div
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
          }}
        >
          <span style={{ color: c.teal }}>centering</span>
          <span style={{ color: c.faint, fontWeight: 400 }}>/ calm</span>
        </Link>
        {onChapter && (
          <Link
            to="/"
            style={{ ...mono, fontSize: 11.5, color: c.faint, textDecoration: 'none' }}
          >
            contents
          </Link>
        )}
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
