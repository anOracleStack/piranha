import CinematicHero from "@/components/sections/CinematicHero";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import ManifestoSection from "@/components/sections/ManifestoSection";
import VaultCapture from "@/components/sections/VaultCapture";
import MarqueeStrip from "@/components/motion/MarqueeStrip";
import { getFeaturedProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main>
      <CinematicHero />
      <MarqueeStrip />
      <FeaturedGrid products={products} />
      <CategoryShowcase />
      <ManifestoSection />
      <VaultCapture />
    </main>
  );
}
