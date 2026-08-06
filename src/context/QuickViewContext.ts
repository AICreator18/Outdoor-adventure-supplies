import { createContext } from "react";
import type { Product } from "../types";

export interface QuickViewContextValue {
  activeProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const QuickViewContext = createContext<QuickViewContextValue | undefined>(undefined);
