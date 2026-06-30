import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

interface Band {
  k: string;
  col: string;
  fog: string;
  edge: string;
  gloss: string;
  limit: string;
  items: string[];
}

/**
 * fig_05.1a: the three kinds of wanting. Epicurus sorts desires in the Letter to
 * Menoeceus: natural and necessary, natural but not necessary, and neither (the
 * vain or empty desires). The bands descend from the short, reachable floor to
 * the bottomless top. The whole ethical payload is in the right rail: the natural
 * and necessary have a limit and are easy to reach; the vain have no natural limit
 * at all, which is why chasing them never ends.
 */
const BANDS: Band[] = [
  {
    k: 'natural & necessary',
    col: c.teal,
    fog: c.tealFog,
    edge: c.tealEdge,
    gloss: 'the body’s real needs, and a settled mind. for life, for freedom from pain, for happiness.',
    limit: 'limit: low, and easy to reach',
    items: ['food when hungry', 'water', 'shelter, warmth', 'a few real friends', 'freedom from dread'],
  },
  {
    k: 'natural, not necessary',
    col: c.amber,
    fog: c.amberFog,
    edge: c.amberEdge,
    gloss: 'real pleasures, but not needs. they only vary the pleasure you already have, they do not raise it.',
    limit: 'limit: optional, fine in measure',
    items: ['a rich, varied meal', 'good wine', 'sex', 'a comfortable home'],
  },
  {
    k: 'vain / empty',
    col: c.coral,
    fog: c.coralFog,
    edge: c.coralEdge,
    gloss: 'neither natural nor necessary. born of empty opinion, and they recede the faster you chase them.',
    limit: 'limit: none. it runs to infinity',
    items: ['wealth without end', 'fame', 'power over others', 'always a little more'],
  },
];

export function DesireTaxonomyFigure() {
  return (
    <Figure
      caption="fig_05.1a · the_three_desires"
      sub="Epicurus, Letter to Menoeceus 127–8. natural and necessary desires are few and easy to satisfy; natural but unnecessary ones only vary the pleasure; vain desires have no natural limit, so the chase has no end."
      max={560}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BANDS.map((b) => (
          <div
            key={b.k}
            style={{
              border: `1px solid ${b.edge}`,
              borderLeft: `3px solid ${b.col}`,
              borderRadius: 10,
              background: b.fog,
              padding: '13px 14px 14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 10,
                flexWrap: 'wrap',
                marginBottom: 7,
              }}
            >
              <span style={{ ...mono, fontSize: 13, color: b.col, fontWeight: 600 }}>{b.k}</span>
              <span style={{ ...mono, fontSize: 10.5, color: c.faint, whiteSpace: 'nowrap' }}>{b.limit}</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: c.muted, margin: '0 0 11px' }}>{b.gloss}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {b.items.map((it) => (
                <span
                  key={it}
                  style={{
                    ...mono,
                    fontSize: 11.5,
                    color: c.muted,
                    border: `1px solid ${c.line}`,
                    borderRadius: 6,
                    padding: '3px 8px',
                    background: c.panel,
                  }}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}
