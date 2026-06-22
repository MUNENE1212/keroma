/**
 * AI provider configuration for KEROMA.
 * Multi-provider fallback: Anthropic (primary) → OpenAI → Google.
 * Respects KEROMA_AI_MOCK=true for offline dev.
 */

export type AIProviderName = "anthropic" | "openai" | "google" | "mock";

export function resolveProviderOrder(preferred?: string | null): AIProviderName[] {
  const order: AIProviderName[] = [];
  if (preferred === "anthropic" || preferred === "openai" || preferred === "google") {
    order.push(preferred);
  }
  if (process.env.ANTHROPIC_API_KEY) order.push("anthropic");
  if (process.env.OPENAI_API_KEY) order.push("openai");
  if (process.env.GOOGLE_GENERATIVE_AI_KEY) order.push("google");
  order.push("mock");
  return Array.from(new Set(order));
}

export function hasAnyProvider(): boolean {
  return Boolean(
    process.env.ANTHROPIC_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_KEY
  );
}

export const isMockMode = (): boolean => process.env.KEROMA_AI_MOCK === "true";