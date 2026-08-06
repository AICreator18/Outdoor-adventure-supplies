import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug, getProductsByIds, getRelatedProducts } from "../services/productService";
import { getReviewsByProductId } from "../services/reviewService";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useToast } from "../hooks/useToast";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Breadcrumb from "../components/ui/Breadcrumb";
import ProductGallery from "../components/product/ProductGallery";
import ProductCard from "../components/product/ProductCard";
import ReviewList from "../components/product/ReviewList";
import StarRating from "../components/product/StarRating";
import PriceTag from "../components/product/PriceTag";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const { recentIds, trackView } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) trackView(product.id);
  }, [product, trackView]);

  if (!product) {
    return <NotFound />;
  }

  const reviews = getReviewsByProductId(product.id);
  const related = getRelatedProducts(product, 4);
  const recentlyViewed = getProductsByIds(recentIds.filter((id) => id !== product.id)).slice(0, 4);
  const inWishlist = isInWishlist(product.id);
  const avgRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : product.rating;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${quantity} × ${product.name} added to cart`, "success");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", "info");
  };

  return (
    <>
      <Section background="white" className="pb-0">
        <Breadcrumb
          className="mb-0"
          items={[
            { label: "Home", path: "/" },
            {
              label: product.category.charAt(0).toUpperCase() + product.category.slice(1),
              path: `/${product.category}`,
            },
            { label: product.name },
          ]}
        />
      </Section>

      <Section background="white" className="pt-3">
        <div className="row g-5">
          <div className="col-lg-6">
            <ProductGallery images={product.images} productName={product.name} />
          </div>
          <div className="col-lg-6">
            <h1 className="fw-bold mb-1">{product.name}</h1>
            <span className="text-uppercase text-stone-gray small d-block mb-3">{product.brand}</span>
            <div className="mb-3">
              <StarRating rating={avgRating} reviewCount={reviews.length || product.reviewCount} size="md" />
            </div>
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              currency={product.currency}
              size="lg"
            />
            <p className="text-stone-gray mt-3">{product.shortDescription}</p>

            {product.inStock ? (
              <span className="badge bg-forest bg-opacity-10 text-forest border border-forest mb-3">
                <i className="bi bi-check-circle me-1" aria-hidden="true" />
                In Stock ({product.stockCount} available)
              </span>
            ) : (
              <span className="badge bg-danger bg-opacity-10 text-danger border border-danger mb-3">
                Out of Stock
              </span>
            )}

            <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
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
                  onClick={() =>
                    setQuantity((current) => Math.min(product.stockCount || 99, current + 1))
                  }
                >
                  <i className="bi bi-plus" aria-hidden="true" />
                </button>
              </div>
              <Button
                variant="orange"
                size="lg"
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

            <ul className="list-unstyled mt-4 pt-4 border-top">
              {product.features.map((feature) => (
                <li key={feature} className="d-flex gap-2 mb-2">
                  <i className="bi bi-check2 text-forest mt-1" aria-hidden="true" />
                  <span className="text-stone-gray">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section background="cream">
        <div className="row g-5">
          <div className="col-lg-6">
            <h2 className="h4 fw-bold mb-3">Description</h2>
            <p className="text-stone-gray">{product.description}</p>
          </div>
          <div className="col-lg-6">
            <h2 className="h4 fw-bold mb-3">Specifications</h2>
            <table className="table">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row" className="text-stone-gray fw-normal" style={{ width: "45%" }}>
                      {key}
                    </th>
                    <td className="fw-semibold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section background="white">
        <h2 className="h4 fw-bold mb-4">Customer Reviews</h2>
        <ReviewList reviews={reviews} />
      </Section>

      {related.length > 0 && (
        <Section background="cream">
          <h2 className="h4 fw-bold mb-4">You Might Also Like</h2>
          <div className="row g-4">
            {related.map((relatedProduct) => (
              <div className="col-6 col-lg-3" key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {recentlyViewed.length > 0 && (
        <Section background="white">
          <h2 className="h4 fw-bold mb-4">Recently Viewed</h2>
          <div className="row g-4">
            {recentlyViewed.map((viewedProduct) => (
              <div className="col-6 col-lg-3" key={viewedProduct.id}>
                <ProductCard product={viewedProduct} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
