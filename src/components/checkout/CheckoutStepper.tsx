const STEPS = ["Address", "Payment", "Confirmation"];

interface CheckoutStepperProps {
  current: 1 | 2 | 3;
}

export default function CheckoutStepper({ current }: CheckoutStepperProps) {
  return (
    <div className="d-flex align-items-center justify-content-center mb-5">
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;

        return (
          <div key={label} className="d-flex align-items-center">
            <div className="d-flex flex-column align-items-center" style={{ minWidth: 80 }}>
              <div
                className={`d-flex align-items-center justify-content-center rounded-circle mb-1 fw-bold ${
                  isDone || isActive ? "bg-forest text-white" : "text-stone-gray"
                }`}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: isDone || isActive ? undefined : "var(--color-stone-gray-light)",
                }}
              >
                {isDone ? <i className="bi bi-check-lg" aria-hidden="true" /> : stepNum}
              </div>
              <span
                className={`small ${isActive || isDone ? "fw-semibold text-forest" : "text-stone-gray"}`}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className="mb-4 flex-shrink-0"
                style={{
                  height: 2,
                  width: 60,
                  backgroundColor: isDone ? "var(--color-forest)" : "var(--color-stone-gray-light)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
