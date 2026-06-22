"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const DIETARY = ["Vegetarian", "Vegan", "Pescatarian", "Halal", "Kosher", "Gluten-free", "Dairy-free", "Nut-free", "Low-sodium", "Diabetic-friendly"];

export default function AccountPage() {
  const [premium] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [dietary, setDietary] = useState<string[]>([]);

  return (
    <div className="container mx-auto px-6 lg:px-8 py-8 max-w-3xl">
      <h1
        className="font-display text-3xl md:text-4xl text-ink leading-tight mb-2"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        Account
      </h1>
      <p className="text-ink-soft mb-8">Manage your profile, preferences, and subscription.</p>

      {/* Profile */}
      <section className="bg-cream-warm border border-mist rounded-xl p-6 mb-4">
        <h2 className="font-display text-xl text-ink mb-4">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Name" defaultValue="Wanjiru Kamau" />
          <Input label="Email" type="email" defaultValue="wanjiru@example.com" />
        </div>
      </section>

      {/* Subscription */}
      <section className="bg-cream-warm border border-mist rounded-xl p-6 mb-4">
        <h2 className="font-display text-xl text-ink mb-2">Subscription</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink">
              {premium ? "Premium · KES 199 / month" : "Free"}
            </p>
            <p className="text-xs text-ink-soft mt-1">
              {premium ? "Next billing: Apr 12, 2026" : "Upgrade to save unlimited recipes"}
            </p>
          </div>
          <Button variant={premium ? "secondary" : "premium"} size="sm">
            {premium ? "Manage" : "Upgrade to Premium"}
          </Button>
        </div>
      </section>

      {/* Dietary */}
      <section className="bg-cream-warm border border-mist rounded-xl p-6 mb-4">
        <h2 className="font-display text-xl text-ink mb-2">Dietary tags</h2>
        <p className="text-sm text-ink-soft mb-4">The AI uses these to filter suggestions.</p>
        <div className="flex flex-wrap gap-2">
          {DIETARY.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDietary(dietary.includes(d) ? dietary.filter((x) => x !== d) : [...dietary, d])}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-fast ${
                dietary.includes(d)
                  ? "bg-clay-soft border-clay text-clay-deep"
                  : "bg-cream-warm border-mist text-ink hover:bg-bone"
              }`}
            >
              {dietary.includes(d) && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Theme */}
      <section className="bg-cream-warm border border-mist rounded-xl p-6 mb-4">
        <h2 className="font-display text-xl text-ink mb-2">Appearance</h2>
        <div className="flex gap-2">
          {(["light", "dark", "system"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize border transition-all ${
                theme === t ? "bg-clay text-cream border-clay" : "bg-cream border-mist text-ink hover:bg-bone"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Danger */}
      <section className="border-2 border-clay rounded-xl p-6">
        <h2 className="font-display text-xl text-clay mb-2">Danger zone</h2>
        <p className="text-sm text-ink-soft mb-4">Permanently delete your account and all data.</p>
        <Button variant="secondary" size="sm" className="!text-clay !border-clay hover:!bg-clay hover:!text-cream">
          Delete account
        </Button>
      </section>
    </div>
  );
}