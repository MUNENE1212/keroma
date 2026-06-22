import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <h1
        className="font-display text-4xl text-ink leading-tight mb-2"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        Join KEROMA.
      </h1>
      <p className="text-ink-soft mb-8">It takes a minute. Then we cook together.</p>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="First name" type="text" required />
          <Input label="Last name" type="text" />
        </div>
        <Input label="Email" type="email" placeholder="you@example.com" required />
        <Button type="submit" variant="primary" size="md" className="w-full">
          Create account
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-ink-soft">
        <div className="flex-1 h-px bg-mist" />
        <span>or</span>
        <div className="flex-1 h-px bg-mist" />
      </div>

      <Button variant="secondary" size="md" className="w-full">
        Sign up with Google
      </Button>

      <p className="mt-8 text-center text-sm text-ink-soft">
        Already with us?{" "}
        <Link href="/login" className="text-clay hover:text-clay-deep font-medium">
          Sign in →
        </Link>
      </p>
    </div>
  );
}