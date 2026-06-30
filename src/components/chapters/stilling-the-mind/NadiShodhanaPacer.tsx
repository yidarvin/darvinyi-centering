import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';
import {
  NADI_PATTERNS,
  buildRound,
  sampleAt,
  pattern,
  PHASE_LABEL,
  type Nostril,
  type NadiSample,
} from './nadi';

// geometry
const VB = 240;
const CX = 120;
const ORB_CY = 150;
const ORB_MAX_R = 52;
const RING_R = 66;
const NOSTRIL_Y = 52;
const NOSTRIL_DX = 30;

function phaseColor(kind: 'inhale' | 'exhale'): string {
  return kind === 'exhale' ? c.teal : c.sky;
}

export function NadiShodhanaPacer() {
  const [patternId, setPatternId] = useLocalStorage<string>(
    'centering:widget:stilling-the-mind:pattern',
    'even',
  );
  const [totalRounds, setTotalRounds] = useLocalStorage<number>(
    'centering:widget:stilling-the-mind:rounds',
    0,
  );

  const pat = pattern(patternId);
  const { segments, cycle } = useMemo(() => buildRound(pat), [pat]);

  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [sessionRounds, setSessionRounds] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [announce, setAnnounce] = useState('');
  const [view, setView] = useState<NadiSample>(() => sampleAt(segments, cycle, 0, false));

  const elapsedRef = useRef(0);
  const lastSegRef = useRef(-1);
  const reducedRef = useRef(false);
  const viewRef = useRef(view);

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
      // clamp dt so a backgrounded tab does not jump the breath forward on resume
      elapsedRef.current += Math.min(0.25, (ts - last) / 1000);
      last = ts;
      const s = sampleAt(segments, cycle, elapsedRef.current, reducedRef.current);
      if (s.segIndex !== lastSegRef.current) {
        if (s.segIndex === 0 && lastSegRef.current === segments.length - 1) {
          setSessionRounds((n) => n + 1);
          setTotalRounds((n) => n + 1);
        }
        lastSegRef.current = s.segIndex;
        setAnnounce(`${PHASE_LABEL[s.kind]} through the ${s.nostril} nostril, ${s.secondsLeft} seconds`);
      }
      if (
        !reducedRef.current ||
        s.secondsLeft !== viewRef.current.secondsLeft ||
        s.segIndex !== viewRef.current.segIndex
      ) {
        setView(s);
        viewRef.current = s;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, segments, cycle, setTotalRounds]);

  function selectPattern(id: string) {
    if (id === patternId) return;
    const next = pattern(id);
    const built = buildRound(next);
    elapsedRef.current = 0;
    lastSegRef.current = -1;
    setSessionRounds(0);
    setPatternId(id);
    const s = sampleAt(built.segments, built.cycle, 0, reducedRef.current);
    setView(s);
    viewRef.current = s;
  }

  function toggleRun() {
    if (running) setRunning(false);
    else {
      setHasRun(true);
      setRunning(true);
    }
  }

  function reset() {
    setRunning(false);
    setHasRun(false);
    elapsedRef.current = 0;
    lastSegRef.current = -1;
    setSessionRounds(0);
    const s = sampleAt(segments, cycle, 0, reduced);
    setView(s);
    viewRef.current = s;
  }

  const idle = !running && !hasRun;
  const orbScale = idle ? 0.55 : view.scale;
  const orbR = ORB_MAX_R * orbScale;
  const color = idle ? c.teal : phaseColor(view.kind);
  const phaseWord = idle ? 'ready' : PHASE_LABEL[view.kind];
  const openNostril: Nostril = view.nostril;

  // the phase-progress ring
  const ringC = 2 * Math.PI * RING_R;
  const dash = idle || reduced ? 0 : view.progress * ringC;

  return (
    <WidgetShell
      id="09.2"
      name="nadi_shodhana"
      title="Alternate the breath, nostril by nostril"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {totalRounds} rounds paced
        </span>
      }
      footer={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, lineHeight: 1.5 }}>
          do not force the breath. let it stay smooth and quiet. if you feel lightheaded, stop and let it
          return to normal. the science of the longer exhale is in The Settled Body (ch.2).
        </span>
      }
    >
      <div style={{ padding: '16px 14px 18px' }}>
        {/* pattern selector */}
        <div role="group" aria-label="breathing pattern" style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {NADI_PATTERNS.map((p) => {
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
            viewBox={`0 0 ${VB} 220`}
            style={{ width: '100%', maxWidth: 290, height: 'auto', display: 'block' }}
            aria-hidden="true"
          >
            {/* nose bridge */}
            <path
              d={`M${CX} ${NOSTRIL_Y - 22} C ${CX - 5} ${NOSTRIL_Y - 8}, ${CX - 8} ${NOSTRIL_Y - 2}, ${CX - 10} ${NOSTRIL_Y + 2}`}
              fill="none"
              stroke={c.line2}
              strokeWidth={1.2}
            />
            <path
              d={`M${CX} ${NOSTRIL_Y - 22} C ${CX + 5} ${NOSTRIL_Y - 8}, ${CX + 8} ${NOSTRIL_Y - 2}, ${CX + 10} ${NOSTRIL_Y + 2}`}
              fill="none"
              stroke={c.line2}
              strokeWidth={1.2}
            />

            {/* two nostrils */}
            {(['left', 'right'] as Nostril[]).map((side) => {
              // viewer's perspective: left nostril drawn on the left of the figure
              const nx = side === 'left' ? CX - NOSTRIL_DX : CX + NOSTRIL_DX;
              const open = !idle && side === openNostril;
              const closed = !idle && side !== openNostril;
              return (
                <g key={side}>
                  <ellipse
                    cx={nx}
                    cy={NOSTRIL_Y}
                    rx={16}
                    ry={11}
                    fill={open ? `${color}33` : c.panel}
                    stroke={open ? color : c.line2}
                    strokeWidth={open ? 1.8 : 1.2}
                    opacity={closed ? 0.4 : 1}
                  />
                  {/* flow arrow on the open nostril: in points down, out points up */}
                  {open && (
                    <path
                      d={
                        view.kind === 'inhale'
                          ? `M${nx} ${NOSTRIL_Y - 4} L${nx} ${NOSTRIL_Y + 5} M${nx - 3} ${NOSTRIL_Y + 1} L${nx} ${NOSTRIL_Y + 5} L${nx + 3} ${NOSTRIL_Y + 1}`
                          : `M${nx} ${NOSTRIL_Y + 5} L${nx} ${NOSTRIL_Y - 4} M${nx - 3} ${NOSTRIL_Y - 1} L${nx} ${NOSTRIL_Y - 4} L${nx + 3} ${NOSTRIL_Y - 1}`
                      }
                      fill="none"
                      stroke={color}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {/* the finger closing the off nostril */}
                  {closed && (
                    <rect
                      x={nx - 6}
                      y={NOSTRIL_Y - 16}
                      width={12}
                      height={9}
                      rx={4}
                      fill={c.faint}
                      fillOpacity={0.5}
                      stroke={c.faint}
                      strokeWidth={1}
                    />
                  )}
                </g>
              );
            })}

            {/* faint guide circle */}
            <circle cx={CX} cy={ORB_CY} r={ORB_MAX_R} fill="none" stroke={c.line} strokeWidth={1} strokeDasharray="2 4" />

            {/* progress ring */}
            <circle
              cx={CX}
              cy={ORB_CY}
              r={RING_R}
              fill="none"
              stroke={c.line2}
              strokeWidth={2}
              opacity={0.5}
            />
            {!idle && !reduced && (
              <circle
                cx={CX}
                cy={ORB_CY}
                r={RING_R}
                fill="none"
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${ringC}`}
                transform={`rotate(-90 ${CX} ${ORB_CY})`}
              />
            )}

            {/* the breathing orb */}
            <circle cx={CX} cy={ORB_CY} r={orbR} fill={`${color}1f`} stroke={color} strokeWidth={1.5} />
            <circle cx={CX} cy={ORB_CY} r={Math.max(3, orbR * 0.1)} fill={color} />
          </svg>

          {/* the accessible read-out */}
          <div style={{ textAlign: 'center', marginTop: 6 }}>
            <div style={{ ...mono, fontSize: 13, letterSpacing: '.05em', color, textTransform: 'uppercase' }}>
              {phaseWord}
              {!idle && (
                <span style={{ color: c.faint, textTransform: 'none', letterSpacing: 0 }}>
                  {' · '}
                  {view.nostril} nostril
                </span>
              )}
            </div>
            {!idle && (
              <div style={{ ...mono, fontSize: 10.5, color: c.faint, marginTop: 3 }}>
                hold the {view.closed} nostril closed
              </div>
            )}
            <div
              style={{
                ...mono,
                fontSize: 34,
                fontWeight: 500,
                color: c.text,
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1.2,
                minHeight: 41,
                marginTop: 2,
              }}
            >
              {idle ? '·' : view.secondsLeft}
            </div>
          </div>
        </div>

        {/* the four phases of a round */}
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { t: `in · left`, exhale: false },
            { t: `out · right`, exhale: true },
            { t: `in · right`, exhale: false },
            { t: `out · left`, exhale: true },
          ].map((p, i) => {
            const here = !idle && view.segIndex === i;
            const col = p.exhale ? c.teal : c.sky;
            return (
              <span
                key={i}
                style={{
                  ...mono,
                  fontSize: 10.5,
                  color: here ? col : c.faint,
                  border: `1px solid ${here ? col + '88' : c.line2}`,
                  background: here ? `${col}14` : 'transparent',
                  borderRadius: 6,
                  padding: '3px 8px',
                  transition: 'all .14s ease',
                }}
              >
                {p.t}
              </span>
            );
          })}
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
            {sessionRounds} {sessionRounds === 1 ? 'round' : 'rounds'} this sit
          </span>
        </div>

        {/* pattern note */}
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '12px 0 0' }}>{pat.note}</p>

        <span role="status" aria-live="polite" className="visually-hidden">
          {announce}
        </span>
      </div>
    </WidgetShell>
  );
}
