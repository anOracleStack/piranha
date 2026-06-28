"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addToCart, createCart, getCart, removeFromCart, updateCartLine } from "@/lib/shopify";
import type { Cart } from "@/types";

interface CartState {
  cart: Cart | null;
  cartId: string | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  hydrate: () => Promise<void>;
  acquire: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  clearError: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      cartId: null,
      isOpen: false,
      isLoading: false,
      error: null,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      clearError: () => set({ error: null }),
      hydrate: async () => {
        const { cartId } = get();
        if (!cartId) return;
        try {
          const cart = await getCart(cartId);
          set({ cart, cartId: cart?.id ?? null });
        } catch {
          set({ cart: null, cartId: null });
        }
      },
      acquire: async (merchandiseId, quantity = 1) => {
        set({ isLoading: true, error: null });
        const { cartId } = get();
        try {
          const cart = cartId
            ? await addToCart(cartId, [{ merchandiseId, quantity }])
            : await createCart([{ merchandiseId, quantity }]);
          set({ cart, cartId: cart.id, isLoading: false, isOpen: true });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Acquire failed.",
          });
        }
      },
      updateLine: async (lineId, quantity) => {
        const { cartId } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const cart = await updateCartLine(cartId, lineId, quantity);
          set({ cart, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Update failed.",
          });
        }
      },
      removeLine: async (lineId) => {
        const { cart, cartId } = get();
        if (!cartId) return;
        set({
          cart: cart
            ? {
                ...cart,
                lines: cart.lines.filter((line) => line.id !== lineId),
                totalQuantity: Math.max(0, cart.totalQuantity - 1),
              }
            : null,
        });
        try {
          const updatedCart = await removeFromCart(cartId, [lineId]);
          set({ cart: updatedCart });
        } catch (error) {
          set({
            cart,
            error: error instanceof Error ? error.message : "Remove failed.",
          });
        }
      },
    }),
    {
      name: "piranha-cart",
      partialize: (state) => ({ cartId: state.cartId }),
    },
  ),
);
