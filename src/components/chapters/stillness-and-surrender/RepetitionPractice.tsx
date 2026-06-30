import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, CornerDownLeft } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

/**
 * widget_12.2, the repetition practice. The secular distillation of every method in
 * this chapter: a single repeated anchor, a posture of letting go rather than
 * effortful focus, and a gentle return whenever the mind wanders. No metaphysics
 * required. The teaching move is the RETURN: noticing you drifted and coming back
 * without scolding is not the interruption of the practice, it is the practice.
 *
 * The orb breathes on a slow ten-second cycle (in four, out six, the longer exhale
 * of The Settled Body). The chosen word settles on the out-breath. Reduced motion
 * freezes the orb and keeps the word and the counters.
 */

const WORDS = [
  { label: 'peace', word: 'peace' },
  { label: 'one', word: 'one' },
  { label: 'let go', word: 'let · go' },
  { label: 'the breath', word: '(the breath)' },
];

const CYCLE = 10; // seconds: a full breath
const IN = 4; // seconds in
const OUT = CYCLE - IN; // seconds out
const VB = 220;
const CXY = VB / 2;
const R_MIN = 34;
const R_MAX = 86;

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

interface Frame {
  scale: number; // 0..1
  phase: 'in' | 'out';
  rep: number; // completed repetitions
}

function sampleAt(elapsed: number): Frame {
  const rep = Math.floor(elapsed / CYCLE);
  const within = elapsed % CYCLE;
  if (within < IN) {
    return { scale: easeInOut(within / IN), phase: 'in', rep };
  }
  return { scale: 1 - easeInOut((within - IN) / OUT), phase: 'out', rep };
}

