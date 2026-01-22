export type TextEditorProps = {
  /**
   * Initial text content for the editor
   */
  text: string;
  /**
   * When set to "viewer", editing is disabled.
   */
  viewingMode?: "editor" | "viewer";
};
