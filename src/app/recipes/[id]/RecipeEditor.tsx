"use client";

import { RecipeView } from "@/components";
import {
  RecipeViewSaveStateProvider,
} from "@/components/RecipeView/RecipeViewSaveStateContext";
import type { RecipeEditorProps } from "./RecipeEditor.types";

export const RecipeEditor = ({ recipe }: RecipeEditorProps) => (
  <RecipeViewSaveStateProvider
    initialTitle={recipe.title}
    initialData={recipe.data}
  >
    <RecipeView recipe={recipe} viewingMode="editor" />
  </RecipeViewSaveStateProvider>
);
