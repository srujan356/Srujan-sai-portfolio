import type { Page } from "./nav";
import { SYNE, INTER, MONO } from "./ui-bits";

export function About({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* SECTION 1 — Full blue statement */}
      <section style={{ background: "#3B47F0", position: "relative", overflow: "hidden", height: 520 }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: -40,
            bottom: -80,
            fontFamily: SYNE,
            fontWeight: 800,
            fontSize: 320,
            color: "rgba(255,255,255,0.06)",
            lineHeight: 1,
            letterSpacing: "-10px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          AR
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "160px 80px 0", position: "relative" }}>
          <h1 style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 80, lineHeight: 1, letterSpacing: "-2px" }}>
            <span style={{ display: "block", color: "white" }}>I design</span>
            <span style={{ display: "block", color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>the thinking.</span>
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 18, lineHeight: "30px", color: "rgba(255,255,255,0.7)", maxWidth: 560, marginTop: 32 }}>
            Product designer focused on workflow systems, AI-assisted reasoning, and structured decision experiences. I build for complex domains where clear thinking matters more than ornament.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Philosophy + Experience */}
      <section style={{ background: "#F7F7FB", padding: "120px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: "#9898A8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 32 }}>
              Philosophy
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { n: "01", t: "Workflow before wireframe", b: "I start by mapping how decisions actually get made — then build the screens around that." },
                { n: "02", t: "Clarity is a feature", b: "Reducing visual noise is product work, not polish. It changes how confidently people act." },
                { n: "03", t: "Systems over screens", b: "One coherent model beats fifty handcrafted views. Every time." },
              ].map((p) => (
                <div key={p.n} style={{ background: "white", border: "1px solid #E2E2EC", borderRadius: 16, padding: 32, position: "relative" }}>
                  <div style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 64, color: "rgba(59,71,240,0.2)", lineHeight: 1, letterSpacing: "-2px" }}>
                    {p.n}
                  </div>
                  <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 22, color: "#0D0D14", letterSpacing: "-0.5px", marginTop: 12 }}>
                    {p.t}
                  </div>
                  <p style={{ fontFamily: INTER, fontSize: 15, lineHeight: "24px", color: "#5C5C6B", marginTop: 8 }}>{p.b}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: "#9898A8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 32 }}>
              Experience
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ borderLeft: "2px solid #3B47F0", paddingLeft: 24 }}>
                <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 22, color: "#0D0D14", letterSpacing: "-0.5px" }}>Sure Trust</div>
                <div style={{ fontFamily: INTER, fontSize: 15, color: "#5C5C6B", marginTop: 4 }}>UI/UX Designer Intern</div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "#9898A8", letterSpacing: "0.08em", marginTop: 6 }}>July 2025 — January 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Categorized capabilities */}
      <section style={{ background: "#EEEEF6", padding: "120px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48 }}>
            <h2 style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 48, lineHeight: "52px", letterSpacing: "-1.5px", color: "#0D0D14" }}>
              Capabilities
            </h2>
            <span style={{ fontFamily: MONO, fontSize: 11, color: "#9898A8", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              Categorized · 07 areas
            </span>
          </div>
          <div style={{ borderTop: "1px solid #BBBBC8" }}>
                {[
  {
    cat: "Product Thinking",
    items: [
      "Problem framing",
      "Product strategy",
      "Feature prioritization",
      "Decision frameworks"
    ]
  },

  {
    cat: "Workflow Design",
    items: [
      "User flow mapping",
      "Journey design",
      "Process optimization",
      "Task organization"
    ]
  },

  {
    cat: "Systems Design",
    items: [
      "System architecture",
      "Workflow planning",
      "Process structures",
      "Scalable solutions"
    ]
  },

  {
    cat: "Research & Analysis",
    items: [
      "Quantitative analysis",
      "Qualitative research",
      "PRD documentation",
      "Data visualization"
    ]
  },

  {
    cat: "Information Architecture",
    items: [
      "Content hierarchy",
      "Navigation systems",
      "Taxonomy design",
      "User pathways"
    ]
  },

  {
    cat: "AI Product Systems",
    items: [
      "Human-AI workflows",
      "Decision support systems",
      "Prompt-driven experiences",
      "AI interaction patterns"
    ]
  }
            ].map((row, i) => (
              <div
                key={row.cat}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 280px 1fr",
                  alignItems: "baseline",
                  padding: "28px 0",
                  borderBottom: "1px solid #BBBBC8",
                  gap: 24,
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, color: "#3B47F0", letterSpacing: "0.12em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 24, color: "#0D0D14", letterSpacing: "-0.5px" }}>
                  {row.cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
                  {row.items.map((it) => (
                    <span key={it} style={{ fontFamily: INTER, fontSize: 14, color: "#5C5C6B" }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section style={{ background: "#0D0D14", padding: "120px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", textAlign: "center" }}>
          <h2 style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 64, lineHeight: 1.05, letterSpacing: "-2px" }}>
            <span style={{ display: "block", color: "white" }}>Let's build something</span>
            <span style={{ display: "block", color: "#3B47F0" }}>meaningful.</span>
          </h2>
          <button
  onClick={() => setPage("contact")}
  style={{
    position: "relative",
    overflow: "hidden",

    marginTop: 48,

    background: "#ECECF4",
    border: 0,

    padding: "0 40px",
    height: 56,

    borderRadius: 8,

    color: "#3B47F0",

    fontFamily: INTER,
    fontWeight: 600,
    fontSize: 16,

    cursor: "pointer",

    transform: "scale(0.97)",
    transition:
      "color 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
  }}
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

    e.currentTarget.style.color = "#3B47F0";
    e.currentTarget.style.transform = "scale(0.97)";
  }}
>
  <span
    className="btn-fill"
    style={{
      position: "absolute",
      inset: 0,
      background: "#3B47F0",

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
    Get in Touch →
  </span>
</button>
        </div>
      </section>
    </div>
  );
}
