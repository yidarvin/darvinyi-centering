import { getChapter } from '@/content/chapters';
import { c, mono } from '@/styles/tokens';

interface ChapterAtAGlanceProps {
  chapterSlug: string;
}

/** A compact return path for a reader who needs the chapter's working model again. */
export function ChapterAtAGlance({ chapterSlug }: ChapterAtAGlanceProps) {
  const glance = getChapter(chapterSlug)?.atAGlance;
  if (!glance) return null;

  return (
    <details
      className="chapter-at-a-glance"
      style={{
        border: `1px solid ${c.line}`,
        borderRadius: 12,
        background: c.panel,
        margin: '0 0 34px',
      }}
    >
      <summary
        style={{
          ...mono,
          cursor: 'pointer',
          color: c.teal,
          fontSize: 12.5,
          letterSpacing: '.03em',
          padding: '14px 16px',
        }}
      >
        {'// '}at a glance
      </summary>
      <div style={{ borderTop: `1px solid ${c.line}`, padding: '16px' }}>
        <p style={{ color: c.text, fontSize: 15, lineHeight: 1.6, fontWeight: 500, margin: '0 0 14px' }}>
          {glance.thesis}
        </p>
        <ul style={{ color: c.prose, fontSize: 14.5, lineHeight: 1.6, margin: '0 0 16px', paddingLeft: 20 }}>
          {glance.takeaways.map((takeaway) => <li key={takeaway} style={{ marginBottom: 6 }}>{takeaway}</li>)}
        </ul>
        <div style={{ ...mono, display: 'flex', flexWrap: 'wrap', gap: '7px 14px', color: c.faint, fontSize: 11.5 }}>
          <span>{glance.readingMinutes} min read</span>
          <span>{glance.practiceMinutes} min practice</span>
          <span>practice: <span style={{ color: c.teal }}>{glance.signaturePractice}</span></span>
          {glance.lastReviewed && <span>last reviewed {glance.lastReviewed}</span>}
        </div>
      </div>
    </details>
  );
}
