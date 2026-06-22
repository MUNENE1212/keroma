"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  selected?: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Chip({
  label,
  selected = false,
  removable = false,
  onClick,
  onRemove,
  disabled = false,
  className,
}: ChipProps) {
  const interactive = Boolean(onClick) && !disabled;

  const classes = cn(
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
    "text-[13px] font-medium font-body",
    "transition-all duration-fast ease-out-quad",
    "border",
    selected
      ? "bg-clay-soft border-clay text-clay-deep"
      : "bg-cream-warm border-mist text-ink hover:bg-bone",
    interactive && "cursor-pointer",
    disabled && "opacity-40 cursor-not-allowed",
    className
  );

  const content = (
    <>
      <span>{label}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label={`Remove ${label}`}
          className="hover:text-error transition-colors -mr-1 ml-0.5 p-0.5 rounded-full"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      )}
    </>
  );

  if (interactive) {
    return (
      <button type="button" onClick={onClick} className={classes} aria-pressed={selected}>
        {content}
      </button>
    );
  }
  return <span className={classes}>{content}</span>;
}