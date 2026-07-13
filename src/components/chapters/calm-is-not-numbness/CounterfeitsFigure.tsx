import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

const SLATE = '#7c8794';
const SLATE_FOG = 'rgba(124,135,148,0.10)';
const SLATE_EDGE = 'rgba(124,135,148,0.42)';

type Kind = 'equanimity' | 'bypassing' | 'avoidance' | 'toxicPositivity';

interface LaneData {
  kind: Kind;
  tag: string;
  title: string;
  looks: string;
  feeling: string;
  color: string;
  fog: string;
  edge: string;
  toward: boolean;
}

/**
 * A small shared chart, one per lane. The frame is the same in each: a baseline,
 * a feeling that rises, and a marker for you. What differs is what happens to the
 * feeling and where you are while it happens.
 *
 *   equanimity      → the feeling crests and passes, and you stay with it (met)
 *   bypassing       → the feeling stays, and you float up and away above it (skipped)
 *   avoidance       → the feeling stays, and you leave the frame (escaped)
 *   toxicPositivity → the feeling stays, and a forced smile is pressed over it while you stay put (suppressed)
 */
function Glyph({ kind, color, fog }: { kind: Kind; color: string; fog: string }) {
  const label =
    kind === 'equanimity'
      ? 'The feeling rises into a wave and returns near the baseline while you stay in contact with it. It is met, and it passes.'
      : kind === 'bypassing'
      ? 'The feeling stays raised near the baseline while you float up and away above it. It is stepped over, not met, and it persists underneath.'
      : kind === 'avoidance'
      ? 'The feeling stays raised while you leave the frame entirely. It is escaped, not met, and it persists behind you.'
      : 'The feeling stays raised while a flat, bright line, a forced smile, is pressed over it. You stay in the frame, holding the lid down. It is suppressed, not met, and it persists underneath.';

  return (
    <svg
      viewBox="0 0 168 84"
      style={{ width: '100%', height: 'auto', display: 'block', marginTop: 6 }}
      role="img"
      aria-label={label}
    >
      {/* baseline */}
      <line x1={14} y1={66} x2={158} y2={66} stroke={c.line2} strokeWidth={1} />
      <text x={152} y={78} textAnchor="end" fontFamily={monoFamily} fontSize={7} fill={c.faint}>
        time →
      </text>

      {kind === 'equanimity' && (
        <>
          {/* the wave: met, crests, returns near baseline */}
          <path d="M14 66 C46 66, 58 20, 86 20 C114 20, 126 62, 158 64 L158 66 L14 66 Z" fill={fog} />
          <path d="M14 66 C46 66, 58 20, 86 20 C114 20, 126 62, 158 64" fill="none" stroke={color} strokeWidth={2} />
          {/* you, staying with the feeling through the crest */}
          <circle cx={86} cy={20} r={4.4} fill="none" stroke={color} strokeWidth={1.4} />
          <circle cx={86} cy={20} r={1.7} fill={color} />
          <text x={86} y={13} textAnchor="middle" fontFamily={monoFamily} fontSize={7} fill={color}>
            you
          </text>
        </>
      )}

      {kind === 'bypassing' && (
        <>
          {/* the feeling stays raised, unmet, under the lid */}
          <path d="M14 66 C46 54, 60 48, 90 48 L150 48 C156 48, 158 50, 158 52 L158 66 Z" fill={fog} />
          <path d="M14 66 C46 54, 60 48, 90 48 L150 48 C156 48, 158 50, 158 52" fill="none" stroke={color} strokeWidth={2} />
          {/* you, lifting up and away above it */}
          <path d="M86 44 C86 34, 100 30, 104 20" fill="none" stroke={color} strokeWidth={1.2} strokeDasharray="3 3" />
          <path d="M100 24 L104 18 L108 25" fill="none" stroke={color} strokeWidth={1.2} />
          <circle cx={104} cy={16} r={4.4} fill="none" stroke={color} strokeWidth={1.4} />
          <circle cx={104} cy={16} r={1.7} fill={color} />
          <text x={104} y={9} textAnchor="middle" fontFamily={monoFamily} fontSize={7} fill={color}>
            you
          </text>
          <circle cx={152} cy={49} r={2.2} fill={color} />
        </>
      )}

      {kind === 'avoidance' && (
        <>
          {/* the feeling stays raised, unmet */}
          <path d="M14 66 C46 54, 60 48, 90 48 L150 48 C156 48, 158 50, 158 52 L158 66 Z" fill={fog} />
          <path d="M14 66 C46 54, 60 48, 90 48 L150 48 C156 48, 158 50, 158 52" fill="none" stroke={color} strokeWidth={2} />
          {/* you, leaving the frame to the left */}
          <circle cx={40} cy={30} r={4.4} fill="none" stroke={color} strokeWidth={1.4} />
          <circle cx={40} cy={30} r={1.7} fill={color} />
          <path d="M34 30 L18 30" fill="none" stroke={color} strokeWidth={1.2} strokeDasharray="3 3" />
          <path d="M23 26 L17 30 L23 34" fill="none" stroke={color} strokeWidth={1.2} />
          <text x={44} y={23} fontFamily={monoFamily} fontSize={7} fill={color}>
            you
          </text>
          <circle cx={152} cy={49} r={2.2} fill={color} />
        </>
      )}

      {kind === 'toxicPositivity' && (
        <>
          {/* the feeling stays raised, unmet, same as bypassing and avoidance */}
          <path d="M14 66 C46 54, 60 48, 90 48 L150 48 C156 48, 158 50, 158 52 L158 66 Z" fill={fog} />
          <path d="M14 66 C46 54, 60 48, 90 48 L150 48 C156 48, 158 50, 158 52" fill="none" stroke={color} strokeWidth={2} />
          {/* the forced smile, a flat bright line pressed down over the feeling */}
          <path d="M38 27 L142 27" fill="none" stroke={color} strokeWidth={1.8} />
          <text x={90} y={19} textAnchor="middle" fontFamily={monoFamily} fontSize={6.5} fill={color}>
            "good vibes only"
          </text>
          {/* you, staying put, holding the smile down over the feeling underneath */}
          <path d="M90 40 L86 32 M90 40 L94 32" fill="none" stroke={color} strokeWidth={1.2} />
          <circle cx={90} cy={44} r={4.4} fill="none" stroke={color} strokeWidth={1.4} />
          <circle cx={90} cy={44} r={1.7} fill={color} />
          <text x={102} y={47} textAnchor="start" fontFamily={monoFamily} fontSize={7} fill={color}>
            you
          </text>
        </>
      )}
    </svg>
  );
}

