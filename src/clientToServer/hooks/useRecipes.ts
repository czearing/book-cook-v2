import { useQuery } from "@tanstack/react-query";

import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import { fetchRecipeGallery } from "../queries/recipes.client";
import { recipeKeys } from "../queries/recipes.keys";
import type { UseRecipesOptions } from "./useRecipes.types";

export const useRecipes = (options?: UseRecipesOptions) => {
  return useQuery<Recipe[]>({
    queryKey: recipeKeys.gallery(options?.filters),
    queryFn: () => fetchRecipeGallery(options?.filters),
    enabled: options?.enabled ?? true,
  });
};
