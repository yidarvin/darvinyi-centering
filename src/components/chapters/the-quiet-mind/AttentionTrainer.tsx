import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, CornerDownLeft } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

type Phase = 'idle' | 'running' | 'paused' | 'done';

const DURATIONS = [
  { label: '1 min', sec: 60 },
  { label: '3 min', sec: 180 },
  { label: '5 min', sec: 300 },
];

const DOT_CAP = 48;

function fmt(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// an honest read of a finished sit. the number is never a score.
function verdict(n: number): string {
  if (n === 0)
    return 'Zero catches. Either you stayed unusually settled, or the mind wandered without getting caught. Both are normal. There is nothing to fix here.';
  if (n <= 3)
    return `${n} ${n === 1 ? 'return' : 'returns'}. A handful of catches. Each one was a full rep of the only move that matters.`;
  if (n <= 9)
    return `${n} returns. That is not a wandering mind failing. That is ${n} clean reps of noticing and coming back.`;
  return `${n} returns. A busy mind, caught ${n} times. That is the exercise working, not the exercise failing.`;
}

/**
 * widget_03.1, the attention trainer. The reader rests attention on a breathing
 * anchor, and every time they notice the mind has wandered they tap return. The
 * tap is the rep. The whole teaching is in the framing: the return is the win,
 * not the staying, so a "busy" sit with many returns is a good sit. Lifetime
 * returns and completed sits persist locally.
 */
export function AttentionTrainer() {
  const [duration, setDuration] = useLocalStorage<number>('centering:widget:the-quiet-mind:duration', 180);
  const [lifetime, setLifetime] = useLocalStorage<number>('centering:widget:the-quiet-mind:returns', 0);
  const [sits, setSits] = useLocalStorage<number>('centering:widget:the-quiet-mind:sits', 0);

  const [phase, setPhase] = useState<Phase>('idle');
  const [remaining, setRemaining] = useState<number>(duration);
  const [runReturns, setRunReturns] = useState(0);
  const [announce, setAnnounce] = useState('');
  const [reduced, setReduced] = useState(false);
  const interval = useRef<number | null>(null);
  // mirrors runReturns synchronously, so fast taps inside one frame all count
  const runReturnsRef = useRef(0);

  // honor reduced motion: the anchor holds still instead of breathing
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // the countdown clock, one tick a second while running
  useEffect(() => {
    if (phase !== 'running') return;
    interval.current = window.setInterval(() => {
      setRemaining((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => {
      if (interval.current !== null) window.clearInterval(interval.current);
    };
  }, [phase]);

  // the sit finishes when the clock runs out
  useEffect(() => {
    if (phase === 'running' && remaining === 0) {
      setPhase('done');
      setSits((s) => s + 1);
      setAnnounce(`Sit complete. ${runReturns} ${runReturns === 1 ? 'return' : 'returns'}.`);
    }
  }, [remaining, phase, runReturns, setSits]);

  function start() {
    setRemaining(duration);
    runReturnsRef.current = 0;
    setRunReturns(0);
    setPhase('running');
    setAnnounce('Sit started. Rest your attention on the breath.');
  }

  function noticeReturn() {
    if (phase !== 'running') return;
    runReturnsRef.current += 1;
    const next = runReturnsRef.current;
    setRunReturns(next);
    setLifetime((n) => n + 1);
    setAnnounce(`Returned. ${next} this sit.`);
  }

  function reset() {
    setPhase('idle');
    setRemaining(duration);
    runReturnsRef.current = 0;
    setRunReturns(0);
  }

  function selectDuration(sec: number) {
    if (phase === 'running' || phase === 'paused') return;
    setDuration(sec);
    setRemaining(sec);
    setPhase('idle');
    runReturnsRef.current = 0;
    setRunReturns(0);
  }

  const active = phase === 'running' || phase === 'paused';
  const canPick = phase === 'idle' || phase === 'done';

  return (
    <WidgetShell
      id="03.1"
      name="attention_trainer"
      title="Train the return"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {lifetime} {lifetime === 1 ? 'return' : 'returns'} logged
        </span>
      }
      footer={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11.5, color: c.faint }}>
            wandering is not failure. catching it is the rep. there is no count to beat.
          </span>
          {(lifetime > 0 || sits > 0) && (
            <button
              type="button"
              onClick={() => {
                setLifetime(0);
                setSits(0);
              }}
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
              <RotateCcw size={12} /> reset totals
            </button>
          )}
        </div>
      }
    >
      <div style={{ padding: '16px 16px 18px' }}>
        {/* the teaching, stated once and plainly */}
        <p style={{ fontSize: 14, lineHeight: 1.6, color: c.muted, margin: '0 0 16px' }}>
          Rest your attention on the breath. It will wander. The instant you notice it has gone, that
          noticing is the win. Tap return and bring it back, gently, no scolding.{' '}
          <span style={{ color: c.text }}>The rep is the return, not the staying.</span>
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

        {/* the anchor + read-out */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <svg viewBox="0 0 160 160" style={{ width: '100%', maxWidth: 168, height: 'auto', display: 'block' }} aria-hidden="true">
            <circle cx={80} cy={80} r={58} fill="none" stroke={c.line} strokeWidth={1} strokeDasharray="2 5" />
            <g
              style={
                reduced || !active
                  ? undefined
                  : { animation: 'breathe 6s ease-in-out infinite', transformBox: 'fill-box', transformOrigin: 'center' }
              }
            >
              <circle cx={80} cy={80} r={42} fill={c.tealFog} stroke={c.teal} strokeWidth={active ? 1.6 : 1} strokeOpacity={active ? 1 : 0.5} />
              <circle cx={80} cy={80} r={5} fill={c.teal} fillOpacity={active ? 1 : 0.5} />
            </g>
          </svg>
          <div style={{ ...mono, fontSize: 11, color: c.faint, letterSpacing: '.04em' }}>
            {active ? 'rest attention here' : 'the breath'}
          </div>

          {/* the clock + this-sit count, while a sit is live */}
          {active && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...mono, fontSize: 26, fontWeight: 500, color: c.text, fontVariantNumeric: 'tabular-nums' }} role="timer" aria-live="off">
                  {fmt(remaining)}
                </div>
                <div style={{ ...mono, fontSize: 10, color: c.faint }}>left</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...mono, fontSize: 26, fontWeight: 500, color: c.teal, fontVariantNumeric: 'tabular-nums' }}>
                  {runReturns}
                </div>
                <div style={{ ...mono, fontSize: 10, color: c.faint }}>{runReturns === 1 ? 'return' : 'returns'}</div>
              </div>
            </div>
          )}
        </div>

        {/* the dot tally for this sit */}
        {active && runReturns > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', marginTop: 14 }}>
            {Array.from({ length: Math.min(runReturns, DOT_CAP) }).map((_, i) => (
              <span key={i} style={{ width: 7, height: 7, borderRadius: 99, background: c.teal, opacity: 0.85 }} />
            ))}
            {runReturns > DOT_CAP && <span style={{ ...mono, fontSize: 11, color: c.faint }}>+{runReturns - DOT_CAP}</span>}
          </div>
        )}

        {/* controls */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 18 }}>
          {phase === 'running' && (
            <button
              type="button"
              onClick={noticeReturn}
              style={{
                ...mono,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                padding: '15px 28px',
                borderRadius: 12,
                border: `1px solid ${c.tealEdge}`,
                background: c.tealFog,
                color: c.teal,
                width: '100%',
                maxWidth: 320,
                justifyContent: 'center',
              }}
            >
              <CornerDownLeft size={17} /> I noticed, return
            </button>
          )}

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
        </div>

        {/* the finished read-out */}
        {phase === 'done' && (
          <div
            style={{
              marginTop: 18,
              border: `1px solid ${c.tealEdge}`,
              borderRadius: 11,
              background: c.tealFog,
              padding: '14px 15px',
            }}
          >
            <div style={{ ...mono, fontSize: 11, color: c.tealDim, marginBottom: 7 }}>sit complete</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: c.text, margin: 0 }}>{verdict(runReturns)}</p>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, color: c.faint, margin: '10px 0 0' }}>
              {sits} {sits === 1 ? 'sit' : 'sits'} done · {lifetime} total {lifetime === 1 ? 'return' : 'returns'}
            </p>
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
