import { NextResponse } from "next/server";

import { fetchRecipes } from "@/clientToServer/queries/recipes.server";

export const GET = async () => {
  const recipes = await fetchRecipes();
  return NextResponse.json(recipes);
};
