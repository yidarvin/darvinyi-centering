import { Link } from 'react-router-dom';
import { c, mono, space } from '@/styles/tokens';

export function NotFound() {
  return (
    <main
      id="main"
      style={{
        maxWidth: space.reading,
        margin: '0 auto',
        padding: '90px 22px',
        textAlign: 'center',
      }}
    >
      <div style={{ ...mono, fontSize: 13, color: c.tealDim, marginBottom: 14 }}>404</div>
      <h1 style={{ fontSize: 26, fontWeight: 600, color: c.text, margin: '0 0 12px' }}>
        Nothing here, which is its own kind of quiet.
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: c.muted, margin: '0 0 24px' }}>
        That page does not exist. Head back to the contents and pick a chapter.
      </p>
      <Link
        to="/"
        style={{
          ...mono,
          fontSize: 13,
          color: c.teal,
          textDecoration: 'none',
          border: `1px solid ${c.tealEdge}`,
          background: c.tealFog,
          borderRadius: 10,
          padding: '10px 16px',
        }}
      >
        ← contents
      </Link>
    </main>
  );
}
