"use client";

import { useEffect, useMemo, useRef } from "react";
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

const hashMarkdownKey = (markdown: string) => {
  // Cheap-ish stable key so Lexical can be re-initialized when upstream markdown
  // changes (e.g. after an async fetch), without using the full markdown string.
  const len = markdown.length;
  const sample =
    len > 8000
      ? `${markdown.slice(0, 4000)}${markdown.slice(len - 4000)}`
      : markdown;
  let hash = 2166136261;
  for (let i = 0; i < sample.length; i += 1) {
    hash ^= sample.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `${len}:${hash >>> 0}`;
};

/**
 * The TextEditor component provides a rich text editor using the Lexical framework.
 */
export const TextEditor: React.FC<TextEditorProps> = (props) => {
  const { text, viewingMode = "editor", onDirty } = props;
  const isEditable = viewingMode === "editor";
  const dirtyRef = useRef(false);
  const composerKey = useMemo(
    () => `${viewingMode}:${hashMarkdownKey(text)}`,
    [text, viewingMode]
  );

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
