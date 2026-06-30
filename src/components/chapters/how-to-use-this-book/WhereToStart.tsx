import { Link } from 'react-router-dom';
import { ArrowRight, CornerDownRight, RotateCcw } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { getChapter, chapterNumLabel } from '@/content/chapters';

interface Pull {
  id: string;
  label: string;
  to?: string;
  why: string;
  tradition?: boolean;
}

const PULLS: Pull[] = [
  {
    id: 'mind',
    label: 'a quieter mind',
    to: 'the-quiet-mind',
    why: 'The mind resists calm by design. Start by seeing why, then train the one move every later chapter reuses: notice the drift, come back.',
  },
  {
    id: 'body',
    label: 'a settled body',
    to: 'the-settled-body',
    why: 'Calm is a physiological state you can enter on purpose. The body has a brake, and a long exhale is one way to pull it.',
  },
  {
    id: 'simpler',
    label: 'a simpler life',
    to: 'enough-and-no-fear',
    why: 'Much of our agitation is wanting. Sort what you actually need from what only feels urgent, and the gap anxiety lives in narrows.',
  },
  {
    id: 'unsure',
    label: 'not sure, just begin',
    to: 'what-calm-is',
    why: 'Begin at the beginning. What calm actually is, and what it is not, so you know what you are training toward.',
  },
  {
    id: 'tradition',
    label: 'a tradition draws me',
    tradition: true,
    why: 'Pick the one that pulls you. Each chapter presents the tradition on its own terms before any comparison.',
  },
];

const TRADITIONS: { label: string; to: string }[] = [
  { label: 'Stoicism', to: 'tranquility-by-judgment' },
  { label: 'Epicureanism', to: 'enough-and-no-fear' },
  { label: 'Buddhism', to: 'calm-abiding' },
  { label: 'Zen', to: 'the-ordinary-mind' },
  { label: 'Taoism', to: 'the-watercourse-way' },
  { label: 'Yoga', to: 'stilling-the-mind' },
  { label: 'The clinical methods', to: 'the-engineering-of-calm' },
  { label: 'Internal Family Systems', to: 'the-calm-at-the-center' },
  { label: 'The contemplative religions', to: 'stillness-and-surrender' },
  { label: 'The Transcendentalists', to: 'nature-and-simplicity' },
];

function ChapterLink({ slug, label }: { slug: string; label?: string }) {
  const ch = getChapter(slug);
  if (!ch) return null;
  return (
    <Link
      to={`/${slug}`}
      style={{
        ...mono,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: c.teal,
        textDecoration: 'none',
        border: `1px solid ${c.tealEdge}`,
        background: c.tealFog,
        borderRadius: 9,
        padding: '10px 14px',
        fontWeight: 500,
      }}
    >
      <span style={{ color: c.tealDim }}>§ {chapterNumLabel(ch.num)}</span>
      {label ?? ch.title}
      <ArrowRight size={14} />
    </Link>
  );
}

export function WhereToStart() {
  const [pick, setPick] = useLocalStorage<string | null>(
    'centering:ex:how-to-use-this-book:where-to-start',
    null,
  );
  const selected = PULLS.find((p) => p.id === pick) ?? null;

  return (
    <WidgetShell id="00.1" name="where_to_start" title="What pulls you right now?">
      <div style={{ padding: '16px 16px 4px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {PULLS.map((p) => {
            const active = pick === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPick(active ? null : p.id)}
                style={{
                  ...mono,
                  cursor: 'pointer',
                  fontSize: 12.5,
                  padding: '10px 13px',
                  borderRadius: 9,
                  border: `1px solid ${active ? c.tealEdge : c.line2}`,
                  background: active ? c.tealFog : 'transparent',
                  color: active ? c.teal : c.muted,
                  transition: 'all .14s ease',
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {selected && (
          <div
            style={{
              marginTop: 16,
              marginBottom: 14,
              padding: '16px 16px 18px',
              borderRadius: 11,
              border: `1px solid ${c.line}`,
              background: c.panel,
            }}
          >
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.62,
                color: c.prose,
                margin: '0 0 14px',
                display: 'flex',
                gap: 9,
              }}
            >
              <CornerDownRight size={15} color={c.teal} style={{ marginTop: 3, flexShrink: 0 }} />
              {selected.why}
            </p>

            {selected.tradition ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TRADITIONS.map((t) => (
                  <Link
                    key={t.to}
                    to={`/${t.to}`}
                    style={{
                      ...mono,
                      fontSize: 12,
                      color: c.muted,
                      textDecoration: 'none',
                      border: `1px solid ${c.line2}`,
                      borderRadius: 8,
                      padding: '7px 11px',
                    }}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            ) : (
              selected.to && <ChapterLink slug={selected.to} />
            )}
          </div>
        )}
      </div>

      <div style={{ padding: '8px 16px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ ...mono, fontSize: 11.5, color: c.faint }}>
          there is no wrong door. you can come back and pick another.
        </span>
        {pick && (
          <button
            type="button"
            onClick={() => setPick(null)}
            style={{
              ...mono,
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              fontSize: 12,
              padding: '7px 11px',
              borderRadius: 8,
              border: `1px solid ${c.line2}`,
              background: 'transparent',
              color: c.muted,
            }}
          >
            <RotateCcw size={12} /> clear
          </button>
        )}
      </div>
    </WidgetShell>
  );
}
