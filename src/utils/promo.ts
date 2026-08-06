export const WELCOME_CODE = "WELCOME5";
export const WELCOME_DISCOUNT_RATE = 0.05;
const WELCOME_VALID_MONTH = 7; // August (0-indexed) — welcome bonus runs all month

export interface PromoSuccess {
  code: string;
  discountRate: number;
  label: string;
}

export interface PromoError {
  error: string;
}

export function isWelcomeOfferActive(now: Date = new Date()): boolean {
  return now.getMonth() === WELCOME_VALID_MONTH;
}

export function validatePromoCode(code: string, isSubscribed: boolean): PromoSuccess | PromoError {
  const normalized = code.trim().toUpperCase();

  if (normalized === WELCOME_CODE) {
    if (!isSubscribed) {
      return { error: "Subscribe with your email below to unlock this code." };
    }
    if (!isWelcomeOfferActive()) {
      return { error: "This welcome bonus is only valid during August." };
    }
    return { code: WELCOME_CODE, discountRate: WELCOME_DISCOUNT_RATE, label: "Welcome discount (5% off)" };
  }

  return { error: "Invalid promo code." };
}
