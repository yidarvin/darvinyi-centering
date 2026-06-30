import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

interface Remedy {
  n: string;
  line: string;
  gloss: string;
  pd: string;
}

/**
 * fig_05.4a: the fourfold cure (tetrapharmakos). A four-line summary of Epicurean
 * therapy, preserved in a Herculaneum papyrus by Philodemus, not written by
 * Epicurus himself. Each line condenses one of the first four Principal Doctrines.
 * The first two pull the teeth from the two great fears (the divine, death); the
 * second two reframe pleasure and pain (the good is near, the bad is bearable).
 */
const REMEDIES: Remedy[] = [
  {
    n: '01',
    line: 'Nothing divine is out to get you.',
    gloss: 'No cosmic judge is engineering your troubles, and none is coming to settle a score. The fear of supernatural punishment has nothing to stand on.',
    pd: 'PD I',
  },
  {
    n: '02',
    line: 'Death is nothing to you.',
    gloss: 'While you exist, death is not here. When death is here, you do not exist. The two never meet, so there is no moment in which it can harm you.',
    pd: 'PD II',
  },
  {
    n: '03',
    line: 'What is good is easy to get.',
    gloss: 'The pleasures that actually settle a person, food when hungry, warmth, safety, a friend, are simple and near at hand. The good has a low, reachable floor.',
    pd: 'PD III',
  },
  {
    n: '04',
    line: 'What is dreadful is easy to endure.',
    gloss: 'Intense pain is short. Pain that lasts is mild. Suffering does not, in fact, run past the edge of what a person can bear.',
    pd: 'PD IV',
  },
];

export function FourPartCureFigure() {
  return (
    <Figure
      caption="fig_05.4a · the_fourfold_cure"
      sub="the tetrapharmakos (the four-drug remedy), Philodemus's summary of Epicurean teaching, preserved on a papyrus charred at Herculaneum. each line condenses one of the first four Principal Doctrines."
      max={540}
    >
      <div
        style={{
          border: `1px solid ${c.tealEdge}`,
          borderRadius: 12,
          background: c.panel2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 11.5,
            color: c.teal,
            letterSpacing: '.06em',
            padding: '12px 16px',
            borderBottom: `1px solid ${c.line}`,
            background: c.tealFog,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <span>tetrapharmakos</span>
          <span style={{ color: c.faint, fontSize: 10.5 }}>the four-drug remedy</span>
        </div>

        {REMEDIES.map((r, i) => (
          <div
            key={r.n}
            style={{
              display: 'flex',
              gap: 13,
              padding: '14px 16px',
              borderTop: i === 0 ? 'none' : `1px solid ${c.line}`,
            }}
          >
            <span style={{ ...mono, fontSize: 12, color: c.tealDim, flexShrink: 0, marginTop: 2 }}>{r.n}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{r.line}</span>
                <span
                  style={{
                    ...mono,
                    fontSize: 10,
                    color: c.tealDim,
                    border: `1px solid ${c.line2}`,
                    borderRadius: 5,
                    padding: '1px 6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.pd}
                </span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '6px 0 0' }}>{r.gloss}</p>
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}
