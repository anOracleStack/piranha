"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const STRIP_ITEMS = [
  "Armor of Luxury",
  "Luxury That Bites Back",
  "Obsidian Leather",
  "House Gold Hardware",
  "Encrypted Passport",
  "The Private Room",
  "Objects That Know Their Owner",
  "Travel Armor",
  "Authenticated Provenance",
  "Phase I Digital Flagship",
];

export default function MarqueeStrip({ speed = 38 }: { speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate children for seamless loop
    const clone = track.innerHTML;
    track.innerHTML += clone;

    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % totalWidth),
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  return (
    <div className="marquee-shell" aria-hidden>
      <div className="marquee-track" ref={trackRef}>
        {STRIP_ITEMS.map((item) => (
          <span key={item} className="marquee-item">
            {item}
            <span className="marquee-sep" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
