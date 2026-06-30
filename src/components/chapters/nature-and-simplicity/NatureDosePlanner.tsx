import { Check, CornerDownRight, RotateCcw } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { getRoute, type RouteId } from '@/content/routes';
import { useLocalStorage } from '@/lib/useLocalStorage';

/**
 * widget_13.1, the nature-dose and awe planner, with a "simplify one area" pass.
 *
 * Two moves, stacked. First the reader assembles a realistic week of nature from a
 * short menu of doses, each tagged with the route it serves and what the evidence
 * actually supports. Outdoor time counts toward a weekly floor (the ~120-minutes-a-
 * week association); a window view and a stretch of solitude are marked as real but
 * complementary, not part of the outdoor dose, so the widget stays honest about what
 * is measured. Then a subtraction pass: pick one area of life and name the single
 * thing you will take out this week. Adding nature and subtracting clutter are the
 * same chapter from two directions. Everything persists.
 */

const THRESHOLD = 120; // minutes/week, the floor from White et al. (2019), held as a floor not a cap

interface Dose {
  id: string;
  title: string;
  detail: string;
  /** weekly outdoor minutes this contributes toward the floor, or 0 if complementary */
  minutes: number;
  /** complementary doses are real but not part of the measured outdoor dose */
  complementary?: boolean;
  badge: string;
  route: RouteId;
}

const DOSES: Dose[] = [
  {
    id: 'walk',
    title: 'A short walk, most days, no phone',
    detail:
      'Twenty unhurried minutes with attention free to wander. This is the one that refills directed attention, the soft-fascination dose.',
    minutes: 90,
    badge: 'attention restoration',
    route: 'presence',
  },
  {
    id: 'immersion',
    title: 'One longer immersion: a park, a wood, a trail',
    detail:
      'A single proper outing in the week, an hour or two, where the city drops away. The "being away" the theory asks for.',
    minutes: 120,
    badge: 'the weekly floor',
    route: 'presence',
  },
  {
    id: 'awe',
    title: 'Seek one vast thing on purpose',
    detail:
      'A wide sky, an old stand of trees, a long view, the stars. Stand in front of it long enough to feel small. That smallness is the dose.',
    minutes: 40,
    badge: 'the small self',
    route: 'perspective',
  },
  {
    id: 'view',
    title: 'A window, a plant, a view of green',
    detail:
      'Even a passive view lowers stress, the Ulrich effect. It does not replace getting outside, but it works on you all day for free.',
    minutes: 0,
    complementary: true,
    badge: 'passive · stress recovery',
    route: 'the-body',
  },
  {
    id: 'solitude',
    title: 'A stretch of chosen time alone',
    detail:
      'Time by yourself that you picked, not the kind imposed on you. Chosen solitude turns down the volume on the day. Solitude, not loneliness.',
    minutes: 0,
    complementary: true,
    badge: 'down-regulation',
    route: 'enough',
  },
];

interface Area {
  id: string;
  label: string;
  prompt: string;
  example: string;
}

const AREAS: Area[] = [
  {
    id: 'time',
    label: 'time',
    prompt: 'One thing on the calendar to cancel, decline, or leave open.',
    example: 'the standing meeting nobody needs · the over-full Saturday',
  },
  {
    id: 'space',
    label: 'space',
    prompt: 'One thing in a room or a drawer to give away or clear.',
    example: 'the surface that collects clutter · the box you have not opened',
  },
  {
    id: 'inputs',
    label: 'inputs',
    prompt: 'One feed, alert, or stream of news to mute or leave.',
    example: 'notifications off for one app · one less newsletter',
  },
  {
    id: 'commitments',
    label: 'commitments',
    prompt: 'One yes you can take back, or one you will not give next time.',
    example: 'the obligation you dread · the favor that became a fixture',
  },
  {
    id: 'wanting',
    label: 'wanting',
    prompt: 'One thing you were going to buy or chase, set down for now.',
    example: 'the upgrade you do not need · the want with no limit',
  },
];

const areaOf = (id: string) => AREAS.find((a) => a.id === id);

