import { useState, type KeyboardEvent } from 'react';
import { ArrowRight, RotateCcw, CornerDownRight, Shield, Flame, Sparkles, Heart, type LucideIcon } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import {
  PARTS,
  PROTECTORS,
  KIND,
  QUALITIES_OF_SELF,
  RING,
  BLEND_POS,
  type Kind,
} from './parts';

const ICON: Record<Kind, LucideIcon> = {
  self: Sparkles,
  manager: Shield,
  firefighter: Flame,
  exile: Heart,
};

const LEGEND: [string, string][] = [
  ['Self', c.teal],
  ['manager', c.amber],
  ['firefighter', c.coral],
  ['exile', c.violet],
];

/**
 * widget_11.1, the parts-mapper. The reader starts blended with one anxious
 * manager: its view fills the screen, the Self is dim and shrunk, its qualities
 * out of reach. The single move that matters is to step back, to unblend, and
 * when they do the Self scales up to the center and its eight qualities become
 * available again. From there, tapping any protector turns toward it with
 * curiosity instead of war, and reveals the same shape every time: a fear, an
 * old protective intent, an exile it is shielding. The felt payoff is the whole
 * chapter in one gesture. You do not fight the part. You return to the center and
 * lead from there. Concept: Schwartz, blending and unblending, Self-leadership,
 * the protective intent of every part.
 */
