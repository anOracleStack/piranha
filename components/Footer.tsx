export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#09090b] border-t border-[#1c1c22] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-px bg-[#c9a84c]" />
              <p className="text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase">
                House of Piranha
              </p>
            </div>
            <p className="text-[#6b6658] text-xs leading-relaxed max-w-xs">
              An exclusive luxury atelier. Season I launching 2025.
              <br />
              Paris · London · New York
            </p>
            {/* Social */}
            <div className="flex gap-5 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[#6b6658] hover:text-[#c9a84c] transition-colors duration-200 text-xs tracking-wider"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#c8bfa8] text-[10px] tracking-[0.4em] uppercase mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {footerLinks.nav.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[#6b6658] hover:text-[#c8bfa8] text-xs tracking-wider transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[#c8bfa8] text-[10px] tracking-[0.4em] uppercase mb-5">
              Legal
            </p>
            <ul className="space-y-3">
              {footerLinks.legal.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[#6b6658] hover:text-[#c8bfa8] text-xs tracking-wider transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-line mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6b6658] text-[11px] tracking-wider">
            © {year} House of Piranha. All rights reserved.
          </p>
          <p className="text-[#6b6658] text-[11px] tracking-wider">
            Crafted with obsessive precision.
          </p>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/houseofpiranha" },
  { label: "Twitter", href: "https://twitter.com/houseofpiranha" },
];

const footerLinks = {
  nav: [
    { label: "Collection", href: "#collection" },
    { label: "Maison", href: "#about" },
    { label: "Join Waitlist", href: "#waitlist" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "mailto:contact@houseofpiranha.com" },
  ],
};
