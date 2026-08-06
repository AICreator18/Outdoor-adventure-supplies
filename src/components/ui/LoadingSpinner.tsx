interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  fullPage?: boolean;
}

const DIMENSIONS: Record<NonNullable<LoadingSpinnerProps["size"]>, number> = {
  sm: 24,
  md: 40,
  lg: 64,
};

export default function LoadingSpinner({ size = "md", label = "Loading...", fullPage = false }: LoadingSpinnerProps) {
  const dimension = DIMENSIONS[size];

  const spinner = (
    <div className="d-flex flex-column align-items-center gap-2" role="status">
      <div className="spinner-border text-forest" style={{ width: dimension, height: dimension }} />
      <span className="visually-hidden">{label}</span>
    </div>
  );

  if (!fullPage) return spinner;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
      {spinner}
    </div>
  );
}
