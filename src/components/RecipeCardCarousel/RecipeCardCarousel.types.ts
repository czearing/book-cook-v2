import type { EmblaOptionsType } from "embla-carousel";

import type { Recipe } from "../RecipeView/RecipeView.types";

export type RecipeCardCarouselProps = {
  /**
   * Optional title displayed above the carousel.
   */
  title?: string;
  /**
   * Recipes to render in the carousel.
   */
  recipes: Recipe[];
  /**
   * Optional click handler for interactive cards.
   */
  onRecipeClick?: (recipe: Recipe) => void;
  /**
   * Optional class names for the carousel wrapper.
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
   * Accessible label for the list.
   */
  ariaLabel?: string;
  /**
   * Embla carousel options.
   */
  emblaOptions?: EmblaOptionsType;
};
