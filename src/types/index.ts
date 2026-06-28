export type ProductCategory = "the-fleet" | "the-armor" | "hardware";

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  tagline: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  category: ProductCategory;
  images: ProductImage[];
  biteImage?: ProductImage;
  variants: ProductVariant[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  materials: string[];
  dimensions: string;
  hardware: string;
  dppUuid: string;
  seo: {
    title: string;
    description: string;
  };
}

export interface Collection {
  id: string;
  handle: ProductCategory;
  title: string;
  dek: string;
  ritual: string;
  products: Product[];
  seo: {
    title: string;
    description: string;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant;
  product: Product;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  totalQuantity: number;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
}

export interface DPPMaterial {
  component: string;
  material: string;
  origin: string;
}

export interface DPPData {
  uuid: string;
  productHandle: string;
  serialNumber: string;
  manufactureDate: string;
  workshopCode: string;
  artisanId: string;
  hardwareSpec: {
    primaryMetal: string;
    finish: string;
  };
  materials: DPPMaterial[];
  ownershipHash?: string;
}
