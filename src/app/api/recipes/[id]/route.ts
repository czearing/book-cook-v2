import { NextResponse } from "next/server";

import { fetchRecipeById } from "@/clientToServer/queries/recipes.server";
import type { RecipeRouteContext } from "./route.types";

export const GET = async (
  _request: Request,
  context: RecipeRouteContext
) => {
  const { id } = await context.params;
  const recipeId = (() => {
    try {
      return decodeURIComponent(id);
    } catch {
      return id;
    }
  })();

  const recipe = await fetchRecipeById(recipeId);

  if (!recipe) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
};
