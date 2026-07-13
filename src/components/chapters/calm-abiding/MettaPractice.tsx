import { useEffect, useRef, useState } from 'react';
import { Play, Pause, ArrowRight } from 'lucide-react';
import { c, mono } from '@/styles/tokens';
import { WidgetShell } from '@/components/WidgetShell';
import { useLocalStorage } from '@/lib/useLocalStorage';

interface Recipient {
  id: string;
  label: string;
  who: string;
}

// a modern six-step widening of the classical order. the Visuddhimagga itself
// works through four objects, oneself, a dear person, a neutral person, then
// a hostile person, before widening outward to all beings; it has no separate
// benefactor/friend split. begin where good will comes easily, then widen the
// circle until the lines between self, friend, stranger, and difficult person
// dissolve.
const RECIPIENTS: Recipient[] = [
  { id: 'self', label: 'yourself', who: 'Begin here. Picture yourself, or just feel where you sit.' },
  { id: 'benefactor', label: 'a benefactor', who: 'Someone who has been good to you, easy to feel warmth for.' },
  { id: 'friend', label: 'a dear friend', who: 'Someone you love, bring their face to mind.' },
  { id: 'neutral', label: 'a neutral person', who: 'Someone you neither like nor dislike. A cashier, a neighbor.' },
  { id: 'difficult', label: 'a difficult person', who: 'Someone you are at odds with. Start mild, not your hardest case.' },
  { id: 'all', label: 'all beings', who: 'Let it widen with no edge: this room, this city, outward, everywhere.' },
];

// the modern Insight-tradition formula (the Salzberg lineage). carries the spirit
// of the Metta Sutta; not lines lifted from the text.
const PHRASES = ['be safe', 'be happy', 'be healthy', 'live with ease'];
const PHRASE_MS = 5500; // one slow, coherent breath per phrase

/**
 * widget_06.3, the metta phrase practice. The reader moves through a modern
 * six-step widening of recipients (self, benefactor, friend, neutral, difficult,
 * all) while a phrase cycles on a slow breath cadence. The Visuddhimagga's own
 * order is narrower, four objects (self, a dear person, a neutral person, a
 * hostile person) before it widens to all beings, with no benefactor/friend
 * split; this widget's finer steps are a modern teaching form built on it, not a
 * direct rendering of it. The phrasing is the modern Insight-tradition formula;
 * the practice itself is the Karaniya Metta Sutta's lovingkindness. A gentle
 * caution carries the manual's own advice about where not to begin.
 */
export function MettaPractice() {
  const [rounds, setRounds] = useLocalStorage<number>('centering:widget:calm-abiding:metta-rounds', 0);
  const [recipient, setRecipient] = useState(0);
  const [phrase, setPhrase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  const r = RECIPIENTS[recipient];
  const subject = r.id === 'self' ? 'May I' : 'May you';

  // advance the phrase on the breath cadence while playing
  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setPhrase((p) => (p + 1) % PHRASES.length);
    }, PHRASE_MS);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [playing]);

  function nextRecipient() {
    setPhrase(0);
    setRecipient((i) => {
      if (i === RECIPIENTS.length - 1) {
        setRounds((n) => n + 1);
        return 0;
      }
      return i + 1;
    });
  }
  function jumpRecipient(i: number) {
    setRecipient(i);
    setPhrase(0);
  }

  return (
    <WidgetShell
      id="06.3"
      name="lovingkindness"
      title="Widen the circle of good will"
      legend={
        <span style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: 'nowrap' }}>
          {rounds} {rounds === 1 ? 'round' : 'rounds'}
        </span>
      }
      footer={
        <span style={{ ...mono, fontSize: 11, color: c.faint, lineHeight: 1.5 }}>
          practice: Karaṇīya Metta Sutta (Sn 1.8) · order of recipients: a modern six-step form built on
          the Visuddhimagga's four · the four phrases are the modern Insight-tradition formula, not lines
          from the sutta
        </span>
      }
    >
      {/* recipient stepper */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 7,
          padding: '13px 16px',
          borderBottom: `1px solid ${c.line}`,
          background: c.panel,
        }}
      >
        {RECIPIENTS.map((rec, i) => {
          const active = i === recipient;
          return (
            <button
              key={rec.id}
              type="button"
              aria-pressed={active}
              onClick={() => jumpRecipient(i)}
              style={{
                ...mono,
                cursor: 'pointer',
                fontSize: 11,
                padding: '6px 9px',
                borderRadius: 7,
                border: `1px solid ${active ? c.tealEdge : c.line2}`,
                background: active ? c.tealFog : 'transparent',
                color: active ? c.teal : c.faint,
                transition: 'all .14s ease',
              }}
            >
              {rec.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '22px 18px 20px', textAlign: 'center' }}>
        {/* who to bring to mind */}
        <div style={{ ...mono, fontSize: 11, color: c.tealDim, marginBottom: 6 }}>
          toward {r.label}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: c.muted, margin: '0 auto 20px', maxWidth: 360 }}>
          {r.who}
        </p>

        {/* breath dot */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <svg viewBox="0 0 80 80" style={{ width: 64, height: 64 }} aria-hidden="true">
            <circle cx={40} cy={40} r={30} fill="none" stroke={c.line} strokeWidth={1} strokeDasharray="2 5" />
            <circle
              cx={40}
              cy={40}
              r={20}
              fill={c.tealFog}
              stroke={c.teal}
              strokeWidth={playing ? 1.6 : 1}
              strokeOpacity={playing ? 1 : 0.5}
              style={
                playing
                  ? { animation: `breathe ${PHRASE_MS}ms ease-in-out infinite`, transformBox: 'fill-box', transformOrigin: 'center' }
                  : undefined
              }
            />
          </svg>
        </div>

        {/* the phrase */}
        <div aria-live="polite" style={{ minHeight: 38 }}>
          <span style={{ fontSize: 22, fontWeight: 500, color: c.text, letterSpacing: '-0.01em' }}>
            {subject} {PHRASES[phrase]}.
          </span>
        </div>

        {/* phrase dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '14px 0 20px' }}>
          {PHRASES.map((_, i) => (
            <span
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: 99,
                background: i === phrase ? c.teal : c.line2,
                transition: 'background .2s ease',
              }}
            />
          ))}
        </div>

        {/* controls */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            style={{
              ...mono,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              fontSize: 13,
              padding: '10px 18px',
              borderRadius: 9,
              border: `1px solid ${c.tealEdge}`,
              background: c.tealFog,
              color: c.teal,
              fontWeight: 500,
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? 'pause' : 'begin'}
          </button>
          <button
            type="button"
            onClick={nextRecipient}
            style={{
              ...mono,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              cursor: 'pointer',
              fontSize: 12.5,
              padding: '10px 14px',
              borderRadius: 9,
              border: `1px solid ${c.line2}`,
              background: 'transparent',
              color: c.muted,
            }}
          >
            next: {recipient === RECIPIENTS.length - 1 ? 'start over' : RECIPIENTS[recipient + 1].label}{' '}
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* the gentle caution, from the manual */}
      <div style={{ padding: '12px 16px 16px', borderTop: `1px solid ${c.line}`, background: c.panel }}>
        <p style={{ fontSize: 12, lineHeight: 1.55, color: c.faint, margin: 0 }}>
          The old manual offers two cautions: do not begin with someone you are romantically drawn to
          (it stirs desire, not good will), and do not direct the practice at a person who has died (the
          mind finds no living object to rest on). If warmth will not come for the difficult person, drop
          back to yourself or a friend. Forcing it is not the practice.
        </p>
      </div>
    </WidgetShell>
  );
}
