import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { createProductAction } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

export default function NuevoProducto() {
  return (
    <div>
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Productos
      </Link>
      <h1 className="font-display mt-2 mb-6 text-2xl font-extrabold md:text-3xl">
        Nuevo producto
      </h1>
      <ProductForm action={createProductAction} submitLabel="Crear producto" />
    </div>
  );
}