export function NatureDosePlanner() {
  const [picked, setPicked] = useLocalStorage<Record<string, boolean>>(
    'centering:widget:nature-and-simplicity:doses',
    {},
  );
  const [area, setArea] = useLocalStorage<string>('centering:widget:nature-and-simplicity:area', '');
  const [subtract, setSubtract] = useLocalStorage<string>(
    'centering:widget:nature-and-simplicity:subtract',
    '',
  );

  const chosen = DOSES.filter((d) => picked[d.id]);
  const outdoorMin = chosen.reduce((sum, d) => sum + d.minutes, 0);
  const pct = Math.min(100, Math.round((outdoorMin / THRESHOLD) * 100));
  const met = outdoorMin >= THRESHOLD;
  const routes = Array.from(new Set(chosen.map((d) => d.route)));

  const toggle = (id: string) => setPicked((p) => ({ ...p, [id]: !p[id] }));
  const resetDoses = () => setPicked({});

  const selectedArea = areaOf(area);

  return (
    <WidgetShell
      id="13.1"
      name="nature_dose"
      title="Plan a week with some nature in it"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: met ? c.teal : c.faint, whiteSpace: 'nowrap' }}>
          {outdoorMin} min outdoors / wk
        </span>
      }
      footer={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <CornerDownRight size={14} color={c.faint} style={{ flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: 11.5, color: c.faint, flex: 1, minWidth: 160, lineHeight: 1.5 }}>
            a plan you keep. it saves as you go.
          </span>
          {chosen.length > 0 && (
            <button
              type="button"
              onClick={resetDoses}
              style={{
                ...mono,
                fontSize: 12,
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: 8,
                border: `1px solid ${c.line2}`,
                background: 'transparent',
                color: c.muted,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <RotateCcw size={12} /> clear
            </button>
          )}
        </div>
      }
    >
      {/* ── Part A: the dose menu ───────────────────────────── */}
      <div style={{ padding: '14px 14px 6px' }}>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 14px' }}>
          Pick what you can actually do. The first three put you outdoors and count toward the weekly
          floor. The last two are real but complementary, a view and some solitude, marked apart so the
          number stays honest.
        </p>

        {DOSES.map((d) => {
          const on = !!picked[d.id];
          const route = getRoute(d.route);
          return (
            <button
              key={d.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(d.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                border: `1px solid ${on ? `${route.color}77` : c.line}`,
                borderRadius: 11,
                background: on ? `${route.color}10` : c.panel,
                padding: '12px 13px',
                marginBottom: 10,
                transition: 'border-color .14s ease, background .14s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                {/* check box */}
                <span
                  aria-hidden="true"
                  style={{
                    width: 18,
                    height: 18,
                    flexShrink: 0,
                    marginTop: 1,
                    borderRadius: 5,
                    border: `1px solid ${on ? route.color : c.line2}`,
                    background: on ? `${route.color}26` : 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {on && <Check size={13} color={route.color} strokeWidth={3} />}
                </span>

                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: on ? c.text : c.prose }}>
                      {d.title}
                    </span>
                    <span style={{ ...mono, fontSize: 10.5, color: d.complementary ? c.faint : route.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {d.complementary ? '+ extra' : `+${d.minutes} min`}
                    </span>
                  </span>
                  <span style={{ display: 'block', fontSize: 13, lineHeight: 1.55, color: c.muted, margin: '5px 0 7px' }}>
                    {d.detail}
                  </span>
                  <span style={{ display: 'inline-flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span
                      style={{
                        ...mono,
                        fontSize: 10,
                        color: route.color,
                        border: `1px solid ${route.color}55`,
                        background: `${route.color}12`,
                        borderRadius: 6,
                        padding: '2px 7px',
                      }}
                    >
                      {route.label}
                    </span>
                    <span style={{ ...mono, fontSize: 10, color: c.faint }}>{d.badge}</span>
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* live summary: the weekly floor + routes lit */}
      <div style={{ padding: '4px 16px 16px' }}>
        <div
          style={{
            border: `1px solid ${met ? c.tealEdge : c.line}`,
            borderRadius: 11,
            background: met ? c.tealFog : c.panel,
            padding: '13px 14px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ ...mono, fontSize: 11, color: c.faint, letterSpacing: '.03em' }}>
              {'// '}weekly outdoor dose
            </span>
            <span style={{ ...mono, fontSize: 11.5, color: met ? c.teal : c.muted }}>
              {outdoorMin} / {THRESHOLD} min {met ? '· met, and then some' : ''}
            </span>
          </div>
          {/* progress bar toward the floor */}
          <div
            role="progressbar"
            aria-valuenow={outdoorMin}
            aria-valuemin={0}
            aria-valuemax={THRESHOLD}
            aria-label="weekly outdoor minutes toward the 120-minute floor"
            style={{ height: 8, borderRadius: 99, background: c.line, overflow: 'hidden' }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: '100%',
                borderRadius: 99,
                background: met ? c.teal : c.emerald,
                transition: 'width .25s ease',
              }}
            />
          </div>
          {/* routes lit by the plan */}
          {routes.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 11 }}>
              <span style={{ ...mono, fontSize: 10, color: c.faint }}>routes:</span>
              {routes.map((id) => {
                const r = getRoute(id);
                return (
                  <span
                    key={id}
                    style={{
                      ...mono,
                      fontSize: 10,
                      color: r.color,
                      border: `1px solid ${r.color}55`,
                      background: `${r.color}12`,
                      borderRadius: 6,
                      padding: '2px 7px',
                    }}
                  >
                    {r.label}
                  </span>
                );
              })}
            </div>
          )}
          <p style={{ ...mono, fontSize: 10.5, color: c.faint, margin: '10px 0 0', lineHeight: 1.5 }}>
            120 minutes a week is an association, not a prescription. It is a floor worth clearing, not a
            target to grind toward.
          </p>
        </div>
      </div>

      {/* ── Part B: simplify one area ───────────────────────── */}
      <div style={{ padding: '16px 16px 20px', borderTop: `1px solid ${c.line}`, background: c.tealFog }}>
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 4 }}>
          {'// '}simplify one area
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 12px' }}>
          Adding nature is half of it. The other half is subtraction. Pick one area and name the single
          thing you will take out this week. One. Thoreau's whole counsel fits in a word: simplify.
        </p>

        <div role="group" aria-label="area to simplify" style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 14 }}>
          {AREAS.map((a) => {
            const on = area === a.id;
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={on}
                onClick={() => setArea(on ? '' : a.id)}
                style={{
                  ...mono,
                  fontSize: 12,
                  cursor: 'pointer',
                  padding: '8px 13px',
                  borderRadius: 8,
                  border: `1px solid ${on ? c.tealEdge : c.line2}`,
                  background: on ? c.tealFog : 'transparent',
                  color: on ? c.teal : c.muted,
                  transition: 'all .14s ease',
                }}
              >
                {a.label}
              </button>
            );
          })}
        </div>

        {selectedArea && (
          <div>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: c.text, marginBottom: 4 }}>
              {selectedArea.prompt}
            </div>
            <div style={{ ...mono, fontSize: 10.5, color: c.faint, marginBottom: 9 }}>
              for example: {selectedArea.example}
            </div>
            <label htmlFor="simplify-subtract" className="visually-hidden">
              the one thing I will subtract this week
            </label>
            <textarea
              id="simplify-subtract"
              rows={2}
              value={subtract}
              onChange={(e) => setSubtract(e.target.value)}
              placeholder="the one thing I will subtract this week… · and what it frees up…"
              style={{
                ...mono,
                width: '100%',
                boxSizing: 'border-box',
                resize: 'vertical',
                background: c.panel2,
                color: c.text,
                border: `1px solid ${c.line}`,
                borderRadius: 8,
                padding: '11px 12px',
                fontSize: 13,
                lineHeight: 1.6,
              }}
            />
          </div>
        )}
      </div>
    </WidgetShell>
  );
}
