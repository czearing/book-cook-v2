import type { Recipe } from "@/components/RecipeView/RecipeView.types";
import { createSupabaseServerClient } from "../utils/supabaseServerClient";
import type { RecipeQueryFilters, RecipeRow } from "./recipes.types";
import { normalizeRecipeFilters } from "./recipes.filters";

const mapRecipeRow = (row: RecipeRow): Recipe => ({
  _id: row.id,
  imageURL: row.image_url ?? "",
  title: row.title ?? "Untitled Recipe",
  createdAt: row.created_at ?? "",
  data: row.data ?? "",
  tags: row.tags ?? [],
  emoji: row.emoji ?? "",
  owner: row.owner_id ?? "",
  isPublic: row.is_public ?? false,
  savedCount: row.saved_count ?? undefined,
  publishedAt: row.published_at ?? undefined,
  creatorName: row.users?.name ?? undefined,
});

const baseRecipeSelect =
  "id, title, data, tags, created_at, published_at, emoji, image_url, is_public, saved_count, owner_id, users(name)";

export const fetchRecipes = async (
  filters?: RecipeQueryFilters
): Promise<Recipe[]> => {
  const supabase = createSupabaseServerClient();
  const normalized = normalizeRecipeFilters(filters);
  const limit = normalized.limit ?? 1000;

  let query = supabase
    .from("recipes")
    .select(baseRecipeSelect)
    .order("created_at", { ascending: false });

  if (normalized.query) {
    const pattern = `%${normalized.query}%`;
    query = query.or(`title.ilike.${pattern},data.ilike.${pattern}`);
  }

  if (normalized.tags?.length) {
    query = query.overlaps("tags", normalized.tags);
  }

  if (normalized.ownerId) {
    query = query.eq("owner_id", normalized.ownerId);
  }

  if (typeof normalized.isPublic === "boolean") {
    query = query.eq("is_public", normalized.isPublic);
  }

  if (typeof normalized.offset === "number") {
    const to = normalized.offset + limit - 1;
    query = query.range(normalized.offset, to);
  } else {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data as RecipeRow[]).map(mapRecipeRow);
};

export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("recipes")
    .select(baseRecipeSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return mapRecipeRow(data as RecipeRow);
};
