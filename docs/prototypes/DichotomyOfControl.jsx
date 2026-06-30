import { useState } from "react";
import { Check, X, ArrowRight, ArrowLeft, RotateCcw, CornerDownRight } from "lucide-react";

// ── design tokens ────────────────────────────────────────────────
const c = {
  bg: "#0a0a0b",
  panel: "#0f1012",
  panel2: "#141517",
  line: "rgba(255,255,255,0.08)",
  line2: "rgba(255,255,255,0.14)",
  teal: "#2dd4bf",
  tealDim: "#0d9488",
  tealFog: "rgba(45,212,191,0.10)",
  tealEdge: "rgba(45,212,191,0.40)",
  amber: "#f0b429",
  amberFog: "rgba(240,180,41,0.09)",
  amberEdge: "rgba(240,180,41,0.38)",
  text: "#e6e8ea",
  muted: "#9aa1a8",
  faint: "#5f666d",
};
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace" };
const sans = { fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" };

// ── content ──────────────────────────────────────────────────────
// answer: "mine" (eph' hēmin) | "not" (external) | "first" (proairetic nuance)
const ITEMS = [
  { id: "rain",     text: "Whether it rains on the day of my event",            answer: "not",   note: "External. The weather has never once consulted you." },
  { id: "judg",     text: "My verdict that the rain has \u201cruined\u201d everything", answer: "mine",  note: "Yours entirely \u2014 the judgment is added by you, not by the sky." },
  { id: "approve",  text: "Whether other people approve of me",                  answer: "not",   note: "Their minds are theirs. You get a vote, never the result." },
  { id: "integ",    text: "Whether I act with integrity right now",              answer: "mine",  note: "The one domain that is fully, always yours." },
  { id: "outcome",  text: "The outcome of a job interview",                      answer: "not",   note: "You supply the effort; the decision lives in someone else." },
  { id: "prep",     text: "How thoroughly I prepare for it",                     answer: "mine",  note: "Effort and attention are up to you. Results are not." },
  { id: "spike",    text: "The first jolt of fear when my phone buzzes",         answer: "first", note: "The Stoics called this a first movement \u2014 it arrives before reason. Not a failure, and not yet yours." },
  { id: "story",    text: "The story I wrap around that jolt",                   answer: "mine",  note: "Here it becomes yours \u2014 and here CBT and IFS pick up the thread." },
];
const eff = (a) => (a === "first" ? "not" : a); // effective column for scoring

export default function DichotomyOfControl() {
  const [pick, setPick] = useState({});   // id -> "mine" | "not"
  const [shown, setShown] = useState(false);

  const sorted = Object.keys(pick).length;
  const correct = ITEMS.filter((i) => pick[i.id] && pick[i.id] === eff(i.answer)).length;
  const mineTotal = ITEMS.filter((i) => eff(i.answer) === "mine").length;

  const assign = (id, v) => { if (!shown) setPick((p) => ({ ...p, [id]: v })); };
  const reset = () => { setPick({}); setShown(false); };

  return (
    <div style={{ ...sans, background: c.bg, color: c.text, minHeight: "100%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');`}</style>
      <style>{`@keyframes blink{0%,48%{opacity:1}49%,100%{opacity:0}}
        .seg:focus-visible{outline:2px solid ${c.teal};outline-offset:2px}
        textarea::placeholder{color:${c.faint}}`}</style>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "44px 22px 72px" }}>

        {/* eyebrow + title */}
        <div style={{ ...mono, fontSize: 12, letterSpacing: ".06em", color: c.tealDim, marginBottom: 18 }}>
          part_01 &middot; the_examined_calm
        </div>
        <div style={{ ...mono, fontSize: 12.5, color: c.faint, marginBottom: 10 }}>
          <span style={{ color: c.teal }}>§ 02.1</span>  //  stoicism
        </div>
        <h1 style={{ fontSize: 33, lineHeight: 1.12, fontWeight: 600, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          The Dichotomy of Control
        </h1>
        <p style={{ ...mono, fontSize: 12, color: c.faint, margin: "0 0 30px" }}>
          ta_eph_hēmin &mdash; what rests on us
        </p>

        {/* intro */}
        <p style={{ fontSize: 16.5, lineHeight: 1.72, color: c.muted, margin: "0 0 18px" }}>
          Almost two thousand years ago, a freed slave named Epictetus opened his handbook with a
          single distinction he thought worth building an entire life on. Sort the world into two
          bins, he said: the things that are up to you, and the things that are not.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.72, color: c.muted, margin: "0 0 30px" }}>
          The list of what's truly up to you is far shorter than it feels. Not your body, not your
          reputation, not the outcome of anything that passes through another person. What remains is
          interior: your judgments, your chosen actions, the meaning you assign. Anxiety, in this
          frame, is the friction of gripping the second bin as if it were the first.
        </p>

        {/* pull quote */}
        <blockquote style={{ margin: "0 0 34px", padding: "4px 0 4px 20px", borderLeft: `2px solid ${c.teal}` }}>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: c.text, fontWeight: 500, margin: "0 0 10px" }}>
            &ldquo;Some things are within our power, and some are not. Within our power are our own
            judgments and acts; outside it lies everything else.&rdquo;
          </p>
          <cite style={{ ...mono, fontSize: 12, color: c.faint, fontStyle: "normal" }}>
            — Epictetus, <span style={{ color: c.muted }}>Enchiridion</span> (rendered)
          </cite>
        </blockquote>

        {/* ── FIGURE: the control map ─────────────────────────── */}
        <figure style={{ margin: "0 0 40px" }}>
          <figcaption style={{ ...mono, fontSize: 11.5, color: c.faint, marginBottom: 12, letterSpacing: ".04em" }}>
            fig_02.1a &mdash; the_two_bins
          </figcaption>
          <div style={{ display: "flex", border: `1px solid ${c.line}`, borderRadius: 12, overflow: "hidden", background: c.panel }}>
            {[
              { k: "up_to_me", col: c.teal, fog: c.tealFog, items: ["judgment", "impulse", "desire", "aversion", "— our own acts"] },
              { k: "not_up_to_me", col: c.amber, fog: c.amberFog, items: ["the body", "property", "reputation", "outcomes", "— everything else"] },
            ].map((side, i) => (
              <div key={side.k} style={{ flex: 1, padding: "18px 16px 20px", background: side.fog, borderLeft: i === 1 ? `1px solid ${c.line}` : "none" }}>
                <div style={{ ...mono, fontSize: 12, color: side.col, marginBottom: 12, fontWeight: 500 }}>{side.k}</div>
                {side.items.map((it) => (
                  <div key={it} style={{ ...mono, fontSize: 12.5, color: it.startsWith("—") ? c.faint : c.muted, lineHeight: 2.0 }}>{it}</div>
                ))}
              </div>
            ))}
          </div>
        </figure>

        {/* ── WIDGET: the sorter ──────────────────────────────── */}
        <section style={{ border: `1px solid ${c.line2}`, borderRadius: 14, background: c.panel2, overflow: "hidden", marginBottom: 40 }}>
          <header style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${c.line}`, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <div>
              <div style={{ ...mono, fontSize: 11.5, color: c.tealDim, marginBottom: 4, letterSpacing: ".04em" }}>widget_02.1 &middot; sort_it</div>
              <div style={{ fontSize: 14.5, fontWeight: 500 }}>Which bin does each one belong in?</div>
            </div>
            <div style={{ ...mono, fontSize: 11.5, color: c.faint, whiteSpace: "nowrap" }}>{sorted}/{ITEMS.length}</div>
          </header>

          <div style={{ padding: "14px 14px 4px" }}>
            {ITEMS.map((it) => {
              const sel = pick[it.id];
              const right = sel && sel === eff(it.answer);
              const isFirst = it.answer === "first";
              const borderCol = shown && sel ? (right ? c.tealEdge : c.amberEdge) : c.line;
              return (
                <div key={it.id} style={{ border: `1px solid ${borderCol}`, borderRadius: 11, padding: "13px 13px 12px", marginBottom: 12, background: c.panel }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                    <p style={{ fontSize: 14.5, lineHeight: 1.5, margin: 0, color: c.text }}>{it.text}</p>
                    {shown && sel && (
                      <span style={{ flexShrink: 0, marginTop: 1 }}>
                        {right
                          ? <Check size={16} color={c.teal} strokeWidth={2.5} />
                          : <X size={16} color={c.amber} strokeWidth={2.5} />}
                      </span>
                    )}
                  </div>

                  {/* segmented control */}
                  <div style={{ display: "flex", gap: 8, marginTop: 11 }}>
                    {[
                      { v: "mine", label: "up to me", col: c.teal, edge: c.tealEdge, fog: c.tealFog },
                      { v: "not",  label: "not up to me", col: c.amber, edge: c.amberEdge, fog: c.amberFog },
                    ].map((opt) => {
                      const active = sel === opt.v;
                      return (
                        <button
                          key={opt.v}
                          className="seg"
                          onClick={() => assign(it.id, opt.v)}
                          disabled={shown}
                          style={{
                            ...mono, flex: 1, cursor: shown ? "default" : "pointer",
                            fontSize: 12, padding: "9px 8px", borderRadius: 8,
                            border: `1px solid ${active ? opt.edge : c.line}`,
                            background: active ? opt.fog : "transparent",
                            color: active ? opt.col : c.faint,
                            transition: "all .14s ease",
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* reveal note */}
                  {shown && (
                    <div style={{ marginTop: 11, paddingTop: 11, borderTop: `1px solid ${c.line}` }}>
                      {isFirst && (
                        <span style={{ ...mono, fontSize: 10.5, color: c.teal, border: `1px solid ${c.tealEdge}`, borderRadius: 5, padding: "2px 6px", marginRight: 8 }}>
                          first_movement
                        </span>
                      )}
                      <span style={{ fontSize: 13, lineHeight: 1.55, color: c.muted }}>{it.note}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* widget footer */}
          <div style={{ padding: "10px 14px 16px", display: "flex", gap: 10, alignItems: "center" }}>
            {!shown ? (
              <button
                onClick={() => setShown(true)}
                style={{ ...mono, fontSize: 12.5, cursor: "pointer", padding: "10px 16px", borderRadius: 9, border: `1px solid ${c.tealEdge}`, background: c.tealFog, color: c.teal, fontWeight: 500 }}
              >
                check against the Stoics &rarr;
              </button>
            ) : (
              <button
                onClick={reset}
                style={{ ...mono, fontSize: 12.5, cursor: "pointer", padding: "10px 14px", borderRadius: 9, border: `1px solid ${c.line2}`, background: "transparent", color: c.muted, display: "inline-flex", alignItems: "center", gap: 7 }}
              >
                <RotateCcw size={13} /> sort again
              </button>
            )}
            {shown && sorted > 0 && (
              <span style={{ ...mono, fontSize: 12, color: c.faint }}>{correct}/{sorted} matched</span>
            )}
          </div>

          {/* the teaching payoff */}
          {shown && (
            <div style={{ padding: "16px 18px 20px", borderTop: `1px solid ${c.line}`, background: c.tealFog }}>
              <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                <CornerDownRight size={15} color={c.teal} style={{ marginTop: 3, flexShrink: 0 }} />
                <p style={{ fontSize: 14, lineHeight: 1.66, color: c.text, margin: 0 }}>
                  Only {mineTotal} of {ITEMS.length} landed in <span style={{ color: c.teal }}>up_to_me</span> &mdash; and notice what they share.
                  Every one is a movement of your own mind: a judgment, an effort, a response, the story you tell.
                  Everything external fell to the right. Anxiety lives in the gap where we treat the right column as if it were the left.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* applied to anxiety */}
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 14px", letterSpacing: "-0.01em" }}>Why this loosens anxiety</h2>
        <p style={{ fontSize: 16, lineHeight: 1.72, color: c.muted, margin: "0 0 18px" }}>
          Worry is mostly rehearsal of the right-hand column &mdash; running outcomes that aren't yours to author.
          The dichotomy doesn't ask you to stop caring; it asks you to relocate your effort to the only place it
          can land. Prepare fully for the interview, then release the verdict. The relief isn't resignation. It's
          the quiet of putting down a weight you were never able to lift.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.72, color: c.muted, margin: "0 0 34px" }}>
          One honest seam, though: the jolt of fear itself sits in the right column. You can't decree it away.
          What you <em style={{ color: c.text, fontStyle: "italic" }}>can</em> work with is the second arrow &mdash; the
          story that follows. That's the doorway into the next traditions, where Buddhism, CBT, and IFS each pick
          up exactly where the Stoics set the parcel down.
        </p>

        {/* reflection — terminal motif */}
        <div style={{ border: `1px solid ${c.line2}`, borderRadius: 12, overflow: "hidden", marginBottom: 44 }}>
          <div style={{ ...mono, fontSize: 11.5, color: c.faint, padding: "10px 14px", borderBottom: `1px solid ${c.line}`, background: c.panel }}>
            ~/vault/anxiety/02.1 &middot; reflection.md
          </div>
          <div style={{ padding: "16px 14px 18px", background: c.bg }}>
            <div style={{ ...mono, fontSize: 13, color: c.teal, marginBottom: 10 }}>
              <span style={{ color: c.faint }}>&gt;</span> name one worry you've been gripping. which bin is it in?
              <span style={{ borderLeft: `7px solid ${c.teal}`, marginLeft: 4, animation: "blink 1.1s step-start infinite" }} />
            </div>
            <textarea
              rows={3}
              placeholder="type here…"
              style={{ ...mono, width: "100%", boxSizing: "border-box", resize: "vertical", background: c.panel, color: c.text, border: `1px solid ${c.line}`, borderRadius: 8, padding: "11px 12px", fontSize: 13, lineHeight: 1.6, outline: "none" }}
            />
          </div>
        </div>

        {/* chapter nav */}
        <nav style={{ display: "flex", justifyContent: "space-between", gap: 12, borderTop: `1px solid ${c.line}`, paddingTop: 22 }}>
          <span style={{ ...mono, fontSize: 12, color: c.faint, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
            <ArrowLeft size={13} /> 02.0 the_unbidden_jolt
          </span>
          <span style={{ ...mono, fontSize: 12, color: c.teal, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
            02.2 premeditatio_malorum <ArrowRight size={13} />
          </span>
        </nav>
      </article>
    </div>
  );
}
