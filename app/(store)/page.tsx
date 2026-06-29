import { Hero } from "@/components/home/hero";
import { BrandsMarquee } from "@/components/home/brands-marquee";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { EquipService } from "@/components/home/equip-service";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { ContactCta } from "@/components/home/contact-cta";

// La home muestra productos destacados desde la base de datos.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandsMarquee />
      <CategoriesGrid />
      <FeaturedProducts />
      <EquipService />
      <Testimonials />
      <FaqSection />
      <ContactCta />
    </>
  );
}
