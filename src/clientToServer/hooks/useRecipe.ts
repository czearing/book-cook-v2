import { useQuery } from "@tanstack/react-query";

import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import type { UseRecipeOptions } from "./useRecipe.types";
import { fetchRecipeById } from "../queries/recipes.client";
import { recipeKeys } from "../queries/recipes.keys";

export const useRecipe = (
  id: string | null | undefined,
  options?: UseRecipeOptions
) => {
  const shouldFetch = options?.enabled ?? !options?.initialData;

  return useQuery<Recipe | null>({
    queryKey: recipeKeys.detail(id),
    queryFn: () => fetchRecipeById(id ?? ""),
    enabled: Boolean(id) && shouldFetch,
    initialData: options?.initialData,
  });
};
