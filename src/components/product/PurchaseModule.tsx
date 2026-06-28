"use client";

import { Check, Fingerprint, LockKeyhole, Minus, Plus, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { HouseButton } from "@/components/ui/HouseButton";
import TransitionLink from "@/components/ui/TransitionLink";
import { formatMoney } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

export default function PurchaseModule({ product, dppUrl }: { product: Product; dppUrl: string }) {
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants[0];
  const acquire = useCartStore((state) => state.acquire);
  const isLoading = useCartStore((state) => state.isLoading);
  const total = useMemo(
    () => ({
      amount: (Number(variant.price.amount) * quantity).toFixed(2),
      currencyCode: variant.price.currencyCode,
    }),
    [quantity, variant.price.amount, variant.price.currencyCode],
  );

  return (
    <aside className="purchase-module">
      <p className="eyebrow">{product.category.replace("-", " ")}</p>
      <h1>{product.title}</h1>
      <p className="purchase-tagline">{product.tagline}</p>
      <div className="purchase-price">{formatMoney(total)}</div>

      <div className="quantity-stepper" aria-label="Quantity">
        <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
          <Minus className="size-4" aria-hidden />
        </button>
        <span>{quantity}</span>
        <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
          <Plus className="size-4" aria-hidden />
        </button>
      </div>

      <HouseButton
        type="button"
        size="lg"
        loading={isLoading}
        disabled={!variant.availableForSale}
        onClick={() => acquire(variant.id, quantity)}
        className="w-full justify-center"
      >
        {variant.availableForSale ? "Acquire" : "Vault allocation"}
      </HouseButton>

      <div className="purchase-icons">
        <div>
          <ShoppingBag className="size-4" aria-hidden />
          Private checkout
        </div>
        <div>
          <Fingerprint className="size-4" aria-hidden />
          DPP ready
        </div>
        <div>
          <LockKeyhole className="size-4" aria-hidden />
          Vault service
        </div>
      </div>

      <div className="spec-list">
        <Spec label="Materials" value={product.materials.join(", ")} />
        <Spec label="Dimensions" value={product.dimensions} />
        <Spec label="Hardware" value={product.hardware} />
      </div>

      <TransitionLink href={dppUrl} className="passport-link">
        <Check className="size-4" aria-hidden />
        View digital passport
      </TransitionLink>
    </aside>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
