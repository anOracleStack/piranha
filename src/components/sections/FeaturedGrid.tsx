import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import TransitionLink from "@/components/ui/TransitionLink";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/types";

function FeaturedGridSkeleton() {
  return (
    <div className="featured-grid">
      <div className="featured-card-skeleton" aria-hidden />
      <div className="featured-card-skeleton" aria-hidden />
      <div className="featured-card-skeleton" aria-hidden />
    </div>
  );
}

export default function FeaturedGrid({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="section-shell featured-section">
      <div className="section-heading">
        <p className="eyebrow">The Armory</p>
        <h2>Objects with a locked second life.</h2>
      </div>
      <div className="featured-grid" role="list" aria-label="Featured pieces">
        {products.map((product, index) => (
          <ScrollReveal
            key={product.id}
            delay={(Math.min(index * 100, 400) as 0 | 100 | 200 | 300 | 400)}
          >
            <TransitionLink
              href={`/collections/${product.category}/${product.handle}`}
              className="featured-card-link bite-target"
              role="listitem"
              aria-label={`View ${product.title}`}
              data-cursor="hover"
            >
              <div className="featured-card-image-wrap">
                {product.images[0] && (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].altText ?? product.title}
                    fill
                    className="bite-base"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                    unoptimized
                  />
                )}
                {product.biteImage && (
                  <Image
                    src={product.biteImage.url}
                    alt={`${product.title} — hardware detail`}
                    fill
                    className="bite-reveal"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                )}
                <div className="featured-card-price-overlay">
                  <span>{formatMoney(product.priceRange.minVariantPrice)}</span>
                </div>
              </div>
              <div className="featured-card-copy">
                <p className="eyebrow">{product.category === "the-fleet" ? "The Fleet" : product.category === "the-armor" ? "The Armor" : "Hardware"}</p>
                <h3>{product.title}</h3>
                {product.dppUuid && (
                  <p className="featured-card-dpp">NFC · Digital Passport</p>
                )}
              </div>
            </TransitionLink>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

FeaturedGrid.Skeleton = FeaturedGridSkeleton;
