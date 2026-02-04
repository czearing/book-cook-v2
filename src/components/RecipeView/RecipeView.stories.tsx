import type { Meta, StoryObj } from "@storybook/react";

import { RecipeView } from "./RecipeView";
import type { Recipe } from "./RecipeView.types";
import {
  RecipeViewSaveStateProvider,
  useRecipeViewSaveState,
} from "./RecipeViewSaveStateContext";

const sampleRecipe: Recipe = {
  _id: "recipe_1",
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
  isPublic: true,
  savedCount: 42,
  viewCount: 256,
  publishedAt: "2024-01-02T00:00:00Z",
  creatorName: "Chef Ada",
};

const meta: Meta = {
  title: "Components/RecipeView",
  component: RecipeView,
};

export default meta;

export const Viewer: StoryObj = {
  render: () => <RecipeView recipe={sampleRecipe} />,
};

export const Editable: StoryObj = {
  render: () => (
    <div style={{ height: "90vh" }}>
      <RecipeViewSaveStateProvider
        initialTitle={sampleRecipe.title}
        initialData={sampleRecipe.data}
      >
        <SaveStateIndicator />
        <RecipeView recipe={sampleRecipe} viewingMode="editor" />
      </RecipeViewSaveStateProvider>
    </div>
  ),
};

const SaveStateIndicator = () => {
  const saveState = useRecipeViewSaveState();
  if (!saveState) {return null;}

  return (
    <div
      style={{
        alignSelf: "flex-start",
        marginBottom: 12,
        fontSize: 12,
        color: saveState.isDirty ? "var(--danger-Primary)" : "var(--ui-TextCaption)",
      }}
    >
      {saveState.isDirty ? "Unsaved changes" : "All changes saved"}
    </div>
  );
};
