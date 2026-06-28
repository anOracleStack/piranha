"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type ZipperPhase = "idle" | "closing" | "sliding" | "opening";

interface ZipperCtx {
  phase: ZipperPhase;
  trigger: (href: string) => void;
  advance: () => void;
}

const Ctx = createContext<ZipperCtx | null>(null);

const NEXT: Partial<Record<ZipperPhase, ZipperPhase>> = {
  closing: "sliding",
  sliding: "opening",
  opening: "idle",
};

export function ZipperProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<ZipperPhase>("idle");
  const hrefRef = useRef<string>("");
  // Track previous phase to fire navigation as a proper side-effect
  const prevPhaseRef = useRef<ZipperPhase>("idle");

  const trigger = useCallback((href: string) => {
    hrefRef.current = href;
    setPhase("closing");
  }, []);

  const advance = useCallback(() => {
    setPhase((prev) => NEXT[prev] ?? prev);
  }, []);

  // Navigate as a side-effect when phase changes closing → sliding
  useEffect(() => {
    if (prevPhaseRef.current === "closing" && phase === "sliding") {
      router.push(hrefRef.current);
    }
    prevPhaseRef.current = phase;
  }, [phase, router]);

  return <Ctx.Provider value={{ phase, trigger, advance }}>{children}</Ctx.Provider>;
}

export function useZipper(): ZipperCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useZipper must be inside ZipperProvider");
  return ctx;
}
