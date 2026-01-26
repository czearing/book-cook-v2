export interface TagEditorProps {
  /**
   * Tags to render in the editor.
   */
  tags: string[];
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
