import { motion } from "motion/react";
import { SYNE, INTER, MONO } from "./ui-bits";
import imgAmsterdam from "../../imports/SafeNavCard/12d562ef4eb7a1758738f137ecf51afb160b1aac.png";
import imgPrague from "../../imports/SafeNavCard/5cbae04d862d7ffb3401516b34f8316d88a85130.png";
import imgEiffel from "../../imports/SafeNavCard/235598f8e6f2244f1e639581bcf30fa50350f64d.png";
import imgBarcelona from "../../imports/SafeNavCard/4787cd18d77b60009f0a671aa8159b8ec55c6a63.png";

const NATIVE_W = 760;
const NATIVE_H = 540;

function Phone({
  rotate,
  x,
  z,
  children,
  hover,
}: {
  rotate: number;
  x: number;
  z: number;
  children: React.ReactNode;
  hover: boolean;
}) {
  return (
    <motion.div
      animate={{
        rotate: hover ? rotate * 0.5 : rotate,
        x,
        y: hover ? -10 : 0,
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        left: "50%",
        top: 16,
        marginLeft: -90,
        width: 180,
        height: 340,
        borderRadius: 32,
        background: "#F9F9F9",
        border: "4px solid #DCDCDC",
        boxShadow: "0 20px 40px -16px rgba(0,0,0,0.35)",
        overflow: "hidden",
        zIndex: z,
      }}
    >
      {children}
    </motion.div>
  );
}

