import { useToast } from "../../hooks/useToast";
import type { ToastVariant } from "../../types";

const VARIANT_ICON: Record<ToastVariant, string> = {
  success: "bi-check-circle-fill",
  error: "bi-x-circle-fill",
  info: "bi-info-circle-fill",
};

const VARIANT_CLASS: Record<ToastVariant, string> = {
  success: "text-forest",
  error: "text-danger",
  info: "text-sky-blue",
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-2"
      style={{ zIndex: 1080, maxWidth: 340 }}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white rounded-md shadow-brand-md d-flex align-items-start gap-2 p-3"
          role="status"
        >
          <i className={`bi ${VARIANT_ICON[toast.variant]} ${VARIANT_CLASS[toast.variant]} fs-5`} aria-hidden="true" />
          <p className="mb-0 small flex-grow-1">{toast.message}</p>
          <button
            type="button"
            className="btn-close"
            aria-label="Dismiss notification"
            onClick={() => dismissToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
