"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { X, ChefHat } from "lucide-react";

const STARTER = [
  "tomatoes", "onions", "garlic", "ginger", "rice", "oil", "salt",
  "eggs", "beans", "milk", "chicken", "leafy greens", "beef", "fish",
  "coconut milk", "peanut butter", "maize flour", "wheat flour", "okra",
  "plantain", "yams", "sweet potato", "carrots", "cabbage", "spinach",
];

export default function PantryPage() {
  const [items, setItems] = useState<string[]>([
    "tomatoes", "ginger", "rice", "coconut milk", "onions", "garlic", "oil", "eggs", "chicken", "leafy greens",
  ]);
  const [draft, setDraft] = useState("");

  const add = (text: string) => {
    const t = text.trim().toLowerCase();
    if (t && !items.includes(t)) setItems([...items, t]);
  };

  return (
    <div className="container mx-auto px-6 lg:px-8 py-8 max-w-3xl">
      <h1
        className="font-display text-3xl md:text-4xl text-ink leading-tight mb-2"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        Your pantry
      </h1>
      <p className="text-ink-soft mb-8">
        What you usually have around. The AI uses this to suggest recipes.
      </p>

      <div className="bg-cream-warm border border-mist rounded-xl p-5 mb-6">
        <div className="flex gap-2 mb-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                add(draft);
                setDraft("");
              }
            }}
            placeholder="Add an ingredient…"
            className="flex-1 h-12 px-4 rounded-md border border-mist bg-cream text-ink placeholder:text-ink-soft focus:outline-none focus:border-clay"
          />
          <Button
            onClick={() => {
              add(draft);
              setDraft("");
            }}
            variant="secondary"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-ink-soft">Quick add:</span>
          {STARTER.filter((s) => !items.includes(s)).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="px-2 py-0.5 rounded-full bg-bone hover:bg-mist transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-cream border border-mist rounded-xl overflow-hidden">
        <p className="px-5 py-3 text-sm text-ink-soft border-b border-mist">
          {items.length} ingredient{items.length === 1 ? "" : "s"}
        </p>
        <ul>
          {items.map((item, i) => (
            <li
              key={item}
              className="flex items-center justify-between px-5 py-3 border-b border-mist last:border-0 hover:bg-bone/40"
            >
              <span className="text-ink capitalize">{item}</span>
              <button
                type="button"
                onClick={() => setItems(items.filter((x) => x !== item))}
                aria-label={`Remove ${item}`}
                className="text-ink-soft hover:text-error transition-colors p-1"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <Button variant="ghost" onClick={() => setItems([])}>
          Clear all
        </Button>
        <Button href="/discover" variant="primary" leftIcon={<ChefHat className="w-4 h-4" />}>
          Cook with these
        </Button>
      </div>
    </div>
  );
}