import { motion } from "motion/react";
import { Linkedin, Github, Mail} from "lucide-react";
import { FaBehance } from "react-icons/fa";
import { useState } from "react";

const MONO = "'Space Mono', monospace";

const links = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/gundoju-srujan-sai-7a0765289", Icon: Linkedin },
  { id: "github", label: "GitHub", href: "https://github.com/srujan356", Icon: Github },
  { id: "behance", label: "Behance", href: "https://www.behance.net/srujans", Icon: FaBehance},
  {
  id: "email",
  label: "Email",
  href: "https://mail.google.com/mail/?view=cm&fs=1&to=srujan6366gundoju@gmail.com",
  Icon: Mail,
}
];

export function SideSocialRail() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        left: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: "center",
      }}
    >
      {links.map((l) => (
        <RailLink key={l.id} {...l} />
      ))}
      <div style={{ width: 1, height: 56, background: "#BBBBC8", marginTop: 8 }} />
      <span
        style={{
          fontFamily: MONO,
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#9898A8",
          writingMode: "vertical-rl",
        }}
      >
        Connect
      </span>
    </motion.div>
  );
}

function RailLink({ label, href, Icon }: { label: string; href: string; Icon: any }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.12, x: 4 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      style={{
        position: "relative",
        width: 34,
        height: 34,
        borderRadius: 999,
        background: hover ? "#3B47F0" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
        border: "1px solid #E2E2EC",
        color: hover ? "white" : "#0D0D14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition: "background 180ms ease-out, color 180ms ease-out",
      }}
    >
      <Icon size={15} strokeWidth={1.8} />
      {hover && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            position: "absolute",
            left: 44,
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#0D0D14",
            background: "white",
            padding: "4px 10px",
            borderRadius: 4,
            border: "1px solid #E2E2EC",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </motion.span>
      )}
    </motion.a>
  );
}
