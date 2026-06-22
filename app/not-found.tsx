import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-md">
        <div className="text-cream-warm">
          <Logo size="lg" />
        </div>
        <p
          className="font-display text-9xl text-clay leading-none mt-12"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          404
        </p>
        <h1
          className="font-display text-3xl text-ink mt-6"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          This page isn&apos;t in the pantry.
        </h1>
        <p className="text-ink-soft mt-4">
          We searched the jiko, the sufuria, and the spice rack. Nothing here.
        </p>
        <Link href="/" className="inline-block mt-8 text-clay hover:text-clay-deep font-medium">
          ← Back to the home page
        </Link>
      </div>
    </div>
  );
}