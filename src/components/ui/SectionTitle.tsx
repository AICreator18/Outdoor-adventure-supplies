interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-4 mb-lg-5 ${isCenter ? "text-center mx-auto" : "text-start"}`}
      style={isCenter ? { maxWidth: 640 } : undefined}
    >
      <h2 className={`fw-bold mb-2 ${light ? "text-white" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`mb-0 ${light ? "text-white-50" : "text-stone-gray"}`}>{subtitle}</p>
      )}
    </div>
  );
}
