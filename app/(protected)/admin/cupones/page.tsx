import { prisma } from "@/lib/db";
import { formatCLP } from "@/lib/utils";
import { createCouponAction, toggleCouponAction } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

const inputCls =
  "h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none focus:border-brand-500";

export default async function AdminCupones() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold md:text-3xl">Cupones</h1>
      <p className="mt-1 text-sm text-ink-400">
        Crea códigos de descuento para tus campañas.
      </p>

      {/* Crear */}
      <form
        action={createCouponAction}
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[1fr_160px_140px_auto] sm:items-end"
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-200">Código</span>
          <input name="code" required placeholder="VERANO20" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-200">Tipo</span>
          <select name="type" className={inputCls} defaultValue="PERCENT">
            <option value="PERCENT">Porcentaje (%)</option>
            <option value="FIXED">Monto fijo (CLP)</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-200">Valor</span>
          <input name="value" required inputMode="numeric" placeholder="20" className={inputCls} />
        </label>
        <button
          type="submit"
          className="h-11 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white hover:bg-brand-600"
        >
          Crear cupón
        </button>
      </form>

      {/* Lista */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-ink-400">
              <th className="p-4 font-medium">Código</th>
              <th className="p-4 font-medium">Descuento</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coupons.map((c) => (
              <tr key={c.id}>
                <td className="p-4 font-mono font-semibold">{c.code}</td>
                <td className="p-4">
                  {c.type === "PERCENT" ? `${c.value}%` : formatCLP(c.value)}
                </td>
                <td className="p-4">
                  {c.active ? (
                    <span className="text-emerald-600">● Activo</span>
                  ) : (
                    <span className="text-ink-400">○ Inactivo</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <form
                    action={toggleCouponAction.bind(null, c.id, !c.active)}
                    className="inline"
                  >
                    <button
                      type="submit"
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:border-brand-500 hover:text-brand-600"
                    >
                      {c.active ? "Desactivar" : "Activar"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-ink-400">
                  No hay cupones todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
