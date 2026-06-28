import { siteConfig } from "@/lib/site";
import { effectivePrice } from "@/lib/data/products";
import type { Product, Faq } from "@/types";
import { getBrandName } from "@/lib/data/brands";

/** Inyecta un bloque JSON-LD de forma segura. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro, generado en servidor; no proviene del usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + LocalBusiness (autoridad y SEO local / GEO). */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Store"],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.district,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.lat,
      longitude: siteConfig.address.lng,
    },
    areaServed: "CL",
    sameAs: Object.values(siteConfig.social),
  };
  return <JsonLd data={data} />;
}

/** Producto con oferta y rating (rich results de e-commerce). */
export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    brand: { "@type": "Brand", name: getBrandName(product.brand) },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      price: effectivePrice(product),
      priceCurrency: siteConfig.currency,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${siteConfig.url}/productos/${product.slug}`,
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };
  return <JsonLd data={data} />;
}

/** FAQPage (rich results + alimento para motores de IA / GEO). */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return <JsonLd data={data} />;
}

/** Breadcrumb navegacional. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}
