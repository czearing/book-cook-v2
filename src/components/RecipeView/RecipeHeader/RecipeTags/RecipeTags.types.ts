export type RecipeTagsProps = {
  /**
   * Tags to display in the header.
   */
  tags: string[];
  /**
   * Optional click handler for tags.
   */
  onTagClick?: (tag: string) => void;
  /**
   * Optional tags update handler.
   */
  onTagsChange?: (tags: string[]) => void;
  /**
   * Whether tags can be edited.
   */
  editable?: boolean;
};
