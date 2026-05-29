const SYNE = "'Syne', sans-serif";
const INTER = "'Inter', sans-serif";
const MONO = "'Space Mono', monospace";

export function SafeNavMockup({ compact = false }: { compact?: boolean }) {
  const destinations = [
    { city: "Paris, France", dates: "May 12–17 · 5 Days", details: "2 Hotels · 3 Guides", active: true },
    { city: "Rome, Italy", dates: "May 18–20 · 3 Days", details: "1 Hotel · 2 Guides" },
    { city: "Barcelona, Spain", dates: "May 21–25 · 4 Days", details: "3 Hotels · 2 Guides" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#0D0D14" }}>
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: -20,
          bottom: -40,
          fontFamily: SYNE,
          fontWeight: 800,
          fontSize: 180,
          color: "rgba(59,71,240,0.07)",
          lineHeight: 1,
          letterSpacing: "-6px",
        }}
      >
        SafeNav
      </div>

      <div className="relative flex h-full">
        {/* Sidebar */}
        <div
          className="flex flex-col gap-3"
          style={{
            width: compact ? 160 : 200,
            background: "rgba(255,255,255,0.03)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            padding: compact ? 14 : 20,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="rounded-lg flex items-center justify-center"
              style={{ width: 28, height: 28, background: "#3B47F0" }}
            >
              <span style={{ color: "white", fontFamily: SYNE, fontWeight: 800, fontSize: 13 }}>SN</span>
            </div>
            <span style={{ color: "white", fontFamily: SYNE, fontWeight: 700, fontSize: 13 }}>SafeNav</span>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />

          <div
            style={{
              fontFamily: MONO,
              fontSize: 9,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Views
          </div>

          {["Destinations", "Hotels", "Guides", "Timeline"].map((item, i) => {
            const active = i === 0;
            return (
              <div
                key={item}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: active ? "#3B47F0" : "rgba(30,37,128,0.18)",
                  color: active ? "white" : "rgba(199,204,253,0.55)",
                  fontFamily: INTER,
                  fontWeight: active ? 600 : 400,
                  fontSize: 12,
                }}
              >
                {item}
              </div>
            );
          })}

          <div
            className="mt-auto flex items-center gap-2 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="rounded-full" style={{ width: 24, height: 24, background: "#3B47F0" }} />
            <span style={{ color: "rgba(255,255,255,0.55)", fontFamily: INTER, fontSize: 11 }}>My Profile</span>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col" style={{ padding: compact ? 16 : 24, gap: 12 }}>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: SYNE, fontWeight: 700, fontSize: compact ? 18 : 22, color: "white", letterSpacing: "-0.5px" }}>
              Destinations
            </span>
            <span
              style={{
                background: "#3B47F0",
                color: "white",
                padding: "6px 14px",
                borderRadius: 6,
                fontFamily: INTER,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              + Add
            </span>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 10, color: "rgba(199,204,253,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            3 destinations · 19 days · 6 hotels · 7 guides
          </div>

          <div className="flex flex-col gap-2.5">
            {destinations.map((d) => (
              <div
                key={d.city}
                className="relative flex items-center justify-between"
                style={{
                  background: d.active ? "rgba(59,71,240,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${d.active ? "rgba(59,71,240,0.4)" : "rgba(255,255,255,0.05)"}`,
                  borderRadius: 10,
                  padding: "12px 14px 12px 18px",
                }}
              >
                <span
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: 3, background: d.active ? "#3B47F0" : "rgba(255,255,255,0.2)", borderRadius: "10px 0 0 10px" }}
                />
                <div className="flex flex-col gap-1">
                  <span style={{ color: "white", fontFamily: INTER, fontWeight: 600, fontSize: 13 }}>{d.city}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: INTER, fontSize: 11 }}>{d.dates}</span>
                </div>
                <span style={{ color: "#C7CCFD", fontFamily: MONO, fontSize: 10, letterSpacing: "0.06em" }}>{d.details}</span>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center"
            style={{
              border: "1px dashed rgba(199,204,253,0.18)",
              borderRadius: 8,
              padding: 10,
              color: "rgba(199,204,253,0.5)",
              fontFamily: INTER,
              fontSize: 12,
              marginTop: 4,
            }}
          >
            + Add Destination
          </div>
        </div>
      </div>
    </div>
  );
}
