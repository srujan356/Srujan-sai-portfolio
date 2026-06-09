import { useEffect, useState } from "react";

type Page = "home" | "case" | "about" | "contact";

const SYNE = "'Syne', sans-serif";
const INTER = "'Inter', sans-serif";
const MONO = "'Space Mono', monospace";

export function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { id: Page; label: string }[] = [
    { id: "home", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(247,247,251,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid #E2E2EC" : "1px solid transparent",
        transition: "border-color 200ms ease",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 1280, padding: "20px 80px", height: 64 }}
      >
        <div style={{ width: 120 }} />
        <div className="flex items-center gap-10">
          {links.map((l) => {
            const active = page === l.id || (l.id === "home" && page === "case");
            return <NavLink key={l.id} label={l.label} active={active} onClick={() => setPage(l.id)} />;
          })}
        </div>
        <div className="flex justify-end" style={{ width: 120 }}>
          <a
  href="/Resumemine.pdf"
  target="_blank"
  rel="noopener noreferrer"
  onMouseEnter={(e) => {
    e.currentTarget.style.color = "#000000";
    e.currentTarget.style.transform = "scale(1.06)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.color = "#3B47F0";
    e.currentTarget.style.transform = "scale(1)";
  }}
  style={{
    fontFamily: MONO,
    fontWeight: 600,
    fontSize: 11,

    color: "#3B47F0",

    letterSpacing: "0.1em",
    textTransform: "uppercase",

    display: "inline-block",

    textDecoration: "none",

    transform: "scale(1)",
    transformOrigin: "center center",

    transition:
      "color 250ms ease, transform 250ms cubic-bezier(0.22,1,0.36,1)",
  }}
>
  Resume 
</a>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const showBar = active || hover;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative"
      style={{
        fontFamily: INTER,
        fontWeight: 500,
        fontSize: 14,
        color: active ? "#3B47F0" : hover ? "#0D0D14" : "#5C5C6B",
        paddingBottom: 4,
        transition: "color 150ms ease",
      }}
    >
      {label}
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: -2,
          height: 2,
          background: "#3B47F0",
          width: showBar ? "100%" : 0,
          transition: "width 200ms ease-out",
        }}
      />
    </button>
  );
}

export { SYNE, INTER, MONO };
export type { Page };
