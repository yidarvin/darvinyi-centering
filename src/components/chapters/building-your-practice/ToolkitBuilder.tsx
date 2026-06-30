import { useState, type CSSProperties, type ReactNode } from 'react';
import { Check, Printer, Copy, RotateCcw, CornerDownRight, ArrowRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';
import {
  PRACTICES,
  getPractice,
  getRoute,
  getKind,
  ROUTE_ORDER,
  type Kind,
  type Practice,
  type RouteId,
} from './practices';

/**
 * widget_16.1, the toolkit builder. The reader assembles a practice in four small
 * moves: pick a couple of routes that fit, choose a few practices from the menu
 * those routes open, anchor each one to an existing cue (the if-then move that
 * the evidence backs), and pick the handful that become a hard-day card. The plan
 * and the card persist, and a print and a copy button let the reader carry them
 * out of the browser. The whole design argues for subtraction: a few practices,
 * anchored, beats the full menu admired and abandoned.
 */

const NS = 'centering:widget:building-your-practice';

// the order practices appear in the daily plan
const KIND_PLAN_ORDER: Kind[] = ['anchor', 'session', 'weekly', 'reset'];

// common anchors: existing routines that can prompt a new practice
const ANCHOR_SUGGESTIONS = [
  'I pour my morning coffee',
  'I sit down at my desk',
  'I close my laptop for the day',
  'I brush my teeth at night',
  'I get into bed',
  'I finish lunch',
];

const cueWord = (kind: Kind) => (kind === 'reset' ? 'When' : 'After I');
const cuePlaceholder = (kind: Kind) =>
  kind === 'reset'
    ? 'my jaw tightens · I notice I am spiraling'
    : 'I pour my morning coffee · I sit down at my desk';

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function ToolkitBuilder() {
  const [routes, setRoutes] = useLocalStorage<RouteId[]>(`${NS}:routes`, []);
  const [picks, setPicks] = useLocalStorage<Record<string, boolean>>(`${NS}:picks`, {});
  const [anchors, setAnchors] = useLocalStorage<Record<string, string>>(`${NS}:anchors`, {});
  const [hardDay, setHardDay] = useLocalStorage<string[]>(`${NS}:hardday`, []);
  const [hardLine, setHardLine] = useLocalStorage<string>(`${NS}:hardline`, '');
  const [copied, setCopied] = useState(false);

  const chosen = PRACTICES.filter((p) => picks[p.id]);
  const chosenSorted = [...chosen].sort(
    (a, b) => KIND_PLAN_ORDER.indexOf(a.kind) - KIND_PLAN_ORDER.indexOf(b.kind),
  );
  const litRoutes = Array.from(new Set(chosen.map((p) => p.route)));

  // the menu: filter to picked routes, or show all if none are picked
  const menu = routes.length === 0 ? PRACTICES : PRACTICES.filter((p) => routes.includes(p.route));

  const toggleRoute = (id: RouteId) =>
    setRoutes((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));
  const togglePick = (id: string) => {
    const turningOff = !!picks[id];
    setPicks((p) => ({ ...p, [id]: !p[id] }));
    // an unpicked practice should not linger on the hard-day card
    if (turningOff) setHardDay((h) => h.filter((x) => x !== id));
  };
  const setAnchor = (id: string, v: string) => setAnchors((a) => ({ ...a, [id]: v }));
  const toggleHard = (id: string) =>
    setHardDay((h) => (h.includes(id) ? h.filter((x) => x !== id) : h.length >= 3 ? h : [...h, id]));

  const reset = () => {
    setRoutes([]);
    setPicks({});
    setAnchors({});
    setHardDay([]);
    setHardLine('');
  };

  const planLine = (p: Practice) => {
    const anchor = (anchors[p.id] || '').trim();
    const cue = cueWord(p.kind);
    const tail = anchor ? `${cue} ${anchor}, I will ` : `${cue} …, I will `;
    return { tail, name: p.name.toLowerCase(), dose: p.dose };
  };

  const buildPlainText = () => {
    const lines: string[] = ['MY CALM PRACTICE', ''];
    lines.push('Daily plan');
    if (chosenSorted.length === 0) lines.push('  (nothing chosen yet)');
    for (const p of chosenSorted) {
      const l = planLine(p);
      lines.push(`  - ${l.tail}${l.name} (${p.dose})  [${getRoute(p.route).label}]`);
    }
    lines.push('');
    lines.push('Hard-day card');
    lines.push(`  When it is bad, first: ${hardLine.trim() || '(write your first move)'}`);
    const hard = hardDay.filter((id) => picks[id]).map(getPractice).filter(Boolean) as Practice[];
    for (const p of hard) lines.push(`  - ${p.name} (${p.dose})`);
    lines.push('');
    lines.push('A few routes that fit you, practiced regularly. Centering, ch. 16.');
    return lines.join('\n');
  };

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable: no-op, the plan is still on screen and saved
    }
  };

  const printPlan = () => {
    const planHtml = chosenSorted
      .map((p) => {
        const l = planLine(p);
        const r = getRoute(p.route);
        return `<li><span class="cue">${esc(l.tail)}</span><b>${esc(p.name)}</b> <span class="dose">(${esc(
          p.dose,
        )})</span> <span class="route" style="color:${r.color}">${esc(r.label)}</span></li>`;
      })
      .join('');
    const hard = hardDay.filter((id) => picks[id]).map(getPractice).filter(Boolean) as Practice[];
    const hardHtml = hard
      .map((p) => `<li><b>${esc(p.name)}</b> <span class="dose">(${esc(p.dose)})</span></li>`)
      .join('');
    const doc = `<!doctype html><html><head><meta charset="utf-8"><title>My calm practice</title>
<style>
  body{font:15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#15181b;max-width:640px;margin:40px auto;padding:0 24px;}
  h1{font-size:22px;margin:0 0 4px;}
  .sub{color:#5f666d;font-size:12px;margin:0 0 28px;font-family:ui-monospace,Menlo,monospace;}
  h2{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:#0d9488;margin:26px 0 10px;border-bottom:1px solid #e3e6e8;padding-bottom:6px;}
  ul{list-style:none;padding:0;margin:0;}
  li{padding:8px 0;border-bottom:1px solid #eef0f1;}
  .cue{color:#5f666d;}
  .dose{color:#5f666d;font-size:13px;}
  .route{font-size:11px;font-family:ui-monospace,Menlo,monospace;margin-left:4px;}
  .card{border:1px solid #e3e6e8;border-radius:10px;padding:14px 16px;background:#fafbfb;}
  .first{font-size:15px;margin:0 0 10px;}
  .foot{margin-top:30px;color:#9aa1a8;font-size:12px;font-family:ui-monospace,Menlo,monospace;}
</style></head>
<body onload="window.print()">
  <h1>My calm practice</h1>
  <p class="sub">a few routes that fit me, practiced regularly</p>
  <h2>Daily plan</h2>
  <ul>${planHtml || '<li>(nothing chosen yet)</li>'}</ul>
  <h2>Hard-day card</h2>
  <div class="card">
    <p class="first"><b>When it is bad, first:</b> ${esc(hardLine.trim() || '________________________')}</p>
    <ul>${hardHtml || '<li>(pick your go-to moves)</li>'}</ul>
  </div>
  <p class="foot">Centering // ch. 16, building your practice</p>
</body></html>`;
    const w = window.open('', '_blank', 'width=720,height=900');
    if (!w) return; // popup blocked: the plan is still saved on screen
    w.document.write(doc);
    w.document.close();
  };

  const hasPlan = chosen.length > 0;

  return (
    <WidgetShell
      id="16.1"
      name="toolkit_builder"
      title="Build a practice you will actually keep"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: hasPlan ? c.teal : c.faint, whiteSpace: 'nowrap' }}>
          {chosen.length} practice{chosen.length === 1 ? '' : 's'} · {litRoutes.length} route
          {litRoutes.length === 1 ? '' : 's'}
        </span>
      }
      footer={
        <div style={{ display: 'flex', gap: 9, alignItems: 'center', flexWrap: 'wrap' }}>
          <CornerDownRight size={14} color={c.faint} style={{ flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: 11.5, color: c.faint, flex: 1, minWidth: 150, lineHeight: 1.5 }}>
            it saves as you go. print or copy the card and put it where you will see it.
          </span>
          <button type="button" onClick={copyPlan} disabled={!hasPlan} style={footBtn(hasPlan)}>
            <Copy size={12} /> {copied ? 'copied' : 'copy'}
          </button>
          <button type="button" onClick={printPlan} disabled={!hasPlan} style={footBtn(hasPlan)}>
            <Printer size={12} /> print
          </button>
          {(chosen.length > 0 || routes.length > 0) && (
            <button type="button" onClick={reset} style={footBtn(true)}>
              <RotateCcw size={12} /> clear
            </button>
          )}
          <span role="status" aria-live="polite" className="visually-hidden">
            {copied ? 'Plan copied to the clipboard.' : ''}
          </span>
        </div>
      }
    >
      {/* ── Step 1: routes that fit you ─────────────────────── */}
      <Block n="1" label="routes that fit you">
        <p style={stepLead}>
          Pick two or three. You do not need all seven. The ones you pick open the menu below.
        </p>
        <div role="group" aria-label="routes that fit you" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ROUTE_ORDER.map((id) => {
            const route = getRoute(id);
            const on = routes.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => toggleRoute(id)}
                title={route.gloss}
                style={{
                  ...mono,
                  cursor: 'pointer',
                  fontSize: 12,
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: `1px solid ${on ? `${route.color}99` : c.line2}`,
                  background: on ? `${route.color}1c` : 'transparent',
                  color: on ? route.color : c.muted,
                  transition: 'all .14s ease',
                }}
              >
                {route.label}
              </button>
            );
          })}
        </div>
      </Block>

      {/* ── Step 2: choose your practices ──────────────────── */}
      <Block n="2" label="choose a few practices">
        <p style={stepLead}>
          {routes.length === 0
            ? 'The whole menu, drawn from across the book. Pick a route above to narrow it. A few you will actually do beats ten you will not.'
            : 'The practices your routes open. Three or four is plenty. Each one comes from a chapter you have already read.'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {menu.map((p) => {
            const on = !!picks[p.id];
            const route = getRoute(p.route);
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => togglePick(p.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: `1px solid ${on ? `${route.color}77` : c.line}`,
                  borderRadius: 11,
                  background: on ? `${route.color}10` : c.panel,
                  padding: '11px 12px',
                  transition: 'border-color .14s ease, background .14s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
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
                      <span style={{ fontSize: 14, fontWeight: 600, color: on ? c.text : c.prose }}>{p.name}</span>
                      <span style={{ ...mono, fontSize: 10.5, color: route.color, whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {p.dose}
                      </span>
                    </span>
                    <span style={{ display: 'block', fontSize: 12.5, lineHeight: 1.55, color: c.muted, margin: '5px 0 7px' }}>
                      {p.line}
                    </span>
                    <span style={{ display: 'inline-flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={routeTag(route.color)}>{route.label}</span>
                      <span style={{ ...mono, fontSize: 10, color: c.faint }}>{getKind(p.kind).label}</span>
                      <span style={{ ...mono, fontSize: 10, color: c.faint }}>· from {p.chapterShort}</span>
                      {p.hotMoment && (
                        <span style={{ ...mono, fontSize: 10, color: c.amber }}>· good in a hot moment</span>
                      )}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Block>

      {/* ── Step 3: anchor them (the daily plan) ───────────── */}
      <Block n="3" label="anchor each one">
        <p style={stepLead}>
          A practice with no cue is a practice you forget. Hang each one on something you already do, or on the
          moment it is for. This is the if-then move, the best-supported trick in the chapter.
        </p>
        {chosen.length === 0 ? (
          <p style={{ ...mono, fontSize: 12, color: c.faint, margin: 0 }}>choose a practice above, and it shows up here to anchor.</p>
        ) : (
          <>
            <datalist id="anchor-suggestions">
              {ANCHOR_SUGGESTIONS.map((a) => (
                <option key={a} value={a} />
              ))}
            </datalist>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {chosenSorted.map((p) => {
                const route = getRoute(p.route);
                return (
                  <div
                    key={p.id}
                    style={{
                      border: `1px solid ${c.line}`,
                      borderLeft: `3px solid ${route.color}`,
                      borderRadius: 9,
                      background: c.panel,
                      padding: '10px 12px',
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                      <label htmlFor={`anchor-${p.id}`} style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
                        {cueWord(p.kind)}
                      </label>
                      <input
                        id={`anchor-${p.id}`}
                        type="text"
                        value={anchors[p.id] || ''}
                        list={p.kind === 'reset' ? undefined : 'anchor-suggestions'}
                        onChange={(e) => setAnchor(p.id, e.target.value)}
                        placeholder={cuePlaceholder(p.kind)}
                        style={{
                          ...mono,
                          flex: 1,
                          minWidth: 150,
                          background: c.panel2,
                          color: c.text,
                          border: `1px solid ${c.line2}`,
                          borderRadius: 7,
                          padding: '7px 10px',
                          fontSize: 12.5,
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 7, flexWrap: 'wrap' }}>
                      <ArrowRight size={13} color={route.color} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: c.text, fontWeight: 500 }}>{p.name}</span>
                      <span style={{ ...mono, fontSize: 10.5, color: route.color }}>{p.dose}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Block>

      {/* ── Step 4: the hard-day card ──────────────────────── */}
      <div style={{ padding: '16px 16px 20px', borderTop: `1px solid ${c.line}`, background: c.tealFog }}>
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 4 }}>
          {'// '}4 · the hard-day card
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 12px' }}>
          The plan you keep on a good day is not the plan you reach for on a bad one. Decide now, while it is calm.
          Pick up to three go-to moves and write the first thing you will do when it is bad. A slip is one event,
          not a verdict.
        </p>

        {chosen.length === 0 ? (
          <p style={{ ...mono, fontSize: 12, color: c.faint, margin: 0 }}>
            choose a practice above, then mark your hard-day moves here.
          </p>
        ) : (
          <>
            <div style={{ ...mono, fontSize: 11, color: c.faint, marginBottom: 8 }}>
              your go-to moves {hardDay.length > 0 ? `(${hardDay.length}/3)` : '(pick up to 3)'}
            </div>
            <div role="group" aria-label="hard-day go-to moves" style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
              {chosen.map((p) => {
                const on = hardDay.includes(p.id);
                const full = hardDay.length >= 3 && !on;
                const route = getRoute(p.route);
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    disabled={full}
                    onClick={() => toggleHard(p.id)}
                    title={full ? 'three is plenty for a hard day' : p.line}
                    style={{
                      ...mono,
                      cursor: full ? 'not-allowed' : 'pointer',
                      fontSize: 11.5,
                      padding: '7px 11px',
                      borderRadius: 8,
                      border: `1px solid ${on ? `${route.color}99` : c.line2}`,
                      background: on ? `${route.color}1c` : 'transparent',
                      color: on ? route.color : full ? c.faint : c.muted,
                      opacity: full ? 0.6 : 1,
                      transition: 'all .14s ease',
                    }}
                  >
                    {on && <Check size={11} strokeWidth={3} style={{ verticalAlign: '-1px', marginRight: 5 }} />}
                    {p.name}
                    {p.hotMoment && !on && <span style={{ color: c.amber }}> ·</span>}
                  </button>
                );
              })}
            </div>

            <label htmlFor="hard-line" style={{ ...mono, fontSize: 11.5, color: c.tealDim, display: 'block', marginBottom: 7 }}>
              when it is bad, before anything else, I will…
            </label>
            <textarea
              id="hard-line"
              rows={2}
              value={hardLine}
              onChange={(e) => setHardLine(e.target.value)}
              placeholder="name it, exhale long, and not decide anything for ten minutes…"
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
          </>
        )}
      </div>
    </WidgetShell>
  );
}

/* ── small building blocks ─────────────────────────────────── */

function Block({ n, label, children }: { n: string; label: string; children: ReactNode }) {
  return (
    <div style={{ padding: '15px 16px', borderBottom: `1px solid ${c.line}` }}>
      <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 6 }}>
        {'// '}
        {n} · {label}
      </div>
      {children}
    </div>
  );
}

const stepLead: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  color: c.muted,
  margin: '0 0 13px',
};

function routeTag(color: string): CSSProperties {
  return {
    ...mono,
    fontSize: 10,
    color,
    border: `1px solid ${color}55`,
    background: `${color}12`,
    borderRadius: 6,
    padding: '2px 7px',
  };
}

function footBtn(enabled: boolean): CSSProperties {
  return {
    ...mono,
    fontSize: 12,
    cursor: enabled ? 'pointer' : 'not-allowed',
    padding: '8px 12px',
    borderRadius: 8,
    border: `1px solid ${c.line2}`,
    background: 'transparent',
    color: enabled ? c.muted : c.faint,
    opacity: enabled ? 1 : 0.5,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
  };
}
