import { Link } from "react-router-dom";
import type { CartItem } from "../../types";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <div className="d-flex align-items-center gap-3 py-3 border-bottom flex-wrap">
      <Link to={`/products/${product.slug}`} className="flex-shrink-0" style={{ width: 84 }}>
        <div className="ratio ratio-1x1 rounded-md overflow-hidden bg-stone-gray-light">
          <img src={product.thumbnail} alt={product.name} className="img-cover" loading="lazy" />
        </div>
      </Link>
      <div className="flex-grow-1" style={{ minWidth: 160 }}>
        <Link to={`/products/${product.slug}`} className="text-decoration-none text-reset">
          <h3 className="h6 mb-1">{product.name}</h3>
        </Link>
        <span className="text-stone-gray small">{product.brand}</span>
      </div>
      <div className="d-flex align-items-center gap-2 flex-shrink-0">
        <button
          type="button"
          className="btn btn-sm btn-outline-forest"
          aria-label={`Decrease quantity of ${product.name}`}
          onClick={() => decreaseQuantity(product.id)}
        >
          <i className="bi bi-dash" aria-hidden="true" />
        </button>
        <span className="fw-semibold" style={{ minWidth: 24, textAlign: "center" }} aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          className="btn btn-sm btn-outline-forest"
          aria-label={`Increase quantity of ${product.name}`}
          onClick={() => increaseQuantity(product.id)}
        >
          <i className="bi bi-plus" aria-hidden="true" />
        </button>
      </div>
      <div className="text-end flex-shrink-0" style={{ minWidth: 100 }}>
        <span className="fw-bold text-ink">{formatCurrency(lineTotal, product.currency)}</span>
      </div>
      <button
        type="button"
        className="icon-btn flex-shrink-0"
        aria-label={`Remove ${product.name} from cart`}
        onClick={() => removeFromCart(product.id)}
      >
        <i className="bi bi-trash text-stone-gray" aria-hidden="true" />
      </button>
    </div>
  );
}