export function RepetitionPractice() {
  const [wordIdx, setWordIdx] = useLocalStorage<number>(
    'centering:widget:stillness-and-surrender:word',
    0,
  );
  const [custom, setCustom] = useLocalStorage<string>(
    'centering:widget:stillness-and-surrender:custom',
    '',
  );
  const [sessions, setSessions] = useLocalStorage<number>(
    'centering:widget:stillness-and-surrender:sessions',
    0,
  );

  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [reps, setReps] = useState(0);
  const [returns, setReturns] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [view, setView] = useState<Frame>({ scale: 0.45, phase: 'in', rep: 0 });
  const [justReturned, setJustReturned] = useState(false);

  const elapsedRef = useRef(0);
  const lastRepRef = useRef(0);
  const reducedRef = useRef(false);
  const returnFlash = useRef<number | null>(null);

  const usingCustom = wordIdx === -1;
  const activeWord = usingCustom ? custom.trim() || '…' : WORDS[wordIdx]?.word ?? WORDS[0].word;

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    setReduced(mq.matches);
    reducedRef.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
      reducedRef.current = e.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // the clock
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last: number | null = null;
    const tick = (ts: number) => {
      if (last === null) last = ts;
      // clamp dt so a backgrounded tab does not jump forward on resume
      elapsedRef.current += Math.min(0.25, (ts - last) / 1000);
      last = ts;
      const f = sampleAt(elapsedRef.current);
      setSeconds(Math.floor(elapsedRef.current));
      if (f.rep !== lastRepRef.current) {
        lastRepRef.current = f.rep;
        setReps(f.rep);
      }
      if (!reducedRef.current) setView(f);
      else setView((v) => (v.rep === f.rep ? v : f));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  function toggleRun() {
    if (running) {
      setRunning(false);
    } else {
      if (!hasRun) setSessions((n) => n + 1);
      setHasRun(true);
      setRunning(true);
    }
  }

  function reset() {
    setRunning(false);
    setHasRun(false);
    elapsedRef.current = 0;
    lastRepRef.current = 0;
    setReps(0);
    setReturns(0);
    setSeconds(0);
    setView({ scale: 0.45, phase: 'in', rep: 0 });
  }

  function doReturn() {
    setReturns((n) => n + 1);
    setJustReturned(true);
    if (returnFlash.current !== null) window.clearTimeout(returnFlash.current);
    returnFlash.current = window.setTimeout(() => setJustReturned(false), 2600);
    if (!running) {
      if (!hasRun) setSessions((n) => n + 1);
      setHasRun(true);
      setRunning(true);
    }
  }

  useEffect(
    () => () => {
      if (returnFlash.current !== null) window.clearTimeout(returnFlash.current);
    },
    [],
  );

  const idle = !running && !hasRun;
  const scale = idle ? 0.45 : reduced ? 0.74 : view.scale;
  const r = R_MIN + (R_MAX - R_MIN) * scale;
  const phaseLabel = idle ? 'ready' : reduced ? 'repeat' : view.phase === 'in' ? 'breathe in' : 'let it settle';

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <WidgetShell
      id="12.2"
      name="repetition"
      title="A word to return to"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {sessions} {sessions === 1 ? 'session' : 'sessions'}
        </span>
      }
      footer={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, lineHeight: 1.55 }}>
          this is the bare structure under the prayers in this chapter, with the belief left out. nothing
          to force and nothing to achieve. the longer exhale is the brake from The Settled Body (ch.2), and
          the gentle return is the rep from The Quiet Mind (ch.3).
        </span>
      }
    >
      <div style={{ padding: '16px 14px 18px' }}>
        {/* anchor selection */}
        <div style={{ ...mono, fontSize: 10.5, color: c.faint, marginBottom: 8 }}>
          {'// '}choose an anchor
        </div>
        <div
          role="group"
          aria-label="anchor word"
          style={{ display: 'flex', gap: 7, marginBottom: 9, flexWrap: 'wrap' }}
        >
          {WORDS.map((w, i) => {
            const active = !usingCustom && wordIdx === i;
            return (
              <button
                key={w.label}
                type="button"
                aria-pressed={active}
                onClick={() => setWordIdx(i)}
                style={{
                  ...mono,
                  flex: '1 1 auto',
                  cursor: 'pointer',
                  fontSize: 12.5,
                  padding: '8px 10px',
                  borderRadius: 9,
                  border: `1px solid ${active ? c.tealEdge : c.line2}`,
                  background: active ? c.tealFog : 'transparent',
                  color: active ? c.teal : c.muted,
                  transition: 'all .14s ease',
                }}
              >
                {w.label}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setWordIdx(-1);
          }}
          onFocus={() => custom.trim() && setWordIdx(-1)}
          placeholder="…or type your own calming word"
          aria-label="your own anchor word"
          style={{
            ...mono,
            width: '100%',
            boxSizing: 'border-box',
            background: usingCustom ? c.tealFog : c.panel2,
            color: c.text,
            border: `1px solid ${usingCustom ? c.tealEdge : c.line}`,
            borderRadius: 8,
            padding: '9px 11px',
            fontSize: 13,
            marginBottom: 16,
          }}
        />

        {/* the orb */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg
            viewBox={`0 0 ${VB} ${VB}`}
            style={{ width: '100%', maxWidth: 250, height: 'auto', display: 'block' }}
            aria-hidden="true"
          >
            <circle cx={CXY} cy={CXY} r={R_MAX} fill="none" stroke={c.line} strokeWidth={1} strokeDasharray="2 5" />
            <circle cx={CXY} cy={CXY} r={r} fill={c.tealFog} stroke={c.teal} strokeWidth={1.5} />
            <text
              x={CXY}
              y={CXY}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ ...mono, fontSize: 17, fill: c.teal, letterSpacing: '.02em' }}
            >
              {activeWord}
            </text>
          </svg>

          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <div style={{ ...mono, fontSize: 12.5, letterSpacing: '.05em', color: idle ? c.faint : c.teal, textTransform: 'uppercase' }}>
              {phaseLabel}
            </div>
            <div style={{ ...mono, fontSize: 11, color: c.faint, marginTop: 4 }}>
              {idle ? 'let the word return on its own, once a breath' : `${reps} ${reps === 1 ? 'repetition' : 'repetitions'} · ${mins}:${String(secs).padStart(2, '0')}`}
            </div>
          </div>
        </div>

        {/* the return: the actual practice */}
        <div
          style={{
            marginTop: 16,
            border: `1px solid ${justReturned ? c.tealEdge : c.line2}`,
            background: justReturned ? c.tealFog : 'transparent',
            borderRadius: 11,
            padding: '13px 14px',
            transition: 'all .2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={doReturn}
              style={{
                ...mono,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                fontSize: 13,
                padding: '10px 16px',
                borderRadius: 9,
                border: `1px solid ${c.tealEdge}`,
                background: c.tealFog,
                color: c.teal,
                fontWeight: 500,
              }}
            >
              <CornerDownLeft size={14} /> I drifted, return
            </button>
            <span style={{ ...mono, fontSize: 11.5, color: c.faint }}>
              {returns} {returns === 1 ? 'return' : 'returns'} this sit
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.55,
              color: justReturned ? c.prose : c.muted,
              margin: '10px 0 0',
            }}
            aria-live="polite"
          >
            {justReturned
              ? 'Good. Noticing you wandered is not a failure. That noticing is the whole exercise. Come back to the word, gently, with no comment.'
              : 'When you notice the mind has wandered, and it will, press return. Each return is a rep, not a lapse. There is no score to lose.'}
          </p>
        </div>

        {/* controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={toggleRun}
            style={{
              ...mono,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              fontSize: 13,
              padding: '10px 18px',
              borderRadius: 9,
              border: `1px solid ${c.line2}`,
              background: c.panel,
              color: c.text,
              fontWeight: 500,
            }}
          >
            {running ? <Pause size={14} /> : <Play size={14} />}
            {running ? 'pause' : hasRun ? 'resume' : 'start the pulse'}
          </button>
          {hasRun && (
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
                padding: '10px 13px',
                borderRadius: 9,
                border: `1px solid ${c.line2}`,
                background: 'transparent',
                color: c.muted,
              }}
            >
              <RotateCcw size={12} /> reset
            </button>
          )}
        </div>

        <span role="status" aria-live="polite" className="visually-hidden">
          {justReturned ? 'Returned to the anchor word.' : ''}
        </span>
      </div>
    </WidgetShell>
  );
}
