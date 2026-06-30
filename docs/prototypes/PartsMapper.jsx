import { useState } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, CornerDownRight, Shield, Flame, Sparkles, Heart } from "lucide-react";

// ── design tokens ────────────────────────────────────────────────
const c = {
  bg: "#0a0a0b", panel: "#0f1012", panel2: "#141517",
  line: "rgba(255,255,255,0.08)", line2: "rgba(255,255,255,0.14)",
  text: "#e6e8ea", muted: "#9aa1a8", faint: "#5f666d",
  teal: "#2dd4bf", tealEdge: "rgba(45,212,191,0.42)", tealFog: "rgba(45,212,191,0.10)",
  amber: "#f0b429", amberEdge: "rgba(240,180,41,0.42)", amberFog: "rgba(240,180,41,0.10)",
  coral: "#fb7185", coralEdge: "rgba(251,113,133,0.42)", coralFog: "rgba(251,113,133,0.10)",
  violet: "#a78bfa", violetEdge: "rgba(167,139,250,0.45)", violetFog: "rgba(167,139,250,0.11)",
};
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace" };
const sans = { fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" };

const KIND = {
  self:        { col: c.teal,   fog: c.tealFog,   edge: c.tealEdge,   label: "Self",                  Icon: Sparkles },
  manager:     { col: c.amber,  fog: c.amberFog,  edge: c.amberEdge,  label: "manager · proactive",   Icon: Shield },
  firefighter: { col: c.coral,  fog: c.coralFog,  edge: c.coralEdge,  label: "firefighter · reactive", Icon: Flame },
  exile:       { col: c.violet, fog: c.violetFog, edge: c.violetEdge, label: "exile",                  Icon: Heart },
};

// ── the inner system ─────────────────────────────────────────────
const PARTS = {
  self: { id: "self", label: "Self", kind: "self", r: 30,
    cs: ["calm", "curiosity", "compassion", "clarity", "courage", "confidence", "connection", "creativity"] },
  sentinel: { id: "sentinel", label: "the_sentinel", kind: "manager", r: 23,
    role: "Hypervigilant scanner. Runs \u201cwhat-if\u201d loops to catch danger early.",
    voice: "I am anxious. If I stop watching, something will blindside us.",
    fear: "That a threat slips past and we\u2019re caught defenseless.",
    intent: "Keep you safe by seeing it coming.", protects: "unworthy" },
  taskmaster: { id: "taskmaster", label: "the_taskmaster", kind: "manager", r: 22,
    role: "Perfectionist striver. Never enough.",
    voice: "If the work isn\u2019t flawless, we\u2019ll be exposed.",
    fear: "That falling short proves we\u2019re not enough.",
    intent: "Earn safety and worth through achievement.", protects: "unworthy" },
  pleaser: { id: "pleaser", label: "the_pleaser", kind: "manager", r: 22,
    role: "Reads the room, manages everyone\u2019s approval.",
    voice: "Someone\u2019s upset with us \u2014 fix it, now.",
    fear: "That disconnection means abandonment.",
    intent: "Keep you safe by keeping you liked.", protects: "unworthy" },
  scroller: { id: "scroller", label: "the_scroller", kind: "firefighter", r: 22,
    role: "Reactive numb-out: scroll, snack, binge \u2014 anything but feel.",
    voice: "This is too much. Change the channel, fast.",
    fear: "That the exile\u2019s pain floods and drowns us.",
    intent: "Douse unbearable feeling the instant it breaks through.", protects: "unworthy" },
  unworthy: { id: "unworthy", label: "not_enough", kind: "exile", r: 20,
    role: "A young part carrying \u201cI\u2019m not enough \u2014 and they\u2019ll find out.\u201d",
    voice: "(quiet) I just don\u2019t want to be left behind.",
    fear: "Being seen as worthless, and cast out.",
    intent: "Holds the original wound the others organize around.", protects: null },
};
const PROTECTORS = ["sentinel", "taskmaster", "pleaser", "scroller"];

// portrait-friendly radial layout
const RING = {
  self: { x: 240, y: 252 }, sentinel: { x: 240, y: 96 }, taskmaster: { x: 392, y: 206 },
  pleaser: { x: 88, y: 206 }, scroller: { x: 360, y: 384 }, unworthy: { x: 188, y: 418 },
};
const BLEND_POS = { x: 240, y: 240 }; // sentinel pulled onto Self when blended

// ── explanatory figures ──────────────────────────────────────────
function Figure({ caption, sub, max = 360, children }) {
  return (
    <figure style={{ margin: "0 0 30px" }}>
      <figcaption style={{ ...mono, fontSize: 11.5, color: c.faint, marginBottom: 12, letterSpacing: ".04em" }}>{caption}</figcaption>
      <div style={{ border: `1px solid ${c.line}`, borderRadius: 12, background: c.panel, padding: "18px 14px" }}>
        <div style={{ maxWidth: max, margin: "0 auto" }}>{children}</div>
      </div>
      {sub && <div style={{ ...mono, fontSize: 11, color: c.faint, marginTop: 10, lineHeight: 1.55 }}>{sub}</div>}
    </figure>
  );
}

// fig a — the protective system as nested layers (structure)
function FigSystem() {
  return (
    <Figure caption="fig_05.2a \u2014 the_protective_system" max={320}
      sub="access runs outside-in: protectors are met before exiles, and exiles before the core.">
      <svg viewBox="0 0 360 300" style={{ width: "100%", height: "auto", display: "block" }}>
        <circle cx="180" cy="150" r="132" fill={c.amberFog} stroke={c.amber} strokeWidth="1.4" />
        <circle cx="180" cy="150" r="92" fill={c.violetFog} stroke={c.violet} strokeWidth="1.4" />
        <circle cx="180" cy="150" r="46" fill={c.tealFog} stroke={c.teal} strokeWidth="2" />
        <text x="180" y="37" textAnchor="middle" style={{ ...mono, fontSize: 13, fontWeight: 500, fill: c.amber }}>protectors</text>
        <text x="180" y="52" textAnchor="middle" style={{ ...mono, fontSize: 10, fill: c.faint }}>managers + firefighters</text>
        <text x="180" y="89" textAnchor="middle" style={{ ...mono, fontSize: 12.5, fontWeight: 500, fill: c.violet }}>exiles</text>
        <text x="180" y="104" textAnchor="middle" style={{ ...mono, fontSize: 10, fill: c.faint }}>young \u00b7 hold the burden</text>
        <text x="180" y="147" textAnchor="middle" style={{ ...mono, fontSize: 13.5, fontWeight: 600, fill: c.teal }}>Self</text>
        <text x="180" y="162" textAnchor="middle" style={{ ...mono, fontSize: 10, fill: c.faint }}>the calm core</text>
      </svg>
    </Figure>
  );
}

// fig b — proactive vs reactive along a timeline (mechanism)
function FigTiming() {
  return (
    <Figure caption="fig_05.2b \u2014 proactive vs reactive" max={460}
      sub="same goal \u2014 protect the exile \u2014 but the manager moves first, the firefighter cleans up.">
      <svg viewBox="0 0 480 188" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <marker id="arrowF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.faint} />
          </marker>
        </defs>
        <line x1="40" y1="128" x2="430" y2="128" stroke={c.faint} strokeWidth="1.4" markerEnd="url(#arrowF)" />
        <text x="438" y="132" style={{ ...mono, fontSize: 10, fill: c.faint }}>t</text>
        <line x1="196" y1="72" x2="196" y2="138" stroke={c.line2} strokeWidth="1" strokeDasharray="3 4" />
        <text x="196" y="156" textAnchor="middle" style={{ ...mono, fontSize: 11, fill: c.muted }}>trigger</text>
        <line x1="312" y1="72" x2="312" y2="138" stroke={c.violetEdge} strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="312" cy="128" r="4.5" fill={c.violet} />
        <text x="312" y="156" textAnchor="middle" style={{ ...mono, fontSize: 11, fill: c.violet }}>pain surfaces</text>
        <rect x="40" y="70" width="156" height="38" rx="8" fill={c.amberFog} stroke={c.amberEdge} strokeWidth="1" />
        <text x="118" y="86" textAnchor="middle" style={{ ...mono, fontSize: 12.5, fontWeight: 500, fill: c.amber }}>manager</text>
        <text x="118" y="100" textAnchor="middle" style={{ ...mono, fontSize: 10, fill: c.faint }}>acts before \u2192</text>
        <rect x="312" y="70" width="120" height="38" rx="8" fill={c.coralFog} stroke={c.coralEdge} strokeWidth="1" />
        <text x="372" y="86" textAnchor="middle" style={{ ...mono, fontSize: 12.5, fontWeight: 500, fill: c.coral }}>firefighter</text>
        <text x="372" y="100" textAnchor="middle" style={{ ...mono, fontSize: 10, fill: c.faint }}>\u2190 acts after</text>
        <text x="254" y="58" textAnchor="middle" style={{ ...mono, fontSize: 10, fill: c.faint }}>manager misses</text>
      </svg>
    </Figure>
  );
}

// fig c — the self-perpetuating protective loop (why anxiety persists)
function FigLoop() {
  const nodes = [
    { x: 240, y: 40, label: "exile pain", col: c.violet },
    { x: 360, y: 160, label: "protector fires", col: c.amber },
    { x: 240, y: 280, label: "buried, not healed", col: c.muted },
    { x: 120, y: 160, label: "burden persists", col: c.violet },
  ];
  const arcs = [
    "M 273.1 44.6 A 120 120 0 0 1 355.4 126.9",
    "M 355.4 193.1 A 120 120 0 0 1 273.1 275.4",
    "M 206.9 275.4 A 120 120 0 0 1 124.6 193.1",
    "M 124.6 126.9 A 120 120 0 0 1 206.9 44.6",
  ];
  return (
    <Figure caption="fig_05.2c \u2014 the_protective_loop" max={440}
      sub="the protector keeps the exile buried, so the burden never heals \u2014 and the protector can never rest.">
      <svg viewBox="0 0 480 320" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <marker id="arrowL" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={c.muted} />
          </marker>
        </defs>
        {arcs.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={c.muted} strokeOpacity="0.5" strokeWidth="1.5" markerEnd="url(#arrowL)" />
        ))}
        <text x="240" y="156" textAnchor="middle" style={{ ...mono, fontSize: 11, fill: c.faint }}>the_loop</text>
        <text x="240" y="171" textAnchor="middle" style={{ ...mono, fontSize: 10, fill: c.faint }}>anxiety keeps it running</text>
        {nodes.map((n, i) => (
          <g key={i}>
            <rect x={n.x - 66} y={n.y - 19} width="132" height="38" rx="9" fill={c.panel2} stroke={n.col} strokeWidth="1.4" strokeOpacity="0.7" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 500, fill: n.col }}>{n.label}</text>
          </g>
        ))}
        <line x1="92" y1="88" x2="150" y2="98" stroke={c.teal} strokeWidth="1" strokeOpacity="0.7" />
        <text x="84" y="72" textAnchor="middle" style={{ ...mono, fontSize: 10, fontWeight: 500, fill: c.teal }}>unblend +</text>
        <text x="84" y="85" textAnchor="middle" style={{ ...mono, fontSize: 10, fontWeight: 500, fill: c.teal }}>unburden</text>
      </svg>
    </Figure>
  );
}

