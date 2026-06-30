import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

interface Side {
  tradition: string;
  move: string;
  col: string;
  edge: string;
  fog: string;
  yoursLabel: string;
  yours: string;
  notLabel: string;
  not: string;
  frame: string;
  rest: string;
}

const GITA: Side = {
  tradition: 'the Bhagavad Gita',
  move: 'karma yoga',
  col: c.violet,
  edge: c.violetEdge,
  fog: c.violetFog,
  yoursLabel: 'yours',
  yours: 'the action (karma) · the effort, given fully',
  notLabel: 'not yours',
  not: 'the fruit (phala) · the result of the act',
  frame: 'Frame: act as offering and surrender. The work is given to the divine, the doer-self stands aside, and the guṇas of nature do the acting while the Self watches. Set inside dharma and rebirth.',
  rest: 'samatva · evenness in success and failure (2.48)',
};

const STOA: Side = {
  tradition: 'the Stoa',
  move: 'the dichotomy of control',
  col: c.teal,
  edge: c.tealEdge,
  fog: c.tealFog,
  yoursLabel: 'up to us',
  yours: 'judgment, choice, assent (prohairesis)',
  notLabel: 'not up to us',
  not: 'the body, reputation, outcomes',
  frame: 'Frame: act by reason. No offering and no deity required. Virtue is the only good, the ruling mind (hēgemonikon) is sovereign, and one lives in accord with nature and reason.',
  rest: 'ataraxia · freedom from disturbance',
};

function Row({ label, body, col, strong }: { label: string; body: string; col: string; strong?: boolean }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span
        style={{
          ...mono,
          fontSize: 10,
          color: col,
          border: `1px solid ${col}66`,
          borderRadius: 5,
          padding: '2px 6px',
          marginRight: 8,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 12.5, lineHeight: 1.5, color: strong ? c.text : c.muted }}>{body}</span>
    </div>
  );
}

function Column({ s }: { s: Side }) {
  return (
    <div
      style={{
        flex: '1 1 230px',
        border: `1px solid ${s.edge}`,
        borderRadius: 11,
        background: s.fog,
        padding: '14px 14px 15px',
      }}
    >
      <div style={{ ...mono, fontSize: 10.5, color: c.faint, marginBottom: 3 }}>{s.tradition}</div>
      <div style={{ ...mono, fontSize: 13.5, color: s.col, fontWeight: 600, marginBottom: 12 }}>
        {s.move}
      </div>

      <Row label={s.yoursLabel} body={s.yours} col={s.col} strong />
      <Row label={s.notLabel} body={s.not} col={c.faint} />

      <div
        style={{
          fontSize: 12,
          lineHeight: 1.55,
          color: c.muted,
          marginTop: 11,
          paddingTop: 11,
          borderTop: `1px solid ${c.line}`,
        }}
      >
        {s.frame}
      </div>
    </div>
  );
}

/**
 * fig_09.3, the Gita beside the Stoa. Both teach the same practical move: pour
 * yourself into what is yours to do, and release your grip on the outcome, which
 * was never yours. Both arrive at equanimity. The figure sets them side by side
 * AND keeps the frames apart: the Gita acts as devotion and surrender, the Stoa
 * acts by reason alone. The convergence is real; the borrowing is not. No record
 * says one took it from the other. They found the same door from different worlds.
 */
export function GitaStoaParallelFigure() {
  return (
    <Figure
      caption="fig_09.3 · act_release_the_fruit"
      sub="The same move in two traditions that never met: do your part completely, let go of the result. The Gita does it as offering and surrender; the Stoa does it by reason. Read the shared center, then read the frames, which do not match. This is convergence, not borrowing."
      max={560}
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Column s={GITA} />
        <Column s={STOA} />
      </div>

      {/* the two paths converging on one destination */}
      <svg
        viewBox="0 0 300 26"
        aria-hidden="true"
        style={{ display: 'block', width: 160, height: 'auto', margin: '8px auto 6px' }}
      >
        <defs>
          <marker id="gs-arrow" markerWidth="7" markerHeight="7" refX="4" refY="3" orient="auto">
            <path d="M0 0 L4.5 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>
        <path d="M40 2 Q150 6 150 22" fill="none" stroke={c.violet} strokeWidth={1.6} strokeOpacity={0.7} markerEnd="url(#gs-arrow)" />
        <path d="M260 2 Q150 6 150 22" fill="none" stroke={c.teal} strokeWidth={1.6} strokeOpacity={0.7} markerEnd="url(#gs-arrow)" />
      </svg>

      {/* the shared destination */}
      <div
        style={{
          border: `1px solid ${c.tealEdge}`,
          borderRadius: 11,
          background: c.tealFog,
          padding: '13px 15px',
          textAlign: 'center',
        }}
      >
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.04em', marginBottom: 5 }}>
          {'// '}the shared move
        </div>
        <div style={{ fontSize: 14.5, lineHeight: 1.55, color: c.text, marginBottom: 6 }}>
          Give the action everything. Let go of the fruit.
        </div>
        <div style={{ ...mono, fontSize: 11, color: c.muted }}>
          <span style={{ color: c.violet }}>{GITA.rest}</span>
          <span style={{ color: c.faint }}> · </span>
          <span style={{ color: c.teal }}>{STOA.rest}</span>
        </div>
      </div>
    </Figure>
  );
}
