import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { CategorySlug, Product } from "../../types";
import { getAllProducts, getProductsByCategory } from "../../services/productService";
import ProductCard from "../product/ProductCard";
import ProductFilters from "../product/ProductFilters";
import Pagination from "../ui/Pagination";
import SectionTitle from "../ui/SectionTitle";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc" | "newest";

const PAGE_SIZE = 12;

interface ProductListingProps {
  category?: CategorySlug;
  title?: string;
  subtitle?: string;
}

export default function ProductListing({ category, title, subtitle }: ProductListingProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const catalogMaxPrice = useMemo(() => Math.max(...getAllProducts().map((p) => p.price), 0), []);
  const baseProducts = useMemo(
    () => (category ? getProductsByCategory(category) : getAllProducts()),
    [category],
  );

  // All filter state lives in the URL — survives back/forward and is shareable
  const searchTerm = searchParams.get("q") ?? "";
  const saleOnly = searchParams.get("sale") === "true";
  const selectedCategories = (searchParams.get("cat") ?? "")
    .split(",")
    .filter(Boolean) as CategorySlug[];
  const priceLimit = searchParams.has("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : catalogMaxPrice;
  const minRating = Number(searchParams.get("minRating") ?? 0);
  const sortBy = (searchParams.get("sort") ?? "featured") as SortOption;
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? 1));

  const setParam = (updates: Record<string, string | null>, resetPage = true) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(updates)) {
          if (value === null || value === "") next.delete(key);
          else next.set(key, value);
        }
        if (resetPage) next.delete("page");
        return next;
      },
      { replace: true },
    );
  };

  const toggleCategory = (value: CategorySlug) => {
    const next = selectedCategories.includes(value)
      ? selectedCategories.filter((c) => c !== value)
      : [...selectedCategories, value];
    setParam({ cat: next.join(",") || null });
  };

  const clearFilters = () => {
    // Preserve only the sale param if set via the Sale nav link
    setSearchParams(saleOnly ? { sale: "true" } : {}, { replace: true });
  };

  const filtered = useMemo(() => {
    let result: Product[] = baseProducts;

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter((product) =>
        [product.name, product.brand, product.subcategory, ...product.tags].some((field) =>
          field.toLowerCase().includes(query),
        ),
      );
    }

    if (!category && selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    if (saleOnly) {
      result = result.filter((product) => product.isOnSale);
    }

    result = result.filter((product) => product.price <= priceLimit);
    result = result.filter((product) => product.rating >= minRating);

    const sorted = [...result];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    return sorted;
  }, [baseProducts, searchTerm, selectedCategories, saleOnly, priceLimit, minRating, sortBy, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  return (
    <>
      {title && <SectionTitle align="start" title={title} subtitle={subtitle} />}

      <div className="mb-4">
        <label htmlFor="listing-search" className="visually-hidden">
          Search products
        </label>
        <div className="input-group" style={{ maxWidth: 420 }}>
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-stone-gray" aria-hidden="true" />
          </span>
          <input
            id="listing-search"
            type="search"
            className="form-control border-start-0"
            placeholder="Search this catalog..."
            value={searchTerm}
            onChange={(event) => setParam({ q: event.target.value || null })}
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-3">
          <ProductFilters
            showCategoryFilter={!category}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            maxPrice={catalogMaxPrice}
            priceLimit={priceLimit}
            onPriceLimitChange={(value) => setParam({ maxPrice: String(value) })}
            minRating={minRating}
            onMinRatingChange={(value) => setParam({ minRating: value > 0 ? String(value) : null })}
            onClearFilters={clearFilters}
          />
        </div>
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
            <div className="d-flex align-items-center gap-3">
              <p className="text-stone-gray mb-0">
                {filtered.length} {filtered.length === 1 ? "product" : "products"} found
              </p>
              {saleOnly && (
                <button
                  type="button"
                  className="badge badge-sale rounded-pill px-3 py-2 border-0 d-inline-flex align-items-center gap-1"
                  onClick={() => setParam({ sale: null })}
                >
                  Sale items only
                  <i className="bi bi-x-lg small" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="sort-select" className="small text-stone-gray mb-0">
                Sort by
              </label>
              <select
                id="sort-select"
                className="form-select form-select-sm"
                style={{ width: "auto" }}
                value={sortBy}
                onChange={(event) => setParam({ sort: event.target.value !== "featured" ? event.target.value : null })}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="text-center py-5">
              <i
                className="bi bi-search display-4 text-stone-gray mb-3 d-inline-block"
                aria-hidden="true"
              />
              <p className="text-stone-gray mb-0">No products match your filters. Try adjusting them.</p>
            </div>
          ) : (
            <div className="row g-4">
              {pageItems.map((product) => (
                <div className="col-6 col-xl-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={pageSafe}
            totalPages={totalPages}
            onPageChange={(page) => setParam({ page: page > 1 ? String(page) : null }, false)}
          />
        </div>
      </div>
    </>
  );
}
