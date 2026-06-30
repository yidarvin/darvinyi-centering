import { Fragment } from 'react';
import { ChevronRight, BookOpen, PenLine, MousePointerClick, ListChecks, Terminal } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { Figure } from '@/components/Figure';

const STAGES = [
  { label: 'prose', gist: 'the idea, taught plainly', Icon: BookOpen },
  { label: 'figure', gist: 'a diagram that shows it', Icon: PenLine },
  { label: 'widget', gist: 'try it, feel it', Icon: MousePointerClick },
  { label: 'exercise', gist: 'do it for real', Icon: ListChecks },
  { label: 'reflect', gist: 'one good question', Icon: Terminal },
];

/** fig_00.1b: the repeating rhythm of every chapter. */
export function RhythmFigure() {
  return (
    <Figure
      caption="fig_00.1b · the_chapter_rhythm"
      sub="every chapter moves the same way: read it, see it, try it, do it, sit with it."
      max={640}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        {STAGES.map((s, i) => (
          <Fragment key={s.label}>
            <div
              style={{
                flex: '1 1 96px',
                minWidth: 96,
                border: `1px solid ${c.line2}`,
                borderRadius: 10,
                background: c.panel2,
                padding: '12px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                alignItems: 'flex-start',
              }}
            >
              <s.Icon size={15} color={c.teal} />
              <div style={{ ...mono, fontSize: 12, color: c.text, fontWeight: 500 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: c.faint, lineHeight: 1.4 }}>{s.gist}</div>
            </div>
            {i < STAGES.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', color: c.faint }}>
                <ChevronRight size={15} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Figure>
  );
}
