import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const BINS = [
  {
    k: 'up_to_me',
    col: c.teal,
    fog: c.tealFog,
    items: ['judgment', 'impulse', 'desire', 'aversion'],
    summary: 'our own acts',
  },
  {
    k: 'not_up_to_me',
    col: c.amber,
    fog: c.amberFog,
    items: ['the body', 'property', 'reputation', 'outcomes'],
    summary: 'everything else',
  },
];

/**
 * fig_04.1a: the two bins. Epictetus opens the Enchiridion by sorting the world
 * in two: what is up to us (eph' hēmin) and what is not. What remains in the left
 * bin is interior and short, every item a movement of one's own mind.
 */
export function TwoBinsFigure() {
  return (
    <Figure
      caption="fig_04.1a · the_two_bins"
      sub="Epictetus, Enchiridion 1: some things are up to us (eph' hēmin), and some are not. the up-to-us list is short, and every item on it is a movement of your own mind."
      max={520}
    >
      <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: `1px solid ${c.line}` }}>
        {BINS.map((bin, i) => (
          <div
            key={bin.k}
            style={{
              flex: 1,
              padding: '16px 16px 18px',
              background: bin.fog,
              borderLeft: i === 1 ? `1px solid ${c.line}` : 'none',
            }}
          >
            <div style={{ ...mono, fontSize: 12, color: bin.col, marginBottom: 12, fontWeight: 500 }}>
              {bin.k}
            </div>
            {bin.items.map((it) => (
              <div key={it} style={{ ...mono, fontSize: 12.5, color: c.muted, lineHeight: 2.0 }}>
                {it}
              </div>
            ))}
            <div style={{ ...mono, fontSize: 12.5, color: c.faint, lineHeight: 2.0, fontStyle: 'italic' }}>
              ({bin.summary})
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}
