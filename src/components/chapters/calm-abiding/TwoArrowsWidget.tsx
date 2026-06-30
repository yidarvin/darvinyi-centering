import { RotateCcw, CornerDownRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

interface Scenario {
  id: string;
  label: string;
  firstArrow: string;
  secondVoice: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'word',
    label: 'a sharp word',
    firstArrow: 'Someone you respect said something cutting. The sting is real and immediate.',
    secondVoice: '“How dare they. What did they mean. I will never live this down.”',
  },
  {
    id: 'body',
    label: 'pain that won’t quit',
    firstArrow: 'Your back, your head, an injury. A raw, physical hurt that is simply present.',
    secondVoice: '“This is unbearable. It will never end. Why is this happening to me.”',
  },
  {
    id: 'plan',
    label: 'a plan fell through',
    firstArrow: 'Something you wanted did not happen. The disappointment lands in the chest.',
    secondVoice: '“I always ruin this. It is a disaster. Everything is going wrong.”',
  },
  {
    id: 'wait',
    label: 'waiting for news',
    firstArrow: 'A test result, a decision, a call that has not come. The uncertainty aches.',
    secondVoice: '“It is going to be bad. I cannot stand this. Make it stop.”',
  },
];

const RMAX = 3; // resistance can multiply the second arrow up to 3x the bare pain
const H = 216; // px height of the bar track
const UNIT = H / (1 + RMAX); // pain occupies one unit; the rest is room for the second arrow

function verdict(r: number): { head: string; body: string; col: string } {
  if (r < 0.04)
    return {
      head: 'one arrow, not two',
      body: 'The pain is here, felt fully. But you have stopped firing the second arrow. This is the trained response: not numbness, not gritted teeth, just the bare feeling without the war on top of it.',
      col: c.teal,
    };
  if (r < 0.9)
    return {
      head: 'a small second arrow',
      body: 'A little resistance has crept in. The pain is the same size it always was. What grew is the part you added by leaning against it.',
      col: c.amber,
    };
  if (r < 2)
    return {
      head: 'the second arrow, now larger than the first',
      body: 'Notice what moved and what did not. The pain (coral) never changed. Every bit of the growth is resistance, the story and the struggle stacked on top.',
      col: c.amber,
    };
  return {
    head: 'mostly second arrow now',
    body: 'Almost all of what you are feeling is no longer the pain. It is the fight against the pain. This is where suffering lives, and it is the part that answers to practice.',
    col: c.coral,
  };
}

/**
 * widget_06.1, the two arrows. The reader picks a painful situation and then works
 * a single slider: resistance. The coral bar (pain, the first arrow) never moves.
 * The amber bar above it (the second arrow) is pain multiplied by resistance, and
 * it grows and shrinks as the reader drags. The felt teaching: turn resistance
 * toward zero and the suffering collapses back onto the pain, one arrow not two,
 * while the pain itself remains, because equanimity is not anesthesia. The concept
 * is the Sallatha Sutta (SN 36.6); the multiplier is Shinzen Young's modern
 * shorthand, named as such.
 */
