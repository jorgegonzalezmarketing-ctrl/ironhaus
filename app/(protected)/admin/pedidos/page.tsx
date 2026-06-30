import { prisma } from "@/lib/db";
import { formatCLP } from "@/lib/utils";
import { OrderStatusForm } from "@/components/admin/order-status-form";

export const dynamic = "force-dynamic";

export default async function AdminPedidos() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold md:text-3xl">Pedidos</h1>
      <p className="mt-1 text-sm text-ink-400">{orders.length} pedidos.</p>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-ink-400">
          Aún no hay pedidos. Cuando un cliente complete una compra, aparecerá aquí.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono font-bold text-brand-600">{o.code}</p>
                  <p className="text-sm font-medium">{o.customerName}</p>
                  <p className="text-xs text-ink-400">
                    {o.email} · {o.phone}
                  </p>
                  {o.address && (
                    <p className="text-xs text-ink-400">
                      {o.address}, {o.comuna}, {o.region}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-ink-500">
                    {new Date(o.createdAt).toLocaleString("es-CL")} ·{" "}
                    {o.shippingMethod} ·{" "}
                    {o.payMethod === "webpay" ? "WebPay" : o.payMethod === "mercadopago" ? "Mercado Pago" : "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold">{formatCLP(o.total)}</p>
                  <OrderStatusForm orderId={o.id} currentStatus={o.status} />
                </div>
              </div>

              <ul className="mt-4 divide-y divide-border border-t border-border text-sm">
                {o.items.map((it) => (
                  <li key={it.id} className="flex justify-between py-2">
                    <span className="text-ink-300">
                      {it.quantity}× {it.name}{" "}
                      <span className="font-mono text-xs text-ink-500">({it.sku})</span>
                    </span>
                    <span>{formatCLP(it.price * it.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
