import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const monoFamily = mono.fontFamily;

/**
 * fig_05.3a: the symmetry of non-being. Epicurus's core claim is that death is
 * nothing to us, because where death is, we are not (Letter to Menoeceus 125,
 * Principal Doctrines II). Lucretius adds the image that fixes it: the endless time
 * before our birth, which never troubled us, is the mirror of the endless time
 * after our death. The two voids get the identical treatment here, on purpose, to
 * make the reflection visible. The argument is about being dead, not the dying.
 */
export function SymmetryArgumentFigure() {
  return (
    <Figure
      caption="fig_05.3a · the_symmetry_of_non_being"
      sub="Epicurus, Letter to Menoeceus 125; Lucretius, On the Nature of Things 3 (the mirror of past and future time). the eternity before you were born never once troubled you. the eternity after is its mirror. this answers the fear of being dead, not the grief of others or the pain of dying."
      max={480}
    >
      <svg
        viewBox="0 0 300 250"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A timeline mirrored around your life. On the left, an endless void, before birth, marked with an infinity symbol and labelled nothing to you. In the centre, a highlighted bar, your life, the only part you are in. On the right, an endless void, after death, drawn identically to the left and also labelled nothing to you. A dashed mirror line runs through the centre of your life. Below the diagram: you weren't there to mind the first, you won't be there to mind the second."
      >
        {/* mirror axis through the centre of the life bar */}
        <text x={150} y={22} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.faint}>
          mirror
        </text>
        <line x1={150} y1={30} x2={150} y2={192} stroke={c.faint} strokeWidth={1} strokeDasharray="3 5" strokeOpacity={0.7} />

        {/* left void: before birth */}
        <rect x={5} y={86} width={100} height={56} rx={5} fill="rgba(255,255,255,0.02)" stroke={c.faint} strokeWidth={1} strokeDasharray="4 4" strokeOpacity={0.7} />
        {/* right void: after death, drawn identically */}
        <rect x={195} y={86} width={100} height={56} rx={5} fill="rgba(255,255,255,0.02)" stroke={c.faint} strokeWidth={1} strokeDasharray="4 4" strokeOpacity={0.7} />

        {/* life */}
        <rect x={120} y={86} width={60} height={56} rx={6} fill={c.tealFog} stroke={c.teal} strokeWidth={1.6} />

        {/* region names, above the band */}
        <text x={55} y={48} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.muted}>
          before birth
        </text>
        <text x={150} y={48} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fontWeight={600} fill={c.teal}>
          your life
        </text>
        <text x={245} y={48} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.muted}>
          after death
        </text>

        {/* what your life is, the one non-void region */}
        <text x={150} y={72} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.teal} fillOpacity={0.85}>
          the part you're in
        </text>

        {/* infinity markers, inside each void */}
        <text x={55} y={122} textAnchor="middle" fontFamily={monoFamily} fontSize={22} fill={c.faint}>
          ∞
        </text>
        <text x={245} y={122} textAnchor="middle" fontFamily={monoFamily} fontSize={22} fill={c.faint}>
          ∞
        </text>

        {/* boundary ticks */}
        <text x={112.5} y={156} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.muted}>
          birth
        </text>
        <text x={187.5} y={156} textAnchor="middle" fontFamily={monoFamily} fontSize={13} fill={c.muted}>
          death
        </text>

        {/* the symmetry line, stated under each void, identically */}
        <text x={55} y={182} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.faint}>
          nothing to you
        </text>
        <text x={245} y={182} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.faint}>
          nothing to you
        </text>

        {/* the conclusion, one clause per line */}
        <text x={150} y={210} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.text}>
          you weren't there to mind the first.
        </text>
        <text x={150} y={232} textAnchor="middle" fontFamily={monoFamily} fontSize={12} fill={c.text}>
          you won't be there to mind the second.
        </text>
      </svg>
    </Figure>
  );
}
