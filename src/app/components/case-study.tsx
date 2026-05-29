import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import type { Page } from "./nav";

/* ── Fonts & Keyframes ──────────────────────────────────────────────── */
const injectFonts = () => {
  if (document.querySelector("[data-sn-fonts]")) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Mono&display=swap";
  l.setAttribute("data-sn-fonts", "");
  document.head.appendChild(l);
};

const injectKeyframes = () => {
  if (document.querySelector("[data-sn-kf]")) return;
  const s = document.createElement("style");
  s.setAttribute("data-sn-kf", "");
  s.textContent = `
    @keyframes snFadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:none } }
    @keyframes snFadeIn   { from { opacity:0 } to { opacity:1 } }
    @keyframes snSlideLeft  { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:none } }
    @keyframes snSlideRight { from { opacity:0; transform:translateX(28px) }  to { opacity:1; transform:none } }
    @keyframes snScaleUp  { from { opacity:0; transform:scale(0.93) } to { opacity:1; transform:scale(1) } }
    .sn-btn-primary:hover { filter:brightness(1.1); transform:translateY(-1px); }
    .sn-btn-ghost:hover   { background:rgba(13,13,20,0.06)!important; transform:translateY(-1px); }
  `;
  document.head.appendChild(s);
};

/* ── Tokens ─────────────────────────────────────────────────────────── */
const SYNE    = "'Syne', sans-serif";
const INTER   = "'Inter', sans-serif";
const MONO    = "'Space Mono', monospace";
const DARK    = "#0D0D14";
const ACCENT  = "#3B47F0";
const LIGHT   = "#F7F7FB";
const LIGHT2  = "#EEEEF6";
const GRAY_BG = "#F0F0F6";
const MUTED   = "#5C5C6B";
const MUTED_D = "rgba(255,255,255,0.55)";

/* ── useInView ──────────────────────────────────────────────────────── */
function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

