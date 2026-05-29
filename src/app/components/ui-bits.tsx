import type { ReactNode } from "react";

export const SYNE = "'Syne', sans-serif";
export const INTER = "'Inter', sans-serif";
export const MONO = "'Space Mono', monospace";

export function PulseDot({ size = 8, color = "#22C55E" }: { size?: number; color?: string }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: size, height: size }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          background: color,
          opacity: 0.5,
          animation: "make-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
        }}
      />
      <span style={{ position: "relative", borderRadius: "9999px", width: "100%", height: "100%", background: color }} />
      <style>{`@keyframes make-ping { 0% { transform: scale(1); opacity: 0.6 } 80%, 100% { transform: scale(2.4); opacity: 0 } }`}</style>
    </span>
  );
}

export function MonoTag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontWeight: 400,
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: dark ? "#C7CCFD" : "#3B47F0",
        background: dark ? "rgba(30,37,128,0.5)" : "#ECEFFE",
        padding: "6px 12px",
        borderRadius: 100,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 4 }).map(() => text).join("  ·  ");
  return (
    <div style={{ width: "100%", overflow: "hidden", background: "#3B47F0", height: 48, display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "make-marquee 30s linear infinite",
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        <span style={{ paddingRight: 48 }}>{items}</span>
        <span style={{ paddingRight: 48 }}>{items}</span>
      </div>
      <style>{`@keyframes make-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

