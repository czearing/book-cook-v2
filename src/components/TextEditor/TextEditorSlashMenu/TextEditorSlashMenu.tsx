"use client";

import { useCallback, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import type { TextNode } from "lexical";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import * as ReactDOM from "react-dom";

import styles from "./TextEditorSlashMenu.module.css";

// 1. Clean Data Model (Defined once, outside the component)
export class SlashOption extends MenuOption {
  // Use public shorthand to avoid boilerplate
  constructor(
    public title: string,
    public tag: "h1" | "h2" | "p"
  ) {
    super(title); // The 'key' for React lists
  }
}

const OPTIONS = [
  new SlashOption("Heading 1", "h1"),
  new SlashOption("Heading 2", "h2"),
  new SlashOption("Normal Text", "p"),
];

export function SlashMenu() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForSlash = useBasicTypeaheadTriggerMatch("/", { minLength: 0 });

  const onSelectOption = useCallback(
    (
      selectedOption: SlashOption,
      nodeToRemove: TextNode | null, // <--- Fixed: No more 'any'
      closeMenu: () => void
    ) => {
      editor.update(() => {
        // Remove the "/" text
        nodeToRemove?.remove();

        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return;
        }

        // Clean switch statement for block transformation
        switch (selectedOption.tag) {
          case "h1":
            $setBlocksType(selection, () => $createHeadingNode("h1"));
            break;
          case "h2":
            $setBlocksType(selection, () => $createHeadingNode("h2"));
            break;
          default:
            $setBlocksType(selection, () => $createParagraphNode());
        }
        closeMenu();
      });
    },
    [editor]
  );

  return (
    <LexicalTypeaheadMenuPlugin<SlashOption>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForSlash}
      options={OPTIONS}
      menuRenderFn={(anchorRef, { selectedIndex, selectOptionAndCleanUp }) => {
        // Guard clause: Don't render if no anchor or no match
        if (anchorRef.current == null || queryString === null) {
          return null;
        }

        return ReactDOM.createPortal(
          <div className={styles.menu}>
            {OPTIONS.map((option, i) => (
              <button
                key={option.key}
                className={`${styles.item} ${
                  selectedIndex === i ? styles.selected : ""
                }`}
                onClick={() => selectOptionAndCleanUp(option)}
                type="button"
              >
                {option.title}
              </button>
            ))}
          </div>,
          anchorRef.current
        );
      }}
    />
  );
}
