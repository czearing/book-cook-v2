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
};
