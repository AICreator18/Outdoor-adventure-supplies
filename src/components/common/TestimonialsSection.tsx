import { useState } from "react";
import type { Testimonial } from "../../types";
import testimonialsRaw from "../../data/testimonials.json";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import StarRating from "../product/StarRating";

const testimonials = testimonialsRaw as unknown as Testimonial[];
const PER_PAGE = 3;
const PAGE_COUNT = Math.ceil(testimonials.length / PER_PAGE);

export default function TestimonialsSection() {
  const [page, setPage] = useState(0);

  const goTo = (index: number) => setPage((index + PAGE_COUNT) % PAGE_COUNT);
  const visible = testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <Section background="white">
      <SectionTitle
        title="What Adventurers Are Saying"
        subtitle="Real feedback from real trips."
      />
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="icon-btn btn btn-link p-2 d-none d-md-inline-flex"
          aria-label="Previous testimonials"
          onClick={() => goTo(page - 1)}
        >
          <i className="bi bi-chevron-left fs-4" aria-hidden="true" />
        </button>

        <div className="row g-4 flex-grow-1">
          {visible.map((testimonial) => (
            <div className="col-md-6 col-lg-4" key={testimonial.id}>
              <div className="bg-white rounded-md shadow-brand-sm p-4 h-100 d-flex flex-column">
                <StarRating rating={testimonial.rating} size="sm" />
                <p className="text-stone-gray mt-3 mb-4 flex-grow-1">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <span className="fw-bold d-block">{testimonial.name}</span>
                  <span className="text-stone-gray small">{testimonial.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="icon-btn btn btn-link p-2 d-none d-md-inline-flex"
          aria-label="Next testimonials"
          onClick={() => goTo(page + 1)}
        >
          <i className="bi bi-chevron-right fs-4" aria-hidden="true" />
        </button>
      </div>

      {PAGE_COUNT > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          {Array.from({ length: PAGE_COUNT }, (_, index) => (
            <button
              key={index}
              type="button"
              className="border-0 rounded-circle p-0"
              style={{
                width: 10,
                height: 10,
                backgroundColor: index === page ? "var(--color-deep-green)" : "var(--color-stone-gray-light)",
              }}
              aria-label={`Go to testimonial page ${index + 1}`}
              aria-current={index === page}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
