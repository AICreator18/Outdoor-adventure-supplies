// Indian retail law requires displayed/MRP prices to be inclusive of GST —
// so product.price is treated as GST-inclusive, and this extracts the GST
// portion already baked into it rather than adding tax on top at checkout.
export const GST_RATE = 0.18;

export function extractGstFromInclusivePrice(inclusivePrice: number): number {
  return inclusivePrice - inclusivePrice / (1 + GST_RATE);
}

// Standard 15-character GSTIN format: 2-digit state code + 10-char PAN +
// 1-digit entity number + 'Z' by default + 1 checksum character.
const GSTIN_PATTERN = /^\d{2}[A-Z]{5}\d{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

export function isValidGstin(gstin: string): boolean {
  return GSTIN_PATTERN.test(gstin.trim().toUpperCase());
}
