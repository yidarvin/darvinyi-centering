import { Link, useParams } from 'react-router-dom';
import { c, mono, space } from '@/styles/tokens';
import { ROUTES, getRoute, type RouteId } from '@/content/routes';
import { CHAPTERS, chapterNumLabel } from '@/content/chapters';
import { NotFound } from '@/pages/NotFound';

function isRouteId(id: string): id is RouteId {
  return ROUTES.some((r) => r.id === id);
}

export function RouteIndex() {
  const { id = '' } = useParams();
  if (!isRouteId(id)) return <NotFound />;

  const route = getRoute(id);
  const chapters = CHAPTERS.filter((ch) => ch.routes?.includes(id));

  return (
    <main id="main" style={{ maxWidth: space.reading, margin: '0 auto', padding: '44px 22px 72px' }}>
      <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 10 }}>
        {'// '}one of the seven routes
      </div>
      <h1
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: route.color,
          margin: '0 0 10px',
          textTransform: 'capitalize',
        }}
      >
        {route.label}
      </h1>
      <p style={{ fontSize: 15.5, lineHeight: 1.6, color: c.prose, margin: '0 0 30px' }}>{route.gloss}</p>

      <div style={{ ...mono, fontSize: 12, color: c.faint, marginBottom: 14 }}>
        {chapters.length} {chapters.length === 1 ? 'chapter leans' : 'chapters lean'} on this route
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
              padding: '14px 16px',
            }}
          >
            <div style={{ ...mono, fontSize: 11.5, color: c.teal, marginBottom: 6 }}>§ {chapterNumLabel(ch.num)}</div>
            <div style={{ fontSize: 15.5, fontWeight: 600, color: c.text, lineHeight: 1.3, marginBottom: 4 }}>
              {ch.title}
            </div>
            <div style={{ ...mono, fontSize: 11, color: c.faint }}>{ch.subtitle}</div>
          </Link>
        ))}
      </div>

      <p style={{ fontSize: 13, color: c.faint, marginTop: 26 }}>
        <Link to="/one-calm-many-doors" style={{ color: c.teal, textDecoration: 'none' }}>
          See all seven routes side by side →
        </Link>
      </p>
    </main>
  );
}
