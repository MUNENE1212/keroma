import { Logo } from "@/components/brand/Logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="px-6 lg:px-8 py-6">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {children}
      </main>
      <footer className="px-6 lg:px-8 py-6 text-center text-xs text-ink-soft">
        By signing in you agree to our{" "}
        <Link href="/terms" className="underline hover:text-clay">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-clay">Privacy</Link>.
      </footer>
    </div>
  );
}