import { useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../data/navigation";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useTheme } from "../../hooks/useTheme";
import MegaMenu from "./MegaMenu";
import TopBar from "./TopBar";
import Offcanvas from "../ui/Offcanvas";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
    setSearchOpen(false);
  };

  return (
    <header>
      <TopBar />
      <nav
        className="navbar navbar-expand-lg bg-white border-bottom py-3 sticky-top"
        aria-label="Main navigation"
      >
        <div className="container d-flex align-items-center justify-content-between flex-wrap">
          <Link to="/" className="brand-mark d-flex align-items-center gap-2 text-decoration-none">
            <i className="bi bi-tree-fill text-forest fs-3" aria-hidden="true" />
            <span>
              Outdoor <span className="text-forest">Adventure</span>
            </span>
          </Link>

          <ul className="navbar-nav-desktop d-none d-lg-flex align-items-center gap-1 mb-0 list-unstyled">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="nav-item-mega position-relative"
                onMouseEnter={() => item.megaMenu && setActiveMenu(item.label)}
                onMouseLeave={() => item.megaMenu && setActiveMenu(null)}
              >
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `nav-link-custom px-3 py-2 d-inline-flex align-items-center gap-1 fw-semibold ${
                      item.highlight ? "text-warm-orange-on-light" : ""
                    } ${isActive ? "active" : ""}`
                  }
                >
                  {item.label}
                  {item.megaMenu && <i className="bi bi-chevron-down small" aria-hidden="true" />}
                </NavLink>
                {item.megaMenu && activeMenu === item.label && (
                  <div className="mega-menu-wrapper">
                    <MegaMenu columns={item.megaMenu} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <form
            className="d-none d-sm-flex d-lg-none flex-grow-1 mx-3"
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <label htmlFor="navbar-search-inline" className="visually-hidden">
              Search products
            </label>
            <input
              id="navbar-search-inline"
              type="search"
              className="form-control form-control-sm"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </form>

          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              className="icon-btn"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-btn d-sm-none d-lg-inline-flex"
              aria-label={searchOpen ? "Close search" : "Search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
            >
              <i className={`bi ${searchOpen ? "bi-x-lg" : "bi-search"}`} aria-hidden="true" />
            </button>
            <Link to="/wishlist" className="icon-btn d-none d-sm-inline-flex" aria-label="Wishlist">
              <i className="bi bi-heart" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="icon-badge badge rounded-pill bg-warm-orange text-white">{wishlistCount}</span>
              )}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Shopping cart">
              <i className="bi bi-bag" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="icon-badge badge rounded-pill bg-forest text-white">{cartCount}</span>
              )}
            </Link>
            <button
              type="button"
              className="icon-btn d-lg-none"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <i className="bi bi-list" aria-hidden="true" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-top mt-3 pt-3">
            <form className="container d-flex gap-2" onSubmit={handleSearchSubmit} role="search">
              <label htmlFor="navbar-search" className="visually-hidden">
                Search products
              </label>
              <input
                id="navbar-search"
                type="search"
                className="form-control"
                placeholder="Search for tents, backpacks, kayaks..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn-primary flex-shrink-0">
                Search
              </button>
            </form>
          </div>
        )}
      </nav>

      <Offcanvas isOpen={mobileOpen} onClose={closeMobileMenu} title="Menu" side="end">
        <ul className="list-unstyled mb-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="border-bottom">
              <div className="d-flex align-items-center justify-content-between">
                <Link
                  to={item.path}
                  className={`flex-grow-1 py-3 px-3 text-decoration-none text-reset fw-semibold ${
                    item.highlight ? "text-warm-orange-on-light" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
                {item.megaMenu && (
                  <button
                    type="button"
                    className="btn btn-link text-reset px-3"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={mobileExpanded === item.label}
                    onClick={() =>
                      setMobileExpanded((current) => (current === item.label ? null : item.label))
                    }
                  >
                    <i
                      className={`bi ${mobileExpanded === item.label ? "bi-dash-lg" : "bi-plus-lg"}`}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
              {item.megaMenu && mobileExpanded === item.label && (
                <div className="px-3 pb-3">
                  {item.megaMenu.map((column) => (
                    <div key={column.title} className="mb-2">
                      <span className="text-stone-gray small text-uppercase letter-spacing-wide">
                        {column.title}
                      </span>
                      <ul className="list-unstyled ms-2 mb-0">
                        {column.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              to={link.path}
                              className="text-decoration-none text-reset d-block py-1"
                              onClick={closeMobileMenu}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li className="pt-3 px-3 d-flex gap-2">
            <Link
              to="/wishlist"
              className="btn btn-outline-forest flex-grow-1 d-inline-flex align-items-center justify-content-center gap-2"
              onClick={closeMobileMenu}
            >
              <i className="bi bi-heart" aria-hidden="true" />
              Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
            </Link>
            <Link
              to="/cart"
              className="btn btn-primary flex-grow-1 d-inline-flex align-items-center justify-content-center gap-2"
              onClick={closeMobileMenu}
            >
              <i className="bi bi-bag" aria-hidden="true" />
              Cart{cartCount > 0 ? ` (${cartCount})` : ""}
            </Link>
          </li>
        </ul>
      </Offcanvas>
    </header>
  );
}
