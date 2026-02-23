import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateRecipeData } from "../queries/recipes.client";
import { recipeKeys } from "../queries/recipes.keys";

export type UpdateRecipeDataInput = {
  id: string;
  data?: string;
  title?: string;
};

export const useUpdateRecipeData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, title }: UpdateRecipeDataInput) =>
      updateRecipeData(id, { data, title }),
    onSuccess: (_result, { id }) => {
      void queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) });
    },
  });
};
