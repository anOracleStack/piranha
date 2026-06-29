import { getCollection as getLocalCollection, getProduct as getLocalProduct, products } from "@/lib/catalog";
import type { Cart, CartLine, Product, ProductCategory } from "@/types";

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_API_KEY;
const SHOPIFY_API_VERSION = "2025-01";

export function hasShopifyConfig() {
  return Boolean(SHOPIFY_DOMAIN);
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!SHOPIFY_DOMAIN) {
    throw new Error("Shopify is not configured.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (SHOPIFY_ACCESS_TOKEN) {
    headers["X-Shopify-Storefront-Access-Token"] = SHOPIFY_ACCESS_TOKEN;
  }

  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60, tags: ["shopify"] },
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((e) => e.message).join(", "));
  }

  if (!payload.data) {
    throw new Error("Shopify response did not include data.");
  }

  return payload.data;
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  descriptionHtml
  tags
  images(first: 5) {
    edges {
      node {
        url
        altText
        width
        height
      }
    }
  }
  variants(first: 10) {
    edges {
      node {
        id
        title
        sku
        availableForSale
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
`;

function mapShopifyProduct(node: Record<string, unknown>): Product {
  const images = (node.images as { edges: Array<{ node: Record<string, unknown> }> }).edges.map(
    ({ node: img }) => ({
      url: img.url as string,
      altText: (img.altText as string) ?? "",
      width: (img.width as number) ?? 800,
      height: (img.height as number) ?? 600,
    }),
  );

  const variants = (node.variants as { edges: Array<{ node: Record<string, unknown> }> }).edges.map(
    ({ node: v }) => ({
      id: v.id as string,
      title: v.title as string,
      sku: (v.sku as string) ?? "",
      availableForSale: v.availableForSale as boolean,
      price: v.price as { amount: string; currencyCode: string },
      selectedOptions: v.selectedOptions as Array<{ name: string; value: string }>,
    }),
  );

  const tags = node.tags as string[];
  const category = tags.includes("the-fleet")
    ? "the-fleet"
    : tags.includes("the-armor")
      ? "the-armor"
      : ("hardware" as ProductCategory);

  return {
    id: node.id as string,
    handle: node.handle as string,
    title: node.title as string,
    tagline: "",
    description: (node.descriptionHtml as string).replace(/<[^>]+>/g, ""),
    descriptionHtml: node.descriptionHtml as string,
    tags,
    category,
    images,
    variants,
    priceRange: node.priceRange as { minVariantPrice: { amount: string; currencyCode: string }; maxVariantPrice: { amount: string; currencyCode: string } },
    materials: [],
    dimensions: "",
    hardware: "",
    dppUuid: "",
    seo: { title: node.title as string, description: "" },
  };
}

export async function getCollection(handle: ProductCategory) {
  if (!hasShopifyConfig()) return getLocalCollection(handle);

  try {
    const data = await shopifyFetch<{ collectionByHandle: Record<string, unknown> | null }>(
      `query CollectionByHandle($handle: String!) {
        collectionByHandle(handle: $handle) {
          id
          handle
          title
          descriptionHtml
          products(first: 20) {
            edges {
              node {
                ${PRODUCT_FIELDS}
              }
            }
          }
        }
      }`,
      { handle },
    );

    if (!data.collectionByHandle) return getLocalCollection(handle);

    const col = data.collectionByHandle;
    const shopifyProducts = (col.products as { edges: Array<{ node: Record<string, unknown> }> }).edges.map(
      ({ node }) => mapShopifyProduct(node),
    );

    if (shopifyProducts.length === 0) return getLocalCollection(handle);

    return {
      id: col.id as string,
      handle: handle,
      title: col.title as string,
      dek: (col.descriptionHtml as string).replace(/<[^>]+>/g, ""),
      ritual: "",
      products: shopifyProducts,
      seo: { title: col.title as string, description: "" },
    };
  } catch {
    return getLocalCollection(handle);
  }
}

export async function getProduct(handle: string) {
  if (!hasShopifyConfig()) return getLocalProduct(handle);

  try {
    const data = await shopifyFetch<{ productByHandle: Record<string, unknown> | null }>(
      `query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          ${PRODUCT_FIELDS}
        }
      }`,
      { handle },
    );

    if (!data.productByHandle) return getLocalProduct(handle);
    return mapShopifyProduct(data.productByHandle);
  } catch {
    return getLocalProduct(handle);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!hasShopifyConfig()) return products;

  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: Record<string, unknown> }> } }>(
      `query FeaturedProducts {
        products(first: 6, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              ${PRODUCT_FIELDS}
            }
          }
        }
      }`,
    );

    const shopifyProducts = data.products.edges.map(({ node }) => mapShopifyProduct(node));
    return shopifyProducts.length > 0 ? shopifyProducts : products;
  } catch {
    return products;
  }
}

export async function createCart(lines: Array<{ merchandiseId: string; quantity: number }>): Promise<Cart> {
  return buildLocalCart(lines);
}

export async function addToCart(
  _cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<Cart> {
  return buildLocalCart(lines);
}

export async function updateCartLine(_cartId: string, lineId: string, quantity: number): Promise<Cart> {
  return buildLocalCart([{ merchandiseId: lineId, quantity }]);
}

export async function removeFromCart(_cartId: string, _lineIds: string[]): Promise<Cart> {
  return buildLocalCart([]);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (!cartId) return null;
  return buildLocalCart([]);
}

function buildLocalCart(lines: Array<{ merchandiseId: string; quantity: number }>): Cart {
  const cartLines: CartLine[] = lines
    .map((line, index) => {
      const product =
        products.find((item) => item.variants.some((variant) => variant.id === line.merchandiseId)) ??
        products[index % products.length];
      const merchandise = product.variants[0];
      return {
        id: line.merchandiseId,
        quantity: line.quantity,
        merchandise,
        product,
      };
    })
    .filter(Boolean);

  const subtotal = cartLines.reduce(
    (total, line) => total + Number(line.merchandise.price.amount) * line.quantity,
    0,
  );

  return {
    id: `local-cart-${Date.now()}`,
    lines: cartLines,
    totalQuantity: cartLines.reduce((total, line) => total + line.quantity, 0),
    checkoutUrl: "/concierge",
    cost: {
      subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: "USD" },
      totalAmount: { amount: subtotal.toFixed(2), currencyCode: "USD" },
    },
  };
}
