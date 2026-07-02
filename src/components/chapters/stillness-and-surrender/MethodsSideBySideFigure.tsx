import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';
import { METHODS, type Method } from './methods';

/**
 * fig_12.2, the contemplative methods side by side: what each does with attention and
 * the self, and the name each gives the calm it receives. The shared center is real (a
 * repeated anchor, a posture of letting go, a gentle return), and the figure marks it.
 * But the frames do not match: four different names for the calm, and behind each a
 * different account of who, if anyone, sends it down. Convergence on the move, not on
 * the meaning. The figure keeps both true at once.
 */

function Card({ m }: { m: Method }) {
  return (
    <div
      style={{
        flex: '1 1 205px',
        border: `1px solid ${m.color}3a`,
        borderRadius: 11,
        background: `${m.color}0c`,
        padding: '13px 13px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div>
        <div style={{ ...mono, fontSize: 10, color: c.faint, marginBottom: 2 }}>{m.faith}</div>
        <div style={{ ...mono, fontSize: 12.5, color: m.color, fontWeight: 600, lineHeight: 1.3 }}>
          {m.method}
        </div>
      </div>

      <div style={{ fontSize: 11.5, lineHeight: 1.5, color: c.muted }}>
        <span style={{ ...mono, fontSize: 9.5, color: m.color, letterSpacing: '.04em' }}>ANCHOR </span>
        {m.anchor}
      </div>

      <div style={{ fontSize: 11.5, lineHeight: 1.5, color: c.muted }}>
        <span style={{ ...mono, fontSize: 9.5, color: m.color, letterSpacing: '.04em' }}>QUIETS </span>
        {m.quiets}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 9, borderTop: `1px solid ${c.line}` }}>
        <div style={{ ...mono, fontSize: 9.5, color: c.faint, letterSpacing: '.04em', marginBottom: 2 }}>
          the calm it receives
        </div>
        <div style={{ ...mono, fontSize: 12.5, color: m.color, fontWeight: 600 }}>{m.receivedCalm.term}</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.45, color: c.faint, marginTop: 1 }}>
          {m.receivedCalm.gloss}
        </div>
      </div>
    </div>
  );
}

export function MethodsSideBySideFigure() {
  return (
    <Figure
      caption="fig_12.2 · four_doors_one_move"
      sub="Read across the top and the methods look unrelated. Read the bottom rows and a single move shows through: a repeated anchor, a loosening of the grip, a gentle return. What the columns do not share is the meaning: four names for the calm, and four accounts of who sends it."
      max={900}
    >
      <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
        {METHODS.map((m) => (
          <Card key={m.id} m={m} />
        ))}
      </div>

      {/* the shared move underneath */}
      <div
        style={{
          marginTop: 13,
          border: `1px solid ${c.tealEdge}`,
          borderRadius: 11,
          background: c.tealFog,
          padding: '12px 15px',
          textAlign: 'center',
        }}
      >
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.04em', marginBottom: 5 }}>
          {'// '}the shared skeleton
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.55, color: c.text }}>
          one repeated anchor · a posture of letting go, not effort · a gentle, unscolding return
        </div>
      </div>
    </Figure>
  );
}
