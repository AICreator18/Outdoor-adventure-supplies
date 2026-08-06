import HeroBanner from "../components/common/HeroBanner";
import FeaturedCategories from "../components/common/FeaturedCategories";
import StatsStrip from "../components/common/StatsStrip";
import ProductGridSection from "../components/common/ProductGridSection";
import FeaturedBrands from "../components/common/FeaturedBrands";
import TestimonialsSection from "../components/common/TestimonialsSection";
import FeaturedBlogPosts from "../components/common/FeaturedBlogPosts";
import InstagramGallery from "../components/common/InstagramGallery";
import NewsletterSection from "../components/common/NewsletterSection";
import { getBestSellers, getFeaturedProducts } from "../services/productService";

export default function Home() {
  const featured = getFeaturedProducts(8);
  const popular = getBestSellers(8, featured.map((p) => p.id));

  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <StatsStrip />
      <ProductGridSection
        title="Featured Gear"
        subtitle="Our team's top picks for this season's adventures."
        products={featured}
        background="cream"
        viewAllLink="/products"
      />
      <FeaturedBrands />
      <ProductGridSection
        title="Popular Products"
        subtitle="The gear our community reaches for again and again."
        products={popular}
        background="cream"
        viewAllLink="/products"
      />
      <TestimonialsSection />
      <FeaturedBlogPosts />
      <InstagramGallery />
      <NewsletterSection />
    </>
  );
}
