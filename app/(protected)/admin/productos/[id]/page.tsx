import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProductByIdAdmin } from "@/lib/queries";
import { updateProductAction } from "@/lib/actions/admin";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function EditarProducto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdAdmin(id);
  if (!product) notFound();

  const action = updateProductAction.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1 text-sm text-ink-400 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Productos
      </Link>
      <h1 className="font-display mt-2 mb-6 text-2xl font-extrabold md:text-3xl">
        Editar producto
      </h1>
      <ProductForm action={action} product={product} submitLabel="Guardar cambios" />
    </div>
  );
}
