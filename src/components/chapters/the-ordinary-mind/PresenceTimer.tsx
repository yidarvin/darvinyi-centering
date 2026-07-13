import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Play, RotateCcw, CornerDownLeft } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

type Phase = 'idle' | 'running' | 'done';

// a small set of plain, two-handed, screen-free acts. the reader can also name
// their own. nothing here is special. that is the point.
const ACTS = ['a cup of tea', 'the dishes', 'a short walk', 'a meal', 'washing your hands'];

const DURATIONS = [
  { label: '3 min', sec: 180 },
  { label: '5 min', sec: 300 },
  { label: '10 min', sec: 600 },
];

// an open, slightly imperfect circle: one brush sweep, started near the top,
// carried almost all the way round, left a touch unclosed. the wobble and the
// gap are deliberate. a perfect circle would be the wrong figure for this.
const ENSO_PATH =
  'M158 47 C 196 66 214 104 209 142 C 204 182 172 211 132 214 C 90 217 52 193 41 154 C 30 116 47 74 84 53 C 110 38 140 38 166 50';

function fmt(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * widget_07.1, the presence timer. The reader names one ordinary act (tea, the
 * dishes, a walk), commits to doing only that, screen down, and gives it full
 * attention. When the mind leaves, a single soft tap brings it back. The return
 * is the practice, not a failure, so the read-out never scores: more returns is
 * not a worse sit, it is just a mind being met more often. The ensō at the
 * center draws itself as the reader stays, finishing open and imperfect, the way
 * a real one is brushed. This is shikantaza and "ordinary mind is the Way" made
 * small: nothing to attain, just this one thing, all the way through.
 */
export function PresenceTimer() {
  const [act, setAct] = useLocalStorage<string>('centering:widget:the-ordinary-mind:act', ACTS[0]);
  const [custom, setCustom] = useLocalStorage<string>('centering:widget:the-ordinary-mind:custom', '');
  const [duration, setDuration] = useLocalStorage<number>('centering:widget:the-ordinary-mind:duration', 300);
  const [sittings, setSittings] = useLocalStorage<number>('centering:widget:the-ordinary-mind:sittings', 0);

  const [phase, setPhase] = useState<Phase>('idle');
  const [remaining, setRemaining] = useState<number>(duration);
  const [returns, setReturns] = useState(0);
  const [announce, setAnnounce] = useState('');

  const interval = useRef<number | null>(null);
  const ensoRef = useRef<SVGPathElement | null>(null);
  const counted = useRef(false);
  const [ensoLen, setEnsoLen] = useState(560);

  const beginRef = useRef<HTMLButtonElement | null>(null);
  const comeBackRef = useRef<HTMLButtonElement | null>(null);
  const againRef = useRef<HTMLButtonElement | null>(null);
  const isFirstPhase = useRef(true);

  // move focus to each phase's primary control, so a keyboard user is never
  // stranded on <body> when begin/end/reset swaps the buttons out from under
  // them. skipped on first mount, so the widget does not grab focus unasked.
  useEffect(() => {
    if (isFirstPhase.current) {
      isFirstPhase.current = false;
      return;
    }
    if (phase === 'idle') beginRef.current?.focus();
    else if (phase === 'running') comeBackRef.current?.focus();
    else if (phase === 'done') againRef.current?.focus();
  }, [phase]);

  // measure the brushed path once, so the dash can draw it exactly. guarded so
  // a non-DOM environment (SSR, jsdom) falls back to the static length instead
  // of throwing.
  useLayoutEffect(() => {
    const path = ensoRef.current;
    if (path && typeof path.getTotalLength === 'function') {
      try {
        const len = path.getTotalLength();
        if (len > 0) setEnsoLen(len);
      } catch {
        // keep the fallback length if measurement is unavailable
      }
    }
  }, []);

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

  // finish when the clock runs out. counted guards against a sitting being
  // tallied twice if "end here" is clicked on the same tick the clock hits zero.
  useEffect(() => {
    if (phase === 'running' && remaining === 0) {
      if (!counted.current) {
        counted.current = true;
        setSittings((s) => s + 1);
      }
      setPhase('done');
      setAnnounce('Done. You stayed with one thing.');
    }
  }, [remaining, phase, setSittings]);

  const named = act === '__custom__' ? custom.trim() || 'this one thing' : act;
  const elapsed = duration - remaining;
  const progress = duration > 0 ? Math.min(1, elapsed / duration) : 0;
  const canPick = phase === 'idle';

  function begin() {
    counted.current = false;
    setRemaining(duration);
    setReturns(0);
    setPhase('running');
    setAnnounce(`Begin. Give your full attention to ${named}. Screen down.`);
  }
  function comeBack() {
    if (phase !== 'running') return;
    setReturns((n) => n + 1);
    setAnnounce('Welcome back. Return to the one thing.');
  }
  function end() {
    if (phase === 'running' && !counted.current) {
      counted.current = true;
      setSittings((s) => s + 1);
    }
    setPhase('done');
  }
  function reset() {
    counted.current = false;
    setPhase('idle');
    setRemaining(duration);
    setReturns(0);
  }
  function pickDuration(sec: number) {
    if (!canPick) return;
    setDuration(sec);
    setRemaining(sec);
  }

  return (
    <WidgetShell
      id="07.1"
      name="presence_timer"
      title="One thing, all the way through"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {sittings} {sittings === 1 ? 'sitting' : 'sittings'}
        </span>
      }
      footer={
        <span style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>
          put the screen down. the timer keeps itself. come back to it only to mark a return, or to end.
        </span>
      }
    >
      <div style={{ padding: '16px 16px 18px' }}>
        {/* act picker */}
        <div style={{ ...mono, fontSize: 11, color: c.faint, marginBottom: 9, letterSpacing: '.04em' }}>
          choose one ordinary act
        </div>
        <div role="group" aria-label="ordinary act" style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          {ACTS.map((a) => {
            const sel = act === a;
            return (
              <button
                key={a}
                type="button"
                aria-pressed={sel}
                disabled={!canPick}
                onClick={() => setAct(a)}
                style={chip(sel, canPick)}
              >
                {a}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={act === '__custom__'}
            disabled={!canPick}
            onClick={() => setAct('__custom__')}
            style={chip(act === '__custom__', canPick)}
          >
            your own…
          </button>
        </div>
        {act === '__custom__' && (
          <input
            type="text"
            value={custom}
            disabled={!canPick}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="name one plain act…"
            aria-label="your own ordinary act"
            style={{
              ...mono,
              width: '100%',
              boxSizing: 'border-box',
              background: c.panel,
              color: c.text,
              border: `1px solid ${c.line2}`,
              borderRadius: 8,
              padding: '9px 11px',
              fontSize: 13,
              marginBottom: 10,
            }}
          />
        )}

        {/* duration picker */}
        <div role="group" aria-label="length" style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
          {DURATIONS.map((d) => {
            const sel = d.sec === duration;
            return (
              <button
                key={d.sec}
                type="button"
                aria-pressed={sel}
                disabled={!canPick}
                onClick={() => pickDuration(d.sec)}
                style={chip(sel, canPick)}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* the ensō, drawing itself as the reader stays present */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 14 }}>
          <svg
            viewBox="0 0 256 256"
            style={{ width: '100%', maxWidth: 224, height: 'auto', display: 'block' }}
            aria-hidden="true"
          >
            {/* faint full circle, the unwalked path */}
            <path d={ENSO_PATH} fill="none" stroke={c.line2} strokeWidth={2} strokeLinecap="round" />
            {/* the brushed enso, revealed by progress */}
            <path
              ref={ensoRef}
              d={ENSO_PATH}
              fill="none"
              stroke={c.teal}
              strokeWidth={phase === 'idle' ? 2 : 5}
              strokeLinecap="round"
              strokeDasharray={ensoLen}
              strokeDashoffset={phase === 'idle' ? ensoLen : ensoLen * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 0.9s linear, stroke-width 0.3s ease', opacity: phase === 'idle' ? 0.35 : 0.9 }}
            />
            {/* a still center */}
            <circle cx={128} cy={130} r={3} fill={phase === 'idle' ? c.faint : c.teal} />
            {/* the named act, at center */}
            <text
              x={128}
              y={150}
              textAnchor="middle"
              fontFamily={mono.fontFamily}
              fontSize={11}
              fill={c.muted}
            >
              {named.length > 22 ? named.slice(0, 21) + '…' : named}
            </text>
          </svg>

          {/* the clock, spare */}
          <div
            style={{ ...mono, fontSize: 30, fontWeight: 500, color: phase === 'running' ? c.text : c.faint, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}
            role="timer"
            aria-live="off"
          >
            {fmt(remaining)}
          </div>
          {phase === 'running' && (
            <div style={{ ...mono, fontSize: 11, color: c.faint, marginTop: 2 }}>
              {returns === 0 ? 'with one thing' : `${returns} ${returns === 1 ? 'return' : 'returns'}`}
            </div>
          )}
        </div>

        {/* controls */}
        {phase === 'idle' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button ref={beginRef} type="button" onClick={begin} style={primaryBtn}>
              <Play size={14} /> begin
            </button>
          </div>
        )}

        {phase === 'running' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <button ref={comeBackRef} type="button" onClick={comeBack} style={returnBtn}>
              <CornerDownLeft size={15} /> the mind left · come back
            </button>
            <button type="button" onClick={end} style={ghostBtn}>
              end here
            </button>
          </div>
        )}

        {phase === 'done' && (
          <>
            <div style={{ border: `1px solid ${c.tealEdge}`, borderRadius: 11, background: c.tealFog, padding: '14px 15px', marginBottom: 14 }}>
              <div style={{ ...mono, fontSize: 11, color: c.tealDim, marginBottom: 7 }}>the sitting is done</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: c.text, margin: 0 }}>
                You gave {fmt(elapsed)} to {named}, and nothing else.{' '}
                {returns === 0
                  ? 'The mind stayed, or it wandered without being caught. Either is ordinary.'
                  : `You came back ${returns} ${returns === 1 ? 'time' : 'times'}. Each return was the practice, not a lapse from it.`}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button ref={againRef} type="button" onClick={reset} style={primaryBtn}>
                <RotateCcw size={13} /> again
              </button>
            </div>
          </>
        )}

        <span role="status" aria-live="polite" className="visually-hidden">
          {announce}
        </span>
      </div>
    </WidgetShell>
  );
}

function chip(sel: boolean, enabled: boolean) {
  return {
    ...mono,
    cursor: enabled ? 'pointer' : 'default',
    fontSize: 12,
    padding: '8px 11px',
    borderRadius: 9,
    border: `1px solid ${sel ? c.tealEdge : c.line2}`,
    background: sel ? c.tealFog : 'transparent',
    color: sel ? c.teal : c.muted,
    opacity: enabled ? 1 : 0.55,
    transition: 'all .14s ease',
  } as const;
}

const primaryBtn = {
  ...mono,
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  gap: 8,
  cursor: 'pointer',
  fontSize: 13,
  padding: '10px 20px',
  borderRadius: 9,
  border: `1px solid ${c.tealEdge}`,
  background: c.tealFog,
  color: c.teal,
  fontWeight: 500,
};

const returnBtn = {
  ...mono,
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  gap: 9,
  cursor: 'pointer',
  fontSize: 13,
  padding: '12px 22px',
  borderRadius: 10,
  border: `1px solid ${c.tealEdge}`,
  background: c.tealFog,
  color: c.teal,
  fontWeight: 500,
};

const ghostBtn = {
  ...mono,
  cursor: 'pointer',
  fontSize: 12,
  padding: '8px 14px',
  borderRadius: 9,
  border: `1px solid ${c.line2}`,
  background: 'transparent',
  color: c.muted,
};
