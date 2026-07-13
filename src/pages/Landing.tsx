import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { ROUTES } from '@/content/routes';
import { chaptersByPart, chapterNumLabel } from '@/content/chapters';

export function Landing() {
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

      {/* the seven routes */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '34px 22px 10px' }}>
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
