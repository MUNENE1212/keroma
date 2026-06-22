import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { recipes, type Recipe } from "@/lib/data/recipes";
import { formatDuration, formatCalories } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Bookmark, Share2, Star, Clock, Users, ChefHat } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const r = recipes.find((x) => x.slug === slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.excerpt,
    openGraph: {
      title: r.title,
      description: r.excerpt,
      images: r.image ? [r.image] : undefined,
    },
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: recipe.title,
            description: recipe.description,
            image: recipe.image,
            author: { "@type": "Organization", name: "KEROMA" },
            datePublished: "2026-01-01",
            recipeCuisine: recipe.cuisine,
            recipeCategory: recipe.region,
            recipeYield: `${recipe.servings} servings`,
            totalTime: `PT${recipe.totalTime}M`,
            prepTime: `PT${recipe.prepTime}M`,
            cookTime: `PT${recipe.cookTime}M`,
            recipeIngredient: recipe.ingredients.map((i) =>
              `${i.amount} ${i.unit} ${i.name}`.trim()
            ),
            recipeInstructions: recipe.steps.map((s) => ({
              "@type": "HowToStep",
              name: s.title,
              text: s.instruction,
            })),
            nutrition: {
              "@type": "NutritionInformation",
              calories: `${recipe.nutrition.calories} kcal`,
              proteinContent: `${recipe.nutrition.protein} g`,
              carbohydrateContent: `${recipe.nutrition.carbs} g`,
              fatContent: `${recipe.nutrition.fat} g`,
              fiberContent: `${recipe.nutrition.fiber} g`,
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-cream-warm border-b border-mist">
        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] bg-gradient-to-br from-cream-warm via-mist to-clay/10 rounded-xl flex items-center justify-center">
                <span className="text-9xl text-ink-soft/30">▣</span>
              </div>
            </div>
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <p className="recipe-meta mb-3">
                {recipe.region} · {formatDuration(recipe.totalTime)} · {recipe.difficulty}
              </p>
              <h1
                className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight"
                style={{ fontVariationSettings: "'opsz' 144" }}
              >
                {recipe.title}
              </h1>
              <p
                className="mt-4 text-lg text-ink-soft italic font-display"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {recipe.excerpt}
              </p>
              <p className="mt-6 text-base text-ink leading-relaxed">{recipe.description}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                <Button variant="primary" size="md" leftIcon={<ChefHat className="w-4 h-4" />}>
                  Cook
                </Button>
                <Button variant="secondary" size="md" leftIcon={<Bookmark className="w-4 h-4" />}>
                  Save
                </Button>
                <Button variant="ghost" size="md" leftIcon={<Share2 className="w-4 h-4" />}>
                  Share
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-4 h-4 ${i <= 4 ? "text-saffron fill-saffron" : "text-mist"}`} aria-hidden="true" />
                ))}
                <span className="ml-2 text-sm text-ink-soft">4.0 · 124 saves</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body — ingredients + steps */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Ingredients (sticky) */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl text-ink">Ingredients</h2>
                  <div className="flex items-center gap-2 text-sm text-ink-soft">
                    <span>Serves</span>
                    <button className="w-7 h-7 rounded-md border border-mist hover:bg-bone" aria-label="Decrease servings">−</button>
                    <span className="font-mono w-6 text-center">{recipe.servings}</span>
                    <button className="w-7 h-7 rounded-md border border-mist hover:bg-bone" aria-label="Increase servings">+</button>
                  </div>
                </div>
                <ul className="space-y-1.5 bg-cream-warm rounded-xl p-5 border border-mist">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm py-1.5 border-b border-mist last:border-0">
                      <span className="font-mono text-ink-soft w-16 flex-shrink-0 text-right">
                        {ing.amount} {ing.unit}
                      </span>
                      <span className="text-ink flex-1">{ing.name}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink-soft">
                  <Link href="#" className="text-clay hover:text-clay-deep">Add missing to shopping list</Link>
                  <span className="mx-1.5">·</span>
                  <span className="italic">Premium</span>
                </p>
              </div>
            </aside>

            {/* Steps */}
            <div className="lg:col-span-8">
              <h2 className="font-display text-2xl text-ink mb-8">Method</h2>
              <ol className="space-y-10">
                {recipe.steps.map((step) => (
                  <li key={step.order} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-2">
                      <span className="step-number">0{step.order}</span>
                      {step.duration && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {formatDuration(step.duration)}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-10">
                      <h3 className="font-display text-xl text-ink mb-2">{step.title}</h3>
                      <p className="text-ink leading-relaxed">{step.instruction}</p>
                      {step.timer && (
                        <button
                          type="button"
                          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-clay-soft text-clay-deep text-sm font-medium hover:bg-clay hover:text-cream transition-colors"
                        >
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          Start {formatDuration(step.timer / 60)} timer
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-12">
                <Button variant="primary" size="lg" leftIcon={<ChefHat className="w-5 h-5" />}>
                  Open cook mode
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural context */}
      <section className="py-16 bg-cream-warm">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <p className="recipe-meta mb-3">From the source</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-6">
            Why this dish tastes the way it does
          </h2>
          <p className="pull-quote mb-8">{recipe.culturalContext}</p>

          {recipe.occasion && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="recipe-meta mb-2">Served at</p>
                <p className="text-ink">{recipe.occasion}</p>
              </div>
              {recipe.pairWith && (
                <div>
                  <p className="recipe-meta mb-2">Pairs with</p>
                  <p className="text-ink">{recipe.pairWith}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Nutrition */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display text-2xl text-ink mb-6">Per serving</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Calories", value: formatCalories(recipe.nutrition.calories) },
              { label: "Protein", value: `${recipe.nutrition.protein} g` },
              { label: "Carbs", value: `${recipe.nutrition.carbs} g` },
              { label: "Fat", value: `${recipe.nutrition.fat} g` },
              { label: "Fiber", value: `${recipe.nutrition.fiber} g` },
            ].map((n) => (
              <div key={n.label} className="bg-cream-warm border border-mist rounded-md p-4 text-center">
                <p className="font-mono text-xl text-ink font-medium">{n.value}</p>
                <p className="recipe-meta mt-1">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}