import { useState } from "react";
import type { CategorySlug } from "../../types";
import { getAllCategories } from "../../services/categoryService";
import CategoryCard from "../product/CategoryCard";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";

const FEATURED_SLUGS: CategorySlug[] = ["camping", "boating", "hiking", "fishing"];

export default function FeaturedCategories() {
  const categories = getAllCategories().filter((category) => FEATURED_SLUGS.includes(category.slug));
  const [compassOk, setCompassOk] = useState(true);

  return (
    <Section background="white">
      <div className="d-flex align-items-center justify-content-center gap-4">
        {compassOk && (
          <div
            className="d-none d-lg-flex align-items-center justify-content-center flex-shrink-0 rounded-circle dark-mode-icon-backdrop"
            style={{ width: 140, height: 140 }}
          >
            <img
              src="/images/decor/sketch-divider-compass.png"
              alt=""
              aria-hidden="true"
              style={{ width: 100 }}
              onError={() => setCompassOk(false)}
            />
          </div>
        )}
        <SectionTitle
          align="start"
          title="Built for Every Adventure"
          subtitle="From basecamp to backcountry, find the right gear for wherever the trail takes you."
        />
      </div>
      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-6 col-lg-3" key={category.id}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </Section>
  );
}
