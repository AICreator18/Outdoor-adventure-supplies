import { useState, type FormEvent } from "react";
import Button from "../ui/Button";
import { useToast } from "../../hooks/useToast";
import { isValidEmail } from "../../utils/validation";

export default function NewsletterSection() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    showToast("You're subscribed! Watch your inbox for trail-tested tips.", "success");
    setEmail("");
  };

  return (
    <section className="bg-forest text-white section-py">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-7">
            <i className="bi bi-envelope-paper fs-1 text-warm-orange mb-3 d-inline-block" aria-hidden="true" />
            <h2 className="fw-bold text-white mb-2">Join the Basecamp Newsletter</h2>
            <p className="text-white-50 mb-4">
              Get early access to new gear drops, seasonal sales and trail-tested tips — straight to your
              inbox.
            </p>
            <form
              className="d-flex flex-column flex-sm-row gap-2 justify-content-center align-items-start"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="text-start" style={{ maxWidth: 360, width: "100%" }}>
                <label htmlFor="newsletter-email" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-email-error" : undefined}
                />
                {error && (
                  <p id="newsletter-email-error" className="text-warm-orange small mt-1 mb-0" role="alert">
                    {error}
                  </p>
                )}
              </div>
              <Button type="submit" variant="orange" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
