"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { ListNode, ListItemNode } from "@lexical/list";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import type { LexicalEditor } from "lexical";

import { SelectAllPlugin } from "./plugins";
import styles from "./TextEditor.module.css";
import type { TextEditorProps } from "./TextEditor.types";
import { editorTheme, recipeTransformers, hashMarkdownKey } from "./textEditorConfig";
import { TextEditorPlaceholder } from "./TextEditorPlaceholder/TextEditorPlaceholder";
import { SlashMenu } from "./TextEditorSlashMenu/TextEditorSlashMenu";

// Captures the LexicalEditor instance into a ref on mount, independently of
// content changes. This allows callers to read editor state at save time even
// if the user only changed the title (and never triggered onDirty).
function EditorRefPlugin({ editorRef }: { editorRef: MutableRefObject<LexicalEditor | null> }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editorRef.current = editor;
  }, [editor, editorRef]);
  return null;
}

/**
 * The TextEditor component provides a rich text editor using the Lexical framework.
 */
export const TextEditor: React.FC<TextEditorProps> = (props) => {
  const { text, viewingMode = "editor", onDirty, editorRef } = props;
  const isEditable = viewingMode === "editor";
  const dirtyRef = useRef(false);
  const composerKey = `${viewingMode}:${hashMarkdownKey(text)}`;

  useEffect(() => {
    dirtyRef.current = false;
  }, [text, viewingMode]);

  const initialConfig = {
    namespace: "RecipeEditor",
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
    theme: editorTheme,
    editable: isEditable,
    editorState: () => {
      $convertFromMarkdownString(text, recipeTransformers, undefined, true);
    },
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer key={composerKey} initialConfig={initialConfig}>
      <div
        className={`${styles.container} ${
          isEditable ? styles.editable : styles.readOnly
        }`}
      >
        {isEditable && <SelectAllPlugin />}
        {isEditable && <TextEditorPlaceholder />}
        {isEditable && <SlashMenu />}
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={styles.input} readOnly={!isEditable} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {isEditable && <ListPlugin />}
        {isEditable && editorRef && <EditorRefPlugin editorRef={editorRef} />}
        {isEditable && onDirty && (
          <OnChangePlugin
            ignoreSelectionChange
            onChange={() => {
              if (dirtyRef.current) { return; }
              dirtyRef.current = true;
              onDirty();
            }}
          />
        )}
        {isEditable && (
          <MarkdownShortcutPlugin transformers={recipeTransformers} />
        )}
      </div>
    </LexicalComposer>
  );
};
