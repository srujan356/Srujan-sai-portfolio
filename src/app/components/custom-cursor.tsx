"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  console.log("CustomCursor mounted, isMobile:", isMobile, "isHovering:", isHovering);

  // Cursor state using refs for smooth animation
  const cursorState = useRef<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
  });

  const targetPosition = useRef<CursorPosition>({
    x: 0,
    y: 0,
  });

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;

      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current.x = e.clientX;
      targetPosition.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Memoized function to check if element is interactive
  const isInteractiveElement = useCallback((target: HTMLElement | null): boolean => {
    if (!target) return false;

    // Direct tag check
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "A"
    ) {
      return true;
    }

    // Check role attribute
    const role = target.getAttribute("role");
    if (role === "button" || role === "link") {
      return true;
    }

    // Check data attribute
    if (target.hasAttribute("data-cursor-hover")) {
      return true;
    }

    // Check if parent is interactive - most important
    const closestButton = target.closest("button");
    const closestLink = target.closest("a");

    return !!(closestButton || closestLink);
  }, []);

  // Handle hover detection for interactive elements
  useEffect(() => {
    console.log("Setting up hover event listeners");

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = isInteractiveElement(target);
      
      if (isInteractive) {
        console.log("HOVER DETECTED ON:", target?.tagName, target?.textContent?.substring(0, 30));
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      if (!relatedTarget || !isInteractiveElement(relatedTarget)) {
        console.log("HOVER ENDED");
        setIsHovering(false);
      }
    };

    // Use both mouseover/mouseout and pointerover/pointerout for better compatibility
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("pointerover", handleMouseOver as any);
    document.addEventListener("pointerout", handleMouseOut as any);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("pointerover", handleMouseOver as any);
      document.removeEventListener("pointerout", handleMouseOut as any);
    };
  }, [isInteractiveElement]);

  // Animation loop with requestAnimationFrame for smooth performance
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      // Smooth easing for cursor follow (using lerp)
      const easing = 0.15;
      cursorState.current.x +=
        (targetPosition.current.x - cursorState.current.x) * easing;
      cursorState.current.y +=
        (targetPosition.current.y - cursorState.current.y) * easing;

      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorState.current.x}px, ${cursorState.current.y}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Debug - Component is rendering */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "8px 12px",
          background: isHovering ? "rgba(0, 255, 0, 0.7)" : "rgba(128, 128, 128, 0.7)",
          color: "#fff",
          borderRadius: "4px",
          fontSize: "12px",
          zIndex: 99999,
          fontFamily: "monospace",
          pointerEvents: "none",
          transition: "background 0.2s",
        }}
      >
        CURSOR {isHovering ? "HOVER" : "IDLE"}
      </div>
      {/* Outer ring cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        {/* Outer ring with gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `2px solid rgba(13, 13, 20, ${isHovering ? 0.8 : 0.3})`,
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isHovering ? "scale(2)" : "scale(1)",
            willChange: "transform",
          }}
        />

        {/* Inner dot */}
        <div
          ref={cursorDotRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "rgba(13, 13, 20, 0.8)",
            transition: "background 0.2s ease-out",
            willChange: "transform",
          }}
        />
      </div>

      {/* Glow effect on hover */}
      {isHovering && (
        <div
          style={{
            position: "fixed",
            top: targetPosition.current.y,
            left: targetPosition.current.x,
            width: 100,
            height: 100,
            pointerEvents: "none",
            zIndex: 9998,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(13, 13, 20, 0.15) 0%, transparent 70%)",
            filter: "blur(12px)",
            willChange: "transform",
            animation: "fadeIn 0.3s ease-out",
          }}
        />
      )}
    </>
  );
}