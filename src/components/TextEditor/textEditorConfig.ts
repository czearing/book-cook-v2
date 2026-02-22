import {
  HEADING,
  QUOTE,
  TEXT_FORMAT_TRANSFORMERS,
  ORDERED_LIST,
  UNORDERED_LIST,
} from "@lexical/markdown";

import styles from "./TextEditor.module.css";
import typography from "../Typography/Typography.module.css";

export const editorTheme = {
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

export const recipeTransformers = [
  HEADING,
  QUOTE,
  ORDERED_LIST,
  UNORDERED_LIST,
  ...TEXT_FORMAT_TRANSFORMERS,
];

export const hashMarkdownKey = (markdown: string) => {
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
