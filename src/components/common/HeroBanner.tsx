import Button from "../ui/Button";

const HERO_IMAGE = "/images/scenes/hero-banner.jpg";

const HERO_TRUST_ITEMS = [
  { icon: "bi-patch-check-fill", title: "Premium Quality", description: "Field-tested products" },
  { icon: "bi-award-fill", title: "Expert Guidance", description: "Real advice from explorers" },
  { icon: "bi-truck", title: "Fast & Reliable Delivery", description: "Across India, always" },
  { icon: "bi-heart-fill", title: "Support That Cares", description: "Before, during and after your trip" },
];

export default function HeroBanner() {
  return (
    <section className="bg-deep-green text-white position-relative overflow-hidden">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold text-white mb-3">Gear Up. Go Further.</h1>
            <p className="fs-5 text-white-50 mb-4">
              Premium camping, hiking, boating and fishing equipment engineered for real adventure —
              trusted by explorers from basecamp to backcountry.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button to="/products" variant="orange" size="lg" icon="bi-arrow-right" iconPosition="end">
                Shop All Gear
              </Button>
              <Button to="/camping" variant="outline-light" size="lg">
                Explore Camping
              </Button>
            </div>
            <div className="row g-3 mt-4 pt-2">
              {HERO_TRUST_ITEMS.map((item) => (
                <div className="col-6" key={item.title}>
                  <div className="d-flex align-items-start gap-2">
                    <i className={`bi ${item.icon} fs-5 text-warm-orange mt-1`} aria-hidden="true" />
                    <div>
                      <div className="fw-semibold small text-white mb-0">{item.title}</div>
                      <div className="text-white-50 small">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="ratio ratio-4x3 bg-deep-green rounded-md overflow-hidden">
              <img
                src={HERO_IMAGE}
                alt="Hikers overlooking a mountain valley at sunrise"
                style={{ objectFit: "contain" }}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="torn-edge-bottom" aria-hidden="true" />
    </section>
  );
}
