"use client";

import { useRecipe } from "@/clientToServer/hooks/useRecipe";
import { RecipeEditor } from "./RecipeEditor";
import type { RecipePageClientProps } from "./RecipePageClient.types";

export const RecipePageClient = ({
  id,
  initialRecipe,
}: RecipePageClientProps) => {
  const { data: recipe, isLoading } = useRecipe(id, {
    initialData: initialRecipe,
  });

  if (isLoading && !recipe) {
    return null;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return <RecipeEditor recipe={recipe} />;
};
