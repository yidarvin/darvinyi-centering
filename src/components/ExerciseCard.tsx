import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Play, Pause, RotateCcw } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { useLocalStorage } from '@/lib/useLocalStorage';

type ExerciseInput = 'text' | 'checkbox' | 'timer';

interface ExerciseCardProps {
  /** the chapter slug, used to namespace saved state */
  chapterSlug: string;
  /** a stable id for this exercise within the chapter */
  id: string;
  title: string;
  /** an optional small label, for example "01" */
  n?: string;
  /** the input the reader produces something with */
  input?: ExerciseInput;
  /** placeholder for the text input */
  placeholder?: string;
  /** duration for the timer input, in seconds */
  seconds?: number;
  /** instructions and prose */
  children?: ReactNode;
}

function key(slug: string, id: string) {
  return `centering:ex:${slug}:${id}`;
}

export function ExerciseCard({
  chapterSlug,
  id,
  title,
  n,
  input,
  placeholder = 'type here…',
  seconds = 300,
  children,
}: ExerciseCardProps) {
  const storageKey = key(chapterSlug, id);
  return (
    <div
      style={{
        border: `1px solid ${c.line}`,
        borderRadius: 12,
        background: c.panel,
        padding: '16px 16px 18px',
        marginBottom: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 8 }}>
        {n && <span style={{ ...mono, fontSize: 11.5, color: c.tealDim }}>{n}</span>}
        <h3 style={{ fontSize: 15.5, fontWeight: 600, margin: 0, color: c.text }}>{title}</h3>
      </div>
      {children && (
        <div style={{ fontSize: 14, lineHeight: 1.62, color: c.muted, marginBottom: 13 }}>
          {children}
        </div>
      )}
      {input === 'text' && <TextInput storageKey={storageKey} label={`Response for ${title}`} placeholder={placeholder} />}
      {input === 'checkbox' && <CheckInput storageKey={storageKey} />}
      {input === 'timer' && <TimerInput storageKey={storageKey} seconds={seconds} />}
    </div>
  );
}

function TextInput({ storageKey, label, placeholder }: { storageKey: string; label: string; placeholder: string }) {
  const [value, setValue] = useLocalStorage<string>(storageKey, '');
  const inputId = `exercise-${storageKey.replace(/[^a-z0-9]+/gi, '-')}`;
  return (
    <>
      <label className="visually-hidden" htmlFor={inputId}>
        {label}
      </label>
      <textarea
        id={inputId}
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          ...mono,
          width: '100%',
          boxSizing: 'border-box',
          resize: 'vertical',
          background: c.panel2,
          color: c.text,
          border: `1px solid ${c.line}`,
          borderRadius: 8,
          padding: '11px 12px',
          fontSize: 13,
          lineHeight: 1.6,
        }}
      />
    </>
  );
}

function CheckInput({ storageKey }: { storageKey: string }) {
  const [done, setDone] = useLocalStorage<boolean>(storageKey, false);
  return (
    <button
      type="button"
      aria-pressed={done}
      onClick={() => setDone((d) => !d)}
      style={{
        ...mono,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        cursor: 'pointer',
        fontSize: 12.5,
        padding: '9px 14px',
        borderRadius: 9,
        border: `1px solid ${done ? c.tealEdge : c.line2}`,
        background: done ? c.tealFog : 'transparent',
        color: done ? c.teal : c.muted,
        transition: 'all .14s ease',
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: 5,
          border: `1px solid ${done ? c.teal : c.line2}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: done ? c.tealFog : 'transparent',
        }}
      >
        {done && <Check size={12} color={c.teal} strokeWidth={3} />}
      </span>
      {done ? 'done' : 'mark done'}
    </button>
  );
}

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function TimerInput({ storageKey, seconds }: { storageKey: string; seconds: number }) {
  const [runs, setRuns] = useLocalStorage<number>(storageKey, 0);
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          setRuns((n) => n + 1);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [running, setRuns]);

  const reset = () => {
    setRunning(false);
    setRemaining(seconds);
  };

  const done = remaining === 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <div
        style={{
          ...mono,
          fontSize: 26,
          fontWeight: 500,
          color: done ? c.teal : c.text,
          fontVariantNumeric: 'tabular-nums',
          minWidth: 78,
        }}
        role="timer"
        aria-live="off"
      >
        {fmt(remaining)}
      </div>
      <button
        type="button"
        onClick={() => (done ? reset() : setRunning((r) => !r))}
        style={{
          ...mono,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          cursor: 'pointer',
          fontSize: 12.5,
          padding: '9px 14px',
          borderRadius: 9,
          border: `1px solid ${c.tealEdge}`,
          background: c.tealFog,
          color: c.teal,
          fontWeight: 500,
        }}
      >
        {done ? (
          <>
            <RotateCcw size={13} /> again
          </>
        ) : running ? (
          <>
            <Pause size={13} /> pause
          </>
        ) : (
          <>
            <Play size={13} /> start
          </>
        )}
      </button>
      {!done && remaining !== seconds && (
        <button
          type="button"
          onClick={reset}
          style={{
            ...mono,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            fontSize: 12,
            padding: '9px 12px',
            borderRadius: 9,
            border: `1px solid ${c.line2}`,
            background: 'transparent',
            color: c.muted,
          }}
        >
          <RotateCcw size={12} /> reset
        </button>
      )}
      {runs > 0 && (
        <span style={{ ...mono, fontSize: 11.5, color: c.faint }}>
          completed {runs}×
        </span>
      )}
      {/* announce completion to screen readers without per-second chatter */}
      <span role="status" aria-live="polite" className="visually-hidden">
        {done ? 'Timer complete.' : ''}
      </span>
    </div>
  );
}
