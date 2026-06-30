import { RotateCcw, CornerDownRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

interface Scenario {
  id: string;
  label: string;
  situation: string;
  forceVoice: string;
  flowVoice: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'flight',
    label: 'a delayed flight',
    situation: 'Your flight is delayed three hours. Nothing you do moves the plane.',
    forceVoice: 'You refresh the board, rehearse the complaint, pace the gate, and seethe. The plane is exactly as late as it was.',
    flowVoice: 'The delay is the delay. You find a chair, a book, a long exhale. You will arrive when you arrive.',
  },
  {
    id: 'queue',
    label: 'a line that crawls',
    situation: 'The queue barely moves. The person at the front has a question for every item.',
    forceVoice: 'You sigh loudly, crane your neck, check the time, and try to will the line forward. It moves at its own pace anyway.',
    flowVoice: 'The line moves at the pace of the line. You let your shoulders drop and wait inside it instead of against it.',
  },
  {
    id: 'person',
    label: 'someone who will not change',
    situation: 'A person you care about keeps doing the thing, and will not change because you want them to.',
    forceVoice: 'You push, repeat yourself, apply pressure, build the case again. The wall pushes back, and you are both more tired.',
    flowVoice: 'You stop trying to carve them down to your line. You meet the person who is actually there, and spend your effort where it can land.',
  },
  {
    id: 'feeling',
    label: 'a feeling already here',
    situation: 'A wave of anxiety, or grief, or anger is already in the body. It arrived without asking.',
    forceVoice: 'You clamp down, argue with it, order it gone. It digs in, because resistance is the one thing that feeds it.',
    flowVoice: 'You let it move through, the way weather moves through a valley. You stop damming it, and it starts to pass.',
  },
  {
    id: 'block',
    label: 'an idea that will not come',
    situation: 'The work is stuck. The page stays blank and the deadline does not.',
    forceVoice: 'You grind, stare, force sentences that die on contact, and the harder you squeeze the further it retreats.',
    flowVoice: 'You step back, take the walk, let it ripen. It arrives sideways, usually the moment you stop strangling it.',
  },
];

interface Arena {
  id: string;
  text: string;
}

const ARENAS: Arena[] = [
  { id: 'person', text: 'A person I keep trying to change' },
  { id: 'outcome', text: 'An outcome that is not mine to decide' },
  { id: 'feeling', text: 'A feeling I keep trying to push away' },
  { id: 'pace', text: 'A pace or a timeline I am forcing' },
  { id: 'past', text: 'Something already done that I keep re-fighting' },
];

type Stance = 'force' | 'flow';

function verdict(force: number): { head: string; body: string; col: string } {
  if (force >= 0.75)
    return {
      head: 'you are the dam',
      body: 'You are spending everything to hold back a current that will keep coming either way. Look at what actually moved. The situation is right where it was. The only thing that grew is the strain, and the strain is the part you added.',
      col: c.coral,
    };
  if (force >= 0.45)
    return {
      head: 'still pushing, a little less',
      body: 'Some of the force has come off, and some of the strain with it. Notice that the strain is yours, stacked on top of the situation, not built into it. The situation has not changed at all. Your grip has.',
      col: c.amber,
    };
  if (force >= 0.12)
    return {
      head: 'mostly with it now',
      body: 'You have largely stopped fighting the current. The situation is unchanged, and that is fine, because you are moving around it now instead of into it, the way water takes the low path around a rock and arrives anyway.',
      col: c.teal,
    };
  return {
    head: 'flowing. and not doing nothing',
    body: 'You have set the forcing down. This is the part people misread: flowing is not going limp or giving up. The swimmer still swims, the cook still cuts. It is effort without strain, action without fighting the grain. The old word for it is wu wei.',
    col: c.teal,
  };
}

// a fixed jitter pattern so the choppy water surface is deterministic (no Math.random)
const JITTER = [0.3, -0.7, 0.9, -0.4, 0.6, -0.85, 0.5, -0.6, 0.75, -0.35, 0.55, -0.7, 0.4];

