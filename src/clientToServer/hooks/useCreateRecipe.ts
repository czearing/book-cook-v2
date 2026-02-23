import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { createRecipe } from "../queries/recipes.client";
import { recipeKeys } from "../queries/recipes.keys";

export function useCreateRecipe(): UseMutationResult<
  { id: string },
  Error,
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => createRecipe(title),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: recipeKeys.gallery() });
    },
  });
}
