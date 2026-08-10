import type { PlacedOrder } from "../../types/checkout";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../ui/Button";

interface ConfirmationStepProps {
  order: PlacedOrder;
  onContinueShopping: () => void;
}

export default function ConfirmationStep({ order, onContinueShopping }: ConfirmationStepProps) {
  const {
    payment, address, items, shippingCharge, discountAmount, promoCode, gstin,
    grandTotal, orderId, shippingEstimate,
  } = order;

  const paymentLabel =
    payment.method === "card"
      ? `Card ···· ${payment.card?.number.replace(/\s/g, "").slice(-4)}`
      : payment.method === "upi"
        ? `UPI: ${payment.upiId}`
        : "Cash on Delivery";

  return (
    <div className="text-center py-4">
      <div className="mb-4">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{ width: 80, height: 80, backgroundColor: "var(--color-forest)", opacity: 0.12 }}
          aria-hidden="true"
        />
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 position-absolute"
          style={{ width: 80, height: 80, transform: "translateX(-80px)", backgroundColor: "transparent" }}
        >
          <i className="bi bi-check-circle-fill text-forest" style={{ fontSize: "2.5rem" }} aria-hidden="true" />
        </div>
        <h1 className="h3 fw-bold mb-1">Order Placed!</h1>
        <p className="text-stone-gray mb-0">
          Thank you, {address.fullName.split(" ")[0]}. Your order is confirmed.
        </p>
      </div>

      <div className="bg-cream rounded-md p-4 mb-4 text-start mx-auto" style={{ maxWidth: 520 }}>
        <div className="d-flex justify-content-between align-items-start mb-3 pb-3 border-bottom">
          <div>
            <span className="text-stone-gray small d-block">Order ID</span>
            <span className="fw-bold font-monospace">{orderId}</span>
          </div>
          <div className="text-end">
            <span className="text-stone-gray small d-block">Total Paid</span>
            <span className="fw-bold text-forest">{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        <div className="mb-3 pb-3 border-bottom">
          <span className="text-stone-gray small d-block mb-2">Items Ordered</span>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="d-flex justify-content-between small mb-1">
              <span className="text-stone-gray">{quantity} × {product.name}</span>
              <span>{formatCurrency(product.price * quantity)}</span>
            </div>
          ))}
          {shippingCharge > 0 && (
            <div className="d-flex justify-content-between small text-stone-gray mt-1">
              <span>Shipping</span>
              <span>{formatCurrency(shippingCharge)}</span>
            </div>
          )}
          {shippingCharge === 0 && (
            <div className="d-flex justify-content-between small text-stone-gray mt-1">
              <span>Shipping</span>
              <span className="text-forest">Free</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="d-flex justify-content-between small text-forest mt-1">
              <span>Promo{promoCode ? ` (${promoCode})` : ""}</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between fw-semibold small mt-2 pt-2 border-top">
            <span>Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        <div className="row g-3 small">
          <div className="col-6">
            <span className="text-stone-gray d-block">Delivering to</span>
            <span className="fw-semibold">{address.addressLine}, {address.city}</span>
            <span className="d-block">{address.state} — {address.pincode}</span>
          </div>
          <div className="col-6">
            <span className="text-stone-gray d-block">Payment</span>
            <span className="fw-semibold">{paymentLabel}</span>
            <span className="text-stone-gray d-block mt-1">Est. delivery: {shippingEstimate}</span>
          </div>
        </div>

        {gstin && (
          <div className="small mt-3 pt-3 border-top">
            <span className="text-stone-gray d-block">GST Invoice</span>
            <span className="fw-semibold">Issued to {gstin}</span>
          </div>
        )}
      </div>

      <p className="text-stone-gray small mb-4">
        A confirmation has been sent to <strong>{address.email}</strong>.
      </p>

      <Button variant="primary" size="lg" icon="bi-arrow-right" iconPosition="end" onClick={onContinueShopping}>
        Continue Shopping
      </Button>
    </div>
  );
}
