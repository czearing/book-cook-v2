"use client";

import { PencilSimpleIcon, XIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { Command } from "cmdk";

import styles from "./TagEditor.module.css";
import type { TagEditorProps } from "./TagEditor.types";
import { useTagEditorState } from "./useTagEditorState";
import { Button } from "../Button";
import { Tag } from "../Tag";

export const TagEditor = ({
  tags,
  availableTags = [],
  onTagsChange,
  onTagClick,
  editable = true,
  showEditControl,
}: TagEditorProps) => {
  const {
    wrapperRef,
    isEditing,
    toggleEdit,
    draftTags,
    inputValue,
    dropdownOpen,
    addTag,
    removeTag,
    handleInputChange,
    handleInputKeyDown,
  } = useTagEditorState(tags, onTagsChange);

  const isEmpty = !isEditing && tags.length === 0;
  const controlsVisible = Boolean(showEditControl);

  const suggestions = availableTags.filter(
    (t) =>
      !draftTags.some((d) => d.toLowerCase() === t.toLowerCase()) &&
      t.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div
      ref={wrapperRef}
      className={clsx(styles.wrapper, isEditing && styles.editing)}
    >
      {draftTags.map((tag) => (
        <Tag
          key={tag}
          onClick={!isEditing ? () => onTagClick?.(tag) : undefined}
          endIcon={isEditing ? <XIcon size={12} /> : undefined}
          endIconAriaLabel={`Remove ${tag}`}
          onEndIconClick={() => removeTag(tag)}
        >
          {tag}
        </Tag>
      ))}

      {isEditing && (
        <div className={styles.comboboxWrapper}>
          <Command shouldFilter={false} className={styles.command}>
            <Command.Input
              className={styles.comboboxInput}
              value={inputValue}
              onValueChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              autoFocus
              placeholder="Add tag"
              aria-label="Add tag"
            />
            {dropdownOpen && (
              <Command.List className={styles.dropdown}>
                {suggestions.length === 0 && inputValue.trim() !== "" && (
                  <Command.Item
                    value={inputValue}
                    onSelect={() => addTag(inputValue)}
                    className={styles.dropdownItem}
                  >
                    Add &ldquo;{inputValue}&rdquo;
                  </Command.Item>
                )}
                {suggestions.map((tag) => (
                  <Command.Item
                    key={tag}
                    value={tag}
                    onSelect={() => addTag(tag)}
                    className={styles.dropdownItem}
                  >
                    {tag}
                  </Command.Item>
                ))}
              </Command.List>
            )}
          </Command>
        </div>
      )}

      {editable && !isEditing && (
        <>
          {isEmpty ? (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => toggleEdit(draftTags)}
            >
              Add tag
            </Button>
          ) : (
            <div
              className={clsx(
                styles.controls,
                controlsVisible && styles.controlsVisible
              )}
            >
              <Button
                variant="ghost"
                size="xs"
                shape="square"
                onClick={() => toggleEdit(draftTags)}
                aria-label="Edit tags"
              >
                <PencilSimpleIcon size={13} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
