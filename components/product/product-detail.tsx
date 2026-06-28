"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Truck, ShieldCheck, MessageCircle, Check } from "lucide-react";
import type { Product } from "@/types";
import { ProductImage } from "@/components/ui/product-image";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { WishlistButton } from "@/components/product/wishlist-button";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { effectivePrice, discountPercent } from "@/lib/data/products";
import { getBrandName } from "@/lib/data/brands";
import { formatCLP, cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";

export function ProductDetail({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const price = effectivePrice(product);
  const discount = discountPercent(product);
  const soldOut = product.stock <= 0;

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Galería */}
      <div className="lg:sticky lg:top-40 lg:self-start">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <ProductImage
            product={product}
            className="aspect-square w-full"
            iconClassName="h-40 w-40"
            priority
          />
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {discount > 0 && (
              <span className="rounded-full bg-brand-500 px-3 py-1 text-sm font-bold text-white">
                -{discount}%
              </span>
            )}
            {product.badges.map((b) => (
              <Badge key={b} badge={b} />
            ))}
          </div>
          <WishlistButton
            productId={product.id}
            className="absolute right-4 top-4 h-11 w-11"
          />
        </div>
        {/* Miniaturas (decorativas, mismo visual) */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "overflow-hidden rounded-xl border",
                i === 0 ? "border-brand-500" : "border-border opacity-60",
              )}
            >
              <ProductImage
                product={product}
                className="aspect-square w-full"
                iconClassName="h-7 w-7"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="flex items-center gap-3">
          <Link
            href={`/catalogo?marca=${product.brand}`}
            className="text-sm font-semibold uppercase tracking-wider text-brand-600"
          >
            {getBrandName(product.brand)}
          </Link>
          <span className="text-xs text-ink-500">SKU: {product.sku}</span>
        </div>

        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {product.name}
        </h1>

        <div className="mt-3">
          <StarRating rating={product.rating} reviews={product.reviews} size={16} />
        </div>

        <p className="mt-5 text-ink-300">{product.description}</p>

        {/* Precio */}
        <div className="mt-6 flex items-end gap-3">
          <span className="font-display text-4xl font-black">
            {formatCLP(price)}
          </span>
          {product.salePrice && (
            <span className="mb-1 text-lg text-ink-400 line-through">
              {formatCLP(product.price)}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-ink-400">
          Precio con IVA incluido · Hasta en cuotas con WebPay o Mercado Pago
        </p>

        {/* Stock */}
        <p className="mt-4 text-sm">
          {soldOut ? (
            <span className="text-ink-400">Sin stock — consúltanos disponibilidad</span>
          ) : product.stock <= 4 ? (
            <span className="font-medium text-amber-600">
              ¡Solo quedan {product.stock} unidades!
            </span>
          ) : (
            <span className="text-emerald-600">● En stock — despacho inmediato</span>
          )}
        </p>

        {/* Cantidad + acciones */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Disminuir cantidad"
              className="grid h-12 w-12 place-items-center rounded-full hover:bg-surface-2"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-semibold tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
              aria-label="Aumentar cantidad"
              className="grid h-12 w-12 place-items-center rounded-full hover:bg-surface-2"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleAdd}
            disabled={soldOut}
            className="flex-1"
          >
            {added ? (
              <>
                <Check className="h-5 w-5" /> Agregado al carrito
              </>
            ) : (
              "Agregar al carrito"
            )}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <Button href="/cotizar" variant="secondary" size="lg" className="flex-1">
            Cotizar este producto
          </Button>
          <Button
            href={whatsappLink(
              `Hola IRONHAUS 👋, me interesa el producto ${product.name} (SKU ${product.sku}).`,
            )}
            variant="outline"
            size="lg"
            target="_blank"
          >
            <MessageCircle className="h-5 w-5" />
            Consultar
          </Button>
        </div>

        {/* Garantías */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-3 text-sm">
            <Truck className="h-5 w-5 text-brand-500" />
            Despacho a todo Chile
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-3 text-sm">
            <ShieldCheck className="h-5 w-5 text-brand-500" />
            Garantía oficial
          </div>
        </div>

        {/* Especificaciones */}
        <div className="mt-8">
          <h2 className="font-display text-lg font-bold">Especificaciones</h2>
          <dl className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {product.specs.map((s) => (
              <div
                key={s.label}
                className="flex justify-between gap-4 bg-surface px-4 py-3 text-sm"
              >
                <dt className="text-ink-400">{s.label}</dt>
                <dd className="text-right font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Highlights */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {product.highlights.map((h) => (
            <li
              key={h}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm"
            >
              <Check className="h-3.5 w-3.5 text-brand-600" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
