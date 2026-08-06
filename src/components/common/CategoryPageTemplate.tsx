import type { CategorySlug } from "../../types";
import { getCategoryBySlug } from "../../services/categoryService";
import Section from "../ui/Section";
import Breadcrumb from "../ui/Breadcrumb";
import ProductListing from "./ProductListing";

interface CategoryPageTemplateProps {
  slug: CategorySlug;
}

export default function CategoryPageTemplate({ slug }: CategoryPageTemplateProps) {
  const category = getCategoryBySlug(slug);

  return (
    <>
      <section className="bg-deep-green text-white">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <Breadcrumb
                variant="light"
                className="mb-3"
                items={[{ label: "Home", path: "/" }, { label: category?.name ?? slug }]}
              />
              <h1 className="display-6 fw-bold text-white mb-2">{category?.name ?? slug}</h1>
              {category?.description && (
                <p className="text-white-50 mb-0" style={{ maxWidth: 480 }}>
                  {category.description}
                </p>
              )}
            </div>
            {category && (
              <div className="col-lg-6 d-none d-lg-block">
                <div className="ratio ratio-4x3 bg-deep-green rounded-md overflow-hidden">
                  <img src={category.image} alt={category.name} style={{ objectFit: "contain" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Section background="white">
        <ProductListing category={slug} />
      </Section>
    </>
  );
}
