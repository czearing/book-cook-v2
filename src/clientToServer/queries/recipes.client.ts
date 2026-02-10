import type { Recipe } from "@/components/RecipeView/RecipeView.types";

export const fetchRecipeGallery = async (): Promise<Recipe[]> => {
  const response = await fetch("/api/recipes", { cache: "no-store" });
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
