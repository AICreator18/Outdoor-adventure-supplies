import Button from "../components/ui/Button";
import Section from "../components/ui/Section";
import NotFoundIllustration from "../components/common/NotFoundIllustration";

export default function NotFound() {
  return (
    <Section background="cream" className="text-center">
      <div className="d-flex justify-content-center mb-4">
        <NotFoundIllustration />
      </div>
      <h1 className="display-4 fw-bold mb-3">404 — Off the Trail</h1>
      <p className="text-stone-gray mb-4 mx-auto" style={{ maxWidth: 480 }}>
        Looks like this path doesn't exist. Let's get you back to marked territory.
      </p>
      <Button to="/" variant="primary" size="lg" icon="bi-house" iconPosition="start">
        Back to Home
      </Button>
    </Section>
  );
}
