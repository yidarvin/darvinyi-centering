import { useMemo, useState } from 'react';
import { RotateCcw, ArrowUpRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { ROUTES, type RouteId } from '@/content/routes';
import {
  PRACTICES,
  GRADES,
  getGrade,
  getRoute,
  getPractice,
  type Grade,
} from './evidence';

/**
 * widget_15.1, the mechanism explorer. Pick a practice and see, on one card, the
 * route it works through, the mechanism it is proposed to work by, the honest
 * evidence with its real numbers and comparison condition, the catch, and the
 * grade. Filter by grade to feel the shape (the A band is nearly empty), or by
 * route to see how lopsided the support is. The felt payoff is a recalibration:
 * the practices you assume are strongest, mindfulness and gratitude, sit at B and
 * C with "vanishes against an active control" attached, while the breath is solid
 * but modest and the deepest routes are graded by what a trial cannot reach.
 *
 * Reads off evidence.ts, the same data as fig_15.1 and fig_15.2, so the three
 * views can never disagree.
 */
export function MechanismExplorer() {
  const [selectedId, setSelectedId] = useState<string>('mbsr');
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);
  const [routeFilter, setRouteFilter] = useState<RouteId | null>(null);

  const list = useMemo(
    () =>
      PRACTICES.filter(
        (p) => (!gradeFilter || p.grade === gradeFilter) && (!routeFilter || p.route === routeFilter),
      ),
    [gradeFilter, routeFilter],
  );

  const selected = getPractice(selectedId);
  const filtered = gradeFilter !== null || routeFilter !== null;

  const reset = () => {
    setGradeFilter(null);
    setRouteFilter(null);
    setSelectedId('mbsr');
  };

  return (
    <WidgetShell
      id="15.1"
      name="mechanism_explorer"
      title="Pick a practice. See the route, the mechanism, and the grade."
      legend={
        <span style={{ ...mono, fontSize: 11, color: c.faint }}>
          {PRACTICES.length} practices · 4 grades
        </span>
      }
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>
            grade is strength of evidence, not size of effect. every number carries its comparison condition.
          </span>
          {(filtered || selectedId !== 'mbsr') && (
            <button
              type="button"
              onClick={reset}
              style={{
                ...mono,
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
      {/* the grade legend, also the grade filter */}
      <div style={{ padding: '14px 16px 4px' }}>
        <FilterRow label="grade">
          {GRADES.map((g) => {
            const on = gradeFilter === g.id;
            return (
              <Chip
                key={g.id}
                color={g.color}
                active={on}
                title={g.gloss}
                onClick={() => setGradeFilter(on ? null : g.id)}
              >
                <span style={{ fontWeight: 700 }}>{g.id}</span>
                <span style={{ opacity: 0.85, marginLeft: 6 }}>{g.label}</span>
              </Chip>
            );
          })}
        </FilterRow>
        <FilterRow label="route">
          {ROUTES.map((r) => {
            const on = routeFilter === r.id;
            return (
              <Chip
                key={r.id}
                color={r.color}
                active={on}
                title={r.gloss}
                onClick={() => setRouteFilter(on ? null : r.id)}
              >
                {r.label}
              </Chip>
            );
          })}
        </FilterRow>
      </div>

      {/* the filtered list of practices */}
      <div style={{ padding: '6px 16px 14px', borderBottom: `1px solid ${c.line}` }}>
        <div style={{ ...mono, fontSize: 11, color: c.faint, marginBottom: 9 }}>
          {list.length === 0
            ? 'no practice at that grade on that route. that gap is a finding, not a bug.'
            : `${list.length} ${list.length === 1 ? 'practice' : 'practices'}${filtered ? ' match' : ''}`}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {list.map((p) => {
            const route = getRoute(p.route);
            const grade = getGrade(p.grade);
            const active = selectedId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(p.id)}
                style={{
                  ...mono,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontSize: 11.5,
                  textAlign: 'left',
                  padding: '6px 10px',
                  borderRadius: 8,
                  border: `1px solid ${active ? c.tealEdge : c.line2}`,
                  background: active ? c.tealFog : 'transparent',
                  color: active ? c.text : c.muted,
                  transition: 'all .14s ease',
                }}
              >
                <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 99, background: route.color, flexShrink: 0 }} />
                {p.name}
                <span style={{ fontWeight: 700, color: grade.color }}>{p.grade}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* the inspector */}
      {selected && <Inspector id={selected.id} />}
    </WidgetShell>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
      <span style={{ ...mono, fontSize: 11, color: c.faint, paddingTop: 6, minWidth: 48 }}>{label}:</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{children}</div>
    </div>
  );
}

function Chip({
  color,
  active,
  title,
  onClick,
  children,
}: {
  color: string;
  active: boolean;
  title?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      title={title}
      onClick={onClick}
      style={{
        ...mono,
        cursor: 'pointer',
        fontSize: 11.5,
        padding: '5px 9px',
        borderRadius: 7,
        border: `1px solid ${active ? color : c.line2}`,
        background: active ? `${color}1f` : 'transparent',
        color: active ? color : c.muted,
        transition: 'all .14s ease',
      }}
    >
      {children}
    </button>
  );
}

function Inspector({ id }: { id: string }) {
  const p = getPractice(id);
  if (!p) return null;
  const route = getRoute(p.route);
  const grade = getGrade(p.grade);

  return (
    <div style={{ padding: '16px 18px 20px', background: `${grade.color}0a`, borderTop: `1px solid ${grade.color}33` }}>
      {/* header: name, route, grade */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, flexWrap: 'wrap', marginBottom: 4 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: c.text }}>{p.name}</span>
        <span
          style={{
            ...mono,
            fontSize: 10.5,
            color: route.color,
            border: `1px solid ${route.color}55`,
            borderRadius: 5,
            padding: '1px 6px',
          }}
        >
          {route.label}
        </span>
      </div>

      {/* the grade, stated plainly */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14, flexWrap: 'wrap' }}>
        <span
          style={{
            ...mono,
            fontSize: 13,
            fontWeight: 700,
            color: grade.color,
            border: `1px solid ${grade.color}66`,
            background: `${grade.color}14`,
            borderRadius: 6,
            padding: '2px 9px',
          }}
        >
          {grade.id} · {grade.label}
        </span>
        <span style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>{grade.gloss}</span>
      </div>

      <Field label="how it is supposed to work">{p.mechanism}</Field>
      <Field label="what the trials actually found">{p.evidence}</Field>
      <Field label="the catch" accent={c.coral}>
        {p.caveat}
      </Field>

      <a
        href={p.url}
        target="_blank"
        rel="noreferrer noopener"
        style={{
          ...mono,
          fontSize: 11,
          color: c.teal,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          marginTop: 4,
        }}
      >
        {p.source} <ArrowUpRight size={12} />
      </a>
    </div>
  );
}

function Field({ label, accent, children }: { label: string; accent?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 13, borderLeft: `2px solid ${accent ?? c.line2}`, paddingLeft: 12 }}>
      <div style={{ ...mono, fontSize: 10.5, color: accent ?? c.faint, marginBottom: 4, letterSpacing: '.02em' }}>
        {label}
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: c.prose }}>{children}</div>
    </div>
  );
}
