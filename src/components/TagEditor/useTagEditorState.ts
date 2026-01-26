import { useCallback, useEffect, useRef, useState } from "react";
import type { DragCancelEvent, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const normalizeTag = (value: string) => value.trim();
const isSame = (a: string[], b: string[]) => a.join("|") === b.join("|");

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

  useEffect(() => {
    if (!isEditing) return;
    const onOutside = (event: MouseEvent) => {
      if (activeTag) return;
      if (wrapperRef.current?.contains(event.target as Node)) return;
      setIsEditing(false);
      setIsAdding(false);
      setInputValue("");
      if (onTagsChange && !isSame(draftTags, tags)) onTagsChange(draftTags);
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [activeTag, draftTags, isEditing, onTagsChange, tags]);

  const addTag = useCallback(() => {
    const next = normalizeTag(inputValue);
    if (!next) return;
    setDraftTags((items) => {
      if (items.some((tag) => tag.toLowerCase() === next.toLowerCase())) {
        return items;
      }
      return [...items, next];
    });
    setInputValue("");
    setIsAdding(false);
  }, [inputValue]);

  const removeTag = useCallback((value: string) => {
    setDraftTags((items) => items.filter((item) => item !== value));
  }, []);

  const startAdd = useCallback(() => setIsAdding(true), []);

  const cancelAdd = useCallback(() => {
    setIsAdding(false);
    setInputValue("");
  }, []);

  const toggleEdit = useCallback(() => setIsEditing((prev) => !prev), []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setInputValue(event.target.value),
    []
  );

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addTag();
      }
      if (event.key === "Escape") {
        cancelAdd();
      }
    },
    [addTag, cancelAdd]
  );

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setDraftTags((items) => {
      const fromIndex = items.indexOf(String(active.id));
      const toIndex = items.indexOf(String(over.id));
      if (fromIndex < 0 || toIndex < 0) return items;
      return arrayMove(items, fromIndex, toIndex);
    });
  }, []);

  const handleDragStartEvent = useCallback(
    ({ active }: DragStartEvent) => {
      if (!isEditing) {
        return;
      }
      setActiveTag(String(active.id));
    },
    [isEditing]
  );

  const handleDragCancelEvent = useCallback((_: DragCancelEvent) => {
    setActiveTag(null);
  }, []);

  const handleDragEndEvent = useCallback(
    (event: DragEndEvent) => {
      handleDragEnd(event);
      setActiveTag(null);
    },
    [handleDragEnd]
  );

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
    handleDragStartEvent,
    handleDragCancelEvent,
    handleDragEndEvent,
  };
};
