import { Button } from "@/components/ui/Button";
import { Check, X } from "lucide-react";

const freeFeatures = [
  "Unlimited pantry",
  "5 recipe saves a month",
  "AI recipe generation",
  "Cook mode with timers",
  "Browse full library",
  "Search & filter",
];

const premiumFeatures = [
  "Everything in Free",
  "Unlimited recipe saves",
  "Premium AI (Claude 3.5 Sonnet)",
  "Weekly heritage recipe digest",
  "Meal planning",
  "Shopping list auto-generation",
  "Ad-free",
  "Priority support",
];

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your account settings. No questions asked. Your data stays until you delete the account." },
  { q: "What payment methods?", a: "M-Pesa STK push, card, and bank transfer. M-Pesa is the primary rail in Kenya." },
  { q: "Refund policy?", a: "Full refund within 7 days of subscription. After that, prorated refund on annual plans." },
  { q: "Is my data private?", a: "Yes. Pantry and saves are private. We don't share individual data. Aggregate, anonymized usage may inform recipe popularity." },
  { q: "Do I need the AI to use KEROMA?", a: "No. The recipe library is fully browsable without using the AI. The AI is there when you want it." },
  { q: "Can I use KEROMA offline?", a: "On mobile (PWA, v2), you can browse saved recipes offline. The AI generation requires connectivity." },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-cream-warm border-b border-mist">
        <div className="container mx-auto px-6 lg:px-8 py-20 text-center max-w-3xl">
          <p className="recipe-meta mb-3">Pricing</p>
          <h1
            className="font-display text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Pick your pace.
          </h1>
          <p className="mt-6 text-xl text-ink-soft">
            Start free. Upgrade when you&apos;re hooked.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-cream-warm border border-mist rounded-xl p-8">
              <p className="recipe-meta mb-2">Free</p>
              <p className="font-display text-5xl text-ink mb-1">KES 0</p>
              <p className="text-sm text-ink-soft mb-8">Always free, no card needed.</p>
              <ul className="space-y-3 mb-8">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink">
                    <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button href="/discover" variant="secondary" size="md" className="w-full">
                Start cooking free
              </Button>
            </div>

            {/* Premium */}
            <div className="bg-cream border-2 border-saffron rounded-xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-saffron text-ink text-[10px] font-mono uppercase tracking-widest font-bold rounded-full">
                Most chosen
              </div>
              <p className="recipe-meta mb-2">Premium</p>
              <div className="flex items-baseline gap-1 mb-1">
                <p className="font-display text-5xl text-ink">KES 199</p>
                <span className="text-ink-soft text-sm">/ month</span>
              </div>
              <p className="text-sm text-ink-soft mb-8">Billed monthly. KES 1,999 / year (save 16%).</p>
              <ul className="space-y-3 mb-8">
                {premiumFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink">
                    <Check className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button href="/login" variant="premium" size="md" className="w-full">
                Subscribe via M-Pesa
              </Button>
              <p className="mt-3 text-xs text-ink-soft text-center">M-Pesa STK push · 7-day free trial · cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <h2
            className="font-display text-3xl md:text-4xl text-ink leading-tight mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Frequently asked.
          </h2>
          <div className="space-y-1 border-t border-mist">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-mist py-4">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="font-display text-lg text-ink">{f.q}</h3>
                  <span className="text-ink-soft group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}