export default function PartsMapper() {
  const [blended, setBlended] = useState(true); // start fused with the Sentinel
  const [sel, setSel] = useState("sentinel");

  const reset = () => { setBlended(true); setSel("sentinel"); };
  const unblend = () => { setBlended(false); setSel("self"); };
  const pos = (id) => (blended && id === "sentinel" ? BLEND_POS : RING[id]);

  return (
    <div style={{ ...sans, background: c.bg, color: c.text, minHeight: "100%" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');`}</style>
      <style>{`
        @keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        .selfpulse{animation:breathe 4.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        .node{cursor:pointer}
        .node:focus-visible{outline:none}
        .node:focus-visible circle{stroke-width:3}
        textarea::placeholder{color:${c.faint}}
        @media (prefers-reduced-motion: reduce){.selfpulse{animation:none}*{transition-duration:.01ms !important}}
      `}</style>

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "44px 22px 72px" }}>

        {/* eyebrow + title */}
        <div style={{ ...mono, fontSize: 12, letterSpacing: ".06em", color: c.teal, opacity: 0.7, marginBottom: 18 }}>
          part_02 &middot; the_inner_committee
        </div>
        <div style={{ ...mono, fontSize: 12.5, color: c.faint, marginBottom: 10 }}>
          <span style={{ color: c.teal }}>§ 05.2</span>  //  internal family systems
        </div>
        <h1 style={{ fontSize: 33, lineHeight: 1.12, fontWeight: 600, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          The Self and Its Parts
        </h1>
        <p style={{ ...mono, fontSize: 12, color: c.faint, margin: "0 0 30px" }}>
          internal_family_systems &mdash; no part is the enemy
        </p>

        {/* intro */}
        <p style={{ fontSize: 16.5, lineHeight: 1.72, color: c.muted, margin: "0 0 18px" }}>
          The Stoics handed you one ruling faculty. IFS hands you a crowd. The premise is that the mind
          is naturally <em style={{ color: c.text, fontStyle: "italic" }}>multiple</em> &mdash; a committee of
          sub-personalities, or <span style={{ color: c.text }}>parts</span> &mdash; and that this is normal,
          not damage. What feels like &ldquo;my anxiety&rdquo; is usually one part, doing a job, very loudly.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.72, color: c.muted, margin: "0 0 18px" }}>
          Underneath the committee sits the <span style={{ color: c.teal }}>Self</span> &mdash; not another
          part, but the calm seat you lead from when no part has taken the wheel. Around it, two kinds of
          protectors: <span style={{ color: c.amber }}>managers</span> who run the day to prevent pain, and{" "}
          <span style={{ color: c.coral }}>firefighters</span> who rush in to douse pain once it breaks
          through. Both are shielding a younger, wounded <span style={{ color: c.violet }}>exile</span>.
        </p>
        <FigSystem />

        <p style={{ fontSize: 16.5, lineHeight: 1.72, color: c.muted, margin: "0 0 30px" }}>
          Below, you start <span style={{ color: c.amber }}>blended</span> with one anxious manager &mdash;
          fused with it, so its view feels like the whole truth. The work is to step back.
        </p>

        {/* ── WIDGET: parts mapper ───────────────────────────── */}
        <section style={{ border: `1px solid ${c.line2}`, borderRadius: 14, background: c.panel2, overflow: "hidden", marginBottom: 40 }}>
          {/* header + legend */}
          <header style={{ padding: "15px 18px 13px", borderBottom: `1px solid ${c.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ ...mono, fontSize: 11.5, color: c.teal, opacity: 0.75, letterSpacing: ".04em" }}>widget_05.2 &middot; parts_map</div>
            <div style={{ display: "flex", gap: 13, flexWrap: "wrap" }}>
              {[["Self", c.teal], ["manager", c.amber], ["firefighter", c.coral], ["exile", c.violet]].map(([k, col]) => (
                <span key={k} style={{ ...mono, fontSize: 11, color: c.muted, display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: col, display: "inline-block" }} />{k}
                </span>
              ))}
            </div>
          </header>

          {/* the graph */}
          <div style={{ position: "relative", background: c.bg }}>
            {/* blended-lens tint */}
            <div style={{ position: "absolute", inset: 0, background: c.amber, opacity: blended ? 0.07 : 0, transition: "opacity .6s ease", pointerEvents: "none" }} />
            <div style={{ maxWidth: 460, margin: "0 auto" }}>
              <svg viewBox="0 0 480 524" style={{ width: "100%", height: "auto", display: "block" }}>
                <defs>
                  <radialGradient id="selfglow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={c.teal} stopOpacity="0.30" />
                    <stop offset="60%" stopColor={c.teal} stopOpacity="0.06" />
                    <stop offset="100%" stopColor={c.teal} stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Self glow */}
                <circle cx={RING.self.x} cy={RING.self.y} r="92" fill="url(#selfglow)"
                  style={{ opacity: blended ? 0.15 : 1, transition: "opacity .7s ease" }} />

                {/* edges: protects (protector -> exile) */}
                {PROTECTORS.map((p) => {
                  const a = RING[p], b = RING.unworthy;
                  const hot = sel === p;
                  const hidden = blended && p === "sentinel";
                  return (
                    <line key={"pr-" + p} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={hot ? c.violet : c.faint} strokeWidth={hot ? 1.6 : 1}
                      strokeDasharray="3 5"
                      style={{ opacity: hidden ? 0 : hot ? 0.65 : 0.22, transition: "opacity .5s ease, stroke .3s" }} />
                  );
                })}

                {/* edges: Self <-> protector */}
                {PROTECTORS.map((p) => {
                  const a = RING.self, b = RING[p];
                  const hidden = blended; // Self is obscured while blended
                  return (
                    <line key={"sl-" + p} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={c.teal} strokeWidth="1.4"
                      style={{ opacity: hidden ? 0.06 : 0.4, transition: "opacity .7s ease" }} />
                  );
                })}

                {/* exile node */}
                <Node id="unworthy" pos={pos("unworthy")} sel={sel} dim={blended} onSel={setSel} />

                {/* protector nodes */}
                {PROTECTORS.map((p) => (
                  <Node key={p} id={p} pos={pos(p)} sel={sel} dim={false} onSel={setSel} />
                ))}

                {/* Self node (scales in on unblend) */}
                <g className="node" tabIndex={0} role="button" aria-label="Self"
                  onClick={() => !blended && setSel("self")}
                  onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !blended) { e.preventDefault(); setSel("self"); } }}
                  style={{ transform: `translate(${RING.self.x}px,${RING.self.y}px) scale(${blended ? 0.42 : 1})`, transition: "transform .7s cubic-bezier(.34,1.2,.4,1)" }}>
                  <g className="selfpulse">
                    {sel === "self" && !blended && <circle r={PARTS.self.r + 9} fill="none" stroke={c.teal} strokeOpacity="0.35" strokeWidth="1" />}
                    <circle r={PARTS.self.r} fill={c.tealFog} stroke={c.teal} strokeWidth="2.2"
                      style={{ opacity: blended ? 0.4 : 1, transition: "opacity .6s" }} />
                    <text textAnchor="middle" dy="4.5" style={{ ...mono, fontSize: 13, fontWeight: 600, fill: c.teal, opacity: blended ? 0.4 : 1 }}>Self</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* inspector */}
          <Inspector blended={blended} sel={sel} onUnblend={unblend} />

          {/* footer */}
          <div style={{ padding: "12px 16px 16px", borderTop: `1px solid ${c.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <span style={{ ...mono, fontSize: 11.5, color: c.faint }}>
              {blended ? "state: blended" : "state: Self-led"}
            </span>
            <button onClick={reset}
              style={{ ...mono, fontSize: 12, cursor: "pointer", padding: "8px 12px", borderRadius: 8, border: `1px solid ${c.line2}`, background: "transparent", color: c.muted, display: "inline-flex", alignItems: "center", gap: 7 }}>
              <RotateCcw size={12} /> re-blend
            </button>
          </div>
        </section>

        {/* applied to anxiety */}
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 14px", letterSpacing: "-0.01em" }}>Why this loosens anxiety</h2>
        <p style={{ fontSize: 16, lineHeight: 1.72, color: c.muted, margin: "0 0 18px" }}>
          In this frame, chronic anxiety is rarely the core problem &mdash; it&apos;s an overworked manager
          doing overtime to keep a tender exile from being touched. Fighting the anxious part only adds a
          second part that hates the first. The shift is lateral: unblend, lead from Self, and turn toward the
          protector with curiosity instead of war. Ask what it&apos;s afraid would happen if it stopped. Its
          answer is almost always protective, and almost always old.
        </p>
        <FigTiming />

        <FigLoop />

        <p style={{ fontSize: 16, lineHeight: 1.72, color: c.muted, margin: "0 0 34px" }}>
          One honest boundary: the exile holds real wounds, and reaching it is approached last, slowly, and
          usually with a trained guide. This chapter maps the system and befriends the protectors &mdash; it is
          a map, not the territory of trauma work itself.
        </p>

        {/* reflection — terminal motif */}
        <div style={{ border: `1px solid ${c.line2}`, borderRadius: 12, overflow: "hidden", marginBottom: 44 }}>
          <div style={{ ...mono, fontSize: 11.5, color: c.faint, padding: "10px 14px", borderBottom: `1px solid ${c.line}`, background: c.panel }}>
            ~/vault/anxiety/05.2 &middot; reflection.md
          </div>
          <div style={{ padding: "16px 14px 18px", background: c.bg }}>
            <div style={{ ...mono, fontSize: 13, color: c.teal, marginBottom: 10 }}>
              <span style={{ color: c.faint }}>&gt;</span> which part spoke loudest today &mdash; and what might it be protecting?
            </div>
            <textarea rows={3} placeholder="type here…"
              style={{ ...mono, width: "100%", boxSizing: "border-box", resize: "vertical", background: c.panel, color: c.text, border: `1px solid ${c.line}`, borderRadius: 8, padding: "11px 12px", fontSize: 13, lineHeight: 1.6, outline: "none" }} />
          </div>
        </div>

        {/* chapter nav */}
        <nav style={{ display: "flex", justifyContent: "space-between", gap: 12, borderTop: `1px solid ${c.line}`, paddingTop: 22 }}>
          <span style={{ ...mono, fontSize: 12, color: c.faint, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
            <ArrowLeft size={13} /> 05.1 the_observing_self
          </span>
          <span style={{ ...mono, fontSize: 12, color: c.teal, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
            05.3 unburdening <ArrowRight size={13} />
          </span>
        </nav>
      </article>
    </div>
  );
}

// ── a graph node ─────────────────────────────────────────────────
function Node({ id, pos, sel, dim, onSel }) {
  const p = PARTS[id];
  const k = KIND[p.kind];
  const selected = sel === id;
  return (
    <g className="node" tabIndex={0} role="button" aria-label={p.label}
      onClick={() => onSel(id)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSel(id); } }}
      style={{ transform: `translate(${pos.x}px,${pos.y}px)`, transition: "transform .7s cubic-bezier(.34,1.1,.4,1)" }}>
      {selected && <circle r={p.r + 8} fill="none" stroke={k.col} strokeOpacity="0.35" strokeWidth="1" />}
      <circle r={p.r} fill={k.fog} stroke={k.col} strokeWidth={selected ? 2.4 : 1.8}
        style={{ opacity: dim ? 0.5 : 1, transition: "opacity .6s, stroke-width .25s" }} />
      <text textAnchor="middle" dy={p.r + 16} style={{ ...mono, fontSize: 11.5, fontWeight: 500, fill: selected ? k.col : c.muted, opacity: dim ? 0.55 : 1 }}>
        {p.label}
      </text>
    </g>
  );
}

// ── inspector panel ──────────────────────────────────────────────
function Chip({ children, col }) {
  return <span style={{ ...mono, fontSize: 10.5, color: col, border: `1px solid ${col}55`, borderRadius: 5, padding: "2px 7px" }}>{children}</span>;
}
function Field({ k, v, col }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ ...mono, fontSize: 10.5, color: col, opacity: 0.85, marginBottom: 3, letterSpacing: ".03em" }}>{k}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.5, color: c.text }}>{v}</div>
    </div>
  );
}

