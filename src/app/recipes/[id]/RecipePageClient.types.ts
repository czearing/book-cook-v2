import type { Recipe } from "@/components/RecipeView/RecipeView.types";

export type RecipePageClientProps = {
  id: string;
  initialRecipe: Recipe;
};
