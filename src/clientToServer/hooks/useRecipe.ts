import { useQuery } from "@tanstack/react-query";

import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import type { UseRecipeOptions } from "./useRecipe.types";
import { fetchRecipeById } from "../queries/recipes.client";
import { recipeKeys } from "../queries/recipes.keys";

export const useRecipe = (
  id: string | null | undefined,
  options?: UseRecipeOptions
) => {
  return useQuery<Recipe | null>({
    queryKey: recipeKeys.detail(id),
    queryFn: () => fetchRecipeById(id ?? ""),
    // Default to fetching even when `initialData` is provided so the UI
    // updates when a partial recipe (e.g. from a list query) is hydrated.
    enabled: Boolean(id) && (options?.enabled ?? true),
    initialData: options?.initialData,
  });
};
