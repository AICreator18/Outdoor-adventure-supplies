import type { CartItem } from "./index";

export interface AddressData {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = "card" | "upi" | "cod";

export interface CardData {
  number: string;
  nameOnCard: string;
  expiry: string;
  cvv: string;
}

export interface PaymentData {
  method: PaymentMethod;
  card?: CardData;
  upiId?: string;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  address: AddressData;
  payment: PaymentData;
  subtotal: number;
  shippingCharge: number;
  grandTotal: number;
  shippingEstimate: string;
}
