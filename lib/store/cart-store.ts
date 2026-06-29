"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { effectivePrice } from "@/lib/data/products";

interface CartState {
  items: CartItem[];
  /** Controla la apertura del drawer del carrito. */
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === product.id,
          );
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((i) =>
                i.productId === product.id
                  ? {
                      ...i,
                      quantity: Math.min(
                        i.quantity + quantity,
                        product.stock || 99,
                      ),
                    }
                  : i,
              ),
            };
          }
          const item: CartItem = {
            productId: product.id,
            sku: product.sku,
            slug: product.slug,
            name: product.name,
            price: effectivePrice(product),
            quantity,
          };
          return { isOpen: true, items: [...state.items, item] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId
                ? { ...i, quantity: Math.max(0, quantity) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "creafitness-cart", partialize: (s) => ({ items: s.items }) },
  ),
);

/** Selectores derivados (evitan recalcular en cada componente). */
export const selectCartCount = (s: CartState): number =>
  s.items.reduce((acc, i) => acc + i.quantity, 0);

export const selectCartSubtotal = (s: CartState): number =>
  s.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
