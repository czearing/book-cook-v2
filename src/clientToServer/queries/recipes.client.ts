import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import type { RecipeQueryFilters } from "./recipes.types";
import { toRecipeSearchParams } from "./recipes.filters";

export const fetchRecipeGallery = async (
  filters?: RecipeQueryFilters
): Promise<Recipe[]> => {
  const params = toRecipeSearchParams(filters);
  const query = params.toString();
  const url = query ? `/api/recipes?${query}` : "/api/recipes";
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch recipes.");
  }
  return response.json();
};

export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  const response = await fetch(`/api/recipes/${id}`, { cache: "no-store" });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch recipe.");
  }
  return response.json();
};
