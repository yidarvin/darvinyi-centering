import { Check, X, RotateCcw, CornerDownRight, ArrowRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

type Answer = 'mine' | 'not' | 'first';
type Pick = 'mine' | 'not';

interface Item {
  id: string;
  text: string;
  answer: Answer;
  note: string;
}

// answer "first" = a first movement: scored as "not up to me", flagged specially
const ITEMS: Item[] = [
  { id: 'rain', text: 'Whether it rains on the day of my event', answer: 'not', note: 'External. The weather has never once consulted you.' },
  { id: 'verdict', text: 'My verdict that the rain has ruined everything', answer: 'mine', note: 'Yours entirely. The judgment is added by you, not by the sky.' },
  { id: 'approve', text: 'Whether other people approve of me', answer: 'not', note: 'Their minds are their own. You get a vote, never the result.' },
  { id: 'integrity', text: 'Whether I act with integrity right now', answer: 'mine', note: 'The one domain that is fully, always yours.' },
  { id: 'outcome', text: 'The outcome of a job interview', answer: 'not', note: 'You supply the effort. The decision lives inside someone else.' },
  { id: 'prep', text: 'How thoroughly I prepare for it', answer: 'mine', note: 'Effort and attention are up to you. Results are not.' },
  { id: 'spike', text: 'The first jolt of fear when my phone buzzes', answer: 'first', note: 'The Stoics called this a first movement. It arrives before reason, so it is not a failure, and not yet yours.' },
  { id: 'story', text: 'The story I wrap around that jolt', answer: 'mine', note: 'Here it becomes yours, and here the later chapters on Buddhism and the clinical methods pick up the thread.' },
];

const eff = (a: Answer): Pick => (a === 'first' ? 'not' : a);
const MINE_TOTAL = ITEMS.filter((i) => eff(i.answer) === 'mine').length;

const OPTIONS: { v: Pick; label: string; col: string; edge: string; fog: string }[] = [
  { v: 'mine', label: 'up to me', col: c.teal, edge: c.tealEdge, fog: c.tealFog },
  { v: 'not', label: 'not up to me', col: c.amber, edge: c.amberEdge, fog: c.amberFog },
];

/**
 * widget_04.1, the dichotomy-of-control sorter. The reader sorts eight items into
 * "up to me" or "not up to me", then checks against the Stoic answer. The payoff:
 * almost everything that lands in "up to me" is a movement of one's own mind, and
 * anxiety lives in the gap where we grip the other bin as if it were this one. The
 * "first movement" item carries the honest seam the rest of the book picks up.
 * Ported from docs/prototypes/DichotomyOfControl.jsx into the shared primitives.
 */
export function DichotomySorter() {
  const [pick, setPick] = useLocalStorage<Record<string, Pick>>('centering:widget:tranquility-by-judgment:pick', {});
  const [shown, setShown] = useLocalStorage<boolean>('centering:widget:tranquility-by-judgment:shown', false);

  const sorted = ITEMS.filter((i) => pick[i.id]).length;
  const correct = ITEMS.filter((i) => pick[i.id] && pick[i.id] === eff(i.answer)).length;

  const assign = (id: string, v: Pick) => {
    if (!shown) setPick((p) => ({ ...p, [id]: v }));
  };
  const reset = () => {
    setPick({});
    setShown(false);
  };

  return (
    <WidgetShell
      id="04.1"
      name="sort_it"
      title="Which bin does each one belong in?"
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
              check against the Stoics <ArrowRight size={13} />
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
      <div style={{ padding: '14px 14px 4px' }}>
        {ITEMS.map((it) => {
          const sel = pick[it.id];
          const right = sel && sel === eff(it.answer);
          const isFirst = it.answer === 'first';
          const borderCol = shown && sel ? (right ? c.tealEdge : c.amberEdge) : c.line;
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
                <p id={`item-${it.id}`} style={{ fontSize: 14.5, lineHeight: 1.5, margin: 0, color: c.text }}>
                  {it.text}
                </p>
                {shown && sel && (
                  <span style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
                    {right ? (
                      <Check size={16} color={c.teal} strokeWidth={2.5} />
                    ) : (
                      <X size={16} color={c.amber} strokeWidth={2.5} />
                    )}
                  </span>
                )}
              </div>

              <div role="group" aria-labelledby={`item-${it.id}`} style={{ display: 'flex', gap: 8, marginTop: 11 }}>
                {OPTIONS.map((opt) => {
                  const active = sel === opt.v;
                  return (
                    <button
                      key={opt.v}
                      type="button"
                      aria-pressed={active}
                      onClick={() => assign(it.id, opt.v)}
                      disabled={shown}
                      style={{
                        ...mono,
                        flex: 1,
                        cursor: shown ? 'default' : 'pointer',
                        fontSize: 12,
                        padding: '9px 8px',
                        borderRadius: 8,
                        border: `1px solid ${active ? opt.edge : c.line}`,
                        background: active ? opt.fog : 'transparent',
                        color: active ? opt.col : c.faint,
                        transition: 'all .14s ease',
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {shown && sel && (
                <div style={{ marginTop: 11, paddingTop: 11, borderTop: `1px solid ${c.line}` }}>
                  {isFirst && (
                    <span
                      style={{
                        ...mono,
                        fontSize: 10.5,
                        color: c.teal,
                        border: `1px solid ${c.tealEdge}`,
                        borderRadius: 5,
                        padding: '2px 6px',
                        marginRight: 8,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      first_movement
                    </span>
                  )}
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: c.muted }}>{it.note}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {shown && (
        <div style={{ padding: '16px 18px 20px', borderTop: `1px solid ${c.line}`, background: c.tealFog }}>
          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <CornerDownRight size={15} color={c.teal} style={{ marginTop: 3, flexShrink: 0 }} />
            <p style={{ fontSize: 14, lineHeight: 1.66, color: c.text, margin: 0 }}>
              Only {MINE_TOTAL} of {ITEMS.length} landed in{' '}
              <span style={{ color: c.teal }}>up_to_me</span>, and notice what they share. Every one is a
              movement of your own mind: a judgment, an effort, a response, the story you tell. Everything
              external fell to the other side. Anxiety lives in the gap where we treat that side as if it
              were this one.
            </p>
          </div>
        </div>
      )}
    </WidgetShell>
  );
}
