import type { Meta, StoryObj } from "@storybook/react";

import { RecipeHeader } from "./RecipeHeader";
import type { Recipe } from "../RecipeView.types";
import { RecipeViewSaveStateProvider } from "../RecipeViewSaveStateContext";

const sampleRecipe: Recipe = {
  _id: "recipe_1",
  imageURL: "https://picsum.photos/1200/600",
  title: "Spicy Miso Ramen",
  createdAt: "2023-10-15T14:30:00Z",
  data: "## Ingredients\n- 2 tbsp miso\n- 2 cups broth",
  tags: ["Japanese", "Dinner", "Spicy"],
  emoji: "🍜",
  owner: "user_987654",
  creatorName: "Chef Kai",
  isPublic: true,
  savedCount: 1243,
  viewCount: 8500,
  publishedAt: "2023-10-20T09:00:00Z",
};

const meta: Meta = {
  title: "Components/RecipeView/RecipeHeader",
  component: RecipeHeader,
};

export default meta;

export const Viewer: StoryObj = {
  render: () => <RecipeHeader recipe={sampleRecipe} viewingMode="viewer" />,
};

export const Editable: StoryObj = {
  render: () => (
    <RecipeViewSaveStateProvider
      initialTitle={sampleRecipe.title}
      initialData={sampleRecipe.data}
    >
      <RecipeHeader recipe={sampleRecipe} viewingMode="editor" />
    </RecipeViewSaveStateProvider>
  ),
};
