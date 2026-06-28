"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HouseLink } from "@/components/ui/HouseButton";
import TransitionLink from "@/components/ui/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

const FRAMES = [
  {
    id: "lk-01",
    label: "The Fleet",
    title: "Obsidian Weekender",
    sub: "Travel armor for the private departure.",
    image: "/images/products/obsidian-weekender.png",
    href: "/collections/the-fleet/obsidian-weekender",
    price: "$3,400",
    position: "left" as const,
  },
  {
    id: "lk-02",
    label: "The Armor",
    title: "Apex Satchel",
    sub: "Compact armor for the daily campaign.",
    image: "/images/products/apex-satchel.png",
    href: "/collections/the-armor/apex-satchel",
    price: "$1,850",
    position: "right" as const,
  },
  {
    id: "lk-03",
    label: "Hardware",
    title: "Black Card Key",
    sub: "A physical key to the private allocation room.",
    image: "/images/products/black-card-key.png",
    href: "/collections/hardware/black-card-key",
    price: "$480",
    position: "center" as const,
  },
];

function LookbookFrame({
  frame,
  index,
}: {
  frame: (typeof FRAMES)[number];
  index: number;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isCenter = frame.position === "center";

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    // Scroll parallax only — safe when backgrounded
    const ctx = gsap.context(() => {
      gsap.to(img, {
        yPercent: isCenter ? -4 : -7,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".lookbook-frame"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });
    });

    return () => ctx.revert();
  }, [isCenter]);

  const delayClass = `lookbook-frame-enter-${index + 1}`;

  return (
    <div
      className={`lookbook-frame lookbook-frame-${frame.position} ${delayClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TransitionLink
        href={frame.href}
        className="lookbook-image-link"
        aria-label={frame.title}
      >
        <div
          ref={imageRef}
          className="lookbook-image-shell"
          style={{
            transform: hovered ? "scale(1.028)" : "scale(1)",
            transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {isCenter ? (
            <Image
              src={frame.image}
              alt={frame.title}
              width={760}
              height={570}
              className="lookbook-image"
              unoptimized
            />
          ) : (
            <Image
              src={frame.image}
              alt={frame.title}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="lookbook-image"
              unoptimized
            />
          )}
        </div>
        <div className="lookbook-price-tag">{frame.price}</div>
      </TransitionLink>
      <div className="lookbook-copy">
        <p className="eyebrow">{frame.label}</p>
        <h2 className="lookbook-title">{frame.title}</h2>
        <p className="lookbook-sub">{frame.sub}</p>
        <TransitionLink href={frame.href} className="lookbook-link">
          Acquire →
        </TransitionLink>
      </div>
    </div>
  );
}

export default function LookbookClient() {
  return (
    <main className="lookbook-page">
      <div className="lookbook-hero">
        <p className="eyebrow lookbook-enter-1">House of Piranha</p>
        <h1 className="lookbook-hero-title lookbook-enter-2">The Armory</h1>
        <p className="lookbook-hero-sub lookbook-enter-3">
          Objects worn, carried, and authenticated. The private room in motion.
        </p>
        <div className="lookbook-enter-4">
          <HouseLink href="/collections/the-fleet" variant="vault" size="lg">
            View all collections
          </HouseLink>
        </div>
      </div>

      <div className="lookbook-frames">
        {FRAMES.map((frame, i) => (
          <LookbookFrame key={frame.id} frame={frame} index={i} />
        ))}
      </div>

      <div className="lookbook-footer-strip lookbook-enter-5">
        <p className="eyebrow">Encrypted provenance on every piece</p>
        <HouseLink href="/the-vault" size="lg">
          Access the Vault
        </HouseLink>
      </div>
    </main>
  );
}
