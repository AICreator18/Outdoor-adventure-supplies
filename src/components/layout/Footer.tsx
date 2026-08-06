import { Link } from "react-router-dom";

const SHOP_LINKS = [
  { label: "Camping", path: "/camping" },
  { label: "Hiking", path: "/hiking" },
  { label: "Boating", path: "/boating" },
  { label: "Fishing", path: "/fishing" },
  { label: "Accessories", path: "/accessories" },
];

const COMPANY_LINKS = [
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "All Products", path: "/products" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", icon: "bi-instagram", url: "https://www.instagram.com" },
  { label: "Facebook", icon: "bi-facebook", url: "https://www.facebook.com" },
  { label: "YouTube", icon: "bi-youtube", url: "https://www.youtube.com" },
  { label: "X", icon: "bi-twitter-x", url: "https://www.x.com" },
];

const PAYMENT_METHODS = [
  { label: "UPI", icon: "bi-phone" },
  { label: "Debit Card", icon: "bi-credit-card" },
  { label: "Credit Card", icon: "bi-credit-card-2-front" },
];

export default function Footer() {
  return (
    <footer className="bg-deep-green text-white-50 pt-5">
      <div className="container">
        <div className="row gy-4 pb-5">
          <div className="col-12 col-lg-4">
            <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-3">
              <i className="bi bi-tree-fill text-warm-orange fs-3" aria-hidden="true" />
              <span className="font-heading fs-5 fw-bold text-white">Outdoor Adventure Supplies</span>
            </Link>
            <p className="mb-3">
              Premium gear for campers, hikers, paddlers and anglers. Built for the trail, tested on the
              water, trusted at basecamp.
            </p>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="d-flex gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn bg-white bg-opacity-10 text-white"
                    aria-label={social.label}
                  >
                    <i className={`bi ${social.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
              <Link
                to="/blog"
                className="text-white-50 text-decoration-none d-inline-flex align-items-center gap-1 small"
              >
                <i className="bi bi-journal-text" aria-hidden="true" />
                Read Our Blog
              </Link>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h3 className="h6 text-white text-uppercase letter-spacing-wide mb-3">Shop</h3>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-white-50 text-decoration-none">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h3 className="h6 text-white text-uppercase letter-spacing-wide mb-3">Company</h3>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-white-50 text-decoration-none">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <h3 className="h6 text-white text-uppercase letter-spacing-wide mb-3">Visit Us</h3>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <i className="bi bi-geo-alt me-2" aria-hidden="true" />
                24 OMR Service Road, Thoraipakkam, Chennai, Tamil Nadu 600097
              </li>
              <li>
                <i className="bi bi-telephone me-2" aria-hidden="true" />
                +91 44 1234 5678
              </li>
              <li>
                <i className="bi bi-envelope me-2" aria-hidden="true" />
                support@outdooradventure.in
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-top border-white border-opacity-10 py-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small">
          <span>&copy; {new Date().getFullYear()} Outdoor Adventure Supplies. All rights reserved.</span>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <span className="text-uppercase letter-spacing-wide small">
              We Accept
            </span>
            {PAYMENT_METHODS.map((method) => (
              <span key={method.label} className="d-inline-flex align-items-center gap-1">
                {method.icon && <i className={`bi ${method.icon}`} aria-hidden="true" />}
                {method.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
