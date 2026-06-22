import Link from "next/link";

export default function SavedPage() {
  return (
    <div className="container mx-auto px-6 lg:px-8 py-8">
      <h1
        className="font-display text-3xl md:text-4xl text-ink leading-tight mb-2"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        Saved recipes
      </h1>
      <p className="text-ink-soft mb-8">24 saved · 3 collections</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          "Pilau masala with chicken",
          "Jollof rice (the confederal one)",
          "Mafé (Senegalese groundnut stew)",
          "Injera with misir wat",
          "Suya (Nigerian street-grill)",
          "Bunny chow (Durban bean curry)",
          "Shakshuka, Tunisian way",
          "Chicken tagine with preserved lemon",
          "Akara (black-eyed pea fritters)",
          "Mafé (Senegalese groundnut stew)",
          "Kelewele (spiced fried plantain)",
          "Ugali with sukuma wiki",
        ].map((title, i) => (
          <Link key={i} href="/recipes" className="group">
            <div className="aspect-[4/3] bg-gradient-to-br from-cream-warm to-mist rounded-xl flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
              <span className="text-4xl text-ink-soft/30">▣</span>
            </div>
            <h3 className="font-display text-base text-ink leading-snug group-hover:text-clay transition-colors">{title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}