import { prisma } from "@/lib/db";
import { formatCLP } from "@/lib/utils";
import { updateOrderStatusAction } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

const STATUSES = [
  "PENDIENTE",
  "PAGO_INICIADO",
  "PAGO_APROBADO",
  "PAGO_RECHAZADO",
  "PAGO_CANCELADO",
  "PREPARANDO",
  "DESPACHADO",
  "ENTREGADO",
] as const;

const statusLabel: Record<string, string> = {
  PENDIENTE: "Pendiente",
  PAGO_INICIADO: "Pago iniciado",
  PAGO_APROBADO: "Pago aprobado",
  PAGO_RECHAZADO: "Pago rechazado",
  PAGO_CANCELADO: "Pago cancelado",
  PREPARANDO: "Preparando despacho",
  DESPACHADO: "Despachado",
  ENTREGADO: "Entregado",
};

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
                  <form
                    action={updateOrderStatusAction.bind(null, o.id)}
                    className="mt-2 flex items-center gap-2"
                  >
                    <select
                      name="status"
                      defaultValue={o.status}
                      className="h-9 rounded-lg border border-border bg-ink-950 px-2 text-xs outline-none focus:border-brand-500"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {statusLabel[s]}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="h-9 rounded-lg bg-brand-500 px-3 text-xs font-semibold text-white hover:bg-brand-600"
                    >
                      Actualizar
                    </button>
                  </form>
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
