import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

type Phase = 'idle' | 'running' | 'paused' | 'done';

const DURATIONS = [
  { label: '3 min', sec: 180 },
  { label: '5 min', sec: 300 },
  { label: '10 min', sec: 600 },
];

// the soft labels of noting practice: whatever predominates, name it gently and
// let it go. these are categories, not a checklist to complete.
const NOTES = ['thinking', 'feeling', 'hearing', 'wanting', 'planning', 'remembering', 'restless', 'pain'];

function fmt(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * widget_06.2, the noting timer. The reader rests on the breath and, when the mind
 * is pulled away, names what pulled it ("thinking," "hearing," "wanting") and lets
 * it go. Each note is a small act of seeing a thing arise and pass, which is why
 * noting feeds insight. The technique is Mahasi Sayadaw's twentieth-century method,
 * grounded in the Satipatthana Sutta but not lifted from it word for word. The
 * read-out never scores: more notes is not worse, it is just a clearer look.
 */
export function NotingTimer() {
  const [duration, setDuration] = useLocalStorage<number>('centering:widget:calm-abiding:note-duration', 300);
  const [sits, setSits] = useLocalStorage<number>('centering:widget:calm-abiding:note-sits', 0);

  const [phase, setPhase] = useState<Phase>('idle');
  const [remaining, setRemaining] = useState<number>(duration);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [announce, setAnnounce] = useState('');
  const interval = useRef<number | null>(null);

  // countdown
  useEffect(() => {
    if (phase !== 'running') return;
    interval.current = window.setInterval(() => {
      setRemaining((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => {
      if (interval.current !== null) window.clearInterval(interval.current);
    };
  }, [phase]);

  // finish when the clock runs out
  useEffect(() => {
    if (phase === 'running' && remaining === 0) {
      setPhase('done');
      setSits((s) => s + 1);
      setAnnounce('Sit complete.');
    }
  }, [remaining, phase, setSits]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  function start() {
    setRemaining(duration);
    setCounts({});
    setPhase('running');
    setAnnounce('Sit started. Rest on the breath. When something pulls you away, name it.');
  }
  function note(label: string) {
    if (phase !== 'running') return;
    setCounts((prev) => ({ ...prev, [label]: (prev[label] ?? 0) + 1 }));
    setAnnounce(`Noted: ${label}.`);
  }
  function reset() {
    setPhase('idle');
    setRemaining(duration);
    setCounts({});
  }
  function selectDuration(sec: number) {
    if (phase === 'running' || phase === 'paused') return;
    setDuration(sec);
    setRemaining(sec);
    setPhase('idle');
    setCounts({});
  }

  const active = phase === 'running' || phase === 'paused';
  const canPick = phase === 'idle' || phase === 'done';
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <WidgetShell
      id="06.2"
      name="noting_timer"
      title="Name what pulls you, and let it pass"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {sits} {sits === 1 ? 'sit' : 'sits'}
        </span>
      }
      footer={
        <span style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>
          the noting method of Mahasi Sayadaw (20th c.), grounded in the Satipaṭṭhāna Sutta · more notes
          is not a worse sit, it is a clearer one
        </span>
      }
    >
      <div style={{ padding: '16px 16px 18px' }}>
        <p style={{ fontSize: 14, lineHeight: 1.62, color: c.muted, margin: '0 0 16px' }}>
          Rest your attention on the breath. When something pulls you away, give it a soft, one-word
          name and return. The naming puts a sliver of space between you and the pull, and in that space
          you can watch the thing arise and pass.{' '}
          <span style={{ color: c.text }}>The note is the practice, not a score to keep low.</span>
        </p>

        {/* duration picker */}
        <div role="group" aria-label="sit length" style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
          {DURATIONS.map((d) => {
            const sel = d.sec === duration;
            return (
              <button
                key={d.sec}
                type="button"
                aria-pressed={sel}
                disabled={!canPick}
                onClick={() => selectDuration(d.sec)}
                style={{
                  ...mono,
                  flex: '1 1 auto',
                  cursor: canPick ? 'pointer' : 'default',
                  fontSize: 12.5,
                  padding: '9px 10px',
                  borderRadius: 9,
                  border: `1px solid ${sel ? c.tealEdge : c.line2}`,
                  background: sel ? c.tealFog : 'transparent',
                  color: sel ? c.teal : c.muted,
                  opacity: canPick ? 1 : 0.55,
                  transition: 'all .14s ease',
                }}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* clock */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div
            style={{ ...mono, fontSize: 34, fontWeight: 500, color: active ? c.text : c.faint, fontVariantNumeric: 'tabular-nums' }}
            role="timer"
            aria-live="off"
          >
            {fmt(remaining)}
          </div>
          {active && total > 0 && (
            <div style={{ ...mono, fontSize: 11, color: c.faint }}>
              {total} {total === 1 ? 'note' : 'notes'} so far
            </div>
          )}
        </div>

        {/* the note buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(86px, 1fr))',
            gap: 8,
            marginBottom: 16,
            opacity: phase === 'running' ? 1 : 0.5,
            pointerEvents: phase === 'running' ? 'auto' : 'none',
          }}
        >
          {NOTES.map((label) => {
            const n = counts[label] ?? 0;
            return (
              <button
                key={label}
                type="button"
                onClick={() => note(label)}
                style={{
                  ...mono,
                  cursor: phase === 'running' ? 'pointer' : 'default',
                  fontSize: 12,
                  padding: '11px 8px',
                  borderRadius: 9,
                  border: `1px solid ${n > 0 ? c.tealEdge : c.line2}`,
                  background: n > 0 ? c.tealFog : 'transparent',
                  color: n > 0 ? c.teal : c.muted,
                  transition: 'all .12s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                <span>{label}</span>
                {n > 0 && <span style={{ fontSize: 10, color: c.tealDim }}>{n}</span>}
              </button>
            );
          })}
        </div>

        {/* controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {phase === 'idle' && (
            <button type="button" onClick={start} style={primaryBtn}>
              <Play size={14} /> begin the sit
            </button>
          )}
          {phase === 'running' && (
            <button type="button" onClick={() => setPhase('paused')} style={ghostBtn}>
              <Pause size={13} /> pause
            </button>
          )}
          {phase === 'paused' && (
            <>
              <button type="button" onClick={() => setPhase('running')} style={primaryBtn}>
                <Play size={14} /> resume
              </button>
              <button type="button" onClick={reset} style={ghostBtn}>
                <RotateCcw size={12} /> end
              </button>
            </>
          )}
          {phase === 'done' && (
            <button type="button" onClick={start} style={primaryBtn}>
              <RotateCcw size={13} /> sit again
            </button>
          )}
        </div>

        {/* finished read-out */}
        {phase === 'done' && (
          <div style={{ marginTop: 18, border: `1px solid ${c.tealEdge}`, borderRadius: 11, background: c.tealFog, padding: '14px 15px' }}>
            <div style={{ ...mono, fontSize: 11, color: c.tealDim, marginBottom: 7 }}>sit complete</div>
            {total === 0 ? (
              <p style={{ fontSize: 14, lineHeight: 1.6, color: c.text, margin: 0 }}>
                No notes logged. Either it was a still sit, or the mind wandered without getting caught.
                Both are ordinary. Nothing to fix.
              </p>
            ) : (
              <>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: c.text, margin: '0 0 8px' }}>
                  {total} {total === 1 ? 'note' : 'notes'}, each one a moment you saw something clearly
                  instead of being carried by it. What visited most:
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {top.map(([label, n]) => (
                    <span
                      key={label}
                      style={{
                        ...mono,
                        fontSize: 11,
                        color: c.teal,
                        border: `1px solid ${c.tealEdge}`,
                        borderRadius: 6,
                        padding: '3px 8px',
                      }}
                    >
                      {label} · {n}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <span role="status" aria-live="polite" className="visually-hidden">
          {announce}
        </span>
      </div>
    </WidgetShell>
  );
}

const primaryBtn = {
  ...mono,
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  gap: 8,
  cursor: 'pointer',
  fontSize: 13,
  padding: '10px 18px',
  borderRadius: 9,
  border: `1px solid ${c.tealEdge}`,
  background: c.tealFog,
  color: c.teal,
  fontWeight: 500,
};

const ghostBtn = {
  ...mono,
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  gap: 6,
  cursor: 'pointer',
  fontSize: 12,
  padding: '10px 13px',
  borderRadius: 9,
  border: `1px solid ${c.line2}`,
  background: 'transparent',
  color: c.muted,
};
