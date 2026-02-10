import { NextResponse } from "next/server";

import { fetchRecipes } from "@/clientToServer/queries/recipes.server";
import { fromRecipeSearchParams } from "@/clientToServer/queries/recipes.filters";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const filters = fromRecipeSearchParams(searchParams);
  const recipes = await fetchRecipes(filters);
  return NextResponse.json(recipes);
};
