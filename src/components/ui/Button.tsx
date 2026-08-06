import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

export type ButtonVariant = "primary" | "secondary" | "outline" | "orange" | "outline-light" | "link";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  className?: string;
  to?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline-forest",
  orange: "btn-warm-orange",
  "outline-light": "btn-outline-light",
  link: "btn-link text-decoration-none",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg px-4 py-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "start",
  fullWidth = false,
  className = "",
  to,
  type = "button",
  disabled = false,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = [
    "btn",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    fullWidth ? "w-100" : "",
    "d-inline-flex align-items-center justify-content-center gap-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "start" && <i className={`bi ${icon}`} aria-hidden="true" />}
      {children}
      {icon && iconPosition === "end" && <i className={`bi ${icon}`} aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
