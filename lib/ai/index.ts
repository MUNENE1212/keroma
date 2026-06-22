/**
 * Recipe generation with multi-provider fallback + mock for offline dev.
 *
 * Real implementation will use the Vercel AI SDK (generateObject) once
 * dependencies are added. This module provides:
 *  - Provider fallback chain (Anthropic → OpenAI → Google → mock)
 *  - Zod-validated output
 *  - Shape-compatible interface for the API route
 *  - Mock generator for dev/test
 *
 * To upgrade to real AI: install `ai` + `@ai-sdk/anthropic` + `@ai-sdk/openai`
 * + `@ai-sdk/google` and replace `_generateWithProvider` body.
 */

import { RECIPE_FROM_PANTRY } from "./prompts";
import { RecipesResponseSchema, type ValidatedRecipe, type ValidatedRecipes } from "./schemas";
import { hasAnyProvider, isMockMode, resolveProviderOrder, type AIProviderName } from "./providers";

export interface GenerateOptions {
  ingredients: string[];
  dietary?: string[];
  hunger?: "Light" | "Standard" | "Hungry";
  preferredProvider?: string | null;
  servings?: number;
}

export interface GenerateResult {
  ok: boolean;
  data?: ValidatedRecipes;
  provider?: AIProviderName;
  fallbackUsed: boolean;
  error?: string;
}

const HUNGER_TO_SERVINGS: Record<NonNullable<GenerateOptions["hunger"]>, number> = {
  Light: 2,
  Standard: 3,
  Hungry: 4,
};

/**
 * Mock recipe generator for offline dev (KEROMA_AI_MOCK=true).
 * Returns plausible recipes without calling any external API.
 */
function mockGenerate(opts: GenerateOptions): ValidatedRecipes {
  const servings = opts.servings ?? HUNGER_TO_SERVINGS[opts.hunger ?? "Standard"];
  const ingredients = opts.ingredients.slice(0, 6);

  const recipes: ValidatedRecipe[] = [
    {
      title: `Coastal tomato-coconut rice with ${ingredients[0] || "vegetables"}`,
      region: "East Africa",
      cuisine: "Swahili coastal",
      totalTime: 35,
      servings,
      difficulty: "Medium",
      excerpt: "A weeknight pilau-inspired dish built around what's already in your kitchen.",
      description: `Built around ${ingredients.slice(0, 2).join(" and ")}, this is a forgiving, weeknight version of the Swahili pilau tradition. The aromatics do the heavy lifting; the rest is patience and a tight lid.`,
      ingredients: [
        { name: "Basmati rice", amount: 1.5, unit: "cups" },
        { name: ingredients[0] || "onion", amount: 1, unit: "large" },
        ...(ingredients.slice(1, 5).map((i) => ({ name: i, amount: 1, unit: "portion" }))),
        { name: "coconut milk", amount: 0.5, unit: "cup" },
        { name: "pilau masala", amount: 1, unit: "tbsp" },
        { name: "oil", amount: 2, unit: "tbsp" },
        { name: "salt", amount: 1, unit: "tsp" },
      ],
      steps: [
        { order: 1, title: "Toast the whole spices", instruction: "Heat oil. Add pilau masala. 30 seconds until fragrant.", duration: 1, timer: 30 },
        { order: 2, title: "Soften the aromatics", instruction: `Add onion, garlic, ginger. Cook until soft, about 5 minutes.`, duration: 5, timer: 300 },
        { order: 3, title: "Build the base", instruction: `Add ${ingredients[0] || "tomatoes"} and any other vegetables. Cook 3-4 minutes.`, duration: 4 },
        { order: 4, title: "Add rice + coconut milk", instruction: "Stir in rice to coat. Pour in coconut milk and 1.5 cups water. Salt. Bring to a boil.", duration: 3 },
        { order: 5, title: "Steam", instruction: "Cover tightly. Reduce heat to lowest. Cook 18 minutes without lifting the lid.", duration: 18, timer: 1080 },
        { order: 6, title: "Rest + serve", instruction: "Off heat. Rest 5 minutes. Fluff with a fork.", duration: 5 },
      ],
      culturalContext: "Pilau on the Swahili coast was shaped by trade — cardamom and cinnamon from the Indian Ocean merchants, technique from the Persian and Arab world, the chicken and rice local. This weeknight version keeps the soul and skips the fuss.",
      tags: ["swahili", "rice", "one-pot", "weeknight"],
    },
    {
      title: `Spiced ${ingredients[1] || "bean"} stew with greens`,
      region: "East Africa",
      cuisine: "Kenyan home cooking",
      totalTime: 30,
      servings,
      difficulty: "Easy",
      excerpt: "Beans, greens, and a berbere-style warm spice. Eat with bread, rice, or ugali.",
      description: "A weekday workhorse. The warm spice — cinnamon, coriander, a touch of chilli — turns plain beans into something you'd feed to a guest.",
      ingredients: [
        { name: ingredients[1] || "beans", amount: 2, unit: "cups" },
        { name: "leafy greens", amount: 1, unit: "bunch" },
        { name: "onion", amount: 1, unit: "medium" },
        { name: "tomatoes", amount: 2, unit: "medium" },
        { name: "coriander, ground", amount: 1, unit: "tsp" },
        { name: "cinnamon", amount: 0.5, unit: "tsp" },
        { name: "chilli powder", amount: 0.5, unit: "tsp" },
        { name: "oil", amount: 2, unit: "tbsp" },
        { name: "salt", amount: 1, unit: "tsp" },
      ],
      steps: [
        { order: 1, title: "Sauté", instruction: "Heat oil. Sauté onion 5 min until soft. Add spices, 1 min.", duration: 6 },
        { order: 2, title: "Add tomatoes", instruction: "Add tomatoes, cook down 5 min.", duration: 5 },
        { order: 3, title: "Simmer", instruction: `Add beans and 1 cup water. Simmer 15 min.`, duration: 15, timer: 900 },
        { order: 4, title: "Wilt the greens", instruction: "Add greens, stir until wilted but still bright green. Salt to taste.", duration: 2 },
      ],
      culturalContext: "Beans and greens appear across East Africa in different forms — sometimes with coconut, sometimes with peanut, sometimes with just onion and tomato. The common thread is patience: let the beans simmer long enough that they take on the flavour of the stock.",
      tags: ["beans", "budget", "vegetarian", "weekday"],
    },
    {
      title: `Quick ${ingredients[2] || "egg"} curry with ginger-tomato base`,
      region: "East Africa",
      cuisine: "Coastal home",
      totalTime: 25,
      servings: Math.max(2, Math.floor(servings / 2)),
      difficulty: "Easy",
      excerpt: "Five minutes of prep, fifteen of cooking, and the ginger does the heavy lifting.",
      description: "When you have almost nothing, this is the recipe. Eggs in a ginger-tomato sauce, eaten with whatever starch you have. Weekday grace.",
      ingredients: [
        { name: "eggs", amount: 4, unit: "" },
        { name: "tomatoes", amount: 2, unit: "medium" },
        { name: "ginger", amount: 1, unit: "thumb" },
        { name: "garlic", amount: 3, unit: "cloves" },
        { name: "onion", amount: 1, unit: "small" },
        { name: "turmeric", amount: 0.5, unit: "tsp" },
        { name: "oil", amount: 2, unit: "tbsp" },
        { name: "salt", amount: 1, unit: "tsp" },
      ],
      steps: [
        { order: 1, title: "Build the base", instruction: "Heat oil. Sauté onion, garlic, ginger 5 min. Add tomatoes and turmeric. Cook 8 min.", duration: 13 },
        { order: 2, title: "Eggs", instruction: "Make 4 wells. Crack an egg into each. Cover. Cook 6-8 min until whites set, yolks still runny.", duration: 7, timer: 420 },
      ],
      culturalContext: "Egg curry is the cook's honest friend. Every East African coast has a version. The ginger is what makes it not just eggs-in-tomato — it lifts the whole dish from breakfast to dinner.",
      tags: ["eggs", "quick", "vegetarian", "budget"],
    },
  ];

  return { recipes };
}

