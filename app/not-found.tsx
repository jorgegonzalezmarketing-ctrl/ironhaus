import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="absolute top-1/4 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="relative">
        <p className="font-display text-7xl font-black text-gradient-brand md:text-9xl">
          404
        </p>
        <h1 className="font-display mt-4 text-2xl font-bold md:text-3xl">
          Esta página no levanta peso
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-300">
          No encontramos lo que buscabas. Vuelve al inicio o explora nuestro
          catálogo completo.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Volver al inicio</Button>
          <Button href="/catalogo" variant="outline">
            Ver catálogo
          </Button>
        </div>
      </div>
    </div>
  );
}
