"use client";

import { HEADING, QUOTE, TEXT_FORMAT_TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import { TextEditorPlaceholder } from "./TextEditorPlaceholder/TextEditorPlaceholder";
import { SlashMenu } from "./TextEditorSlashMenu/TextEditorSlashMenu";
import styles from "../Typography/Typography.module.css";

const editorTheme = {
  paragraph: styles.bodyText,
  heading: {
    h1: styles.recipeTitle,
    h2: styles.sectionLabel,
    h3: styles.focusStep,
  },

  quote: styles.focusStep,
};

const recipeTransformers = [HEADING, QUOTE, ...TEXT_FORMAT_TRANSFORMERS];

/**
 * The TextEditor component provides a rich text editor using the Lexical framework.
 */
export function TextEditor() {
  const initialConfig = {
    namespace: "RecipeEditor",
    nodes: [HeadingNode, QuoteNode],
    theme: editorTheme,
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <TextEditorPlaceholder />
      <SlashMenu />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <MarkdownShortcutPlugin transformers={recipeTransformers} />
    </LexicalComposer>
  );
}
