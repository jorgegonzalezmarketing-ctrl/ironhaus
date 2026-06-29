import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finaliza tu compra de forma segura con WebPay Plus o Mercado Pago.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <Breadcrumbs
        items={[{ name: "Inicio", href: "/" }, { name: "Checkout" }]}
      />
      <h1 className="font-display mb-8 mt-4 text-4xl font-extrabold tracking-tight">
        Finalizar compra
      </h1>
      <CheckoutFlow />
    </div>
  );
}
