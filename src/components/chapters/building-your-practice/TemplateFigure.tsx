import { Figure } from '@/components/Figure';
import { c, mono } from '@/styles/tokens';
import { DAY_SLOTS, WEEK, type Kind } from './practices';

/**
 * fig_16.2, the daily-and-weekly template. A rhythm, not a regimen. The day holds
 * a small morning anchor, a midday reset, an evening session, and an in-the-moment
 * reset always on call. The week is mostly the same small anchor every day, a
 * longer sit on a few of them, and one review on the seventh. The shape carries
 * the lesson: most of a real practice is small, and most of it is daily.
 */

const KIND_COLOR: Record<Kind, string> = {
  anchor: c.teal,
  reset: c.amber,
  session: c.violet,
  weekly: c.emerald,
};

const VW = 600;
const VH = 300;

export function TemplateFigure() {
  const points = DAY_SLOTS.filter((s) => s.id !== 'asneeded');
  const asNeeded = DAY_SLOTS.find((s) => s.id === 'asneeded');

  // day timeline geometry: endpoints inset so the centered end labels stay inside the viewBox
  const dayY = 92;
  const dayX0 = 120;
  const dayX1 = 480;
  const dayStep = (dayX1 - dayX0) / (points.length - 1);

  // week strip geometry
  const weekBase = 232;
  const weekX0 = 70;
  const weekX1 = 530;
  const weekStep = (weekX1 - weekX0) / (WEEK.length - 1);

  return (
    <Figure
      caption="fig_16.2 · the_template: a day, and a week"
      sub="Mostly small, mostly daily. One anchor you almost never skip, a longer sit when there is room, a reset for the hard moment, and a single weekly review to keep the thing honest. A plan you can actually keep beats a better one you cannot."
      max={600}
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        role="img"
        aria-label="Top: a day as a timeline with a morning anchor, a midday reset, an evening session, and an always-available in-the-moment reset. Bottom: a week of seven days, each with the small daily anchor, a longer session on three days, and one review on the last day."
        style={{ display: 'block' }}
      >
        {/* ── a day ─────────────────────────────────────────── */}
        <text x={20} y={34} style={{ ...mono, fontSize: 11.5 }} fill={c.faint}>
          a day
        </text>

        {/* timeline */}
        <line x1={dayX0} y1={dayY} x2={dayX1} y2={dayY} stroke={c.line2} strokeWidth={1.5} />

        {points.map((s, i) => {
          const x = dayX0 + i * dayStep;
          const color = KIND_COLOR[s.kind];
          return (
            <g key={s.id}>
              <text x={x} y={dayY - 22} textAnchor="middle" style={{ ...mono, fontSize: 11 }} fill={color}>
                {s.when}
              </text>
              <circle cx={x} cy={dayY} r={7} fill={color} />
              <circle cx={x} cy={dayY} r={11} fill="none" stroke={color} strokeOpacity={0.3} strokeWidth={1.5} />
              <text x={x} y={dayY + 28} textAnchor="middle" style={{ fontSize: 11.5 }} fill={c.muted}>
                {s.example}
              </text>
            </g>
          );
        })}

        {/* as-needed: a reset, any time, drawn as a band under the whole day */}
        {asNeeded && (
          <g>
            <line
              x1={dayX0}
              y1={dayY + 46}
              x2={dayX1}
              y2={dayY + 46}
              stroke={KIND_COLOR.reset}
              strokeWidth={1.5}
              strokeDasharray="3 5"
              strokeOpacity={0.7}
            />
            <text
              x={(dayX0 + dayX1) / 2}
              y={dayY + 62}
              textAnchor="middle"
              style={{ ...mono, fontSize: 10.5 }}
              fill={c.faint}
            >
              as needed, any time: {asNeeded.example}
            </text>
          </g>
        )}

        {/* divider */}
        <line x1={20} y1={186} x2={VW - 20} y2={186} stroke={c.line} strokeWidth={1} />

        {/* ── a week ────────────────────────────────────────── */}
        <text x={20} y={172} style={{ ...mono, fontSize: 11.5 }} fill={c.faint}>
          a week
        </text>

        {WEEK.map((d, i) => {
          const x = weekX0 + i * weekStep;
          return (
            <g key={d.id}>
              {/* the review star, sits highest */}
              {d.review && (
                <text x={x} y={weekBase - 46} textAnchor="middle" style={{ fontSize: 16 }} fill={KIND_COLOR.weekly}>
                  ★
                </text>
              )}
              {/* the longer session bar */}
              {d.session && (
                <rect x={x - 4} y={weekBase - 30} width={8} height={22} rx={3} fill={KIND_COLOR.session} />
              )}
              {/* the daily anchor dot, every day */}
              {d.anchor && <circle cx={x} cy={weekBase} r={6} fill={KIND_COLOR.anchor} />}
              {/* day label */}
              <text x={x} y={weekBase + 24} textAnchor="middle" style={{ ...mono, fontSize: 11 }} fill={c.muted}>
                {d.label}
              </text>
            </g>
          );
        })}

        {/* legend */}
        {(
          [
            { c: KIND_COLOR.anchor, t: 'daily anchor' },
            { c: KIND_COLOR.session, t: 'longer session' },
            { c: KIND_COLOR.reset, t: 'reset, as needed' },
            { c: KIND_COLOR.weekly, t: 'weekly review' },
          ] as const
        ).map((item, i) => {
          const lx = 70 + i * 130;
          return (
            <g key={item.t}>
              <rect x={lx} y={weekBase + 40} width={10} height={10} rx={3} fill={item.c} />
              <text x={lx + 16} y={weekBase + 49} style={{ ...mono, fontSize: 10 }} fill={c.faint}>
                {item.t}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}
