import type { Product } from "../../types";
import ProductCard from "../product/ProductCard";
import Section from "../ui/Section";
import Button from "../ui/Button";

type SectionBackground = "white" | "cream" | "stone-gray-light";

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  background?: SectionBackground;
  viewAllLink?: string;
}

export default function ProductGridSection({
  title,
  subtitle,
  products,
  background = "white",
  viewAllLink,
}: ProductGridSectionProps) {
  return (
    <Section background={background}>
      <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 mb-lg-5 gap-3">
        <div>
          <h2 className="fw-bold mb-1">{title}</h2>
          {subtitle && <p className="text-stone-gray mb-0">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Button to={viewAllLink} variant="outline" icon="bi-arrow-right" iconPosition="end">
            View All
          </Button>
        )}
      </div>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-6 col-lg-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Section>
  );
}
