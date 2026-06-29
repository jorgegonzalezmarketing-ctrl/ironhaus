# Crea Fitness — eCommerce de Maquinaria de Gimnasio

eCommerce premium para **Crea Fitness** (@fitness.crea), venta de maquinaria de
gimnasio en Chile. Tienda online + panel de administración. Next.js 16 +
PostgreSQL (Supabase). Diseñado como producto de agencia, no plantilla.

> Toda la identidad de marca (nombre, contacto, redes) se centraliza en
> `lib/site.ts` (`siteConfig`).

---

## Stack

| Capa        | Tecnología                                            |
| ----------- | ----------------------------------------------------- |
| Framework   | **Next.js 16** (App Router, Turbopack, React 19.2)    |
| Lenguaje    | **TypeScript** estricto                               |
| Estilos     | **Tailwind CSS v4** (tokens de diseño en `@theme`)    |
| Animación   | **Motion** (ex Framer Motion)                         |
| Estado      | **Zustand** (carrito y wishlist persistentes)         |
| Íconos      | **lucide-react** + SVGs propios                       |
| Pagos       | Servicios desacoplados **WebPay Plus** y **Mercado Pago** (modo demo) |

> **Fase 1 (este repo):** frontend premium con datos mock, listo para Vercel.
> **Fase 2 (preparada):** PostgreSQL + Prisma, NextAuth, pagos reales,
> almacenamiento (Cloudinary/Supabase) y panel admin. Ver `.env.example`.

---

## Cómo correr

```bash
npm install
cp .env.example .env.local   # opcional: sin claves, los pagos van en MODO DEMO
npm run dev                  # http://localhost:3000
npm run build && npm start   # build de producción
```

Requisitos: Node.js 20.9+.

---

## Estructura

```
app/                     Rutas (App Router)
  ├─ page.tsx            Home
  ├─ catalogo/           Catálogo + [categoria] (SSG)
  ├─ productos/[slug]/   Ficha de producto (SSG)
  ├─ checkout/           Checkout multipaso
  ├─ cotizar/ contacto/ equipamos-tu-gimnasio/ favoritos/
  ├─ api/                Endpoints de pago + webhooks
  ├─ sitemap.ts robots.ts
components/              UI por dominio (layout, home, product, catalog, checkout, ui, seo)
lib/
  ├─ site.ts             Config central de marca/SEO/contacto
  ├─ data/               Datos mock tipados (productos, categorías, marcas, FAQ, testimonios)
  ├─ store/              Zustand (carrito, wishlist)
  └─ utils.ts            cn(), formatCLP(), etc.
services/                mercadoPagoService.ts · webpayService.ts (desacoplados)
types/                   Tipos del dominio (compatibles con Prisma)
hooks/                   useMounted (hidratación segura)
```

---

## Decisiones clave

- **Mobile-first** y accesibilidad: foco visible, skip-link, `prefers-reduced-motion`, ARIA.
- **SEO técnico + GEO:** metadata por página, JSON-LD (Organization, Product,
  FAQ, Breadcrumb), `sitemap.xml`, `robots.txt`, contenido orientado a búsquedas
  locales y a motores de IA.
- **Rendimiento:** SSG en catálogo/productos, fuentes con `display: swap`,
  visuales de producto generados por código (cero peso de red, cero dependencias
  externas que puedan caerse). Para fotos reales basta editar `ProductImage`.
- **Pagos production-ready:** toda la lógica de pago vive en `services/*` y lee
  credenciales sólo desde variables de entorno. Sin claves → modo demo simulado.
- **Seguridad:** cabeceras OWASP base en `next.config.ts`, sin credenciales en
  el código, validación de entrada en las API routes.

---

## Deploy en Vercel

1. Sube el repo a GitHub.
2. Importa el proyecto en Vercel (detecta Next.js automáticamente).
3. (Opcional) Carga las variables de `.env.example` en Vercel para activar pagos reales.
4. Deploy. Dominio de demo: `*.vercel.app`.

---

© Crea Fitness (demo). Desarrollado como muestra comercial.
