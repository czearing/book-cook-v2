"use client";

import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";

import styles from "./TextEditorPlaceholder.module.css";
import type { PlaceholderState } from "./TextEditorPlaceholder.types";

export function TextEditorPlaceholder() {
  const [editor] = useLexicalComposerContext();
  const state = useRef<PlaceholderState | null>(null);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        let current: PlaceholderState | null = null;

        // 1. Logic: Determine if we are on an empty line OR a slash line
        if ($isRangeSelection(selection) && selection.isCollapsed()) {
          const element = selection.anchor.getNode().getTopLevelElement();

          if (element?.getType() === "paragraph") {
            const text = element.getTextContent();
            if (text === "") {
              current = { key: element.getKey(), type: "empty" };
            }
            if (text === "/") {
              current = { key: element.getKey(), type: "slash" };
            }
          }
        }

        // 2. Diff: Exit early if state hasn't changed (O(1) Check)
        const prev = state.current;
        if (current?.key === prev?.key && current?.type === prev?.type) {
          return;
        }

        // 3. Clean up old state
        if (prev) {
          editor
            .getElementByKey(prev.key)
            ?.classList.remove(styles.empty, styles.slash);
        }

        // 4. Apply new state
        if (current) {
          editor
            .getElementByKey(current.key)
            ?.classList.add(
              current.type === "empty" ? styles.empty : styles.slash
            );
        }

        state.current = current;
      });
    });
  }, [editor]);

  return null;
}
