import type { Review } from "../../types";
import StarRating from "./StarRating";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-stone-gray">No reviews yet for this product.</p>;
  }

  return (
    <div className="d-flex flex-column gap-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-bottom pb-4">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <h3 className="h6 fw-bold mb-1">{review.title}</h3>
              <StarRating rating={review.rating} size="sm" />
            </div>
            <span className="text-stone-gray small">{review.date}</span>
          </div>
          <p className="text-stone-gray mt-2 mb-1">{review.comment}</p>
          <span className="small fw-semibold">
            {review.author}
            {review.verifiedPurchase && (
              <span className="text-forest ms-2">
                <i className="bi bi-patch-check-fill me-1" aria-hidden="true" />
                Verified Purchase
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
