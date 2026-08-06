import type { ReactNode } from "react";
import Container from "./Container";

type SectionBackground = "white" | "cream" | "forest" | "deep-green" | "stone-gray-light";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: SectionBackground;
  fluid?: boolean;
  id?: string;
}

const BG_CLASS: Record<SectionBackground, string> = {
  white: "bg-white",
  cream: "bg-cream",
  forest: "bg-forest",
  "deep-green": "bg-deep-green",
  "stone-gray-light": "bg-stone-gray-light",
};

export default function Section({
  children,
  className = "",
  background = "white",
  fluid = false,
  id,
}: SectionProps) {
  return (
    <section id={id} className={`section-py ${BG_CLASS[background]} ${className}`}>
      <Container fluid={fluid}>{children}</Container>
    </section>
  );
}
