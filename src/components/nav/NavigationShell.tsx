"use client";

import Image from "next/image";
import Link from "next/link";
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
      {/* Brand mark — uses high-quality piranha-logo.jpeg */}
      <TransitionLink href="/" className="brand-mark" aria-label="House of Piranha home">
        <Image src="/piranha-logo.jpeg" alt="" width={36} height={36} priority unoptimized />
        <span>House of Piranha</span>
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
          <UserRound className="size-4" aria-hidden />
        </TransitionLink>
        <button className="icon-button cart-button" type="button" onClick={openCart} aria-label="Open cart" title="Open cart">
          <ShoppingBag className="size-4" aria-hidden />
          {total > 0 ? <span className="cart-count">{total}</span> : null}
        </button>
      </div>
    </header>
  );
}
