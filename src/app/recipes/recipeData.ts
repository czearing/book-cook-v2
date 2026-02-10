import type { Recipe } from "@/components/RecipeView/RecipeView.types";

const baseRecipe: Recipe = {
  _id: "recipe_01",
  imageURL:
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80",
  title: "Citrus Herb Salmon with Charred Broccolini",
  createdAt: "2024-07-08T18:20:00Z",
  data: "## Ingredients\n- Salmon\n- Lemon\n- Herbs",
  tags: ["Weeknight", "Seafood", "High Protein", "Bright", "Gluten-Free"],
  emoji: "🐟",
  owner: "user_123",
  creatorName: "Avery Park",
  isPublic: true,
  savedCount: 1860,
  viewCount: 12043,
  publishedAt: "2024-07-12T10:00:00Z",
};

export const recipeGalleryRecipes: Recipe[] = [
  baseRecipe,
  {
    ...baseRecipe,
    _id: "recipe_02",
    title: "Lemon Pepper Orzo with Feta",
    imageURL:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&q=80",
    tags: ["Bright", "Vegetarian"],
    viewCount: 842,
    savedCount: 91,
  },
  {
    ...baseRecipe,
    _id: "recipe_03",
    title: "Smoky Black Bean Tostadas",
    imageURL: "",
    emoji: "🌮",
    tags: ["Budget", "Pantry", "Vegan", "Spicy"],
    viewCount: 120,
    savedCount: 0,
  },
  {
    ...baseRecipe,
    _id: "recipe_04",
    title: "Baked Gnocchi with Roasted Tomatoes and Burrata",
    imageURL:
      "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=900&q=80",
    tags: ["Italian", "Comfort Food", "Weekend"],
    viewCount: 3121,
    savedCount: 642,
  },
  {
    ...baseRecipe,
    _id: "recipe_05",
    title: "Chili Crunch Noodles with Bok Choy",
    imageURL:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    tags: ["Spicy", "Quick", "Weeknight"],
    viewCount: 2290,
    savedCount: 410,
  },
  {
    ...baseRecipe,
    _id: "recipe_06",
    title: "Maple Dijon Chicken with Roasted Sweet Potatoes",
    imageURL:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    tags: ["Meal Prep", "Comfort Food"],
    viewCount: 10123,
    savedCount: 2041,
  },
  {
    _id: "recipe_07",
    imageURL: "",
    title: "Brown Butter Chocolate Chip Cookies",
    createdAt: "2024-01-01T00:00:00Z",
    data: `# Ingredients

- 1 cup (225 g) unsalted butter
- 2 1/4 cups (280 g) all-purpose flour
- 3/4 teaspoon (3 g) baking soda

# Instructions

1. Melt the butter until nutty and golden.
2. Mix dry ingredients separately.
3. Combine and bake at 325°F.`,
    tags: ["dessert", "cookies"],
    emoji: "🍪",
    owner: "user_1",
    creatorName: "Chef Ada",
    isPublic: true,
    savedCount: 42,
    viewCount: 256,
    publishedAt: "2024-01-02T00:00:00Z",
  },
];

export const getRecipeById = (id: string) =>
  recipeGalleryRecipes.find((recipe) => recipe._id === id) ?? null;
