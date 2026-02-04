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
  /**
   * Index of the tag in the list.
   */
  index: number;
  /**
   * Total number of tags in the list.
   */
  total: number;
  /**
   * Keyboard move handler for accessible reordering.
   */
  onMove: (fromIndex: number, toIndex: number) => void;
  /**
   * Whether this tag is the active focus target.
   */
  isFocused: boolean;
  /**
   * Focus handler for roving tabindex.
   */
  onFocus: (index: number) => void;
  /**
   * Focus another tag by index.
   */
  onFocusTag: (index: number) => void;
};
