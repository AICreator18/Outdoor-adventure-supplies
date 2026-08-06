import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { getShippingEstimate, FREE_SHIPPING_THRESHOLD } from "../utils/shipping";
import { formatCurrency } from "../utils/formatCurrency";
import Section from "../components/ui/Section";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
import AddressStep from "../components/checkout/AddressStep";
import PaymentStep from "../components/checkout/PaymentStep";
import ConfirmationStep from "../components/checkout/ConfirmationStep";
import type { AddressData, PaymentData, PlacedOrder } from "../types/checkout";

function generateOrderId() {
  return `OAS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState<AddressData | null>(null);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    if (items.length === 0 && step !== 3) navigate("/cart", { replace: true });
  }, [items.length, step, navigate]);

  const shipping = address ? getShippingEstimate(address.pincode, subtotal) : null;
  const shippingCharge = shipping?.charge ?? 0;

  const handleAddressNext = (data: AddressData) => {
    setAddress(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentNext = (data: PaymentData) => {
    const codFee = data.method === "cod" ? 40 : 0;
    const placedOrder: PlacedOrder = {
      orderId: generateOrderId(),
      items: [...items],
      address: address!,
      payment: data,
      subtotal,
      shippingCharge,
      grandTotal: subtotal + shippingCharge + codFee,
      shippingEstimate: shipping?.estimate ?? "5–7 business days",
    };
    setOrder(placedOrder);
    clearCart();
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section background="white">
      <div style={{ maxWidth: 900 }} className="mx-auto">
        <CheckoutStepper current={step} />

        {step === 3 && order ? (
          <ConfirmationStep order={order} onContinueShopping={() => navigate("/products")} />
        ) : (
          <div className="row g-5">
            <div className="col-lg-7">
              {step === 1 && (
                <AddressStep initial={address} onNext={handleAddressNext} />
              )}
              {step === 2 && address && (
                <PaymentStep
                  initial={payment}
                  address={address}
                  subtotal={subtotal}
                  shippingCharge={shippingCharge}
                  onBack={() => { setPayment(null); setStep(1); }}
                  onNext={handlePaymentNext}
                />
              )}
            </div>

            <div className="col-lg-5">
              <div className="bg-cream rounded-md p-4 sticky-top" style={{ top: 90 }}>
                <h2 className="h6 fw-bold mb-3">Order Summary</h2>
                <div className="mb-3">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="d-flex align-items-center gap-3 mb-3">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="rounded flex-shrink-0"
                        style={{ width: 52, height: 52, objectFit: "cover" }}
                      />
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="small fw-semibold mb-0 text-truncate">{product.name}</p>
                        <p className="small text-stone-gray mb-0">Qty: {quantity}</p>
                      </div>
                      <span className="small fw-semibold flex-shrink-0">
                        {formatCurrency(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="my-2" />
                <div className="d-flex justify-content-between small mb-2">
                  <span className="text-stone-gray">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between small mb-2">
                  <span className="text-stone-gray">Shipping</span>
                  <span>
                    {!address
                      ? "Calculated at next step"
                      : shipping?.isFree
                        ? <span className="text-forest">Free</span>
                        : formatCurrency(shippingCharge)}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span className="text-forest">{formatCurrency(subtotal + shippingCharge)}</span>
                </div>
                {shipping && !shipping.isFree && subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="small text-stone-gray mt-2 mb-0">
                    Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
