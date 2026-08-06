import { useState } from "react";
import type { ProductImage } from "../../types";
import ZoomableImage from "./ZoomableImage";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const uniqueImages = images.filter(
    (image, index, all) => all.findIndex((candidate) => candidate.url === image.url) === index,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const active = uniqueImages[activeIndex] ?? uniqueImages[0];

  return (
    <div>
      <div className="mb-3">
        <ZoomableImage src={active?.url ?? ""} alt={active?.alt || productName} />
      </div>
      {uniqueImages.length > 1 && (
        <div className="d-flex gap-2">
          {uniqueImages.map((image, index) => (
            <button
              key={image.url}
              type="button"
              className={`p-0 border rounded-md overflow-hidden ${
                index === activeIndex ? "border-forest border-2" : "border-stone-gray-light"
              }`}
              style={{ width: 72, height: 72 }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1} of ${productName}`}
              aria-current={index === activeIndex}
            >
              <img src={image.url} alt="" className="img-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
