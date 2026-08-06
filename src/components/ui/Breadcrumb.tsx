import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
  className?: string;
}

export default function Breadcrumb({ items, variant = "dark", className = "" }: BreadcrumbProps) {
  const linkClass = variant === "light" ? "text-white-50 text-decoration-none" : "text-decoration-none";
  const activeClass = variant === "light" ? "text-white" : "";

  return (
    <nav aria-label="breadcrumb">
      <ol className={`breadcrumb ${className}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          if (isLast || !item.path) {
            return (
              <li
                key={item.label}
                className={`breadcrumb-item active ${activeClass}`}
                aria-current="page"
              >
                {item.label}
              </li>
            );
          }
          return (
            <li key={item.label} className="breadcrumb-item">
              <Link to={item.path} className={linkClass}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
