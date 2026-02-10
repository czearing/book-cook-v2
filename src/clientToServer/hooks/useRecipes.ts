import { useQuery } from "@tanstack/react-query";

import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import { fetchRecipeGallery } from "../queries/recipes.client";
import { recipeKeys } from "../queries/recipes.keys";

export const useRecipes = () => {
  return useQuery<Recipe[]>({
    queryKey: recipeKeys.gallery(),
    queryFn: fetchRecipeGallery,
  });
};
