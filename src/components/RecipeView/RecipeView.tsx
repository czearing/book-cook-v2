import { RecipeHeader } from "./RecipeHeader";
import styles from "./RecipeView.module.css";
import type { RecipeViewProps } from "./RecipeView.types";
import { useRecipeViewSaveState } from "./RecipeViewSaveStateContext";
import { TextEditor } from "../TextEditor";

export const RecipeView = ({
  recipe,
  viewingMode = "viewer",
}: RecipeViewProps) => {
  const saveState = useRecipeViewSaveState();

  return (
    <section className={styles.container}>
      <RecipeHeader recipe={recipe} viewingMode={viewingMode} />
      <div className={styles.content}>
        <TextEditor
          text={recipe.data}
          viewingMode={viewingMode}
          onDirty={saveState?.markDataDirty}
        />
      </div>
    </section>
  );
};
