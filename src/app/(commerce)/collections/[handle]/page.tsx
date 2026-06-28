import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionGrid from "@/components/product/CollectionGrid";
import { getCollection } from "@/lib/shopify";
import { isProductCategory } from "@/lib/catalog";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  if (!isProductCategory(handle)) return {};
  const collection = await getCollection(handle);
  return {
    title: collection?.seo.title ?? "Collection",
    description: collection?.seo.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  if (!isProductCategory(handle)) notFound();

  const collection = await getCollection(handle);
  if (!collection) notFound();

  return (
    <main className="page-shell">
      <section className="collection-hero">
        <p className="eyebrow">Collection</p>
        <h1>{collection.title}</h1>
        <p>{collection.dek}</p>
        <span>{collection.ritual}</span>
      </section>
      <CollectionGrid collection={collection} />
    </main>
  );
}
