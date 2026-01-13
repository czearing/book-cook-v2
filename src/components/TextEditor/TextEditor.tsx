"use client";

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
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import { SelectAllPlugin } from "./plugins";
import styles from "./TextEditor.module.css";
import type { TextEditorProps } from "./TextEditor.types";
import { TextEditorPlaceholder } from "./TextEditorPlaceholder/TextEditorPlaceholder";
import { TextEditorSideMenu } from "./TextEditorSideMenu/TextEditorSideMenu";
import { SlashMenu } from "./TextEditorSlashMenu/TextEditorSlashMenu";
import typography from "../Typography/Typography.module.css";

const editorTheme = {
  paragraph: typography.bodyText,
  heading: {
    h1: typography.recipeTitle,
    h2: typography.sectionLabel,
    h3: typography.sectionLabel,
  },
  text: {
    bold: typography.bold,
    italic: typography.italic,
    underline: typography.underline,
    strikethrough: typography.strikethrough,
  },
  quote: typography.sectionLabel,
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

/**
 * The TextEditor component provides a rich text editor using the Lexical framework.
 */
export const TextEditor: React.FC<TextEditorProps> = (props) => {
  const { text } = props;

  const initialConfig = {
    namespace: "RecipeEditor",
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
    theme: editorTheme,
    editorState: () => {
      $convertFromMarkdownString(text, recipeTransformers);
    },
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles.container}>
        <TextEditorSideMenu />
        <SelectAllPlugin />
        <TextEditorPlaceholder />
        <SlashMenu />
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.input} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MarkdownShortcutPlugin transformers={recipeTransformers} />
      </div>
    </LexicalComposer>
  );
};
