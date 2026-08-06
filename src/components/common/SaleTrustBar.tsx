const ITEMS = [
  {
    icon: "bi-hourglass-split",
    title: "Limited Time Offer",
    description: "Grab the best deals before they're gone!",
  },
  { icon: "bi-truck", title: "Free Shipping", description: "On orders above ₹5,000" },
  { icon: "bi-arrow-repeat", title: "Easy Returns", description: "30-day return policy" },
];

export default function SaleTrustBar() {
  return (
    <section className="bg-cream py-4">
      <div className="container">
        <div className="row g-4 text-center text-md-start">
          {ITEMS.map((item) => (
            <div
              className="col-md-4 d-flex align-items-center gap-3 justify-content-center justify-content-md-start"
              key={item.title}
            >
              <i className={`bi ${item.icon} fs-3 text-forest flex-shrink-0`} aria-hidden="true" />
              <div>
                <div className="fw-semibold text-ink">{item.title}</div>
                <div className="text-stone-gray small">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