export function SafeNavProductCard({
  onClick,
  hover,
}: {
  onClick: () => void;
  hover: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: NATIVE_W,
        height: NATIVE_H,
        background: "#3B47F0",
        borderRadius: 32,
        overflow: "hidden",
      }}
    >
      {/* faint NEW background letters */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: SYNE,
          fontWeight: 800,
          fontSize: 280,
          color: "rgba(255,255,255,0.10)",
          letterSpacing: "0.04em",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        NEW
      </div>

      {/* faint arrow top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 28,
          top: 20,
          fontFamily: SYNE,
          fontWeight: 800,
          fontSize: 60,
          color: "rgba(255,255,255,0.22)",
          pointerEvents: "none",
        }}
      >
        →
      </div>

      {/* Left phone: Amsterdam destination */}
      <Phone rotate={-10} x={-180} z={1} hover={hover}>
        <img src={imgAmsterdam} alt="Amsterdam" style={{ width: "100%", height: 220, objectFit: "cover" }} />
        <div style={{ padding: 12 }}>
          <div style={{ fontFamily: MONO, fontSize: 8, color: "#9898A8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Netherlands
          </div>
          <div style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 18, color: "#0D0D14", marginTop: 4 }}>Amsterdam</div>
          <div style={{ display: "flex", gap: 10, marginTop: 10, fontFamily: INTER, fontSize: 9 }}>
            {["Overview", "Safety", "Hotels"].map((t, i) => (
              <span key={t} style={{ color: i === 0 ? "#3B47F0" : "#9898A8", fontWeight: i === 0 ? 600 : 400, borderBottom: i === 0 ? "1.5px solid #3B47F0" : "none", paddingBottom: 2 }}>
                {t}
              </span>
            ))}
          </div>
          <div style={{ height: 1, background: "#EEE", marginTop: 6 }} />
          <p style={{ fontFamily: INTER, fontSize: 8, color: "#5C5C6B", lineHeight: 1.45, marginTop: 8 }}>
            Artistic, walkable canals, world-class museums. Great for solo explorers &amp; culture seekers.
          </p>
        </div>
      </Phone>

      {/* Right phone: Trip Plan */}
      <Phone rotate={9} x={180} z={1} hover={hover}>
        <div style={{ padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 13, color: "#0D0D14" }}>Your Trip Plan</div>
            <div style={{ fontFamily: MONO, fontSize: 9, color: "#9898A8" }}>⇪</div>
          </div>
          <div style={{ marginTop: 10, borderRadius: 12, overflow: "hidden", border: "1px solid #EEE" }}>
            <img src={imgBarcelona} alt="Barcelona" style={{ width: "100%", height: 110, objectFit: "cover" }} />
            <div style={{ padding: 8 }}>
              <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 11, color: "#0D0D14" }}>Adventure</div>
              <div style={{ fontFamily: INTER, fontSize: 8, color: "#9898A8", marginTop: 2 }}>9 · 7 days</div>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                {["ays", "12 activities", "8.1"].map((t) => (
                  <span key={t} style={{ fontFamily: MONO, fontSize: 7, padding: "2px 5px", background: "#F2F2F7", color: "#5C5C6B", borderRadius: 4 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            {["09:00 · Ngurah Rai Airport", "11:00 · The Layar Villas", "14:00 · Seminyak Beach"].map((t) => (
              <div key={t} style={{ display: "flex", gap: 6, fontFamily: INTER, fontSize: 8, color: "#5C5C6B" }}>
                <span style={{ width: 4, height: 4, borderRadius: 99, background: "#3B47F0", marginTop: 4 }} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </Phone>

      {/* Center phone: Hello Vinay / Explore Amsterdam */}
      <Phone rotate={0} x={0} z={2} hover={hover}>
        <div style={{ padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: 8, color: "#0D0D14" }}>
            <span>9:41</span>
            <span>•••</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: 99, background: `url(${imgEiffel}) center/cover`, border: "1.5px solid #fff" }} />
              <div>
                <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 12, color: "#0D0D14", lineHeight: 1 }}>Hello,</div>
                <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 12, color: "#0D0D14", lineHeight: 1.2 }}>Vinay</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 18, height: 18, borderRadius: 99, background: "#F2F2F7", display: "grid", placeItems: "center", fontSize: 9 }}>🔔</div>
              <div style={{ width: 18, height: 18, borderRadius: 99, background: "#F2F2F7", display: "grid", placeItems: "center", fontSize: 9 }}>⚙</div>
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F4F4F8", padding: "6px 10px", borderRadius: 99 }}>
            <span style={{ fontFamily: INTER, fontSize: 9, color: "#9898A8" }}>🔍 Destination</span>
            <div style={{ width: 22, height: 22, borderRadius: 99, background: "#0D0D14", display: "grid", placeItems: "center", color: "white", fontSize: 9 }}>≡</div>
          </div>
          <div style={{ marginTop: 16, textAlign: "center", fontFamily: SYNE, fontWeight: 700 }}>
            <div style={{ fontSize: 18, color: "#0D0D14" }}>Explore</div>
            <div style={{ fontSize: 22, color: "#0D0D14", marginTop: -2 }}>Amsterdam</div>
          </div>
          <div style={{ marginTop: 10, borderRadius: 18, overflow: "hidden" }}>
            <img src={imgPrague} alt="Explore" style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </Phone>

      {/* Bottom white card */}
      <motion.div
        animate={{ y: hover ? -6 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 18,
          background: "white",
          borderRadius: 28,
          padding: "22px 26px",
          boxShadow: "0 20px 40px -20px rgba(0,0,0,0.25)",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Product Design", "UX Systems", "AI-Assisted", "2024"].map((t) => (
            <span
              key={t}
              style={{
                background: "#2E2E2E",
                color: "white",
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: 99,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 16 }}>
          <div>
            <div style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 34, color: "#0D0D14", letterSpacing: "-1px", lineHeight: 1 }}>
              SafeNav
            </div>
            <div style={{ fontFamily: INTER, fontSize: 14, color: "rgba(0,0,0,0.45)", marginTop: 8 }}>
              Personalized Travel Planning System
            </div>
          </div>
          <motion.div
            animate={{ x: hover ? 4 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 14,
              color: hover ? "#3B47F0" : "#5C5C6B",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            View Case Study →
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export const SAFENAV_CARD_W = NATIVE_W;
export const SAFENAV_CARD_H = NATIVE_H;
