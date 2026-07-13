import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

// legibility redesign: viewBox width dropped from 460 to 340 (and max to match,
// so the figure renders near-native at the 360px phone breakpoint) and the four
// unlit candidates moved from a cramped 2x2 grid into one row beneath the beam
// scene, freeing horizontal room for larger type. Font sizes below are chosen
// so every text element clears an 11px effective size at 288px rendered width:
// scale = 288 / 340 = 0.847; 13.5 * 0.847 = 11.4px; 16.5 * 0.847 = 14.0px.
const FS_DIM = 13.5; // dim candidates, "attention", "lit · vivid", the caption line
const FS_EMPH = 16.5; // "the breath": the one lit, named object

// candidates competing for the beam, now a single row below the beam scene.
// widest labels ("this page") sit in the inner slots so nothing crowds the edge.
const DIM = [
  { x: 45, label: 'a worry' },
  { x: 129, label: 'a plan' },
  { x: 213, label: 'this page' },
  { x: 297, label: 'a sound' },
];
const DIM_Y = 188; // circle center
const DIM_LABEL_Y = DIM_Y - 21; // label baseline, clear of the circle

const SRC = { x: 48, y: 86 };
const LIT = { x: 255, y: 86 };

/**
 * fig_03.4a: attention as a spotlight. A narrow, movable beam. What it lands on
 * grows vivid and detailed; everything outside it dims to background. The beam
 * can be aimed, and aiming it is the skill the rest of the book trains.
 */
export function AttentionSpotlightFigure() {
  return (
    <Figure
      caption="fig_03.4a · attention_as_a_spotlight"
      sub="attention is a narrow, movable beam. what it lands on grows vivid; the rest dims to background. you can aim it, and aiming it is a trainable skill."
      max={340}
    >
      <svg
        viewBox="0 0 340 252"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A source labeled attention on the left casts a teal cone of light onto one object, the breath, which is bright and vivid. Below the beam, four other objects (a worry, a plan, this page, a sound) sit in a row, dim and faint, none of them lit."
      >
        <defs>
          <linearGradient id="as-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c.teal} stopOpacity={0.04} />
            <stop offset="100%" stopColor={c.teal} stopOpacity={0.22} />
          </linearGradient>
          <radialGradient id="as-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.teal} stopOpacity={0.35} />
            <stop offset="65%" stopColor={c.teal} stopOpacity={0.07} />
            <stop offset="100%" stopColor={c.teal} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* the beam: a cone from the source to the lit object */}
        <polygon
          points={`${SRC.x + 7.5},${SRC.y} ${LIT.x - 14},${LIT.y - 14} ${LIT.x - 14},${LIT.y + 14}`}
          fill="url(#as-beam)"
        />

        {/* the source: where attention is cast from */}
        <circle cx={SRC.x} cy={SRC.y} r={7.5} fill={c.panel2} stroke={c.teal} strokeWidth={1.8} />
        <circle cx={SRC.x} cy={SRC.y} r={2.8} fill={c.teal} />
        <text
          x={SRC.x}
          y={118}
          textAnchor="middle"
          fontFamily={monoFamily}
          fontSize={FS_DIM}
          fill={c.muted}
        >
          attention
        </text>

        {/* the lit object: vivid, full of detail */}
        <circle cx={LIT.x} cy={LIT.y} r={40} fill="url(#as-glow)" />
        <circle cx={LIT.x} cy={LIT.y} r={14} fill={c.tealFog} stroke={c.teal} strokeWidth={2.2} />
        <circle cx={LIT.x} cy={LIT.y} r={4.2} fill={c.teal} />
        <text
          x={LIT.x}
          y={55}
          textAnchor="middle"
          fontFamily={monoFamily}
          fontSize={FS_EMPH}
          fontWeight={500}
          fill={c.teal}
        >
          the breath
        </text>
        <text
          x={LIT.x}
          y={125}
          textAnchor="middle"
          fontFamily={monoFamily}
          fontSize={FS_DIM}
          fill={c.muted}
        >
          lit · vivid
        </text>

        {/* the unlit candidates: faint, easy to miss, none of them chosen */}
        {DIM.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={DIM_Y} r={7} fill="none" stroke={c.faint} strokeWidth={1.3} />
            <text
              x={d.x}
              y={DIM_LABEL_Y}
              textAnchor="middle"
              fontFamily={monoFamily}
              fontSize={FS_DIM}
              fill={c.faint}
            >
              {d.label}
            </text>
          </g>
        ))}

        <text x={170} y={232} textAnchor="middle" fontFamily={monoFamily} fontSize={FS_DIM} fill={c.faint}>
          everything else fades to background
        </text>
      </svg>
    </Figure>
  );
}
