"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#09090b]/95 backdrop-blur-md border-b border-[#c9a84c]/20 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <PiranhaIcon className="w-8 h-8 text-[#c9a84c] transition-transform duration-300 group-hover:scale-110" />
          <div className="flex flex-col leading-none">
            <span className="text-[#f5f0e8] text-xs tracking-[0.3em] uppercase font-light">
              House of
            </span>
            <span className="text-[#c9a84c] text-lg tracking-[0.2em] uppercase font-semibold">
              Piranha
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#c8bfa8] hover:text-[#c9a84c] text-xs tracking-[0.2em] uppercase transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#waitlist"
            className="px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.2em] uppercase hover:bg-[#c9a84c] hover:text-[#09090b] transition-all duration-300"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#c8bfa8] hover:text-[#c9a84c] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0f12]/98 backdrop-blur-md border-t border-[#c9a84c]/20 px-6 py-6">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#c8bfa8] hover:text-[#c9a84c] text-xs tracking-[0.3em] uppercase transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#waitlist"
                onClick={() => setMenuOpen(false)}
                className="inline-block px-5 py-2.5 border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.2em] uppercase hover:bg-[#c9a84c] hover:text-[#09090b] transition-all duration-300"
              >
                Join Waitlist
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

const navLinks = [
  { href: "#collection", label: "Collection" },
  { href: "#about", label: "Maison" },
  { href: "#waitlist", label: "Waitlist" },
];

function PiranhaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 20C4 20 8 10 20 10C28 10 34 15 36 20C34 25 28 30 20 30C8 30 4 20 4 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 10C20 10 22 14 22 20C22 26 20 30 20 30"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="28" cy="18" r="2" fill="currentColor" opacity="0.8" />
      <path
        d="M36 20L40 17L38 20L40 23L36 20Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M16 22C16 22 17 20 20 20C23 20 24 22 24 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
