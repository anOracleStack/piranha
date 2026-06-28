"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { formatMoney } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export default function CartDrawer() {
  const cart = useCartStore((state) => state.cart);
  const hydrate = useCartStore((state) => state.hydrate);
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeLine = useCartStore((state) => state.removeLine);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return (
    <div className={`cart-overlay ${isOpen ? "cart-overlay-open" : ""}`} aria-hidden={!isOpen}>
      <button className="cart-scrim" type="button" onClick={closeCart} aria-label="Close cart" tabIndex={isOpen ? 0 : -1} />
      <aside className="cart-drawer" aria-label="Acquisition cart">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Private order</p>
            <h2>Acquisitions</h2>
          </div>
          <button className="icon-button" type="button" onClick={closeCart} aria-label="Close cart">
            <X className="size-4" aria-hidden />
          </button>
        </div>

        {cart?.lines.length ? (
          <div className="cart-lines">
            {cart.lines.map((line) => (
              <div className="cart-line" key={line.id}>
                <div>
                  <p>{line.product.title}</p>
                  <span>
                    {line.quantity} x {formatMoney(line.merchandise.price)}
                  </span>
                </div>
                <button type="button" onClick={() => removeLine(line.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="cart-empty">
            <p>The acquisition tray is empty.</p>
          </div>
        )}

        <div className="cart-footer">
          <div>
            <span>Subtotal</span>
            <strong>{formatMoney(cart?.cost.subtotalAmount ?? { amount: "0", currencyCode: "USD" })}</strong>
          </div>
          <Link className="house-button button-gold button-lg justify-center" href={cart?.checkoutUrl ?? "/concierge"}>
            Begin private checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
