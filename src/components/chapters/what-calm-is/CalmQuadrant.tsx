import { useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent } from 'react';
import { CornerDownRight, Plus, RotateCcw, X } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { MAP, LOW_ROW_NOTE, quadAt, ex, ay, xe, ya } from './calmMap';
import { CalmMapBackdrop } from './CalmMapBackdrop';

const monoFamily = mono.fontFamily;

interface Pin {
  id: string;
  label: string;
  e: number;
  a: number;
}

const STEP = 0.05;

function bucket(v: number): string {
  if (v < 0.34) return 'low';
  if (v < 0.67) return 'middling';
  return 'high';
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function shortLabel(label: string): string {
  const l = label.trim();
  if (!l) return '';
  return l.length > 18 ? `${l.slice(0, 17)}…` : l;
}

export function CalmQuadrant() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pins, setPins] = useLocalStorage<Pin[]>('centering:ex:what-calm-is:calm-quadrant', []);
  const [puck, setPuck] = useState({ e: 0.5, a: 0.5 });
  const [label, setLabel] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');
  const [dragging, setDragging] = useState(false);
  // false until the reader first places a state, so we do not assert a quadrant
  // (or read the boundary at dead center) before they have moved the marker
  const [touched, setTouched] = useState(false);

  const quad = quadAt(puck.e, puck.a);
  const lowRow = puck.a < 0.5;
  const puckColor = touched ? quad.color : c.muted;

  function moveTo(e: number, a: number, clearSelection = true) {
    const ne = clamp01(e);
    const na = clamp01(a);
    setPuck({ e: ne, a: na });
    setTouched(true);
    if (clearSelection) setSelectedId(null);
    const q = quadAt(ne, na);
    setAnnounce(`${q.label}. engagement ${bucket(ne)}, arousal ${bucket(na)}.`);
  }

  function pointerToEA(clientX: number, clientY: number): { e: number; a: number } | null {
    const svg = svgRef.current;
    if (!svg) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const loc = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return { e: xe(loc.x), a: ya(loc.y) };
  }

  function onPointerDown(ev: ReactPointerEvent<SVGSVGElement>) {
    const pos = pointerToEA(ev.clientX, ev.clientY);
    if (!pos) return;
    moveTo(pos.e, pos.a);
    setDragging(true);
    svgRef.current?.setPointerCapture(ev.pointerId);
  }
  function onPointerMove(ev: ReactPointerEvent<SVGSVGElement>) {
    if (!dragging) return;
    const pos = pointerToEA(ev.clientX, ev.clientY);
    if (pos) moveTo(pos.e, pos.a);
  }
  function endDrag(ev: ReactPointerEvent<SVGSVGElement>) {
    setDragging(false);
    if (svgRef.current?.hasPointerCapture(ev.pointerId)) {
      svgRef.current.releasePointerCapture(ev.pointerId);
    }
  }

  function onKeyDown(ev: KeyboardEvent<SVGSVGElement>) {
    let { e, a } = puck;
    switch (ev.key) {
      case 'ArrowLeft':
        e -= STEP;
        break;
      case 'ArrowRight':
        e += STEP;
        break;
      case 'ArrowUp':
        a += STEP;
        break;
      case 'ArrowDown':
        a -= STEP;
        break;
      default:
        return;
    }
    ev.preventDefault();
    moveTo(e, a);
  }

  function pinIt() {
    const id = `p_${Date.now().toString(36)}_${pins.length}`;
    const next: Pin = { id, label: label.trim() || 'unnamed state', e: puck.e, a: puck.a };
    setPins((prev) => [...prev, next]);
    setSelectedId(id);
    setLabel('');
  }

  function selectPin(p: Pin) {
    setPuck({ e: p.e, a: p.a });
    setTouched(true);
    setLabel(p.label === 'unnamed state' ? '' : p.label);
    setSelectedId(p.id);
    setAnnounce(`${quadAt(p.e, p.a).label}. ${p.label}.`);
  }

  function removeSelected() {
    if (!selectedId) return;
    setPins((prev) => prev.filter((p) => p.id !== selectedId));
    setSelectedId(null);
  }

  const px = ex(puck.e);
  const py = ay(puck.a);

  return (
    <WidgetShell
      id="01.1"
      name="calm_quadrant"
      title="Place a recent state on the map"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {pins.length} pinned
        </span>
      }
      footer={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11.5, color: c.faint }}>
            tap the map or use the arrow keys. there is no good or bad square, only an honest one.
          </span>
          {pins.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setPins([]);
                setSelectedId(null);
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
              <RotateCcw size={12} /> clear pins
            </button>
          )}
        </div>
      }
    >
      <div style={{ padding: '14px 14px 16px' }}>
        <p
          id="cq-help"
          style={{ fontSize: 13, lineHeight: 1.55, color: c.muted, margin: '0 0 12px' }}
        >
          Think of a state you were in recently. Move the marker to where it sat: up for an activated
          body, down for a settled one, right if you were in contact with the moment, left if you had
          checked out.
        </p>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${MAP.vbW} ${MAP.vbH}`}
          style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'none', cursor: 'pointer' }}
          role="application"
          aria-label="Calm map. Arrow keys move the marker: left and right change engagement, up and down change arousal."
          aria-describedby="cq-help"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        >
          <CalmMapBackdrop />

          {/* saved pins */}
          {pins.map((p) => {
            const isSel = p.id === selectedId;
            const q = quadAt(p.e, p.a);
            return (
              <g
                key={p.id}
                onPointerDown={(ev) => {
                  ev.stopPropagation();
                  selectPin(p);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={ex(p.e)} cy={ay(p.a)} r={9} fill="transparent" />
                {isSel && <circle cx={ex(p.e)} cy={ay(p.a)} r={6.5} fill="none" stroke={q.color} strokeWidth={1.4} />}
                <circle cx={ex(p.e)} cy={ay(p.a)} r={3.4} fill={q.color} opacity={isSel ? 1 : 0.85} />
                {shortLabel(p.label) && (
                  <text
                    x={p.e > 0.62 ? ex(p.e) - 7 : ex(p.e) + 7}
                    y={ay(p.a) + 3}
                    textAnchor={p.e > 0.62 ? 'end' : 'start'}
                    fontFamily={monoFamily}
                    fontSize={8.2}
                    fill={isSel ? q.color : c.faint}
                  >
                    {shortLabel(p.label)}
                  </text>
                )}
              </g>
            );
          })}

          {/* puck guide lines */}
          <line x1={px} y1={MAP.y0} x2={px} y2={MAP.y1} stroke={touched ? quad.edge : c.line2} strokeWidth={0.8} strokeDasharray="3 3" />
          <line x1={MAP.x0} y1={py} x2={MAP.x1} y2={py} stroke={touched ? quad.edge : c.line2} strokeWidth={0.8} strokeDasharray="3 3" />

          {/* the active marker */}
          <circle cx={px} cy={py} r={8.5} fill={touched ? quad.fog : c.panel} stroke={puckColor} strokeWidth={1} />
          <circle cx={px} cy={py} r={4.2} fill={puckColor} />
        </svg>

        {/* pinned states, as a keyboard-reachable list: the map above only takes a
            pointer to select or remove a pin, so this row gives the same two moves
            to anyone using the keyboard */}
        {pins.length > 0 && (
          <div
            role="group"
            aria-label="your pinned states"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 12 }}
          >
            {pins.map((p) => {
              const isSel = p.id === selectedId;
              const q = quadAt(p.e, p.a);
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={isSel}
                  onClick={() => selectPin(p)}
                  style={{
                    ...mono,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                    fontSize: 11.5,
                    padding: '6px 10px',
                    borderRadius: 8,
                    border: `1px solid ${isSel ? q.edge : c.line2}`,
                    background: isSel ? q.fog : 'transparent',
                    color: isSel ? q.color : c.muted,
                    transition: 'all .14s ease',
                  }}
                >
                  <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 99, background: q.color, flexShrink: 0 }} />
                  {shortLabel(p.label) || 'unnamed state'}
                </button>
              );
            })}
          </div>
        )}

        {/* read-out */}
        {touched ? (
          <div
            style={{
              marginTop: 14,
              border: `1px solid ${quad.edge}`,
              borderRadius: 11,
              background: quad.fog,
              padding: '13px 14px 15px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 7, flexWrap: 'wrap' }}>
              <span
                style={{
                  ...mono,
                  fontSize: 11,
                  color: quad.color,
                  border: `1px solid ${quad.edge}`,
                  borderRadius: 6,
                  padding: '2px 8px',
                }}
              >
                {quad.tag}
              </span>
              <span style={{ ...mono, fontSize: 11, color: c.faint }}>
                engagement {bucket(puck.e)} · arousal {bucket(puck.a)}
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.62, color: c.text, margin: 0, display: 'flex', gap: 9 }}>
              <CornerDownRight size={15} color={quad.color} style={{ marginTop: 3, flexShrink: 0 }} />
              <span>{quad.read}</span>
            </p>
            {lowRow && (
              <p style={{ fontSize: 13, lineHeight: 1.6, color: c.muted, margin: '11px 0 0', paddingTop: 11, borderTop: `1px solid ${c.line}` }}>
                {LOW_ROW_NOTE}
              </p>
            )}
          </div>
        ) : (
          <div
            style={{
              marginTop: 14,
              border: `1px solid ${c.line}`,
              borderRadius: 11,
              background: c.panel,
              padding: '13px 14px 15px',
            }}
          >
            <p style={{ fontSize: 14, lineHeight: 1.62, color: c.muted, margin: 0 }}>
              Place a state to see where it sits. Tap anywhere on the map, or focus it and use the arrow
              keys, and an honest read of that square will show up here.
            </p>
          </div>
        )}

        {/* name and pin */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') pinIt();
            }}
            placeholder="name this state, e.g. after the meeting"
            aria-label="name this state"
            style={{
              ...mono,
              flex: '1 1 200px',
              minWidth: 0,
              background: c.panel,
              color: c.text,
              border: `1px solid ${c.line}`,
              borderRadius: 8,
              padding: '10px 12px',
              fontSize: 12.5,
            }}
          />
          <button
            type="button"
            onClick={pinIt}
            style={{
              ...mono,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              cursor: 'pointer',
              fontSize: 12.5,
              padding: '10px 14px',
              borderRadius: 8,
              border: `1px solid ${c.tealEdge}`,
              background: c.tealFog,
              color: c.teal,
              fontWeight: 500,
            }}
          >
            <Plus size={13} /> pin it
          </button>
          {selectedId && (
            <button
              type="button"
              onClick={removeSelected}
              style={{
                ...mono,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                fontSize: 12,
                padding: '10px 12px',
                borderRadius: 8,
                border: `1px solid ${c.line2}`,
                background: 'transparent',
                color: c.muted,
              }}
            >
              <X size={12} /> remove
            </button>
          )}
        </div>

        <span role="status" aria-live="polite" className="visually-hidden">
          {announce}
        </span>
      </div>
    </WidgetShell>
  );
}
