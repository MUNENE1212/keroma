import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  className?: string;
}

export function Logo({ size = "md", withTagline = false, className }: LogoProps) {
  const sizes = {
    sm: { mark: "text-xl", word: "text-lg", tagline: "text-[10px]" },
    md: { mark: "text-2xl", word: "text-xl", tagline: "text-xs" },
    lg: { mark: "text-5xl", word: "text-4xl", tagline: "text-sm" },
  };
  const s = sizes[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-2 ${className ?? ""}`}
      aria-label="KEROMA — home"
    >
      <span
        className={`font-display ${s.mark} text-clay leading-none transition-transform group-hover:-translate-y-0.5`}
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        K
      </span>
      <span
        className={`font-display ${s.word} text-ink leading-none tracking-tight`}
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        eroma
      </span>
      {withTagline && (
        <span className={`font-body ${s.tagline} text-ink-soft ml-2 italic`}>
          Recipes that remember.
        </span>
      )}
    </Link>
  );
}