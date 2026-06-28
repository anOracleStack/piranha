export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-[#09090b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />

      {/* Decorative corner marks */}
      <CornerMark className="absolute top-24 left-8 md:left-16" />
      <CornerMark className="absolute top-24 right-8 md:right-16 rotate-90" />
      <CornerMark className="absolute bottom-8 left-8 md:left-16 -rotate-90" />
      <CornerMark className="absolute bottom-8 right-8 md:right-16 rotate-180" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Season label */}
        <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-8 opacity-80">
          Season I — 2025
        </p>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#f5f0e8] leading-none mb-6">
          <span className="block font-light italic">House of</span>
          <span className="block font-bold tracking-wider gold-shimmer mt-1">
            Piranha
          </span>
        </h1>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="block w-12 h-px bg-[#c9a84c]/50" />
          <p className="text-[#c8bfa8] text-xs tracking-[0.4em] uppercase">
            Luxury Redefined
          </p>
          <span className="block w-12 h-px bg-[#c9a84c]/50" />
        </div>

        {/* Description */}
        <p className="text-[#c8bfa8] text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-12">
          An exclusive collection where predatory elegance meets artisanal
          craft. Forged for those who command attention without seeking it.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="w-full sm:w-auto px-10 py-4 bg-[#c9a84c] text-[#09090b] text-xs tracking-[0.3em] uppercase font-semibold hover:bg-[#e4c97a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          >
            Join the Waitlist
          </a>
          <a
            href="#collection"
            className="w-full sm:w-auto px-10 py-4 border border-[#c9a84c]/40 text-[#c8bfa8] text-xs tracking-[0.3em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
          >
            Preview Collection
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[#c8bfa8] text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function CornerMark({ className }: { className?: string }) {
  return (
    <div className={`w-5 h-5 opacity-30 ${className}`}>
      <div className="w-full h-px bg-[#c9a84c]" />
      <div className="w-px h-full bg-[#c9a84c]" />
    </div>
  );
}
