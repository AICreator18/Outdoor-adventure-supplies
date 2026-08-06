const STATS = [
  { icon: "bi-calendar3", value: "12+", label: "Years in Business" },
  { icon: "bi-people-fill", value: "180K+", label: "Happy Adventurers" },
  { icon: "bi-backpack2-fill", value: "1,200+", label: "Gear Products" },
  { icon: "bi-geo-alt-fill", value: "45+", label: "Cities Served" },
];

export default function StatsStrip() {
  return (
    <section className="bg-deep-green text-white py-4">
      <div className="container">
        <div className="row g-4 text-center">
          {STATS.map((stat) => (
            <div className="col-6 col-md-3" key={stat.label}>
              <i className={`bi ${stat.icon} fs-3 text-warm-orange mb-2 d-inline-block`} aria-hidden="true" />
              <div className="fs-3 fw-bold">{stat.value}</div>
              <div className="text-white-50 small text-uppercase letter-spacing-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
