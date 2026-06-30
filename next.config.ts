import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Mantiene Prisma fuera del bundle para que el motor se resuelva en runtime
  // (evita errores de "Query engine not found" en serverless de Vercel).
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    // Formatos modernos para mejores Core Web Vitals.
    formats: ["image/avif", "image/webp"],
    // Preparado para fotos reales vía Cloudinary / Supabase / Unsplash.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  // Cabeceras de seguridad base (OWASP). En producción complementar con CSP.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
