import image_1000138017_1 from '@/imports/1000138017-1.png'
import image_1000138017 from '@/imports/1000138017.png'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Page } from "./nav";
import { PulseDot, MonoTag, Marquee, SYNE, INTER, MONO } from "./ui-bits";
import { SafeNavProductCard, SAFENAV_CARD_W, SAFENAV_CARD_H } from "./safenav-product-card";
import { motion } from "motion/react";

export function Home({ setPage }: { setPage: (p: Page) => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  const enter = (delay: number, offset = 24) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : `translateY(${offset}px)`,
    transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ position: "relative", minHeight: "calc(100vh - 64px)", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: -120,
            top: 40,
            fontFamily: SYNE,
            fontWeight: 800,
            fontSize: 400,
            color: "#EEEEF6",
            lineHeight: 0.9,
            letterSpacing: "-12px",
            pointerEvents: "none",
            userSelect: "none",
            ...enter(0, 0),
          }}
        >
          01
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
          <div style={{ paddingTop: 140, display: "flex", alignItems: "center", gap: 12, ...enter(100, 12) }}>
            <PulseDot />
            <span style={{ fontFamily: MONO, fontSize: 11, color: "#9898A8", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Available for work
            </span>
          </div>

          <h1 style={{ marginTop: 32, width: "min(1100px, 100%)" }}>
            <span style={{ display: "block", fontFamily: SYNE, fontWeight: 800, fontSize: 96, lineHeight: "92px", letterSpacing: "-3px", color: "#0D0D14", ...enter(150, 28) }}>Product Designer</span>
            <span style={{ display: "block", fontFamily: SYNE, fontWeight: 800, fontSize: 96, lineHeight: "92px", letterSpacing: "-3px", color: "#5C5C6B", fontStyle: "italic", ...enter(220, 36) }}>for complex</span>
            <span style={{ display: "block", fontFamily: SYNE, fontWeight: 800, fontSize: 96, lineHeight: "92px", letterSpacing: "-3px", color: "#3B47F0", ...enter(290, 44) }}>systems.</span>
          </h1>

          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "520px 320px", gap: 64, ...enter(380, 16) }}>
            <p style={{ fontFamily: INTER, fontSize: 18, lineHeight: "30px", color: "#5C5C6B" }}>I turn fragmented workflows and broken decision logic into products people trust. Systems thinking. Structured clarity. Human control.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <ArrowLink
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
>
  View Selected Work
</ArrowLink>

<ArrowLink
  onClick={() => setPage("contact")}
>
  Let's Connect
