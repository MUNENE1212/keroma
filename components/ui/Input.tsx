import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helper, error, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-[13px] font-medium mb-1.5",
              hasError ? "text-error" : "text-ink-soft"
            )}
          >
            {label}
            {props.required && <span className="text-saffron ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-12 px-4 rounded-md border bg-cream-warm text-ink",
              "placeholder:text-ink-soft text-base",
              "transition-colors duration-fast",
              "focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay-soft",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              hasError && "border-error focus:border-error focus:ring-error/20",
              !hasError && "border-mist",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className
            )}
            aria-invalid={hasError || undefined}
            aria-describedby={error || helper ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft">{rightIcon}</div>
          )}
        </div>
        {(error || helper) && (
          <p
            id={`${inputId}-helper`}
            className={cn("mt-1.5 text-xs", hasError ? "text-error" : "text-ink-soft")}
          >
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";