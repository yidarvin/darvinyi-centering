import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { ROUTES } from '@/content/routes';
import { chaptersByPart, chapterNumLabel, getChapter } from '@/content/chapters';

export function Landing() {
  const [lastChapterSlug, setLastChapterSlug] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('centering:reading:last');
      const slug = stored ? (JSON.parse(stored) as unknown) : null;
      setLastChapterSlug(typeof slug === 'string' ? getChapter(slug)?.slug ?? null : null);
    } catch {
      setLastChapterSlug(null);
    }
  }, []);

  const lastChapter = getChapter(lastChapterSlug ?? undefined);

  return (
    <main id="main" style={{ color: c.text }}>
      {/* hero */}
      <section
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '76px 22px 30px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 12,
            letterSpacing: '.18em',
            color: c.tealDim,
            marginBottom: 22,
            textTransform: 'uppercase',
          }}
        >
          a textbook of calm
        </div>
        <h1
          style={{
            ...mono,
            fontSize: 'clamp(44px, 11vw, 88px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            margin: '0 0 18px',
            color: c.text,
          }}
        >
          centering
        </h1>
        <p style={{ fontSize: 17, color: c.muted, margin: '0 0 26px', letterSpacing: '.01em' }}>
          the philosophies and practices of calm
        </p>
        <p
          style={{
            fontSize: 17.5,
            lineHeight: 1.66,
            color: c.prose,
            maxWidth: 600,
            margin: '0 auto 30px',
          }}
        >
          Calm is not the absence of trouble, and it is not numbness. It is a trained, engaged
          relationship to experience. People keep rediscovering the same few routes to it across
          very different worldviews. This book walks those routes, shows where they agree, and says
          which ones the evidence supports.
        </p>
        <Link
          to="/how-to-use-this-book"
          style={{
            ...mono,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            fontSize: 13,
            fontWeight: 500,
            color: c.teal,
            textDecoration: 'none',
            padding: '11px 18px',
            borderRadius: 10,
            border: `1px solid ${c.tealEdge}`,
            background: c.tealFog,
          }}
        >
          start here <ArrowRight size={14} />
        </Link>
      </section>

      <section aria-label="Choose a way into the book" style={{ maxWidth: 820, margin: '0 auto', padding: '10px 22px 18px' }}>
        {lastChapter && (
          <Link to={`/${lastChapter.slug}`} style={{ display: 'block', border: `1px solid ${c.tealEdge}`, borderRadius: 11, background: c.tealFog, padding: '13px 15px', marginBottom: 12, textDecoration: 'none' }}>
            <span style={{ ...mono, fontSize: 11.5, color: c.tealDim }}>continue reading</span>
            <span style={{ display: 'block', color: c.text, fontSize: 15, fontWeight: 600, marginTop: 3 }}>{lastChapter.title}</span>
          </Link>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 10 }}>
          <Link to="/how-to-use-this-book" style={{ border: `1px solid ${c.line}`, borderRadius: 11, background: c.panel, padding: '14px 15px', textDecoration: 'none' }}>
            <span style={{ ...mono, color: c.tealDim, fontSize: 11.5 }}>read in order</span>
            <span style={{ display: 'block', color: c.prose, fontSize: 14.5, lineHeight: 1.5, marginTop: 5 }}>Start with the map, then build the foundation.</span>
          </Link>
          <Link to="/how-to-use-this-book#where-to-start" style={{ border: `1px solid ${c.line}`, borderRadius: 11, background: c.panel, padding: '14px 15px', textDecoration: 'none' }}>
            <span style={{ ...mono, color: c.tealDim, fontSize: 11.5 }}>choose a current need</span>
            <span style={{ display: 'block', color: c.prose, fontSize: 14.5, lineHeight: 1.5, marginTop: 5 }}>Name what is pulling at you and get a starting point.</span>
          </Link>
          <a href="#routes" style={{ border: `1px solid ${c.line}`, borderRadius: 11, background: c.panel, padding: '14px 15px', textDecoration: 'none' }}>
            <span style={{ ...mono, color: c.tealDim, fontSize: 11.5 }}>browse a route</span>
            <span style={{ display: 'block', color: c.prose, fontSize: 14.5, lineHeight: 1.5, marginTop: 5 }}>Compare the recurring moves that cross traditions.</span>
          </a>
        </div>
      </section>

      {/* the seven routes */}
      <section id="routes" style={{ maxWidth: 820, margin: '0 auto', padding: '34px 22px 10px' }}>
        <div
          style={{
            ...mono,
            fontSize: 12.5,
            color: c.faint,
            marginBottom: 16,
            letterSpacing: '.03em',
          }}
        >
          <span style={{ color: c.tealDim }}>{'// '}</span>the seven routes to calm
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ROUTES.map((r) => (
            <div
              key={r.id}
              style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}
            >
              <Link
                to={`/routes/${r.id}`}
                style={{
                  ...mono,
                  fontSize: 12,
                  color: r.color,
                  border: `1px solid ${r.color}55`,
                  background: `${r.color}12`,
                  borderRadius: 7,
                  padding: '5px 10px',
                  flex: '0 0 auto',
                  minWidth: 104,
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                {r.label}
              </Link>
              <span style={{ fontSize: 14, lineHeight: 1.5, color: c.muted, flex: '1 1 240px' }}>
                {r.gloss}
              </span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: c.muted, margin: '18px 0 0' }}>
          The same handful of moves appear again and again across the traditions, named differently
          each time. Each tradition chapter tags the routes it leans on. Part III collects them.
        </p>
      </section>

      {/* the chapter index */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '40px 22px 90px' }}>
        {chaptersByPart().map(({ part, chapters }) => (
          <div key={part} style={{ marginBottom: 36 }}>
            <h2
              style={{
                ...mono,
                fontSize: 12.5,
                fontWeight: 500,
                color: c.tealDim,
                letterSpacing: '.04em',
                margin: '0 0 14px',
                paddingBottom: 10,
                borderBottom: `1px solid ${c.line}`,
              }}
            >
              {part}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 12,
              }}
            >
              {chapters.map((ch) => (
                <Link
                  key={ch.slug}
                  to={`/${ch.slug}`}
                  className="chapter-card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    border: `1px solid ${c.line}`,
                    borderRadius: 12,
                    background: c.panel,
                    padding: '15px 16px',
                  }}
                >
                  <div style={{ ...mono, fontSize: 11.5, color: c.teal, marginBottom: 7 }}>
                    § {chapterNumLabel(ch.num)}
                  </div>
                  <div
                    style={{
                      fontSize: 15.5,
                      fontWeight: 600,
                      color: c.text,
                      lineHeight: 1.3,
                      marginBottom: 6,
                    }}
                  >
                    {ch.title}
                  </div>
                  <div style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>
                    {ch.subtitle}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* reference layer */}
      <section
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: '0 22px 70px',
          display: 'flex',
          gap: 18,
          flexWrap: 'wrap',
        }}
      >
        <Link to="/glossary" style={{ ...mono, fontSize: 12, color: c.faint, textDecoration: 'none' }}>
          glossary →
        </Link>
        <Link to="/index" style={{ ...mono, fontSize: 12, color: c.faint, textDecoration: 'none' }}>
          A-Z index →
        </Link>
        <Link to="/sources" style={{ ...mono, fontSize: 12, color: c.faint, textDecoration: 'none' }}>
          sources →
        </Link>
      </section>
    </main>
  );
}
