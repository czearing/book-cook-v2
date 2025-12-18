"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";

import styles from "./TextEditorPlaceholder.module.css";

export function TextEditorPlaceholder() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = editor.getRootElement();
        if (!root) {
          return;
        }

        root.querySelectorAll(`.${styles.placeholder}`).forEach((el) => {
          el.classList.remove(styles.placeholder);
        });

        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          return;
        }

        const node = selection.anchor.getNode();
        const element = node.getTopLevelElement();

        if (
          element?.getType() === "paragraph" &&
          element.getTextContentSize() === 0
        ) {
          editor
            .getElementByKey(element.getKey())
            ?.classList.add(styles.placeholder);
        }
      });
    });
  }, [editor]);

  return null;
}
