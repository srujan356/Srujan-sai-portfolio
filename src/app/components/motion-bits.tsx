import { motion, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence } from "motion/react";
import type { ReactNode, CSSProperties, MouseEvent } from "react";
import { useRef, useState, useEffect } from "react";

const SYNE = "'Syne', sans-serif";
const MONO = "'Space Mono', monospace";

export function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.9,
  once = true,
  style,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  style?: CSSProperties;
  className?: string;
  as?: "div" | "span" | "section" | "h1" | "h2" | "p";
}) {
  const Comp: any = (motion as any)[as];
  return (
    <Comp
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function StaggerWords({
  text,
  style,
  delay = 0,
  perWord = 0.06,
}: {
  text: string;
  style?: CSSProperties;
  delay?: number;
  perWord?: number;
}) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-block", ...style }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            style={{ display: "inline-block", paddingRight: "0.28em" }}
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: delay + i * perWord, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Parallax({
  children,
  speed = 0.3,
  style,
  className,
}: {
  children: ReactNode;
  speed?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [200 * speed, -200 * speed]);
  return (
    <motion.div ref={ref} style={{ position: "relative", y, willChange: "transform", ...style }} className={className}>
      {children}
    </motion.div>
  );
}

export function MagneticButton({
  children,
  onClick,
  style,
  strength = 18,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const move = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(px * strength);
    y.set(py * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: sx, y: sy, willChange: "transform", cursor: "pointer", border: "none", background: "transparent", ...style }}
      className={className}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.6 });
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "#3B47F0",
        transformOrigin: "0% 50%",
        scaleX,
        zIndex: 100,
      }}
    />
  );
}

export function CursorSpotlight({ color = "rgba(59,71,240,0.18)", size = 480 }: { color?: string; size?: number }) {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `radial-gradient(${size}px circle at var(--mx) var(--my), ${color}, transparent 60%)`,
        // @ts-expect-error css vars
        "--mx": sx,
        "--my": sy,
      }}
    />
  );
}

export function MarqueeRow({
  items,
  duration = 32,
  reverse = false,
  color = "#0D0D14",
  bg = "transparent",
  border = false,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  color?: string;
  bg?: string;
  border?: boolean;
}) {
  const row = items.concat(items);
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        background: bg,
        borderTop: border ? "1px solid #E2E2EC" : "none",
        borderBottom: border ? "1px solid #E2E2EC" : "none",
        padding: "24px 0",
      }}
    >
      <motion.div
        style={{ display: "flex", gap: 48, whiteSpace: "nowrap", willChange: "transform" }}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 48, fontFamily: SYNE, fontWeight: 700, fontSize: 56, letterSpacing: "-1.5px", color }}>
            {t}
            <span style={{ fontFamily: MONO, fontSize: 22, color: "#3B47F0" }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function PageTransition({ pageKey, children }: { pageKey: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function HoverLift({
  children,
  lift = -6,
  style,
  className,
  onClick,
}: {
  children: ReactNode;
  lift?: number;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: lift }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ willChange: "transform", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
