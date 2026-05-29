"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursorTest() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const isMobileDevice = window.innerWidth < 768;
    setIsMobile(isMobileDevice);

    if (isMobileDevice) return;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Detect hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a") || target.tagName === "A";
      const isButton = target.closest("button") || target.tagName === "BUTTON";
      
      if (isLink || isButton) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      const isLink = relatedTarget?.closest("a") || relatedTarget?.tagName === "A";
      const isButton = relatedTarget?.closest("button") || relatedTarget?.tagName === "BUTTON";
      
      if (!isLink && !isButton) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Cursor Ring */}
     <div
  style={{
    position: "fixed",
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: 32,
    height: 32,
    border: "2px solid white",
    borderRadius: "50%",
    transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
    pointerEvents: "none",
    zIndex: 9999,
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    mixBlendMode: "difference",
  }}
/>

      {/* Cursor Center Dot */}
      <div
  style={{
    position: "fixed",
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: 6,
    height: 6,
    background: "white",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 9999,
    mixBlendMode: "difference",
  }}
/>
    </>
  );
}
