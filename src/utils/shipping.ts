export const FREE_SHIPPING_THRESHOLD = 5000;

interface ShippingZone {
  charge: number;
  estimate: string;
  label: string;
}

// Zones follow India Post's first-digit PIN code regions, priced by rough
// distance from the Chennai warehouse (PIN codes starting with 6).
const ZONE_BY_FIRST_DIGIT: Record<string, ShippingZone> = {
  "6": { charge: 49, estimate: "2-3 business days", label: "Tamil Nadu, Kerala & Puducherry" },
  "5": { charge: 69, estimate: "3-4 business days", label: "Karnataka, Andhra Pradesh & Telangana" },
  "4": { charge: 89, estimate: "4-5 business days", label: "Maharashtra, Goa, Madhya Pradesh & Chhattisgarh" },
  "3": { charge: 99, estimate: "4-6 business days", label: "Gujarat & Rajasthan" },
  "7": { charge: 99, estimate: "5-7 business days", label: "West Bengal, Odisha & the Northeast" },
  "1": { charge: 109, estimate: "5-7 business days", label: "Delhi NCR, Punjab, Haryana & Himachal Pradesh" },
  "2": { charge: 109, estimate: "5-7 business days", label: "Uttar Pradesh & Uttarakhand" },
  "8": { charge: 109, estimate: "5-7 business days", label: "Bihar & Jharkhand" },
  "9": { charge: 149, estimate: "7-10 business days", label: "Army Postal Service" },
};

export interface ShippingEstimate {
  charge: number;
  estimate: string;
  zoneLabel: string;
  isFree: boolean;
}

export function isValidIndianPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

export function getShippingEstimate(pincode: string, subtotal: number): ShippingEstimate | null {
  const trimmed = pincode.trim();
  if (!isValidIndianPincode(trimmed)) return null;

  const zone = ZONE_BY_FIRST_DIGIT[trimmed[0]];
  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;

  return {
    charge: isFree ? 0 : zone.charge,
    estimate: zone.estimate,
    zoneLabel: zone.label,
    isFree,
  };
}
