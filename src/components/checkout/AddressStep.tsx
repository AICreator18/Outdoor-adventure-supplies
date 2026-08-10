import { useState, type FormEvent, type ChangeEvent } from "react";
import type { AddressData } from "../../types/checkout";
import { isValidEmail } from "../../utils/validation";
import { isValidIndianPincode } from "../../utils/shipping";
import Button from "../ui/Button";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Chandigarh", "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

const EMPTY: AddressData = {
  fullName: "", email: "", phone: "", addressLine: "", city: "", state: "", pincode: "",
};

type Errors = Partial<Record<keyof AddressData, string>>;

interface AddressStepProps {
  initial: AddressData | null;
  onNext: (data: AddressData) => void;
}

export default function AddressStep({ initial, onNext }: AddressStepProps) {
  const [form, setForm] = useState<AddressData>(initial ?? EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const setField = (field: keyof AddressData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit mobile number.";
    if (!form.addressLine.trim()) e.addressLine = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.state) e.state = "Please select a state.";
    if (!isValidIndianPincode(form.pincode)) e.pincode = "Enter a valid 6-digit PIN code.";
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="h5 fw-bold mb-4">Delivery Address</h2>
      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="co-fullName" className="form-label small fw-semibold">Full Name</label>
          <input id="co-fullName" type="text" placeholder="Ravi Kumar"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            value={form.fullName} onChange={setField("fullName")} />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="co-email" className="form-label small fw-semibold">Email Address</label>
          <input id="co-email" type="email" placeholder="you@example.com"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email} onChange={setField("email")} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="co-phone" className="form-label small fw-semibold">Mobile Number</label>
          <input id="co-phone" type="tel" inputMode="numeric" placeholder="9XXXXXXXXX" maxLength={10}
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={form.phone}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, "") }));
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }} />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="col-12">
          <label htmlFor="co-address" className="form-label small fw-semibold">Address</label>
          <input id="co-address" type="text" placeholder="House / Flat no., Street, Area"
            className={`form-control ${errors.addressLine ? "is-invalid" : ""}`}
            value={form.addressLine} onChange={setField("addressLine")} />
          {errors.addressLine && <div className="invalid-feedback">{errors.addressLine}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="co-city" className="form-label small fw-semibold">City</label>
          <input id="co-city" type="text" placeholder="Chennai"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            value={form.city} onChange={setField("city")} />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="co-state" className="form-label small fw-semibold">State</label>
          <select id="co-state"
            className={`form-select ${errors.state ? "is-invalid" : ""}`}
            value={form.state} onChange={setField("state")}>
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="co-pincode" className="form-label small fw-semibold">PIN Code</label>
          <input id="co-pincode" type="text" inputMode="numeric" placeholder="600001" maxLength={6}
            className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
            value={form.pincode}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "") }));
              setErrors((prev) => ({ ...prev, pincode: undefined }));
            }} />
          {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <Button type="submit" variant="orange" size="lg" icon="bi-arrow-right" iconPosition="end">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}
