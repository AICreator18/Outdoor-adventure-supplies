import { createContext } from "react";
import type { CartItem, Product } from "../types";

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
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
