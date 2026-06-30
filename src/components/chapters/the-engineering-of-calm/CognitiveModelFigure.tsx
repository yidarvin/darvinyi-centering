import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_10.1 · the_cognitive_model. The same event reaches two people, or the same
 * person on two days. What differs is the thought slotted in between, and that
 * single difference fans out into different feelings and different actions. The
 * event is held fixed and faint on the left; the thought is the bright, editable
 * hinge in the middle; the feeling and the action follow from it. This is Beck's
 * model, and the quiet point is that the leverage is in the middle box, not the
 * left one. Concept: Beck's cognitive model; Ellis's ABC.
 */
export function CognitiveModelFigure() {
  return (
    <Figure
      caption="fig_10.1 · the_cognitive_model"
      sub="the event is the same in both rows. the thought in the middle is what changes, and everything downstream changes with it. that middle box is the only one you can edit."
      max={520}
    >
      <svg
        viewBox="0 0 520 268"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A diagram. One event, a text that says nothing back, leads to two different chains. In the top row the thought is 'they are ignoring me, I said something wrong,' which leads to anxiety and to re-reading the message and withdrawing. In the bottom row the same event leads to the thought 'they are probably busy,' which leads to calm and to getting on with the day. The event is identical; the thought in the middle is the hinge."
      >
        <defs>
          <marker id="cm-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>

        {/* column headers */}
        <text x={62} y={20} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.faint}>
          event
        </text>
        <text x={210} y={20} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.amber}>
          thought
        </text>
        <text x={350} y={20} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.coral}>
          feeling
        </text>
        <text x={466} y={20} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={10} fill={c.muted}>
          action
        </text>

        {/* the shared event, vertically centered between the two rows */}
        <rect x={14} y={104} width={96} height={60} rx={9} fill={c.panel2} stroke={c.line2} />
        <text x={62} y={129} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={9.5} fill={c.text}>
          a text, then
        </text>
        <text x={62} y={143} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={9.5} fill={c.text}>
          hours of
        </text>
        <text x={62} y={157} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={9.5} fill={c.text}>
          silence
        </text>

        {/* connectors from the event to each thought */}
        <path d="M110,120 C 140,120 150,72 176,72" fill="none" stroke={c.faint} strokeWidth={1.2} markerEnd="url(#cm-arrow)" />
        <path d="M110,148 C 140,148 150,196 176,196" fill="none" stroke={c.faint} strokeWidth={1.2} markerEnd="url(#cm-arrow)" />

        {/* ── top row: the alarmed reading ── */}
        <Row
          y={72}
          thoughtColor={c.amber}
          thought={['"they are ignoring', 'me. I said', 'something wrong."']}
          feeling="anxiety"
          feelingColor={c.coral}
          action={['re-read it,', 'withdraw']}
        />

        {/* ── bottom row: the level reading ── */}
        <Row
          y={196}
          thoughtColor={c.teal}
          thought={['"they are', 'probably', 'just busy."']}
          feeling="calm"
          feelingColor={c.teal}
          action={['get on', 'with the day']}
        />
      </svg>
    </Figure>
  );
}

function Row({
  y,
  thought,
  thoughtColor,
  feeling,
  feelingColor,
  action,
}: {
  y: number;
  thought: string[];
  thoughtColor: string;
  feeling: string;
  feelingColor: string;
  action: string[];
}) {
  return (
    <g>
      {/* thought (the bright, editable hinge) */}
      <rect x={176} y={y - 30} width={108} height={60} rx={9} fill={`${thoughtColor}1a`} stroke={thoughtColor} strokeWidth={1.4} />
      {thought.map((line, i) => (
        <text
          key={i}
          x={230}
          y={y - 14 + i * 14}
          textAnchor="middle"
          fontFamily={mono.fontFamily}
          fontSize={9.5}
          fill={c.text}
        >
          {line}
        </text>
      ))}

      <path d={`M284,${y} L300,${y}`} stroke={c.faint} strokeWidth={1.2} markerEnd="url(#cm-arrow)" />

      {/* feeling */}
      <rect x={300} y={y - 18} width={100} height={36} rx={9} fill={`${feelingColor}1a`} stroke={feelingColor} strokeWidth={1.3} />
      <text x={350} y={y + 4} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={11} fontWeight={500} fill={feelingColor}>
        {feeling}
      </text>

      <path d={`M400,${y} L416,${y}`} stroke={c.faint} strokeWidth={1.2} markerEnd="url(#cm-arrow)" />

      {/* action */}
      <rect x={416} y={y - 18} width={92} height={36} rx={9} fill={c.panel2} stroke={c.line2} />
      {action.map((line, i) => (
        <text
          key={i}
          x={462}
          y={y - 1 + i * 12}
          textAnchor="middle"
          fontFamily={mono.fontFamily}
          fontSize={9}
          fill={c.muted}
        >
          {line}
        </text>
      ))}
    </g>
  );
}
