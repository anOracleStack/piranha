import { getCollection as getLocalCollection, getProduct as getLocalProduct, products } from "@/lib/catalog";
import type { Cart, CartLine, Product, ProductCategory } from "@/types";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2026-01";

export function hasShopifyConfig() {
  return Boolean(SHOPIFY_DOMAIN && SHOPIFY_ACCESS_TOKEN);
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!hasShopifyConfig()) {
    throw new Error("Shopify is not configured.");
  }

  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN as string,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60, tags: ["shopify"] },
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(", "));
  }

  if (!payload.data) {
    throw new Error("Shopify response did not include data.");
  }

  return payload.data;
}

export async function getCollection(handle: ProductCategory) {
  if (!hasShopifyConfig()) return getLocalCollection(handle);

  try {
    await shopifyFetch("{ shop { name } }");
    return getLocalCollection(handle);
  } catch {
    return getLocalCollection(handle);
  }
}

export async function getProduct(handle: string) {
  if (!hasShopifyConfig()) return getLocalProduct(handle);

  try {
    await shopifyFetch("{ shop { name } }");
    return getLocalProduct(handle);
  } catch {
    return getLocalProduct(handle);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products;
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
  void _cartId;
  void _lineIds;
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
