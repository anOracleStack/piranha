import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";
import { getFeaturedProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getFeaturedProducts(3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid products={products} />
        <About />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
