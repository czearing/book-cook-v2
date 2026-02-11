import { normalizeRecipeFilters } from "./recipes.filters";
import type { RecipeQueryFilters } from "./recipes.types";

export const recipeKeys = {
  all: ["recipes"] as const,
  gallery: (filters?: RecipeQueryFilters) =>
    [...recipeKeys.all, "gallery", normalizeRecipeFilters(filters)] as const,
  detail: (id: string | null | undefined) =>
    [...recipeKeys.all, "detail", id ?? ""] as const,
};
