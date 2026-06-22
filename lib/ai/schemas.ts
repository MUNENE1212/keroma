import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1),
  amount: z.number().positive(),
  unit: z.string(),
});

export const StepSchema = z.object({
  order: z.number().int().positive(),
  title: z.string().min(1).max(80),
  instruction: z.string().min(1).max(800),
  duration: z.number().positive().optional(),
  timer: z.number().int().nonnegative().optional(),
});

export const NutritionSchema = z.object({
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  fiber: z.number().nonnegative(),
});

export const RecipeSchema = z.object({
  title: z.string().min(2).max(100),
  region: z.enum([
    "East Africa",
    "West Africa",
    "North Africa",
    "Southern Africa",
    "Horn of Africa",
    "Central Africa",
  ]),
  cuisine: z.string().min(2).max(80),
  totalTime: z.number().int().positive(),
  servings: z.number().int().positive(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  excerpt: z.string().min(20).max(280),
  description: z.string().min(50).max(800),
  ingredients: z.array(IngredientSchema).min(2).max(30),
  steps: z.array(StepSchema).min(2).max(20),
  culturalContext: z.string().min(50).max(800),
  tags: z.array(z.string()).max(10),
});

export const RecipesResponseSchema = z.object({
  recipes: z.array(RecipeSchema).min(1).max(3),
});

export type ValidatedRecipe = z.infer<typeof RecipeSchema>;
export type ValidatedRecipes = z.infer<typeof RecipesResponseSchema>;