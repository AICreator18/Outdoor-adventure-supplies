export type CategorySlug =
  | "camping"
  | "boating"
  | "hiking"
  | "fishing"
  | "accessories";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  images: ProductImage[];
  shortDescription: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isOnSale: boolean;
  tags: string[];
}
