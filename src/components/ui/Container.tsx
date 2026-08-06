import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  fluid?: boolean;
  className?: string;
}

export default function Container({ children, fluid = false, className = "" }: ContainerProps) {
  return <div className={`${fluid ? "container-fluid" : "container"} ${className}`}>{children}</div>;
}
