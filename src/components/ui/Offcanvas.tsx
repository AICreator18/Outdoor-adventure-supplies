import { useEffect } from "react";
import type { ReactNode } from "react";

interface OffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "start" | "end";
  children: ReactNode;
}

export default function Offcanvas({ isOpen, onClose, title, side = "end", children }: OffcanvasProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`offcanvas-backdrop-custom ${isOpen ? "show" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`offcanvas-panel offcanvas-${side} ${isOpen ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!isOpen}
      >
        <div className="d-flex align-items-center justify-content-between border-bottom p-3">
          {title && <h2 className="h6 fw-bold mb-0">{title}</h2>}
          <button type="button" className="btn-close" aria-label="Close menu" onClick={onClose} />
        </div>
        <div className="offcanvas-body-custom">{children}</div>
      </div>
    </>
  );
}
