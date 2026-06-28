import type { Metadata } from "next";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { HouseLink } from "@/components/ui/HouseButton";

export const metadata: Metadata = {
  title: "The House",
  description:
    "House of Piranha was built for those who move through the world differently. Obsidian leather. House gold hardware. Armor of luxury.",
};

const CHAPTERS = [
  {
    eyebrow: "Origin",
    heading: "Built from the Water.",
    body: "House of Piranha did not begin in a studio. It began in a decision. A refusal to carry something that didn't bite back. The bag you carry is armor — and most armor is forgettable. We built ours to be the opposite.",
  },
  {
    eyebrow: "Materials",
    heading: "Obsidian Leather. House Gold Hardware.",
    body: "Every piece starts with full-grain leather in Obsidian — the color of still water at depth. Hardware is cast in House Gold. The brass cools into forms that feel inevitable, like they could not have been any other way. Nothing is decorative. Everything holds.",
  },
  {
    eyebrow: "Philosophy",
    heading: "Luxury That Bites Back.",
    body: "Luxury has been gentled. Softened. Made agreeable. We have no interest in agreeable. House of Piranha is for people who understand that the finest things are not quiet — they are precise. Armor has an edge. So does ours.",
  },
  {
    eyebrow: "Authentication",
    heading: "The Digital Product Passport.",
    body: "Every piece carries a cryptographically signed Digital Product Passport. Your ownership is permanent, provable, and private. The Vault stores it. The Passport travels with the piece. Long after the receipt fades, the record holds.",
  },
];

export default function TheHousePage() {
  return (
    <main>
      {/* Hero */}
      <section className="the-house-hero">
        <ScrollReveal>
          <p className="eyebrow">House of Piranha</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="the-house-h1">
            Not Prey.<br />Piranhas.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="the-house-sub">
            Armor of Luxury. Built for movement. Signed by provenance.
          </p>
        </ScrollReveal>
      </section>

      {/* Pull quote */}
      <section className="the-house-quote-section">
        <ScrollReveal>
          <blockquote className="the-house-blockquote">
            &ldquo;Luxury That Bites Back.&rdquo;
          </blockquote>
        </ScrollReveal>
      </section>

      {/* Chapters */}
      <section className="the-house-chapters" aria-label="Brand story">
        {CHAPTERS.map((ch, i) => (
          <ScrollReveal key={ch.eyebrow} delay={i % 2 === 0 ? 0 : 100}>
            <article className="the-house-chapter">
              <p className="eyebrow">{ch.eyebrow}</p>
              <h2 className="the-house-chapter-h2">{ch.heading}</h2>
              <p className="the-house-chapter-body">{ch.body}</p>
            </article>
          </ScrollReveal>
        ))}
      </section>

      {/* CTA */}
      <section className="the-house-cta-section">
        <ScrollReveal>
          <p className="eyebrow">Enter</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="the-house-cta-h2">The Armory Is Open.</h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="the-house-cta-buttons">
            <HouseLink href="/collections/the-fleet" variant="gold" size="lg">
              Enter The Fleet
            </HouseLink>
            <HouseLink href="/collections/the-armor" variant="vault" size="lg">
              Enter The Armor
            </HouseLink>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
