"use client";

import { useEffect } from "react";
import { $isListItemNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  SELECT_ALL_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";

export function SelectAllPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      SELECT_ALL_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        }

        const anchorNode = selection.anchor.getNode();

        // 1. Find the "Block" we are in.
        // If inside a List, we want the specific Item (bullet), not the whole list.
        let element = $findMatchingParent(anchorNode, (n) =>
          $isListItemNode(n)
        );

        // Otherwise, get the Paragraph or Heading
        if (!element) {
          element = anchorNode.getTopLevelElement();
        }

        if (!element) {
          return false;
        }

        // 2. Compare the text in the block vs the text in your selection
        const blockText = element.getTextContent();
        const selectedText = selection.getTextContent();

        // 3. Logic:
        // If the selection does NOT match the full block text, it means we
        // haven't selected the line yet. So we select the line.
        if (selectedText !== blockText) {
          element.select(0, element.getTextContentSize());
          return true; // STOP propagation. Prevents the browser from selecting the whole doc.
        }

        // If we fall through to here, it means the line IS already selected.
        // We return false, allowing the event to bubble up so the browser
        // performs its native "Select All" on the document.
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}
