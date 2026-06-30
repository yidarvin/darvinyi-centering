import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';
import { WITNESS, POLE_COLOR, type WitnessEntry, type WitnessPole } from './convergence';

/**
 * fig_14.2, the same move, many names. Many traditions describe a watchful
 * awareness behind the contents of the mind. The phenomenology rhymes. The
 * metaphysics does not, and that is the lesson. Two poles: a permanent self that
 * watches, versus watching with no watcher at all, the very thing the other side
 * calls the central error. Then three that do not sit cleanly on the line. The
 * figure encodes the convergence and the divergence in one frame, so neither one
 * can be read without the other.
 */

const byPole = (pole: WitnessPole) => WITNESS.filter((w) => w.pole === pole);

function Entry({ w }: { w: WitnessEntry }) {
  const col = POLE_COLOR[w.pole];
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{w.term}</span>
        <span style={{ ...mono, fontSize: 10.5, color: col }}>{w.tradition}</span>
      </div>
      <div style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted }}>{w.note}</div>
    </div>
  );
}

function Pole({
  title,
  tag,
  col,
  entries,
}: {
  title: string;
  tag: string;
  col: string;
  entries: WitnessEntry[];
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 215,
        border: `1px solid ${col}40`,
        background: `${col}0c`,
        borderRadius: 10,
        padding: '14px 15px 4px',
      }}
    >
      <div style={{ ...mono, fontSize: 11, color: col, marginBottom: 2, fontWeight: 600 }}>{title}</div>
      <div style={{ ...mono, fontSize: 10, color: c.faint, marginBottom: 14 }}>{tag}</div>
      {entries.map((w) => (
        <Entry key={w.tradition} w={w} />
      ))}
    </div>
  );
}

function OffAxis({ w, label }: { w: WitnessEntry; label: string }) {
  const col = POLE_COLOR[w.pole];
  return (
    <div
      style={{
        flex: 1,
        minWidth: 180,
        border: `1px solid ${c.line}`,
        background: c.panel2,
        borderRadius: 9,
        padding: '11px 12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{w.term}</span>
        <span style={{ ...mono, fontSize: 10, color: col }}>{w.tradition}</span>
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.5, color: c.muted, marginBottom: 6 }}>{w.note}</div>
      <div style={{ ...mono, fontSize: 9.5, color: col, letterSpacing: '.02em' }}>{label}</div>
    </div>
  );
}

export function SameMoveFigure() {
  const off = byPole('stance').concat(byPole('union'), byPole('disanalogy'));
  const offLabels: Record<string, string> = {
    ACT: 'a stance, not a soul',
    'Christian contemplation': 'aimed at union, not watching',
    Stoicism: 'an active judge, the disanalogy',
  };

  return (
    <Figure
      caption="fig_14.2 · same_move, many_names: the witness, and the fault line under it"
      sub="The view from the inside rhymes: a quiet awareness that watches the weather of the mind without being it. The answer underneath does not. Identical felt report, opposite verdict on whether anyone is home. Hold this as a family resemblance, not a proof that these are one experience."
      max={520}
    >
      <div
        style={{
          ...mono,
          fontSize: 11,
          color: c.muted,
          textAlign: 'center',
          marginBottom: 14,
          letterSpacing: '.02em',
        }}
      >
        <span style={{ color: c.faint }}>the question under all of them: </span>
        is there a self that watches, or only watching?
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <Pole
          title="a self that watches"
          tag="permanent, real, your true identity"
          col={POLE_COLOR.self}
          entries={byPole('self')}
        />
        <Pole
          title="watching, with no watcher"
          tag="reifying it into a self is the error to undo"
          col={POLE_COLOR['no-self']}
          entries={byPole('no-self')}
        />
      </div>

      <div style={{ ...mono, fontSize: 10.5, color: c.faint, marginBottom: 9 }}>
        and three that do not sit cleanly on the line:
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {off.map((w) => (
          <OffAxis key={w.tradition} w={w} label={offLabels[w.tradition] ?? ''} />
        ))}
      </div>
    </Figure>
  );
}
