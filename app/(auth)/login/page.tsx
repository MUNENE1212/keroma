import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <h1
        className="font-display text-4xl text-ink leading-tight mb-2"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        Welcome back.
      </h1>
      <p className="text-ink-soft mb-8">We&apos;ll send you a magic link to sign in.</p>

      <form className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <Button type="submit" variant="primary" size="md" className="w-full">
          Send magic link
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-ink-soft">
        <div className="flex-1 h-px bg-mist" />
        <span>or</span>
        <div className="flex-1 h-px bg-mist" />
      </div>

      <Button variant="secondary" size="md" className="w-full">
        Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-ink-soft">
        New here?{" "}
        <Link href="/register" className="text-clay hover:text-clay-deep font-medium">
          Create an account →
        </Link>
      </p>
    </div>
  );
}