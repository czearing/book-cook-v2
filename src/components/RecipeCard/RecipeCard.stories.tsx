import type { Meta, StoryObj } from "@storybook/react";

import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "../RecipeView/RecipeView.types";

const sampleRecipe: Recipe = {
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

const meta: Meta<typeof RecipeCard> = {
  title: "Components/RecipeCard",
  component: RecipeCard,
};

export default meta;

type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {
  args: {
    recipe: sampleRecipe,
  },
};

export const NoImage: Story = {
  args: {
    recipe: {
      ...sampleRecipe,
      imageURL: "",
      title: "Tomato Braised Chickpeas with Garlic Toast",
      emoji: "\ud83e\uddc4",
      tags: ["Vegetarian", "Pantry", "Comfort Food"],
    },
  },
};

export const Clickable: Story = {
  args: {
    recipe: sampleRecipe,
    onClick: () => undefined,
  },
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      }}
    >
      <RecipeCard recipe={sampleRecipe} onClick={() => undefined} />
      <RecipeCard
        recipe={{
          ...sampleRecipe,
          _id: "recipe_02",
          title: "Lemon Pepper Orzo with Feta",
          imageURL:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&q=80",
          tags: ["Bright", "Vegetarian"],
          viewCount: 842,
          savedCount: 91,
        }}
        onClick={() => undefined}
      />
      <RecipeCard
        recipe={{
          ...sampleRecipe,
          _id: "recipe_03",
          title: "Smoky Black Bean Tostadas",
          imageURL: "",
          emoji: "\ud83c\udf2e",
          tags: ["Budget", "Pantry", "Vegan", "Spicy"],
          viewCount: 120,
          savedCount: 0,
        }}
        onClick={() => undefined}
      />
      <RecipeCard
        recipe={{
          ...sampleRecipe,
          _id: "recipe_04",
          title: "Baked Gnocchi with Roasted Tomatoes and Burrata",
          imageURL:
            "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=900&q=80",
          tags: ["Italian", "Comfort Food", "Weekend"],
          viewCount: 3121,
          savedCount: 642,
        }}
        onClick={() => undefined}
      />
    </div>
  ),
};