function Inspector({ blended, sel, onUnblend }) {
  // 1) blended state — fused with the Sentinel
  if (blended) {
    const p = PARTS.sentinel;
    return (
      <div style={{ padding: "18px 18px 20px", background: c.amberFog, borderTop: `1px solid ${c.line}` }}>
        <div style={{ marginBottom: 12 }}><Chip col={c.amber}>blended_with: the_sentinel</Chip></div>
        <p style={{ fontSize: 17, lineHeight: 1.5, color: c.text, fontWeight: 500, margin: "0 0 10px" }}>&ldquo;{p.voice}&rdquo;</p>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: c.muted, margin: "0 0 16px" }}>
          Right now the Sentinel&apos;s view feels like the whole truth &mdash; there&apos;s no daylight between
          you and it. You can&apos;t argue a part away. You make space, and lead from Self.
        </p>
        <button onClick={onUnblend}
          style={{ ...mono, fontSize: 13, cursor: "pointer", padding: "11px 16px", borderRadius: 9, border: `1px solid ${c.tealEdge}`, background: c.tealFog, color: c.teal, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8 }}>
          step back &middot; unblend <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  // 2) Self selected — you're leading
  if (sel === "self" || !sel) {
    return (
      <div style={{ padding: "18px 18px 20px", background: c.tealFog, borderTop: `1px solid ${c.line}` }}>
        <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <Sparkles size={14} color={c.teal} /><Chip col={c.teal}>Self &middot; you&apos;re leading</Chip>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {PARTS.self.cs.map((x) => (
            <span key={x} style={{ ...mono, fontSize: 11, color: c.teal, background: "rgba(45,212,191,0.07)", border: `1px solid ${c.tealEdge}`, borderRadius: 6, padding: "3px 8px" }}>{x}</span>
          ))}
        </div>
        <div style={{ ...mono, fontSize: 13, color: c.muted, marginBottom: 12 }}>
          <span style={{ color: c.faint }}>the thought shifts:</span><br />
          <span style={{ textDecoration: "line-through", opacity: 0.5 }}>I am anxious</span>
          <span style={{ color: c.teal }}>  →  a part of me feels anxious</span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: c.faint, margin: 0, display: "flex", gap: 8 }}>
          <CornerDownRight size={14} style={{ marginTop: 2, flexShrink: 0, color: c.teal }} />
          Tap any part to turn toward it with curiosity. Befriend protectors first &mdash; never the exile.
        </p>
      </div>
    );
  }

  // 3) a part selected
  const p = PARTS[sel];
  const k = KIND[p.kind];
  const isExile = p.kind === "exile";
  const Icon = k.Icon;
  return (
    <div style={{ padding: "18px 18px 20px", borderTop: `1px solid ${c.line}`, background: k.fog }}>
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <Icon size={14} color={k.col} /><Chip col={k.col}>{k.label}</Chip>
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: c.text, margin: "0 0 14px", fontWeight: 500 }}>{p.role}</p>
      <Field k="afraid_that" v={p.fear} col={k.col} />
      <Field k="positive_intent" v={p.intent} col={k.col} />
      {isExile ? (
        <p style={{ fontSize: 12.5, lineHeight: 1.6, color: c.faint, margin: "6px 0 0", borderTop: `1px solid ${c.line}`, paddingTop: 12 }}>
          Exiles hold the original wound. In real work they&apos;re reached last, slowly, and usually with a
          trained guide &mdash; protectors are befriended first.
        </p>
      ) : (
        <Field k="protects" v={<span style={{ color: c.violet }}>not_enough &nbsp;<span style={{ color: c.faint }}>(exile)</span></span>} col={k.col} />
      )}
    </div>
  );
}
