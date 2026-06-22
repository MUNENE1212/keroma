export type Difficulty = "Easy" | "Medium" | "Hard";
export type Region =
  | "East Africa"
  | "West Africa"
  | "North Africa"
  | "Southern Africa"
  | "Horn of Africa"
  | "Central Africa";

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  have?: boolean;
}

export interface Step {
  order: number;
  title: string;
  instruction: string;
  duration?: number; // minutes
  timer?: number; // seconds for inline timer
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recipe {
  slug: string;
  title: string;
  region: Region;
  cuisine: string;
  totalTime: number; // minutes
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  excerpt: string;
  description: string;
  image?: string;
  ingredients: Ingredient[];
  steps: Step[];
  culturalContext: string;
  nutrition: Nutrition;
  tags: string[];
  occasion?: string;
  pairWith?: string;
}

import { seedRecipes } from "./recipes-seed";

export const recipes: Recipe[] = seedRecipes;