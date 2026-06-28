import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductVisual from "@/components/product/ProductVisual";
import PurchaseModule from "@/components/product/PurchaseModule";
import { getProductInCollection, isProductCategory } from "@/lib/catalog";
import { generateDPPUrl } from "@/lib/dpp";

interface ProductPageProps {
  params: Promise<{ handle: string; product: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle, product: productHandle } = await params;
  if (!isProductCategory(handle)) return {};
  const product = getProductInCollection(handle, productHandle);
  return {
    title: product?.seo.title ?? "Product",
    description: product?.seo.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle, product: productHandle } = await params;
  if (!isProductCategory(handle)) notFound();

  const product = getProductInCollection(handle, productHandle);
  if (!product) notFound();

  return (
    <main className="pdp-shell">
      <section className="pdp-media">
        <ProductVisual product={product} priority />
        <div className="pdp-story">
          <p className="eyebrow">Provenance</p>
          <h2>Authenticated from the first touch.</h2>
          <p>{product.description}</p>
        </div>
      </section>
      <PurchaseModule product={product} dppUrl={generateDPPUrl(product.dppUuid)} />
    </main>
  );
}
