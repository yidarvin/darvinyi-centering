import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

interface LaneProps {
  tag: string;
  title: string;
  sub: string;
  color: string;
  fog: string;
  edge: string;
  chips: string[];
  chart: 'suppress' | 'allow';
}

function Chart({ kind, color, fog }: { kind: 'suppress' | 'allow'; color: string; fog: string }) {
  // shared frame: baseline at y=92, time runs left to right, up is more felt intensity
  return (
    <svg
      viewBox="0 0 210 116"
      style={{ width: '100%', height: 'auto', display: 'block', marginTop: 4 }}
      role="img"
      aria-label={
        kind === 'suppress'
          ? 'Felt intensity stays high under a clamped lid: the outward expression is flattened, but the feeling and its cost do not return to baseline.'
          : 'Felt intensity rises into a wave and returns close to baseline: the feeling is met, crests, and passes.'
      }
    >
      {/* axes */}
      <line x1={16} y1={92} x2={200} y2={92} stroke={c.line2} strokeWidth={1} />
      <line x1={16} y1={14} x2={16} y2={92} stroke={c.line} strokeWidth={1} />
      <text x={8} y={20} fontFamily={monoFamily} fontSize={7.5} fill={c.faint}>
        felt
      </text>
      <text x={196} y={104} textAnchor="end" fontFamily={monoFamily} fontSize={7.5} fill={c.faint}>
        time →
      </text>

      {kind === 'suppress' ? (
        <>
          {/* contained pressure under the lid */}
          <path
            d="M16 92 L16 90 C40 56, 56 48, 78 48 L150 48 C172 50, 184 58, 200 64 L200 92 Z"
            fill={fog}
          />
          {/* the clamped expression curve: rises, flattens under the lid, stays elevated */}
          <path
            d="M16 90 C40 56, 56 48, 78 48 L150 48 C172 50, 184 58, 200 64"
            fill="none"
            stroke={color}
            strokeWidth={2}
          />
          {/* the lid */}
          <line x1={58} y1={43} x2={168} y2={43} stroke={color} strokeWidth={1.4} strokeDasharray="4 3" />
          <text x={113} y={38} textAnchor="middle" fontFamily={monoFamily} fontSize={7.5} fill={color}>
            the lid
          </text>
          {/* pressure pushing up against the lid */}
          {[78, 100, 122, 144].map((x) => (
            <path key={x} d={`M${x} 56 L${x} 48`} stroke={color} strokeWidth={1} markerEnd="" />
          ))}
          {[78, 100, 122, 144].map((x) => (
            <path key={`h${x}`} d={`M${x - 2.5} 50 L${x} 47 L${x + 2.5} 50`} fill="none" stroke={color} strokeWidth={1} />
          ))}
          {/* stays elevated at the end */}
          <circle cx={200} cy={64} r={2.4} fill={color} />
        </>
      ) : (
        <>
          {/* the wave: met, crests, returns near baseline */}
          <path d="M16 92 C56 92, 70 30, 104 30 C140 30, 152 86, 200 88 L200 92 L16 92 Z" fill={fog} />
          <path
            d="M16 92 C56 92, 70 30, 104 30 C140 30, 152 86, 200 88"
            fill="none"
            stroke={color}
            strokeWidth={2}
          />
          {/* the witness, staying in contact through the crest */}
          <circle cx={104} cy={30} r={4.6} fill="none" stroke={color} strokeWidth={1.4} />
          <circle cx={104} cy={30} r={1.7} fill={color} />
          <text x={104} y={22} textAnchor="middle" fontFamily={monoFamily} fontSize={7.5} fill={color}>
            stay with it
          </text>
          {/* it passes */}
          <circle cx={200} cy={88} r={2.4} fill={color} />
        </>
      )}
    </svg>
  );
}

function Lane({ tag, title, sub, color, fog, edge, chips, chart }: LaneProps) {
  return (
    <div
      style={{
        flex: '1 1 220px',
        minWidth: 0,
        border: `1px solid ${c.line}`,
        borderRadius: 11,
        background: c.panel2,
        padding: '14px 14px 15px',
      }}
    >
      <div style={{ ...mono, fontSize: 11, color, marginBottom: 3, letterSpacing: '.03em' }}>{tag}</div>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: c.text, marginBottom: 2 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: c.muted, lineHeight: 1.5, marginBottom: 6 }}>{sub}</div>
      <Chart kind={chart} color={color} fog={fog} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 11 }}>
        {chips.map((ch) => (
          <span
            key={ch}
            style={{
              ...mono,
              fontSize: 10.5,
              color,
              border: `1px solid ${edge}`,
              background: fog,
              borderRadius: 6,
              padding: '3px 7px',
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * fig_01.1b: equanimity versus suppression. Two responses to the same feeling.
 * Suppression clamps the outward expression while the feeling, and its cost to
 * body, memory, and connection, stay elevated. Equanimity keeps you in contact,
 * so the wave can crest and pass. This is the line Chapter 18 returns to.
 */
export function EquanimitySuppressionFigure() {
  return (
    <Figure
      caption="fig_01.1b · suppression_vs_equanimity"
      sub="same feeling, two responses. suppression hides the signal and keeps the load. meeting the feeling without resistance lets it move."
      max={560}
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Lane
          tag="response_a"
          title="Suppression"
          sub="Push the feeling down. Hold the face still."
          color={c.coral}
          fog={c.coralFog}
          edge={c.coralEdge}
          chart="suppress"
          chips={['the feeling persists', 'body load ↑', 'memory ↓', 'rapport ↓']}
        />
        <Lane
          tag="response_b"
          title="Equanimity"
          sub="Let the feeling be felt. Stay in the room."
          color={c.teal}
          fog={c.tealFog}
          edge={c.tealEdge}
          chart="allow"
          chips={['stays in contact', 'reactivity ↓', 'the wave passes', 'still here']}
        />
      </div>
    </Figure>
  );
}
