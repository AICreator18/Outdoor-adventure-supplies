import { useState } from "react";

const TRUST_ITEMS = [
  { icon: "bi-patch-check", title: "Premium Quality", description: "Gear you can trust" },
  { icon: "bi-compass", title: "Outdoor Tested", description: "Built for real adventures" },
  { icon: "bi-currency-rupee", title: "Great Prices", description: "Save more on every trip" },
];

export default function SaleHeroBanner() {
  const [illustrationOk, setIllustrationOk] = useState(true);
  const [badgeOk, setBadgeOk] = useState(true);

  return (
    <section className="sale-hero-section position-relative overflow-hidden">
      <div className="container position-relative py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h1 className="display-5 fw-bold mb-2">
              <span className="text-ink">Sale on </span>
              <span className="text-warm-orange-on-light">Adventure Gear</span>
            </h1>
            <p className="text-stone-gray fs-5 mb-4 d-flex align-items-center gap-2">
              <i className="bi bi-lightning-charge-fill text-warm-orange-on-light" aria-hidden="true" />
              Top quality gear. Limited time offers.
            </p>
            <div className="row g-3">
              {TRUST_ITEMS.map((item) => (
                <div className="col-6 col-md-4" key={item.title}>
                  <div className="d-flex align-items-start gap-2">
                    <div
                      className="sale-hero-icon-circle d-inline-flex align-items-center justify-content-center rounded-circle border flex-shrink-0"
                      style={{ width: 40, height: 40 }}
                    >
                      <i
                        className={`bi ${item.icon} sale-hero-icon`}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="fw-semibold small text-ink mb-0">{item.title}</div>
                      <div className="text-stone-gray" style={{ fontSize: "0.8rem" }}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5 d-none d-lg-block position-relative" style={{ minHeight: 260 }}>
            {illustrationOk && (
              <img
                src="/images/scenes/sale-hero-illustration.png"
                alt=""
                aria-hidden="true"
                className="position-absolute bottom-0 end-0"
                style={{ maxWidth: "90%", maxHeight: 260 }}
                onError={() => setIllustrationOk(false)}
              />
            )}
            {badgeOk && (
              <img
                src="/images/decor/badge-adventure-awaits.png"
                alt=""
                aria-hidden="true"
                className="position-absolute top-0 end-0"
                style={{ width: 110, transform: "rotate(8deg)" }}
                onError={() => setBadgeOk(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="torn-edge-bottom" aria-hidden="true" />
    </section>
  );
}
