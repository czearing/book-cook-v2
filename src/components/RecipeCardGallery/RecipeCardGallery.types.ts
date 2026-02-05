import type { Recipe } from "../RecipeView/RecipeView.types";

export type RecipeCardGalleryProps = {
  /**
   * Optional title displayed above the gallery.
   */
  title?: string;
  /**
   * Recipes to render in the gallery.
   */
  recipes: Recipe[];
  /**
   * Optional click handler for interactive cards.
   */
  onRecipeClick?: (recipe: Recipe) => void;
  /**
   * Optional class names for the gallery wrapper.
   */
  className?: string;
  /**
   * Optional class names for each RecipeCard.
   */
  cardClassName?: string;
  /**
   * Show the author and created date row in each card.
   * @default true
   */
  showMeta?: boolean;
  /**
   * Accessible label for the gallery region.
   */
  ariaLabel?: string;
};
