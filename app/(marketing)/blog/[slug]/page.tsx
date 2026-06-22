import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; category: string; readTime: number; date: string; body: string[] }> = {
  "jiko-stove-tells-time": {
    title: "The jiko: Kenya's stove that tells time",
    category: "Heritage",
    readTime: 6,
    date: "Mar 2026",
    body: [
      "The jiko is the cheapest stove in the world that actually cooks food. It's also one of the most precise.",
      "Ask anyone in a Kenyan kitchen what makes the jiko special, and they'll tell you the heat. Not the temperature — the heat. The way the charcoal sits in the ceramic sleeve, the way the air comes through the bottom grate, the way the flame licks the sufuria from underneath and not from the side. A jiko cooks the way Kenyan food was designed to cook: slow, from below, with smoke.",
      "There's a reason the sufuria is round-bottomed. The jiko's heat source is round too. The geometry is intentional: the heat rises straight up the curve of the pot, and the steam circulates back down. A flat-bottomed pot wastes that geometry. A jiko teaches its cook to use the right pot.",
      "The jiko also teaches time. There's no temperature dial. You learn to read the colour of the charcoal — black for slow, glowing for medium, ash-covered for low. You learn to listen: the sizzle when water hits the sufuria, the pop when onions hit the oil, the long quiet simmer. A cook who grew up with a jiko carries that knowledge forever. A gas stove doesn't teach anything.",
      "The jiko is not a transitional technology waiting to be replaced. It is its own technology. It cooks ugali better than gas, because ugali needs slow, even, sustained heat from below. It cooks sukuma wiki better than gas, because the greens benefit from the smoke. It cooks chai better than anything, because the smokiness becomes part of the tea.",
      "The jiko tells time. The jiko tells the cook when the onions are ready. The jiko tells the cook when the oil is hot enough. The jiko tells the cook when the meal is done. It does this not through displays and timers but through the cook's attention — a relationship the modern kitchen has been designed to remove.",
      "When we write recipes on KEROMA, we write them for the jiko. Because that's where they were developed. That's where the technique makes sense. That's where the food tastes the way it was meant to taste.",
    ],
  },
  "berbere-spice-routes": {
    title: "Berbere and the spice routes",
    category: "Spice",
    readTime: 9,
    date: "Mar 2026",
    body: [
      "Berbere is the spice blend that defines Ethiopian and Eritrean cooking. It's also a 1,000-year-old receipt for the spice trade.",
      "The base is chili — usually a mix of dried cayenne and a milder variety like mitmita. Then come the aromatics: fenugreek, coriander, cumin, cardamom, cinnamon, cloves, nutmeg, allspice. The blend is toasted, ground, and held in every Ethiopian kitchen like a family heirloom, because it is.",
      "But here's the thing: those spices didn't originate in Ethiopia. Cardamom came from the Indian subcontinent. Cinnamon from Sri Lanka. Cloves from the Maluku Islands. Nutmeg from the Banda Islands. They arrived in the Horn of Africa because the Aksumite Empire, then the Solomonic dynasty, then the trading cities of the Red Sea coast, were positioned to receive them.",
      "By the time the Portuguese rounded the Cape in 1498, the Ethiopian spice trade was already a thousand years old. The Portuguese tried to monopolise the trade and were politely but firmly shown the door. The trade continued as it had — through Indian Ocean merchants, Red Sea dhows, caravan routes from Harar to the coast.",
      "Berbere is what those spices became when they were combined. The proportions vary by household: some use more fenugreek, some more cardamom, some add ginger, some don't. But the structural fact — chili plus warm aromatics — is the same.",
      "When you use berbere, you are cooking with the spice routes. The heat of the chili is a record of a thousand summers. The warmth of the cardamom is the record of a thousand sails. The earthiness of the fenugreek is a record of a thousand meals.",
      "It deserves to be toasted before use. The bloom of aroma when the spices hit the oil is one of the great smells in cooking.",
    ],
  },
  "ugali-backbone": {
    title: "Ugali: the backbone of a continent's tables",
    category: "Staples",
    readTime: 7,
    date: "Feb 2026",
    body: [
      "Ugali is the food of East Africa. It's the food of most East Africans. It's also a quiet kind of food — no strong flavours, no real presentation, no story. The story is that it feeds people.",
      "Maize arrived in East Africa from the Americas in the 16th century, carried by Portuguese traders. By the 19th century it had displaced millet and sorghum as the staple of the highland diets. The shift happened because maize yielded more per acre, but also because ugali was easier to cook and stored better.",
      "Ugali is a stiff porridge: maize flour stirred into boiling water until it forms a ball. The technique is harder than it looks. The cook has to know when to add the flour (gradually), how vigorously to stir (constantly), and when to stop (when it pulls cleanly from the sides).",
      "You eat ugali with your right hand. You tear a piece, make a small indentation with your thumb, and use it to scoop. The accompaniments — sukuma wiki, a stew, fish, beans, anything — go in the indentation.",
      "Ugali doesn't compete with the stew. It's the bread and the plate and the utensil, all in one. It costs almost nothing. It fills a person up. It carries the flavour of whatever it's eaten with.",
      "The same dish appears across the continent under different names: sadza in Zimbabwe, pap in South Africa, nsima in Malawi, fufu in West Africa (made with cassava, not maize, but the technique is the same). The variations are small. The role is the same: a steady starch backbone that lets the vegetables and proteins shine.",
      "In a year of good harvest, ugali is plentiful. In a year of bad harvest, ugali is rationed. Either way, it's there. Every meal. Every day. That's not a small thing.",
    ],
  },
  "jollof-confederacy": {
    title: "West African jollof: a confederacy in one pot",
    category: "Regional",
    readTime: 8,
    date: "Feb 2026",
    body: [
      "There is no dish in West Africa that is as loved, as argued about, and as honestly shared as jollof rice.",
      "Every country in the region makes it. Every country has a different name for it. Every country is convinced theirs is best. The arguments about which country's jollof is best are not arguments; they are the way the region talks about itself.",
      "Nigerian jollof tends to be tomato-forward, often made with red bell peppers for depth, often party-style (the rice is the centre of the table, the stews are sidekicks). Ghanaian jollof tends to be tomato-forward too, but with a slower reduction and a more delicate rice. Senegalese thieboudienne (the dish from which jollof descends) is a complete meal — fish, rice, vegetables — all cooked in one pot.",
      "The technique is shared: a base of tomato, pepper, onion, garlic, ginger, reduced until the oil separates. The rice is added, the stock goes in, the lid goes on, and the rice steams in its own flavour. Every variation is correct. Every variation is the right one.",
      "When the dish was brought to the Caribbean by enslaved West Africans, it became a different dish in every country — Jamaican rice and peas, Trinidad pelau, Haitian diri ak djon djon — but the technique is recognisable. The diaspora carries the recipe and the debate.",
      "The jollof wars are a love letter. They are the region telling itself it matters. The fact that you can get angry about jollof in Lagos and Accra and Abuja and Freetown is proof that the dish has brought you together enough that you have opinions.",
      "That's the work of jollof. It's not to be the best. It's to be a common table.",
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="bg-cream">
      <header className="bg-cream-warm border-b border-mist">
        <div className="container mx-auto px-6 lg:px-8 py-16 max-w-3xl">
          <p className="recipe-meta mb-4">
            {post.category} · {post.readTime} min read · {post.date}
          </p>
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {post.title}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-6 lg:px-8 max-w-3xl py-16">
        <div className="space-y-6 text-ink leading-relaxed" style={{ fontSize: "1.0625rem", lineHeight: "1.7" }}>
          {post.body.map((p, i) => (
            <p key={i} className={i === 0 ? "first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-clay" : ""}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-mist flex items-center justify-between">
          <Link href="/blog" className="text-clay hover:text-clay-deep font-medium">
            ← All stories
          </Link>
          <p className="text-sm text-ink-soft italic">— The KEROMA team</p>
        </div>
      </div>
    </article>
  );
}