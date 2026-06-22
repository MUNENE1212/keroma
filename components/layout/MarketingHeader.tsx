import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Search, User } from "lucide-react";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-mist">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="md" />

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            <Link
              href="/discover"
              className="text-ink hover:text-clay transition-colors text-[15px] font-medium"
            >
              Discover
            </Link>
            <Link
              href="/recipes"
              className="text-ink hover:text-clay transition-colors text-[15px] font-medium"
            >
              Recipes
            </Link>
            <Link
              href="/blog"
              className="text-ink hover:text-clay transition-colors text-[15px] font-medium"
            >
              Journal
            </Link>
            <Link
              href="/about"
              className="text-ink hover:text-clay transition-colors text-[15px] font-medium"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/recipes"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md text-ink-soft hover:bg-cream-warm hover:text-ink transition-colors text-sm"
              aria-label="Search recipes"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span className="hidden lg:inline">Search</span>
            </Link>
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-2 text-ink-soft hover:text-ink text-sm font-medium transition-colors"
            >
              <User className="w-4 h-4" aria-hidden="true" />
              <span>Sign in</span>
            </Link>
            <Button href="/discover" size="sm" variant="primary">
              Cook →
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}