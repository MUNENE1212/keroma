/**
 * Recipe generation with multi-provider fallback + mock for offline dev.
 *
 * Provider order: Z.ai → Anthropic → OpenAI → Google → mock
 *  - Z.ai: GLM-4.6 / GLM-5 / GLM-5.1 (OpenAI-compatible chat completions,
 *    streamed via SSE — the `/api/coding/paas/v4` endpoint hangs on non-streaming)
 *  - Anthropic, OpenAI, Google: stubbed (returns 501) until Vercel AI SDK is wired
 *
 * Output: Zod-validated JSON matching the RecipesResponseSchema.
 */

import { RECIPE_FROM_PANTRY } from "./prompts";
import { RecipesResponseSchema, type ValidatedRecipe, type ValidatedRecipes } from "./schemas";
import {
  hasAnyProvider,
  isMockMode,
  resolveProviderOrder,
  ZAI_BASE_URL,
  ZAI_DEFAULT_MODEL,
  type AIProviderName,
} from "./providers";

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

/* ------------------------------------------------------------------ */
/* Mock generator (offline dev / no keys / KEROMA_AI_MOCK=true)       */
/* ------------------------------------------------------------------ */

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
        { order: 2, title: "Soften the aromatics", instruction: "Add onion, garlic, ginger. Cook until soft.", duration: 5, timer: 300 },
        { order: 3, title: "Build the base", instruction: `Add ${ingredients[0] || "tomatoes"}. Cook 3-4 minutes.`, duration: 4 },
        { order: 4, title: "Add rice + coconut milk", instruction: "Stir in rice. Pour coconut milk and 1.5 cups water. Salt. Bring to a boil.", duration: 3 },
        { order: 5, title: "Steam", instruction: "Cover tightly. Reduce heat to lowest. 18 minutes without lifting.", duration: 18, timer: 1080 },
        { order: 6, title: "Rest + serve", instruction: "Off heat. Rest 5 minutes. Fluff with a fork.", duration: 5 },
      ],
      culturalContext: "Pilau on the Swahili coast was shaped by trade — cardamom and cinnamon from the Indian Ocean, technique from Persia and the Arab world, the chicken local. This weeknight version keeps the soul and skips the fuss.",
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
        { order: 1, title: "Sauté", instruction: "Sauté onion 5 min. Add spices, 1 min.", duration: 6 },
        { order: 2, title: "Add tomatoes", instruction: "Cook down 5 min.", duration: 5 },
        { order: 3, title: "Simmer", instruction: "Add beans and 1 cup water. 15 min.", duration: 15, timer: 900 },
        { order: 4, title: "Wilt the greens", instruction: "Add greens. Stir until wilted. Salt to taste.", duration: 2 },
      ],
      culturalContext: "Beans and greens appear across East Africa in different forms — with coconut, with peanut, with onion and tomato. The common thread is patience: let the beans simmer long enough that they take on the flavour of the stock.",
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
      description: "When you have almost nothing, this is the recipe. Eggs in a ginger-tomato sauce, eaten with whatever starch you have.",
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
        { order: 1, title: "Build the base", instruction: "Sauté onion, garlic, ginger 5 min. Add tomatoes and turmeric. Cook 8 min.", duration: 13 },
        { order: 2, title: "Eggs", instruction: "Make 4 wells. Crack an egg into each. Cover. Cook 6-8 min.", duration: 7, timer: 420 },
      ],
      culturalContext: "Egg curry is the cook's honest friend. Every East African coast has a version. The ginger is what makes it not just eggs-in-tomato — it lifts the whole dish from breakfast to dinner.",
      tags: ["eggs", "quick", "vegetarian", "budget"],
    },
  ];

  return { recipes };
}

/* ------------------------------------------------------------------ */
/* Z.ai provider (OpenAI-compatible chat completions)                  */
/* ------------------------------------------------------------------ */

