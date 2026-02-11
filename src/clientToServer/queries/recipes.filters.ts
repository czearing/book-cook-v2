import type { RecipeQueryFilters } from "./recipes.types";

const normalizeOptionalString = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }
  return trimmed;
};

const normalizeTags = (tags?: string[]) => {
  if (!tags?.length) {
    return undefined;
  }
  const normalized = tags.map((tag) => tag.trim()).filter(Boolean);

  if (!normalized.length) {
    return undefined;
  }

  return Array.from(new Set(normalized)).sort();
};

export const normalizeRecipeFilters = (
  filters?: RecipeQueryFilters
): RecipeQueryFilters => ({
  query: normalizeOptionalString(filters?.query),
  tags: normalizeTags(filters?.tags),
  ownerId: normalizeOptionalString(filters?.ownerId),
  isPublic:
    typeof filters?.isPublic === "boolean" ? filters.isPublic : undefined,
  limit: typeof filters?.limit === "number" ? filters.limit : undefined,
  offset: typeof filters?.offset === "number" ? filters.offset : undefined,
});

export const toRecipeSearchParams = (filters?: RecipeQueryFilters) => {
  const params = new URLSearchParams();
  const normalized = normalizeRecipeFilters(filters);

  if (normalized.query) {
    params.set("q", normalized.query);
  }

  if (normalized.tags?.length) {
    params.set("tags", normalized.tags.join(","));
  }

  if (normalized.ownerId) {
    params.set("ownerId", normalized.ownerId);
  }

  if (typeof normalized.isPublic === "boolean") {
    params.set("isPublic", String(normalized.isPublic));
  }

  if (typeof normalized.limit === "number") {
    params.set("limit", String(normalized.limit));
  }

  if (typeof normalized.offset === "number") {
    params.set("offset", String(normalized.offset));
  }

  return params;
};

export const fromRecipeSearchParams = (params: URLSearchParams) => {
  const query = normalizeOptionalString(params.get("q"));
  const tags = params
    .get("tags")
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const ownerId = normalizeOptionalString(params.get("ownerId"));

  const isPublicValue = params.get("isPublic");
  const isPublic =
    isPublicValue === "true"
      ? true
      : isPublicValue === "false"
        ? false
        : undefined;

  const limitValue = params.get("limit");
  const limit = limitValue ? Number.parseInt(limitValue, 10) : undefined;

  const offsetValue = params.get("offset");
  const offset = offsetValue ? Number.parseInt(offsetValue, 10) : undefined;

  return normalizeRecipeFilters({
    query,
    tags,
    ownerId,
    isPublic,
    limit: Number.isNaN(limit ?? 0) ? undefined : limit,
    offset: Number.isNaN(offset ?? 0) ? undefined : offset,
  });
};
