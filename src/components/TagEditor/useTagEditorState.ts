"use client";

import { useEffect, useRef, useState } from "react";
import type { DragCancelEvent, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const normalizeTag = (value: string) => value.trim();
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
  const [isAdding, setIsAdding] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setDraftTags(tags);
    }
  }, [tags, isEditing]);

  const commitDraftTags = () => {
    if (!onTagsChange) {return;}
    if (!areTagsEqual(draftTags, tags)) {
      onTagsChange(draftTags);
    }
  };

  const exitEditing = () => {
    setIsEditing(false);
    setIsAdding(false);
    setInputValue("");
    commitDraftTags();
  };

  useEffect(() => {
    if (!isEditing) {return;}
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {return;}
      exitEditing();
    };
    const onOutside = (event: MouseEvent) => {
      if (activeTag) {return;}
      if (wrapperRef.current?.contains(event.target as Node)) {return;}
      exitEditing();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [activeTag, exitEditing, isEditing]);

  const addTag = () => {
    const next = normalizeTag(inputValue);
    if (!next) {return;}
    setDraftTags((items) => {
      if (items.some((tag) => tag.toLowerCase() === next.toLowerCase())) {
        return items;
      }
      return [...items, next];
    });
    setInputValue("");
    setIsAdding(false);
  };

  const removeTag = (value: string) => {
    setDraftTags((items) => items.filter((item) => item !== value));
  };

  const startAdd = () => setIsAdding(true);

  const cancelAdd = () => {
    setIsAdding(false);
    setInputValue("");
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }
    if (event.key === "Escape") {
      cancelAdd();
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {return;}
    setDraftTags((items) => {
      const fromIndex = items.indexOf(String(active.id));
      const toIndex = items.indexOf(String(over.id));
      if (fromIndex < 0 || toIndex < 0) {return items;}
      return arrayMove(items, fromIndex, toIndex);
    });
  };

  const moveTag = (fromIndex: number, toIndex: number) => {
    setDraftTags((items) => {
      if (fromIndex < 0 || toIndex < 0) {return items;}
      if (fromIndex >= items.length || toIndex >= items.length) {return items;}
      if (fromIndex === toIndex) {return items;}
      return arrayMove(items, fromIndex, toIndex);
    });
  };

  const handleDragStartEvent = ({ active }: DragStartEvent) => {
    if (!isEditing) {
      return;
    }
    setActiveTag(String(active.id));
  };

  const handleDragCancelEvent = (_: DragCancelEvent) => {
    setActiveTag(null);
  };

  const handleDragEndEvent = (event: DragEndEvent) => {
    handleDragEnd(event);
    setActiveTag(null);
  };

  return {
    wrapperRef,
    isEditing,
    toggleEdit,
    draftTags,
    inputValue,
    isAdding,
    removeTag,
    startAdd,
    handleInputChange,
    handleInputKeyDown,
    activeTag,
    moveTag,
    handleDragStartEvent,
    handleDragCancelEvent,
    handleDragEndEvent,
  };
};
