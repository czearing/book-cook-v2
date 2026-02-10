export const recipeKeys = {
  all: ["recipes"] as const,
  gallery: () => [...recipeKeys.all, "gallery"] as const,
  detail: (id: string | null | undefined) =>
    [...recipeKeys.all, "detail", id ?? ""] as const,
};
