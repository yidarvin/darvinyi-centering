import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { c, mono } from '@/styles/tokens';
import { getChapter } from '@/content/chapters';
import { getChapterLoader, type ChapterModule } from '@/content/loadChapter';
import { ChapterHeader } from '@/components/ChapterHeader';
import { ChapterNav } from '@/components/ChapterNav';
import { ChapterTOC } from '@/components/ChapterTOC';
import { Reflection } from '@/components/Reflection';
import { Sources } from '@/components/Sources';
import { NotFound } from '@/pages/NotFound';

type Status = 'loading' | 'ready' | 'empty';

export function ChapterPage() {
  const { slug = '' } = useParams();
  const chapter = getChapter(slug);
  const [mod, setMod] = useState<ChapterModule | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chapter) return;
    const loader = getChapterLoader(slug);
    if (!loader) {
      setMod(null);
      setStatus('empty');
      return;
    }
    let active = true;
    setStatus('loading');
    setMod(null);
    loader()
      .then((m) => {
        if (active) {
          setMod(m);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (active) setStatus('empty');
      });
    return () => {
      active = false;
    };
  }, [slug, chapter]);

  if (!chapter) return <NotFound />;

  const Content = mod?.default;

  return (
    <div className="chapter-shell">
      <main id="main" className="chapter-main-contents">
        <div className="chapter-header-area">
          <ChapterHeader
            part={chapter.part}
            num={chapter.num}
            title={chapter.title}
            subtitle={chapter.subtitle}
          />
        </div>

        <div className="chapter-body-area">
          {status === 'loading' && (
            <p style={{ ...mono, fontSize: 12.5, color: c.faint, margin: '40px 0' }}>loading…</p>
          )}

          {status === 'empty' && <ComingSoon />}

          {status === 'ready' && Content && (
            <>
              <div ref={contentRef}>
                <Content />
              </div>
              {mod?.reflection && (
                <Reflection
                  chapterSlug={slug}
                  path={mod.reflection.path}
                  prompt={mod.reflection.prompt}
                  id={mod.reflection.id}
                />
              )}
              {mod?.sources && <Sources items={mod.sources} />}
            </>
          )}

          <ChapterNav slug={slug} />
        </div>
      </main>

      {status === 'ready' && <ChapterTOC containerRef={contentRef} watch={[slug, status]} />}
    </div>
  );
}

function ComingSoon() {
  return (
    <div
      style={{
        border: `1px solid ${c.line}`,
        borderRadius: 12,
        background: c.panel,
        padding: '28px 22px',
        margin: '20px 0 44px',
      }}
    >
      <div style={{ ...mono, fontSize: 11.5, color: c.tealDim, marginBottom: 10 }}>
        {'// '}status: in_progress
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: c.prose, margin: '0 0 10px' }}>
        This chapter is being written. The scaffolding is in place: its place in the book, the
        routes it leans on, and the shape of its figures and widget. The prose is on its way.
      </p>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: c.muted, margin: 0 }}>
        In the meantime, Chapter 0 walks you through how to read this, and points you to a good
        place to start.
      </p>
    </div>
  );
}
