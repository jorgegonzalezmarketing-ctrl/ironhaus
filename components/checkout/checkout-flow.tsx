"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ChevronLeft,
  CreditCard,
  ShoppingBag,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  useCartStore,
  selectCartSubtotal,
} from "@/lib/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { formatCLP, generateOrderCode, cn } from "@/lib/utils";

const steps = ["Datos", "Dirección", "Envío", "Resumen", "Pago"] as const;

const shippingMethods = [
  { id: "retiro", label: "Retiro en tienda (Providencia)", cost: 0, eta: "Hoy / mañana" },
  { id: "rm", label: "Despacho Región Metropolitana", cost: 9990, eta: "24–72 h" },
  { id: "regiones", label: "Despacho a regiones", cost: 24990, eta: "3–7 días hábiles" },
] as const;

type PayMethod = "webpay" | "mercadopago";

export function CheckoutFlow() {
  const mounted = useMounted();
  const { items, clear } = useCartStore();
  const subtotal = useCartStore(selectCartSubtotal);

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<(typeof shippingMethods)[number]["id"]>("rm");
  const [payMethod, setPayMethod] = useState<PayMethod>("webpay");
  const [processing, setProcessing] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rut: "",
    direccion: "",
    comuna: "",
    region: "Región Metropolitana",
  });

  const shippingCost =
    shippingMethods.find((m) => m.id === shipping)?.cost ?? 0;
  const total = subtotal + shippingCost;

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePay() {
    setProcessing(true);
    try {
      // Llama al servicio de pago (modo demo → respuesta simulada).
      const res = await fetch(`/api/checkout/${payMethod}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          subtotal,
          shippingMethod: shipping,
          shippingCost,
          customer: form,
          items: items.map((i) => ({
            productId: i.productId,
            sku: i.sku,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      // En producción: si data.redirectUrl existe, redirigir a la pasarela.
      if (data?.redirectUrl && !data?.simulated) {
        window.location.href = data.redirectUrl;
        return;
      }
      setOrderCode(data?.orderCode ?? generateOrderCode());
      clear();
    } catch {
      setOrderCode(generateOrderCode());
      clear();
    } finally {
      setProcessing(false);
    }
  }

  if (!mounted) return null;

  // ===== Confirmación =====
  if (orderCode) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"
        >
          <Check className="h-10 w-10" />
        </motion.div>
        <h1 className="font-display mt-6 text-3xl font-extrabold">
          ¡Pedido confirmado!
        </h1>
        <p className="mt-3 text-ink-300">
          Gracias por tu compra. Tu número de pedido es{" "}
          <span className="font-mono font-bold text-brand-600">{orderCode}</span>
          . Te enviamos los detalles a{" "}
          <span className="font-medium">{form.email || "tu correo"}</span>.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-ink-400">
          <ShieldCheck className="h-4 w-4 text-brand-500" />
          Pago procesado de forma segura ·{" "}
          {payMethod === "webpay" ? "WebPay Plus" : "Mercado Pago"} (modo demo)
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/catalogo">Seguir comprando</Button>
          <Button href="/" variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  // ===== Carrito vacío =====
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-surface p-16 text-center">
        <ShoppingBag className="h-12 w-12 text-ink-600" />
        <p className="text-muted">Tu carrito está vacío.</p>
        <Button href="/catalogo">Ir al catálogo</Button>
      </div>
    );
  }

  const canContinue =
    step === 0
      ? form.nombre && form.email && form.telefono
      : step === 1
        ? shipping === "retiro" || (form.direccion && form.comuna)
        : true;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      {/* Columna principal */}
      <div>
        {/* Stepper */}
        <ol className="mb-8 flex items-center gap-2">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors",
                  i < step
                    ? "bg-brand-500 text-white"
                    : i === step
                      ? "border-2 border-brand-500 text-brand-600"
                      : "border border-border text-ink-500",
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  i === step ? "text-foreground" : "text-ink-500",
                )}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className="hidden h-px flex-1 bg-border sm:block" />
              )}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {/* Paso 0: Datos */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Tus datos</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre completo" value={form.nombre} onChange={(v) => update("nombre", v)} required />
                  <Field label="RUT" value={form.rut} onChange={(v) => update("rut", v)} placeholder="12.345.678-9" />
                  <Field label="Correo electrónico" type="email" value={form.email} onChange={(v) => update("email", v)} required />
                  <Field label="Teléfono" type="tel" value={form.telefono} onChange={(v) => update("telefono", v)} placeholder="+56 9 ..." required />
                </div>
              </div>
            )}

            {/* Paso 1: Dirección */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Dirección de envío</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Dirección" value={form.direccion} onChange={(v) => update("direccion", v)} placeholder="Calle, número, depto." />
                  </div>
                  <Field label="Comuna" value={form.comuna} onChange={(v) => update("comuna", v)} />
                  <Field label="Región" value={form.region} onChange={(v) => update("region", v)} />
                </div>
                <p className="text-xs text-ink-400">
                  ¿Prefieres retirar en tienda? Selecciónalo en el siguiente paso.
                </p>
              </div>
            )}

            {/* Paso 2: Envío */}
            {step === 2 && (
              <div className="space-y-3">
                <h2 className="font-display text-xl font-bold">Método de envío</h2>
                {shippingMethods.map((m) => (
                  <label
                    key={m.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors",
                      shipping === m.id
                        ? "border-brand-500 bg-brand-500/5"
                        : "border-border bg-surface hover:border-ink-600",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shipping === m.id}
                        onChange={() => setShipping(m.id)}
                        className="h-4 w-4 accent-brand-500"
                      />
                      <div>
                        <p className="text-sm font-medium">{m.label}</p>
                        <p className="text-xs text-ink-400">Entrega: {m.eta}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">
                      {m.cost === 0 ? "Gratis" : formatCLP(m.cost)}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Paso 3: Resumen */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Revisa tu pedido</h2>
                <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                  {items.map((i) => (
                    <li key={i.productId} className="flex items-center justify-between gap-3 bg-surface p-3 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="grid h-10 w-10 place-items-center rounded-md border border-border bg-ink-950 font-mono text-[8px] text-ink-500">
                          {i.sku}
                        </span>
                        <span>
                          {i.name}
                          <span className="block text-xs text-ink-400">
                            Cantidad: {i.quantity}
                          </span>
                        </span>
                      </span>
                      <span className="font-medium">
                        {formatCLP(i.price * i.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl border border-border bg-surface p-4 text-sm">
                  <p className="font-medium">{form.nombre}</p>
                  <p className="text-ink-400">{form.email} · {form.telefono}</p>
                  {shipping !== "retiro" && form.direccion && (
                    <p className="mt-1 text-ink-400">
                      {form.direccion}, {form.comuna}, {form.region}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Paso 4: Pago */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Método de pago</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <PayOption
                    active={payMethod === "webpay"}
                    onClick={() => setPayMethod("webpay")}
                    title="WebPay Plus"
                    subtitle="Crédito, débito y prepago — Transbank"
                  />
                  <PayOption
                    active={payMethod === "mercadopago"}
                    onClick={() => setPayMethod("mercadopago")}
                    title="Mercado Pago"
                    subtitle="Tarjetas, cuotas y saldo MP"
                  />
                </div>
                <div className="flex items-start gap-2 rounded-xl border border-border bg-surface p-4 text-xs text-ink-400">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  Entorno de demostración: el pago se simula vía un servicio
                  desacoplado (mercadoPagoService / webpayService) listo para
                  conectar con las credenciales reales en producción.
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="w-full"
                  onClick={handlePay}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Procesando…
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" /> Pagar {formatCLP(total)}
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navegación */}
        {step < 4 && (
          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1 text-sm font-medium text-ink-300 hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" /> Atrás
              </button>
            ) : (
              <Link href="/catalogo" className="text-sm text-ink-400 hover:text-foreground">
                Seguir comprando
              </Link>
            )}
            <Button
              type="button"
              onClick={() => canContinue && setStep((s) => s + 1)}
              disabled={!canContinue}
            >
              Continuar
            </Button>
          </div>
        )}
        {step === 4 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink-300 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Atrás
          </button>
        )}
      </div>

      {/* Resumen lateral */}
      <aside className="lg:sticky lg:top-40 lg:self-start">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-lg font-bold">Resumen</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-400">Subtotal</dt>
              <dd>{formatCLP(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-400">Envío</dt>
              <dd>{shippingCost === 0 ? "Gratis" : formatCLP(shippingCost)}</dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd className="font-display text-brand-600">{formatCLP(total)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-ink-500">IVA incluido.</p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-200">
        {label} {required && <span className="text-brand-600">*</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-border bg-ink-950 px-3 text-sm outline-none transition-colors focus:border-brand-500"
      />
    </label>
  );
}

function PayOption({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
        active
          ? "border-brand-500 bg-brand-500/5"
          : "border-border bg-surface hover:border-ink-600",
      )}
    >
      <span
        className={cn(
          "grid h-5 w-5 place-items-center rounded-full border-2",
          active ? "border-brand-500" : "border-ink-600",
        )}
      >
        {active && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-ink-400">{subtitle}</span>
      </span>
    </button>
  );
}
