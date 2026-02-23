"use client";

import { useRef, useState } from "react";
import { $convertToMarkdownString } from "@lexical/markdown";
import type { LexicalEditor } from "lexical";

import { useUpdateRecipeData } from "@/clientToServer/hooks/useUpdateRecipeData";
import { RecipeView } from "@/components";
import { RecipeSaveBar } from "@/components/RecipeSaveBar";
import type { SaveBarStatus } from "@/components/RecipeSaveBar";
import { RecipeViewSaveStateProvider, useRecipeViewSaveState } from "@/components/RecipeView/RecipeViewSaveStateContext";
import { recipeTransformers } from "@/components/TextEditor/textEditorConfig";
import type { RecipeEditorProps } from "./RecipeEditor.types";

type InnerProps = RecipeEditorProps & { onCancel: () => void };

function RecipeEditorInner({ recipe, onCancel }: InnerProps) {
  const editorRef = useRef<LexicalEditor | null>(null);
  const [status, setStatus] = useState<SaveBarStatus>("idle");
  const saveState = useRecipeViewSaveState();
  const { mutateAsync } = useUpdateRecipeData();

  const onSave = () => {
    const editor = editorRef.current;
    if (!editor) { return; }

    const data = editor.read(() => $convertToMarkdownString(recipeTransformers));
    const title = saveState?.getTitle();

    setStatus("saving");
    mutateAsync({ id: recipe._id, data, title })
      .then(() => {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 1500);
      })
      .catch(() => {
        setStatus("error");
      });
  };

  const handleCancel = () => {
    setStatus("idle");
    onCancel();
  };

  return (
    <>
      <RecipeView recipe={recipe} viewingMode="editor" editorRef={editorRef} />
      <RecipeSaveBar status={status} onSave={onSave} onCancel={handleCancel} />
    </>
  );
}

export function RecipeEditor({ recipe }: RecipeEditorProps) {
  const [resetKey, setResetKey] = useState(0);

  return (
    <RecipeViewSaveStateProvider
      key={resetKey}
      initialTitle={recipe.title}
      initialData={recipe.data}
    >
      <RecipeEditorInner recipe={recipe} onCancel={() => setResetKey((k) => k + 1)} />
    </RecipeViewSaveStateProvider>
  );
}
