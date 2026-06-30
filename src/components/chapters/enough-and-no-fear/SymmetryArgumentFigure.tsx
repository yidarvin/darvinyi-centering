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
      max={540}
    >
      <svg
        viewBox="0 0 480 210"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A timeline. On the left, an endless void labelled the time before you were born, which was nothing to you. In the centre, a bright bar, your life. On the right, an endless void labelled the time after you die, drawn identically to the left. A mirror line through your life shows the two voids are the same nothing."
      >
        {/* mirror axis through the centre of the life bar */}
        <line x1={240} y1={26} x2={240} y2={170} stroke={c.faint} strokeWidth={1} strokeDasharray="3 5" strokeOpacity={0.7} />
        <text x={240} y={20} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.faint}>
          mirror
        </text>

        {/* left void: before birth */}
        <rect x={24} y={70} width={158} height={44} rx={5} fill="rgba(255,255,255,0.02)" stroke={c.faint} strokeWidth={1} strokeDasharray="4 4" strokeOpacity={0.7} />
        {/* right void: after death, drawn identically */}
        <rect x={298} y={70} width={158} height={44} rx={5} fill="rgba(255,255,255,0.02)" stroke={c.faint} strokeWidth={1} strokeDasharray="4 4" strokeOpacity={0.7} />

        {/* life */}
        <rect x={182} y={62} width={116} height={60} rx={6} fill={c.tealFog} stroke={c.teal} strokeWidth={1.6} />

        {/* infinity markers at the far ends */}
        <text x={20} y={97} textAnchor="middle" fontFamily={monoFamily} fontSize={15} fill={c.faint}>
          ∞
        </text>
        <text x={460} y={97} textAnchor="middle" fontFamily={monoFamily} fontSize={15} fill={c.faint}>
          ∞
        </text>

        {/* region names */}
        <text x={103} y={44} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.muted}>
          before you were born
        </text>
        <text x={103} y={57} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          an eternity
        </text>

        <text x={240} y={44} textAnchor="middle" fontFamily={monoFamily} fontSize={11.5} fontWeight={600} fill={c.teal}>
          your life
        </text>
        <text x={240} y={57} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.teal} fillOpacity={0.85}>
          the only part you are in
        </text>

        <text x={377} y={44} textAnchor="middle" fontFamily={monoFamily} fontSize={11} fill={c.muted}>
          after you die
        </text>
        <text x={377} y={57} textAnchor="middle" fontFamily={monoFamily} fontSize={8.5} fill={c.faint}>
          an eternity
        </text>

        {/* the symmetry line, stated */}
        <text x={103} y={138} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          nothing to you
        </text>
        <text x={377} y={138} textAnchor="middle" fontFamily={monoFamily} fontSize={9.5} fill={c.faint}>
          nothing to you
        </text>

        {/* boundary ticks */}
        <text x={182} y={156} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.muted}>
          birth
        </text>
        <text x={298} y={156} textAnchor="middle" fontFamily={monoFamily} fontSize={9} fill={c.muted}>
          death
        </text>

        {/* the conclusion */}
        <text x={240} y={188} textAnchor="middle" fontFamily={monoFamily} fontSize={10} fill={c.text}>
          you were not there to mind the first. you will not be there to mind the second.
        </text>
      </svg>
    </Figure>
  );
}
