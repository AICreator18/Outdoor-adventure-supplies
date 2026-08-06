import { useCallback, useMemo, type ReactNode } from "react";
import type { Product } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { WishlistContext, type WishlistContextValue } from "./WishlistContext";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<Product[]>("oas-wishlist", []);

  const addToWishlist = useCallback(
    (product: Product) => {
      setItems((current) =>
        current.some((p) => p.id === product.id) ? current : [...current, product],
      );
    },
    [setItems],
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setItems((current) => current.filter((p) => p.id !== productId));
    },
    [setItems],
  );

  const isInWishlist = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items],
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, removeFromWishlist, addToWishlist],
  );

  const value: WishlistContextValue = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      itemCount: items.length,
    }),
    [items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