export function PartsMapper() {
  const [blended, setBlended] = useState(true); // start fused with the Sentinel
  const [sel, setSel] = useState<string>('sentinel');

  const reBlend = () => {
    setBlended(true);
    setSel('sentinel');
  };
  const unblend = () => {
    setBlended(false);
    setSel('self');
  };
  const pos = (id: string) => (blended && id === 'sentinel' ? BLEND_POS : RING[id]);

  const onNodeKey = (e: KeyboardEvent, fn: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };

  return (
    <WidgetShell
      id="11.1"
      name="parts_map"
      title="Your inner committee, and the center beneath it"
      legend={
        <div style={{ display: 'flex', gap: 13, flexWrap: 'wrap' }}>
          {LEGEND.map(([k, col]) => (
            <span
              key={k}
              style={{ ...mono, fontSize: 11, color: c.muted, display: 'inline-flex', alignItems: 'center', gap: 5 }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 99, background: col, display: 'inline-block' }} />
              {k}
            </span>
          ))}
        </div>
      }
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11.5, color: blended ? c.amber : c.teal }}>
            {blended ? 'state: blended' : 'state: Self-led'}
          </span>
          <button
            type="button"
            onClick={reBlend}
            style={{
              ...mono,
              fontSize: 12,
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${c.line2}`,
              background: 'transparent',
              color: c.muted,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <RotateCcw size={12} /> re-blend
          </button>
        </div>
      }
    >
      {/* the graph */}
      <div style={{ position: 'relative', background: c.bg }}>
        {/* blended-lens tint: while blended, the whole field is washed in the manager's color */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: c.amber,
            opacity: blended ? 0.07 : 0,
            transition: 'opacity .6s ease',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 460, margin: '0 auto' }}>
          <svg
            viewBox="0 0 480 524"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            role="group"
            aria-label="A map of an inner system. A Self node sits at the center, ringed by four protector parts and one exile. While blended, an anxious manager is pulled over the Self and obscures it."
          >
            <defs>
              <radialGradient id="pm-selfglow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c.teal} stopOpacity={0.3} />
                <stop offset="60%" stopColor={c.teal} stopOpacity={0.06} />
                <stop offset="100%" stopColor={c.teal} stopOpacity={0} />
              </radialGradient>
            </defs>

            {/* Self glow, dimmed while blended */}
            <circle
              cx={RING.self.x}
              cy={RING.self.y}
              r={92}
              fill="url(#pm-selfglow)"
              style={{ opacity: blended ? 0.15 : 1, transition: 'opacity .7s ease' }}
            />

            {/* edges: protector -> exile (the thing each protector shields) */}
            {PROTECTORS.map((p) => {
              const a = RING[p];
              const b = RING.notenough;
              const hot = sel === p;
              const hidden = blended && p === 'sentinel';
              return (
                <line
                  key={`pr-${p}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={hot ? c.violet : c.faint}
                  strokeWidth={hot ? 1.6 : 1}
                  strokeDasharray="3 5"
                  style={{ opacity: hidden ? 0 : hot ? 0.65 : 0.22, transition: 'opacity .5s ease, stroke .3s' }}
                />
              );
            })}

            {/* edges: Self <-> protector, faint while blended (the Self is obscured) */}
            {PROTECTORS.map((p) => {
              const a = RING.self;
              const b = RING[p];
              return (
                <line
                  key={`sl-${p}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={c.teal}
                  strokeWidth={1.4}
                  style={{ opacity: blended ? 0.06 : 0.4, transition: 'opacity .7s ease' }}
                />
              );
            })}

            {/* the exile: inert while blended, since the only move available then is to unblend */}
            <PartNode
              id="notenough"
              pos={pos('notenough')}
              sel={sel}
              dim={blended}
              onSel={setSel}
              onNodeKey={onNodeKey}
              disabled={blended}
            />

            {/* the protectors: same, inert while blended so keyboard focus goes straight to the unblend move */}
            {PROTECTORS.map((p) => (
              <PartNode
                key={p}
                id={p}
                pos={pos(p)}
                sel={sel}
                dim={false}
                onSel={setSel}
                onNodeKey={onNodeKey}
                disabled={blended}
              />
            ))}

            {/* the Self, scales in on unblend, gently breathing */}
            <g
              tabIndex={blended ? -1 : 0}
              role="button"
              aria-label="Self, the calm center"
              aria-disabled={blended}
              onClick={() => !blended && setSel('self')}
              onKeyDown={(e) => !blended && onNodeKey(e, () => setSel('self'))}
              style={{
                cursor: blended ? 'default' : 'pointer',
                transform: `translate(${RING.self.x}px,${RING.self.y}px) scale(${blended ? 0.42 : 1})`,
                transition: 'transform .7s cubic-bezier(.34,1.2,.4,1)',
              }}
            >
              <g
                style={{
                  animation: 'breathe 4.6s ease-in-out infinite',
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                }}
              >
                {sel === 'self' && !blended && (
                  <circle r={PARTS.self.r + 9} fill="none" stroke={c.teal} strokeOpacity={0.35} strokeWidth={1} />
                )}
                <circle
                  r={PARTS.self.r}
                  fill={c.tealFog}
                  stroke={c.teal}
                  strokeWidth={2.2}
                  style={{ opacity: blended ? 0.4 : 1, transition: 'opacity .6s' }}
                />
                <text
                  textAnchor="middle"
                  y={0}
                  dy={4.5}
                  fontFamily={mono.fontFamily}
                  fontSize={13}
                  fontWeight={600}
                  fill={c.teal}
                  style={{ opacity: blended ? 0.4 : 1 }}
                >
                  Self
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* the inspector reads the current state */}
      <Inspector blended={blended} sel={sel} onUnblend={unblend} />
    </WidgetShell>
  );
}

function PartNode({
  id,
  pos,
  sel,
  dim,
  onSel,
  onNodeKey,
  disabled = false,
}: {
  id: string;
  pos: { x: number; y: number };
  sel: string;
  dim: boolean;
  onSel: (id: string) => void;
  onNodeKey: (e: KeyboardEvent, fn: () => void) => void;
  disabled?: boolean;
}) {
  const p = PARTS[id];
  const k = KIND[p.kind];
  const selected = sel === id;
  return (
    <g
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={p.label.replace(/_/g, ' ')}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={() => !disabled && onSel(id)}
      onKeyDown={(e) => !disabled && onNodeKey(e, () => onSel(id))}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        transform: `translate(${pos.x}px,${pos.y}px)`,
        transition: 'transform .7s cubic-bezier(.34,1.1,.4,1)',
      }}
    >
      {selected && <circle r={p.r + 8} fill="none" stroke={k.col} strokeOpacity={0.35} strokeWidth={1} />}
      <circle
        r={p.r}
        fill={k.fog}
        stroke={k.col}
        strokeWidth={selected ? 2.4 : 1.8}
        style={{ opacity: dim ? 0.5 : 1, transition: 'opacity .6s, stroke-width .25s' }}
      />
      <text
        textAnchor="middle"
        y={0}
        dy={p.r + 16}
        fontFamily={mono.fontFamily}
        fontSize={11.5}
        fontWeight={500}
        fill={selected ? k.col : c.muted}
        style={{ opacity: dim ? 0.55 : 1 }}
      >
        {p.label}
      </text>
    </g>
  );
}

function Chip({ children, col }: { children: React.ReactNode; col: string }) {
  return (
    <span
      style={{ ...mono, fontSize: 10.5, color: col, border: `1px solid ${col}55`, borderRadius: 5, padding: '2px 7px' }}
    >
      {children}
    </span>
  );
}

function Field({ k, v, col }: { k: string; v: React.ReactNode; col: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ ...mono, fontSize: 10.5, color: col, opacity: 0.85, marginBottom: 3, letterSpacing: '.03em' }}>
        {k}
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.5, color: c.text }}>{v}</div>
    </div>
  );
}

function Inspector({ blended, sel, onUnblend }: { blended: boolean; sel: string; onUnblend: () => void }) {
  // 1) blended: fused with the Sentinel, its view feels like the whole truth
  if (blended) {
    const p = PARTS.sentinel;
    return (
      <div style={{ padding: '18px 18px 20px', background: c.amberFog, borderTop: `1px solid ${c.line}` }}>
        <div style={{ marginBottom: 12 }}>
          <Chip col={c.amber}>blended_with: the_sentinel</Chip>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.5, color: c.text, fontWeight: 500, margin: '0 0 10px' }}>
          {`"${p.voice}"`}
        </p>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 16px' }}>
          Right now the Sentinel’s view feels like the whole truth. There is no daylight between you and it.
          You cannot argue a part away. You make space, and lead from the center.
        </p>
        <button
          type="button"
          onClick={onUnblend}
          style={{
            ...mono,
            fontSize: 13,
            cursor: 'pointer',
            padding: '11px 16px',
            borderRadius: 9,
            border: `1px solid ${c.tealEdge}`,
            background: c.tealFog,
            color: c.teal,
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          step back · unblend <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  // 2) Self selected: you are leading from the center
  if (sel === 'self') {
    return (
      <div style={{ padding: '18px 18px 20px', background: c.tealFog, borderTop: `1px solid ${c.line}` }}>
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={14} color={c.teal} />
          <Chip col={c.teal}>Self · you are at the center</Chip>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {QUALITIES_OF_SELF.map((x) => (
            <span
              key={x}
              style={{
                ...mono,
                fontSize: 11,
                color: c.teal,
                background: 'rgba(45,212,191,0.07)',
                border: `1px solid ${c.tealEdge}`,
                borderRadius: 6,
                padding: '3px 8px',
              }}
            >
              {x}
            </span>
          ))}
        </div>
        <div style={{ ...mono, fontSize: 13, color: c.muted, marginBottom: 12 }}>
          <span style={{ color: c.faint }}>the sentence shifts:</span>
          <br />
          <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>I am anxious</span>
          <span style={{ color: c.teal }}> {' → '} a part of me feels anxious</span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: c.faint, margin: 0, display: 'flex', gap: 8 }}>
          <CornerDownRight size={14} style={{ marginTop: 2, flexShrink: 0, color: c.teal }} />
          Tap any part to turn toward it with curiosity. Befriend the protectors first, never the exile.
        </p>
      </div>
    );
  }

  // 3) a part selected
  const p = PARTS[sel];
  const k = KIND[p.kind];
  const isExile = p.kind === 'exile';
  const Icon = ICON[p.kind];
  return (
    <div style={{ padding: '18px 18px 20px', borderTop: `1px solid ${c.line}`, background: k.fog }}>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={14} color={k.col} />
        <Chip col={k.col}>{k.label}</Chip>
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: c.text, margin: '0 0 14px', fontWeight: 500 }}>{p.role}</p>
      <Field k="afraid_that" v={p.fear} col={k.col} />
      <Field k="positive_intent" v={p.intent} col={k.col} />
      {isExile ? (
        <p
          style={{
            fontSize: 12.5,
            lineHeight: 1.6,
            color: c.faint,
            margin: '6px 0 0',
            borderTop: `1px solid ${c.line}`,
            paddingTop: 12,
          }}
        >
          Exiles hold the original wound. In real work they are reached last, slowly, and usually with a
          trained guide. The protectors are befriended first.
        </p>
      ) : (
        <Field
          k="protects"
          v={
            <span style={{ color: c.violet }}>
              not_enough <span style={{ color: c.faint }}>(exile)</span>
            </span>
          }
          col={k.col}
        />
      )}
    </div>
  );
}
