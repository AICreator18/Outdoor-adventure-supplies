import type { CategorySlug } from "./product";

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  icon: string;
}
