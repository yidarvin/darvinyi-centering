import type { ReactNode } from 'react';
import { RotateCcw, CornerDownRight, ArrowDown } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

const NS = 'centering:widget:the-engineering-of-calm';

interface Example {
  id: string;
  text: string;
}

const EXAMPLES: Example[] = [
  { id: 'perfect', text: "If I'm not perfect at this, I've failed completely." },
  { id: 'silence', text: "They haven't replied. They must be angry with me." },
  { id: 'always', text: 'I always mess things up like this.' },
  { id: 'disaster', text: 'This is going to be a disaster.' },
  { id: 'fraud', text: 'I feel like a fraud, so I must be one.' },
];

interface Distortion {
  id: string;
  label: string;
  gloss: string;
}

// a widely used list descended from Burns's ten in Feeling Good (1980). This
// version keeps mind reading and fortune telling as two separate moves rather
// than folding them into Burns's single "jumping to conclusions," matching how
// the chapter's worked example names them, and it does not include Burns's
// "disqualifying the positive." Close kin to his list, not a reprint of it.
const DISTORTIONS: Distortion[] = [
  { id: 'all-or-nothing', label: 'all-or-nothing', gloss: 'black and white, with nothing in between' },
  { id: 'overgeneralizing', label: 'overgeneralizing', gloss: 'one time becomes always, or never' },
  { id: 'mind-reading', label: 'mind reading', gloss: 'certain you know what they are thinking' },
  { id: 'fortune-telling', label: 'fortune telling', gloss: 'predicting the worst, then treating it as fact' },
  { id: 'catastrophizing', label: 'catastrophizing', gloss: 'blowing the size of the thing way up' },
  { id: 'emotional-reasoning', label: 'emotional reasoning', gloss: 'I feel it, so it must be true' },
  { id: 'labeling', label: 'labeling', gloss: 'a mistake becomes "I am a failure"' },
  { id: 'should-statements', label: 'should statements', gloss: 'rigid musts, and the guilt that follows' },
  { id: 'mental-filter', label: 'mental filter', gloss: 'only the negatives are allowed to count' },
  { id: 'personalizing', label: 'personalizing', gloss: 'taking the blame for what was not yours' },
];

interface Frame {
  id: string;
  label: string;
  wrap: (t: string) => string;
}

// ACT defusion frames: they change the relationship to the thought, not its content
const FRAMES: Frame[] = [
  { id: 'having', label: '"I\'m having the thought that…"', wrap: (t) => `I'm having the thought that ${lower(t)}` },
  { id: 'mind', label: '"My mind is telling me…"', wrap: (t) => `My mind is telling me that ${lower(t)}` },
  { id: 'notice', label: '"I notice I\'m telling myself…"', wrap: (t) => `I notice I'm telling myself ${lower(t)}` },
];

