import { useEffect, useRef, useState } from 'react';
import { Download, FileUp, Trash2 } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { chapterNumLabel, getChapter } from '@/content/chapters';
import { clearSavedWork, importSavedWork, readSavedWork, type SavedWorkArchive } from '@/lib/savedWork';
import { useDocumentHead } from '@/lib/useDocumentHead';

function entryLabel(key: string): string {
  const [, kind, slug, id] = key.split(':');
  const chapter = getChapter(slug);
  const chapterLabel = chapter ? `§ ${chapterNumLabel(chapter.num)} · ${chapter.title}` : 'Practice settings';
  const kindLabel = kind === 'reflect' ? 'reflection' : kind === 'ex' ? 'exercise' : kind === 'widget' ? 'widget' : kind;
  return `${chapterLabel} · ${kindLabel}${id ? ` · ${id.replaceAll('-', ' ')}` : ''}`;
}

function preview(value: unknown): string {
  if (typeof value === 'string') return value.trim() || 'No text yet';
  if (typeof value === 'boolean') return value ? 'Marked complete' : 'Not marked complete';
  if (typeof value === 'number') return String(value);
  return JSON.stringify(value);
}

function buttonStyle(tone: 'quiet' | 'accent' | 'danger' = 'quiet') {
  const colors =
    tone === 'accent'
      ? { background: c.tealFog, border: c.tealEdge, color: c.teal }
      : tone === 'danger'
        ? { background: 'rgba(248,113,113,.08)', border: 'rgba(248,113,113,.35)', color: '#fca5a5' }
        : { background: 'transparent', border: c.line2, color: c.muted };
  return {
    ...mono,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    minHeight: 44,
    padding: '8px 12px',
    borderRadius: 9,
    border: `1px solid ${colors.border}`,
    background: colors.background,
    color: colors.color,
    cursor: 'pointer',
    fontSize: 12,
  };
}

export function Notebook() {
  const [archive, setArchive] = useState<SavedWorkArchive>(() => readSavedWork());
  const [notice, setNotice] = useState('');
  const importInput = useRef<HTMLInputElement>(null);

  useDocumentHead({
    title: 'Saved work',
    description: 'Your Centering reflections, exercises, and practice settings, saved only in this browser.',
    path: '/notebook',
  });

  const refresh = () => setArchive(readSavedWork());

  useEffect(() => {
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const entries = Object.entries(archive.values);

  function exportArchive() {
    const blob = new Blob([JSON.stringify(readSavedWork(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'centering-saved-work.json';
    link.click();
    URL.revokeObjectURL(url);
    setNotice('Saved work exported as a JSON file.');
  }

  async function handleImport(file: File | undefined) {
    if (!file) return;
    try {
      const restored = importSavedWork(JSON.parse(await file.text()) as unknown);
      refresh();
      setNotice(`${restored} saved ${restored === 1 ? 'entry' : 'entries'} restored.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'That file could not be imported.');
    } finally {
      if (importInput.current) importInput.current.value = '';
    }
  }

  function clearAll() {
    if (!window.confirm('Clear all Centering reflections, exercises, and practice settings from this browser?')) return;
    const removed = clearSavedWork();
    refresh();
    setNotice(`${removed} saved ${removed === 1 ? 'entry' : 'entries'} cleared from this browser.`);
  }

  return (
    <main id="main" style={{ maxWidth: 760, margin: '0 auto', padding: '56px 22px 90px' }}>
      <div style={{ ...mono, color: c.tealDim, fontSize: 12, letterSpacing: '.06em', marginBottom: 16 }}>
        {'// '}your browser, your notes
      </div>
      <h1 style={{ fontSize: 'clamp(30px, 6vw, 44px)', margin: '0 0 12px', letterSpacing: '-.02em' }}>Saved work</h1>
      <p style={{ color: c.prose, fontSize: 16.5, lineHeight: 1.7, maxWidth: 660, margin: '0 0 24px' }}>
        Reflections, exercise responses, and practice settings stay in this browser. Nothing here is sent to Centering. Export a copy if you want to keep it somewhere else or move it to another device.
      </p>

      <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 18 }}>
        <button type="button" onClick={exportArchive} style={buttonStyle('accent')}>
          <Download size={15} /> export JSON
        </button>
        <button type="button" onClick={() => importInput.current?.click()} style={buttonStyle()}>
          <FileUp size={15} /> import JSON
        </button>
        <input
          ref={importInput}
          className="visually-hidden"
          type="file"
          accept="application/json,.json"
          aria-label="Import saved work JSON"
          onChange={(event) => void handleImport(event.target.files?.[0])}
        />
        {entries.length > 0 && (
          <button type="button" onClick={clearAll} style={buttonStyle('danger')}>
            <Trash2 size={15} /> clear this browser
          </button>
        )}
      </div>

      {notice && <p role="status" style={{ ...mono, color: c.teal, fontSize: 12.5, margin: '0 0 18px' }}>{notice}</p>}

      {entries.length === 0 ? (
        <section style={{ border: `1px solid ${c.line}`, borderRadius: 12, background: c.panel, padding: '22px 20px' }}>
          <h2 style={{ fontSize: 17, margin: '0 0 8px' }}>Nothing saved yet</h2>
          <p style={{ color: c.muted, lineHeight: 1.65, margin: 0 }}>
            Write a reflection, answer an exercise, or use a practice widget. It will appear here automatically on this device.
          </p>
        </section>
      ) : (
        <section aria-label="Saved entries">
          <p style={{ ...mono, color: c.faint, fontSize: 12, margin: '0 0 10px' }}>{entries.length} saved {entries.length === 1 ? 'entry' : 'entries'}</p>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {entries.map(([key, value]) => (
              <li key={key} style={{ border: `1px solid ${c.line}`, borderRadius: 11, background: c.panel, padding: '14px 15px' }}>
                <div style={{ ...mono, color: c.tealDim, fontSize: 11.5, marginBottom: 7 }}>{entryLabel(key)}</div>
                <div style={{ color: c.prose, fontSize: 14.5, lineHeight: 1.55, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{preview(value)}</div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
}
