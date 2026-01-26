export type SortableTagProps = {
  /**
   * Tag label.
   */
  tag: string;
  /**
   * Whether edit mode is active.
   */
  isEditing: boolean;
  /**
   * Click handler for view mode navigation.
   */
  onTagClick?: (tag: string) => void;
  /**
   * Remove handler for edit mode.
   */
  onRemove: (tag: string) => void;
};
