"use client";

import { HEADING, QUOTE, TEXT_FORMAT_TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import styles from "./TextEditor.module.css";
import { TextEditorPlaceholder } from "./TextEditorPlaceholder/TextEditorPlaceholder";
import { SlashMenu } from "./TextEditorSlashMenu/TextEditorSlashMenu";
import typography from "../Typography/Typography.module.css";

const editorTheme = {
  paragraph: typography.bodyText,
  heading: {
    h1: typography.recipeTitle,
    h2: typography.sectionLabel,
    h3: typography.focusStep,
  },
  text: {
    bold: typography.bold,
    italic: typography.italic,
    underline: typography.underline,
    strikethrough: typography.strikethrough,
  },
  quote: typography.focusStep,
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
      <div className={styles.container}>
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
}
