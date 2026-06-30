import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';
import {
  PATTERNS,
  buildSegments,
  sampleAt,
  waveSamples,
  phaseColor,
  PHASE_LABEL,
  type Pattern,
  type Sample,
} from './breath';

// main visual geometry
const VB = 264;
const CX = 132;
const CY = 110;
const ORB_MAX_R = 62;
const RING_R = 90;

function ringPoint(t: number, cycle: number, r = RING_R) {
  const ang = (-90 + 360 * (t / cycle)) * (Math.PI / 180);
  return { x: CX + r * Math.cos(ang), y: CY + r * Math.sin(ang) };
}

function pattern(id: string): Pattern {
  return PATTERNS.find((p) => p.id === id) ?? PATTERNS[0];
}

export function BreathingPacer() {
  const [patternId, setPatternId] = useLocalStorage<string>('centering:widget:the-settled-body:pattern', 'coherent');
  const [paced, setPaced] = useLocalStorage<number>('centering:widget:the-settled-body:paced', 0);

  const pat = pattern(patternId);
  const { segments, cycle } = useMemo(() => buildSegments(pat), [pat]);

  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [announce, setAnnounce] = useState('');
  const [view, setView] = useState<Sample>(() => sampleAt(segments, cycle, 0, false));

  const elapsedRef = useRef(0);
  const lastSegRef = useRef(-1);
  const reducedRef = useRef(false);
  const viewRef = useRef(view);

  // honor reduced-motion: no continuous orb scaling or marker drift
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

  // the clock: advance elapsed time while running and sample the pattern
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last: number | null = null;
    const tick = (ts: number) => {
      if (last === null) last = ts;
      // clamp dt so a backgrounded tab (rAF pauses while hidden) does not jump
      // the breath forward on resume, and a stutter does not lurch the orb
      elapsedRef.current += Math.min(0.25, (ts - last) / 1000);
      last = ts;
      const s = sampleAt(segments, cycle, elapsedRef.current, reducedRef.current);
      if (s.segIndex !== lastSegRef.current) {
        if (s.segIndex === 0 && lastSegRef.current === segments.length - 1) {
          setCycles((n) => n + 1);
          setPaced((n) => n + 1);
        }
        lastSegRef.current = s.segIndex;
        setAnnounce(`${PHASE_LABEL[s.kind]}, ${s.secondsLeft} seconds`);
      }
      // in reduced mode, only re-render on a phase or whole-second change
      if (!reducedRef.current || s.secondsLeft !== viewRef.current.secondsLeft || s.segIndex !== viewRef.current.segIndex) {
        setView(s);
        viewRef.current = s;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, segments, cycle, setPaced]);

  function selectPattern(id: string) {
    if (id === patternId) return;
    const next = pattern(id);
    const built = buildSegments(next);
    elapsedRef.current = 0;
    lastSegRef.current = -1;
    setCycles(0);
    setPatternId(id);
    const s = sampleAt(built.segments, built.cycle, 0, reducedRef.current);
    setView(s);
    viewRef.current = s;
  }

  function toggleRun() {
    if (running) {
      setRunning(false);
    } else {
      setHasRun(true);
      setRunning(true);
    }
  }

  function reset() {
    setRunning(false);
    setHasRun(false);
    elapsedRef.current = 0;
    lastSegRef.current = -1;
    setCycles(0);
    const s = sampleAt(segments, cycle, 0, reduced);
    setView(s);
    viewRef.current = s;
  }

  const idle = !running && !hasRun;
  const orbScale = idle ? 0.6 : view.scale;
  const orbR = ORB_MAX_R * orbScale;
  const color = idle ? c.teal : phaseColor(view.kind);
  const phaseWord = idle ? 'ready' : PHASE_LABEL[view.kind];

  // ring arcs, one per phase, proportional to its seconds
  const arcs = useMemo(() => {
    let t = 0;
    return segments.map((seg) => {
      const a0 = t;
      const a1 = t + seg.sec;
      t = a1;
      const p0 = ringPoint(a0, cycle);
      const p1 = ringPoint(a1, cycle);
      const large = a1 - a0 > cycle / 2 ? 1 : 0;
      return {
        kind: seg.kind,
        d: `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${RING_R} ${RING_R} 0 ${large} 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`,
      };
    });
  }, [segments, cycle]);

  const marker = ringPoint(view.cyclePos * cycle, cycle);

  // the breath-shape strip (one cycle), with the exhale tinted
  const wave = useMemo(() => waveSamples(segments, cycle, 96), [segments, cycle]);
  const waveW = 480;
  const waveH = 60;
  const wavePts = wave
    .map((s, i) => {
      const x = (i / (wave.length - 1)) * waveW;
      const y = waveH - 6 - (s - 0.2) * (waveH - 16);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const exhaleBands = useMemo(() => {
    let t = 0;
    const out: { x: number; w: number }[] = [];
    for (const seg of segments) {
      if (seg.kind === 'exhale') out.push({ x: (t / cycle) * waveW, w: (seg.sec / cycle) * waveW });
      t += seg.sec;
    }
    return out;
  }, [segments, cycle]);
  const playheadX = view.cyclePos * waveW;

  // the in / hold / out read-out, exhale emphasized
  const counts = pat.phases.map((ph) => ({ kind: ph.kind, sec: ph.sec }));

  return (
    <WidgetShell
      id="02.1"
      name="breathing_pacer"
      title="Pace a breath, feel the brake"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {paced} breaths paced
        </span>
      }
      footer={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11.5, color: c.faint }}>
            do not force the breath. if you feel lightheaded, stop and let it return to normal.
          </span>
        </div>
      }
    >
      <div style={{ padding: '16px 14px 18px' }}>
        {/* pattern selector */}
        <div role="group" aria-label="breathing pattern" style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {PATTERNS.map((p) => {
            const active = p.id === patternId;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectPattern(p.id)}
                style={{
                  ...mono,
                  flex: '1 1 auto',
                  cursor: 'pointer',
                  fontSize: 12.5,
                  padding: '9px 10px',
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

        {/* the pacer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg
            viewBox={`0 0 ${VB} 212`}
            style={{ width: '100%', maxWidth: 300, height: 'auto', display: 'block' }}
            aria-hidden="true"
          >
            {/* faint full-size guide */}
            <circle cx={CX} cy={CY} r={ORB_MAX_R} fill="none" stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

            {/* phase ring: arcs proportional to each phase, exhale in teal */}
            {arcs.map((a, i) => (
              <path key={i} d={a.d} fill="none" stroke={`${phaseColor(a.kind)}`} strokeWidth={4} strokeLinecap="round" opacity={idle ? 0.35 : a.kind === view.kind ? 1 : 0.4} />
            ))}

            {/* the breathing orb */}
            <circle cx={CX} cy={CY} r={orbR} fill={`${color}1f`} stroke={color} strokeWidth={1.5} />
            <circle cx={CX} cy={CY} r={Math.max(3, orbR * 0.1)} fill={color} />

            {/* the position marker */}
            {!idle && <circle cx={marker.x} cy={marker.y} r={4.5} fill={color} stroke={c.panel2} strokeWidth={1.5} />}
          </svg>

          {/* phase word + countdown (the accessible read-out) */}
          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <div style={{ ...mono, fontSize: 13, letterSpacing: '.06em', color, textTransform: 'uppercase' }}>
              {phaseWord}
              {view.kind === 'exhale' && !idle && (
                <span style={{ color: c.faint, textTransform: 'none', letterSpacing: 0 }}> · the brake</span>
              )}
            </div>
            <div style={{ ...mono, fontSize: 34, fontWeight: 500, color: c.text, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2, minHeight: 41 }}>
              {idle ? '·' : view.secondsLeft}
            </div>
          </div>
        </div>

        {/* the breath-shape strip */}
        <svg
          viewBox={`0 0 ${waveW} ${waveH}`}
          style={{ width: '100%', height: 'auto', display: 'block', marginTop: 6 }}
          aria-hidden="true"
        >
          {exhaleBands.map((b, i) => (
            <rect key={i} x={b.x} y={4} width={b.w} height={waveH - 8} fill={c.tealFog} />
          ))}
          <polyline points={wavePts} fill="none" stroke={c.teal} strokeWidth={2} strokeLinejoin="round" opacity={0.85} />
          {!idle && <line x1={playheadX} y1={2} x2={playheadX} y2={waveH - 2} stroke={color} strokeWidth={1.5} />}
        </svg>
        <div style={{ ...mono, fontSize: 10.5, color: c.faint, textAlign: 'center', marginTop: 2 }}>
          one breath, drawn. the teal band is the exhale.
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
              border: `1px solid ${c.tealEdge}`,
              background: c.tealFog,
              color: c.teal,
              fontWeight: 500,
            }}
          >
            {running ? <Pause size={14} /> : <Play size={14} />}
            {running ? 'pause' : hasRun ? 'resume' : 'start'}
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
          <span style={{ ...mono, fontSize: 11.5, color: c.faint, marginLeft: 'auto' }}>
            {cycles} {cycles === 1 ? 'breath' : 'breaths'} this round
          </span>
        </div>

        {/* in / hold / out, exhale emphasized */}
        <div style={{ display: 'flex', gap: 7, marginTop: 14, flexWrap: 'wrap' }}>
          {counts.map((ph, i) => {
            const isOut = ph.kind === 'exhale';
            const col = phaseColor(ph.kind);
            return (
              <span
                key={i}
                style={{
                  ...mono,
                  fontSize: 11,
                  color: col,
                  border: `1px solid ${col}${isOut ? '88' : '44'}`,
                  background: isOut ? c.tealFog : 'transparent',
                  borderRadius: 6,
                  padding: '3px 9px',
                }}
              >
                {PHASE_LABEL[ph.kind].replace('breathe ', '')} {ph.sec % 1 === 0 ? ph.sec : ph.sec.toFixed(1)}s
              </span>
            );
          })}
          <span style={{ ...mono, fontSize: 11, color: c.faint, padding: '3px 4px' }}>{pat.bpm}</span>
        </div>

        {/* the pattern note */}
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '12px 0 0' }}>{pat.note}</p>

        <span role="status" aria-live="polite" className="visually-hidden">
          {announce}
        </span>
      </div>
    </WidgetShell>
  );
}
