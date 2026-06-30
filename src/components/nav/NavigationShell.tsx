"use client";

import Image from "next/image";
import { ShoppingBag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SoundController from "@/components/ui/SoundController";
import TransitionLink from "@/components/ui/TransitionLink";
import { useCartStore } from "@/store/cart";

const navItems = [
  { href: "/collections/the-fleet", label: "The Fleet" },
  { href: "/collections/the-armor", label: "The Armor" },
  { href: "/collections/hardware", label: "Hardware" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/the-vault", label: "The Vault" },
];

export default function NavigationShell() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const openCart = useCartStore((state) => state.openCart);
  const total = useCartStore((state) => state.cart?.totalQuantity ?? 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
      {/* Brand mark — fish logo + text */}
      <TransitionLink href="/" className="brand-mark" aria-label="House of Piranha home">
        <Image src="/images/brand/logo-gold.svg" alt="" width={40} height={40} priority unoptimized />
        <div className="brand-text">
          <span className="brand-subtext">House of</span>
          <span className="brand-maintext">Piranha</span>
        </div>
      </TransitionLink>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <TransitionLink
            key={item.href}
            href={item.href}
            className={pathname.startsWith(item.href) ? "nav-link nav-link-active" : "nav-link"}
          >
            {item.label}
          </TransitionLink>
        ))}
      </nav>

      <div className="nav-actions">
        <SoundController />
        <TransitionLink className="icon-button" href="/the-vault" aria-label="Open Vault" title="Open Vault">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </TransitionLink>
        <button className="icon-button cart-button" type="button" onClick={openCart} aria-label="Open Cart" title="Open Cart">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {total > 0 ? <span className="cart-count">{total}</span> : null}
        </button>
      </div>
    </header>
  );
}
