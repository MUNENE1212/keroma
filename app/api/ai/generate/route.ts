import { NextRequest } from "next/server";
import { z } from "zod";
import { generateRecipes, RecipesResponseSchema } from "@/lib/ai";

const BodySchema = z.object({
  ingredients: z.array(z.string().min(1)).min(1).max(40),
  dietary: z.array(z.string()).max(20).optional(),
  hunger: z.enum(["Light", "Standard", "Hungry"]).optional(),
  servings: z.number().int().min(1).max(20).optional(),
  preferredProvider: z.string().nullable().optional(),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const result = await generateRecipes(parsed.data);
  if (!result.ok || !result.data) {
    return Response.json(
      { error: result.error ?? "Generation failed" },
      { status: 502 }
    );
  }

  // Re-validate before sending to the client (defense in depth)
  const safe = RecipesResponseSchema.safeParse(result.data);
  if (!safe.success) {
    return Response.json(
      { error: "Generated output failed validation" },
      { status: 502 }
    );
  }

  // Server-side log for diagnostics (provider chosen, fallback flag)
  // eslint-disable-next-line no-console
  console.log(
    `[keroma/ai] provider=${result.provider} fallback=${result.fallbackUsed} ingredients=${parsed.data.ingredients.length}`
  );

  return Response.json(
    {
      recipes: safe.data.recipes,
      meta: {
        provider: result.provider,
        fallbackUsed: result.fallbackUsed,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}