function surfacePath(force: number): string {
  const baseY = 70;
  const amp = force * 15;
  const pts = JITTER.map((m, i) => {
    const x = 18 + (i * (300 - 18)) / (JITTER.length - 1);
    const y = baseY - m * amp;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return pts.join(' ');
}

/**
 * widget_08.1, force or flow. The reader picks a situation that will not move,
 * then works one slider: forcing it, or moving with it. The fixed rock (the
 * situation) never changes. What changes is the reader. Toward "force," the
 * water piles up choppy behind a coral dam and the strain bar fills; toward
 * "flow," the dam dissolves into a smooth teal streamline that takes the low
 * path around the rock, and the strain falls to almost nothing while a floor of
 * real effort remains, because wu wei is not inaction. Below, a small mapper
 * lets the reader mark where in their own life they are currently forcing, and
 * keeps it. Concept: Tao Te Ching ch.8, 43, 78; Cook Ding, Zhuangzi ch.3.
 */
export function ForceOrFlow() {
  const [sceneId, setSceneId] = useLocalStorage<string>('centering:widget:the-watercourse-way:scene', 'flight');
  const [slider, setSlider] = useLocalStorage<number>('centering:widget:the-watercourse-way:force', 70);
  const [picks, setPicks] = useLocalStorage<Record<string, Stance>>('centering:widget:the-watercourse-way:mapper', {});

  const scene = SCENARIOS.find((s) => s.id === sceneId) ?? SCENARIOS[0];
  const force = slider / 100;
  const flow = 1 - force;
  const strainPct = force;
  const effortPct = 0.22 + 0.78 * force; // a floor of effort always remains: flowing is not nothing
  const v = verdict(force);

  const forcingCount = ARENAS.filter((a) => picks[a.id] === 'force').length;
  const mapped = ARENAS.filter((a) => picks[a.id]).length;

  return (
    <WidgetShell
      id="08.1"
      name="force_or_flow"
      title="Push against it, or move with it?"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: v.col, whiteSpace: 'nowrap' }}>
          {force < 0.12 ? 'flowing' : force < 0.45 ? 'yielding' : 'forcing'}
        </span>
      }
      footer={
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>
            concept: Tao Te Ching ch.8, 43, 78 (the soft outdoes the hard) · Cook Ding, Zhuangzi ch.3 (effort
            without strain) · wu wei
          </span>
          {slider !== 70 && (
            <button
              type="button"
              onClick={() => setSlider(70)}
              style={{
                ...mono,
                marginLeft: 'auto',
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
      {/* scenario picker */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          padding: '13px 16px',
          borderBottom: `1px solid ${c.line}`,
          background: c.panel,
        }}
      >
        {SCENARIOS.map((s) => {
          const active = s.id === sceneId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSceneId(s.id)}
              style={{
                ...mono,
                cursor: 'pointer',
                fontSize: 11.5,
                padding: '7px 11px',
                borderRadius: 8,
                border: `1px solid ${active ? c.tealEdge : c.line2}`,
                background: active ? c.tealFog : 'transparent',
                color: active ? c.teal : c.muted,
                transition: 'all .14s ease',
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '16px 16px 6px' }}>
        {/* the water scene */}
        <svg
          viewBox="0 0 320 150"
          style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 460, margin: '0 auto' }}
          role="img"
          aria-label={`A channel with a fixed rock, the situation, that does not move. You are meeting it at ${Math.round(
            force * 100,
          )} percent force. ${
            force >= 0.45
              ? 'The water is piled up choppy behind you like a dam, and the strain is high.'
              : 'The water runs smooth around the rock and the strain is low; you are moving with the current.'
          }`}
        >
          <defs>
            <marker id="fof-cur" markerWidth="7" markerHeight="7" refX="4.5" refY="3" orient="auto">
              <path d="M0 0 L4.5 3 L0 6 Z" fill={c.faint} fillOpacity={0.7} />
            </marker>
          </defs>

          {/* channel */}
          <rect x={8} y={30} width={304} height={92} rx={8} fill={c.panel} stroke={c.line} />

          {/* faint current direction, always present */}
          <path d="M22,112 L300,112" stroke={c.faint} strokeWidth={1} strokeOpacity={0.4} markerEnd="url(#fof-cur)" />
          <text x={22} y={108} fontFamily={mono.fontFamily} fontSize={7.5} fill={c.faint}>
            the current keeps coming
          </text>

          {/* the rock: the situation, fixed */}
          <path
            d="M232,58 L256,53 L276,66 L280,92 L262,104 L238,102 L226,80 Z"
            fill={c.panel2}
            stroke={c.faint}
            strokeWidth={1.3}
          />
          <text x={253} y={120} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={8} fill={c.muted}>
            the situation
          </text>
          <text x={253} y={130} textAnchor="middle" fontFamily={mono.fontFamily} fontSize={7.5} fill={c.faint}>
            (will not move)
          </text>

          {/* FORCING overlay: a dam, piled choppy water, fades in with force */}
          <g style={{ opacity: force, transition: 'opacity .12s ease' }}>
            {/* the choppy surface, amplitude scales with force */}
            <path d={surfacePath(force)} fill="none" stroke={c.coral} strokeWidth={1.6} strokeOpacity={0.85} />
            {/* the dam: you, planted across the current */}
            <rect x={150} y={40} width={7} height={74} rx={2} fill={c.coral} fillOpacity={0.3} stroke={c.coral} strokeWidth={1.5} />
            {/* spray off the dam */}
            <g fill={c.coral} fillOpacity={0.7}>
              <circle cx={146} cy={42} r={1.6} />
              <circle cx={141} cy={48} r={1.3} />
              <circle cx={148} cy={36} r={1.2} />
            </g>
            {force >= 0.5 && (
              <text x={148} y={32} textAnchor="end" fontFamily={mono.fontFamily} fontSize={8} fill={c.coral}>
                you: holding the line
              </text>
            )}
          </g>

          {/* FLOWING overlay: smooth streamlines around the rock, fades in with flow */}
          <g style={{ opacity: flow, transition: 'opacity .12s ease' }}>
            <path
              d="M18,70 C 110,70 150,56 210,54 C 250,53 280,60 302,66"
              fill="none"
              stroke={c.teal}
              strokeWidth={2}
              strokeOpacity={0.85}
            />
            <path
              d="M18,82 C 110,84 150,98 214,100 C 252,101 280,94 302,90"
              fill="none"
              stroke={c.teal}
              strokeWidth={2}
              strokeOpacity={0.55}
            />
            {force < 0.5 && (
              <text x={70} y={62} fontFamily={mono.fontFamily} fontSize={8} fill={c.teal}>
                you: moving with it
              </text>
            )}
          </g>
        </svg>

        {/* strain and effort read-outs */}
        <div style={{ maxWidth: 460, margin: '14px auto 0' }}>
          <Bar label="strain" sub="the friction you add" pct={strainPct} color={c.coral} />
          <Bar label="effort" sub="what it costs you · never quite zero" pct={effortPct} color={c.amber} />
        </div>

        {/* the slider */}
        <div style={{ maxWidth: 460, margin: '14px auto 0' }}>
          <label
            htmlFor="fof-slider"
            style={{ ...mono, fontSize: 11.5, color: c.muted, display: 'block', marginBottom: 8 }}
          >
            how are you meeting it?
          </label>
          <input
            id="fof-slider"
            type="range"
            min={0}
            max={100}
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            style={{ width: '100%', accentColor: force >= 0.45 ? c.coral : c.teal, cursor: 'pointer' }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              ...mono,
              fontSize: 10,
              color: c.faint,
              marginTop: 2,
            }}
          >
            <span>move with it</span>
            <span>push against it</span>
          </div>
        </div>

        {/* the situation and the voice that matches the slider */}
        <div style={{ maxWidth: 460, margin: '16px auto 0' }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: '0 0 8px' }}>
            <span style={{ ...mono, fontSize: 11, color: c.faint }}>the situation · </span>
            {scene.situation}
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: c.faint, fontStyle: 'italic', margin: 0 }}>
            <span
              style={{
                ...mono,
                fontSize: 10.5,
                color: force >= 0.45 ? c.coral : c.teal,
                fontStyle: 'normal',
              }}
            >
              {force >= 0.45 ? 'forcing · ' : 'flowing · '}
            </span>
            {force >= 0.45 ? scene.forceVoice : scene.flowVoice}
          </p>
        </div>
      </div>

      {/* the verdict */}
      <div style={{ padding: '8px 16px 18px' }}>
        <div
          style={{
            maxWidth: 460,
            margin: '0 auto',
            border: `1px solid ${v.col}55`,
            borderRadius: 11,
            background: force < 0.12 ? c.tealFog : c.panel,
            padding: '13px 14px',
          }}
        >
          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <CornerDownRight size={15} color={v.col} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ ...mono, fontSize: 11.5, color: v.col, marginBottom: 5 }}>{v.head}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.text, margin: 0 }}>{v.body}</p>
            </div>
          </div>
        </div>
      </div>

      {/* the "where am I forcing" mapper */}
      <div style={{ padding: '16px 16px 20px', borderTop: `1px solid ${c.line}`, background: c.panel }}>
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, letterSpacing: '.05em', marginBottom: 4 }}>
          {'// '}where am I forcing
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: c.muted, margin: '0 0 14px' }}>
          Run the same question across your own life. For each, mark whether, right now, you are pushing
          against it or moving with it. Be honest. This one is yours, and it saves.
        </p>

        {ARENAS.map((a) => {
          const sel = picks[a.id];
          return (
            <div
              key={a.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
                border: `1px solid ${sel === 'force' ? c.coralEdge : sel === 'flow' ? c.tealEdge : c.line}`,
                borderRadius: 10,
                padding: '10px 12px',
                marginBottom: 9,
                background: c.panel2,
              }}
            >
              <span id={`arena-${a.id}`} style={{ fontSize: 13.5, lineHeight: 1.45, color: c.text, flex: '1 1 200px' }}>
                {a.text}
              </span>
              <div role="group" aria-labelledby={`arena-${a.id}`} style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                {(['force', 'flow'] as Stance[]).map((stance) => {
                  const active = sel === stance;
                  const col = stance === 'force' ? c.coral : c.teal;
                  const edge = stance === 'force' ? c.coralEdge : c.tealEdge;
                  const fog = stance === 'force' ? c.coralFog : c.tealFog;
                  return (
                    <button
                      key={stance}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPicks((p) => ({ ...p, [a.id]: stance }))}
                      style={{
                        ...mono,
                        cursor: 'pointer',
                        fontSize: 11.5,
                        padding: '7px 12px',
                        borderRadius: 8,
                        border: `1px solid ${active ? edge : c.line2}`,
                        background: active ? fog : 'transparent',
                        color: active ? col : c.faint,
                        transition: 'all .14s ease',
                      }}
                    >
                      {stance === 'force' ? 'forcing' : 'flowing'}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {mapped > 0 && (
          <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginTop: 13 }}>
            <CornerDownRight size={15} color={c.teal} style={{ marginTop: 3, flexShrink: 0 }} />
            <p style={{ fontSize: 13.5, lineHeight: 1.62, color: c.text, margin: 0 }}>
              {forcingCount === 0 ? (
                <>You marked nothing as forcing. Either you are unusually settled, or worth a second, more honest pass.</>
              ) : (
                <>
                  You are forcing in{' '}
                  <span style={{ color: c.coral }}>
                    {forcingCount} {forcingCount === 1 ? 'place' : 'places'}
                  </span>
                  . That is where the strain is coming from, not from the situations themselves. You do not
                  have to fix all of it. Pick one to set down this week, and watch what happens to the strain,
                  even before anything else changes.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </WidgetShell>
  );
}

function Bar({ label, sub, pct, color }: { label: string; sub: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{ ...mono, fontSize: 11, color }}>{label}</span>
        <span style={{ ...mono, fontSize: 10, color: c.faint }}>{sub}</span>
      </div>
      <div style={{ height: 8, borderRadius: 5, background: c.panel, border: `1px solid ${c.line}`, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.round(pct * 100)}%`,
            background: color,
            opacity: 0.5,
            borderRadius: 5,
            transition: 'width .12s ease',
          }}
        />
      </div>
    </div>
  );
}
