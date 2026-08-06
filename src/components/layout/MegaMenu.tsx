import { Link } from "react-router-dom";
import type { MegaMenuColumn } from "../../types";

interface MegaMenuProps {
  columns: MegaMenuColumn[];
  onNavigate?: () => void;
}

export default function MegaMenu({ columns, onNavigate }: MegaMenuProps) {
  return (
    <div className="mega-menu shadow-brand-lg bg-white rounded-md border-0">
      <div className="row gx-5">
        {columns.map((column) => (
          <div className="col-12 col-md-4" key={column.title}>
            <h4 className="h6 text-forest text-uppercase letter-spacing-wide mb-3">{column.title}</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-decoration-none text-reset d-block"
                    onClick={onNavigate}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
