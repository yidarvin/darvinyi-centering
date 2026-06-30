import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';
import { DIVERGENCES, type Divergence } from './convergence';

/**
 * fig_14.3, where the roads part. The honest counterweight to the convergence
 * map. Six places the traditions genuinely contradict each other in aim or in
 * metaphysics, not in vocabulary. Same outward composure, opposite answers to
 * what is real and what the calm is even for. The figure exists so the chapter
 * cannot be misread as flattening the traditions into one.
 */

function Pole({ who, pos, col }: { who: string; pos: string; col: string }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 168,
        border: `1px solid ${col}33`,
        background: `${col}0a`,
        borderRadius: 9,
        padding: '10px 12px',
      }}
    >
      <div style={{ ...mono, fontSize: 10.5, color: col, marginBottom: 5, fontWeight: 600 }}>{who}</div>
      <div style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted }}>{pos}</div>
    </div>
  );
}

function Row({ d }: { d: Divergence }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ ...mono, fontSize: 12, color: c.text, marginBottom: 8, lineHeight: 1.45 }}>
        <span style={{ color: c.tealDim }}>{'? '}</span>
        {d.question}
      </div>
      <div style={{ display: 'flex', gap: 9, alignItems: 'stretch', flexWrap: 'wrap' }}>
        <Pole who={d.a.who} pos={d.a.pos} col={c.amber} />
        <Pole who={d.b.who} pos={d.b.pos} col={c.teal} />
      </div>
    </div>
  );
}

export function DivergenceFigure() {
  return (
    <Figure
      caption="fig_14.3 · where_the_roads_part: convergence of method is not agreement on aim"
      sub="The same practice can answer opposite questions about what is real and what peace is for. These are forks, not vocabulary. A reader who takes the routes home should take the disagreements too."
      max={520}
    >
      {DIVERGENCES.map((d, i) => (
        <Row key={i} d={d} />
      ))}
      <div
        style={{
          ...mono,
          fontSize: 11,
          color: c.faint,
          lineHeight: 1.55,
          borderTop: `1px solid ${c.line}`,
          paddingTop: 12,
          marginTop: 2,
        }}
      >
        The shared method is the family resemblance. The aims and the metaphysics are where the family
        members actually argue.
      </div>
    </Figure>
  );
}
