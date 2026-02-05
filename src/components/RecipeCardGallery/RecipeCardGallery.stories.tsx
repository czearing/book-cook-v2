import type { Meta, StoryObj } from "@storybook/react";

import { RecipeCardGallery } from "./RecipeCardGallery";
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

const imagePool = [
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&q=80",
  "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=900&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
];

const titlePool = [
  "Citrus Herb Salmon",
  "Lemon Pepper Orzo",
  "Smoky Black Bean Tostadas",
  "Baked Gnocchi with Burrata",
  "Chili Crunch Noodles",
  "Maple Dijon Chicken",
  "Slow-Roasted Tomato and Garlic Confit Pasta with Basil Breadcrumbs",
  "Sheet-Pan Za'atar Chicken with Crispy Chickpeas and Lemon Yogurt",
  "Miso Glazed Eggplant",
  "Garlic Butter Shrimp",
  "One-Pot Creamy Coconut Lentil Curry with Spinach and Lime",
  "Coconut Lentil Curry",
  "Roasted Tomato Pasta",
  "Herby Farro Salad with Roasted Squash, Feta, and Maple Vinaigrette",
];

const emojiPool = ["🐟", "🍋", "🌮", "🍝", "🥡", "🍗", "🍆", "🦐", "🥥", "🍅"];

const makeManyRecipes = (count: number): Recipe[] =>
  Array.from({ length: count }, (_, index) => {
    const title = titlePool[index % titlePool.length];
    const hasImage = index % 6 !== 0;
    return {
      ...baseRecipe,
      _id: `recipe_${String(index + 1).padStart(3, "0")}`,
      title: `${title} #${index + 1}`,
      imageURL: hasImage ? imagePool[index % imagePool.length] : "",
      emoji: emojiPool[index % emojiPool.length],
      tags: baseRecipe.tags.slice(0, (index % baseRecipe.tags.length) + 1),
      viewCount: 250 + index * 13,
      savedCount: 40 + index * 3,
      createdAt: new Date(2024, 6, (index % 28) + 1, 12, 0, 0).toISOString(),
    };
  });

const meta: Meta<typeof RecipeCardGallery> = {
  title: "Components/RecipeCardGallery",
  component: RecipeCardGallery,
};

export default meta;

type Story = StoryObj<typeof RecipeCardGallery>;

export const Default: Story = {
  args: {
    title: "Featured recipes",
    recipes: sampleRecipes,
  },
};

export const Clickable: Story = {
  args: {
    recipes: sampleRecipes,
    onRecipeClick: () => undefined,
  },
};

export const NoMeta: Story = {
  args: {
    recipes: sampleRecipes,
    showMeta: false,
  },
};

export const Empty: Story = {
  args: {
    recipes: [],
  },
};

export const LargeDataset: Story = {
  args: {
    title: "All recipes",
    recipes: makeManyRecipes(180),
  },
};
