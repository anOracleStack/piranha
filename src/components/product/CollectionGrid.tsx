import Link from "next/link";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ProductVisual from "@/components/product/ProductVisual";
import { formatMoney } from "@/lib/format";
import type { Collection } from "@/types";

export default function CollectionGrid({ collection }: { collection: Collection }) {
  return (
    <div className="collection-grid">
      {collection.products.map((product, index) => (
        <ScrollReveal key={product.id} className="collection-card" delay={index * 0.06}>
          <Link href={`/collections/${collection.handle}/${product.handle}`} className="product-card">
            <ProductVisual product={product} priority={index === 0} />
            <div className="product-card-copy">
              <p>{product.category.replace("-", " ")}</p>
              <h2>{product.title}</h2>
              <span>{product.tagline}</span>
            </div>
            <div className="product-card-price">
              {formatMoney(product.priceRange.minVariantPrice)}
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
