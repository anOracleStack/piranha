"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import TransitionLink from "@/components/ui/TransitionLink";

const CATEGORIES = [
  {
    href: "/collections/the-fleet",
    label: "The Fleet",
    sub: "Travel armor for movement under pressure.",
    image: "/images/products/obsidian-weekender.png",
    imageAlt: "Obsidian Weekender bag on dark stone",
    accent: "var(--deep-teal)",
  },
  {
    href: "/collections/the-armor",
    label: "The Armor",
    sub: "Daily carry pieces with ceremony and teeth.",
    image: "/images/products/apex-satchel.png",
    imageAlt: "Apex Satchel structured leather bag",
    accent: "var(--oxblood)",
  },
];

export default function CategoryShowcase() {
  const shellRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shell.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    shell.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="showcase-section" ref={shellRef} aria-label="Collections">
      <div className="showcase-grid">
        {CATEGORIES.map((cat, i) => (
          <TransitionLink
            key={cat.href}
            href={cat.href}
            className="showcase-card"
            data-reveal
            data-delay={i * 100 || undefined}
          >
            <div
              className="showcase-image-shell"
              style={{ "--showcase-accent": cat.accent } as React.CSSProperties}
            >
              <Image
                src={cat.image}
                alt={cat.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="showcase-image"
                unoptimized
              />
              <div className="showcase-overlay" />
            </div>
            <div className="showcase-copy">
              <p className="eyebrow">Collection</p>
              <h2>{cat.label}</h2>
              <p>{cat.sub}</p>
              <span className="showcase-cta">View collection →</span>
            </div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
