import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const articles: Array<{
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
}> = [
  {
    slug: "jiko-stove-tells-time",
    title: "The jiko: Kenya's stove that tells time",
    excerpt: "Charcoal cookers aren't primitive — they're a precise instrument tuned to one thing: cooking Kenyan food properly.",
    category: "Heritage",
    readTime: 6,
    date: "Mar 2026",
  },
  {
    slug: "berbere-spice-routes",
    title: "Berbere and the spice routes",
    excerpt: "How a single spice blend traces a thousand years of trade, war, and marriage across the Red Sea.",
    category: "Spice",
    readTime: 9,
    date: "Mar 2026",
  },
  {
    slug: "ugali-backbone",
    title: "Ugali: the backbone of a continent's tables",
    excerpt: "Maize stiff porridge is a quiet constant across East and Southern Africa. Why it matters more than it gets credit for.",
    category: "Staples",
    readTime: 7,
    date: "Feb 2026",
  },
  {
    slug: "jollof-confederacy",
    title: "West African jollof: a confederacy in one pot",
    excerpt: "The dish that every West African country claims, none would let go, and all of them will defend at parties.",
    category: "Regional",
    readTime: 8,
    date: "Feb 2026",
  },
];

export default function BlogIndex() {
  return (
    <>
      <section className="bg-cream-warm border-b border-mist">
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <p className="recipe-meta mb-3">Journal</p>
          <h1
            className="font-display text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Stories from the source.
          </h1>
          <p className="mt-4 text-xl text-ink-soft max-w-2xl">
            Long-form on the heritage, technique, and culture behind the food.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Featured */}
          {articles[0] && (
          <article className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] bg-gradient-to-br from-cream-warm via-mist to-clay/10 rounded-xl flex items-center justify-center">
                <span className="text-8xl text-ink-soft/30">▣</span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="recipe-meta mb-3">{articles[0].category} · {articles[0].readTime} min read</p>
              <h2
                className="font-display text-3xl md:text-4xl text-ink leading-tight mb-4"
                style={{ fontVariationSettings: "'opsz' 144" }}
              >
                <Link href={`/blog/${articles[0].slug}`} className="hover:text-clay transition-colors">
                  {articles[0].title}
                </Link>
              </h2>
              <p className="text-ink-soft leading-relaxed mb-6">{articles[0].excerpt}</p>
              <Link
                href={`/blog/${articles[0].slug}`}
                className="inline-flex items-center gap-2 text-clay hover:text-clay-deep font-medium"
              >
                Read the story
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((a) => (
              <article key={a.slug} className="group">
                <Link href={`/blog/${a.slug}`}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-cream-warm to-mist rounded-xl flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
                    <span className="text-5xl text-ink-soft/30">▣</span>
                  </div>
                  <p className="recipe-meta mb-2">{a.category} · {a.readTime} min</p>
                  <h3
                    className="font-display text-2xl text-ink leading-snug mb-2 group-hover:text-clay transition-colors"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{a.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}