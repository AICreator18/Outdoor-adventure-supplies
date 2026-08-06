function ProductCardSkeleton() {
  return (
    <div className="card h-100 border-0 shadow-brand-sm rounded-md overflow-hidden" aria-hidden="true">
      <div className="ratio ratio-4x3 skeleton-shimmer" />
      <div className="card-body">
        <div className="skeleton-line w-50 mb-2" />
        <div className="skeleton-line w-75 mb-2" />
        <div className="skeleton-line w-25" />
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
}

export default function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="row g-4" aria-label="Loading products" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="col-6 col-lg-3" key={index}>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
