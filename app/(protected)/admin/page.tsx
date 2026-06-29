import Link from "next/link";
import {
  Package,
  ShoppingCart,
  AlertTriangle,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { formatCLP } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  PENDIENTE: "Pendiente",
  PAGO_INICIADO: "Pago iniciado",
  PAGO_APROBADO: "Pago aprobado",
  PAGO_RECHAZADO: "Pago rechazado",
  PAGO_CANCELADO: "Pago cancelado",
  PREPARANDO: "Preparando",
  DESPACHADO: "Despachado",
  ENTREGADO: "Entregado",
};

export default async function AdminDashboard() {
  const [productCount, orderCount, lowStock, paidOrders, recentOrders] =
    await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.order.count(),
      prisma.product.count({ where: { active: true, stock: { lte: 4 } } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { in: ["PAGO_APROBADO", "PREPARANDO", "DESPACHADO", "ENTREGADO"] } },
      }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const cards = [
    { label: "Productos activos", value: productCount, icon: Package, href: "/admin/productos" },
    { label: "Pedidos totales", value: orderCount, icon: ShoppingCart, href: "/admin/pedidos" },
    { label: "Stock bajo (≤4)", value: lowStock, icon: AlertTriangle, href: "/admin/productos" },
    { label: "Ventas confirmadas", value: formatCLP(paidOrders._sum.total ?? 0), icon: DollarSign, href: "/admin/pedidos" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold md:text-3xl">
        Resumen
      </h1>
      <p className="mt-1 text-sm text-ink-400">
        Vista general de tu tienda.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-brand-500/50"
          >
            <c.icon className="h-6 w-6 text-brand-600" />
            <p className="mt-3 font-display text-2xl font-extrabold">
              {c.value}
            </p>
            <p className="text-xs text-ink-400">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-lg font-bold">Pedidos recientes</h2>
          <Link
            href="/admin/pedidos"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="p-6 text-sm text-ink-400">
            Aún no hay pedidos. Cuando un cliente compre, aparecerá aquí.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recentOrders.map((o) => (
              <li key={o.id} className="flex items-center justify-between p-4 text-sm">
                <div>
                  <p className="font-mono font-semibold text-brand-600">{o.code}</p>
                  <p className="text-ink-400">{o.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCLP(o.total)}</p>
                  <p className="text-xs text-ink-400">
                    {statusLabels[o.status] ?? o.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
