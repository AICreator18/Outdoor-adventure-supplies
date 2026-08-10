import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { extractGstFromInclusivePrice } from "../utils/gst";
import type { PromoSuccess } from "../utils/promo";
import { CartContext, type CartContextValue } from "./CartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("oas-cart", []);
  const [appliedPromo, setAppliedPromo] = useState<PromoSuccess | null>(null);
  const [gstin, setGstin] = useState<string | null>(null);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...current, { product, quantity }];
      });
    },
    [setItems],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setItems((current) => current.filter((item) => item.product.id !== productId));
    },
    [setItems],
  );

  const increaseQuantity = useCallback(
    (productId: string) => {
      setItems((current) =>
        current.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    },
    [setItems],
  );

  const decreaseQuantity = useCallback(
    (productId: string) => {
      setItems((current) =>
        current
          .map((item) =>
            item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [setItems],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedPromo(null);
    setGstin(null);
  }, [setItems]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );
  // Product prices are GST-inclusive (standard Indian MRP practice), so the
  // tax shown here is the portion already baked into subtotal, not an add-on.
  const taxAmount = useMemo(() => extractGstFromInclusivePrice(subtotal), [subtotal]);
  const grandTotal = subtotal;
  const discountAmount = useMemo(
    () => (appliedPromo ? subtotal * appliedPromo.discountRate : 0),
    [appliedPromo, subtotal],
  );

  const value: CartContextValue = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      itemCount,
      subtotal,
      taxAmount,
      grandTotal,
      appliedPromo,
      setAppliedPromo,
      discountAmount,
      gstin,
      setGstin,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      itemCount,
      subtotal,
      taxAmount,
      grandTotal,
      appliedPromo,
      discountAmount,
      gstin,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
