import { createContext } from "react";
import type { Product } from "../types";

export interface WishlistContextValue {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

export const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
