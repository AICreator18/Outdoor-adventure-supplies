import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import StarRating from "./StarRating";
import PriceTag from "./PriceTag";
import { useQuickView } from "../../hooks/useQuickView";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useToast } from "../../hooks/useToast";

export default function QuickViewModal() {
  const { activeProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [activeProduct?.id]);

  if (!activeProduct) return null;

  const product = activeProduct;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${quantity} × ${product.name} added to cart`, "success");
    closeQuickView();
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", "info");
  };

  return (
    <Modal isOpen={!!activeProduct} onClose={closeQuickView} size="lg">
      <div className="row g-4">
        <div className="col-md-5">
          <div className="ratio ratio-1x1 rounded-md overflow-hidden bg-stone-gray-light">
            <img src={product.thumbnail} alt={product.name} className="img-cover" />
          </div>
        </div>
        <div className="col-md-7">
          <h2 className="h4 fw-bold mb-1">{product.name}</h2>
          <span className="text-uppercase text-stone-gray small d-block mb-2">{product.brand}</span>
          <div className="mb-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            currency={product.currency}
            size="lg"
          />
          <p className="text-stone-gray mt-3">{product.shortDescription}</p>

          {!product.inStock && (
            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger mb-2">
              Out of Stock
            </span>
          )}

          <div className="d-flex align-items-center gap-3 mt-3 flex-wrap">
            <div className="d-flex align-items-center border rounded-md">
              <button
                type="button"
                className="btn btn-link text-reset px-3"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <i className="bi bi-dash" aria-hidden="true" />
              </button>
              <span className="px-2 fw-semibold" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                className="btn btn-link text-reset px-3"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => current + 1)}
              >
                <i className="bi bi-plus" aria-hidden="true" />
              </button>
            </div>
            <Button
              variant="orange"
              icon="bi-bag-plus"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </Button>
            <button
              type="button"
              className="icon-btn border"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={inWishlist}
              onClick={handleToggleWishlist}
            >
              <i
                className={`bi ${inWishlist ? "bi-heart-fill text-warm-orange-on-light" : "bi-heart"}`}
                aria-hidden="true"
              />
            </button>
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="d-inline-block mt-4 text-forest fw-semibold text-decoration-none"
            onClick={closeQuickView}
          >
            View Full Details <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
