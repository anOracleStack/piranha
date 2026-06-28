import Image from "next/image";
import type { Product } from "@/types";

export default function ProductVisual({
  product,
  priority = false,
  className = "",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const image = product.images[0];

  return (
    <div className={`product-visual ${className}`}>
      <Image
        src={image.url}
        alt={image.altText}
        width={image.width}
        height={image.height}
        priority={priority}
        unoptimized
      />
    </div>
  );
}
