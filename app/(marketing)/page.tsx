import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ArrowRight, Sparkles, BookOpen, ChefHat, Leaf } from "lucide-react";

const featuredRecipes = [
  {
    slug: "pilau-masala-chicken",
    title: "Pilau masala with chicken",
    region: "East Africa",
    time: "45 min",
    difficulty: "Medium",
    excerpt: "A coastal Swahili classic that turns weeknight chicken into a feast.",
  },
  {
    slug: "jollof-rice-debate",
    title: "Jollof rice (the confederal one)",
    region: "West Africa",
    time: "1h 10m",
    difficulty: "Medium",
    excerpt: "Tomato base, party rice, and a regional ceasefire — for one plate.",
  },
  {
    slug: "injera-misir-wot",
    title: "Injera with misir wat",
    region: "Horn of Africa",
    time: "1h 30m",
    difficulty: "Medium",
    excerpt: "Sourdough flatbread meets slow-cooked red lentils berbere-spiced.",
  },
];

const valueProps = [
  {
    icon: Sparkles,
    title: "From your pantry",
    body: "Tell us what's in your kitchen. We suggest real recipes from across the continent.",
  },
  {
    icon: BookOpen,
    title: "Stories, not just steps",
    body: "Every recipe carries its origin — the region, the occasion, the why it tastes the way it does.",
  },
  {
    icon: ChefHat,
    title: "Cook with you",
    body: "Ask substitutions mid-recipe. Scale servings. Time the simmer. We don't disappear at the jiko.",
  },
  {
    icon: Leaf,
    title: "Honest about the AI",
    body: "We use it where it helps. The cooking is yours. The recipes are old.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <h1
                className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] tracking-tight"
                style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
              >
                Recipes that remember.
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-ink-soft max-w-2xl leading-relaxed">
                A heritage of African kitchens, in your pantry.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/discover" size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Cook with what I have
                </Button>
                <Button href="/recipes" size="lg" variant="secondary">
                  Browse recipes
                </Button>
              </div>

              <div className="mt-12 pt-8 border-t border-mist">
                <p className="text-sm text-ink-soft mb-3">or paste a list:</p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="tomatoes" selected removable />
                  <Chip label="ginger" selected removable />
                  <Chip label="rice" selected removable />
                  <Chip label="coconut milk" selected removable />
                  <Chip label="+ add more" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-clay/15 via-cream-warm to-moss/10 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="text-[120px] leading-none font-display text-clay/40 mb-2" style={{ fontVariationSettings: "'opsz' 144" }}>
                      K
                    </div>
                    <p className="text-sm text-ink-soft italic">
                      Replace with a hero photo: hands + clay pot + steam
                    </p>
                    <p className="text-xs text-ink-soft mt-2">
                      (warm-lit, dappled-window-light, real African kitchen)
                    </p>
                  </div>
                </div>
                <div className="absolute top-6 left-6 px-3 py-1.5 bg-cream/90 backdrop-blur rounded-full">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-clay">Live · 200+ recipes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured recipes */}
      <section className="py-24 bg-cream-warm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-saffron font-semibold mb-3">
                This week on the jiko
              </p>
              <h2
                className="font-display text-4xl md:text-5xl text-ink leading-tight"
                style={{ fontVariationSettings: "'opsz' 144" }}
              >
                Three to start with.
              </h2>
            </div>
            <Link
              href="/recipes"
              className="hidden md:inline-flex items-center gap-2 text-clay hover:text-clay-deep font-medium"
            >
              See all recipes
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((r) => (
              <article
                key={r.slug}
                className="group bg-cream rounded-xl overflow-hidden border border-mist shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-base"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-cream-warm to-mist flex items-center justify-center">
                  <span className="text-6xl text-ink-soft/30">▣</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-ink-soft uppercase tracking-widest mb-2">
                    {r.region} · {r.time} · {r.difficulty}
                  </p>
                  <h3
                    className="font-display text-2xl text-ink leading-tight mb-3 group-hover:text-clay transition-colors"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{r.excerpt}</p>
                  <Link
                    href={`/recipes/${r.slug}`}
                    className="inline-flex items-center gap-1.5 mt-4 text-clay hover:text-clay-deep font-medium text-sm"
                  >
                    Read the recipe
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-saffron font-semibold mb-3">
              Why KEROMA
            </p>
            <h2
              className="font-display text-4xl md:text-5xl text-ink leading-tight"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Heritage, asked of your kitchen.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((v) => (
              <div key={v.title} className="group">
                <div className="w-12 h-12 rounded-md bg-clay-soft flex items-center justify-center text-clay-deep mb-4 group-hover:bg-clay group-hover:text-cream transition-colors duration-base">
                  <v.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{v.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-clay text-cream">
        <div className="container mx-auto px-6 lg:px-8 text-center max-w-3xl">
          <h2
            className="font-display text-4xl md:text-5xl leading-tight mb-6"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Free to start. Premium when you&apos;re hooked.
          </h2>
          <p className="text-lg text-cream/85 mb-8">
            Unlimited pantry, 5 saves a month, and the AI. Premium adds meal planning,
            ad-free, and a weekly heritage recipe in your inbox.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/discover" size="lg" variant="secondary" className="!text-clay !border-cream hover:!bg-cream hover:!text-clay">
              Start cooking free
            </Button>
            <Button href="/pricing" size="lg" variant="ghost" className="!text-cream hover:!bg-clay-deep">
              See pricing
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}