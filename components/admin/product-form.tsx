"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Camera,
  Sparkles,
  Check,
  Settings2,
} from "lucide-react";
import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";
import type { Product, ProductBadge } from "@/types";
import { cn } from "@/lib/utils";

const allBadges: { value: ProductBadge; label: string }[] = [
  { value: "mas-vendido", label: "Más vendido" },
  { value: "oferta", label: "Oferta" },
  { value: "nuevo", label: "Nuevo" },
  { value: "premium", label: "Premium" },
];

const inputCls =
  "h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none transition-colors focus:border-brand-500";
const labelCls = "mb-1.5 block text-sm font-medium text-ink-200";
const helpCls = "mt-1 text-xs text-ink-400";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  product?: Product;
  submitLabel: string;
}) {
  const isNew = !product;

  const [name, setName] = useState(product?.name ?? "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Código (SKU) y enlace (slug): se generan solos a partir del nombre.
  const [skuSuffix] = useState(() => Math.floor(100 + Math.random() * 900));
  const [manualSku, setManualSku] = useState(product?.sku ?? "");
  const [manualSlug, setManualSlug] = useState(product?.slug ?? "");

  const autoSlug = slugify(name) || "producto";
  const autoSku =
    (slugify(name).replace(/-/g, "").slice(0, 6).toUpperCase() || "PROD") +
    "-" +
    skuSuffix;

  const slug = isNew ? manualSlug || autoSlug : manualSlug || product!.slug;
  const sku = isNew ? manualSku || autoSku : manualSku || product!.sku;

  // Características (filas nombre + valor)
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(
    product?.specs.length ? product.specs : [{ label: "", value: "" }],
  );
  // Puntos destacados (lista simple)
  const [highlights, setHighlights] = useState<string[]>(
    product?.highlights.length ? product.highlights : [""],
  );

  const specsText = specs
    .filter((s) => s.label.trim() && s.value.trim())
    .map((s) => `${s.label.trim()}: ${s.value.trim()}`)
    .join("\n");
  const highlightsText = highlights
    .map((h) => h.trim())
    .filter(Boolean)
    .join("\n");

  return (
    <form action={action} className="space-y-5 pb-12">
      {/* Campos calculados / preservados */}
      <input type="hidden" name="sku" value={sku} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="specs" value={specsText} />
      <input type="hidden" name="highlights" value={highlightsText} />
      <input
        type="hidden"
        name="relatedIds"
        value={(product?.relatedIds ?? []).join(", ")}
      />

      {/* 1 · Lo básico */}
      <section className="rounded-2xl border border-border bg-surface p-5 md:p-6">
        <h2 className="mb-1 font-display text-lg font-bold">1 · Lo básico</h2>
        <p className="mb-5 text-sm text-ink-400">
          El nombre y a qué grupo pertenece el producto.
        </p>

        <div className="space-y-4">
          <label className="block">
            <span className={labelCls}>Nombre del producto *</span>
            <input
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Trotadora Comercial Pro"
              className={inputCls}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Categoría *</span>
              <select name="category" required defaultValue={product?.category} className={inputCls}>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Marca *</span>
              <select name="brand" required defaultValue={product?.brand} className={inputCls}>
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>{b.name}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className={labelCls}>Descripción corta *</span>
            <input
              name="shortDescription"
              required
              defaultValue={product?.shortDescription}
              placeholder="Una frase que resuma el producto"
              className={inputCls}
            />
            <span className={helpCls}>
              Aparece debajo del nombre en el listado.
            </span>
          </label>

          <label className="block">
            <span className={labelCls}>Descripción completa</span>
            <textarea
              name="description"
              rows={4}
              defaultValue={product?.description}
              placeholder="Cuenta los detalles, materiales, para qué sirve…"
              className={`${inputCls} h-auto py-2.5`}
            />
          </label>

          {/* Código automático */}
          <div className="rounded-lg border border-dashed border-border bg-ink-950 px-3 py-2.5 text-xs text-ink-400">
            <span className="font-medium text-ink-300">
              Código automático:
            </span>{" "}
            <span className="font-mono">{sku}</span> · enlace:{" "}
            <span className="font-mono">/productos/{slug}</span>
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="ml-2 inline-flex items-center gap-1 font-medium text-brand-600 hover:underline"
            >
              <Settings2 className="h-3 w-3" />
              {showAdvanced ? "ocultar" : "editar"}
            </button>
            {showAdvanced && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-ink-300">Código (SKU)</span>
                  <input
                    value={sku}
                    onChange={(e) => setManualSku(e.target.value)}
                    className={`${inputCls} h-9`}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-ink-300">Enlace (slug)</span>
                  <input
                    value={slug}
                    onChange={(e) => setManualSlug(e.target.value)}
                    className={`${inputCls} h-9`}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2 · Foto */}
      <section className="rounded-2xl border border-border bg-surface p-5 md:p-6">
        <h2 className="mb-1 font-display text-lg font-bold">2 · Foto</h2>
        <p className="mb-5 text-sm text-ink-400">
          Pega el enlace de una foto y la verás al instante.
        </p>

        <div className="grid gap-4 sm:grid-cols-[160px_1fr] sm:items-start">
          {/* Vista previa */}
          <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-xl border border-border bg-ink-950 sm:w-40">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Vista previa"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-ink-500">
                <Camera className="h-7 w-7" />
                <span className="text-xs">Sin foto</span>
              </div>
            )}
          </div>

          <div>
            <label className="block">
              <span className={labelCls}>Enlace de la foto</span>
              <input
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://…"
                className={inputCls}
              />
            </label>
            <p className={helpCls}>
              💡 ¿Cómo obtener el enlace? En cualquier foto de internet: clic
              derecho → <em>“Copiar dirección de la imagen”</em> y pégalo aquí.
              Si lo dejas vacío, se usa una imagen genérica.
            </p>
          </div>
        </div>
      </section>

      {/* 3 · Precio y stock */}
      <section className="rounded-2xl border border-border bg-surface p-5 md:p-6">
        <h2 className="mb-1 font-display text-lg font-bold">3 · Precio y stock</h2>
        <p className="mb-5 text-sm text-ink-400">
          El precio normal, una oferta (opcional) y cuántas unidades tienes.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className={labelCls}>Precio *</span>
            <div className="flex items-center rounded-lg border border-border bg-ink-950 focus-within:border-brand-500">
              <span className="pl-3 text-ink-400">$</span>
              <input
                name="price"
                required
                inputMode="numeric"
                defaultValue={product?.price}
                placeholder="0"
                className="h-11 w-full bg-transparent px-2 text-sm outline-none"
              />
            </div>
          </label>
          <label className="block">
            <span className={labelCls}>Precio oferta</span>
            <div className="flex items-center rounded-lg border border-border bg-ink-950 focus-within:border-brand-500">
              <span className="pl-3 text-ink-400">$</span>
              <input
                name="salePrice"
                inputMode="numeric"
                defaultValue={product?.salePrice ?? ""}
                placeholder="Opcional"
                className="h-11 w-full bg-transparent px-2 text-sm outline-none"
              />
            </div>
            <span className={helpCls}>Si lo llenas, muestra el descuento.</span>
          </label>
          <label className="block">
            <span className={labelCls}>Stock (unidades) *</span>
            <input
              name="stock"
              required
              inputMode="numeric"
              defaultValue={product?.stock ?? 0}
              className={inputCls}
            />
          </label>
        </div>
      </section>

      {/* 4 · Detalles (opcional) */}
      <section className="rounded-2xl border border-border bg-surface p-5 md:p-6">
        <h2 className="mb-1 font-display text-lg font-bold">
          4 · Detalles <span className="text-sm font-normal text-ink-400">(opcional)</span>
        </h2>
        <p className="mb-5 text-sm text-ink-400">
          Lo que hace especial al producto. Puedes dejarlo para después.
        </p>

        {/* Etiquetas */}
        <div className="mb-6">
          <span className={labelCls}>Etiquetas para destacarlo</span>
          <div className="flex flex-wrap gap-2">
            {allBadges.map((b) => (
              <label
                key={b.value}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-ink-950 px-3 py-1.5 text-sm has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500/10 has-[:checked]:text-brand-700"
              >
                <input
                  type="checkbox"
                  name="badges"
                  value={b.value}
                  defaultChecked={product?.badges.includes(b.value)}
                  className="h-3.5 w-3.5 accent-brand-500"
                />
                {b.label}
              </label>
            ))}
          </div>
        </div>

        {/* Puntos destacados */}
        <div className="mb-6">
          <span className={labelCls}>Puntos destacados</span>
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-brand-500" />
                <input
                  value={h}
                  onChange={(e) => {
                    const next = [...highlights];
                    next[i] = e.target.value;
                    setHighlights(next);
                  }}
                  placeholder="Ej: Motor de 4 HP"
                  className={`${inputCls} h-10`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setHighlights(highlights.filter((_, j) => j !== i))
                  }
                  aria-label="Quitar"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-ink-400 hover:bg-red-500/10 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setHighlights([...highlights, ""])}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
          >
            <Plus className="h-4 w-4" /> Agregar punto
          </button>
        </div>

        {/* Características */}
        <div className="mb-6">
          <span className={labelCls}>Características técnicas</span>
          <div className="space-y-2">
            {specs.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={s.label}
                  onChange={(e) => {
                    const next = [...specs];
                    next[i] = { ...next[i], label: e.target.value };
                    setSpecs(next);
                  }}
                  placeholder="Característica (ej: Peso)"
                  className={`${inputCls} h-10 sm:max-w-[40%]`}
                />
                <input
                  value={s.value}
                  onChange={(e) => {
                    const next = [...specs];
                    next[i] = { ...next[i], value: e.target.value };
                    setSpecs(next);
                  }}
                  placeholder="Valor (ej: 120 kg)"
                  className={`${inputCls} h-10`}
                />
                <button
                  type="button"
                  onClick={() => setSpecs(specs.filter((_, j) => j !== i))}
                  aria-label="Quitar"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-ink-400 hover:bg-red-500/10 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSpecs([...specs, { label: "", value: "" }])}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
          >
            <Plus className="h-4 w-4" /> Agregar característica
          </button>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:gap-8">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={product?.featured} className="h-4 w-4 accent-brand-500" />
            ⭐ Mostrar en la página de inicio
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" name="active" defaultChecked={product ? product.active !== false : true} className="h-4 w-4 accent-brand-500" />
            👁️ Visible en la tienda
          </label>
        </div>
      </section>

      {/* Guardar */}
      <div className="sticky bottom-0 -mx-4 flex items-center gap-3 border-t border-border bg-background/90 px-4 py-3 backdrop-blur md:mx-0 md:rounded-2xl md:border md:px-5">
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-6 font-semibold text-white hover:bg-brand-600"
        >
          <Check className="h-4 w-4" />
          {submitLabel}
        </button>
        <Link href="/admin/productos" className="text-sm text-ink-400 hover:text-foreground">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
