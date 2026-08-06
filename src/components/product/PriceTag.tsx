import { formatCurrency } from "../../utils/formatCurrency";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
}

export default function PriceTag({ price, originalPrice, currency = "INR", size = "md" }: PriceTagProps) {
  const sizeClass = size === "lg" ? "fs-4" : size === "sm" ? "small" : "";
  const hasDiscount = !!originalPrice && originalPrice > price;

  return (
    <div className={`d-flex align-items-baseline gap-2 ${sizeClass}`}>
      <span className="fw-bold text-ink">{formatCurrency(price, currency)}</span>
      {hasDiscount && (
        <span className="text-stone-gray text-decoration-line-through small">
          {formatCurrency(originalPrice, currency)}
        </span>
      )}
    </div>
  );
}
