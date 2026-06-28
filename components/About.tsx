export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#0f0f12]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Decorative frame */}
              <div className="absolute inset-6 border border-[#c9a84c]/15" />
              <div className="absolute inset-0 border border-[#c9a84c]/8" />

              {/* Central motif */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a84c]/40 to-transparent mx-auto mb-6" />
                  <p className="font-display text-6xl text-[#c9a84c]/20 font-bold italic tracking-wider">
                    HP
                  </p>
                  <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a84c]/40 to-transparent mx-auto mt-6" />
                </div>
              </div>

              {/* Corner accents */}
              {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map(
                (pos, i) => (
                  <div key={i} className={`absolute ${pos} w-4 h-4`}>
                    <div className="w-full h-px bg-[#c9a84c]/50" />
                    <div className="w-px h-full bg-[#c9a84c]/50" />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right — copy */}
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-6">
              Maison Piranha
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] font-light italic leading-tight mb-8">
              Born from the depths.
              <br />
              <span className="text-[#c9a84c]">Worn at the summit.</span>
            </h2>

            <div className="space-y-5 text-[#c8bfa8] text-sm leading-relaxed font-light">
              <p>
                House of Piranha is a luxury atelier built on contradiction —
                the raw ferocity of nature distilled into pieces of refined
                beauty. Each creation honors the piranha&apos;s paradox: feared
                yet elegant, instinctive yet precise.
              </p>
              <p>
                Our inaugural collection is an exploration of predatory
                elegance. From hand-burnished leathers sourced from heritage
                tanneries to hardware forged in 18k gold vermeil, every detail
                is considered, every element earned.
              </p>
              <p>
                We make fewer than 50 pieces per season. Not as a marketing
                conceit, but because quality demands it.
              </p>
            </div>

            {/* Signature values */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#1c1c22] pt-10">
              {values.map((v) => (
                <div key={v.label}>
                  <p className="text-[#c9a84c] text-2xl font-light mb-1">
                    {v.stat}
                  </p>
                  <p className="text-[#6b6658] text-[10px] tracking-[0.2em] uppercase leading-relaxed">
                    {v.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const values = [
  { stat: "<50", label: "Pieces per season" },
  { stat: "100%", label: "Artisanal craft" },
  { stat: "∞", label: "Generational design" },
];
