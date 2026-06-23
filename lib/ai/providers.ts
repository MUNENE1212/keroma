/**
 * AI provider configuration for KEROMA.
 * Multi-provider fallback: Z.ai → Anthropic → OpenAI → Google.
 * Respects KEROMA_AI_MOCK=true for offline dev.
 */

export type AIProviderName = "zai" | "anthropic" | "openai" | "google" | "mock";

export const ZAI_BASE_URL = "https://api.z.ai/api/coding/paas/v4";
export const ZAI_DEFAULT_MODEL = "glm-4.6";
/** Other GLM options: "glm-4.5", "glm-4.5-air", "glm-5", "glm-5-turbo", "glm-5.1" */

export function resolveProviderOrder(preferred?: string | null): AIProviderName[] {
  const order: AIProviderName[] = [];
  if (
    preferred === "zai" ||
    preferred === "anthropic" ||
    preferred === "openai" ||
    preferred === "google"
  ) {
    order.push(preferred);
  }
  if (process.env.ZAI_API_KEY) order.push("zai");
  if (process.env.ANTHROPIC_API_KEY) order.push("anthropic");
  if (process.env.OPENAI_API_KEY) order.push("openai");
  if (process.env.GOOGLE_GENERATIVE_AI_KEY) order.push("google");
  order.push("mock");
  return Array.from(new Set(order));
}

export function hasAnyProvider(): boolean {
  return Boolean(
    process.env.ZAI_API_KEY ||
      process.env.ANTHROPIC_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_KEY
  );
}

export const isMockMode = (): boolean => process.env.KEROMA_AI_MOCK === "true";