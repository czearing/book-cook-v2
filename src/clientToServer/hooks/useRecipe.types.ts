import type { Recipe } from "@/components/RecipeView/RecipeView.types";

export type UseRecipeOptions = {
  initialData?: Recipe | null;
  enabled?: boolean;
};
