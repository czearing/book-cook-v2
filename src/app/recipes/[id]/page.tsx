import { notFound } from "next/navigation";

import { RecipeEditor } from "./RecipeEditor";
import { getRecipeById, recipeGalleryRecipes } from "../recipeData";
import type { RecipePageProps } from "./page.types";

export const dynamicParams = false;

export const generateStaticParams = () =>
  recipeGalleryRecipes.map((recipe) => ({ id: recipe._id }));

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return <RecipeEditor recipe={recipe} />;
}
