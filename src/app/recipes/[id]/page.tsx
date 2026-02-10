import { notFound } from "next/navigation";

import { RecipePageClient } from "./RecipePageClient";
import { fetchRecipeById } from "@/clientToServer/queries/recipes.server";
import type { RecipePageProps } from "./page.types";

export const dynamic = "force-dynamic";

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return <RecipePageClient id={id} initialRecipe={recipe} />;
}
