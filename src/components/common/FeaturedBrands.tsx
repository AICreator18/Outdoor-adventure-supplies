import { useState } from "react";
import type { Brand } from "../../types";
import brandsRaw from "../../data/brands.json";

const brands = brandsRaw as unknown as Brand[];

export default function FeaturedBrands() {
  const [badgeOk, setBadgeOk] = useState(true);

  return (
    <section className="bg-white py-4 py-lg-5">
      <div className="container text-center">
        {badgeOk && (
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{
              width: 180,
              height: 180,
              backgroundColor: "#f4f1e8",
              boxShadow: "0 4px 8px rgba(16,37,31,0.15)",
            }}
          >
            <img
              src="/images/decor/badge-est-2012-chennai.png"
              alt=""
              aria-hidden="true"
              style={{ width: 160 }}
              onError={() => setBadgeOk(false)}
            />
          </div>
        )}
        <p className="text-center text-stone-gray text-uppercase small letter-spacing-wide mb-4">
          Trusted Gear From Brands Built for the Outdoors
        </p>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 gap-lg-5">
          {brands.map((brand) => (
            <span key={brand.id} className="fw-bold fs-5 text-stone-gray brand-wordmark">
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