export function TwoArrowsWidget() {
  const [sceneId, setSceneId] = useLocalStorage<string>('centering:widget:calm-abiding:scene', 'word');
  const [slider, setSlider] = useLocalStorage<number>('centering:widget:calm-abiding:resistance', 65);

  const scene = SCENARIOS.find((s) => s.id === sceneId) ?? SCENARIOS[0];
  const resistance = (slider / 100) * RMAX;
  const painH = UNIT;
  const secondH = UNIT * resistance;
  const v = verdict(resistance);

  return (
    <WidgetShell
      id="06.1"
      name="the_second_arrow"
      title="The pain is the first arrow. Resistance is the second."
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: v.col, whiteSpace: 'nowrap' }}>
          {resistance < 0.04 ? 'one arrow' : 'two arrows'}
        </span>
      }
      footer={
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>
            concept: Sallatha Sutta, SN 36.6 · the formula “suffering = pain × resistance” is Shinzen
            Young’s modern shorthand, not the canon
          </span>
          {slider !== 65 && (
            <button
              type="button"
              onClick={() => setSlider(65)}
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
          )}
        </div>
      }
    >
      {/* scenario picker */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          padding: '13px 16px',
          borderBottom: `1px solid ${c.line}`,
          background: c.panel,
        }}
      >
        {SCENARIOS.map((s) => {
          const active = s.id === sceneId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSceneId(s.id)}
              style={{
                ...mono,
                cursor: 'pointer',
                fontSize: 11.5,
                padding: '7px 11px',
                borderRadius: 8,
                border: `1px solid ${active ? c.coralEdge : c.line2}`,
                background: active ? c.coralFog : 'transparent',
                color: active ? c.coral : c.muted,
                transition: 'all .14s ease',
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '18px 16px 6px', display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        {/* the bar */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flex: '0 0 auto', margin: '0 auto' }}>
          <svg
            viewBox={`0 0 132 ${H + 28}`}
            style={{ width: 132, height: H + 28 }}
            role="img"
            aria-label={`Felt suffering for "${scene.label}". The pain bar is fixed. The second-arrow bar above it is pain times resistance, currently ${resistance.toFixed(1)} times the pain.`}
          >
            {/* track */}
            <rect x={40} y={14} width={52} height={H} rx={7} fill={c.panel} stroke={c.line} />

            {/* second arrow (amber), stacked on top of pain */}
            <rect
              x={40}
              y={14 + (H - painH - secondH)}
              width={52}
              height={secondH}
              rx={secondH > 6 ? 6 : 0}
              fill={c.amberFog}
              stroke={c.amber}
              strokeOpacity={0.8}
              style={{ transition: 'all .12s ease' }}
            />
            {/* pain (coral), fixed at the bottom */}
            <rect
              x={40}
              y={14 + (H - painH)}
              width={52}
              height={painH}
              rx={6}
              fill={c.coralFog}
              stroke={c.coral}
            />
            {/* the seam between first and second arrow */}
            <line
              x1={36}
              y1={14 + (H - painH)}
              x2={96}
              y2={14 + (H - painH)}
              stroke={c.coral}
              strokeWidth={1}
              strokeDasharray="2 3"
              strokeOpacity={0.7}
            />

            {/* labels */}
            <text x={34} y={14 + (H - painH) + painH / 2 + 3} textAnchor="end" fontFamily={mono.fontFamily} fontSize={9} fill={c.coral}>
              pain
            </text>
            {secondH > 14 && (
              <text
                x={34}
                y={14 + (H - painH - secondH) + secondH / 2 + 3}
                textAnchor="end"
                fontFamily={mono.fontFamily}
                fontSize={9}
                fill={c.amber}
              >
                second
              </text>
            )}
          </svg>
        </div>

        {/* the controls + read-out */}
        <div style={{ flex: '1 1 240px', minWidth: 220 }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 4px' }}>
            <span style={{ ...mono, fontSize: 11, color: c.coral }}>first arrow · </span>
            {scene.firstArrow}
          </p>

          <div style={{ margin: '16px 0 6px' }}>
            <label
              htmlFor="resistance-slider"
              style={{ ...mono, fontSize: 11.5, color: c.amber, display: 'block', marginBottom: 8 }}
            >
              how hard are you fighting it?
            </label>
            <input
              id="resistance-slider"
              type="range"
              min={0}
              max={100}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              style={{ width: '100%', accentColor: c.amber, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', ...mono, fontSize: 10, color: c.faint, marginTop: 2 }}>
              <span>let it be here</span>
              <span>this must not be</span>
            </div>
          </div>

          {resistance > 0.2 && (
            <p style={{ fontSize: 12.5, lineHeight: 1.55, color: c.faint, fontStyle: 'italic', margin: '12px 0 0' }}>
              <span style={{ ...mono, fontSize: 10.5, color: c.amber, fontStyle: 'normal' }}>
                second arrow ·{' '}
              </span>
              {scene.secondVoice}
            </p>
          )}
        </div>
      </div>

      {/* the verdict */}
      <div style={{ padding: '6px 16px 18px' }}>
        <div
          style={{
            border: `1px solid ${v.col}55`,
            borderRadius: 11,
            background: resistance < 0.04 ? c.tealFog : c.panel,
            padding: '13px 14px',
          }}
        >
          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <CornerDownRight size={15} color={v.col} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ ...mono, fontSize: 11.5, color: v.col, marginBottom: 5 }}>{v.head}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.text, margin: 0 }}>{v.body}</p>
            </div>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