function Lane({ data }: { data: LaneData }) {
  const { tag, title, looks, feeling, color, fog, edge, toward, kind } = data;
  return (
    <div
      style={{
        flex: '1 1 210px',
        minWidth: 0,
        border: `1px solid ${toward ? edge : c.line}`,
        borderRadius: 11,
        background: toward ? fog : c.panel2,
        padding: '13px 13px 14px',
      }}
    >
      <div style={{ ...mono, fontSize: 10.5, color, marginBottom: 3, letterSpacing: '.03em' }}>{tag}</div>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: c.text, marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: c.muted, lineHeight: 1.5, marginBottom: 2 }}>{looks}</div>
      <Glyph kind={kind} color={color} fog={fog} />
      <div style={{ ...mono, fontSize: 10, color: c.faint, marginTop: 9, marginBottom: 8, lineHeight: 1.5 }}>
        the feeling: <span style={{ color }}>{feeling}</span>
      </div>
      <div
        style={{
          ...mono,
          fontSize: 10.5,
          color: toward ? color : SLATE,
          border: `1px solid ${toward ? edge : SLATE_EDGE}`,
          background: toward ? fog : SLATE_FOG,
          borderRadius: 6,
          padding: '3px 8px',
          display: 'inline-block',
        }}
      >
        {toward ? '→ toward your life' : '← away from your life'}
      </div>
    </div>
  );
}

const LANES: LaneData[] = [
  {
    kind: 'equanimity',
    tag: 'the_real_thing',
    title: 'Engaged equanimity',
    looks: 'Settled and still here. The feeling is felt, all the way.',
    feeling: 'met, and it passes',
    color: c.teal,
    fog: c.tealFog,
    edge: c.tealEdge,
    toward: true,
  },
  {
    kind: 'bypassing',
    tag: 'counterfeit_1',
    title: 'Spiritual bypassing',
    looks: 'Rising above it. "I am at peace with it," a little too fast.',
    feeling: 'skipped, still there',
    color: c.violet,
    fog: c.violetFog,
    edge: c.violetEdge,
    toward: false,
  },
  {
    kind: 'avoidance',
    tag: 'counterfeit_2',
    title: 'Avoidance',
    looks: 'Using the calm to not go near the thing at all.',
    feeling: 'escaped, still there',
    color: c.amber,
    fog: c.amberFog,
    edge: c.amberEdge,
    toward: false,
  },
  {
    kind: 'toxicPositivity',
    tag: 'counterfeit_3',
    title: 'Toxic positivity',
    looks: 'A forced smile pressed over it. "Good vibes only," and the feeling goes unheard.',
    feeling: 'suppressed, still there',
    color: SLATE,
    fog: SLATE_FOG,
    edge: SLATE_EDGE,
    toward: false,
  },
];

/**
 * fig_18.1a: real calm and its three counterfeits. All four can look calm from
 * across the room: a settled face, a low voice, no visible storm. The tell is not
 * in the body. It is what the state does with a feeling, and which direction it
 * leaves you facing. Equanimity meets the feeling and returns you toward your
 * life. Bypassing floats above it, avoidance leaves the room, toxic positivity
 * smiles over it, and all three leave the feeling unmet and turn you away. This
 * chapter's three counterfeits, the ones it goes on to explain in depth, not the
 * plain sedation Chapter 1 already covered.
 */
export function CounterfeitsFigure() {
  return (
    <Figure
      caption="fig_18.1a · real_calm_and_its_counterfeits"
      sub="all four can pass for calm in a photograph. the difference is what each does with a feeling, and whether it turns you toward your life or away from it. only the first meets the feeling and stays."
      max={640}
    >
      <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
        {LANES.map((l) => (
          <Lane key={l.kind} data={l} />
        ))}
      </div>
    </Figure>
  );
}
