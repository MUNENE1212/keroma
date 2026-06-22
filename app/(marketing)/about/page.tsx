import { Button } from "@/components/ui/Button";
import { Sparkles, Globe, BookOpen, Users, Heart, Leaf } from "lucide-react";

const milestones = [
  { year: "2024", title: "A hackathon prototype", body: "Built at a hackathon. The AI did the recipe prose; the cultural context was wrong. We learned that heritage can't be generated — only retrieved." },
  { year: "2025", title: "The library grows", body: "A real recipe library, written by hand, from grandmothers and street vendors across the continent. 12 recipes, then 50, then 200." },
  { year: "2026", title: "KEROMA", body: "The brand. The full library, the AI that knows the why of each dish, the cooking companion that doesn't disappear at the jiko." },
  { year: "Now", title: "The story continues", body: "We're building toward a future where African kitchens are documented, not exoticised. Join us." },
];

const values = [
  {
    icon: BookOpen,
    title: "Heritage is old. We're not.",
    body: "Recipes come from grandmothers. The interface should feel like 2026, not 1996.",
  },
  {
    icon: Leaf,
    title: "Be honest about the AI.",
    body: "We use it where it helps — never where it pretends.",
  },
  {
    icon: Globe,
    title: "A continent, not a country.",
    body: "From Tunis to Cape Town, from Dakar to Mombasa. Different tables, same continent.",
  },
  {
    icon: Heart,
    title: "The hands, not the kitchen.",
    body: "We celebrate the cook, not the stove. Recipes are stories, not instructions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream-warm border-b border-mist">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="recipe-meta mb-3">About</p>
              <h1
                className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] tracking-tight"
                style={{ fontVariationSettings: "'opsz' 144" }}
              >
                We&apos;re building a memory for African kitchens.
              </h1>
              <p className="mt-6 text-xl text-ink-soft max-w-2xl leading-relaxed">
                KEROMA is a heritage-modern recipe platform — a record of what African
                grandmothers, street vendors, and home cooks have always known, finally
                written down with the help of AI that knows the difference.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/discover" variant="primary" size="lg">
                  Try the AI
                </Button>
                <Button href="/recipes" variant="secondary" size="lg">
                  Browse the library
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-square bg-gradient-to-br from-clay/15 via-cream-warm to-moss/10 rounded-xl flex items-center justify-center">
                <span className="text-[140px] font-display text-clay/40 leading-none" style={{ fontVariationSettings: "'opsz' 144" }}>
                  K
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <p className="recipe-meta mb-3">How we got here</p>
          <h2
            className="font-display text-4xl md:text-5xl text-ink leading-tight mb-12 max-w-2xl"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            A short history.
          </h2>
          <div className="space-y-12">
            {milestones.map((m) => (
              <div key={m.year} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-2">
                  <p className="font-mono text-2xl text-clay">{m.year}</p>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-display text-2xl text-ink mb-2">{m.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream-warm">
        <div className="container mx-auto px-6 lg:px-8">
          <p className="recipe-meta mb-3">What we believe</p>
          <h2
            className="font-display text-4xl md:text-5xl text-ink leading-tight mb-12 max-w-2xl"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            The four things we won&apos;t compromise on.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="group">
                <div className="w-12 h-12 rounded-md bg-clay-soft flex items-center justify-center text-clay-deep mb-4 group-hover:bg-clay group-hover:text-cream transition-colors duration-base">
                  <v.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{v.title}</h3>
                <p className="text-ink-soft leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8 text-center max-w-2xl">
          <h2
            className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Help us write more down.
          </h2>
          <p className="text-lg text-ink-soft mb-8">
            Every recipe we add is a small act of cultural preservation. If you cook — at home, in a restaurant, on a street corner — and have a recipe worth recording, we&apos;d love to talk.
          </p>
          <Button href="mailto:hello@keroma.co.ke" variant="primary" size="lg">
            Send us a recipe
          </Button>
        </div>
      </section>
    </>
  );
}