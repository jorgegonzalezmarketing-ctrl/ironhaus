import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatCLP } from "@/lib/utils";
import { getCategory } from "@/lib/data/categories";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export const dynamic = "force-dynamic";

export default async function AdminProductos() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold md:text-3xl">
            Productos
          </h1>
          <p className="mt-1 text-sm text-ink-400">
            {products.length} productos en el catálogo.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" /> Nuevo producto
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-ink-400">
              <th className="p-4 font-medium">Producto</th>
              <th className="p-4 font-medium">Categoría</th>
              <th className="p-4 font-medium">Precio</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-surface-2">
                <td className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="font-mono text-xs text-ink-400">{p.sku}</p>
                </td>
                <td className="p-4 text-ink-300">
                  {getCategory(p.category)?.shortName ?? p.category}
                </td>
                <td className="p-4">
                  <span className="font-medium">
                    {formatCLP(p.salePrice ?? p.price)}
                  </span>
                  {p.salePrice && (
                    <span className="ml-1 text-xs text-ink-400 line-through">
                      {formatCLP(p.price)}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={
                      p.stock <= 4 ? "font-semibold text-amber-600" : "text-ink-300"
                    }
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="p-4">
                  {p.active ? (
                    <span className="text-emerald-600">● Visible</span>
                  ) : (
                    <span className="text-ink-400">○ Oculto</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      aria-label={`Editar ${p.name}`}
                      className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-surface-2 hover:text-brand-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
