import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';
import { CHAPTERS, PART, chapterNumLabel } from '@/content/chapters';

const GIST: Record<string, string> = {
  [PART.one]: 'what calm is, the settled body, the quiet mind',
  [PART.two]: 'each tradition on its own terms',
  [PART.three]: 'where the roads converge, and what holds up',
  [PART.four]: 'turn it into a practice and a life',
};

const ORDER = [PART.one, PART.two, PART.three, PART.four] as const;

/** fig_00.1a: the four parts of the book and the chapters in each. */
export function BookMap() {
  return (
    <Figure
      caption="fig_00.1a · the_four_parts"
      sub="four moves: ground the reader, walk the traditions, show the convergence, build a life."
      max={680}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 10,
        }}
      >
        {ORDER.map((part, i) => {
          const chapters = CHAPTERS.filter((ch) => ch.part === part);
          return (
            <div
              key={part}
              style={{
                border: `1px solid ${c.line}`,
                borderRadius: 10,
                background: c.panel2,
                padding: '13px 13px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 9,
              }}
            >
              <div style={{ ...mono, fontSize: 11, color: c.teal, letterSpacing: '.03em' }}>
                Part {['I', 'II', 'III', 'IV'][i]}
              </div>
              <div style={{ fontSize: 12.5, color: c.muted, lineHeight: 1.45, minHeight: 34 }}>
                {GIST[part]}
              </div>
              <div style={{ height: 1, background: c.line }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {chapters.map((ch) => (
                  <div
                    key={ch.slug}
                    style={{ ...mono, fontSize: 10.5, color: c.faint, lineHeight: 1.4 }}
                  >
                    <span style={{ color: c.tealDim }}>{chapterNumLabel(ch.num)}</span>{' '}
                    {ch.title.replace(/^[^:]*:\s*/, '')}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Figure>
  );
}
