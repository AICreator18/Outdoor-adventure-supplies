interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, reviewCount, size = "sm" }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  const fontSize = size === "sm" ? "0.8rem" : "1.1rem";

  return (
    <div className="d-flex align-items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <div style={{ fontSize }}>
        {stars.map((s) => {
          const diff = rating - s + 1;
          const icon = diff >= 1 ? "bi-star-fill" : diff >= 0.5 ? "bi-star-half" : "bi-star";
          return <i key={s} className={`bi ${icon} text-warm-orange-on-light`} aria-hidden="true" />;
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-stone-gray small">({reviewCount})</span>
      )}
    </div>
  );
}
