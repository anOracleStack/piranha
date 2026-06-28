"use client";

import Link from "next/link";
import { Gem, Home, KeyRound, ShoppingBag, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";

const mobileItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/collections/the-fleet", label: "Fleet", icon: Gem },
  { href: "/collections/the-armor", label: "Armor", icon: Shield },
  { href: "/the-vault", label: "Vault", icon: KeyRound },
];

export default function MobileBottomDock() {
  const pathname = usePathname();
  const openCart = useCartStore((state) => state.openCart);

  return (
    <nav className="mobile-dock" aria-label="Mobile navigation">
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? "dock-item dock-item-active" : "dock-item"}>
            <Icon className="size-5" aria-hidden />
            <span>{item.label}</span>
          </Link>
        );
      })}
      <button className="dock-item" type="button" onClick={openCart}>
        <ShoppingBag className="size-5" aria-hidden />
        <span>Cart</span>
      </button>
    </nav>
  );
}
