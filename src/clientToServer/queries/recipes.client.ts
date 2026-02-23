import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import { toRecipeSearchParams } from "./recipes.filters";
import type { RecipeQueryFilters } from "./recipes.types";

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

export const updateRecipeData = async (
  id: string,
  fields: { data?: string; title?: string }
): Promise<void> => {
  const response = await fetch(`/api/recipes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!response.ok) {
    throw new Error("Failed to update recipe.");
  }
};

export const createRecipe = async (title: string): Promise<{ id: string }> => {
  const response = await fetch("/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error("Failed to create recipe.");
  }
  return response.json() as Promise<{ id: string }>;
};
