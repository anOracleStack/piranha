"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HouseLink } from "@/components/ui/HouseButton";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_WORDS = ["HOUSE", "OF", "PIRANHA"];

export default function CinematicHero() {
  const shellRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only GSAP scroll parallax — safe when backgrounded since it scrubs on user scroll
    const ctx = gsap.context(() => {
      if (mediaRef.current) {
        gsap.to(mediaRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: shellRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
    }, shellRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-shell" ref={shellRef}>
      <div className="hero-grid-lines" aria-hidden />

      <div className="hero-media hero-media-enter" ref={mediaRef} aria-hidden>
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hero-poster.avif"
        >
          <source src="/video/hero-4k.webm" type="video/webm" />
          <Image
            src="/images/products/obsidian-weekender.png"
            alt=""
            width={900}
            height={675}
            priority
            unoptimized
          />
        </video>
      </div>

      <div className="hero-copy">
        <p className="eyebrow hero-enter-1">Phase I digital flagship</p>
        <h1 className="hero-h1">
          {HEADLINE_WORDS.map((word, i) => (
            <span key={word} className={`hero-word hero-enter-${i + 2}`}>
              {word}
            </span>
          ))}
        </h1>
        <p className="hero-enter-5">
          Luxury leather goods, travel armor, and authenticated objects for the private room.
        </p>
        <div className="hero-actions hero-enter-6">
          <HouseLink href="/collections/the-fleet" size="lg">
            Enter the Armory
          </HouseLink>
          <HouseLink href="/the-vault" variant="vault" size="lg">
            Open the Vault
          </HouseLink>
        </div>
      </div>

      <div className="hero-product-strip">
        <span className="hero-enter-7">Obsidian leather</span>
        <span className="hero-enter-8">House gold hardware</span>
        <span className="hero-enter-9">Encrypted passport</span>
      </div>
    </section>
  );
}
