import type { CategorySlug } from "../../types";

const CATEGORY_OPTIONS: { value: CategorySlug; label: string }[] = [
  { value: "camping", label: "Camping" },
  { value: "hiking", label: "Hiking" },
  { value: "boating", label: "Boating" },
  { value: "fishing", label: "Fishing" },
  { value: "accessories", label: "Accessories" },
];

const RATING_OPTIONS = [4, 3, 2, 1];

interface ProductFiltersProps {
  showCategoryFilter: boolean;
  selectedCategories: CategorySlug[];
  onToggleCategory: (category: CategorySlug) => void;
  maxPrice: number;
  priceLimit: number;
  onPriceLimitChange: (value: number) => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
  onClearFilters: () => void;
}

export default function ProductFilters({
  showCategoryFilter,
  selectedCategories,
  onToggleCategory,
  maxPrice,
  priceLimit,
  onPriceLimitChange,
  minRating,
  onMinRatingChange,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <div className="bg-cream rounded-md p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h6 fw-bold mb-0">Filters</h2>
        <button type="button" className="btn btn-link btn-sm p-0 text-forest" onClick={onClearFilters}>
          Clear All
        </button>
      </div>

      {showCategoryFilter && (
        <div className="mb-4">
          <h3 className="small fw-bold text-uppercase letter-spacing-wide text-stone-gray mb-2">
            Category
          </h3>
          {CATEGORY_OPTIONS.map((option) => (
            <div className="form-check" key={option.value}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`filter-category-${option.value}`}
                checked={selectedCategories.includes(option.value)}
                onChange={() => onToggleCategory(option.value)}
              />
              <label className="form-check-label" htmlFor={`filter-category-${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4">
        <h3 className="small fw-bold text-uppercase letter-spacing-wide text-stone-gray mb-2">
          Max Price
        </h3>
        <input
          type="range"
          className="form-range"
          min={0}
          max={maxPrice}
          step={100}
          value={priceLimit}
          onChange={(event) => onPriceLimitChange(Number(event.target.value))}
          aria-label="Maximum price"
        />
        <div className="d-flex justify-content-between small text-stone-gray">
          <span>₹0</span>
          <span className="fw-semibold text-ink">
            Up to ₹{priceLimit.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div>
        <h3 className="small fw-bold text-uppercase letter-spacing-wide text-stone-gray mb-2">
          Minimum Rating
        </h3>
        {RATING_OPTIONS.map((rating) => (
          <div className="form-check" key={rating}>
            <input
              type="radio"
              className="form-check-input"
              name="rating-filter"
              id={`filter-rating-${rating}`}
              checked={minRating === rating}
              onChange={() => onMinRatingChange(rating)}
            />
            <label className="form-check-label" htmlFor={`filter-rating-${rating}`}>
              {rating}★ &amp; up
            </label>
          </div>
        ))}
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="rating-filter"
            id="filter-rating-any"
            checked={minRating === 0}
            onChange={() => onMinRatingChange(0)}
          />
          <label className="form-check-label" htmlFor="filter-rating-any">
            Any Rating
          </label>
        </div>
      </div>
    </div>
  );
}
