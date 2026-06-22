import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ChefHat, BookOpen, Sparkles } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-cream-warm border-b border-mist sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/app">
              <Logo size="sm" />
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/discover" className="hidden md:inline-flex items-center gap-1.5 text-ink-soft hover:text-clay">
                <Sparkles className="w-4 h-4" />
                Discover
              </Link>
              <Link href="/recipes" className="hidden md:inline-flex items-center gap-1.5 text-ink-soft hover:text-clay">
                <BookOpen className="w-4 h-4" />
                Recipes
              </Link>
              <Link href="/app/account" className="w-9 h-9 rounded-full bg-clay-soft text-clay-deep flex items-center justify-center font-medium text-sm">
                W
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-cream-warm border-t border-mist z-40">
        <div className="grid grid-cols-5 h-16">
          {[
            { href: "/app", icon: ChefHat, label: "Cook" },
            { href: "/recipes", icon: BookOpen, label: "Recipes" },
            { href: "/discover", icon: Sparkles, label: "Discover" },
            { href: "/app/saved", icon: "♥", label: "Saved" },
            { href: "/app/account", icon: "●", label: "You" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 text-ink-soft hover:text-clay text-xs"
            >
              {typeof item.icon === "string" ? (
                <span className="text-lg">{item.icon}</span>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}