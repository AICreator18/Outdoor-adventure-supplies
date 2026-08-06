import { Link } from "react-router-dom";
import type { Category } from "../../types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/${category.slug}`}
      className="text-decoration-none d-block position-relative rounded-lg overflow-hidden hover-lift shadow-brand-sm"
    >
      <div className="ratio ratio-1x1">
        <img src={category.image} alt={category.name} className="img-cover" loading="lazy" />
      </div>
      <div
        className="position-absolute bottom-0 start-0 end-0 p-3 p-lg-4"
        style={{ background: "linear-gradient(to top, rgba(16,37,31,0.88), rgba(16,37,31,0))" }}
      >
        <i className={`bi ${category.icon} text-warm-orange fs-4 mb-1 d-block`} aria-hidden="true" />
        <h3 className="h5 text-white mb-0">{category.name}</h3>
      </div>
    </Link>
  );
}
