"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useZipper, type ZipperPhase } from "@/contexts/ZipperContext";
import ZipperSVG from "./ZipperSVG";

const PANEL_EASE  = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SLIDE_EASE  = [0.4, 0, 0.2, 1]  as [number, number, number, number];
const PANEL_CLOSE = 0.36;
const SLIDE_DUR   = 0.64;
const PANEL_OPEN  = 0.44;

// Safety timeouts: if rAF is throttled (background tab), force the next phase
const PHASE_TIMEOUT: Record<string, number> = {
  closing: 800,
  sliding: 1400,
  opening: 900,
};

export default function ZipperOverlay() {
  const { phase, advance } = useZipper();
  const reduced = useReducedMotion();

  // Sync ref so onAnimationComplete always reads the current phase, not a stale closure
  const phaseRef = useRef<ZipperPhase>(phase);
  phaseRef.current = phase;

  // Respect prefers-reduced-motion: fast-forward all phases instantly
  useEffect(() => {
    if (!reduced || phase === "idle") return;
    const t1 = setTimeout(advance, 0);
    const t2 = setTimeout(advance, 50);
    const t3 = setTimeout(advance, 100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase, reduced, advance]);

  // Safety timeout: background tabs throttle rAF; advance automatically if stuck
  useEffect(() => {
    if (phase === "idle") return;
    const ms = PHASE_TIMEOUT[phase] ?? 1000;
    const t = setTimeout(advance, ms);
    return () => clearTimeout(t);
  }, [phase, advance]);

  if (reduced) return null;

  const active = phase !== "idle";

  const topY    = phase === "closing" ? "0%" : phase === "opening" ? "-100%" : phase === "sliding" ? "0%" : "-100%";
  const bottomY = phase === "closing" ? "0%" : phase === "opening" ? "100%"  : phase === "sliding" ? "0%" : "100%";
  const panelDuration = phase === "opening" ? PANEL_OPEN : PANEL_CLOSE;

  return (
    <div className={`zipper-overlay${active ? " is-active" : ""}`} aria-hidden>

      {/* ── TOP PANEL: drives the state machine via onAnimationComplete ── */}
      <motion.div
        className="zipper-panel-top"
        initial={{ y: "-100%" }}
        animate={{ y: topY }}
        transition={{ duration: panelDuration, ease: PANEL_EASE }}
        onAnimationComplete={() => {
          const cur = phaseRef.current;
          if (cur === "closing") advance(); // → sliding
          if (cur === "opening") advance(); // → idle
        }}
      />

      {/* ── BOTTOM PANEL: mirrors top, no extra callback ── */}
      <motion.div
        className="zipper-panel-bottom"
        initial={{ y: "100%" }}
        animate={{ y: bottomY }}
        transition={{ duration: panelDuration, ease: PANEL_EASE }}
      />

      {/* ── SEAM + ZIPPER HEAD: only present while panels are closed ── */}
      <AnimatePresence>
        {phase === "sliding" && (
          <>
            <motion.div
              key="seam"
              className="zipper-seam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />

            <motion.div
              key="head"
              className="zipper-head"
              style={{ left: 0 }}
              initial={{ x: "-80px" }}
              animate={{ x: "calc(100vw + 80px)" }}
              transition={{ duration: SLIDE_DUR, ease: SLIDE_EASE }}
              onAnimationComplete={() => {
                if (phaseRef.current === "sliding") advance(); // → opening
              }}
            >
              <ZipperSVG />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
