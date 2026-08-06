import type { Review } from "../types";
import reviewsRaw from "../data/reviews.json";

const reviews = reviewsRaw as unknown as Review[];

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId);
}
