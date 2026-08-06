import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import ProductListing from "../components/common/ProductListing";
import SaleHeroBanner from "../components/common/SaleHeroBanner";
import SaleTrustBar from "../components/common/SaleTrustBar";
import Section from "../components/ui/Section";

export default function Products() {
  const [searchParams] = useSearchParams();
  const isSalePage = searchParams.get("sale") === "true";
  const totalCount = getAllProducts().length;

  return (
    <>
      {isSalePage && <SaleHeroBanner />}
      <Section background="white">
        <ProductListing
          title={isSalePage ? undefined : "All Gear"}
          subtitle={isSalePage ? undefined : `Browse our complete collection of ${totalCount} products.`}
        />
      </Section>
      {isSalePage && <SaleTrustBar />}
    </>
  );
}
