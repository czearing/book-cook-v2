"use client";

import { useEffect, useRef, useState } from "react";

const areTagsEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

export const useTagEditorState = (
  tags: string[],
  onTagsChange?: (tags: string[]) => void
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTags, setDraftTags] = useState(tags);
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraftTags(tags);
    }
  }, [tags, isEditing]);

  const commitDraftTags = (current: string[]) => {
    if (!onTagsChange) {
      return;
    }
    if (!areTagsEqual(current, tags)) {
      onTagsChange(current);
    }
  };

  const exitEditing = (current: string[]) => {
    setIsEditing(false);
    setInputValue("");
    setDropdownOpen(false);
    commitDraftTags(current);
  };

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    let latestDraft = draftTags;
    const unsubscribeDraft = () => {
      latestDraft = draftTags;
    };
    unsubscribeDraft();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      exitEditing(latestDraft);
    };
    const onOutside = (event: MouseEvent) => {
      if (wrapperRef.current?.contains(event.target as Node)) {
        return;
      }
      exitEditing(latestDraft);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, draftTags]);

  const addTag = (value: string) => {
    const next = value.trim();
    if (!next) {
      return;
    }
    setDraftTags((items) => {
      if (items.some((tag) => tag.toLowerCase() === next.toLowerCase())) {
        return items;
      }
      return [...items, next];
    });
    setInputValue("");
    setDropdownOpen(false);
  };

  const removeTag = (value: string) => {
    setDraftTags((items) => items.filter((item) => item !== value));
  };

  const toggleEdit = (currentDraft: string[]) => {
    if (isEditing) {
      exitEditing(currentDraft);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setDropdownOpen(value.length > 0);
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && !dropdownOpen) {
      event.preventDefault();
      addTag(inputValue);
    }
    if (event.key === "Escape") {
      if (dropdownOpen) {
        setDropdownOpen(false);
      } else {
        exitEditing(draftTags);
      }
    }
  };

  return {
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
  };
};
