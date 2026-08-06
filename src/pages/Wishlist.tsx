import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import ProductCard from "../components/product/ProductCard";
import { useWishlist } from "../hooks/useWishlist";

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <Section background="white" className="text-center">
        <i className="bi bi-heart display-1 text-stone-gray mb-4 d-inline-block" aria-hidden="true" />
        <h1 className="fw-bold mb-3">Your Wishlist Is Empty</h1>
        <p className="text-stone-gray mb-4 mx-auto" style={{ maxWidth: 480 }}>
          Save items you love by tapping the heart icon on any product, so you can find them again
          later.
        </p>
        <Button to="/products" variant="primary" size="lg" icon="bi-arrow-right" iconPosition="end">
          Browse Products
        </Button>
      </Section>
    );
  }

  return (
    <Section background="white">
      <SectionTitle
        align="start"
        title={`Your Wishlist (${items.length} ${items.length === 1 ? "item" : "items"})`}
      />
      <div className="row g-4">
        {items.map((product) => (
          <div className="col-6 col-lg-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Section>
  );
}
