import { useState } from "react";
import { PulseDot, SYNE, INTER, MONO } from "./ui-bits";

export function Contact() {
  return (
    <div style={{ paddingTop: 64, minHeight: "100vh", background: "#F7F7FB", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px", width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: 11, color: "#9898A8", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Get in Touch
          </span>
          <h1 style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 80, lineHeight: 1, letterSpacing: "-2px", marginTop: 24 }}>
            <span style={{ display: "block", color: "#0D0D14" }}>Let's build something</span>
            <span style={{ display: "block", color: "#3B47F0" }}>meaningful.</span>
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 18, lineHeight: "30px", color: "#5C5C6B", maxWidth: 520, margin: "32px auto 0" }}>
            Open to full-time roles and select freelance work — especially workflow-intensive, AI-assisted, or decision-heavy products.
          </p>
        </div>

        <div style={{ marginTop: 80, borderTop: "1px solid #E2E2EC" }}>
          {[
  {
    label: "Email",
    value: "srujan6366gundoju@gmail.com",
    href: "mailto:srujan6366gundoju@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/gundoju-srujan-sai-7a0765289",
    href: "https://www.linkedin.com/in/gundoju-srujan-sai-7a0765289",
  },
  {
    label: "Behance",
    value: "behance.net/srujans",
    href: "https://www.behance.net/srujans",
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/MY RESUME.pdf",
    download: true,
  },
].map((row) => (
            <ContactRow key={row.label} {...row} />
          ))}
        </div>

        <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              background: "#0D0D14",
              borderRadius: 100,
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <PulseDot />
            <span style={{ fontFamily: MONO, fontSize: 11, color: "white", letterSpacing: "0.08em" }}>
              Available · Replies in 24h · Hyderabad , INDIA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr 60px",
        alignItems: "center",
        padding: "24px 24px",
        borderBottom: `1px solid ${hover ? "#C7CCFD" : "#E2E2EC"}`,
        background: hover ? "#ECEFFE" : "transparent",
        textDecoration: "none",
        transition: "background 200ms ease-out, border-color 200ms ease-out",
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 10,
          color: hover ? "#3B47F0" : "#9898A8",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          transition: "color 180ms ease-out",
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 18, color: "#0D0D14" }}>{value}</span>
      <span
        style={{
          fontFamily: SYNE,
          fontWeight: 700,
          fontSize: 24,
          color: "#3B47F0",
          textAlign: "right",
          transform: hover ? "translateX(10px)" : "translateX(0)",
          transition: "transform 200ms ease-out",
        }}
      >
        →
      </span>
    </a>
  );
}
