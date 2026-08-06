import { useState, type FormEvent, type ChangeEvent } from "react";
import type { PaymentData, PaymentMethod, CardData, AddressData } from "../../types/checkout";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../ui/Button";

interface PaymentStepProps {
  initial: PaymentData | null;
  address: AddressData;
  subtotal: number;
  shippingCharge: number;
  onBack: () => void;
  onNext: (data: PaymentData) => void;
}

type CardErrors = Partial<Record<keyof CardData, string>>;

const EMPTY_CARD: CardData = { number: "", nameOnCard: "", expiry: "", cvv: "" };

export default function PaymentStep({
  initial, address, subtotal, shippingCharge, onBack, onNext,
}: PaymentStepProps) {
  const [method, setMethod] = useState<PaymentMethod>(initial?.method ?? "card");
  const [card, setCard] = useState<CardData>(initial?.card ?? EMPTY_CARD);
  const [upiId, setUpiId] = useState(initial?.upiId ?? "");
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [upiError, setUpiError] = useState("");

  const codFee = method === "cod" ? 40 : 0;
  const total = subtotal + shippingCharge + codFee;

  const setCardField = (field: keyof CardData) => (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (field === "number") {
      value = value.replace(/\D/g, "").slice(0, 16);
      value = value.replace(/(.{4})/g, "$1 ").trim();
    }
    if (field === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    if (field === "cvv") value = value.replace(/\D/g, "").slice(0, 4);
    setCard((prev) => ({ ...prev, [field]: value }));
    setCardErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateCard = (): CardErrors => {
    const e: CardErrors = {};
    if (card.number.replace(/\s/g, "").length < 16) e.number = "Enter a valid 16-digit card number.";
    if (!card.nameOnCard.trim()) e.nameOnCard = "Name on card is required.";
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "Enter expiry as MM/YY.";
    if (card.cvv.length < 3) e.cvv = "Enter a valid CVV.";
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (method === "card") {
      const errs = validateCard();
      if (Object.keys(errs).length > 0) { setCardErrors(errs); return; }
      onNext({ method, card });
    } else if (method === "upi") {
      if (!/^[\w.\-_]{3,}@[a-zA-Z]{3,}$/.test(upiId.trim())) {
        setUpiError("Enter a valid UPI ID (e.g. name@upi).");
        return;
      }
      onNext({ method, upiId: upiId.trim() });
    } else {
      onNext({ method });
    }
  };

  const METHOD_OPTIONS: { value: PaymentMethod; label: string; icon: string; note?: string }[] = [
    { value: "card", label: "Credit / Debit Card", icon: "bi-credit-card" },
    { value: "upi", label: "UPI", icon: "bi-phone" },
    {
      value: "cod", label: "Cash on Delivery", icon: "bi-cash-coin",
      note: "Pay in cash when your order arrives. ₹40 COD fee applies.",
    },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="h5 fw-bold mb-1">Payment</h2>
      <p className="text-stone-gray small mb-4">
        Delivering to {address.city}, {address.state} · {address.pincode}
      </p>

      <div className="mb-4">
        {METHOD_OPTIONS.map(({ value, label, icon, note }) => (
          <div
            key={value}
            className="border rounded-md p-3 mb-2"
            style={{ cursor: "pointer", borderWidth: method === value ? 2 : 1,
              borderColor: method === value ? "var(--color-forest)" : undefined }}
            onClick={() => setMethod(value)}
          >
            <div className="d-flex align-items-start gap-3">
              <input type="radio" className="form-check-input mt-1 flex-shrink-0"
                checked={method === value} onChange={() => setMethod(value)}
                aria-label={label} />
              <div>
                <span className="fw-semibold">
                  <i className={`bi ${icon} me-2`} aria-hidden="true" />
                  {label}
                </span>
                {note && <p className="text-stone-gray small mb-0 mt-1">{note}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {method === "card" && (
        <div className="bg-cream rounded-md p-4 mb-4">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="co-card-number" className="form-label small fw-semibold">Card Number</label>
              <input id="co-card-number" type="text" inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                className={`form-control font-monospace ${cardErrors.number ? "is-invalid" : ""}`}
                value={card.number} onChange={setCardField("number")} />
              {cardErrors.number && <div className="invalid-feedback">{cardErrors.number}</div>}
            </div>
            <div className="col-12">
              <label htmlFor="co-card-name" className="form-label small fw-semibold">Name on Card</label>
              <input id="co-card-name" type="text" placeholder="As it appears on your card"
                className={`form-control ${cardErrors.nameOnCard ? "is-invalid" : ""}`}
                value={card.nameOnCard} onChange={setCardField("nameOnCard")} />
              {cardErrors.nameOnCard && <div className="invalid-feedback">{cardErrors.nameOnCard}</div>}
            </div>
            <div className="col-6">
              <label htmlFor="co-card-expiry" className="form-label small fw-semibold">Expiry</label>
              <input id="co-card-expiry" type="text" inputMode="numeric" placeholder="MM/YY" maxLength={5}
                className={`form-control ${cardErrors.expiry ? "is-invalid" : ""}`}
                value={card.expiry} onChange={setCardField("expiry")} />
              {cardErrors.expiry && <div className="invalid-feedback">{cardErrors.expiry}</div>}
            </div>
            <div className="col-6">
              <label htmlFor="co-card-cvv" className="form-label small fw-semibold">CVV</label>
              <input id="co-card-cvv" type="password" inputMode="numeric" placeholder="•••" maxLength={4}
                className={`form-control ${cardErrors.cvv ? "is-invalid" : ""}`}
                value={card.cvv} onChange={setCardField("cvv")} />
              {cardErrors.cvv && <div className="invalid-feedback">{cardErrors.cvv}</div>}
            </div>
          </div>
          <p className="small text-stone-gray mt-3 mb-0">
            <i className="bi bi-shield-lock me-1" aria-hidden="true" />
            Demo only — do not enter real card details.
          </p>
        </div>
      )}

      {method === "upi" && (
        <div className="bg-cream rounded-md p-4 mb-4">
          <label htmlFor="co-upi" className="form-label small fw-semibold">UPI ID</label>
          <input id="co-upi" type="text" placeholder="yourname@upi"
            className={`form-control ${upiError ? "is-invalid" : ""}`}
            value={upiId}
            onChange={(e) => { setUpiId(e.target.value); setUpiError(""); }} />
          {upiError && <div className="invalid-feedback">{upiError}</div>}
          <p className="small text-stone-gray mt-2 mb-0">
            Demo only — enter any valid UPI ID format to proceed.
          </p>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
        <Button variant="outline" icon="bi-arrow-left" iconPosition="start" onClick={onBack} type="button">
          Back
        </Button>
        <Button type="submit" variant="orange" size="lg" icon="bi-lock" iconPosition="start">
          Pay {formatCurrency(total)}
        </Button>
      </div>
    </form>
  );
}
