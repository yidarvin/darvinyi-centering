import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

/**
 * fig_10.1 · the_cognitive_model. The same event reaches two people, or the same
 * person on two days. What differs is the thought slotted in between, and that
 * single difference fans out into different feelings and different actions. The
 * event is held fixed, shared, at the top; each reading is drawn as its own
 * panel below, thought first, then feeling, then action; the thought is the
 * bright, editable hinge, and the quiet point is that the leverage is there,
 * not in the event itself. Concept: Beck's cognitive model; Ellis's ABC.
 *
 * Laid out as two stacked panels (the alarmed reading, then the level reading)
 * rather than the original four-column table. At a narrow viewport, four
 * columns across one row force every label toward illegible sizes. Stacking
 * gives each panel the full width, so the thought, the feeling, and the action
 * inside it can each run at a comfortably readable size, while a single curved
 * line from the shared event to the second panel keeps the "one event, two
 * readings" relationship visible rather than implying the panels run in
 * sequence.
 */
export function CognitiveModelFigure() {
  return (
    <Figure
      caption="fig_10.1 · the_cognitive_model"
      sub="the event is the same in both rows. the thought in the middle is what changes, and everything downstream changes with it. that middle box is the only one you can edit."
      max={340}
    >
      <svg
        viewBox="0 0 300 740"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="A diagram. One event, a text that says nothing back, feeds two separate readings, drawn as two stacked panels. In the top panel, the alarmed reading, the thought is 'they are ignoring me, I said something wrong,' which leads to anxiety and to re-reading the message and withdrawing. In the bottom panel, the level reading, the same event leads to the thought 'they are probably just busy,' which leads to calm and to getting on with the day. The event is identical in both; the thought is the hinge that changes everything downstream."
      >
        <defs>
          <marker id="cm-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>

        {/* ── the shared event ── */}
        <text x={150} y={16} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
          the event
        </text>
        <rect x={20} y={26} width={260} height={52} rx={9} fill={c.panel2} stroke={c.line2} />
        <text x={150} y={50} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={15} fill={c.text}>
          a text, then
        </text>
        <text x={150} y={70} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={15} fill={c.text}>
          hours of silence
        </text>

        {/* short arrow down into the first (top) panel */}
        <path d="M150,78 L150,100" fill="none" stroke={c.faint} strokeWidth={1.2} markerEnd="url(#cm-arrow)" />

        {/* long curve from the same event down to the second (bottom) panel,
            so the diagram reads as one event branching two ways, not a
            top-to-bottom sequence */}
        <path
          d="M150,78 C 260,80 292,95 292,150 L292,410 C 292,440 240,446 175,448"
          fill="none"
          stroke={c.faint}
          strokeWidth={1.2}
          markerEnd="url(#cm-arrow)"
        />

        {/* ── top panel: the alarmed reading ── */}
        <Panel
          top={124}
          headerLabel="the alarmed reading"
          headerColor={c.amber}
          thoughtColor={c.amber}
          thought={['"they are ignoring', 'me. I said', 'something wrong."']}
          feeling="anxiety"
          feelingColor={c.coral}
          action={['re-read it,', 'withdraw']}
        />

        {/* connector: same event, a different thought */}
        <text x={150} y={420} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
          same event. different thought.
        </text>

        {/* ── bottom panel: the level reading ── */}
        <Panel
          top={452}
          headerLabel="the level reading"
          headerColor={c.teal}
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

function Panel({
  top,
  headerLabel,
  headerColor,
  thought,
  thoughtColor,
  feeling,
  feelingColor,
  action,
}: {
  top: number;
  headerLabel: string;
  headerColor: string;
  thought: string[];
  thoughtColor: string;
  feeling: string;
  feelingColor: string;
  action: string[];
}) {
  const kickerY = top + 20;
  const box1Top = kickerY + 14;
  const box1H = 78;
  const box1Bottom = box1Top + box1H;
  const arrow1End = box1Bottom + 16;
  const box2Top = arrow1End + 14;
  const box2H = 40;
  const box2Bottom = box2Top + box2H;
  const arrow2End = box2Bottom + 16;
  const box3Top = arrow2End + 14;
  const box3H = 54;

  return (
    <g>
      {/* panel header, names this reading */}
      <text x={150} y={top} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={17} fontWeight={600} fill={headerColor}>
        {headerLabel}
      </text>
      <text x={150} y={kickerY} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={13} fill={c.faint}>
        thought → feeling → action
      </text>

      {/* thought (the bright, editable hinge) */}
      <rect x={20} y={box1Top} width={260} height={box1H} rx={9} fill={`${thoughtColor}1a`} stroke={thoughtColor} strokeWidth={1.4} />
      {thought.map((line, i) => (
        <text
          key={i}
          x={150}
          y={box1Top + 26 + i * 20}
          textAnchor="middle"
          fontFamily={mono.fontFamily}
          fontSize={15}
          fill={c.text}
        >
          {line}
        </text>
      ))}

      <path d={`M150,${box1Bottom} L150,${arrow1End}`} stroke={c.faint} strokeWidth={1.2} fill="none" markerEnd="url(#cm-arrow)" />

      {/* feeling */}
      <rect x={80} y={box2Top} width={140} height={box2H} rx={9} fill={`${feelingColor}1a`} stroke={feelingColor} strokeWidth={1.3} />
      <text
        x={150}
        y={box2Top + box2H / 2 + 7}
        textAnchor="middle"
        fontFamily={mono.fontFamily}
        fontSize={19}
        fontWeight={600}
        fill={feelingColor}
      >
        {feeling}
      </text>

      <path d={`M150,${box2Bottom} L150,${arrow2End}`} stroke={c.faint} strokeWidth={1.2} fill="none" markerEnd="url(#cm-arrow)" />

      {/* action */}
      <rect x={20} y={box3Top} width={260} height={box3H} rx={9} fill={c.panel2} stroke={c.line2} />
      {action.map((line, i) => (
        <text
          key={i}
          x={150}
          y={box3Top + 24 + i * 17}
          textAnchor="middle"
          fontFamily={mono.fontFamily}
          fontSize={14}
          fill={c.muted}
        >
          {line}
        </text>
      ))}
    </g>
  );
}
