import { c, mono } from '@/styles/tokens';
import { chapterNumLabel } from '@/content/chapters';

interface ChapterHeaderProps {
  /** the part label, shown as the eyebrow (for example "Part II · The Traditions") */
  part: string;
  num: number;
  title: string;
  subtitle?: string;
}

/**
 * The top of every chapter: part eyebrow, the § number, the title, and a mono
 * subtitle. Matches the reference prototypes.
 */
export function ChapterHeader({ part, num, title, subtitle }: ChapterHeaderProps) {
  return (
    <header style={{ marginBottom: 30 }}>
      <div
        style={{
          ...mono,
          fontSize: 12,
          letterSpacing: '.06em',
          color: c.tealDim,
          marginBottom: 18,
        }}
      >
        {part}
      </div>
      <div style={{ ...mono, fontSize: 12.5, color: c.faint, marginBottom: 10 }}>
        <span style={{ color: c.teal }}>§ {chapterNumLabel(num)}</span>
      </div>
      <h1
        style={{
          fontSize: 33,
          lineHeight: 1.12,
          fontWeight: 600,
          margin: '0 0 8px',
          letterSpacing: '-0.01em',
          color: c.text,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p style={{ ...mono, fontSize: 12, color: c.faint, margin: 0 }}>{subtitle}</p>
      )}
    </header>
  );
}