interface ZAIChatResponse {
  choices: Array<{
    message?: { content: string; role: string };
    delta?: { content?: string; reasoning_content?: string; role?: string };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

function buildPrompt(opts: GenerateOptions): string {
  const parts: string[] = [];
  parts.push(`Pantry ingredients: ${opts.ingredients.join(", ")}`);
  if (opts.dietary?.length) parts.push(`Dietary preferences: ${opts.dietary.join(", ")}`);
  if (opts.hunger) parts.push(`Hunger level: ${opts.hunger} (servings: ${HUNGER_TO_SERVINGS[opts.hunger]})`);
  if (opts.servings) parts.push(`Servings: ${opts.servings}`);
  parts.push(
    "\nReturn JSON only, no prose. Match the schema exactly. Use real African culinary vocabulary (jiko, sufuria, ugali, matoke, berbere, nsima, injera, attiéké) when appropriate — without explaining those terms."
  );
  return parts.join("\n");
}

function extractJsonObject(text: string): unknown {
  // Strip ```json fences and any leading prose, return the first JSON object.
  const trimmed = text.trim();

  // Try fenced ```json ... ``` first
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]+?)\s*```/i);
  if (fenced && fenced[1]) {
    try {
      return JSON.parse(fenced[1]);
    } catch {
      /* fall through */
    }
  }

  // Try to grab from first { to last }
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) {
    const slice = trimmed.slice(start, end + 1);
    try {
      return JSON.parse(slice);
    } catch (e) {
      throw new Error(`Could not parse JSON from provider output: ${(e as Error).message}`);
    }
  }
  throw new Error("Provider output did not contain a JSON object");
}

/**
 * Parse an SSE stream from Z.ai into aggregated `content` (skipping reasoning_content).
 * Returns null if no recognizable chunks arrived.
 */
async function readZaiStream(res: Response): Promise<string | null> {
  if (!res.body) return null;
  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let aggregated = "";
  let sawAny = false;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    sawAny = true;
    buffer += decoder.decode(value, { stream: true });

    // SSE: events separated by \n\n, lines start with `data: `
    let idx: number;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const event = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      for (const line of event.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]" || payload === "") continue;
        try {
          const chunk = JSON.parse(payload) as ZAIChatResponse;
          const delta = chunk.choices?.[0]?.delta;
          if (!delta) continue;
          // Aggregate only the final answer content — skip chain-of-thought reasoning.
          if (typeof delta.content === "string" && delta.content.length > 0) {
            aggregated += delta.content;
          }
        } catch {
          // Skip malformed chunk; continue reading.
        }
      }
    }
  }

  if (!sawAny) return null;
  return aggregated.length > 0 ? aggregated : null;
}

async function generateWithZAI(opts: GenerateOptions): Promise<ValidatedRecipes> {
  const apiKey = process.env.ZAI_API_KEY;
  if (!apiKey) throw new Error("ZAI_API_KEY not set");

  const model = process.env.ZAI_MODEL || ZAI_DEFAULT_MODEL;

  // Z.ai `/api/coding/paas/v4` requires `stream: true` — non-streaming requests hang.
  // Aggregating SSE chunks gives the same final result.
  // `thinking: { type: "disabled" }` skips the chain-of-thought phase, cutting latency ~33%.
  const body = {
    model,
    stream: true,
    thinking: { type: "disabled" },
    messages: [
      { role: "system", content: RECIPE_FROM_PANTRY },
      { role: "user", content: buildPrompt(opts) },
    ],
    temperature: 0.7,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  };

  const res = await fetch(`${ZAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    // 120s ceiling — GLM-4.6 emits reasoning_content before content; recipe prompts are large
    signal: AbortSignal.timeout(120_000),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Z.ai returned ${res.status}: ${text.slice(0, 200)}`);
  }

  const aggregated = await readZaiStream(res);
  if (!aggregated) throw new Error("Z.ai stream returned no content");

  const parsed = extractJsonObject(aggregated);
  const validated = RecipesResponseSchema.safeParse(parsed);
  if (!validated.success) {
    throw new Error(`Z.ai output failed validation: ${validated.error.message.slice(0, 200)}`);
  }
  return validated.data;
}

/* ------------------------------------------------------------------ */
/* Provider dispatcher                                                  */
/* ------------------------------------------------------------------ */

async function dispatch(provider: AIProviderName, opts: GenerateOptions): Promise<ValidatedRecipes> {
  switch (provider) {
    case "zai":
      return generateWithZAI(opts);
    case "anthropic":
    case "openai":
    case "google": {
      const cap = provider[0]?.toUpperCase() + provider.slice(1);
      throw new Error(
        `Provider ${provider} not yet wired in this build. Set ZAI_API_KEY and unset ${provider.toUpperCase()}_API_KEY to skip, or implement generateWith${cap} in lib/ai/index.ts.`
      );
    }
    case "mock":
      return mockGenerate(opts);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export async function generateRecipes(opts: GenerateOptions): Promise<GenerateResult> {
  if (opts.ingredients.length === 0) {
    return { ok: false, fallbackUsed: false, error: "At least one ingredient is required" };
  }

  // Hard mock bypass — explicit dev/test flag
  if (isMockMode()) {
    const data = mockGenerate(opts);
    return { ok: true, data, provider: "mock", fallbackUsed: false };
  }

  // No keys at all → mock as final fallback so the UI keeps working
  if (!hasAnyProvider()) {
    const data = mockGenerate(opts);
    return { ok: true, data, provider: "mock", fallbackUsed: false };
  }

  // Walk the fallback chain
  const order = resolveProviderOrder(opts.preferredProvider);
  let lastError: string | undefined;

  for (const provider of order) {
    try {
      const data = await dispatch(provider, opts);
      return {
        ok: true,
        data,
        provider,
        fallbackUsed: provider !== order[0],
      };
    } catch (e) {
      const err = e as Error;
      lastError = err?.message ?? String(e);
      // Try the next provider
      continue;
    }
  }

  // Every provider failed → fall back to mock so the UI still produces something
  const data = mockGenerate(opts);
  return {
    ok: true,
    data,
    provider: "mock",
    fallbackUsed: true,
    error: lastError ? `All providers failed (${lastError}) — using mock` : undefined,
  };
}

// Re-export schemas and prompt for the API route
export { RecipesResponseSchema };
export type { ValidatedRecipe, ValidatedRecipes };