function lower(t: string) {
  const trimmed = t.trim().replace(/[.]+$/, '');
  if (!trimmed) return '';
  // the pronoun "I" (plain, or in "I'm," "I've," "I'll," "I'd") keeps its
  // capital even mid-sentence; only an incidental sentence-initial capital
  // ("If," "This," "They"...) gets lowered
  if (/^I(?:'|\s|$)/.test(trimmed)) return trimmed + '.';
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1) + '.';
}

/**
 * widget_10.1, the thought-distancer. The reader runs one sticky thought through
 * the engineered toolkit: catch it, name its distortion (CBT), step back from it
 * with an ACT defusion frame that visibly pulls the thought to arm's length, then
 * write the truer line (CBT restructuring). Below, a wise-mind locator (DBT) lets
 * the reader find the overlap between acting on the feeling and arguing it away.
 * Everything the reader produces persists. The felt payoff: the same words, held
 * at a distance, stop reading as the world and start reading as weather.
 * Concept: Beck (cognitive model, distortions), Hayes (defusion), Linehan (wise mind).
 */
export function ThoughtDistancer() {
  const [pickId, setPickId] = useLocalStorage<string>(`${NS}:pick`, 'perfect');
  const [custom, setCustom] = useLocalStorage<string>(`${NS}:custom`, '');
  const [spotted, setSpotted] = useLocalStorage<string[]>(`${NS}:spotted`, []);
  const [frameId, setFrameId] = useLocalStorage<string | null>(`${NS}:frame`, null);
  const [reframe, setReframe] = useLocalStorage<string>(`${NS}:reframe`, '');
  const [wm, setWm] = useLocalStorage<number>(`${NS}:wm`, 100);
  const [wmAction, setWmAction] = useLocalStorage<string>(`${NS}:wmAction`, '');

  const thought =
    pickId === 'custom' ? custom.trim() : EXAMPLES.find((e) => e.id === pickId)?.text ?? '';
  const hasThought = thought.length > 0;
  const frame = FRAMES.find((f) => f.id === frameId) ?? null;
  const defused = Boolean(frame) && hasThought;
  const distanced = frame && hasThought ? frame.wrap(thought) : thought;

  const toggleSpot = (id: string) =>
    setSpotted((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const reset = () => {
    setPickId('perfect');
    setCustom('');
    setSpotted([]);
    setFrameId(null);
    setReframe('');
    setWm(100);
    setWmAction('');
  };

  // wise mind: 0 = pure emotion mind, 100 = pure reasonable mind, ~50 = the overlap
  const wmNorm = wm / 100;
  const inWise = wm >= 38 && wm <= 62;
  const wmVoice = inWise
    ? 'Feel the feeling and keep the facts. Then choose the next move from both at once.'
    : wm < 38
      ? 'You are acting straight off the feeling. The urge is loud and the facts are nowhere in the room.'
      : 'You are arguing the feeling out of existence. The logic is airtight and the feeling is still there, unheard.';
  const wmHead = inWise ? 'wise mind' : wm < 38 ? 'emotion mind' : 'reasonable mind';
  const wmCol = inWise ? c.teal : wm < 38 ? c.coral : c.sky;

  return (
    <WidgetShell
      id="10.1"
      name="thought_distancer"
      title="One thought, run through the toolkit"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: defused ? c.teal : c.faint, whiteSpace: 'nowrap' }}>
          {defused ? 'defused' : hasThought ? 'fused' : 'pick a thought'}
        </span>
      }
      footer={
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>
            concept: Beck (the cognitive model, the distortions) · Hayes (ACT defusion) · Linehan (wise mind)
          </span>
          <button
            type="button"
            onClick={reset}
            style={{
              ...mono,
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              fontSize: 12,
              padding: '7px 11px',
              borderRadius: 8,
              border: `1px solid ${c.line2}`,
              background: 'transparent',
              color: c.muted,
            }}
          >
            <RotateCcw size={12} /> reset
          </button>
        </div>
      }
    >
      {/* 1 · catch the thought */}
      <Step n="1" label="catch the thought">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 11 }}>
          {EXAMPLES.map((e) => {
            const active = pickId === e.id;
            return (
              <button
                key={e.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPickId(e.id)}
                style={chip(active)}
              >
                {e.text}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={pickId === 'custom'}
            onClick={() => setPickId('custom')}
            style={chip(pickId === 'custom')}
          >
            my own…
          </button>
        </div>
        {pickId === 'custom' && (
          <textarea
            rows={2}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="write the sticky thought, in its own words…"
            aria-label="your own thought"
            style={textareaStyle}
          />
        )}
      </Step>

      {/* 2 · name the distortion */}
      <Step n="2" label="name the distortion" sub="which moves is this thought making? tap any that fit.">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {DISTORTIONS.map((d) => {
            const active = spotted.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={active}
                title={d.gloss}
                onClick={() => toggleSpot(d.id)}
                style={chip(active, c.amber, c.amberEdge, c.amberFog)}
              >
                {d.label}
              </button>
            );
          })}
        </div>
        {spotted.length > 0 && (
          <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {spotted.map((id) => {
              const d = DISTORTIONS.find((x) => x.id === id)!;
              return (
                <div key={id} style={{ fontSize: 12.5, lineHeight: 1.5, color: c.muted }}>
                  <span style={{ ...mono, color: c.amber, fontSize: 11 }}>{d.label}</span>
                  <span style={{ color: c.faint }}> · {d.gloss}</span>
                </div>
              );
            })}
          </div>
        )}
      </Step>

      {/* 3 · step back from it (the felt distance) */}
      <Step
        n="3"
        label="step back from it"
        sub="defusion does not argue with the thought. it changes how close you stand to it."
      >
        {/* the thought card, fused or defused */}
        <div
          style={{
            border: `1px solid ${defused ? c.tealEdge : hasThought ? c.coralEdge : c.line}`,
            background: defused ? c.tealFog : hasThought ? c.coralFog : c.panel,
            borderRadius: 11,
            padding: defused ? '14px 16px' : '20px 16px',
            marginBottom: 12,
            transition: 'all .2s ease',
            transform: defused ? 'scale(0.97)' : 'scale(1)',
          }}
        >
          <div style={{ ...mono, fontSize: 10, color: defused ? c.teal : c.coral, marginBottom: 7 }}>
            {defused ? 'defused · a thought, seen as a thought' : hasThought ? 'fused · the thought is the world' : 'no thought yet'}
          </div>
          <p
            style={{
              fontSize: defused ? 15 : 17,
              lineHeight: 1.45,
              fontWeight: defused ? 500 : 600,
              color: hasThought ? c.text : c.faint,
              margin: 0,
              transition: 'all .2s ease',
            }}
          >
            {hasThought ? (defused ? `"${distanced}"` : `"${thought}"`) : 'pick or write a thought above.'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
          <ArrowDown size={13} color={c.faint} />
          <span style={{ ...mono, fontSize: 11, color: c.faint }}>wrap it in a defusion frame</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {FRAMES.map((f) => {
            const active = frameId === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                disabled={!hasThought}
                onClick={() => setFrameId(active ? null : f.id)}
                style={{ ...chip(active), opacity: hasThought ? 1 : 0.5 }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </Step>

      {/* 4 · write the truer line */}
      <Step
        n="4"
        label="write the truer line"
        sub="not a cheerier thought. a more accurate one. realism, not positivity."
      >
        <textarea
          rows={3}
          value={reframe}
          onChange={(e) => setReframe(e.target.value)}
          placeholder="what is actually true here, evidence and all?  e.g. 'one missed reply is not anger. people get busy. I can ask if I need to know.'"
          aria-label="your more balanced thought"
          style={textareaStyle}
        />
      </Step>

      {/* wise mind locator (DBT) */}
      <div style={{ padding: '18px 16px 20px', borderTop: `1px solid ${c.line}`, background: c.panel }}>
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 4 }}>
          {'// '}wise mind locator
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: c.muted, margin: '0 0 16px' }}>
          A different tool from Linehan, for the heat of the moment. Slide toward wherever the pull is
          strongest right now, straight off the feeling or arguing it away. The middle is not a formula,
          half feeling plus half logic. It only marks where the pull is roughly balanced. Wise mind
          itself is the settled, both-at-once knowing that balance points toward, not the average of
          the two.
        </p>

        {/* the two overlapping minds */}
        <svg
          viewBox="0 0 300 96"
          style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 360, margin: '0 auto 6px' }}
          role="img"
          aria-label={`A dial between emotion mind and reasonable mind. You are currently at ${wmHead}.`}
        >
          <circle cx={118} cy={48} r={40} fill={c.coralFog} stroke={c.coral} strokeWidth={1.3} strokeOpacity={inWise || wm < 38 ? 1 : 0.4} />
          <circle cx={182} cy={48} r={40} fill="rgba(56,189,248,0.10)" stroke={c.sky} strokeWidth={1.3} strokeOpacity={inWise || wm > 62 ? 1 : 0.4} />
          <text x={78} y={51} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8.5} fill={c.coral}>
            emotion
          </text>
          <text x={222} y={51} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8.5} fill={c.sky}>
            reason
          </text>
          {inWise && (
            <text x={150} y={51} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={9} fontWeight={600} fill={c.teal}>
              wise
            </text>
          )}
          {/* the marker dot, slides with the value */}
          <circle cx={88 + wmNorm * 124} cy={92} r={4} fill={wmCol} />
        </svg>

        <label htmlFor="wm-slider" className="visually-hidden">
          balance between emotion mind and reasonable mind
        </label>
        <input
          id="wm-slider"
          type="range"
          min={0}
          max={100}
          value={wm}
          onChange={(e) => setWm(Number(e.target.value))}
          style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto', accentColor: wmCol, cursor: 'pointer' }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 360,
            margin: '2px auto 0',
            ...mono,
            fontSize: 10,
            color: c.faint,
          }}
        >
          <span>act on the feeling</span>
          <span>argue it away</span>
        </div>

        <div
          style={{
            maxWidth: 360,
            margin: '14px auto 0',
            border: `1px solid ${wmCol}55`,
            borderRadius: 10,
            background: inWise ? c.tealFog : c.panel2,
            padding: '11px 13px',
          }}
        >
          <div style={{ ...mono, fontSize: 11, color: wmCol, marginBottom: 5 }}>{wmHead}</div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: c.text, margin: 0 }}>{wmVoice}</p>
        </div>

        <div style={{ maxWidth: 360, margin: '12px auto 0' }}>
          <label
            htmlFor="wm-action"
            style={{ ...mono, fontSize: 11, color: c.muted, display: 'block', marginBottom: 7 }}
          >
            what would wise mind actually do next?
          </label>
          <textarea
            id="wm-action"
            rows={2}
            value={wmAction}
            onChange={(e) => setWmAction(e.target.value)}
            placeholder="one small, doable next step that honors the feeling and the facts…"
            style={textareaStyle}
          />
        </div>

        {(defused || reframe.trim() || wmAction.trim()) && (
          <div style={{ maxWidth: 360, margin: '16px auto 0', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <CornerDownRight size={15} color={c.teal} style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, lineHeight: 1.62, color: c.text, margin: 0 }}>
              Notice that nothing here deleted the thought or the feeling. You named the move it was
              making, set it at a distance, found the truer line, and chose a next step with the feeling
              still in the room. That is the whole toolkit in one pass, and it gets faster
              each time you run it.
            </p>
          </div>
        )}
      </div>
    </WidgetShell>
  );
}

