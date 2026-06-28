"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: "0px 0px -80px 0px",
  threshold: 0.1,
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  tag?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  tag: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      data-delay={delay || undefined}
      className={className}
    >
      {children}
    </div>
  );
}
