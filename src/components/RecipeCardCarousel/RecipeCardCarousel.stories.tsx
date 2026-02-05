import type { Meta, StoryObj } from "@storybook/react";

import { RecipeCardCarousel } from "./RecipeCardCarousel";
import type { Recipe } from "../RecipeView/RecipeView.types";

const baseRecipe: Recipe = {
  _id: "recipe_01",
  imageURL:
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80",
  title: "Citrus Herb Salmon with Charred Broccolini",
  createdAt: "2024-07-08T18:20:00Z",
  data: "## Ingredients\n- Salmon\n- Lemon\n- Herbs",
  tags: ["Weeknight", "Seafood", "High Protein", "Bright", "Gluten-Free"],
  emoji: "\ud83d\udc1f",
  owner: "user_123",
  creatorName: "Avery Park",
  isPublic: true,
  savedCount: 1860,
  viewCount: 12043,
  publishedAt: "2024-07-12T10:00:00Z",
};

const sampleRecipes: Recipe[] = [
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
    emoji: "\ud83c\udf2e",
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
];

const meta: Meta<typeof RecipeCardCarousel> = {
  title: "Components/RecipeCardCarousel",
  component: RecipeCardCarousel,
};

export default meta;

type Story = StoryObj<typeof RecipeCardCarousel>;

export const Default: Story = {
  args: {
    title: "Recently viewed",
    recipes: sampleRecipes,
  },
};

export const Clickable: Story = {
  args: {
    recipes: sampleRecipes,
    onRecipeClick: () => undefined,
  },
};

export const Empty: Story = {
  args: {
    recipes: [],
  },
};
