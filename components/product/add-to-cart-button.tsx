"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

export function AddToCartButton({
  product,
  quantity = 1,
  size = "md",
  full = false,
}: {
  product: Product;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  full?: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <Button
      type="button"
      size={size}
      onClick={handleAdd}
      disabled={soldOut}
      className={full ? "w-full" : undefined}
    >
      {soldOut ? (
        "Agotado"
      ) : added ? (
        <>
          <Check className="h-4 w-4" /> Agregado
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" /> Agregar al carrito
        </>
      )}
    </Button>
  );
}