</ArrowLink>
            </div>
          </div>

          <div
            style={{
              marginTop: 72,
              paddingTop: 24,
              borderTop: "1px solid #E2E2EC",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 32px",
              ...enter(460, 12),
            }}
          >
            {[
              "System Thinking",
              "Workflow Design",
              "AI Product Design",
              "User Decision Flows",
              "Interaction Systems",
            ].map((t, i) => (
              <span
                key={t}
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#5C5C6B",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 10, color: "#3B47F0" }}>{String(i + 1).padStart(2, "0")}</span>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, ...enter(540, 8) }}>
          <Marquee text="Systems Thinking · Workflow Design · AI-Assisted Products · Decision Architecture · Interaction Systems · Structured Experiences · Figma" />
        </div>
      </section>

      {/* INTRODUCTION — arc-bracketed panel */}
      <section style={{ position: "relative", padding: "60px 0" }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 80 }}
          aria-hidden
        >
          <path d="M 0 0 Q 720 100 1440 0 L 1440 80 L 0 80 Z" fill="#ECEFFE" />
          <path d="M 0 0 Q 720 100 1440 0" stroke="#0D0D14" strokeWidth="1" fill="none" />
        </svg>

        <div style={{ background: "#ECEFFE", padding: "100px 0 110px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "#3B47F0" }}>
                Hello, my name is,
              </span>
              <h2
                style={{
                  fontFamily: SYNE,
                  fontWeight: 800,
                  fontStyle: "italic",
                  fontSize: 80,
                  lineHeight: 1,
                  letterSpacing: "-3px",
                  color: "#0D0D14",
                  marginTop: 16,
                }}
              >Gundoju Srujan sai</h2>

              <div style={{ marginTop: 56, maxWidth: 520, display: "flex", flexDirection: "column", gap: 18 }}>
                <p style={{ fontFamily: INTER, fontSize: 15, lineHeight: "26px", color: "#0D0D14" }}>
                  A Product Designer focused on workflow systems, decision-driven experiences, and AI-assisted interactions.
                </p>
                <p style={{ fontFamily: INTER, fontSize: 15, lineHeight: "26px", color: "#0D0D14" }}>
                  I design structured digital experiences that reduce complexity, improve usability, and help users navigate decisions with more clarity and control.
                </p>
              </div>

              <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: "10px 24px" }}>
                {["System Thinking", "Workflow Design", "AI Product Design", "Decision Flows"].map((t, i) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#5C5C6B",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span style={{ color: "#3B47F0" }}>{String(i + 1).padStart(2, "0")}</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: 420,
                  height: 420,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "white",
                  boxShadow: "0 30px 80px rgba(13,13,20,0.12)",
                }}
              >
                <img
                  src={image_1000138017_1}
                  alt="Portrait of Alex Rivera"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: -28,
                    top: -28,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#3B47F0",
                    color: "white",
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    lineHeight: 1.2,
                    padding: 8,
                  }}
                >
                  Available<br />2026
                </span>
              </div>
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 80 }}
          aria-hidden
        >
          <path d="M 0 80 Q 720 -20 1440 80 L 1440 0 L 0 0 Z" fill="#ECEFFE" />
          <path d="M 0 80 Q 720 -20 1440 80" stroke="#0D0D14" strokeWidth="1" fill="none" />
        </svg>
      </section>

      <section id="work" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 48, lineHeight: "52px", letterSpacing: "-1.5px", color: "#0D0D14" }}>
              Selected Work
            </h2>
            <span style={{ fontFamily: MONO, fontSize: 11, color: "#9898A8", letterSpacing: "0.08em" }}>(2024 – 2025)</span>
          </div>
          <div style={{ height: 1, background: "#E2E2EC", marginTop: 32, marginBottom: 40 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 416px", gap: 24, alignItems: "stretch" }}>
            <ScaledSafeNavCard onClick={() => setPage("case")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <StatsCard />
              <PhilosophyCard onClick={() => setPage("about")} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#0D0D14", padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              My Process
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { n: "01", t: "Discover", b: "Map the existing workflow. Talk to the people stuck inside it." },
              { n: "02", t: "Define", b: "Find the real problem under the surface complaint." },
              { n: "03", t: "Design", b: "Build the system, not just the screen. Iterate against logic." },
              { n: "04", t: "Deliver", b: "Ship with documentation. Hand off without ambiguity." },
            ].map((s) => (
              <ProcessCard key={s.n} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: -40,
            top: 20,
            fontFamily: SYNE,
            fontWeight: 800,
            fontSize: 200,
            color: "#EEEEF6",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          “
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", position: "relative" }}>
          <h2 style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 72, lineHeight: "76px", letterSpacing: "-2px" }}>
            <span style={{ color: "#0D0D14" }}>I design </span>
            <span style={{ color: "#3B47F0", fontStyle: "italic" }}>decision systems,</span>
            <span style={{ color: "#5C5C6B" }}> not just interfaces.</span>
          </h2>
          <div style={{ marginTop: 60, textAlign: "center" }}>
            <p style={{ fontFamily: INTER, fontSize: 18, lineHeight: "30px", color: "#5C5C6B", maxWidth: 560, margin: "0 auto" }}>
              I work at the intersection of workflow logic, AI-assisted reasoning, and everyday usability — helping people make confident decisions inside complex products.
            </p>
            <button
  onClick={() => setPage("about")}
  onMouseEnter={(e) => {
    e.currentTarget.style.color = "#3B47F0";
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.color = "#5C5C6B";
    e.currentTarget.style.transform = "scale(1)";
  }}
  style={{
    marginTop: 24,

    fontFamily: INTER,
    fontWeight: 600,
    fontSize: 14,

    color: "#5C5C6B",

    background: "transparent",
    border: "none",

    cursor: "pointer",

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "4px 8px",

    transform: "scale(1)",
    transformOrigin: "center center",

    transition:
      "color 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
  }}
>
  Read More About Me →
</button>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

function ArrowLink({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: SYNE,
        fontWeight: 600,
        fontSize: 16,
        color: hover ? "#3B47F0" : "#5C5C6B",
        background: "transparent",
        border: 0,
        textAlign: "left",
        cursor: "pointer",
        padding: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,

        transform: hover
          ? "translateX(4px) scale(1.05)"
          : "translateX(0) scale(1)",

        transition:
          "color 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span
        style={{
          transform: hover ? "translateX(4px)" : "translateX(0)",
          transition: "transform 300ms ease",
        }}
      >
        →
      </span>

      <span>{children}</span>
    </button>
  );
}


function ScaledSafeNavCard({ onClick }: { onClick: () => void }) {
  const NATIVE_W = SAFENAV_CARD_W;
  const NATIVE_H = SAFENAV_CARD_H;
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setScale(el.clientWidth / NATIVE_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);


  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: NATIVE_H * scale }}>
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      initial={{
        opacity: 0,
        y: 32,
        scale: 1,
        boxShadow: "0px 10px 30px -15px rgba(13,13,20,0.25)",
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        scale: pressed ? 0.985 : hover ? 1.015 : 1,
        boxShadow: hover
          ? "0px 30px 60px -20px rgba(59,71,240,0.45)"
          : "0px 10px 30px -15px rgba(13,13,20,0.25)",
      }}
      style={{
        cursor: "pointer",
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: 28,
        willChange: "transform",
      }}
    >
      <div
        style={{
          width: NATIVE_W,
          height: NATIVE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <SafeNavProductCard onClick={onClick} hover={hover} />
      </div>

    </motion.div>
    </div>
  );
}

function StatsCard() {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "#4F5CF2" : "#3B47F0",
        borderRadius: 20,
        flex: 1,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background 200ms ease-out",
        cursor: "default",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: SYNE,
            fontWeight: 800,
            fontSize: 120,
            lineHeight: 1,
            color: "white",
            letterSpacing: "-4px",
            transform: hover ? "scale(1.05)" : "scale(1)",
            transformOrigin: "left center",
            transition: "transform 200ms ease-out",
            display: "inline-block",
          }}
        >
          1
        </div>
        <div style={{ fontFamily: INTER, fontSize: 20, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>+ Years of</div>
        <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 22, color: "white", marginTop: 2 }}>Systems Design</div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 16 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: hover ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
            letterSpacing: "0.06em",
            transition: "color 200ms ease-out",
          }}
        >
          1 Project · Open to Work · Remote
        </span>
      </div>
    </div>
  );
}

function PhilosophyCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        flex: 1,
        padding: 40,
        border: "1px solid #E2E2EC",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10,
          color: "#9898A8",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: 36,
        }}
      >
        Design Thinking
      </div>

      {/* Philosophy Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {[
          ["01", "Workflow before wireframe"],
          ["02", "Clarity is a feature"],
          ["03", "Systems over screens"],
        ].map(([n, t]) => (
          <div
            key={n}
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: "#3B47F0",
                minWidth: 24,
                letterSpacing: "0.08em",
              }}
            >
              {n}
            </span>

            <span
              style={{
                fontFamily: INTER,
                fontSize: 20,
                fontWeight: 500,
                color: "#0D0D14",
                lineHeight: 1.3,
              }}
            >
              {t}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#3B47F0";
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#5C5C6B";
          e.currentTarget.style.transform = "scale(1)";
        }}
        style={{
          marginTop: 40,
          alignSelf: "flex-start",

          fontFamily: INTER,
          fontWeight: 600,
          fontSize: 14,

          color: "#5C5C6B",

          background: "transparent",
          border: 0,
          cursor: "pointer",
          padding: 0,

          transform: "scale(1)",
          transformOrigin: "center center",

          transition:
            "color 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        Read About Process →
      </button>
    </div>
  );
}

function ProcessCard({ n, t, b }: { n: string; t: string; b: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(59,71,240,0.12)" : "rgba(255,255,255,0.04)",
        border: hover ? "1px solid rgba(59,71,240,0.3)" : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 28,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "all 200ms ease-out",
      }}
    >
      <div
        style={{
          fontFamily: SYNE,
          fontWeight: 800,
          fontSize: 56,
          color: hover ? "rgba(79,92,242,0.7)" : "rgba(59,71,240,0.3)",
          lineHeight: 1,
          letterSpacing: "-2px",
          transition: "color 200ms ease-out",
        }}
      >
        {n}
      </div>
      <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 22, color: "white", letterSpacing: "-0.5px" }}>{t}</div>
      <div style={{ fontFamily: INTER, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: "20px" }}>{b}</div>
    </div>
  );
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer style={{ background: "#0D0D14", height: 72, display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: INTER, fontSize: 13, color: "rgba(247,247,251,0.4)" }}>© 2025 Gundoju Srujan sai</span>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { id: "home" as Page, label: "Work" },
            { id: "about" as Page, label: "About" },
            { id: "contact" as Page, label: "Contact" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              style={{ fontFamily: INTER, fontWeight: 500, fontSize: 13, color: "rgba(247,247,251,0.5)", background: "transparent", border: 0, cursor: "pointer" }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(247,247,251,0.3)", letterSpacing: "0.08em" }}>
          Made with intention and care.
        </span>
      </div>
    </footer>
  );
}