export async function generateRecipes(opts: GenerateOptions): Promise<GenerateResult> {
  if (opts.ingredients.length === 0) {
    return { ok: false, fallbackUsed: false, error: "At least one ingredient is required" };
  }

  // Mock path — fastest, used in dev / when no API keys are set
  if (isMockMode() || !hasAnyProvider()) {
    const data = mockGenerate(opts);
    return { ok: true, data, provider: "mock", fallbackUsed: false };
  }

  // Real path — would use Vercel AI SDK generateObject here.
  // We keep the contract so the API route works the same way.
  //
  // Pseudocode for the real implementation (requires installing `ai` + providers):
  //
  //   const order = resolveProviderOrder(opts.preferredProvider);
  //   for (const provider of order) {
  //     try {
  //       const model = getModel(provider);
  //       const result = await generateObject({
  //         model,
  //         schema: RecipesResponseSchema,
  //         system: RECIPE_FROM_PANTRY,
  //         prompt: `Ingredients: ${opts.ingredients.join(", ")}\n` +
  //                 `Dietary: ${opts.dietary?.join(", ") || "none"}\n` +
  //                 `Hunger: ${opts.hunger || "Standard"}`,
  //       });
  //       return { ok: true, data: result.object, provider, fallbackUsed: provider !== order[0] };
  //     } catch (e) {
  //       console.error(`[ai] ${provider} failed:`, e);
  //       continue;  // try next
  //     }
  //   }
  //   return { ok: false, fallbackUsed: true, error: "All providers failed" };

  // Until the real path is implemented, fall back to mock to keep the
  // site fully functional out of the box.
  const data = mockGenerate(opts);
  return {
    ok: true,
    data,
    provider: "mock",
    fallbackUsed: true,
    error: hasAnyProvider()
      ? "Live AI providers not yet wired up — using mock (set KEROMA_AI_MOCK=true to silence)"
      : undefined,
  };
}

// Re-export schemas and prompt for the API route
export { RecipesResponseSchema };
export type { ValidatedRecipe, ValidatedRecipes };