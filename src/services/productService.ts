import type { CategorySlug, Product } from "../types";
import productsRaw from "../data/products.json";

const products = productsRaw as unknown as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.isFeatured && p.inStock).slice(0, limit);
}

export function getBestSellers(limit = 8, excludeIds: string[] = []): Product[] {
  return products
    .filter((p) => p.isBestSeller && !excludeIds.includes(p.id))
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function getSaleProducts(limit = 8): Product[] {
  return products.filter((p) => p.isOnSale).slice(0, limit);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}
