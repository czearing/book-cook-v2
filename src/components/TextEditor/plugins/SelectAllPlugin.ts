"use client";

import { useEffect } from "react";
import { $isListItemNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, IS_APPLE } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $selectAll,
  COMMAND_PRIORITY_CRITICAL,
  KEY_DOWN_COMMAND,
} from "lexical";

export function SelectAllPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        if (
          !(IS_APPLE ? event.metaKey : event.ctrlKey) ||
          event.code !== "KeyA"
        ) {
          return false;
        }

        event.preventDefault();

        editor.update(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) {
            return;
          }

          const anchor = selection.anchor.getNode();
          // Find closest List Item or default to top-level block (Paragraph/Heading)
          const element =
            $findMatchingParent(anchor, $isListItemNode) ??
            anchor.getTopLevelElement();

          // Condition: If we found a block AND (cursor is just blinking OR text doesn't match full block) -> Select Line
          // Otherwise -> Select All
          if (
            element &&
            (selection.isCollapsed() ||
              element.getTextContent() !== selection.getTextContent())
          ) {
            element.select(0, element.getChildrenSize());
          } else {
            $selectAll();
          }
        });

        return true;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  return null;
}
