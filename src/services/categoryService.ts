import type { Category, CategorySlug } from "../types";
import categoriesRaw from "../data/categories.json";

const categories = categoriesRaw as unknown as Category[];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
