"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import {
  useCartStore,
  selectCartSubtotal,
} from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatCLP } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

export function CartDrawer() {
  const mounted = useMounted();
  const { items, isOpen, close, removeItem, updateQuantity } = useCartStore();
  const subtotal = useCartStore(selectCartSubtotal);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Carrito de compras"
          >
            <header className="flex items-center justify-between border-b border-border p-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <ShoppingBag className="h-5 w-5 text-brand-500" />
                Tu carrito
              </h2>
              <button
                onClick={close}
                aria-label="Cerrar carrito"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-ink-600" />
                <p className="text-muted">Tu carrito está vacío.</p>
                <Button href="/catalogo" variant="outline" onClick={close}>
                  Ver catálogo
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-3 py-4">
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border border-border bg-ink-950 font-mono text-[9px] text-ink-500">
                        {item.sku}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/productos/${item.slug}`}
                          onClick={close}
                          className="line-clamp-2 text-sm font-medium hover:text-brand-400"
                        >
                          {item.name}
                        </Link>
                        <span className="mt-0.5 text-sm font-semibold text-brand-400">
                          {formatCLP(item.price)}
                        </span>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              aria-label="Disminuir cantidad"
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface-2"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              aria-label="Aumentar cantidad"
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface-2"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            aria-label="Eliminar del carrito"
                            className="grid h-7 w-7 place-items-center rounded-full text-ink-400 hover:bg-surface-2 hover:text-brand-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="space-y-4 border-t border-border p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-display text-xl font-bold">
                      {formatCLP(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs text-ink-400">
                    Despacho e impuestos calculados en el checkout.
                  </p>
                  <Button href="/checkout" size="lg" className="w-full" onClick={close}>
                    Ir a pagar
                  </Button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
