import { useState } from "react";
import type { FaqItem } from "../../types";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="d-flex flex-column gap-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border rounded-md overflow-hidden">
            <button
              type="button"
              className="btn w-100 d-flex justify-content-between align-items-center text-start p-3 bg-white"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="fw-semibold">{item.question}</span>
              <i
                className={`bi ${isOpen ? "bi-dash-lg" : "bi-plus-lg"} text-forest flex-shrink-0 ms-3`}
                aria-hidden="true"
              />
            </button>
            {isOpen && <div className="p-3 pt-0 text-stone-gray">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