/* ── Reveal ─────────────────────────────────────────────────────────── */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  from?: "up" | "left" | "right" | "scale" | "fade";
  style?: CSSProperties;
}
function Reveal({ children, delay = 0, from = "up", style = {} }: RevealProps) {
  const [ref, v] = useInView();
  const anim =
    from === "left"  ? "snSlideLeft"
    : from === "right" ? "snSlideRight"
    : from === "scale" ? "snScaleUp"
    : from === "fade"  ? "snFadeIn"
    : "snFadeUp";
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        animation: v ? `${anim} 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms forwards` : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── SectionEyebrow ─────────────────────────────────────────────────── */
function Eyebrow({ num, label, right, dark = false }: { num: string; label: string; right: string; dark?: boolean }) {
  const dim  = dark ? "rgba(255,255,255,0.4)" : "#9898A8";
  const rule = dark ? "rgba(255,255,255,0.12)" : "#E2E2EC";
  return (
    <Reveal from="fade" style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
      <span style={{ fontFamily: MONO, fontSize: 12, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        {num} · {label}
      </span>
      <span style={{ flex: 1, height: 1, background: rule }} />
      <span style={{ fontFamily: MONO, fontSize: 12, color: dim, letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        {right}
      </span>
    </Reveal>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */
function HeroSection({ scrollY, setPage }: { scrollY: number; setPage: (p: Page) => void }) {
  return (
    <section style={{ background: DARK, position: "relative", overflow: "hidden" }}>
      {/* Parallax watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute", right: -40, bottom: -60,
          fontFamily: SYNE, fontWeight: 800, fontSize: 340,
          color: "rgba(59,71,240,0.08)", lineHeight: 1,
          letterSpacing: "-12px", pointerEvents: "none", userSelect: "none",
          transform: `translateY(${scrollY * 0.18}px)`,
          transition: "transform 0.05s linear",
        }}
      >
        SN
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 80px 80px", position: "relative" }}>
        <Reveal from="fade">
          <button
            onClick={() => setPage("home")}
            style={{ fontFamily: INTER, fontWeight: 500, fontSize: 14, color: ACCENT, background: "transparent", border: 0, cursor: "pointer", padding: 0 }}
          >
            ← Selected Work
          </button>
        </Reveal>

        <Reveal delay={150} from="fade" style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 48, marginBottom: 12 }}>
          <span style={{ fontFamily: MONO, fontSize: 12, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase" }}>Case Study · 01</span>
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
          <span style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>2024 · Personal Project</span>
        </Reveal>

        <Reveal delay={300} from="up">
          <h1 style={{ fontFamily: SYNE, fontWeight: 800, fontSize: "clamp(72px,9vw,130px)", lineHeight: 1, letterSpacing: "-4px", color: "white", marginTop: 16 }}>
            SafeNav.
          </h1>
        </Reveal>

        <Reveal delay={480} from="up">
          <p style={{ fontFamily: INTER, fontSize: 20, lineHeight: "32px", color: MUTED_D, marginTop: 20, maxWidth: 600 }}>
            Personalized travel planning system — reframed as a decision architecture, not a navigation app.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Overview Bar ────────────────────────────────────────────────────── */
function OverviewBar() {
  const meta = [
    { l: "Role",     v: "Solo Product Designer ( Intern )" },
    { l: "Timeline", v: "14 Weeks · 2024" },
    { l: "Focus",    v: "Workflow Systems" },
    { l: "Tools",    v: "Figma · FigJam · Notion" },
    { l: "Status",   v: "Shipped · Beta" },
  ];
  return (
    <section style={{ background: DARK, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
        {meta.map((m, i) => (
          <Reveal key={m.l} delay={i * 60} from="up">
            <div style={{ padding: "32px 24px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{m.l}</div>
              <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "white", marginTop: 10 }}>{m.v}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Thesis ──────────────────────────────────────────────────────────── */
function ThesisSection() {
  return (
    <section style={{ background: LIGHT, padding: "160px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        <Eyebrow num="01" label="Thesis" right="The Reframe" />
        <div style={{ marginTop: 56 }}>
          <Reveal delay={100} from="up">
            <h2 style={{ fontFamily: SYNE, fontWeight: 800, fontSize: "clamp(56px,6.5vw,88px)", lineHeight: 1.05, letterSpacing: "-3px", maxWidth: 1100 }}>
              <span style={{ color: DARK }}>SafeNav is </span>
              <span style={{ color: MUTED, fontStyle: "italic" }}>not a travel app.</span>
              <br />
              <span style={{ color: DARK }}>It&apos;s a </span>
              <span style={{ color: ACCENT }}>decision system</span>
              <span style={{ color: DARK }}> in a travel shape.</span>
            </h2>
          </Reveal>
          <Reveal delay={300} from="up">
            <p style={{ fontFamily: INTER, fontSize: 18, lineHeight: "30px", color: MUTED, maxWidth: 640, marginTop: 40 }}>
              Most travel tools assume the user knows what they want. The interesting product surface is the moment
              before that — when intent is fuzzy, options are noisy, and confidence is fragile. SafeNav was built
              around that surface.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Problem Framing ─────────────────────────────────────────────────── */
function ProblemSection() {
  return (
    <section style={{ background: LIGHT2, padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        <Eyebrow num="02" label="Problem Framing" right="What's actually broken" />
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 80, marginTop: 56, alignItems: "start" }}>
          <Reveal from="left" delay={100}>
            <h3 style={{ fontFamily: SYNE, fontWeight: 700, fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.15", letterSpacing: "-1px", color: DARK }}>
              The failure isn&apos;t navigation. It&apos;s{" "}
              <span style={{ color: ACCENT }}>coordination.</span>
            </h3>
          </Reveal>
          <Reveal from="right" delay={200}>
            <div>
              <p style={{ fontFamily: INTER, fontSize: 18, lineHeight: "32px", color: MUTED }}>
                Travelers planning multi-city trips juggle six tools to keep one plan alive. Each tool holds a
                fragment of the same decision — dates here, hotels there, a friend&apos;s suggestion in chat, a
                price comparison in a browser tab.
              </p>
              <p style={{ fontFamily: INTER, fontSize: 18, lineHeight: "32px", color: MUTED, marginTop: 20 }}>
                The interface problem is downstream of a system problem: nothing models the trip as a single object
                that can be reshaped, reversed, or reasoned about.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Behavioral Insights ─────────────────────────────────────────────── */
function InsightsSection() {
  const insights = [
    { n: "01", s: "\"People don't struggle with navigation. They struggle with coordination.\"",      b: "The friction is keeping six tools in sync — not finding the next screen." },
    { n: "02", s: "\"Plans break the moment reality moves. The system has no model for change.\"",    b: "Reversibility wasn't a feature — it was the missing primitive." },
    { n: "03", s: "\"Confidence collapses when trade-offs are hidden. More choice doesn't help.\"",  b: "Users wanted a system that summarized, not one that expanded options." },
  ];
  return (
    <section style={{ background: LIGHT, padding: "140px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        <Eyebrow num="03" label="Behavioral Insights" right="12 interviews · 30-day diary study" />
        <div style={{ marginTop: 72, borderTop: "1px solid #E2E2EC" }}>
          {insights.map((ins, i) => (
            <Reveal key={ins.n} delay={i * 80} from="up">
              <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 360px", gap: 48, alignItems: "center", padding: "56px 0", borderBottom: "1px solid #E2E2EC" }}>
                <span style={{ fontFamily: MONO, fontSize: 11, color: ACCENT, letterSpacing: "0.22em" }}>INSIGHT · {ins.n}</span>
                <p style={{ fontFamily: SYNE, fontWeight: 600, fontStyle: "italic", fontSize: "clamp(22px,2.4vw,32px)", lineHeight: "1.25", letterSpacing: "-0.5px", color: DARK }}>
                  {ins.s}
                </p>
                <p style={{ fontFamily: INTER, fontSize: 15, lineHeight: "24px", color: MUTED }}>{ins.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Workflow Diagram ────────────────────────────────────────────────── */
function WorkflowDiagram() {
  const [ref, v] = useInView(0.3);
  const states = ["Intent", "Frame", "Compose", "Reconcile", "Commit"];
  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Decision Flow · §1</span>
        <span style={{ fontFamily: MONO, fontSize: 9, color: "rgba(199,204,253,0.5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Live Schema</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
        {states.map((s, i) => (
          <div key={s} style={{
            opacity: v ? 1 : 0,
            transform: v ? "none" : "translateY(14px)",
            transition: `opacity 0.5s ease ${200 + i * 100}ms, transform 0.5s ease ${200 + i * 100}ms`,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{ flex: 1, textAlign: "center", padding: "14px 8px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, background: i === 2 ? "rgba(59,71,240,0.2)" : "transparent" }}>
              <div style={{ fontFamily: MONO, fontSize: 9, color: i === 2 ? "#C7CCFD" : "rgba(255,255,255,0.4)", letterSpacing: "0.16em" }}>0{i + 1}</div>
              <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 14, color: "white", marginTop: 6 }}>{s}</div>
            </div>
            {i < 4 && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>→</span>}
          </div>
        ))}
      </div>

      {/* Animated reversible arcs */}
      <svg viewBox="0 0 600 60" style={{ width: "100%", height: 60, marginTop: 12 }} preserveAspectRatio="none">
        <path d="M 148 4 Q 238 56 328 4" stroke={ACCENT} strokeWidth="1.5" fill="none"
          strokeDasharray="300" strokeDashoffset={v ? 0 : 300}
          style={{ transition: "stroke-dashoffset 1s ease 700ms" }} />
        <path d="M 328 4 Q 398 56 468 4" stroke={ACCENT} strokeWidth="1.5" fill="none"
          strokeDasharray="300" strokeDashoffset={v ? 0 : 300}
          style={{ transition: "stroke-dashoffset 1s ease 900ms" }} />
        <text x="238" y="53" fontFamily="Space Mono" fontSize="9" fill="#C7CCFD" textAnchor="middle" letterSpacing="2"
          opacity={v ? 1 : 0} style={{ transition: "opacity 0.5s ease 1400ms" }}>↺ REVERSIBLE</text>
        <text x="398" y="53" fontFamily="Space Mono" fontSize="9" fill="#C7CCFD" textAnchor="middle" letterSpacing="2"
          opacity={v ? 1 : 0} style={{ transition: "opacity 0.5s ease 1600ms" }}>↺ REVERSIBLE</text>
      </svg>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px dashed rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: MONO, fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>AI touchpoints</span>
        <span style={{ fontFamily: MONO, fontSize: 9, color: "#C7CCFD", letterSpacing: "0.18em", textTransform: "uppercase" }}>02 · Frame  ·  04 · Reconcile</span>
      </div>
    </div>
  );
}

/* ── System Architecture ─────────────────────────────────────────────── */
function ArchitectureSection() {
  return (
    <section style={{ background: DARK, padding: "140px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        <Eyebrow num="04" label="System Architecture" right="Partial view · §1 of 3" dark />
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 80, marginTop: 72, alignItems: "start" }}>
          <Reveal from="left" delay={100}>
            <h3 style={{ fontFamily: SYNE, fontWeight: 700, fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.15", letterSpacing: "-1px", color: "white" }}>
              Five states.<br />Two reversible loops.<br />One <span style={{ color: ACCENT }}>AI surface.</span>
            </h3>
            <p style={{ fontFamily: INTER, fontSize: 15, lineHeight: "26px", color: MUTED_D, marginTop: 28 }}>
              The full architecture covers the object model, AI prompts, and state machine. This is the
              public-facing slice — the decision flow.
            </p>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(199,204,253,0.45)", letterSpacing: "0.22em", textTransform: "uppercase" }}>+ Object model · Withheld</div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(199,204,253,0.45)", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6 }}>+ AI prompt graph · Withheld</div>
            </div>
          </Reveal>
          <Reveal from="right" delay={200}>
            <WorkflowDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Phone Mockups ───────────────────────────────────────────────────── */
type PhoneVariant = "login" | "splash" | "onboard";
interface PhoneProps { variant: PhoneVariant; delay: number; visible: boolean; }

function PhoneMockup({ variant, delay, visible }: PhoneProps) {
  const base: CSSProperties = {
    width: 220, flexShrink: 0,
    borderRadius: 36, overflow: "hidden",
    boxShadow: "8px 11px 56px -4px rgba(0,0,0,0.22)",
    outline: "5px solid #E8E8E8",
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(28px) scale(0.96)",
    transition: `opacity 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    position: "relative",
  };

  if (variant === "login") return (
    <div style={{ ...base, height: 480, background: "#0a1628", alignSelf: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0a1628 0%,#1a2a4a 60%,#2a3a5a 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "white", borderRadius: "28px 28px 0 0", padding: "24px 18px 28px" }}>
        <div style={{ fontFamily: INTER, fontSize: 15, fontWeight: 600, color: DARK, marginBottom: 16, textAlign: "center" }}>Welcome back</div>
        {["Email", "Password"].map((f) => (
          <div key={f} style={{ border: "1px solid #E5E7EB", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, fontFamily: INTER, color: "#6B7280" }}>
            <div style={{ fontSize: 9, color: "#9CA3AF", marginBottom: 2 }}>{f}</div>
            {f === "Email" ? "userexample@gmail.com" : "••••••••"}
          </div>
        ))}
        <div style={{ textAlign: "right", fontSize: 9, color: "#3B82F6", fontFamily: INTER, marginBottom: 14 }}>Forgot Password?</div>
        <div style={{ background: ACCENT, color: "white", borderRadius: 12, padding: "11px 0", textAlign: "center", fontSize: 12, fontFamily: INTER, fontWeight: 600, marginBottom: 12 }}>
          Continue with email
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
          <span style={{ fontSize: 9, color: "#9CA3AF", fontFamily: INTER }}>Or</span>
          <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {["G", "f", "in"].map((s) => (
            <div key={s} style={{ width: 36, height: 36, border: "1px solid #E5E7EB", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: INTER, color: "#374151" }}>{s}</div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 9, color: "#9CA3AF", fontFamily: INTER, marginTop: 10 }}>
          Don&apos;t have an account? <span style={{ color: DARK }}>Sign Up</span>
        </div>
      </div>
    </div>
  );

  if (variant === "splash") return (
    <div style={{ ...base, height: 490, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 56, height: 56, background: "white", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: ACCENT }} />
        </div>
        <div style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 22, color: "white", letterSpacing: "-0.5px" }}>SafeNav</div>
      </div>
    </div>
  );

  return (
    <div style={{ ...base, height: 480, background: "#1a3a2a", alignSelf: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#1a3a2a 0%,#2d5a3a 40%,#1a4a30 100%)" }} />
      <div style={{ position: "absolute", bottom: 24, left: 12, right: 12, background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", borderRadius: 24, padding: "16px 14px" }}>
        <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: 16, color: "#1a2a1a", marginBottom: 6 }}>Plan with confidence</div>
        <div style={{ fontFamily: INTER, fontSize: 11, color: "#2d3d2d", lineHeight: 1.5, marginBottom: 14 }}>
          We help you structure your trips clearly, so you always know what&apos;s ahead.
        </div>
        <div style={{ background: ACCENT, borderRadius: 50, padding: "9px 0", textAlign: "center", fontSize: 12, fontFamily: INTER, fontWeight: 600, color: "white" }}>Continue</div>
      </div>
    </div>
  );
}

/* ── Product Preview ─────────────────────────────────────────────────── */
function ProductPreviewSection() {
  const [ref, v] = useInView(0.15);
  return (
    <section style={{ background: GRAY_BG, padding: "140px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        <Eyebrow num="05" label="Product Preview" right="Final UI · destinations view" />
        <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 80, marginTop: 64 }}>
          <div style={{
            flexShrink: 0, width: 480,
            opacity: v ? 1 : 0, transform: v ? "none" : "translateX(-28px)",
            transition: "opacity 0.75s cubic-bezier(.16,1,.3,1) 100ms, transform 0.75s cubic-bezier(.16,1,.3,1) 100ms",
          }}>
            <h2 style={{ fontFamily: SYNE, fontWeight: 800, fontSize: "clamp(52px,5.5vw,72px)", lineHeight: 1.05, letterSpacing: "-2px", color: DARK }}>Final UI</h2>
            <p style={{ fontFamily: INTER, fontSize: 17, lineHeight: "30px", color: MUTED, marginTop: 12, maxWidth: 480 }}>
              The final interface was designed around clarity, structured navigation, and editable workflows to
              reduce cognitive overload during travel planning.
            </p>
            <button
  className="sn-btn-primary"
   onClick={() =>
    window.open(
      "https://www.figma.com/community/file/1642265228135381361",
      "_blank"
    )
  }
  onMouseEnter={(e) => {
    const fill = e.currentTarget.querySelector(
      ".btn-fill"
    ) as HTMLSpanElement;

    const text = e.currentTarget.querySelector(
      ".btn-text"
    ) as HTMLSpanElement;

    fill.style.transform = "scaleX(1)";
    text.style.fontSize = "17px";

    e.currentTarget.style.color = "#FFFFFF";
    e.currentTarget.style.transform = "scale(1)";
  }}
  onMouseLeave={(e) => {
    const fill = e.currentTarget.querySelector(
      ".btn-fill"
    ) as HTMLSpanElement;

    const text = e.currentTarget.querySelector(
      ".btn-text"
    ) as HTMLSpanElement;

    fill.style.transform = "scaleX(0)";
    text.style.fontSize = "16px";

    e.currentTarget.style.color = ACCENT;
    e.currentTarget.style.transform = "scale(0.97)";
  }}
  style={{
    position: "relative",
    overflow: "hidden",

    marginTop: 40,

    padding: "14px 40px",

    background: "#FFFFFF",

    color: ACCENT,

    border: 0,
    borderRadius: 16,

    fontFamily: INTER,
    fontWeight: 600,
    fontSize: 16,

    cursor: "pointer",

    transform: "scale(0.97)",

    transition:
      "color 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
  }}
>
  <span
    className="btn-fill"
    style={{
      position: "absolute",
      inset: 0,

      background: ACCENT,

      transform: "scaleX(0)",
      transformOrigin: "left center",

      transition:
        "transform 350ms cubic-bezier(0.22,1,0.36,1)",

      zIndex: 0,
    }}
  />

  <span
    className="btn-text"
    style={{
      position: "relative",
      zIndex: 1,

      display: "inline-block",

      fontSize: "16px",

      transition:
        "font-size 300ms cubic-bezier(0.22,1,0.36,1)",
    }}
  >
    See screens →
  </span>
</button>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flex: 1 }}>
            <PhoneMockup variant="login"  delay={200} visible={v} />
            <PhoneMockup variant="splash" delay={350} visible={v} />
            <PhoneMockup variant="onboard" delay={500} visible={v} />
          </div>
        </div>
        <Reveal from="fade" delay={200}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, fontFamily: MONO, fontSize: 11, color: MUTED, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span>Fig. 01 — Destinations · Trip Object</span>
            <span>1 of 14 frames</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Key Decisions ───────────────────────────────────────────────────── */
function DecisionsSection() {
  const decisions = [
    { t: "Trip as a single object, not a list",      b: "Every screen reads from one model. Adding a new view never re-shapes the data." },
    { t: "Reversibility as a primitive",             b: "Plans are reshapeable, not commitments. No 'undo' button — the whole system is undoable." },
    { t: "AI summarizes, never decides",             b: "AI compresses trade-offs into a confidence score. The user keeps the decision." },
    { t: "Active state on the row, not the button",  b: "Users read where they are, not where they could click. Reduces visual noise by ~30%." },
  ];
  return (
    <section style={{ background: LIGHT, padding: "140px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        <Eyebrow num="06" label="Key Decisions" right="What we built · what we cut" />
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
          {decisions.map((d, i) => (
            <Reveal key={i} delay={i * 90} from="up">
              <div style={{ borderTop: "1px solid #E2E2EC", padding: "36px 0" }}>
                <span style={{ fontFamily: MONO, fontSize: 11, color: ACCENT, letterSpacing: "0.18em" }}>DECISION · {String(i + 1).padStart(2, "0")}</span>
                <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: "clamp(20px,2vw,26px)", color: DARK, letterSpacing: "-0.5px", marginTop: 14 }}>{d.t}</div>
                <p style={{ fontFamily: INTER, fontSize: 15, lineHeight: "25px", color: MUTED, marginTop: 10 }}>{d.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Outcomes ────────────────────────────────────────────────────────── */
function OutcomesSection() {
  const outcomes = [
    { t: "Clarity over features.",  b: "Beta testers cut planning time by 38%. We removed three views and added none." },
    { t: "Systems save rework.",    b: "One data model meant one design pattern. Adding 'Guides' took two days, not two weeks." },
    { t: "Control builds trust.",   b: "Self-reported confidence jumped 4.1 → 8.7. Reversibility was the highest-rated feature." },
  ];
  return (
    <section style={{ background: DARK, padding: "140px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
        <Eyebrow num="07" label="Outcome & Learnings" right="Final" dark />
        <div style={{ marginTop: 56 }}>
          {outcomes.map((o, i) => (
            <Reveal key={i} delay={i * 100} from="up">
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "44px 0" }}>
                <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: "clamp(32px,3.5vw,48px)", color: "white", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
                  <span style={{ color: ACCENT, marginRight: 20 }}>0{i + 1}</span>
                  {o.t}
                </div>
                <p style={{ fontFamily: INTER, fontSize: 17, lineHeight: "28px", color: "rgba(255,255,255,0.55)", marginTop: 14, maxWidth: 720 }}>{o.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Band ────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section style={{ background: "#ECEFFE", padding: "140px 0" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        <Reveal from="fade">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: ACCENT,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Continue · The Deeper Layer
          </span>
        </Reveal>

        <Reveal delay={120} from="up">
          <h2
            style={{
              fontFamily: SYNE,
              fontWeight: 800,
              fontSize: "clamp(48px,6vw,80px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: DARK,
              marginTop: 24,
              maxWidth: 960,
              margin: "24px auto 0",
            }}
          >
            Explore the complete{" "}
            <span style={{ color: ACCENT }}>
              system architecture
            </span>.
          </h2>
        </Reveal>

        <Reveal delay={240} from="up">
          <p
            style={{
              fontFamily: INTER,
              fontSize: 17,
              lineHeight: "28px",
              color: MUTED,
              marginTop: 24,
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Object model, AI prompt graph, full state machine,
            and 14 product frames — available in the long-form
            case study.
          </p>
        </Reveal>

        <Reveal delay={360} from="up" style={{ marginTop: 48 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {/* Full Case Study */}
            <button
  className="sn-btn-primary"
  onClick={() =>
    window.open(
      "https://www.notion.so/SafeNav-AI-Travel-Planner-with-Safety-Intelligence-31639383f20180e0bddac2ffb5efccad?source=copy_link",
      "_blank"
    )
  }
  onMouseEnter={(e) => {
    const fill = e.currentTarget.querySelector(
      ".btn-fill"
    ) as HTMLSpanElement;

    const text = e.currentTarget.querySelector(
      ".btn-text"
    ) as HTMLSpanElement;

    fill.style.transform = "scaleX(1)";
    text.style.fontSize = "17px";

    e.currentTarget.style.color = "#FFFFFF";
    e.currentTarget.style.transform = "scale(1)";
  }}
  onMouseLeave={(e) => {
    const fill = e.currentTarget.querySelector(
      ".btn-fill"
    ) as HTMLSpanElement;

    const text = e.currentTarget.querySelector(
      ".btn-text"
    ) as HTMLSpanElement;

    fill.style.transform = "scaleX(0)";
    text.style.fontSize = "16px";

    e.currentTarget.style.color = ACCENT;
    e.currentTarget.style.transform = "scale(0.97)";
  }}
  style={{
    position: "relative",
    overflow: "hidden",

    height: 56,
    padding: "0 32px",

    background: "#FFFFFF",

    color: ACCENT,

    border: 0,
    borderRadius: 10,

    fontFamily: INTER,
    fontWeight: 600,
    fontSize: 16,

    cursor: "pointer",

    transform: "scale(0.97)",

    transition:
      "color 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
  }}
>
  <span
    className="btn-fill"
    style={{
      position: "absolute",
      inset: 0,

      background: ACCENT,

      transform: "scaleX(0)",
      transformOrigin: "left center",

      transition:
        "transform 350ms cubic-bezier(0.22,1,0.36,1)",

      zIndex: 0,
    }}
  />

  <span
    className="btn-text"
    style={{
      position: "relative",
      zIndex: 1,
      display: "inline-block",
      fontSize: "16px",
      transition:
        "font-size 300ms cubic-bezier(0.22,1,0.36,1)",
    }}
  >
    Research + PRD document →
  </span>
</button>

          <button
  className="sn-btn-ghost"
  onClick={() =>
    window.open(
      "https://www.behance.net/srujans",
      "_blank"
    )
  }
  onMouseEnter={(e) => {
    const fill = e.currentTarget.querySelector(
      ".btn-fill"
    ) as HTMLSpanElement;

    fill.style.transform = "scaleX(1)";

    e.currentTarget.style.color = "#3B47F0";
    e.currentTarget.style.borderColor = "#FFFFFF";
    e.currentTarget.style.transform = "scale(1.03)";
  }}
  onMouseLeave={(e) => {
    const fill = e.currentTarget.querySelector(
      ".btn-fill"
    ) as HTMLSpanElement;

    fill.style.transform = "scaleX(0)";

    e.currentTarget.style.color = DARK;
    e.currentTarget.style.borderColor = DARK;
    e.currentTarget.style.transform = "scale(1)";
  }}
  style={{
    position: "relative",
    overflow: "hidden",

    height: 56,
    padding: "0 28px",

    background: "transparent",
    color: DARK,

    border: `1px solid ${DARK}`,
    borderRadius: 10,

    fontFamily: INTER,
    fontWeight: 600,
    fontSize: 16,

    cursor: "pointer",

    transform: "scale(1)",
    transformOrigin: "center center",

    transition:
      "color 300ms ease, border-color 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
  }}
>
  {/* Blue Fill Layer */}
  <span
    className="btn-fill"
    style={{
      position: "absolute",
      inset: 0,
      background: "#FFFFFF",

      transform: "scaleX(0)",
      transformOrigin: "left center",

      transition:
        "transform 400ms cubic-bezier(0.22,1,0.36,1)",

      zIndex: 0,
    }}
  />

  {/* Text */}
  <span
    style={{
      position: "relative",
      zIndex: 1,
    }}
  >
    Behance Case Study
  </span>
</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FooterNav({ setPage }: { setPage: (p: Page) => void }) {
  const [backHover, setBackHover] = useState(false);
  const [contactHover, setContactHover] = useState(false);

  return (
    <section
      style={{
        padding: "60px 0",
        background: LIGHT,
        borderTop: "1px solid #E2E2EC",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Back to Work */}
        <button
          onClick={() => setPage("home")}
          onMouseEnter={() => setBackHover(true)}
          onMouseLeave={() => setBackHover(false)}
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 15,
            color: backHover ? ACCENT : "#5C5C6B",
            background: "transparent",
            border: 0,
            cursor: "pointer",
            padding: 0,

            display: "flex",
            alignItems: "center",
            gap: 6,

            transform: backHover ? "scale(1.03)" : "scale(1)",
            transformOrigin: "center center",

            transition:
              "color 250ms ease, transform 250ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: backHover
                ? "translateX(-4px)"
                : "translateX(0)",
              transition: "transform 250ms ease",
            }}
          >
            ←
          </span>

          <span>Back to Work</span>
        </button>

        {/* Center Label */}
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            color: "#9898A8",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          End of Public Preview
        </span>

        {/* Get in Touch */}
        <button
          onClick={() => setPage("contact")}
          onMouseEnter={() => setContactHover(true)}
          onMouseLeave={() => setContactHover(false)}
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 15,
            color: contactHover ? ACCENT : "#5C5C6B",
            background: "transparent",
            border: 0,
            cursor: "pointer",
            padding: 0,

            display: "flex",
            alignItems: "center",
            gap: 6,

            transform: contactHover ? "scale(1.03)" : "scale(1)",
            transformOrigin: "center center",

            transition:
              "color 250ms ease, transform 250ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span>Get in Touch</span>

          <span
            style={{
              display: "inline-block",
              transform: contactHover
                ? "translateX(4px)"
                : "translateX(0)",
              transition: "transform 250ms ease",
            }}
          >
            →
          </span>
        </button>
      </div>
    </section>
  );
}

/* ── CaseStudy (named export) ────────────────────────────────────────── */
export function CaseStudy({ setPage }: { setPage: (p: Page) => void }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    injectFonts();
    injectKeyframes();
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ fontFamily: INTER, overflowX: "hidden" }}>
      <HeroSection scrollY={scrollY} setPage={setPage} />
      <OverviewBar />
      <ThesisSection />
      <ProblemSection />
      <InsightsSection />
      <ArchitectureSection />
      <ProductPreviewSection />
      <DecisionsSection />
      <OutcomesSection />
      <CTASection />
      <FooterNav setPage={setPage} />
    </div>
  );
}
