"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ChefHat, Sparkles, RefreshCw, ArrowRight, Clock, Users } from "lucide-react";

const DIETARY = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Halal",
  "Kosher",
  "Gluten-free",
  "Dairy-free",
  "Nut-free",
  "Low-sodium",
  "Diabetic-friendly",
  "Spicy",
  "Mild",
];

const STARTER_PANTRY = [
  "tomatoes",
  "onions",
  "garlic",
  "ginger",
  "rice",
  "oil",
  "salt",
  "eggs",
  "beans",
  "milk",
  "chicken",
  "leafy greens",
];

interface GeneratedRecipe {
  title: string;
  region: string;
  totalTime: number;
  servings: number;
  excerpt: string;
  ingredients: string[];
  status: "streaming" | "complete";
}

export default function DiscoverPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [hunger, setHunger] = useState<"Light" | "Standard" | "Hungry">("Standard");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<GeneratedRecipe[]>([]);
  const [draftIngredient, setDraftIngredient] = useState("");

  const addIngredient = (text: string) => {
    const t = text.trim().toLowerCase();
    if (t && !ingredients.includes(t)) {
      setIngredients([...ingredients, t]);
    }
  };

  const removeIngredient = (i: string) => {
    setIngredients(ingredients.filter((x) => x !== i));
  };

  const generate = () => {
    if (ingredients.length === 0) return;
    setGenerating(true);
    setResults([
      { title: "Generating…", region: "—", totalTime: 0, servings: 0, excerpt: "", ingredients: [], status: "streaming" },
      { title: "Generating…", region: "—", totalTime: 0, servings: 0, excerpt: "", ingredients: [], status: "streaming" },
      { title: "Generating…", region: "—", totalTime: 0, servings: 0, excerpt: "", ingredients: [], status: "streaming" },
    ]);

    setTimeout(() => {
      const mock: GeneratedRecipe[] = [
        {
          title: "Coastal tomato-coconut rice with your vegetables",
          region: "East Africa",
          totalTime: 35,
          servings: hunger === "Hungry" ? 4 : hunger === "Light" ? 2 : 3,
          excerpt: "A weeknight pilau-inspired dish built around the tomatoes and aromatics you already have.",
          ingredients: ["rice", "coconut milk", "tomatoes", "onion", "garlic", "ginger"],
          status: "complete",
        },
        {
          title: "Spiced bean stew with greens",
          region: "East Africa",
          totalTime: 30,
          servings: hunger === "Hungry" ? 4 : hunger === "Light" ? 2 : 3,
          excerpt: "Beans, greens, and a berbere-style warm spice. Eat with bread, rice, or ugali.",
          ingredients: ["beans", "leafy greens", "onion", "garlic", "tomatoes"],
          status: "complete",
        },
        {
          title: "Ginger-tomato egg curry",
          region: "East Africa",
          totalTime: 20,
          servings: hunger === "Hungry" ? 3 : 2,
          excerpt: "Five minutes of prep, fifteen of cooking, and the ginger does the heavy lifting.",
          ingredients: ["eggs", "tomatoes", "ginger", "garlic", "onion"],
          status: "complete",
        },
      ];
      setResults(mock);
      setGenerating(false);
    }, 2400);
  };

  return (
    <>
      <section className="bg-cream-warm border-b border-mist">
        <div className="container mx-auto px-6 lg:px-8 py-16">
          <p className="recipe-meta mb-3">Discover</p>
          <h1
            className="font-display text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight max-w-3xl"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            What&apos;s in your kitchen?
          </h1>
          <p className="mt-4 text-lg text-ink-soft max-w-2xl">
            Tell us a few ingredients. We&apos;ll suggest three real recipes from across the continent — built around what you actually have.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          {/* Pantry input */}
          <div className="bg-cream-warm border border-mist rounded-xl p-6">
            <h2 className="font-display text-xl text-ink mb-3">Your pantry</h2>
            <div className="flex gap-2 mb-4">
              <input
                value={draftIngredient}
                onChange={(e) => setDraftIngredient(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addIngredient(draftIngredient);
                    setDraftIngredient("");
                  }
                }}
                placeholder="e.g. tomatoes, ginger, rice"
                className="flex-1 h-12 px-4 rounded-md border border-mist bg-cream text-ink placeholder:text-ink-soft focus:outline-none focus:border-clay"
                aria-label="Add ingredient"
              />
              <Button
                onClick={() => {
                  addIngredient(draftIngredient);
                  setDraftIngredient("");
                }}
                variant="secondary"
                size="md"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[36px]">
              {ingredients.map((i) => (
                <Chip key={i} label={i} selected removable onRemove={() => removeIngredient(i)} />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-soft">
              <span>Quick add:</span>
              {STARTER_PANTRY.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addIngredient(s)}
                  className="px-2 py-0.5 rounded-full bg-bone hover:bg-mist transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary */}
          <div className="mt-6 bg-cream-warm border border-mist rounded-xl p-6">
            <h2 className="font-display text-xl text-ink mb-3">Dietary preferences</h2>
            <div className="flex flex-wrap gap-2">
              {DIETARY.map((d) => (
                <Chip
                  key={d}
                  label={d}
                  selected={dietary.includes(d)}
                  onClick={() =>
                    setDietary(dietary.includes(d) ? dietary.filter((x) => x !== d) : [...dietary, d])
                  }
                />
              ))}
            </div>
          </div>

          {/* Hunger level */}
          <div className="mt-6 bg-cream-warm border border-mist rounded-xl p-6">
            <h2 className="font-display text-xl text-ink mb-3">How hungry?</h2>
            <div className="flex flex-wrap gap-2">
              {(["Light", "Standard", "Hungry"] as const).map((h) => (
                <Chip
                  key={h}
                  label={h}
                  selected={hunger === h}
                  onClick={() => setHunger(h)}
                />
              ))}
            </div>
          </div>

          {/* Generate */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center">
            <Button
              onClick={generate}
              disabled={ingredients.length === 0 || generating}
              isLoading={generating}
              size="lg"
              variant="primary"
              leftIcon={<Sparkles className="w-5 h-5" />}
            >
              {generating ? "Thinking…" : "Generate 3 recipes"}
            </Button>
            <span className="text-sm text-ink-soft">
              {ingredients.length} ingredients · {dietary.length} preferences
            </span>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl text-ink mb-6">Three recipes for your kitchen</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.map((r, i) => (
                  <article
                    key={i}
                    className="bg-cream border border-mist rounded-xl overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-cream-warm to-mist flex items-center justify-center relative">
                      {r.status === "streaming" ? (
                        <div className="space-y-2 w-full p-6">
                          <div className="h-4 shimmer rounded w-3/4" />
                          <div className="h-3 shimmer rounded w-1/2" />
                          <div className="h-3 shimmer rounded w-2/3" />
                        </div>
                      ) : (
                        <span className="text-5xl text-ink-soft/30">▣</span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="recipe-meta mb-2">
                        {r.status === "complete" ? `${r.region} · ${r.totalTime}m · ${r.servings} servings` : "—"}
                      </p>
                      <h3 className="font-display text-lg text-ink leading-snug mb-2">
                        {r.status === "complete" ? r.title : <span className="shimmer h-6 w-3/4 inline-block rounded" />}
                      </h3>
                      <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 mb-3">
                        {r.status === "complete"
                          ? r.excerpt
                          : <span className="block shimmer h-3 w-full rounded mb-1" />}
                      </p>
                      {r.status === "complete" && (
                        <Link
                          href="#"
                          className="inline-flex items-center gap-1.5 text-clay hover:text-clay-deep font-medium text-sm"
                        >
                          See the recipe
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              {results.some((r) => r.status === "complete") && (
                <div className="mt-8 text-center">
                  <Button variant="ghost" size="md" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={generate}>
                    Regenerate with different ingredients
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}