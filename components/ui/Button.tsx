import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "premium";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-clay text-cream hover:bg-clay-deep hover:shadow-glow",
  secondary: "bg-transparent text-clay border-[1.5px] border-clay hover:bg-clay hover:text-cream",
  ghost: "bg-transparent text-ink hover:bg-bone",
  premium: "bg-moss text-cream hover:bg-moss/90",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 rounded-md font-medium font-body transition-all duration-base ease-out-quad",
      "focus-visible:outline-2 focus-visible:outline-clay-soft focus-visible:outline-offset-2",
      "active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed",
      "min-h-[44px]",
      variantClasses[variant],
      sizeClasses[size],
      isLoading && "cursor-wait",
      className
    );

    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
          </svg>
        )}
        {!isLoading && leftIcon}
        <span className={isLoading ? "opacity-0" : ""}>{children}</span>
        {!isLoading && rightIcon}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseClasses} aria-disabled={disabled}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";