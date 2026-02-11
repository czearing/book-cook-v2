import { fetchRecipeById } from "@/clientToServer/queries/recipes.server";
import type { RecipePageProps } from "./page.types";
import { RecipePageClient } from "./RecipePageClient";

export const dynamic = "force-dynamic";

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipeId = (() => {
    try {
      return decodeURIComponent(id);
    } catch {
      return id;
    }
  })();
  const recipe = await fetchRecipeById(recipeId);

  // Private app route: prefer rendering a "not found" state over returning a 404,
  // to avoid hard navigation failures when data is missing or still importing.
  return <RecipePageClient id={recipeId} initialRecipe={recipe} />;
}
