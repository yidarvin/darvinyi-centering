import { useState, type CSSProperties } from 'react';
import { Check, RotateCcw, ExternalLink, ChevronDown, ChevronUp, LifeBuoy } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { CHECK_QUESTIONS, FLAG_TIERS, type Lean } from './flags';
import { GROUPS, groupOf, type Group, type Resource } from './resources';

/**
 * widget_18.1, the self-check. Two instruments, deliberately separate.
 *
 * First, "settling or avoiding": a few honest questions that sort a calm the
 * reader has been leaning on toward equanimity or toward its counterfeits. The
 * read-out is a mirror, never a score.
 *
 * Second, the flags: yellow and red signposts for whether a practice is a fair
 * place to start or whether it is time for a professional. Checking a red flag
 * surfaces crisis resources at once. And the resources are ALWAYS reachable, in a
 * browse-all panel, because you never gate crisis information behind a quiz. The
 * whole thing is framed, out loud, as not a diagnosis.
 */

const NS = 'centering:widget:calm-is-not-numbness';

const SLATE = '#7c8794';

const LEANS: { id: Lean; mid?: boolean }[] = [
  { id: 'settling' },
  { id: 'mixed', mid: true },
  { id: 'avoiding' },
];

export function SelfCheck() {
  const [answers, setAnswers] = useLocalStorage<Record<string, Lean>>(`${NS}:answers`, {});
  // session-only, on purpose: these checkboxes can include suicidal-ideation flags,
  // and this is a widget people may use on a shared or borrowed device. Nothing
  // here should still be ticked for the next person who opens the page.
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [browseOpen, setBrowseOpen] = useState(false);

  const answered = CHECK_QUESTIONS.filter((q) => answers[q.id]);
  const score =
    answered.reduce((sum, q) => sum + (answers[q.id] === 'settling' ? 0 : answers[q.id] === 'mixed' ? 1 : 2), 0) /
    Math.max(1, answered.length);
  const lean: Lean = answered.length === 0 ? 'mixed' : score < 0.6 ? 'settling' : score > 1.3 ? 'avoiding' : 'mixed';

  const yellow = FLAG_TIERS.find((t) => t.id === 'yellow')!;
  const red = FLAG_TIERS.find((t) => t.id === 'red')!;
  const redOn = red.signposts.some((_, i) => checks[`red-${i}`]);
  const yellowOn = yellow.signposts.some((_, i) => checks[`yellow-${i}`]);

  const started = answered.length > 0 || Object.values(checks).some(Boolean);

  const setAnswer = (qid: string, v: Lean) =>
    setAnswers((a) => ({ ...a, [qid]: a[qid] === v ? (undefined as unknown as Lean) : v }));
  const toggleCheck = (k: string) => setChecks((c0) => ({ ...c0, [k]: !c0[k] }));
  const reset = () => {
    setAnswers({});
    setChecks({});
  };

  return (
    <WidgetShell
      id="18.1"
      name="self_check"
      title="Settling, or avoiding?"
      legend={
        <span style={{ ...mono, fontSize: 11, color: c.faint, whiteSpace: 'nowrap' }}>not a diagnosis</span>
      }
      footer={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <LifeBuoy size={14} color={c.faint} style={{ flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: 11.5, color: c.faint, flex: 1, minWidth: 180, lineHeight: 1.5 }}>
            a mirror, not a verdict. it cannot see you. the questions above save between visits; the
            checklist below does not, so it clears itself when you leave.
          </span>
          {started && (
            <button type="button" onClick={reset} style={footBtn}>
              <RotateCcw size={12} /> clear
            </button>
          )}
        </div>
      }
    >
      {/* ── part 1: settling or avoiding ─────────────────────────── */}
      <div style={{ padding: '14px 16px 6px' }}>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 4px' }}>
          Bring to mind a calm you have been leaning on lately: a practice, a phrase, a way of getting quiet. Answer
          honestly. There is no right column, only a true one.
        </p>
      </div>

      {CHECK_QUESTIONS.map((q) => {
        const current = answers[q.id];
        return (
          <fieldset
            key={q.id}
            style={{ border: 'none', margin: 0, padding: '10px 16px', borderTop: `1px solid ${c.line}` }}
          >
            <legend style={{ fontSize: 13.5, lineHeight: 1.55, color: c.prose, padding: 0, marginBottom: 9 }}>
              {q.prompt}
            </legend>
            <div role="radiogroup" aria-label={q.prompt} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {LEANS.map(({ id, mid }) => {
                const on = current === id;
                const label = id === 'settling' ? q.settling : id === 'avoiding' ? q.avoiding : 'some of both';
                const color = id === 'settling' ? c.teal : id === 'avoiding' ? SLATE : c.muted;
                const edge = id === 'settling' ? c.tealEdge : id === 'avoiding' ? 'rgba(124,135,148,0.42)' : c.line2;
                const fog = id === 'settling' ? c.tealFog : id === 'avoiding' ? 'rgba(124,135,148,0.12)' : 'transparent';
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setAnswer(q.id, id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      border: `1px solid ${on ? edge : c.line}`,
                      borderRadius: 9,
                      background: on ? fog : c.panel,
                      padding: '9px 11px',
                      transition: 'border-color .14s ease, background .14s ease',
                      fontStyle: mid ? 'italic' : 'normal',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 15,
                        height: 15,
                        flexShrink: 0,
                        borderRadius: '50%',
                        border: `1px solid ${on ? color : c.line2}`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: on ? fog : 'transparent',
                      }}
                    >
                      {on && <span style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />}
                    </span>
                    <span style={{ fontSize: 13, lineHeight: 1.45, color: on ? c.text : c.muted }}>{label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {/* read-out for part 1 */}
      <div style={{ padding: '8px 16px 16px', borderTop: `1px solid ${c.line}` }}>
        {answered.length === 0 ? (
          <p style={{ ...mono, fontSize: 11.5, color: c.faint, margin: 0, lineHeight: 1.5 }}>
            answer a few above, and an honest read shows up here.
          </p>
        ) : (
          <LeanReadout lean={lean} answered={answered.length} score={score} />
        )}
      </div>

      {/* ── part 2: is a practice enough right now? ──────────────── */}
      <div style={{ padding: '16px 16px 6px', borderTop: `1px solid ${c.line2}`, background: c.panel }}>
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 5 }}>
          {'// '}is a practice enough right now?
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 4px' }}>
          Separate question, and a more serious one. Tick anything true for you lately. These are signposts, not a
          diagnosis. Nothing here can tell you what is wrong. It can only help you decide whether a practice is a fair
          place to start, or whether it is time to bring in a person.
        </p>
      </div>

      <FlagChecklist tier={yellow} checks={checks} onToggle={toggleCheck} />
      <FlagChecklist tier={red} checks={checks} onToggle={toggleCheck} />

      {/* auto-surfaced response, announced live so a screen-reader user hears that
          crisis resources appeared the moment a red or yellow flag is ticked */}
      <div style={{ padding: '4px 16px 14px' }} role="status" aria-live="polite" aria-atomic="true">
        {redOn ? (
          <ResponsePanel
            color={c.coral}
            fog={c.coralFog}
            edge={c.coralEdge}
            title="Please reach out now."
            body="If any red flag is true, this is bigger than a practice, and you should not sit with it alone. You do not have to be certain anything is wrong to make the call. Reaching out is for the person in distress and for anyone worried about someone else."
            groups={[groupOf('crisis'), groupOf('community')]}
          />
        ) : yellowOn ? (
          <ResponsePanel
            color={c.amber}
            fog={c.amberFog}
            edge={c.amberEdge}
            title="This is worth talking to someone about."
            body="What you ticked is the kind of thing a professional can actually help with. Reaching out early is not an overreaction, it is the sensible move, and you do not need your symptoms to 'count' first. A practice can sit alongside that, not instead of it."
            groups={[groupOf('ongoing')]}
          />
        ) : (
          <ResponsePanel
            color={c.emerald}
            fog="rgba(52,211,153,0.10)"
            edge="rgba(52,211,153,0.42)"
            title="Nothing here is flagging."
            body="A practice is a fair place to start. Keep these signposts in the back of your mind, and come back if the picture changes. You can also talk to someone at any point. You never have to wait until things are bad enough."
            groups={[]}
          />
        )}
      </div>

      {/* ── always-available: browse all resources ───────────────── */}
      <div style={{ padding: '0 16px 18px' }}>
        <button
          type="button"
          onClick={() => setBrowseOpen((o) => !o)}
          aria-expanded={browseOpen}
          style={{
            ...mono,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            cursor: 'pointer',
            fontSize: 12,
            padding: '11px 13px',
            borderRadius: 9,
            border: `1px solid ${c.line2}`,
            background: c.panel2,
            color: c.muted,
          }}
        >
          <span>browse every resource · save two before you need them</span>
          {browseOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {browseOpen && (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {GROUPS.map((g) => (
              <GroupBlock key={g.id} group={g} />
            ))}
            <p style={{ ...mono, fontSize: 10.5, color: c.faint, margin: '2px 0 0', lineHeight: 1.55 }}>
              verified 2026-06-30. crisis numbers are region-specific and can change, so confirm your local line is
              current. this is education, not therapy or diagnosis.
            </p>
          </div>
        )}
      </div>
    </WidgetShell>
  );
}

/* ── read-out ──────────────────────────────────────────────────── */

function LeanReadout({ lean, answered, score }: { lean: Lean; answered: number; score: number }) {
  const color = lean === 'settling' ? c.teal : lean === 'avoiding' ? SLATE : c.amber;
  const edge = lean === 'settling' ? c.tealEdge : lean === 'avoiding' ? 'rgba(124,135,148,0.42)' : c.amberEdge;
  const fog = lean === 'settling' ? c.tealFog : lean === 'avoiding' ? 'rgba(124,135,148,0.12)' : c.amberFog;
  const text =
    lean === 'settling'
      ? 'This reads like settling. The calm you are describing meets what is hard and points you back toward your life. That is the real thing. Keep going.'
      : lean === 'avoiding'
      ? 'Some of this reads like avoidance wearing calm’s clothes: a settled surface over a feeling that has not been met. That is worth knowing, not a failing. The move is not to practice harder. It is to turn, gently, toward the thing you have been settling away from. If what you are avoiding feels too big to face alone, the check below is for exactly that.'
      : 'This reads like some of both. Part of your calm meets what is hard, and part of it may be helping you slip past it. Worth watching which is which, without turning it into one more thing to judge yourself for.';

  return (
    <div style={{ border: `1px solid ${edge}`, borderRadius: 11, background: fog, padding: '12px 14px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 9 }}>
        <span style={{ ...mono, fontSize: 11, color, letterSpacing: '.03em' }}>
          {'// '}
          {lean === 'settling' ? 'leaning toward settling' : lean === 'avoiding' ? 'leaning toward avoiding' : 'a bit of both'}
        </span>
        <span style={{ ...mono, fontSize: 10.5, color: c.faint }}>{answered}/5 answered</span>
      </div>
      {/* the soft bar: settling on the left, avoiding on the right */}
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: c.line2, marginBottom: 11 }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -3,
            left: `calc(${(score / 2) * 100}% - 6px)`,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: color,
            border: `2px solid ${c.panel2}`,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', ...mono, fontSize: 9.5, color: c.faint, marginBottom: 11 }}>
        <span>settling</span>
        <span>avoiding</span>
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.62, color: c.text, margin: 0 }}>{text}</p>
    </div>
  );
}

/* ── flags checklist ───────────────────────────────────────────── */

function FlagChecklist({
  tier,
  checks,
  onToggle,
}: {
  tier: (typeof FLAG_TIERS)[number];
  checks: Record<string, boolean>;
  onToggle: (k: string) => void;
}) {
  return (
    <div style={{ padding: '8px 16px 4px' }}>
      <div style={{ ...mono, fontSize: 10.5, color: tier.color, letterSpacing: '.04em', margin: '4px 0 8px' }}>
        {'// '}
        {tier.label} · {tier.headline.toLowerCase()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {tier.signposts.map((s, i) => {
          const k = `${tier.id}-${i}`;
          const on = !!checks[k];
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(k)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 11,
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                border: `1px solid ${on ? tier.edge : c.line}`,
                borderRadius: 9,
                background: on ? tier.fog : c.panel,
                padding: '9px 11px',
                transition: 'border-color .14s ease, background .14s ease',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 17,
                  height: 17,
                  flexShrink: 0,
                  marginTop: 1,
                  borderRadius: 5,
                  border: `1px solid ${on ? tier.color : c.line2}`,
                  background: on ? tier.fog : 'transparent',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {on && <Check size={12} color={tier.color} strokeWidth={3} />}
              </span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: on ? c.text : c.prose }}>{s}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── response panel + resource rendering ───────────────────────── */

function ResponsePanel({
  color,
  fog,
  edge,
  title,
  body,
  groups,
}: {
  color: string;
  fog: string;
  edge: string;
  title: string;
  body: string;
  groups: Group[];
}) {
  return (
    <div style={{ border: `1px solid ${edge}`, borderRadius: 11, background: fog, padding: '13px 14px 14px' }}>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: c.text, marginBottom: 5 }}>{title}</div>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: c.muted, margin: groups.length ? '0 0 12px' : 0 }}>{body}</p>
      {groups.map((g) => (
        <div key={g.id} style={{ marginTop: 10 }}>
          <div style={{ ...mono, fontSize: 10, color, letterSpacing: '.03em', marginBottom: 7 }}>{g.label}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {g.resources.map((r) => (
              <ResourceCard key={r.id} r={r} accent={color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GroupBlock({ group }: { group: Group }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 8, flexWrap: 'wrap' }}>
        <span style={{ ...mono, fontSize: 11.5, color: group.color, letterSpacing: '.03em' }}>
          {'// '}
          {group.label}
        </span>
        <span style={{ ...mono, fontSize: 10, color: c.faint }}>{group.gloss}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {group.resources.map((r) => (
          <ResourceCard key={r.id} r={r} accent={group.color} />
        ))}
      </div>
    </div>
  );
}

function ResourceCard({ r, accent }: { r: Resource; accent: string }) {
  return (
    <div style={{ border: `1px solid ${c.line}`, borderRadius: 10, background: c.panel2, padding: '11px 12px' }}>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: c.text, marginBottom: 2 }}>{r.name}</div>
      <div style={{ fontSize: 12, color: c.faint, lineHeight: 1.45, marginBottom: 7 }}>{r.who}</div>
      <div style={{ ...mono, fontSize: 12, color: accent, lineHeight: 1.55, marginBottom: r.note ? 6 : 8 }}>
        {r.contact}
      </div>
      {r.note && (
        <div style={{ fontSize: 11.5, color: c.muted, lineHeight: 1.5, marginBottom: 8, fontStyle: 'italic' }}>
          {r.note}
        </div>
      )}
      <a
        href={r.url}
        target="_blank"
        rel="noreferrer noopener"
        style={{
          ...mono,
          fontSize: 11,
          color: c.muted,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          borderBottom: `1px solid ${c.line2}`,
          paddingBottom: 1,
        }}
      >
        {r.urlLabel} <ExternalLink size={11} />
      </a>
    </div>
  );
}

const footBtn: CSSProperties = {
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
};
