import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

interface Practice {
  k: string;
  label: string;
  note: string;
}

const PRACTICES: Practice[] = [
  { k: 'body_scan', label: 'the body scan', note: 'attention sweeps slowly through the body, part by part. the first formal practice and the foundation.' },
  { k: 'sitting', label: 'sitting meditation', note: 'the breath as anchor, then open awareness of whatever arises. the rep this whole book is built on.' },
  { k: 'mindful_movement', label: 'mindful movement', note: 'slow, gentle stretches done with full attention on sensation, not on the shape.' },
  { k: 'everyday', label: 'everyday attention', note: 'one raisin, one meal, one walk, met completely. the practice leaves the cushion.' },
];

/**
 * fig_10.4 · the_mbsr_set. The four core practices of Mindfulness-Based Stress
 * Reduction, sitting under Kabat-Zinn's one-line definition of what they all
 * train. The point of the layout: these are not four different things but four
 * doors into a single skill, attention held on purpose, in the present, without
 * judging. The body scan is marked as the foundation because it is where the
 * eight-week course begins. Concept: Kabat-Zinn, MBSR.
 */
export function MbsrPracticeSetFigure() {
  return (
    <Figure
      caption="fig_10.4 · the_mbsr_set"
      sub="four doors into one skill. an eight-week course, a daily home practice, and one definition holding it together."
      max={520}
    >
      <div>
        {/* the definition, as a banner */}
        <div
          style={{
            border: `1px solid ${c.tealEdge}`,
            background: c.tealFog,
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 14,
          }}
        >
          <div style={{ ...mono, fontSize: 10, color: c.tealDim, letterSpacing: '.05em', marginBottom: 6 }}>
            mindfulness, defined
          </div>
          <p style={{ ...mono, fontSize: 12.5, lineHeight: 1.55, color: c.text, margin: 0 }}>
            paying attention in a particular way: <span style={{ color: c.teal }}>on purpose</span>, in the{' '}
            <span style={{ color: c.teal }}>present moment</span>, and{' '}
            <span style={{ color: c.teal }}>nonjudgmentally</span>.
          </p>
        </div>

        {/* the four practices, as a responsive grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 10,
          }}
        >
          {PRACTICES.map((p, i) => (
            <div
              key={p.k}
              style={{
                border: `1px solid ${i === 0 ? c.tealEdge : c.line}`,
                background: i === 0 ? c.tealFog : c.panel2,
                borderRadius: 10,
                padding: '11px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 5 }}>
                <span style={{ ...mono, fontSize: 12, fontWeight: 500, color: i === 0 ? c.teal : c.text }}>
                  {p.label}
                </span>
                {i === 0 && (
                  <span style={{ ...mono, fontSize: 9, color: c.tealDim }}>foundation</span>
                )}
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: c.muted, margin: 0 }}>{p.note}</p>
            </div>
          ))}
        </div>
      </div>
    </Figure>
  );
}
