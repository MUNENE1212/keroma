import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ChefHat, Sparkles, Plus } from "lucide-react";

export default function AppDashboard() {
  return (
    <div className="container mx-auto px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="font-display text-3xl md:text-4xl text-ink leading-tight"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Welcome back, Wanjiru.
          </h1>
          <p className="text-ink-soft mt-1">What are you cooking today?</p>
        </div>
        <Button href="/discover" variant="primary" leftIcon={<ChefHat className="w-4 h-4" />}>
          Cook
        </Button>
      </div>

      {/* Pantry */}
      <section className="mb-8 bg-cream-warm border border-mist rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg text-ink">Your pantry</h2>
          <Link href="/app/pantry" className="text-sm text-clay hover:text-clay-deep font-medium">Manage →</Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {["tomatoes", "ginger", "rice", "coconut milk", "onions", "garlic", "oil", "eggs", "beans", "chicken", "leafy greens", "salt"].map((i) => (
            <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream border border-mist text-sm text-ink">
              {i}
            </span>
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-mist text-sm text-ink-soft hover:bg-bone"
          >
            <Plus className="w-3.5 h-3.5" /> Add more
          </button>
        </div>
      </section>

      {/* Recently cooked */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg text-ink">Recently cooked</h2>
          <Link href="/app/history" className="text-sm text-clay hover:text-clay-deep font-medium">See all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Pilau masala with chicken", time: "Yesterday" },
            { title: "Sukuma wiki + ugali", time: "3 days ago" },
            { title: "Jollof rice (the confederal one)", time: "Last week" },
            { title: "Akara (black-eyed pea fritters)", time: "2 weeks ago" },
          ].map((r, i) => (
            <article key={i} className="bg-cream border border-mist rounded-xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-cream-warm to-mist flex items-center justify-center">
                <span className="text-4xl text-ink-soft/30">▣</span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm text-ink leading-snug">{r.title}</h3>
                <p className="text-xs text-ink-soft mt-1">{r.time}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Saved */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg text-ink">Saved recipes (24)</h2>
          <Link href="/app/saved" className="text-sm text-clay hover:text-clay-deep font-medium">See all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "Pilau masala",
            "Jollof rice",
            "Mafé",
            "Injera + misir",
            "Suya",
            "Kelewele",
          ].map((title, i) => (
            <Link key={i} href="/recipes" className="group">
              <div className="aspect-square bg-gradient-to-br from-cream-warm to-mist rounded-lg flex items-center justify-center mb-2 group-hover:shadow-md transition-shadow">
                <span className="text-3xl text-ink-soft/30">▣</span>
              </div>
              <p className="text-xs text-ink text-center">{title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Suggestions */}
      <section className="bg-saffron-soft/30 border border-saffron-soft rounded-xl p-6 flex items-start gap-4">
        <Sparkles className="w-6 h-6 text-clay flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <h2 className="font-display text-lg text-ink mb-1">Discover something new</h2>
          <p className="text-sm text-ink-soft mb-3">
            Based on your pantry and cooking history, here are three recipes you haven&apos;t tried yet.
          </p>
          <Button href="/discover" variant="secondary" size="sm">
            Open the AI
          </Button>
        </div>
      </section>
    </div>
  );
}