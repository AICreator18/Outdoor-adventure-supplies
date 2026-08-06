import { useState, type MouseEvent } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
}

export default function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      className="ratio ratio-1x1 rounded-md overflow-hidden bg-stone-gray-light position-relative"
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
      onMouseMove={handleMouseMove}
      style={{ cursor: "zoom-in" }}
    >
      <img
        src={src}
        alt={alt}
        className="img-cover"
        style={{ opacity: isZooming ? 0 : 1 }}
        fetchPriority="high"
      />
      {isZooming && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition,
            backgroundSize: "200%",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      {!isZooming && (
        <span className="position-absolute bottom-0 end-0 m-2 badge bg-dark bg-opacity-50 text-white d-none d-md-inline-flex align-items-center gap-1">
          <i className="bi bi-zoom-in" aria-hidden="true" />
          Hover to zoom
        </span>
      )}
    </div>
  );
}
