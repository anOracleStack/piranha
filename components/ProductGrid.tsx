import Image from "next/image";
import { ShopifyProduct } from "@/types/shopify";
import { formatPrice } from "@/lib/shopify";

interface ProductGridProps {
  products: ShopifyProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="collection" className="py-32 px-6 bg-[#09090b]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase mb-4">
            The Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] font-light italic">
            {products.length > 0 ? "Featured Pieces" : "Coming Soon"}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block w-16 h-px bg-[#c9a84c]/30" />
            <span className="block w-2 h-2 border border-[#c9a84c]/40 rotate-45" />
            <span className="block w-16 h-px bg-[#c9a84c]/30" />
          </div>
        </div>

        {products.length === 0 ? (
          <ComingSoonGrid />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View all link */}
        <div className="text-center mt-16">
          <a
            href="#waitlist"
            className="inline-block px-10 py-3 border border-[#c9a84c]/40 text-[#c8bfa8] text-xs tracking-[0.3em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
          >
            {products.length > 0 ? "View Full Collection" : "Get Early Access"}
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  return (
    <div className="group relative bg-[#0f0f12] border border-[#1c1c22] hover:border-[#c9a84c]/30 transition-all duration-500 overflow-hidden">
      {/* Product image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#141418]">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <PlaceholderImage title={product.title} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Available badge */}
        {variant && !variant.availableForSale && (
          <div className="absolute top-4 right-4 bg-[#09090b]/80 px-3 py-1">
            <span className="text-[#6b6658] text-[10px] tracking-[0.2em] uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-6">
        <p className="text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase mb-2">
          House of Piranha
        </p>
        <h3 className="font-display text-lg text-[#f5f0e8] font-light mb-3 leading-snug">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-[#6b6658] text-xs leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-[#c8bfa8] text-sm tracking-wider">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <a
            href="#waitlist"
            className="text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase border-b border-[#c9a84c]/30 hover:border-[#c9a84c] pb-px transition-colors duration-200"
          >
            Request Access →
          </a>
        </div>
      </div>
    </div>
  );
}

function PlaceholderImage({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-px bg-[#c9a84c]/20" />
      <p className="text-[#26262e] text-xs tracking-[0.3em] uppercase text-center px-4">
        {title}
      </p>
      <div className="w-16 h-px bg-[#c9a84c]/20" />
    </div>
  );
}

const placeholderPieces = [
  {
    id: "p1",
    title: "Midnight Predator Jacket",
    category: "Outerwear",
    note: "Limited Edition",
  },
  {
    id: "p2",
    title: "Gold Fang Chain",
    category: "Accessories",
    note: "18k Vermeil",
  },
  {
    id: "p3",
    title: "Obsidian Leather Bag",
    category: "Leather Goods",
    note: "Hand-crafted",
  },
];

function ComingSoonGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {placeholderPieces.map((piece) => (
        <div
          key={piece.id}
          className="group bg-[#0f0f12] border border-[#1c1c22] hover:border-[#c9a84c]/20 transition-all duration-500"
        >
          {/* Placeholder image area */}
          <div className="relative aspect-[3/4] bg-[#141418] flex flex-col items-center justify-center gap-6 overflow-hidden">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent" />
            <div className="text-center">
              <p className="text-[#1c1c22] text-[10px] tracking-[0.4em] uppercase mb-1">
                {piece.category}
              </p>
              <div className="w-8 h-px bg-[#c9a84c]/20 mx-auto" />
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03)_0%,transparent_70%)] group-hover:opacity-150 transition-opacity" />
          </div>

          {/* Info */}
          <div className="p-6">
            <p className="text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase mb-2">
              {piece.note}
            </p>
            <h3 className="font-display text-lg text-[#f5f0e8] font-light mb-2">
              {piece.title}
            </h3>
            <p className="text-[#c8bfa8] text-xs tracking-widest">
              Price Upon Request
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
