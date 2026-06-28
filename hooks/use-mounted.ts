"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve `true` sólo tras el montaje en cliente.
 * Útil para renderizar estado persistido (carrito/wishlist) sin
 * provocar errores de hidratación entre servidor y cliente.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
