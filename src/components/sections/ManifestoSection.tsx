import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { HouseLink } from "@/components/ui/HouseButton";

export default function ManifestoSection() {
  return (
    <section className="manifesto-v2" aria-label="House of Piranha — The Manifesto">
      <div className="manifesto-v2-grid">
        {/* Left: Crest */}
        <ScrollReveal>
          <div className="manifesto-crest-wrap">
            <div className="manifesto-crest-glow" aria-hidden />
            <Image
              src="/images/brand/logo-gold.svg"
              alt="House of Piranha Coat of Arms — The Piranha Crest"
              width={500}
              height={500}
              unoptimized
            />
          </div>
        </ScrollReveal>

        {/* Right: Manifesto copy */}
        <div className="manifesto-v2-copy">
          <ScrollReveal>
            <p className="eyebrow">The House — Our Ethos</p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="manifesto-v2-h2">
              Not Prey.<br />
              <span className="manifesto-gold-text">Piranhas.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="manifesto-v2-body">
              House of Piranha was not built to fit into the luxury conversation.
              It was built to end it. We forge armor for those who move with
              intention — executives, athletes, and architects of culture who
              understand that what you carry says everything.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="manifesto-v2-body">
              Our leather is structured. Our hardware is forged. Our crest is
              earned. This is not a logo. This is a declaration.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <blockquote className="manifesto-blockquote">
              <p>"Luxury That Bites Back."</p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <HouseLink href="/the-house" variant="quiet" size="md">
              Enter The House
            </HouseLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
