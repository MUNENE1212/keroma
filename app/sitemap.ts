import type { MetadataRoute } from "next";
import { recipes } from "@/lib/data/recipes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://keroma.ementech.co.ke";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/recipes`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/discover`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified, changeFrequency: "weekly", priority: 0.6 },
  ];

  const recipeRoutes: MetadataRoute.Sitemap = recipes.map((r) => ({
    url: `${base}/recipes/${r.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...recipeRoutes];
}