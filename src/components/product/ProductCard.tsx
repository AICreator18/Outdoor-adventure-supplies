import { memo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import StarRating from "./StarRating";
import PriceTag from "./PriceTag";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useToast } from "../../hooks/useToast";
import { useQuickView } from "../../hooks/useQuickView";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const { openQuickView } = useQuickView();

  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : 0;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart`, "success");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      inWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`,
      "info",
    );
  };

  return (
    <div className="card h-100 border-0 shadow-brand-sm hover-lift rounded-md overflow-hidden">
      <div className="ratio ratio-4x3 bg-stone-gray-light overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.images[0]?.alt ?? product.name}
          className="img-contain-padded"
          loading="lazy"
        />
        <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1">
          {product.isNew && <span className="badge badge-new rounded-pill px-2 py-1">New</span>}
          {product.isOnSale && discount > 0 && (
            <span className="badge badge-sale rounded-pill px-2 py-1">-{discount}%</span>
          )}
        </div>
        <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
          <button
            type="button"
            className="card-action-btn icon-btn bg-white shadow-sm"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={inWishlist}
            onClick={handleToggleWishlist}
          >
            <i
              className={`bi ${inWishlist ? "bi-heart-fill text-warm-orange-on-light" : "bi-heart"}`}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className="card-action-btn icon-btn bg-white shadow-sm"
            aria-label={`Quick view ${product.name}`}
            onClick={() => openQuickView(product)}
          >
            <i className="bi bi-eye" aria-hidden="true" />
          </button>
        </div>
        {!product.inStock && (
          <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-75 text-white text-center small py-1">
            Out of Stock
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="h6 mb-1">
          <Link to={`/products/${product.slug}`} className="text-decoration-none text-reset stretched-link">
            {product.name}
          </Link>
        </h3>
        <span className="text-uppercase text-stone-gray small mb-1">{product.brand}</span>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto pt-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <PriceTag price={product.price} originalPrice={product.originalPrice} currency={product.currency} />
          <button
            type="button"
            className="card-action-btn btn btn-sm btn-warm-orange d-inline-flex align-items-center justify-content-center p-0 flex-shrink-0"
            style={{ width: 44, height: 44 }}
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <i className="bi bi-bag-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
