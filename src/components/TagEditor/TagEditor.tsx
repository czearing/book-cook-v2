"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { DotsSixVerticalIcon, PencilSimpleIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

import { SortableTag } from "./SortableTag";
import styles from "./TagEditor.module.css";
import type { TagEditorProps } from "./TagEditor.types";
import { useTagEditorState } from "./useTagEditorState";
import { Tag } from "../Tag";
import { Input } from "../Input";

export const TagEditor = ({
  tags,
  onTagsChange,
  onTagClick,
  editable = true,
  showEditControl,
}: TagEditorProps) => {
  const iconSizeSm = 12;
  const iconSizeMd = 14;
  const {
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
  } = useTagEditorState(tags, onTagsChange);
  const dragIcon = isEditing ? <DotsSixVerticalIcon size={iconSizeSm} /> : undefined;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const controlsVisible = Boolean(showEditControl) || tags.length === 0;
  const isDragging = Boolean(activeTag);
  const dragOverlayStyle = activeTag
    ? { width: "max-content", height: "max-content" }
    : undefined;
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (!isEditing) {
      setFocusedIndex(0);
      return;
    }
    setFocusedIndex((prev) =>
      Math.max(0, Math.min(prev, Math.max(0, draftTags.length - 1)))
    );
  }, [draftTags.length, isEditing]);

  const focusTag = useCallback((index: number) => {
    setFocusedIndex(index);
    const target = document.querySelector<HTMLElement>(
      `[data-tag-index="${index}"]`
    );
    if (target) {
      target.focus();
      return;
    }
    requestAnimationFrame(() => {
      const fallback = document.querySelector<HTMLElement>(
        `[data-tag-index="${index}"]`
      );
      fallback?.focus();
    });
  }, []);

  const handleEditClick = () => {
    if (!isEditing) {
      toggleEdit();
      if (tags.length === 0) {
        startAdd();
      }
      return;
    }
    toggleEdit();
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        styles.wrapper,
        isEditing && styles.editing,
        isDragging && styles.draggingList
      )}
      role="listbox"
      aria-orientation="horizontal"
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStartEvent}
        onDragCancel={handleDragCancelEvent}
        onDragEnd={handleDragEndEvent}
      >
        <SortableContext items={draftTags} strategy={rectSortingStrategy}>
          {draftTags.map((tag, index) => (
            <SortableTag
              key={tag}
              tag={tag}
              index={index}
              total={draftTags.length}
              onMove={moveTag}
              isFocused={focusedIndex === index}
              onFocus={setFocusedIndex}
              onFocusTag={focusTag}
              isEditing={isEditing}
              onTagClick={onTagClick}
              onRemove={removeTag}
            />
          ))}
        </SortableContext>
        <DragOverlay
          adjustScale={false}
          dropAnimation={null}
          className={styles.dragOverlay}
          style={dragOverlayStyle}
        >
          {activeTag ? (
            <Tag
              startIcon={dragIcon}
              endIcon={isEditing ? <XIcon size={iconSizeSm} /> : undefined}
              endIconAriaLabel={`Remove ${activeTag}`}
            >
              {activeTag}
            </Tag>
          ) : null}
        </DragOverlay>
      </DndContext>

      {isEditing && isAdding && (
        <Input
          className={styles.addInput}
          size="sm"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          autoFocus
          placeholder="Add tag"
          aria-label="Add tag"
        />
      )}

      {isEditing && !isAdding && (
        <button type="button" className={styles.addButton} onClick={startAdd}>
          <PlusIcon size={iconSizeSm} /> Add
        </button>
      )}

      {editable && (
        <div
          className={clsx(
            styles.controls,
            controlsVisible && styles.controlsVisible
          )}
        >
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleEditClick}
            aria-label="Edit tags"
          >
            <PencilSimpleIcon size={iconSizeMd} />
          </button>
        </div>
      )}
    </div>
  );
};
