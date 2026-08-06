import { useState, type ChangeEvent, type FormEvent } from "react";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import { useToast } from "../hooks/useToast";
import { isValidEmail } from "../utils/validation";

const CONTACT_INFO = [
  {
    icon: "bi-geo-alt",
    title: "Visit Our Store",
    lines: ["24 OMR Service Road, Thoraipakkam", "Chennai, Tamil Nadu 600097"],
  },
  {
    icon: "bi-telephone",
    title: "Call Us",
    lines: ["+91 44 1234 5678", "Mon–Sat, 10am–8pm IST"],
  },
  {
    icon: "bi-envelope",
    title: "Email Us",
    lines: ["support@outdooradventure.in", "We reply within 24 hours"],
  },
];

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const INITIAL_FORM: ContactFormData = { name: "", email: "", subject: "", message: "" };

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) errors.name = "Please enter your name.";
  else if (data.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!data.email.trim()) errors.email = "Please enter your email address.";
  else if (!isValidEmail(data.email)) errors.email = "Please enter a valid email address.";

  if (!data.subject.trim()) errors.subject = "Please enter a subject.";

  if (!data.message.trim()) errors.message = "Please enter a message.";
  else if (data.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";

  return errors;
}

export default function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    showToast("Message sent! Our team will get back to you within 24 hours.", "success");
    setFormData(INITIAL_FORM);
  };

  return (
    <>
      <Section background="cream">
        <SectionTitle
          title="We're Here to Help"
          subtitle="Questions about gear, orders or your next expedition? Reach out and our team will get back to you."
        />
        <div className="row g-4">
          {CONTACT_INFO.map((info) => (
            <div className="col-md-4" key={info.title}>
              <div className="bg-white rounded-md shadow-brand-sm p-4 h-100 text-center">
                <i className={`bi ${info.icon} fs-2 text-forest mb-3 d-inline-block`} aria-hidden="true" />
                <h3 className="h6 fw-bold mb-2">{info.title}</h3>
                {info.lines.map((line) => (
                  <p key={line} className="text-stone-gray small mb-0">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="white">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <h2 className="fw-bold mb-4 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="contact-name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Arjun Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-danger small mt-1 mb-0" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="arjun@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-danger small mt-1 mb-0" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="text-danger small mt-1 mb-0" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                    rows={5}
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-danger small mt-1 mb-0" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className="col-12 text-center pt-2">
                  <Button type="submit" variant="primary" size="lg">
                    Send Message
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
