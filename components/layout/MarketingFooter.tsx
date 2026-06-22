import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function MarketingFooter() {
  return (
    <footer className="bg-charcoal text-cream mt-24">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="text-cream">
              <Logo size="md" />
            </div>
            <p className="mt-4 text-cream/70 text-sm leading-relaxed">
              Recipes that remember. African heritage recipe intelligence.
            </p>
            <form className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                aria-label="Email for newsletter"
                className="flex-1 px-3 py-2 rounded-md bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 text-sm focus:border-clay focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-clay hover:bg-clay-deep text-cream rounded-md text-sm font-medium transition-colors"
              >
                Join
              </button>
            </form>
            <p className="mt-2 text-cream/40 text-xs">One heritage recipe a week. No spam.</p>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.12em] text-saffron font-semibold mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/recipes" className="text-cream/70 hover:text-cream">Recipes</Link></li>
              <li><Link href="/discover" className="text-cream/70 hover:text-cream">Discover</Link></li>
              <li><Link href="/blog" className="text-cream/70 hover:text-cream">Journal</Link></li>
              <li><Link href="/about" className="text-cream/70 hover:text-cream">About</Link></li>
              <li><Link href="/pricing" className="text-cream/70 hover:text-cream">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.12em] text-saffron font-semibold mb-4">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="https://instagram.com" className="text-cream/70 hover:text-cream">Instagram</Link></li>
              <li><Link href="https://x.com" className="text-cream/70 hover:text-cream">X (Twitter)</Link></li>
              <li><Link href="https://youtube.com" className="text-cream/70 hover:text-cream">YouTube</Link></li>
              <li><Link href="https://tiktok.com" className="text-cream/70 hover:text-cream">TikTok</Link></li>
              <li><Link href="mailto:hello@keroma.co.ke" className="text-cream/70 hover:text-cream">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.12em] text-saffron font-semibold mb-4">
              KEROMA
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-cream/70 hover:text-cream">The story</Link></li>
              <li><Link href="/privacy" className="text-cream/70 hover:text-cream">Privacy</Link></li>
              <li><Link href="/terms" className="text-cream/70 hover:text-cream">Terms</Link></li>
              <li><Link href="/cookies" className="text-cream/70 hover:text-cream">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-cream/50 text-xs">
          <p>
            © 2026 KEROMA · An{" "}
            <Link href="https://ementech.co.ke" className="underline hover:text-cream">
              EMENTECH
            </Link>{" "}
            brand · Nairobi, Kenya
          </p>
          <p>Made with care for the kitchens that raised us.</p>
        </div>
      </div>
    </footer>
  );
}