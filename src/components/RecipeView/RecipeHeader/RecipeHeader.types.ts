import type { RecipeViewProps } from "../RecipeView.types";

export type RecipeHeaderProps = {
  /**
   * Recipe data used to render the header.
   */
  recipe: RecipeViewProps["recipe"];
  /**
   * Controls whether the title is editable.
   */
  viewingMode: NonNullable<RecipeViewProps["viewingMode"]>;
  /**
   * Called when a tag is clicked in view mode.
   */
  onTagClick?: (tag: string) => void;
  /**
   * Called when tags are updated in edit mode.
   */
  onTagsChange?: (tags: string[]) => void;
};
