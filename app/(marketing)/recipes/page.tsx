import Link from "next/link";
import type { Metadata } from "next";
import { recipes } from "@/lib/data/recipes";
import { formatDuration } from "@/lib/utils";
import { ArrowRight, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Recipes",
  description: "The whole collection, organised.",
};

const regions = [
  { id: "all", label: "All regions", count: recipes.length },
  ...Array.from(
    recipes.reduce((acc, r) => {
      acc.set(r.region, (acc.get(r.region) ?? 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([id, count]) => ({ id, label: id, count })),
];

export default function RecipesPage() {
  return (
    <>
      <section className="bg-cream-warm border-b border-mist">
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <h1
            className="font-display text-5xl md:text-6xl text-ink leading-tight"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Recipes
          </h1>
          <p className="mt-4 text-xl text-ink-soft max-w-2xl">
            The whole collection, organised. Filter by region, time, or what you usually have around.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Filters sidebar */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-24 space-y-8">
                <div>
                  <h2 className="font-display text-sm uppercase tracking-[0.12em] text-ink mb-3 font-semibold">
                    Region
                  </h2>
                  <ul className="space-y-1.5">
                    {regions.map((r) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          className="w-full flex items-center justify-between text-sm text-ink hover:text-clay py-1 transition-colors text-left"
                        >
                          <span>{r.label}</span>
                          <span className="text-ink-soft text-xs">{r.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-sm uppercase tracking-[0.12em] text-ink mb-3 font-semibold">
                    Time
                  </h2>
                  <ul className="space-y-1.5">
                    <li>
                      <button type="button" className="text-sm text-ink hover:text-clay transition-colors text-left">
                        Under 30 minutes
                      </button>
                    </li>
                    <li>
                      <button type="button" className="text-sm text-ink hover:text-clay transition-colors text-left">
                        30 – 60 minutes
                      </button>
                    </li>
                    <li>
                      <button type="button" className="text-sm text-ink hover:text-clay transition-colors text-left">
                        Over 1 hour
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-sm uppercase tracking-[0.12em] text-ink mb-3 font-semibold">
                    Protein
                  </h2>
                  <ul className="space-y-1.5">
                    <li>
                      <button type="button" className="text-sm text-ink hover:text-clay transition-colors text-left">
                        Meat
                      </button>
                    </li>
                    <li>
                      <button type="button" className="text-sm text-ink hover:text-clay transition-colors text-left">
                        Fish
                      </button>
                    </li>
                    <li>
                      <button type="button" className="text-sm text-ink hover:text-clay transition-colors text-left">
                        Vegetarian
                      </button>
                    </li>
                    <li>
                      <button type="button" className="text-sm text-ink hover:text-clay transition-colors text-left">
                        Vegan
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Recipe grid */}
            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-ink-soft">
                  Showing {recipes.length} of {recipes.length} recipes
                </p>
                <select className="bg-cream-warm border border-mist rounded-md px-3 py-2 text-sm text-ink focus:border-clay focus:outline-none">
                  <option>Newest</option>
                  <option>Most saved</option>
                  <option>Quickest first</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recipes.map((r) => (
                  <article
                    key={r.slug}
                    className="group bg-cream rounded-xl overflow-hidden border border-mist shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-base"
                  >
                    <Link href={`/recipes/${r.slug}`}>
                      <div className="aspect-[4/3] bg-gradient-to-br from-cream-warm to-mist flex items-center justify-center">
                        <span className="text-6xl text-ink-soft/30">▣</span>
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-ink-soft mb-2">
                          {r.region} · {formatDuration(r.totalTime)} · {r.difficulty}
                        </p>
                        <h3
                          className="font-display text-xl text-ink leading-snug mb-2 group-hover:text-clay transition-colors"
                          style={{ fontVariationSettings: "'opsz' 144" }}
                        >
                          {r.title}
                        </h3>
                        <p className="text-sm text-ink-soft leading-relaxed line-clamp-2 mb-3">{r.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-ink-soft">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {formatDuration(r.totalTime)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" aria-hidden="true" />
                            Serves {r.servings}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}