function Step({
  n,
  label,
  sub,
  children,
}: {
  n: string;
  label: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ padding: '16px 16px', borderBottom: `1px solid ${c.line}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: sub ? 3 : 11 }}>
        <span style={{ ...mono, fontSize: 11.5, color: c.tealDim }}>{n}</span>
        <span style={{ ...mono, fontSize: 12, color: c.text, letterSpacing: '.02em' }}>{label}</span>
      </div>
      {sub && <p style={{ fontSize: 12.5, lineHeight: 1.5, color: c.faint, margin: '0 0 11px' }}>{sub}</p>}
      {children}
    </div>
  );
}

function chip(active: boolean, col: string = c.teal, edge: string = c.tealEdge, fog: string = c.tealFog) {
  return {
    ...mono,
    cursor: 'pointer',
    fontSize: 11.5,
    lineHeight: 1.35,
    textAlign: 'left' as const,
    padding: '7px 11px',
    borderRadius: 8,
    border: `1px solid ${active ? edge : c.line2}`,
    background: active ? fog : 'transparent',
    color: active ? col : c.muted,
    transition: 'all .14s ease',
  };
}

const textareaStyle = {
  ...mono,
  width: '100%',
  boxSizing: 'border-box' as const,
  resize: 'vertical' as const,
  background: c.panel2,
  color: c.text,
  border: `1px solid ${c.line}`,
  borderRadius: 8,
  padding: '11px 12px',
  fontSize: 13,
  lineHeight: 1.6,
};
