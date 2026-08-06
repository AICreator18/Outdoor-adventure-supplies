import { useState, type FormEvent } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getShippingEstimate, isValidIndianPincode } from "../../utils/shipping";

export default function TopBar() {
  const [savedPincode, setSavedPincode] = useLocalStorage<string>("oas-delivery-pincode", "");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  // Shipping charge depends on cart subtotal, which isn't known here — pass 0
  // so this only ever reports the delivery zone/estimate, never a "Free" charge.
  const estimate = savedPincode ? getShippingEstimate(savedPincode, 0) : null;

  const handleCheck = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidIndianPincode(pincode)) {
      setError("Invalid PIN code");
      return;
    }
    setError("");
    setSavedPincode(pincode.trim());
  };

  return (
    <div className="bg-deep-green text-white-50 py-2 d-none d-md-block">
      <div
        className="container d-grid align-items-center small"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <span>
          <i className="bi bi-truck me-2" aria-hidden="true" />
          Free shipping across India on orders over ₹5,000
        </span>

        <div className="text-center">
          {estimate ? (
            <span>
              <i className="bi bi-geo-alt-fill me-1" aria-hidden="true" />
              Delivers to {savedPincode} in {estimate.estimate}
              <button
                type="button"
                className="btn btn-link btn-sm text-white-50 p-0 ms-2 align-baseline"
                onClick={() => {
                  setSavedPincode("");
                  setPincode("");
                }}
              >
                Change
              </button>
            </span>
          ) : (
            <form className="d-inline-flex align-items-center gap-2" onSubmit={handleCheck} noValidate>
              <label htmlFor="topbar-pincode" className="visually-hidden">
                Enter delivery PIN code
              </label>
              <i className="bi bi-geo-alt" aria-hidden="true" />
              <input
                id="topbar-pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter PIN code for delivery"
                value={pincode}
                onChange={(event) => {
                  setPincode(event.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                className="form-control form-control-sm bg-transparent text-white border-white border-opacity-50"
                style={{ width: 190 }}
              />
              <button type="submit" className="btn btn-link btn-sm text-white p-0">
                Check
              </button>
              {error && <span className="text-warm-orange">{error}</span>}
            </form>
          )}
        </div>

        <div className="d-flex align-items-center gap-4 justify-content-end">
          <a href="tel:+914412345678" className="text-white-50 text-decoration-none">
            <i className="bi bi-telephone me-1" aria-hidden="true" />
            +91 44 1234 5678
          </a>
          <span>
            <i className="bi bi-geo-alt me-1" aria-hidden="true" />
            Chennai Flagship Store
          </span>
        </div>
      </div>
    </div>
  );
}
