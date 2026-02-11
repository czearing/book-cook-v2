import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import type { UseRecipesOptions } from "./useRecipes.types";
import { fetchRecipeGallery } from "../queries/recipes.client";
import { recipeKeys } from "../queries/recipes.keys";

export const useRecipes = (options?: UseRecipesOptions) => {
  // Ignore any paging filters the caller may pass; this hook owns pagination.
  const {
    limit: _ignoredLimit,
    offset: _ignoredOffset,
    ...filters
  } = options?.filters ?? {};

  const pageSize = 48;

  const query = useInfiniteQuery<Recipe[]>({
    queryKey: [...recipeKeys.gallery(filters), pageSize] as const,
    queryFn: ({ pageParam }) => {
      const offset = typeof pageParam === "number" ? pageParam : 0;
      return fetchRecipeGallery({ ...filters, limit: pageSize, offset });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const lastOffset = typeof lastPageParam === "number" ? lastPageParam : 0;
      return lastPage.length < pageSize
        ? undefined
        : lastOffset + lastPage.length;
    },
    enabled: options?.enabled ?? true,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  const recipes = useMemo(
    () => query.data?.pages.flat() ?? [],
    [query.data?.pages],
  );

  return { ...query, recipes };
};
