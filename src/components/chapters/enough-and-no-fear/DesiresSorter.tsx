import { Check, X, RotateCcw, CornerDownRight, ArrowRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

type Cat = 'necessary' | 'natural' | 'vain';

interface Item {
  id: string;
  text: string;
  answer: Cat;
  note: string;
}

const ITEMS: Item[] = [
  {
    id: 'food',
    text: 'Enough food to quiet hunger',
    answer: 'necessary',
    note: 'Natural and necessary. Once the hunger is gone, the pain is gone, and that is the whole of the pleasure. Bread and water already do it.',
  },
  {
    id: 'shelter',
    text: 'A warm, dry place to sleep',
    answer: 'necessary',
    note: 'Natural and necessary. The body needs protection from cold and rain. It does not need marble to be at rest.',
  },
  {
    id: 'friends',
    text: 'A few friends you can rely on',
    answer: 'necessary',
    note: 'Epicurus put this near the very top. Of everything wisdom provides for a blessed life, he called friendship the greatest.',
  },
  {
    id: 'safety',
    text: 'To feel safe, free from dread',
    answer: 'necessary',
    note: 'Freedom from disturbance, ataraxia, is the necessary one for happiness. It is the thing this whole chapter is pointed at.',
  },
  {
    id: 'feast',
    text: 'A rich, varied, gourmet meal',
    answer: 'natural',
    note: 'Natural, but not necessary. Eating is a real need; the variety is a pleasure laid on top. It removes no pain that plain food leaves behind. It only varies the taste.',
  },
  {
    id: 'comfort',
    text: 'Comforts past the plain: nicer things, a softer bed',
    answer: 'natural',
    note: 'Natural, not necessary. Pleasant, and no harm in enjoying them. But past the point where want is already gone, they vary your ease, they do not deepen it.',
  },
  {
    id: 'fame',
    text: 'To be widely admired and known',
    answer: 'vain',
    note: 'Vain. Fame lives in other people’s heads, where you get no vote, and it has no limit. There is always one more person who has not heard of you.',
  },
  {
    id: 'money',
    text: 'More money, always a little more',
    answer: 'vain',
    note: 'Vain. The wealth nature asks for is limited and easy to come by. The wealth empty opinion asks for runs on to infinity, so “a little more” never arrives.',
  },
  {
    id: 'power',
    text: 'Power and status over others',
    answer: 'vain',
    note: 'Vain. Epicurus advised the quiet life, mostly out of public view. Status is bought with the very anxiety you are trying to set down.',
  },
];

const CATS: { v: Cat; label: string; full: string; col: string; edge: string; fog: string }[] = [
  { v: 'necessary', label: 'necessary', full: 'natural and necessary', col: c.teal, edge: c.tealEdge, fog: c.tealFog },
  { v: 'natural', label: 'natural', full: 'natural but not necessary', col: c.amber, edge: c.amberEdge, fog: c.amberFog },
  { v: 'vain', label: 'vain', full: 'vain or empty', col: c.coral, edge: c.coralEdge, fog: c.coralFog },
];

const catOf = (v: Cat) => CATS.find((x) => x.v === v)!;
const NECESSARY = ITEMS.filter((i) => i.answer === 'necessary');
const VAIN = ITEMS.filter((i) => i.answer === 'vain');

/**
 * widget_05.1, the desires sorter. The reader places nine ordinary wants into
 * Epicurus's three categories, then checks against him and runs the "what do I
 * actually need" pass. The felt payoff: the wants that secure your calm are few
 * and nearly free, while the wants with no natural limit are the ones the anxiety
 * pours into. Built on the same sort-then-check pattern as the dichotomy sorter.
 */
export function DesiresSorter() {
  const [pick, setPick] = useLocalStorage<Record<string, Cat>>('centering:widget:enough-and-no-fear:pick', {});
  const [shown, setShown] = useLocalStorage<boolean>('centering:widget:enough-and-no-fear:shown', false);

  const sorted = ITEMS.filter((i) => pick[i.id]).length;
  const correct = ITEMS.filter((i) => pick[i.id] && pick[i.id] === i.answer).length;

  const assign = (id: string, v: Cat) => {
    if (!shown) setPick((p) => ({ ...p, [id]: v }));
  };
  const reset = () => {
    setPick({});
    setShown(false);
  };

  return (
    <WidgetShell
      id="05.1"
      name="sort_your_wants"
      title="Which kind of wanting is each one?"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {sorted}/{ITEMS.length} sorted
        </span>
      }
      footer={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {!shown ? (
            <button
              type="button"
              onClick={() => setShown(true)}
              disabled={sorted === 0}
              style={{
                ...mono,
                fontSize: 12.5,
                cursor: sorted === 0 ? 'default' : 'pointer',
                padding: '10px 16px',
                borderRadius: 9,
                border: `1px solid ${c.tealEdge}`,
                background: c.tealFog,
                color: c.teal,
                fontWeight: 500,
                opacity: sorted === 0 ? 0.5 : 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              check against Epicurus <ArrowRight size={13} />
            </button>
          ) : (
            <button
              type="button"
              onClick={reset}
              style={{
                ...mono,
                fontSize: 12.5,
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: 9,
                border: `1px solid ${c.line2}`,
                background: 'transparent',
                color: c.muted,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <RotateCcw size={13} /> sort again
            </button>
          )}
          {shown && sorted > 0 && (
            <span style={{ ...mono, fontSize: 12, color: c.faint }}>
              {correct}/{sorted} matched
            </span>
          )}
        </div>
      }
    >
      {/* legend: the three categories */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          padding: '13px 16px',
          borderBottom: `1px solid ${c.line}`,
          background: c.panel,
        }}
      >
        {CATS.map((cat) => (
          <span key={cat.v} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: cat.col, flexShrink: 0 }} />
            <span style={{ ...mono, fontSize: 11, color: c.muted }}>{cat.full}</span>
          </span>
        ))}
      </div>

      <div style={{ padding: '14px 14px 4px' }}>
        {ITEMS.map((it) => {
          const sel = pick[it.id];
          const right = sel && sel === it.answer;
          const trueCat = catOf(it.answer);
          const borderCol = shown ? trueCat.edge : sel ? catOf(sel).edge : c.line;
          return (
            <div
              key={it.id}
              style={{
                border: `1px solid ${borderCol}`,
                borderRadius: 11,
                padding: '13px 13px 12px',
                marginBottom: 12,
                background: c.panel,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <p id={`want-${it.id}`} style={{ fontSize: 14.5, lineHeight: 1.5, margin: 0, color: c.text }}>
                  {it.text}
                </p>
                {shown && sel && (
                  <span style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
                    {right ? (
                      <Check size={16} color={c.teal} strokeWidth={2.5} />
                    ) : (
                      <X size={16} color={c.coral} strokeWidth={2.5} />
                    )}
                  </span>
                )}
              </div>

              <div role="group" aria-labelledby={`want-${it.id}`} style={{ display: 'flex', gap: 7, marginTop: 11 }}>
                {CATS.map((cat) => {
                  const active = sel === cat.v;
                  return (
                    <button
                      key={cat.v}
                      type="button"
                      aria-pressed={active}
                      aria-label={cat.full}
                      onClick={() => assign(it.id, cat.v)}
                      disabled={shown}
                      style={{
                        ...mono,
                        flex: 1,
                        cursor: shown ? 'default' : 'pointer',
                        fontSize: 11.5,
                        padding: '9px 6px',
                        borderRadius: 8,
                        border: `1px solid ${active ? cat.edge : c.line}`,
                        background: active ? cat.fog : 'transparent',
                        color: active ? cat.col : c.faint,
                        transition: 'all .14s ease',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {shown && sel && (
                <div style={{ marginTop: 11, paddingTop: 11, borderTop: `1px solid ${c.line}` }}>
                  <span
                    style={{
                      ...mono,
                      fontSize: 10.5,
                      color: trueCat.col,
                      border: `1px solid ${trueCat.edge}`,
                      borderRadius: 5,
                      padding: '2px 6px',
                      marginRight: 8,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {trueCat.full}
                  </span>
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: c.muted }}>{it.note}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {shown && (
        <div style={{ padding: '16px 18px 20px', borderTop: `1px solid ${c.line}`, background: c.tealFog }}>
          <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 12 }}>
            {'// '}what do I actually need
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 14 }}>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ ...mono, fontSize: 11, color: c.teal, marginBottom: 7 }}>
                the short list ({NECESSARY.length})
              </div>
              {NECESSARY.map((it) => (
                <div key={it.id} style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted, marginBottom: 3 }}>
                  {it.text}
                </div>
              ))}
              <div style={{ ...mono, fontSize: 10.5, color: c.faint, marginTop: 7 }}>has a limit · nearly free</div>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ ...mono, fontSize: 11, color: c.coral, marginBottom: 7 }}>
                no natural limit ({VAIN.length})
              </div>
              {VAIN.map((it) => (
                <div key={it.id} style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted, marginBottom: 3 }}>
                  {it.text}
                </div>
              ))}
              <div style={{ ...mono, fontSize: 10.5, color: c.faint, marginTop: 7 }}>runs to infinity · never arrives</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <CornerDownRight size={15} color={c.teal} style={{ marginTop: 3, flexShrink: 0 }} />
            <p style={{ fontSize: 14, lineHeight: 1.66, color: c.text, margin: 0 }}>
              The wants that actually buy your calm are few, and most are already within reach. The wants
              with no limit are the ones the anxiety pours into, because the finish line keeps moving.
              Epicurus's whole counsel is to rest on the first list and loosen your grip on the second.
              His word for that was <span style={{ color: c.teal }}>enough</span>.
            </p>
          </div>
        </div>
      )}
    </WidgetShell>
  );
}
