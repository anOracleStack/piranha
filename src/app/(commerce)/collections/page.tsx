import type { Metadata } from "next";
import TransitionLink from "@/components/ui/TransitionLink";
import { collections } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse House of Piranha collections: The Fleet, The Armor, and Hardware.",
};

export default function CollectionsPage() {
  return (
    <main className="page-shell">
      <section className="collections-hero">
        <p className="eyebrow">Collections</p>
        <h1>Browse the Armory</h1>
        <p>Explore our curated collections of luxury leather goods, travel armor, and authenticated hardware.</p>
      </section>

      <section className="collections-grid">
        {collections.map((collection) => (
          <TransitionLink
            key={collection.handle}
            href={`/collections/${collection.handle}`}
            className="collection-card-link"
          >
            <div className="collection-card">
              <div className="collection-card-header">
                <h2>{collection.title}</h2>
                <p className="collection-dek">{collection.dek}</p>
              </div>
              <p className="collection-ritual">{collection.ritual}</p>
              <div className="collection-cta">
                View collection →
              </div>
            </div>
          </TransitionLink>
        ))}
      </section>
    </main>
  );
}
