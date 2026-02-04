"use client";

import { useEffect, useRef } from "react";
import { ListNode, ListItemNode } from "@lexical/list";
import {
  HEADING,
  QUOTE,
  TEXT_FORMAT_TRANSFORMERS,
  ORDERED_LIST,
  UNORDERED_LIST,
  $convertFromMarkdownString,
} from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import { SelectAllPlugin } from "./plugins";
import styles from "./TextEditor.module.css";
import type { TextEditorProps } from "./TextEditor.types";
import { TextEditorPlaceholder } from "./TextEditorPlaceholder/TextEditorPlaceholder";
import { SlashMenu } from "./TextEditorSlashMenu/TextEditorSlashMenu";
import typography from "../Typography/Typography.module.css";

const editorTheme = {
  paragraph: typography.bodyText,
  heading: {
    h1: typography.sectionHeading,
    h2: typography.sectionHeading,
    h3: typography.subsectionHeading,
  },
  text: {
    bold: typography.bold,
    italic: typography.italic,
    underline: typography.underline,
    strikethrough: typography.strikethrough,
  },
  quote: typography.bodyText,
  list: {
    ol: styles.ol,
    ul: styles.ul,
    listitem: styles.listItem,
    nested: {
      listitem: styles.nestedListItem,
    },
  },
};

const recipeTransformers = [
  HEADING,
  QUOTE,
  ORDERED_LIST,
  UNORDERED_LIST,
  ...TEXT_FORMAT_TRANSFORMERS,
];

const normalizeMarkdown = (markdown: string) =>
  markdown.replace(/^(#{1,6} .+)\n{2,}/gm, "$1\n");

/**
 * The TextEditor component provides a rich text editor using the Lexical framework.
 */
export const TextEditor: React.FC<TextEditorProps> = (props) => {
  const { text, viewingMode = "editor", onDirty } = props;
  const isEditable = viewingMode === "editor";
  const dirtyRef = useRef(false);

  useEffect(() => {
    dirtyRef.current = false;
  }, [text, viewingMode]);

  const initialConfig = {
    namespace: "RecipeEditor",
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
    theme: editorTheme,
    editable: isEditable,
    editorState: () => {
      $convertFromMarkdownString(
        normalizeMarkdown(text),
        recipeTransformers,
        undefined,
        true
      );
    },
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles.container}>
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
        {isEditable && onDirty && (
          <OnChangePlugin
            onChange={() => {
              if (dirtyRef.current) {return;}
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
