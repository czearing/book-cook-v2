export type RecipeRow = {
  id: string;
  owner_id: string | null;
  is_public: boolean | null;
  title: string | null;
  data: string | null;
  tags: string[] | null;
  created_at: string | null;
  published_at: string | null;
  emoji: string | null;
  image_url: string | null;
  difficulty_level: number | null;
  rating: number | null;
  saved_count: number | null;
  servings: number | null;
  users?: {
    name: string | null;
  } | null;
};
