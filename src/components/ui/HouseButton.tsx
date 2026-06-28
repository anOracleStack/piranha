import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import TransitionLink from "./TransitionLink";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "gold" | "vault" | "quiet";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
};

type LinkProps = ComponentPropsWithoutRef<typeof TransitionLink> & {
  variant?: "gold" | "vault" | "quiet";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

const variantClass = {
  gold: "button-gold",
  vault: "button-vault",
  quiet: "button-quiet",
};

const sizeClass = {
  sm: "button-sm",
  md: "button-md",
  lg: "button-lg",
};

export function HouseButton({
  variant = "gold",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`house-button ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      <span>{children}</span>
    </button>
  );
}

export function HouseLink({
  variant = "gold",
  size = "md",
  children,
  className = "",
  ...props
}: LinkProps) {
  return (
    <TransitionLink className={`house-button ${variantClass[variant]} ${sizeClass[size]} ${className}`} {...props}>
      <span>{children}</span>
    </TransitionLink>
  );
}
