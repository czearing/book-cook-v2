export interface TagEditorProps {
  /**
   * Tags currently applied to the recipe.
   */
  tags: string[];
  /**
   * Pool of existing tags to offer in the combobox dropdown.
   * Defaults to an empty array (free-text entry only).
   */
  availableTags?: string[];
  /**
   * Called when tags are updated after editing.
   */
  onTagsChange?: (tags: string[]) => void;
  /**
   * Called when a tag is clicked in view mode.
   */
  onTagClick?: (tag: string) => void;
  /**
   * Whether editing is allowed.
   */
  editable?: boolean;
  /**
   * When true, always show the edit control.
   */
  showEditControl?: boolean;
}
