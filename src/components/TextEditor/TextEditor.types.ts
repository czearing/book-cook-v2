import type { MutableRefObject } from "react";
import type { LexicalEditor } from "lexical";

export type TextEditorProps = {
  /**
   * Initial text content for the editor
   */
  text: string;
  /**
   * When set to "viewer", editing is disabled.
   */
  viewingMode?: "editor" | "viewer";
  /**
   * Fires once when content becomes dirty.
   */
  onDirty?: () => void;
  /**
   * Ref that will be populated with the active LexicalEditor instance.
   * Allows callers to read editor state (e.g. export to markdown on save).
   */
  editorRef?: MutableRefObject<LexicalEditor | null>;
};
