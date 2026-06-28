import type { Collection, DPPData, Product, ProductCategory } from "@/types";

const usd = (amount: number) => ({
  amount: amount.toFixed(2),
  currencyCode: "USD",
});

export const products: Product[] = [
  {
    id: "gid://shopify/Product/armor-weekender",
    handle: "obsidian-weekender",
    title: "Obsidian Weekender",
    tagline: "A travel holdall built like a sealed private room.",
    description:
      "Full-grain black leather, reinforced gold hardware, and an embedded passport tag under the crest.",
    descriptionHtml:
      "<p>Full-grain black leather, reinforced gold hardware, and an embedded passport tag under the crest.</p>",
    tags: ["the-fleet", "travel", "dpp"],
    category: "the-fleet",
    images: [
      {
        url: "/images/products/obsidian-weekender.png",
        altText: "Black leather weekender bag with gold hardware on a dark stone plinth",
        width: 1536,
        height: 1152,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/armor-weekender-default",
        title: "Black calfskin / gold hardware",
        sku: "HOP-FLEET-001",
        availableForSale: true,
        price: usd(3400),
        selectedOptions: [
          { name: "Leather", value: "Black calfskin" },
          { name: "Hardware", value: "House gold" },
        ],
      },
    ],
    priceRange: {
      minVariantPrice: usd(3400),
      maxVariantPrice: usd(3400),
    },
    materials: ["Full-grain calfskin", "Suede lining", "Solid brass hardware"],
    dimensions: "20 x 11 x 9 in",
    hardware: "House gold lock, feet, and zip pulls",
    dppUuid: "8f2f40b4-5d3d-49a8-a89c-2c3a1f2d88c1",
    seo: {
      title: "Obsidian Weekender",
      description: "Luxury travel holdall with embedded digital product passport.",
    },
  },
  {
    id: "gid://shopify/Product/armor-satchel",
    handle: "apex-satchel",
    title: "Apex Satchel",
    tagline: "Compact armor for the daily campaign.",
    description:
      "A structured satchel with a beveled flap, hidden phone bay, and authenticated hardware.",
    descriptionHtml:
      "<p>A structured satchel with a beveled flap, hidden phone bay, and authenticated hardware.</p>",
    tags: ["the-armor", "daily", "dpp"],
    category: "the-armor",
    images: [
      {
        url: "/images/products/apex-satchel.png",
        altText: "Structured black leather satchel with gold clasp on a polished dark surface",
        width: 1536,
        height: 1152,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/armor-satchel-default",
        title: "Black calfskin / gold clasp",
        sku: "HOP-ARMOR-002",
        availableForSale: true,
        price: usd(1850),
        selectedOptions: [
          { name: "Leather", value: "Black calfskin" },
          { name: "Hardware", value: "House gold" },
        ],
      },
    ],
    priceRange: {
      minVariantPrice: usd(1850),
      maxVariantPrice: usd(1850),
    },
    materials: ["Box calfskin", "Microfiber lining", "Brushed brass clasp"],
    dimensions: "11 x 8 x 3 in",
    hardware: "Bite-lock closure",
    dppUuid: "29b87c04-595d-4b5b-8d30-5837f7c28951",
    seo: {
      title: "Apex Satchel",
      description: "Structured daily leather satchel with cryptographic provenance.",
    },
  },
  {
    id: "gid://shopify/Product/hardware-card",
    handle: "black-card-key",
    title: "Black Card Key",
    tagline: "A physical key to the private allocation room.",
    description:
      "A brass-cored NFC card wrapped in black enamel and tuned for Vault access rituals.",
    descriptionHtml:
      "<p>A brass-cored NFC card wrapped in black enamel and tuned for Vault access rituals.</p>",
    tags: ["hardware", "vault", "nfc"],
    category: "hardware",
    images: [
      {
        url: "/images/products/black-card-key.png",
        altText: "Black enamel NFC vault card and matching gold-edged key fob on dark stone",
        width: 1536,
        height: 1152,
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/hardware-card-default",
        title: "Black enamel / brass core",
        sku: "HOP-HW-003",
        availableForSale: false,
        price: usd(480),
        selectedOptions: [
          { name: "Finish", value: "Black enamel" },
          { name: "Core", value: "Brass" },
        ],
      },
    ],
    priceRange: {
      minVariantPrice: usd(480),
      maxVariantPrice: usd(480),
    },
    materials: ["Black enamel", "Brass core", "NFC inlay"],
    dimensions: "ISO card format",
    hardware: "Sealed NFC antenna",
    dppUuid: "4dcc2f30-93bf-4b33-a82b-83b6757fb4cc",
    seo: {
      title: "Black Card Key",
      description: "Physical Vault card for private House of Piranha access.",
    },
  },
];

export const collections: Collection[] = [
  {
    id: "collection-the-fleet",
    handle: "the-fleet",
    title: "The Fleet",
    dek: "Travel armor for movement under pressure.",
    ritual: "Built for departures, arrivals, and the quiet after a secured door closes.",
    products: products.filter((product) => product.category === "the-fleet"),
    seo: {
      title: "The Fleet",
      description: "House of Piranha travel leather goods.",
    },
  },
  {
    id: "collection-the-armor",
    handle: "the-armor",
    title: "The Armor",
    dek: "Daily carry pieces with ceremony and teeth.",
    ritual: "Objects for the person who enters the room already decided.",
    products: products.filter((product) => product.category === "the-armor"),
    seo: {
      title: "The Armor",
      description: "Structured daily leather goods from House of Piranha.",
    },
  },
  {
    id: "collection-hardware",
    handle: "hardware",
    title: "Hardware",
    dek: "Keys, cards, and authentication objects for the Vault.",
    ritual: "A small object. A locked room. A signal that the system recognizes you.",
    products: products.filter((product) => product.category === "hardware"),
    seo: {
      title: "Hardware",
      description: "House of Piranha NFC and Vault hardware.",
    },
  },
];

export const dppRecords: DPPData[] = products.map((product, index) => ({
  uuid: product.dppUuid,
  productHandle: product.handle,
  serialNumber: `HOP-${String(index + 1).padStart(4, "0")}-EUNOIA`,
  manufactureDate: `2026-0${index + 2}-14`,
  workshopCode: index === 0 ? "ATELIER-SEA-01" : index === 1 ? "ATELIER-VAULT-02" : "ATELIER-KEY-03",
  artisanId: `ART-${742 + index}`,
  hardwareSpec: {
    primaryMetal: index === 2 ? "Brass core" : "Solid brass",
    finish: "House gold",
  },
  materials: [
    {
      component: "Exterior",
      material: product.materials[0] ?? "House material",
      origin: "Italy",
    },
    {
      component: "Interior",
      material: product.materials[1] ?? "Lined core",
      origin: "Portugal",
    },
    {
      component: "Authentication",
      material: "Encrypted NFC inlay",
      origin: "United States",
    },
  ],
}));

export function getCollection(handle: ProductCategory) {
  return collections.find((collection) => collection.handle === handle) ?? null;
}

export function getProduct(handle: string) {
  return products.find((product) => product.handle === handle) ?? null;
}

export function getProductInCollection(collectionHandle: ProductCategory, productHandle: string) {
  const product = getProduct(productHandle);
  if (!product || product.category !== collectionHandle) return null;
  return product;
}

export function isProductCategory(value: string): value is ProductCategory {
  return value === "the-fleet" || value === "the-armor" || value === "hardware";
}
