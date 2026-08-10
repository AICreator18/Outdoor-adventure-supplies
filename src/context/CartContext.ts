import { createContext } from "react";
import type { CartItem, Product } from "../types";
import type { PromoSuccess } from "../utils/promo";

export interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
  appliedPromo: PromoSuccess | null;
  setAppliedPromo: (promo: PromoSuccess | null) => void;
  discountAmount: number;
  gstin: string | null;
  setGstin: (gstin: string | null) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
