import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { chapterNeighbors, chapterNumLabel } from '@/content/chapters';

interface ChapterNavProps {
  slug: string;
}

/**
 * Previous and next chapter links, read from the manifest. Uses readable slugs
 * for the hrefs and shows the chapter number and title.
 */
export function ChapterNav({ slug }: ChapterNavProps) {
  const { prev, next } = chapterNeighbors(slug);

  const cell = (dir: 'prev' | 'next') => {
    const ch = dir === 'prev' ? prev : next;
    if (!ch) return <span style={{ flex: 1 }} />;
    return (
      <Link
        to={`/${ch.slug}`}
        style={{
          ...mono,
          flex: 1,
          textDecoration: 'none',
          display: 'inline-flex',
          flexDirection: 'column',
          gap: 4,
          color: c.muted,
          alignItems: dir === 'next' ? 'flex-end' : 'flex-start',
          textAlign: dir === 'next' ? 'right' : 'left',
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: c.faint,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {dir === 'prev' && <ArrowLeft size={12} />}
          {dir === 'prev' ? 'prev' : 'next'} · {chapterNumLabel(ch.num)}
          {dir === 'next' && <ArrowRight size={12} />}
        </span>
        <span style={{ fontSize: 13, color: c.teal }}>{ch.title}</span>
      </Link>
    );
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 18,
        borderTop: `1px solid ${c.line}`,
        paddingTop: 22,
      }}
    >
      {cell('prev')}
      {cell('next')}
    </nav>
  );
}
