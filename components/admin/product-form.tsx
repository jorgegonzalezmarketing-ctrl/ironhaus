import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";
import type { Product, ProductBadge } from "@/types";

const allBadges: { value: ProductBadge; label: string }[] = [
  { value: "nuevo", label: "Nuevo" },
  { value: "oferta", label: "Oferta" },
  { value: "mas-vendido", label: "Más vendido" },
  { value: "premium", label: "Premium" },
  { value: "agotado", label: "Agotado" },
];

const inputCls =
  "h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none focus:border-brand-500";
const labelCls = "mb-1.5 block text-sm font-medium text-ink-200";

/**
 * Formulario compartido para crear/editar productos.
 * `action` es una Server Action que recibe el FormData.
 */
export function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  product?: Product;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-6">
      {/* Básico */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-4 font-display font-bold">Información básica</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelCls}>Nombre *</span>
            <input name="name" required defaultValue={product?.name} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>SKU *</span>
            <input name="sku" required defaultValue={product?.sku} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Slug (URL) *</span>
            <input name="slug" required defaultValue={product?.slug} placeholder="trotadora-pro-x" className={inputCls} />
          </label>
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
          <label className="block sm:col-span-2">
            <span className={labelCls}>Descripción corta *</span>
            <input name="shortDescription" required defaultValue={product?.shortDescription} className={inputCls} />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelCls}>Descripción completa</span>
            <textarea name="description" rows={4} defaultValue={product?.description} className={`${inputCls} h-auto py-2.5`} />
          </label>
        </div>
      </div>

      {/* Precio y stock */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-4 font-display font-bold">Precio y stock</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className={labelCls}>Precio (CLP) *</span>
            <input name="price" required inputMode="numeric" defaultValue={product?.price} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Precio oferta (CLP)</span>
            <input name="salePrice" inputMode="numeric" defaultValue={product?.salePrice ?? ""} placeholder="Opcional" className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Stock *</span>
            <input name="stock" required inputMode="numeric" defaultValue={product?.stock ?? 0} className={inputCls} />
          </label>
        </div>
      </div>

      {/* Imagen */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-4 font-display font-bold">Imagen</h2>
        <label className="block">
          <span className={labelCls}>URL de imagen</span>
          <input name="imageUrl" defaultValue={product?.imageUrl ?? ""} placeholder="https://… (opcional; si se deja vacío usa el visual generado)" className={inputCls} />
        </label>
        <p className="mt-2 text-xs text-ink-400">
          Pega la URL de una foto. (La subida de archivos se activa al conectar el almacenamiento en la nube.)
        </p>
      </div>

      {/* Detalles */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-4 font-display font-bold">Detalles</h2>
        <div className="space-y-4">
          <div>
            <span className={labelCls}>Etiquetas</span>
            <div className="flex flex-wrap gap-3">
              {allBadges.map((b) => (
                <label key={b.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="badges"
                    value={b.value}
                    defaultChecked={product?.badges.includes(b.value)}
                    className="h-4 w-4 accent-brand-500"
                  />
                  {b.label}
                </label>
              ))}
            </div>
          </div>
          <label className="block">
            <span className={labelCls}>Destacados (uno por línea)</span>
            <textarea name="highlights" rows={3} defaultValue={product?.highlights.join("\n")} className={`${inputCls} h-auto py-2.5`} />
          </label>
          <label className="block">
            <span className={labelCls}>Especificaciones (formato “Etiqueta: Valor”, una por línea)</span>
            <textarea
              name="specs"
              rows={4}
              defaultValue={product?.specs.map((s) => `${s.label}: ${s.value}`).join("\n")}
              placeholder={"Motor: 4 HP\nVelocidad: 1-22 km/h"}
              className={`${inputCls} h-auto py-2.5`}
            />
          </label>
          <label className="block">
            <span className={labelCls}>IDs de productos relacionados (separados por coma)</span>
            <input name="relatedIds" defaultValue={product?.relatedIds.join(", ")} placeholder="p-001, p-002" className={inputCls} />
          </label>
          <div className="flex flex-wrap gap-5 pt-1">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" defaultChecked={product?.featured} className="h-4 w-4 accent-brand-500" />
              Destacar en la home
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked={product ? product.active !== false : true} className="h-4 w-4 accent-brand-500" />
              Visible en la tienda
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="h-11 rounded-full bg-brand-500 px-6 font-semibold text-white hover:bg-brand-600"
        >
          {submitLabel}
        </button>
        <Link href="/admin/productos" className="text-sm text-ink-400 hover:text-foreground">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
