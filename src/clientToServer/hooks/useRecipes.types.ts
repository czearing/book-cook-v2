import type { RecipeQueryFilters } from "../queries/recipes.types";

export type UseRecipesOptions = {
  filters?: RecipeQueryFilters;
  enabled?: boolean;
};
