import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import CartItemRow from "../components/cart/CartItemRow";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { formatCurrency } from "../utils/formatCurrency";
import { getShippingEstimate, isValidIndianPincode, FREE_SHIPPING_THRESHOLD } from "../utils/shipping";
import { isValidGstin } from "../utils/gst";
import { isValidEmail } from "../utils/validation";
import { validatePromoCode, WELCOME_CODE, type PromoSuccess } from "../utils/promo";

export default function Cart() {
  const navigate = useNavigate();
  const { items, subtotal, taxAmount, grandTotal, clearCart, itemCount } = useCart();
  const { showToast } = useToast();
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  // Shared with TopBar's delivery-check widget, so entering it once anywhere
  // on the site carries through here instead of asking again.
  const [savedPincode, setSavedPincode] = useLocalStorage<string>("oas-delivery-pincode", "");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [gstin, setGstin] = useState("");
  const [gstinConfirmed, setGstinConfirmed] = useState<string | null>(null);
  const [gstinError, setGstinError] = useState("");

  const [isSubscribed, setIsSubscribed] = useLocalStorage<boolean>("oas-newsletter-subscribed", false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoSuccess | null>(null);
  const [promoError, setPromoError] = useState("");

  const shipping = savedPincode ? getShippingEstimate(savedPincode, subtotal) : null;
  const shippingCharge = shipping?.charge ?? 0;
  const discountAmount = appliedPromo ? subtotal * appliedPromo.discountRate : 0;

  const handleSubscribe = () => {
    if (!isValidEmail(newsletterEmail)) {
      setNewsletterError("Enter a valid email address.");
      return;
    }
    setNewsletterError("");
    setIsSubscribed(true);
    showToast(`You're subscribed! Use code ${WELCOME_CODE} for 5% off, all of August.`, "success");
  };

  const handleApplyPromo = () => {
    const result = validatePromoCode(promoInput, isSubscribed);
    if ("error" in result) {
      setPromoError(result.error);
      setAppliedPromo(null);
      return;
    }
    setPromoError("");
    setAppliedPromo(result);
  };

  const handleCheckPincode = () => {
    if (!isValidIndianPincode(pincode)) {
      setPincodeError("Enter a valid 6-digit PIN code.");
      return;
    }
    setPincodeError("");
    setSavedPincode(pincode.trim());
  };

  const handleSaveGstin = () => {
    if (!isValidGstin(gstin)) {
      setGstinError("Enter a valid 15-character GSTIN.");
      setGstinConfirmed(null);
      return;
    }
    setGstinError("");
    setGstinConfirmed(gstin.trim().toUpperCase());
  };

  const handleClearCart = () => {
    clearCart();
    setConfirmClearOpen(false);
    showToast("Cart cleared", "info");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <Section background="white" className="text-center">
        <i className="bi bi-bag-x display-1 text-stone-gray mb-4 d-inline-block" aria-hidden="true" />
        <h1 className="fw-bold mb-3">Your Cart Is Empty</h1>
        <p className="text-stone-gray mb-4 mx-auto" style={{ maxWidth: 480 }}>
          Looks like you haven't added any gear yet. Explore the catalog to find your next adventure
          essential.
        </p>
        <Button to="/products" variant="primary" size="lg" icon="bi-arrow-right" iconPosition="end">
          Start Shopping
        </Button>
      </Section>
    );
  }

  return (
    <Section background="white">
      <SectionTitle
        align="start"
        title={`Your Cart (${itemCount} ${itemCount === 1 ? "item" : "items"})`}
      />
      <div className="row g-5">
        <div className="col-lg-8">
          <div>
            {items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center pt-4">
            <Button to="/products" variant="outline" icon="bi-arrow-left" iconPosition="start">
              Continue Shopping
            </Button>
            <Button variant="link" className="text-danger" onClick={() => setConfirmClearOpen(true)}>
              Clear Cart
            </Button>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="bg-cream rounded-md p-4">
            <h2 className="h5 fw-bold mb-3">Order Summary</h2>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-stone-gray">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="text-stone-gray small">Includes GST (18%)</span>
              <span className="text-stone-gray small">{formatCurrency(taxAmount)}</span>
            </div>
            <p className="text-stone-gray small mb-3">
              All prices shown are inclusive of 18% GST. Business purchases with a valid GSTIN can claim
              this as input tax credit — a GST invoice will be issued to the GSTIN below.
            </p>

            <div className="mb-3">
              <label htmlFor="cart-gstin" className="small text-stone-gray mb-1 d-block">
                Business purchase? Add your GSTIN to claim GST
              </label>
              <div className="input-group input-group-sm">
                <input
                  id="cart-gstin"
                  type="text"
                  maxLength={15}
                  className={`form-control text-uppercase ${gstinError ? "is-invalid" : ""}`}
                  placeholder="e.g. 29AABCU9603R1ZM"
                  value={gstin}
                  onChange={(event) => {
                    setGstin(event.target.value.toUpperCase());
                    setGstinError("");
                  }}
                />
                <Button variant="outline" onClick={handleSaveGstin}>
                  Save
                </Button>
              </div>
              {gstinError && <p className="text-warm-orange-on-light small mt-1 mb-0">{gstinError}</p>}
              {gstinConfirmed && (
                <p className="small text-forest mt-1 mb-0">
                  <i className="bi bi-check-circle-fill me-1" aria-hidden="true" />
                  GST invoice will be issued to {gstinConfirmed}
                </p>
              )}
            </div>

            {!isSubscribed && (
              <div
                className="bg-white rounded-md p-3 mb-3 border"
                style={{ borderColor: "var(--color-warm-orange)" }}
              >
                <p className="fw-semibold small mb-1">
                  <i className="bi bi-envelope-paper me-1" aria-hidden="true" />
                  Get 5% off as a welcome bonus
                </p>
                <p className="text-stone-gray small mb-2">
                  Subscribe with your email to unlock code {WELCOME_CODE} — valid all of August.
                </p>
                <div className="input-group input-group-sm">
                  <input
                    type="email"
                    className={`form-control ${newsletterError ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(event) => {
                      setNewsletterEmail(event.target.value);
                      setNewsletterError("");
                    }}
                  />
                  <Button variant="orange" onClick={handleSubscribe}>
                    Subscribe
                  </Button>
                </div>
                {newsletterError && (
                  <p className="text-warm-orange-on-light small mt-1 mb-0">{newsletterError}</p>
                )}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="cart-promo" className="small text-stone-gray mb-1 d-block">
                Have a promo code?
              </label>
              {appliedPromo ? (
                <p className="small text-forest mb-0">
                  <i className="bi bi-check-circle-fill me-1" aria-hidden="true" />
                  {appliedPromo.label} applied
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0 ms-2 align-baseline"
                    onClick={() => {
                      setAppliedPromo(null);
                      setPromoInput("");
                    }}
                  >
                    Remove
                  </button>
                </p>
              ) : (
                <>
                  <div className="input-group input-group-sm">
                    <input
                      id="cart-promo"
                      type="text"
                      className={`form-control text-uppercase ${promoError ? "is-invalid" : ""}`}
                      placeholder="Enter promo code"
                      value={promoInput}
                      onChange={(event) => {
                        setPromoInput(event.target.value.toUpperCase());
                        setPromoError("");
                      }}
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                  {promoError && <p className="text-warm-orange-on-light small mt-1 mb-0">{promoError}</p>}
                  {isSubscribed && (
                    <p className="text-stone-gray small mt-1 mb-0">
                      You've unlocked {WELCOME_CODE} — valid all of August.
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="cart-pincode" className="small text-stone-gray mb-1 d-block">
                Check delivery &amp; shipping charges
              </label>
              {savedPincode ? (
                <p className="small mb-0">
                  <i className="bi bi-geo-alt-fill me-1" aria-hidden="true" />
                  Delivers to {savedPincode} in {shipping?.estimate}
                  {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <>
                      {" "}
                      · Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                    </>
                  )}
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0 ms-2 align-baseline"
                    onClick={() => {
                      setSavedPincode("");
                      setPincode("");
                    }}
                  >
                    Change
                  </button>
                </p>
              ) : (
                <>
                  <div className="input-group input-group-sm">
                    <input
                      id="cart-pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      className={`form-control ${pincodeError ? "is-invalid" : ""}`}
                      placeholder="Enter 6-digit PIN code"
                      value={pincode}
                      onChange={(event) => {
                        setPincode(event.target.value.replace(/\D/g, ""));
                        setPincodeError("");
                      }}
                    />
                    <Button variant="outline" onClick={handleCheckPincode}>
                      Check
                    </Button>
                  </div>
                  {pincodeError && (
                    <p className="text-warm-orange-on-light small mt-1 mb-0">{pincodeError}</p>
                  )}
                </>
              )}
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-stone-gray">Shipping</span>
              <span>
                {!savedPincode
                  ? "Enter PIN to calculate"
                  : shipping?.isFree
                    ? "Free"
                    : formatCurrency(shippingCharge)}
              </span>
            </div>
            {appliedPromo && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-forest">Promo ({appliedPromo.code})</span>
                <span className="text-forest">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold">Grand Total</span>
              <span className="fw-bold fs-5 text-forest">
                {formatCurrency(grandTotal + shippingCharge - discountAmount)}
              </span>
            </div>
            <Button variant="orange" fullWidth size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmClearOpen}
        title="Clear Cart?"
        message="This will remove all items from your cart. This can't be undone."
        confirmLabel="Clear Cart"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleClearCart}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </Section>
  );
}
